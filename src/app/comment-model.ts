export class CommentModel {
    constructor(
    public post_id:number,
    public commentor_name:string,
    public comment:string,
    public comment_time:string
  ){}
}