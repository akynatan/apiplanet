import { getRepository, Repository } from 'typeorm';

import InterfaceRouting from '@entities/InterfaceRouting';

type CreateInterfaceRoutingDTO = {
  name: string;
  type: string;
};

export default class InterfaceRoutingReposity {
  private ormRepository: Repository<InterfaceRouting>;

  constructor() {
    this.ormRepository = getRepository(InterfaceRouting);
  }

  public async createOrUpdate({
    name,
    type,
  }: CreateInterfaceRoutingDTO): Promise<InterfaceRouting> {
    let interface_routing = await this.ormRepository.findOne({
      name,
    });

    if (!interface_routing) {
      interface_routing = await this.ormRepository.create({
        name,
        type,
      });
    }

    interface_routing.type = type;

    await this.ormRepository.save(interface_routing);

    return interface_routing;
  }
}
