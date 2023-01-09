import { Account } from "src/app/models/account.model";

export interface AuthState{
  auth:Account|null,
  loading:boolean,
  error:string,
}
