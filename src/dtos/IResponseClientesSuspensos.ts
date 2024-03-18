export default interface IResponseClientesSuspensos {
  id_cliente_servico: number;
  status_prefixo: string;
  status: string;
  nome_razaosocial: string;
  telefone_primario: string;
  telefone_secundario: string;
  servico: string;
  quantidade_atrasado: number;
  valor_atrasado: number;
  data_suspensao: string;
  data_suspensao_br: string;
  data_suspensao_timestamp: number;
  cliente: {
    id_cliente: number;
    codigo_cliente: number;
    nome_razaosocial: string;
  };
}
