import CityRepository from '@repositories/CityRepository';
import StateRepository from '@repositories/StateRepository';
import AddressRepository from '@repositories/AddressRepository';
import ClientRepository from '@repositories/ClientRepository';
import ServiceRepository from '@repositories/ServiceReposity';
import InterfaceReposity from '@repositories/InterfaceReposity';
import InterfaceRoutingReposity from '@repositories/InterfaceRoutingReposity';
import EquipamentConnectionReposity from '@repositories/EquipamentConnectionReposity';
import EquipamentRoutingReposity from '@repositories/EquipamentRoutingReposity';
import ClientServiceReposity from '@repositories/ClientServiceReposity';
import CallRepository from '@repositories/CallRepository';
import ErrorsRepository from '@repositories/ErrorsRepository';
import TypeCallEnum from '@enum/TypeCallEnum';

export default class RegisterCallGetClientService {
  public async execute(clientApiHubsoft: any): Promise<void> {
    try {
      const cityRepository = new CityRepository();
      const stateRepository = new StateRepository();
      const addressRepository = new AddressRepository();
      const clientRepository = new ClientRepository();
      const serviceRepository = new ServiceRepository();
      const interfaceReposity = new InterfaceReposity();
      const interfaceRoutingReposity = new InterfaceRoutingReposity();
      const equipamentConnectionReposity = new EquipamentConnectionReposity();
      const equipamentRoutingReposity = new EquipamentRoutingReposity();
      const clientServiceReposity = new ClientServiceReposity();
      const callRepository = new CallRepository();

      const { nome_razaosocial, tipo_pessoa, id_cliente, servicos } =
        clientApiHubsoft;

      const {
        endereco_cadastral,
        nome,
        status_prefixo,
        data_habilitacao,
        tecnologia,
        id_cliente_servico,
        id_servico,
        interface: _interface,
        interface_roteamento,
        equipamento_conexao,
        equipamento_roteamento,
      } = servicos[0];

      const { uf, cidade, bairro, numero, complemento } = endereco_cadastral;

      const state = await stateRepository.createOrUpdate(uf);
      const city = await cityRepository.createOrUpdate(cidade, state.id);
      const address = await addressRepository.createOrUpdate(
        bairro,
        numero,
        complemento,
        city.id,
      );

      const service = await serviceRepository.createOrUpdate({
        name: nome,
        id_service_external: id_servico,
      });

      const client = await clientRepository.createOrUpdate({
        name: nome_razaosocial,
        person_type: tipo_pessoa,
        id_client_external: id_cliente,
      });

      const _interface_created = await interfaceReposity.createOrUpdate({
        name: _interface.nome,
        type: _interface.tipo,
      });

      const interface_routing = await interfaceRoutingReposity.createOrUpdate({
        name: interface_roteamento.nome,
        type: interface_roteamento.tipo,
      });

      const equipament_connection =
        await equipamentConnectionReposity.createOrUpdate({
          name: equipamento_conexao.nome,
          ipv4: equipamento_conexao.ipv4,
        });

      const equipament_routing = await equipamentRoutingReposity.createOrUpdate(
        {
          name: equipamento_roteamento.nome,
          ipv4: equipamento_roteamento.ipv4,
        },
      );

      const client_service = await clientServiceReposity.createOrUpdate({
        id_client_service_external: id_cliente_servico,
        enabled_in: data_habilitacao,
        status_prefix: status_prefixo,
        technology: tecnologia,
        address_id: address.id,
        client_id: client.id,
        service_id: service.id,
        interface_id: _interface_created.id,
        interface_routing_id: interface_routing.id,
        equipament_connection_id: equipament_connection.id,
        equipament_routing_id: equipament_routing.id,
      });

      await callRepository.create({
        client_service_id: client_service.id,
        type: TypeCallEnum.GET_CLIENT,
      });
    } catch (err) {
      console.log(err);
      const errorRepository = new ErrorsRepository();
      errorRepository.create({
        name: 'register call',
        exception: `${JSON.stringify(err)}`,
        instance_id: '',
        instance_name: '',
      });
    }
  }
}
