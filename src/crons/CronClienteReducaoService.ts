import { getTime, getMonth, getDate, getYear } from 'date-fns';
import { stringify } from 'querystring';

import apiHubsoft from '@apis/apiHubsoft';
import apiPlanet from '@apis/apiPlanet';
import IResponseClientesReducao from '@dtos/IResponseClientesReducao';

class CronClienteReducao {
  public async execute(): Promise<any> {
    console.log('Inicio busca clientes reducao');
    const response = await apiHubsoft.get(
      `cliente/servico/customizado/suspenso_parcialmente/1000?page=1`,
    );

    const clientes: IResponseClientesReducao[] =
      response.data.cliente_servicos.data;

    const now = new Date();
    const day = getDate(now);
    const month = getMonth(now);
    const year = getYear(now);

    const timestamp = getTime(new Date(year, month, day));
    const clientesEmReducaoHoje = clientes.filter(
      cli => cli.data_suspensao_timestamp > timestamp,
    );

    // CriarLista
    const responseCriarLista = await apiPlanet.post(
      'criarLista',
      stringify({
        nome: `Clientes_Reducao_Integracao_${now.toJSON()}`,
        id_campanha: process.env.ID_CAMPANHA_REDUCAO,
        ativa: true,
        formato_mailing: process.env.ID_FORMATO_MAILING_REDUCAO,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { id_lista } = responseCriarLista.data;

    await apiPlanet.post(
      'carregarMailing',
      {
        id_lista,
        dados: clientesEmReducaoHoje,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Fim busca clientes reducao');
    return clientesEmReducaoHoje;
  }
}

export default CronClienteReducao;
