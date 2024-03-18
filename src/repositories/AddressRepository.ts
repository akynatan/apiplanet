import { getRepository, Repository } from 'typeorm';

import Address from '@entities/Address';

export default class AddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(
    neighborhood: string,
    number: string,
    complement: string,
    city_id: string,
  ): Promise<Address> {
    const address = await this.ormRepository.create({
      neighborhood,
      number,
      complement,
      city_id,
    });

    await this.ormRepository.save(address);

    return address;
  }
}
