import { getRepository, Repository, DeepPartial } from 'typeorm';

import Interface from '@entities/Interface';

type CreateInterfaceDTO = {
  name: string;
  type: string;
};

export default class InterfaceReposity {
  private ormRepository: Repository<Interface>;

  constructor() {
    this.ormRepository = getRepository(Interface);
  }

  public async createOrUpdate({
    name,
    type,
  }: CreateInterfaceDTO): Promise<Interface> {
    let _interface = await this.ormRepository.findOne({
      name,
    });

    if (!_interface) {
      _interface = await this.ormRepository.create({
        name,
        type,
      });
    }

    _interface.type = type;

    await this.ormRepository.save(_interface);

    return _interface;
  }
}
