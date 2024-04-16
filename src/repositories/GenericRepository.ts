import { EntityManager, getManager } from 'typeorm';

export default class GenericRepository {
  private manager: EntityManager;

  constructor() {
    this.manager = getManager();
  }

  public async execute(query: string): Promise<any> {
    const rawData = await this.manager.query(query);

    return rawData;
  }
}
