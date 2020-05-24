export class PostIdAndMessageToUser {
  constructor(
    public post_id:number,
    public post_id_for_comment:number,
    public message_to_user:string
  ){}
}