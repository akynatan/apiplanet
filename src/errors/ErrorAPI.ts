export default class ErrorAPI extends Error {
  public readonly message: string;

  public readonly name: string;

  constructor(message: string, name = 'ErrorAPI') {
    super(message);

    this.message = message;
    this.name = name;
  }
}
