import { getRepository, Repository } from 'typeorm';

import City from '@entities/City';

export default class CityRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async createOrUpdate(name: string, state_id: string): Promise<City> {
    let city = await this.ormRepository.findOne({
      name,
      state_id,
    });

    if (!city) {
      city = await this.ormRepository.create({
        name,
        state_id,
      });

      await this.ormRepository.save(city);
    }

    return city;
  }
}
