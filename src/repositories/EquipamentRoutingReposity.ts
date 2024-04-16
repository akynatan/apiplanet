import { getRepository, Repository } from 'typeorm';

import EquipamentRouting from '@entities/EquipamentRouting';

type CreateEquipamentRoutingDTO = {
  name: string;
  ipv4: string;
};

export default class EquipamentRoutingReposity {
  private ormRepository: Repository<EquipamentRouting>;

  constructor() {
    this.ormRepository = getRepository(EquipamentRouting);
  }

  public async createOrUpdate({
    name,
    ipv4,
  }: CreateEquipamentRoutingDTO): Promise<EquipamentRouting> {
    let equipament_routing = await this.ormRepository.findOne({
      name,
    });

    if (!equipament_routing) {
      equipament_routing = await this.ormRepository.create({
        name,
        ipv4,
      });
    }

    equipament_routing.ipv4 = ipv4;

    await this.ormRepository.save(equipament_routing);

    return equipament_routing;
  }
}
