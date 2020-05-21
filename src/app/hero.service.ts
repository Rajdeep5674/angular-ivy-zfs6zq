import { Injectable } from '@angular/core';
import {AppComponent} from './app.component';
import { Hero } from './hero';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeroService {
   _url='https://netBankingAppServer--rajdeep5674.repl.co/route';
  result:any;
 enroll(user:Hero)
  {
    this.result=this._http.post<any>(this._url,user);
    console.log("result is "+this.result);
    return this.result;
    
  }
  getHeros()
  {
    return this.result=this._http.get<any>(this._url);
  }


  constructor(private _http:HttpClient ) { }

}