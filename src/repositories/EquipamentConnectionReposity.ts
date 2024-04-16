import { getRepository, Repository } from 'typeorm';

import EquipamentConnection from '@entities/EquipamentConnection';

type CreateEquipamentConnectionDTO = {
  name: string;
  ipv4: string;
};

export default class EquipamentConnectionReposity {
  private ormRepository: Repository<EquipamentConnection>;

  constructor() {
    this.ormRepository = getRepository(EquipamentConnection);
  }

  public async createOrUpdate({
    name,
    ipv4,
  }: CreateEquipamentConnectionDTO): Promise<EquipamentConnection> {
    let equipament_connection = await this.ormRepository.findOne({
      name,
    });

    if (!equipament_connection) {
      equipament_connection = await this.ormRepository.create({
        name,
        ipv4,
      });
    }

    equipament_connection.ipv4 = ipv4;

    await this.ormRepository.save(equipament_connection);

    return equipament_connection;
  }
}
