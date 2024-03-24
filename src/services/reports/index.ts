import GenericRepository from '@repositories/GenericRepository';

export default class Reports {
  public async execute(): Promise<any> {
    const genericRepository = new GenericRepository();

    const queries = [
      `
        select c2.name, count(c.id) as value from "call" c
        inner join address a on a.id = c.address_id
        inner join city c2 on c2.id = a.city_id
        group by c2.name
        order by c2.name
      `,
      `
        select c2.name as city_name, a.neighborhood as name, count(c.id) as value from "call" c
        inner join address a on a.id = c.address_id
        inner join city c2 on c2.id = a.city_id
        group by c2.name, a.neighborhood
        order by c2.name, a.neighborhood
      `,
      `
        select s."name" , count(c.id) as value from "call" c
        inner join service s on s.id = c.service_id
        group by s."name"
        order by s."name"
      `,
    ];

    const [cities, neighborhoods, plans] = await Promise.all(
      queries.map(query => genericRepository.execute(query)),
    );

    return {
      cities,
      neighborhoods,
      plans,
    };
  }
}
