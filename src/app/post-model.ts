export class PostModel {
  constructor(
    public name:string,
    public message:string,
    public like_count:number,
    public post_time:string
  ){}
}