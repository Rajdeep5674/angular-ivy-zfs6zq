import { Component, VERSION } from '@angular/core';
import { PostModel } from './post-model';
import {HeroService} from './hero.service';
import {PostModelAdv} from './post-model-adv';
import {PostIdAndMessageToUser} from './post-id-and-message-to-user';
import {CommentModel} from './comment-model';
import {PostIdComments} from './post-id-comments';
import {CustomerDetaillsRoot} from './customer-detaills-root';
import {LoginModel} from './login-model';
import {ImageSnippet} from './image-snippet';
import {PostIdLikeButtonVisible} from './post-id-like-button-visible';
import {PostDelete} from './post-delete';
import {Notification} from './notification';
//import * as CryptoJS from '@types/crypto-js';


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
  my_like_post_ids:any;
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
  signup_calcelled=false;
  userMessage="";

  user_id_already_exists=false;
  new_user_created_successfully=false;

  view_all_commeents_loading=false;
  hide_all_post_clicked=false;
  like_clicked=false;
  like_hidden=false;
  like_can_be_done=false;
  //page_load=true;
      constructor(private _enrollmentService:HeroService) { }

  ngOnInit() {
  }

  PostModel = new PostModel('','','',0,'');
  PostModelAdv=new PostModelAdv(0,'','','',false);
  PostIdAndMessageToUser=new PostIdAndMessageToUser(0,0,'');
  CommentModel=new CommentModel(0,'','','');
  PostIdComments=new PostIdComments(0,'');
  CustomerDetaillsRoot=new CustomerDetaillsRoot('','','','','');
  LoginModel=new LoginModel('','');
  PostIdLikeButtonVisible=new PostIdLikeButtonVisible(0,true);
  PostDelete=new PostDelete('',0);
  Notification=new Notification('',0,false);
  selectedFile: ImageSnippet;

  submitted = false;

  onSubmit() { 
    this.message_to_user="posting your message...";
    this.you="";
    this.PostModel.post_time=new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    this.PostModel.name=this.full_name_received_from_server;
    this.PostModel.user_id=this.user_id_received_from_server;
       this._enrollmentService.enroll(this.PostModel).subscribe(
    (data=>{
      if((data.message_from_server)=="Data_inserted"){
        this.message_to_user="You have sucessfully posted your message.";
        this.submitted = true; 
        console.log("post successful");
        this.viewAllPost();
        }
      else{
        this.message_to_user="Error occuered while posting your message. Please try after sometime.";
      }
        }
    ));
    
  }

  viewAllPost(){
    this.like_clicked=false;
    //var hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
    //console.log(hash);
    var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

    //console.log(typeof(indiaTime));

    this.view_all_posts_standby=true;
    this.you="";
    //this.PostIdAndMessageToUser.message_to_user="";
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
    this.hide_all_post_clicked=true;
  }

  like_button_visible=true;
  like_manager_preset_value=0;
  
  like(post_id){

    this.PostIdAndMessageToUser.post_id=post_id;

    this.like_clicked=true;
    this.PostIdLikeButtonVisible.post_id=post_id;
    this.PostIdLikeButtonVisible.like_button_visible=false;
    //this.like_button_visible=false;
    //check if user already likes this post or not

    //this.like_validity_check(post_id,this.my_like_post_ids);

    console.log(post_id);
    this.like_button_pressed.push(post_id);
    this.PostModelAdv.post_id=post_id;
    this.PostModelAdv.liker_name=this.full_name_received_from_server;
    this.PostModelAdv.liker_user_id=this.user_id_received_from_server;
    this.PostModelAdv.like_indicator=true;

    console.log(this.PostModelAdv.liker_user_id);
    console.log(this.PostModelAdv.like_indicator);
    this._enrollmentService.like(this.PostModelAdv).subscribe(
    (data_from_server_for_like=>{
      if(data_from_server_for_like.message_from_server==="like_accepted"){
        //alert("you liked this post");
        this.PostIdAndMessageToUser.message_to_user="You liked this post";
      }
      else{
        //alert("already liked");
        this.PostIdAndMessageToUser.message_to_user="Oops!! You have already liked this post";
      }
    }
      
    ));
  }
  who_liked_only_show=false;
  who_liked_obj:any;
  who_liked_string="";
  loading_status=false;
  who_liked(post_id){
    this.loading_status=true;
    this.who_liked_only_show=true;
    this.who_liked_string="loading..";
    this.PostModelAdv.post_id=post_id;
  this._enrollmentService.who_liked(this.PostModelAdv).subscribe(
    who_liked=>{
      //console.log(who_liked);
      //console.log(who_liked.length);
      this.who_liked_string="";
      if(who_liked.length!==0){
        this.loading_status=false;
        this.who_liked_obj=who_liked;
    }else{
      this.who_liked_string="Oops!! no like yet.";
        //alert("Oops!! no like yet.");
      //this.who_liked_string="";
      }

    }
  );
  }
  who_liked_close(){
    this.who_liked_only_show=false;
    this.who_liked_string="";
    this.who_liked_obj=[];
    this.loading_status=false;
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
    this.signup_calcelled=true;
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
   async loginAuthCheck(){
    //alert("Please wait while we will validate your details. This may take few seconds to complete. Click ok to continue.");
    this.standby_home_page=true;
    //console.log( this.LoginModel);
    this._enrollmentService.post_login_details_for_auth_check(this.LoginModel).subscribe(data_from_server_after_login_auth_check=>{
      if(data_from_server_after_login_auth_check.length===0){
        alert("invalid userid or password");
      }
      else{
        if(data_from_server_after_login_auth_check[0].user_id===this.LoginModel.user_id && data_from_server_after_login_auth_check[0].password===this.LoginModel.password){
          //alert("login successful, Welcome "+data_from_server_after_login_auth_check[0].full_name);
          this.active_session=true;
          this.CustomerDetaillsRoot=data_from_server_after_login_auth_check;
          this.full_name_received_from_server=this.CustomerDetaillsRoot[0].full_name;
            this.email_received_from_server=this.CustomerDetaillsRoot[0].email;
            this.user_id_received_from_server=this.CustomerDetaillsRoot[0].user_id;

          //setting up all the parameters while successful login
          this.view_while_login_auth_true=true;
          this.get_how_many_notifications_read();

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
    this.notifications_back();
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
    this.get_my_posts(this.user_id_received_from_server);
    this.your_posts_boolean=true;
    this.notifications_back();
    this.your_account_back();
    this.closeNav();
  }
  your_posts_back(){
    this.your_posts_boolean=false;
    this.hideAllPost();
  }
  your_posts_delete(post_id){
    var response=confirm("Do you really want to delete this post?");
    if(response===true){
          this.PostDelete.user_id=this.user_id_received_from_server;
    this.PostDelete.post_id=post_id;
    console.log(post_id);
    this._enrollmentService.delete_my_post(this.PostDelete).subscribe(message_from_server_for_delete_my_post=>{
      //console.log(message_from_server_for_delete_my_post);
      if(message_from_server_for_delete_my_post.message_from_server==="post_deleted"){
          this.your_posts();
      }
      else{
        this.your_posts();
      }
    })
    }else{
      //
    }
  }
  notification_show_pressed(){
    this.notifications_boolean=true;
    this.closeNav();
  }
  notification_obj:any;
  notification_loading="";
  notification_string="";
  notification_loading_status=false;
  notification_counter:any;
  notifications(){
    console.log("notifications");
    this.notification_loading_status=true;
    this.notification_loading="loading...";
    this.your_posts_back();
    this.your_account_back();
    this.closeNav();
    //this.PostModel;
      this.PostModel.user_id=this.user_id_received_from_server
     this._enrollmentService.notifications(this.PostModel).subscribe(notifications=>{
       this.notification_loading="";
       this.notification_loading_status=false;
       if(this.notification_counter===0){
         this.notification_counter=0;
       }
       else{
          this.Notification.notification_count=notifications.length;
          this.notification_counter=(notifications.length-this.how_many_notification_read);
          console.log("new notification"+this.notification_counter);
          console.log("total"+notifications.length);
       }
       //console.log(notifications);
       if(notifications.length===0){
         this.notification_string="No notification to show"
       }
       else{
         this.notification_string="";
         this.notification_obj=notifications;
       }
     })
  }
  get_how_many_notifications_read(){
    console.log("get how many notifications");
    this.Notification.user_id=this.user_id_received_from_server;
    this._enrollmentService.get_how_many_notifications_read(this.Notification).subscribe(response_get_how_many_notifications_read=>{
      this.how_many_notification_read=response_get_how_many_notifications_read[0].notification_count;
      this.notifications();
      //console.log(response_get_how_many_notifications_read);
    });
  }
  how_many_notification_read=0;
  notifications_back(){
    console.log("notification back");
    this.notifications_boolean=false;
    this.notification_counter=0;
    this.Notification.user_id=this.user_id_received_from_server;
    this.Notification.notification_read=true;

    this._enrollmentService.update_notification(this.Notification).subscribe(response_from_server_after_updating_notification_status=>{
      this.how_many_notification_read=response_from_server_after_updating_notification_status[0].notification_count;
        //console.log(response_from_server);
    });
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
  processFile(imageFile){
    console.log(imageFile);
    
  }
  my_posts:any;
get_my_posts(user_id){
  this.LoginModel.user_id=this.user_id_received_from_server;
  console.log(this.user_id_received_from_server);
  //this.CustomerDetaillsRoot.user_id=this.user_id_received_from_server;
  this._enrollmentService.get_my_posts(this.LoginModel).subscribe(my_posts=>{
    this.my_posts=my_posts;
    console.log(my_posts);
  })
}
as
home(){
  this.your_account_boolean=false;
  this.closeNav();
  this.your_posts_back();
}

}
