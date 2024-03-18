import { getRepository, Repository } from 'typeorm';

import State from '@entities/State';

export default class StateRepository {
  private ormRepository: Repository<State>;

  constructor() {
    this.ormRepository = getRepository(State);
  }

  public async createOrUpdate(name: string): Promise<State> {
    let state = await this.ormRepository.findOne({
      name,
    });

    if (!state) {
      state = await this.ormRepository.create({
        name,
      });

      await this.ormRepository.save(state);
    }

    return state;
  }
}
