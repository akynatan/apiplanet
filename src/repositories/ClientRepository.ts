import { getRepository, Repository } from 'typeorm';

import Client from '@entities/Client';

export default class ClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async createOrUpdate(
    name: string,
    person_type: string,
    client_id: string,
  ): Promise<Client> {
    let client = await this.ormRepository.findOne({
      client_id,
    });

    if (!client) {
      client = await this.ormRepository.create({
        name,
        person_type,
        client_id,
      });

      await this.ormRepository.save(client);
    }

    return client;
  }
}
