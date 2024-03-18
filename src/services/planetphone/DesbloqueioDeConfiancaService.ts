import api from '@apis/apiHubsoft';

interface Request {
  id_cliente_servico: string;
}

class DesbloqueioDeConfiancaService {
  public async execute({ id_cliente_servico }: Request): Promise<any> {
    const response = await api.post(
      `integracao/cliente/desbloqueio_confianca`,
      {
        id_cliente_servico,
      },
    );

    return response.data;
  }
}

export default DesbloqueioDeConfiancaService;
