import CallRepository from '@repositories/CallRepository';
import ErrorsRepository from '@repositories/ErrorsRepository';
import TypeCallEnum from '@enum/TypeCallEnum';

export default class RegisterCallService {
  public async execute(
    type: TypeCallEnum,
    client_service_id: string,
  ): Promise<void> {
    try {
      const callRepository = new CallRepository();

      await callRepository.create({
        type,
        client_service_id,
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
