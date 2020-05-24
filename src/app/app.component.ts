import { Component, VERSION } from '@angular/core';
import { PostModel } from './post-model';
import {HeroService} from './hero.service';
import {PostModelAdv} from './post-model-adv';
import {PostIdAndMessageToUser} from './post-id-and-message-to-user';

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
  you="";
  data_from_server_for_like_count:any;
  data_length=0;
  data_length_array=[];
  view_all_post=false;
  like_button_pressed=[];
  //page_load=true;
      constructor(private _enrollmentService:HeroService) { }

  ngOnInit() {
  }

  PostModel = new PostModel('','',0);
  PostModelAdv=new PostModelAdv(0);
  PostIdAndMessageToUser=new PostIdAndMessageToUser(0,'');

  submitted = false;

  onSubmit() { 
    this.you="";
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
    this.you="";
    //this.page_load=true;
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
    this.you="";
    this.view_all_post=false;
  }
  like(post_id){
    console.log(post_id);
    this.like_button_pressed.push(post_id);
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
    this.PostIdAndMessageToUser.post_id=post_id;
    this.PostIdAndMessageToUser.message_to_user="You liked this post";
  //this.page_load=false;
  //this.you=" and you ";
  }


}
