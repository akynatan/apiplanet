export default interface ICreateUserDTO {
  name: string;
  email?: string;
  password?: string;
  user_id_rd: string;
  role: string;
  city_id: string;
  manager_id: string;
}
