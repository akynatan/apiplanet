import axios from 'axios';
import path from 'path';
import handlebars from 'handlebars';
import Reports from '@services/reports';
import HandlebarsMailTemplateProvider from '../providers/HandlebarsMailTemplateProvider';

class CronReports {
  public async execute(): Promise<void> {
    console.log('inicializou cron reports');
    const dataReports = await new Reports().execute();

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'reports.hbs',
    );

    handlebars.registerPartial('city', '{{city.name}} = {{city.value}}.\n');
    handlebars.registerPartial(
      'neighborhood',
      '{{neighborhood.city_name}} | {{neighborhood.name}} = {{neighborhood.value}}.\n',
    );
    handlebars.registerPartial('plan', '{{plan.name}} = {{plan.value}}.\n');
    handlebars.registerPartial(
      '_interface',
      '{{_interface.name}} = {{_interface.value}}.\n',
    );
    handlebars.registerPartial(
      'interface_routing',
      '{{interface_routing.name}} = {{interface_routing.value}}.\n',
    );
    handlebars.registerPartial(
      'equipament_connection',
      '{{equipament_connection.name}} = {{equipament_connection.value}}.\n',
    );
    handlebars.registerPartial(
      'equipament_routing',
      '{{equipament_routing.name}} = {{equipament_routing.value}}.\n',
    );

    const contentBody = await new HandlebarsMailTemplateProvider().parse({
      file: forgotPasswordTemplate,
      variables: {
        name: 'Pessoal',
        ...dataReports,
        trust_unlock: dataReports.trust_unlock[0].count,
      },
    });

    await axios.post(
      'https://api.smtplw.com.br/v1/messages',
      {
        subject: 'Reports',
        body: contentBody,
        from: 'no-reply@northtelecom.com.br',
        to:
          process.env.ENVIROMENT === 'prod'
            ? [
                'ti@northtelecom.com.br',
                'renato.cesar@northtelecom.com.br',
                'marco.justino@bizzinternet.com',
              ]
            : ['desenvolvimento@northtelecom.com.br', 'akynatan@outlook.com'],
        headers: {
          'Content-Type': 'text/plain',
        },
      },
      {
        headers: {
          'Content-Type': ' application/json',
          'x-auth-token': process.env.TOKEN_LOCAL_WEB,
        },
      },
    );

    console.log('terminou cron reports');
  }
}

export default CronReports;
