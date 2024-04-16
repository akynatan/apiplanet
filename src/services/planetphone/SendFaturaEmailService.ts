import { stringify } from 'querystring';

import api from '@apis/apiHubsoft';
import AppError from '@errors/AppError';
import TypeCallEnum from '@enum/TypeCallEnum';
import RegisterCallSendSlipService from './RegisterCallSendSlipService';

interface Request {
  cpf_cnpj: string;
}

interface ResponseFaturasApiHubsoft {
  id_fatura: string;
  data_vencimento: string;
}
interface ResponseClientApiHubsoft {
  cpf_cnpj: string;
  telefone_primario: string;
  telefone_secundario: string;
  telefone_terciario: string;
}

class SendFaturaEmailService {
  public async execute({
    cpf_cnpj,
  }: Request): Promise<ResponseFaturasApiHubsoft> {
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const queryParams = stringify({
      busca: 'cpf_cnpj',
      termo_busca: cpf_cnpj,
      apenas_pendente: 'sim',
    });

    const response = await api.get(
      `integracao/cliente/financeiro?${queryParams}`,
    );

    this.registerCall(cpf_cnpj);

    const faturasResponse: ResponseFaturasApiHubsoft[] = response.data.faturas;

    const faturaAEnviar = faturasResponse.find(fatura => {
      const [dia, mes, ano] = fatura.data_vencimento.split('/');
      const dataVencimento = new Date(
        Number(ano),
        Number(Number(mes) - 1),
        Number(dia),
      );

      return primeiroDia < dataVencimento && ultimoDia > dataVencimento;
    });

    if (!faturaAEnviar) {
      throw new AppError('Nenhuma fatura', 400);
    }

    await api.post(`integracao/cliente/financeiro/enviar_email`, {
      id_fatura: faturaAEnviar.id_fatura,
    });

    return faturaAEnviar;
  }

  async registerCall(cpf_cnpj: string): Promise<void> {
    const queryParams = stringify({
      busca: 'cpf_cnpj',
      termo_busca: cpf_cnpj,
    });

    const response = await api.get(`integracao/cliente?${queryParams}`);
    if (response?.data?.clientes) {
      const clients: ResponseClientApiHubsoft[] = response.data.clientes;

      if (clients && clients[0]) {
        new RegisterCallSendSlipService().execute(
          clients[0],
          TypeCallEnum.SEND_SLIP_EMAIL,
        );
      }
    }
  }
}

export default SendFaturaEmailService;
