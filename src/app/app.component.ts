import { Component, VERSION } from '@angular/core';
import { PostModel } from './post-model';
import {HeroService} from './hero.service';
import {PostModelAdv} from './post-model-adv';
import {PostIdAndMessageToUser} from './post-id-and-message-to-user';
import {CommentModel} from './comment-model';
import {PostIdComments} from './post-id-comments'

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
  data_from_server_for_comment:any;
  you="";
  data_from_server_for_like_count:any;
  data_length=0;
  data_length_array=[];
  view_all_post=false;
  like_button_pressed=[];
  comment_button_pressed_array=[];
  comment_button_pressed=false;
  comment_array=[];

  view_all_comments_boolean=false;
  go=false;

  //page_load=true;
      constructor(private _enrollmentService:HeroService) { }

  ngOnInit() {
  }

  PostModel = new PostModel('','',0);
  PostModelAdv=new PostModelAdv(0,'');
  PostIdAndMessageToUser=new PostIdAndMessageToUser(0,0,'');
  CommentModel=new CommentModel(0,'','');
  PostIdComments=new PostIdComments(0,'');

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

//event handler for comment button pressed
  comment(post_id){
    console.log("comment pressed for "+post_id);
  this.comment_button_pressed=true;
  this.PostIdAndMessageToUser.post_id_for_comment=post_id;
//console.log(this.CommentModel);
  }

  //event handler for go button pressed in comment
  commentSubmitted(post_id){
  this.CommentModel.post_id=post_id+1;
  //console.log(this.CommentModel);
    this._enrollmentService.comment(this.CommentModel).subscribe(
    (data_from_server_for_comment=>{
      this.data_from_server_for_comment=data_from_server_for_comment;
      console.log(data_from_server_for_comment);
      this.comment_array=[];

      for(var i=0;i<data_from_server_for_comment.length;i++)
    {
      this.comment_array.push(i);
    }
        }
    ));
    this.go=true;
  }

  view_all_comments(post_id){
    this.CommentModel.post_id=post_id;

    this.comment_button_pressed_array.push(post_id);
    this.PostIdComments.post_id=post_id;
    
        this._enrollmentService.fetch_all_comemnts_for_a_post_id(this.CommentModel).subscribe(
    (data_from_server_for_comment=>{
      this.data_from_server_for_comment=data_from_server_for_comment;
      console.log(data_from_server_for_comment);
      this.comment_array=[];

      for(var i=0;i<data_from_server_for_comment.length;i++)
    {
      this.comment_array.push(i);
    }
        }
    ));

    this.view_all_comments_boolean=true;
  }

  hide_all_comments(post_id){
    this.view_all_comments_boolean=false;
  }


}
