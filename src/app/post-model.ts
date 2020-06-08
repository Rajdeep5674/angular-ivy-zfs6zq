export class PostModel {
  constructor(
    public name:string,
    public user_id:string,
    public message:string,
    public like_count:number,
    public post_time:string,
    public topics:string,
    public urgent:boolean
  ){}
}