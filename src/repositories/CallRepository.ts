import { getRepository, Repository } from 'typeorm';

import Call from '@entities/Call';

export default class CallRepository {
  private ormRepository: Repository<Call>;

  constructor() {
    this.ormRepository = getRepository(Call);
  }

  public async create(
    client_id: string,
    address_id: string,
    service_id: string,
  ): Promise<Call> {
    const call = await this.ormRepository.create({
      client_id,
      address_id,
      service_id,
    });
    await this.ormRepository.save(call);

    return call;
  }
}
