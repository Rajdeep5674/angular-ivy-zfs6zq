export class LoginModel {
  constructor(
      public user_id:string,
      public password:string,
      public remember_me:boolean
  ){}
}