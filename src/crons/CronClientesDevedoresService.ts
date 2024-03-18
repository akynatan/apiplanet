import { stringify } from 'querystring';
import { subDays } from 'date-fns';

import apiHubsoft from '@apis/apiHubsoft';
import apiPlanet from '@apis/apiPlanet';
import IResponseClientesDevedores from '@dtos/IResponseClientesDevedores';

export default class CronClientesDevedoresService {
  public async execute(): Promise<any> {
    console.log('Inicio busca clientes devedores');
    const now = new Date();
    const date = subDays(now, 5);

    const response = await apiHubsoft.post(`relatorio/conta_receber`, {
      busca: null,
      cliente_ativo: null,
      data_fim: date.toJSON(),
      data_inicio: '2020-01-01',
      encrypted: false,
      group_by: 'cliente',
      order_by: 'data_vencimento',
      order_by_key: 'ASC',
      page: 1,
      quant: '10000',
      recebido: false,
      relations: true,
      status: [{ descricao: 'Aguardando', valor: 'aguardando' }],
      tipo_data: 'data_vencimento',
      tipo_movimento: null,
    });

    const clientes_response: IResponseClientesDevedores[] =
      response.data.paginador.data;
    const { ordenacao } = response.data;

    const coluna_sorteada:
      | 'bairro'
      | 'cidade'
      | 'endereco'
      | 'numero'
      | 'cpf_cnpj'
      | 'codigo_cliente'
      | 'id_cliente'
      | 'nome_razaosocial'
      | 'descricao'
      | 'telefone_primario'
      | 'telefone_secundario'
      | 'telefone_terciario'
      | 'quantidade_cobranca'
      | 'valor'
      | 'email_principal'
      | 'email_secundario'
      | 'juros'
      | 'numero_plano'
      | 'valor_pago' = ordenacao[Math.floor(Math.random() * 10)];

    const clientesSorted = clientes_response.sort((a, b) => {
      if (a[coluna_sorteada] > b[coluna_sorteada]) {
        return 1;
      }
      if (a[coluna_sorteada] < b[coluna_sorteada]) {
        return -1;
      }
      return 0;
    });

    const clientes = clientesSorted.map(cli => {
      return {
        bairro: cli.bairro,
        cidade: cli.cidade,
        endereco: cli.endereco,
        numero: cli.numero,
        cpf_cnpj: cli.cpf_cnpj,
        codigo_cliente: cli.codigo_cliente,
        nome_razaosocial: cli.nome_razaosocial,
        descricao: cli.descricao,
        telefone_primario: cli.telefone_primario,
        telefone_secundario: cli.telefone_secundario,
        quantidade_cobranca: cli.quantidade_cobranca,
        valor: cli.valor,
      };
    });

    // CriarLista
    const responseCriarLista = await apiPlanet.post(
      'criarLista',
      stringify({
        nome: `Clientes_Devedores_Integracao_${now.toJSON()}`,
        id_campanha: process.env.ID_CAMPANHA_COBRANCA,
        ativa: true,
        formato_mailing: process.env.ID_FORMATO_MAILING_COBRANCA,
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
        dados: clientes,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Final busca clientes devedores');
    return clientes;
  }
}
