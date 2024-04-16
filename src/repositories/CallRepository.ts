import { getRepository, Repository } from 'typeorm';

import Call from '@entities/Call';
import ICreateCallDTO from '@dtos/ICreateCallDTO';

export default class CallRepository {
  private ormRepository: Repository<Call>;

  constructor() {
    this.ormRepository = getRepository(Call);
  }

  public async create({
    type,
    client_service_id,
  }: ICreateCallDTO): Promise<Call> {
    const call = await this.ormRepository.create({
      client_service_id,
      type,
    });
    await this.ormRepository.save(call);

    return call;
  }
}
