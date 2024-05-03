import GenericRepository from '@repositories/GenericRepository';

export default class Reports {
  public async execute(): Promise<any> {
    const genericRepository = new GenericRepository();

    const intervalWhere =
      "and c.created_at >= current_date - 1 + time '00:00:00' and c.created_at <= current_date - 1 + time '23:59:59'";

    const queries = [
      `
        select c2.name, count(c.id) as value from "call" c
        inner join client_service cs on cs.id = c.client_service_id
        inner join address a on a.id = cs.address_id
        inner join city c2 on c2.id = a.city_id
        where c.type  = 'get_client' ${intervalWhere}
        group by c2.name
        order by c2.name
      `,
      `
        select c2.name as city_name, a.neighborhood as name, count(c.id) as value from "call" c
        inner join client_service cs on cs.id = c.client_service_id
        inner join address a on a.id = cs.address_id
        inner join city c2 on c2.id = a.city_id
        where c.type  = 'get_client' ${intervalWhere}
        group by c2.name, a.neighborhood
        order by c2.name, a.neighborhood
      `,
      `
        select s."name" , count(c.id) as value from "call" c
        inner join client_service cs on cs.id = c.client_service_id
        inner join service s on s.id = cs.service_id
        where c.type  = 'get_client' ${intervalWhere}
        group by s."name"
        order by s."name"
      `,
      `
        select i."name" , count(c.id) as value from "call" c
        inner join client_service cs on cs.id = c.client_service_id
        inner join interface i on i.id = cs.interface_id
        where c.type  = 'get_client' ${intervalWhere}
        group by i."name"
        order by i."name"
      `,
      `
        select ir."name" , count(c.id) as value from "call" c
        inner join client_service cs on cs.id = c.client_service_id
        inner join interface_routing ir on ir.id = cs.interface_routing_id
        where c.type  = 'get_client' ${intervalWhere}
        group by ir."name"
        order by ir."name"
      `,
      `
        select ec."name" , count(c.id) as value from "call" c
        inner join client_service cs on cs.id = c.client_service_id
        inner join equipament_connection ec on ec.id = cs.equipament_connection_id
        where c.type  = 'get_client' ${intervalWhere}
        group by ec."name"
        order by ec."name"
      `,
      `
        select er."name" , count(c.id) as value from "call" c
        inner join client_service cs on cs.id = c.client_service_id
        inner join equipament_routing er  on er.id = cs.equipament_routing_id
        where c.type  = 'get_client' ${intervalWhere}
        group by er."name"
        order by er."name"
      `,
      `
        select count(1) from "call" c
        where c.type  = 'trust_unlock'  ${intervalWhere}
      `,
    ];

    const [
      cities,
      neighborhoods,
      plans,
      _interfaces,
      interfaces_routing,
      equipaments_connection,
      equipaments_routing,
      trust_unlock,
    ] = await Promise.all(
      queries.map(query => genericRepository.execute(query)),
    );

    return {
      cities,
      neighborhoods,
      plans,
      _interfaces,
      interfaces_routing,
      equipaments_connection,
      equipaments_routing,
      trust_unlock,
    };
  }
}
