import { Repository, getRepository } from 'typeorm';
import ICreateErrorDTO from '@dtos/ICreateErrorDTO';

import Error from '@entities/Error';

export default class ErrorsRepository {
  private ormRepository: Repository<Error>;

  constructor() {
    this.ormRepository = getRepository(Error);
  }

  public async create(userData: ICreateErrorDTO): Promise<Error> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }
}
