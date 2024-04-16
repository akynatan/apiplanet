import { Router } from 'express';

import GetClientByCPFService from '@services/planetphone/GetClientByCPFService';
import DesbloqueioDeConfiancaService from '@services/planetphone/DesbloqueioDeConfiancaService';
import SendFaturaEmailService from '@services/planetphone/SendFaturaEmailService';
import SendFaturaSMSService from '@services/planetphone/SendFaturaSMSService';

const authenticationRouter = Router();

authenticationRouter.get('/getclientbycpf', async (request, response) => {
  const { cpf_cnpj } = request.query;

  const getClientByCPF = new GetClientByCPFService();

  const data = await getClientByCPF.execute({
    cpf_cnpj: cpf_cnpj as string,
  });

  return response.json({ data });
});

authenticationRouter.post(
  '/desbloqueioconfianca',
  async (request, response) => {
    const { id_cliente_servico } = request.query;

    const desbloqueioDeConfianca = new DesbloqueioDeConfiancaService();

    const data = await desbloqueioDeConfianca.execute(
      Number(id_cliente_servico),
    );

    return response.json({ data });
  },
);

authenticationRouter.post('/faturaporemail', async (request, response) => {
  const { cpf_cnpj } = request.query;

  const sendFaturaEmail = new SendFaturaEmailService();

  const data = await sendFaturaEmail.execute({
    cpf_cnpj: cpf_cnpj as string,
  });

  return response.json({ data });
});

authenticationRouter.post('/faturaporsms', async (request, response) => {
  const { cpf_cnpj } = request.query;

  const sendFaturaSMS = new SendFaturaSMSService();

  const data = await sendFaturaSMS.execute({
    cpf_cnpj: cpf_cnpj as string,
  });

  return response.json({ data });
});

export default authenticationRouter;
