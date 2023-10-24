import { BaseModel } from "./base";


export enum ROLE {
    USER = 0,
    ADMIN = 1,
  }
export class User  extends BaseModel {
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public username: string;

    constructor() {
        super();
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.username = '';
    }
}