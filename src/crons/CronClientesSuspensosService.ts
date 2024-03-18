import { getTime, getMonth, getDate, getYear } from 'date-fns';
import { stringify } from 'querystring';

import apiHubsoft from '@apis/apiHubsoft';
import apiPlanet from '@apis/apiPlanet';
import IResponseClientesSuspensos from '@dtos/IResponseClientesSuspensos';

export default class CronClientesSuspensos {
  public async execute(): Promise<any> {
    console.log('Inicio busca clientes suspensos');
    const response = await apiHubsoft.get(
      `cliente/servico/customizado/suspenso_debito/2000?page=1`,
    );

    const clientes: IResponseClientesSuspensos[] =
      response.data.cliente_servicos.data;

    const now = new Date();
    const day = getDate(now);
    const month = getMonth(now);
    const year = getYear(now);

    const timestamp = getTime(new Date(year, month, day));

    const clientesSuspensosHoje = clientes.filter(
      cli => cli.data_suspensao_timestamp > timestamp,
    );

    // CriarLista
    const responseCriarLista = await apiPlanet.post(
      'criarLista',
      stringify({
        nome: `Clientes_Suspensos_Integracao_${now.toJSON()}`,
        id_campanha: process.env.ID_CAMPANHA_SUSPENSAO,
        ativa: true,
        formato_mailing: process.env.ID_FORMATO_MAILING_SUSPENSAO,
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
        dados: clientesSuspensosHoje,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Final busca clientes suspensos');
    return clientesSuspensosHoje;
  }
}
