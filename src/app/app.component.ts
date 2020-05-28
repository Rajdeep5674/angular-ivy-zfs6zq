import { Component, VERSION } from '@angular/core';
import { PostModel } from './post-model';
import {HeroService} from './hero.service';
import {PostModelAdv} from './post-model-adv';
import {PostIdAndMessageToUser} from './post-id-and-message-to-user';
import {CommentModel} from './comment-model';
import {PostIdComments} from './post-id-comments';
import {CustomerDetaillsRoot} from './customer-detaills-root';
import {LoginModel} from './login-model';

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
  view_all_posts_standby=false;
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
  no_comments_yet=false;

  //variables for login function
  login_boolean=false;
  login_closed=true;
  active_session=false;
  full_name_received_from_server="Guest";
  email_received_from_server="";
  user_id_received_from_server="";
  standby_home_page=false;
  CustomerDetaillsRoot_array=[];
  your_posts_boolean=false;
  your_account_boolean=false;
  notifications_boolean=false;
  //false value indicates the default view without login, true value indicates user successfully logged in into the website.
  view_while_login_auth_true=false;
  //variables for signup function
  signup_boolean=false;
  signup_closed=true;
  userMessage="";

  user_id_already_exists=false;
  new_user_created_successfully=false;

  view_all_commeents_loading=false;
  //page_load=true;
      constructor(private _enrollmentService:HeroService) { }

  ngOnInit() {
  }

  PostModel = new PostModel('','',0,'');
  PostModelAdv=new PostModelAdv(0,'');
  PostIdAndMessageToUser=new PostIdAndMessageToUser(0,0,'');
  CommentModel=new CommentModel(0,'','','');
  PostIdComments=new PostIdComments(0,'');
  CustomerDetaillsRoot=new CustomerDetaillsRoot('','','','','');
  LoginModel=new LoginModel('','')

  submitted = false;

  onSubmit() { 
    this.you="";
    this.PostModel.post_time=new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    this.PostModel.name=this.full_name_received_from_server;
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
    var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

    //console.log(typeof(indiaTime));

    this.view_all_posts_standby=true;
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
    this.view_all_posts_standby=false;
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
    this.comment_button_pressed=true;
    this.CommentModel.post_id=0;
    this.CommentModel.commentor_name="";
    this.CommentModel.comment="";

    this.go=false;
    this.PostIdAndMessageToUser.post_id_for_comment=post_id;
  }

  //event handler for go button pressed in comment
  commentSubmitted(post_id){
  this.CommentModel.post_id=post_id;
  this.CommentModel.commentor_name=this.full_name_received_from_server;
  this.CommentModel.comment_time=new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

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
    this.view_all_comments(post_id);
    this.go=true;
  }

  view_all_comments(post_id){
    this.view_all_commeents_loading=true;
    //if server does not return any comment comment section should not be visible
    this.view_all_comments_boolean=false;
    this.data_from_server_for_comment=null;
    //console.log(CommentModel);
    this.CommentModel.post_id=post_id;

    this.comment_button_pressed_array.push(post_id);
    this.PostIdComments.post_id=post_id;
    
        this._enrollmentService.fetch_all_comemnts_for_a_post_id(this.CommentModel).subscribe(
    (data_from_server_for_comment=>{

      //check if server returns object which means there is atleast one comment then only comment shoudl be visible, false otherwise
      if(typeof(data_from_server_for_comment)==="object"){
        this.view_all_comments_boolean=true;
        if(data_from_server_for_comment.length===0){
          //this.data_from_server_for_comment.comment="oops!! no comment yet";
          console.log("in if");
            this.no_comments_yet=true;
        }
        else{
          this.no_comments_yet=false;
          this.data_from_server_for_comment=data_from_server_for_comment;
          console.log(data_from_server_for_comment);
          this.comment_array=[];

          for(var i=0;i<data_from_server_for_comment.length;i++)
          {
            this.comment_array.push(i);
          }
        }
      }
      else{
        this.view_all_comments_boolean=false;
        console.log("else called");
      }
      this.view_all_commeents_loading=false;
        }
      
    ));
  }

  hide_all_comments(post_id){
    this.view_all_comments_boolean=false;
  }
  cancel(post_id){
    this.go=true;
  }

  singup(){
    if(this.user_id_already_exists===true){
      //let the value be there in CustomerDetaillsRoot
    }
    else{
          this.CustomerDetaillsRoot.full_name="";
          this.CustomerDetaillsRoot.email="";
          this.CustomerDetaillsRoot.user_id="";
          this.CustomerDetaillsRoot.password1="";
          this.CustomerDetaillsRoot.password2="";
    }
    this.signup_boolean=true;
    this.signup_closed=false;
  }
  signup_form_submitted(){
    this.standby_home_page=true;
    console.log(this.CustomerDetaillsRoot);
    if(this.CustomerDetaillsRoot.password1 !==this.CustomerDetaillsRoot.password2)
    {
      alert("Both the passwords are not same. Please enter same password twice");
      this.standby_home_page=false;
    }
    else
    {
      //alert("Please wait while we will save your details. Click ok to continue. This may take few seconds to complete.");
      //this.signup_closed=true;
    this._enrollmentService.post_customer_details_root(this.CustomerDetaillsRoot).subscribe(
    (data_from_server_after_posting_customerDetailsRootObject=>{
      if(data_from_server_after_posting_customerDetailsRootObject.message_from_server==="user_id_already_exists"){
        alert("User id already exists. Please select a different user id.");
        this.user_id_already_exists=true;
      }
      else{
              alert("Details saved successfully. Now you can login and explore all the posts.");
              this.user_id_already_exists=false;
              this.new_user_created_successfully=true;
              
      }
      this.standby_home_page=false;
        //console.log(data_from_server_after_posting_customerDetailsRootObject.)
        }
    ));
    }
  }
  cancel_signup(){
    this.CustomerDetaillsRoot.full_name="";
    this.CustomerDetaillsRoot.email="";
    this.CustomerDetaillsRoot.user_id="";
    this.CustomerDetaillsRoot.password1="";
    this.CustomerDetaillsRoot.password2="";
    this.signup_closed=true;
  }
  terms(){
    alert("Terms and conditions\n\nNo harmful or abusive comments or post shoul be shared in this website. Authority reserves the right to block user's profile if such posts/comments are being reported and found to be authentic.")
  }
    login(){
      console.log("login clicked");
      this.LoginModel.user_id="";
      this.LoginModel.password="";

      console.log("login pressed");
      this.login_boolean=true;
      this.login_closed=false;
  }
  loginAuthCheck(){
    alert("Please wait while we will validate your details. This may take few seconds to complete. Click ok to continue.");
    this.standby_home_page=true;
    //console.log( this.LoginModel);
    this._enrollmentService.post_login_details_for_auth_check(this.LoginModel).subscribe(data_from_server_after_login_auth_check=>{
      if(data_from_server_after_login_auth_check.length===0){
        alert("invalid userid or password");
      }
      else{
        if(data_from_server_after_login_auth_check[0].user_id===this.LoginModel.user_id && data_from_server_after_login_auth_check[0].password===this.LoginModel.password){
          alert("login successful, Welcome "+data_from_server_after_login_auth_check[0].full_name);
          this.active_session=true;
          this.CustomerDetaillsRoot=data_from_server_after_login_auth_check;
          this.full_name_received_from_server=this.CustomerDetaillsRoot[0].full_name;
            this.email_received_from_server=this.CustomerDetaillsRoot[0].email;
            this.user_id_received_from_server=this.CustomerDetaillsRoot[0].user_id;

          //setting up all the parameters while successful login
          this.view_while_login_auth_true=true;
        }
        else{
          alert("invalid userid or password");
        }

      }
      this.standby_home_page=false;
      console.log(data_from_server_after_login_auth_check.length);
    });

    
  }
  cancel_login(){
  this.login_boolean=false;
  }

  //functions for collapsed side nav bars
  openNav(){
    console.log("open called");
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  }
  logout(){
    var logout_confirmation=confirm("You are about to logout.");
    if(logout_confirmation){
    this.view_while_login_auth_true=false;
    this.active_session=false;
    this.CustomerDetaillsRoot[0].full_name="";
    this.CustomerDetaillsRoot[0].email="";
    this.CustomerDetaillsRoot[0].user_id="";
    this.CustomerDetaillsRoot[0].password1="";
    this.CustomerDetaillsRoot[0].password2="";

    this.LoginModel.user_id="";
    this.LoginModel.password="";

    this.login_boolean=false;
    alert("Successfully logged out");
    this.closeNav();
    this.your_posts_boolean=false;
    this.your_account_boolean=false;

    this.full_name_received_from_server="Guest";
    this.email_received_from_server="";
    this.user_id_received_from_server="";
    }
    else{
      this.closeNav();
    }

  }
  contact_us(){
    alert("Please email us your query or issue to\n raj.bhadra94@gmail.com\n");
    this.closeNav();
  }
  your_posts(){
    this.your_posts_boolean=true;
    this.notifications_back();
    this.your_account_back();
    this.closeNav();
  }
  your_posts_back(){
    this.your_posts_boolean=false;
  }
  notifications(){
    this.notifications_boolean=true;
    this.your_posts_back();
    this.your_account_back();
    this.closeNav();
  }
  notifications_back(){
    this.notifications_boolean=false;
  }
  your_account(){
    this.your_account_boolean=true;
    this.your_posts_back();
    this.notifications_back();
    this.closeNav();
  }
  your_account_back(){
    this.your_account_boolean=false;
  }


}
