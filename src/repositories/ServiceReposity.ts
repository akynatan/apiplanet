import { getRepository, Repository } from 'typeorm';

import Service from '@entities/Service';

type IServiceDTO = {
  name: string;
  id_service_external: number;
};

export default class ServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async createOrUpdate({
    name,
    id_service_external,
  }: IServiceDTO): Promise<Service> {
    let service = await this.ormRepository.findOne({
      id_service_external,
    });

    if (!service) {
      service = await this.ormRepository.create({
        id_service_external,
        name,
      });
    } else {
      service.name = name;
    }

    await this.ormRepository.save(service);

    return service;
  }
}
