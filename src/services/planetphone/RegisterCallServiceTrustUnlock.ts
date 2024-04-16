import CallRepository from '@repositories/CallRepository';
import ClientServiceReposity from '@repositories/ClientServiceReposity';
import ErrorsRepository from '@repositories/ErrorsRepository';
import TypeCallEnum from '@enum/TypeCallEnum';

export default class RegisterCallServiceTrustUnlock {
  public async execute(id_client_service_external: number): Promise<void> {
    try {
      const callRepository = new CallRepository();
      const clientServiceReposity = new ClientServiceReposity();

      const client_service = await clientServiceReposity.createOrUpdate({
        id_client_service_external,
      });

      await callRepository.create({
        type: TypeCallEnum.TRUST_UNOLOCK,
        client_service_id: client_service.id,
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
