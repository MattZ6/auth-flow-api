import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@application/protocols/repositories/user-token';

import { makeUserTokenMock } from '../../../../domain/entities/UserToken.mock';

export class CreateUserTokenRepositorySpy
  implements ICreateUserTokenRepository
{
  async create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output> {
    const { token, expires_in, user_id } = data;

    const userToken = makeUserTokenMock();

    Object.assign(userToken, { token, expires_in, user_id });

    return userToken;
  }
}

export class DeleteUserTokenByIdRepositorySpy
  implements IDeleteUserTokenByIdRepository
{
  async deleteById(
    _: IDeleteUserTokenByIdRepository.Input
  ): Promise<IDeleteUserTokenByIdRepository.Output> {
    // That's all folks 🐰
  }
}

export class FindUserTokenByTokenRepositorySpy
  implements IFindUserTokenByTokenRepository
{
  async findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output> {
    const { token } = data;

    const userToken = makeUserTokenMock();

    Object.assign(userToken, { token });

    return userToken;
  }
}
