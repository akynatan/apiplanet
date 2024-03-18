import { stringify } from 'querystring';

import api from '@apis/apiHubsoft';
import AppError from '@errors/AppError';

interface Request {
  cpf_cnpj: string;
}

interface ResponseFaturasApiHubsoft {
  id_fatura: string;
  data_vencimento: string;
}

class SendFaturaSMSService {
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

    await api.post(`integracao/cliente/financeiro/enviar_sms`, {
      id_fatura: faturaAEnviar.id_fatura,
    });

    return faturaAEnviar;
  }
}

export default SendFaturaSMSService;
