export interface IResponseCustomField {
  value: string;
  custom_field: {
    label: string;
  };
}

export interface IResponseDealProduct {
  product_id: string;
  price: number;
  total: number;
}

export interface IResponseGetDeals {
  id: string;
  name: string;
  amount_montly: number;
  amount_unique: number;
  amount_total: number;
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
  user: {
    id: string;
  };
  deal_custom_fields: IResponseCustomField[];
  deal_products: IResponseDealProduct[];
}
