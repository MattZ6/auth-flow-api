import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/Create';

import { badRequest, conflict, created } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class CreateAccountController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createUserUseCase: ICreateUserUseCase
  ) {}

  async handle(
    request: CreateAccountController.Request
  ): Promise<CreateAccountController.Response> {
    try {
      this.validation.validate(request.body);

      const { name, email, password } = request.body;

      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserAlreadyExistsWithProvidedEmailError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateAccountController {
  type RequestBody = {
    name: string;
    email: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateAccountController };
