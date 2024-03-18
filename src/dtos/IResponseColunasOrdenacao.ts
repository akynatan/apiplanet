export default interface IResponseColunasOrdenacao {
  coluna: [
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
    | 'valor_pago',
  ];
}
