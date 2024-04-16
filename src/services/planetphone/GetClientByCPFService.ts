import { stringify } from 'querystring';
import AppError from '@errors/AppError';
import api from '@apis/apiHubsoft';
import RegisterCallGetClientService from '@services/planetphone/RegisterCallGetClientService';

interface Request {
  cpf_cnpj: string;
}

interface ResponseClientApiHubsoft {
  cpf_cnpj: string;
  telefone_primario: string;
  telefone_secundario: string;
  telefone_terciario: string;
}

class GetClientByCPFService {
  public async execute({
    cpf_cnpj,
  }: Request): Promise<ResponseClientApiHubsoft[]> {
    const queryParams = stringify({
      busca: 'cpf_cnpj',
      termo_busca: cpf_cnpj,
    });

    const response = await api.get(`integracao/cliente?${queryParams}`);
    if (!response?.data?.clientes) {
      throw new AppError('Cliente não encontrado');
    }
    const clients: ResponseClientApiHubsoft[] = response.data.clientes;

    if (clients && clients[0]) {
      new RegisterCallGetClientService().execute(clients[0]);
    }

    return clients;
  }
}

export default GetClientByCPFService;
