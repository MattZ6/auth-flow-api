import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetUserProfileUseCase } from '@domain/usecases/user/GetUserProfile';

import { UserMapper } from '@presentation/dtos';
import { notFound, ok } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class GetUserProfileController implements IController {
  constructor(private readonly getProfileUseCase: IGetUserProfileUseCase) {}

  async handle(
    request: GetUserProfileController.Request
  ): Promise<GetUserProfileController.Response> {
    try {
      const { user_id } = request;

      const user = await this.getProfileUseCase.execute({ user_id });

      return ok(UserMapper.toProfileDTO(user));
    } catch (error) {
      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetUserProfileController {
  export type Request = IHttpRequest<void>;

  export type Response = IHttpResponse;
}

export { GetUserProfileController };
