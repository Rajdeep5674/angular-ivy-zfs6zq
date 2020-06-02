export class Notification {
  constructor(
    public user_id:string,
    public notification_count:number,
    public notification_read:boolean
  ){}
}