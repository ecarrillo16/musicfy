export class User {
  constructor (
    public _id: string,
    public name: string,
    public surname: string,
    public password: string,
    public email: string,
    public role: string,
    public image: string
  ) {

  }
}
