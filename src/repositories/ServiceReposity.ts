import { getRepository, Repository } from 'typeorm';

import Service from '@entities/Service';

export default class ServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async createOrUpdate(name: string): Promise<Service> {
    let service = await this.ormRepository.findOne({
      name,
    });

    if (!service) {
      service = await this.ormRepository.create({
        name,
      });

      await this.ormRepository.save(service);
    }

    return service;
  }
}
