export class PostModelAdv {
  constructor(
    public post_id:number,
    public liker_name:string,
    public liker_user_id:string,
    public comment:string,
    public like_indicator:boolean
  ){}
}