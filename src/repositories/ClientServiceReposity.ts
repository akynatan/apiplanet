import { getRepository, Repository } from 'typeorm';

import ClientService from '@entities/ClientService';

type CreateServiceDTO = {
  id_client_service_external: number;
  status_prefix?: string;
  enabled_in?: string;
  technology?: string;
  address_id?: string;
  service_id?: string;
  client_id?: string;
  interface_id?: string;
  interface_routing_id?: string;
  equipament_connection_id?: string;
  equipament_routing_id?: string;
};

export default class ClientServiceReposity {
  private ormRepository: Repository<ClientService>;

  constructor() {
    this.ormRepository = getRepository(ClientService);
  }

  public async findByClientServiceExternal(
    id_client_service_external: number,
  ): Promise<ClientService | undefined> {
    const client_service = await this.ormRepository.findOne({
      id_client_service_external,
    });

    return client_service;
  }

  public async createOrUpdate({
    address_id,
    client_id,
    service_id,
    interface_id,
    interface_routing_id,
    equipament_connection_id,
    equipament_routing_id,
    status_prefix,
    technology,
    enabled_in,
    id_client_service_external,
  }: CreateServiceDTO): Promise<ClientService> {
    let client_service = await this.ormRepository.findOne({
      id_client_service_external,
    });

    if (!client_service) {
      client_service = await this.ormRepository.create({
        address_id,
        client_id,
        service_id,
        interface_id,
        interface_routing_id,
        equipament_connection_id,
        equipament_routing_id,
        status_prefix,
        technology,
        enabled_in,
        id_client_service_external,
      });
    }

    client_service.address_id = address_id || client_service.address_id;
    client_service.client_id = client_id || client_service.client_id;
    client_service.service_id = service_id || client_service.service_id;
    client_service.interface_id = interface_id || client_service.interface_id;
    client_service.interface_routing_id =
      interface_routing_id || client_service.interface_routing_id;
    client_service.equipament_connection_id =
      equipament_connection_id || client_service.equipament_connection_id;
    client_service.equipament_routing_id =
      equipament_routing_id || client_service.equipament_routing_id;
    client_service.status_prefix =
      status_prefix || client_service.status_prefix;
    client_service.technology = technology || client_service.technology;
    client_service.enabled_in = enabled_in || client_service.enabled_in;

    await this.ormRepository.save(client_service);

    return client_service;
  }
}
