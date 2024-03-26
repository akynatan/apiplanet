import axios from 'axios';
import path from 'path';
import handlebars from 'handlebars';
import Reports from '@services/reports';
import HandlebarsMailTemplateProvider from '../providers/HandlebarsMailTemplateProvider';

class CronReports {
  public async execute(): Promise<void> {
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

    const contentBody = await new HandlebarsMailTemplateProvider().parse({
      file: forgotPasswordTemplate,
      variables: {
        name: 'desenvolvimento@northtelecom.com.br',
        ...dataReports,
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
            ? 'renato.cesar@northtelecom.com.br'
            : 'desenvolvimento@northtelecom.com.br',
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
  }
}

export default CronReports;
