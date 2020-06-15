export class YourBasicDetailsEditModel {
  constructor(
    public user_id:string,
    public full_name:string,
    public email:string,
    public old_password:string,
    public new_password:string,
  ){}
}