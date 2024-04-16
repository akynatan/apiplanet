import { getRepository, Repository } from 'typeorm';

import Client from '@entities/Client';

type CreateClientDTO = {
  name: string;
  person_type: string;
  id_client_external: number;
};

export default class ClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async createOrUpdate({
    name,
    person_type,
    id_client_external,
  }: CreateClientDTO): Promise<Client> {
    let client = await this.ormRepository.findOne({
      id_client_external,
    });

    if (!client) {
      client = await this.ormRepository.create({
        name,
        person_type,
        id_client_external,
      });
    } else {
      client.name = name;
      client.person_type = person_type;
    }

    await this.ormRepository.save(client);

    return client;
  }
}
