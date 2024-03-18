import AddressRepository from '@repositories/AddressRepository';
import CallRepository from '@repositories/CallRepository';
import CityRepository from '@repositories/CityRepository';
import ClientRepository from '@repositories/ClientRepository';
import ErrorsRepository from '@repositories/ErrorsRepository';
import ServiceRepository from '@repositories/ServiceReposity';
import StateRepository from '@repositories/StateRepository';

export default class RegisterCallService {
  public async execute(clientApiHubsoft: any): Promise<void> {
    try {
      const cityRepository = new CityRepository();
      const stateRepository = new StateRepository();
      const addressRepository = new AddressRepository();
      const clientRepository = new ClientRepository();
      const serviceRepository = new ServiceRepository();
      const callRepository = new CallRepository();

      const { nome_razaosocial, tipo_pessoa, id_cliente, servicos } =
        clientApiHubsoft;

      const { endereco_cadastral, nome } = servicos[0];
      const service = await serviceRepository.createOrUpdate(nome);

      const { uf, cidade, bairro, numero, complemento } = endereco_cadastral;

      const state = await stateRepository.createOrUpdate(uf);
      const city = await cityRepository.createOrUpdate(cidade, state.id);
      const address = await addressRepository.create(
        bairro,
        numero,
        complemento,
        city.id,
      );

      const client = await clientRepository.createOrUpdate(
        nome_razaosocial,
        tipo_pessoa,
        id_cliente,
      );

      await callRepository.create(client.id, address.id, service.id);
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
