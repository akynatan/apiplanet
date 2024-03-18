import { addDays } from 'date-fns';
import { stringify } from 'querystring';

import apiHubsoft from '@apis/apiHubsoft';
import apiPlanet from '@apis/apiPlanet';
import IResponseClientesDevedores from '@dtos/IResponseClientesDevedores';

export default class CronClientesFaturasToWinTwoDaysService {
  public async execute(): Promise<any> {
    console.log('Inicio busca clientes com faturas a vencer daqui a 2 dias');
    const now = new Date();
    const date = addDays(now, 2);

    const response = await apiHubsoft.post(`relatorio/conta_receber`, {
      busca: null,
      cliente_ativo: null,
      data_fim: date.toJSON(),
      data_inicio: date.toJSON(),
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
        nome: `Clientes_Com_Faturas_A_Vencer_2_Dias_${now.toJSON()}`,
        id_campanha: process.env.ID_CAMPANHA_BOLETOS_A_VENCER_2_DIAS,
        ativa: false,
        formato_mailing: process.env.ID_FORMATO_MAILING_BOLETOS_A_VENCER_2_DIAS,
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

    console.log('Fim busca clientes com faturas a vencer daqui a 2 dias');
    return clientes;
  }
}
