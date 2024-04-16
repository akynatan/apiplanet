import { getRepository, Repository } from 'typeorm';

import Address from '@entities/Address';

export default class AddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async createOrUpdate(
    neighborhood: string,
    number: string,
    complement: string,
    city_id: string,
  ): Promise<Address> {
    let address = await this.ormRepository.findOne({
      neighborhood,
      number,
      complement,
      city_id,
    });

    if (!address) {
      address = await this.ormRepository.create({
        neighborhood,
        number,
        complement,
        city_id,
      });

      await this.ormRepository.save(address);
    }

    return address;
  }
}
