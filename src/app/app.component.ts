import { Component, VERSION } from '@angular/core';
import { PostModel } from './post-model';
import {HeroService} from './hero.service';
import {PostModelAdv} from './post-model-adv';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  name = 'Angular ' + VERSION.major;
  message_to_user="";
  data_string="";
  post_id=[];
  full_name=[];
  master_array=[];
i=0;
  data:any;
  data_from_server_for_like_count:any;
  data_length=0;
  data_length_array=[];
  view_all_post=false;
      constructor(private _enrollmentService:HeroService) { }

  ngOnInit() {
  }

  PostModel = new PostModel('','',0);
  PostModelAdv=new PostModelAdv(0);


  submitted = false;

  onSubmit() { 
       this._enrollmentService.enroll(this.PostModel).subscribe(
    (data=>{
      if((data.message_from_server)=="Data_inserted"){
        this.message_to_user="You have sucessfully posted your message.";
        this.submitted = true; 
        console.log("post successful");
        }
      else
        console.log("error in posting details")
        }
    ));
    
  }

  viewAllPost(){
    this.view_all_post=true;
           this._enrollmentService.getPosts().subscribe(
    (data=>{
      this.data=data;
      this.data_length_array=[];

      for(var i=0;i<data.length;i++)
    {
      this.data_length_array.push(i);
    }
  
    }));
  }

  hideAllPost(){
    this.view_all_post=false;
  }
  like(post_id){
    console.log(post_id);
    this.PostModelAdv.post_id=post_id;
    this._enrollmentService.like(this.PostModelAdv).subscribe(
    (data_from_server_for_like=>{
      if(typeof(data_from_server_for_like.message_from_server)==="number")
      {
        this.data_from_server_for_like_count=data_from_server_for_like.message_from_server;
        //console.log("it's a number");
      }
      else console.log("something else");
          //console.log(data_from_server_for_like);
        }
    ));
  }


}
