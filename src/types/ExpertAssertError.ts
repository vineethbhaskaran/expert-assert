export default class ExpertAssertError extends Error {
  data: string;

  constructor(name: string, data: any) {
    super(name);
    this.name = name;
    this.data = data;
  }
}
