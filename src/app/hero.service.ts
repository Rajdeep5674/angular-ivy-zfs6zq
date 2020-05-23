import { Injectable } from '@angular/core';
import {AppComponent} from './app.component';
import { PostModel } from './post-model';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {PostModelAdv} from './post-model-adv';

@Injectable()
export class HeroService {
   _url='https://netBankingAppServer--rajdeep5674.repl.co/route';
   _url_like='https://netBankingAppServer--rajdeep5674.repl.co/like';
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




  constructor(private _http:HttpClient ) { }

}