import api from '@apis/apiHubsoft';
import RegisterCallServiceTrustUnlock from '@services/planetphone/RegisterCallServiceTrustUnlock';

class DesbloqueioDeConfiancaService {
  public async execute(id_client_service_external: number): Promise<any> {
    const response = await api.post(
      `integracao/cliente/desbloqueio_confianca`,
      {
        id_cliente_servico: id_client_service_external,
        dias_desbloqueio: 3,
      },
    );

    console.log(response);

    await new RegisterCallServiceTrustUnlock().execute(
      id_client_service_external,
    );

    return response.data;
  }
}

export default DesbloqueioDeConfiancaService;
