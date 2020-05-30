import { Injectable } from '@angular/core';
import {AppComponent} from './app.component';
import { PostModel } from './post-model';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {PostModelAdv} from './post-model-adv';
import {CommentModel} from './comment-model';
import {CustomerDetaillsRoot} from './customer-detaills-root';
import {LoginModel} from './login-model';

@Injectable()
export class HeroService {
   _url='https://netBankingAppServer--rajdeep5674.repl.co/route';
   _url_like='https://netBankingAppServer--rajdeep5674.repl.co/like';
    _url_unlike='https://netBankingAppServer--rajdeep5674.repl.co/unlike';
   _url_who_like="https://netBankingAppServer--rajdeep5674.repl.co/who_like";
   _url_comment='https://netBankingAppServer--rajdeep5674.repl.co/comment';
   _url_comment_view_all='https://netBankingAppServer--rajdeep5674.repl.co/comment_view_all';
   _url_customer_details_post='https://netBankingAppServer--rajdeep5674.repl.co/customer_details_post';
   _url_login_auth_check='https://netBankingAppServer--rajdeep5674.repl.co/login_auth_check';
   _url_get_my_liked_post_ids='https://netBankingAppServer--rajdeep5674.repl.co/get_my_liked_postids';
  result:any;
 enroll(PostModel:PostModel)
  {
    this.result=this._http.post<any>(this._url,PostModel);
    console.log("result is "+this.result);
    return this.result;
    
  }
  getPosts()
  {
    return this.result=this._http.get<any>(this._url);
  }
  like(PostModelAdv:PostModelAdv)
  {
    return this._http.post<any>(this._url_like,PostModelAdv);
  }
  unlike(PostModelAdv:PostModelAdv)
  {
    return this._http.post<any>(this._url_unlike,PostModelAdv);
  }
  comment(CommentModel:CommentModel)
  {
    return this._http.post<any>(this._url_comment,CommentModel);
  }
  fetch_all_comemnts_for_a_post_id(CommentModel:CommentModel){
    return this.result=this._http.post<any>(this._url_comment_view_all,CommentModel);
  }
  post_customer_details_root(CustomerDetaillsRoot:CustomerDetaillsRoot){
     return this._http.post<any>(this._url_customer_details_post,CustomerDetaillsRoot);
  }
  post_login_details_for_auth_check(LoginModel:LoginModel){
    return this._http.post<any>(this._url_login_auth_check,LoginModel);
  }
  who_liked(PostModelAdv:PostModelAdv){
    return this._http.post<any>(this._url_who_like,PostModelAdv);
  }
  get_my_liked_posts(CustomerDetaillsRoot:CustomerDetaillsRoot){
    return this._http.post<any>(this._url_get_my_liked_post_ids,CustomerDetaillsRoot);
  }





  constructor(private _http:HttpClient ) { }

}