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
import {Topic} from './topic';
import {YourBasicDetailsEditModel} from './your-basic-details-edit-model';
//import {MatCheckboxModule} from '@angular/material/checkbox';
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
  password_received_from_server="";
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
  no_notification=false;
  view_post_topic_wise_boolean=false;
  //topics 

  topics:any=['Technology','Science','Movies ','Music','Health','Food','Books','Visiting and Travel','Business','Psychology','Others'];
  //page_load=true;
      constructor(private _enrollmentService:HeroService) { }
  ngAfterViewInit(){
    //document.cookie = "user_id=rajdeep; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"; 
    //document.cookie = "password=123; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"; 
    //document.cookie = "username=rajdeep; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"; 
    this.checkCookie();
    this.showSlides(1);
    this.viewAllPost();
    this.urgent_posts_fn();
  }
  ngOnInit() {
  }

  PostModel = new PostModel('','','',0,'','',false);
  PostModelAdv=new PostModelAdv(0,'','','',false);
  PostIdAndMessageToUser=new PostIdAndMessageToUser(0,0,'');
  CommentModel=new CommentModel(0,'','','');
  PostIdComments=new PostIdComments(0,'');
  CustomerDetaillsRoot=new CustomerDetaillsRoot('','','','','');
  LoginModel=new LoginModel('','',false);
  PostIdLikeButtonVisible=new PostIdLikeButtonVisible(0,true);
  PostDelete=new PostDelete('',0);
  Notification=new Notification('',0,false);
  Topic=new Topic('');
  YourBasicDetailsEditModel=new YourBasicDetailsEditModel('','','','','');
  selectedFile: ImageSnippet;

  submitted = false;

  onSubmit() { 
    this.message_to_user="posting your message...";
    this.you="";
    this.PostModel.post_time=new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    this.PostModel.name=this.full_name_received_from_server;
    this.PostModel.user_id=this.user_id_received_from_server;
    console.log(this.PostModel.urgent);
       this._enrollmentService.enroll(this.PostModel).subscribe(
    (data=>{
      if((data.message_from_server)=="Data_inserted"){
        this.message_to_user="You have sucessfully posted your message.";
        this.submitted = true; 
        console.log("post successful");
        this.urgent_posts_fn();
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
    var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    this.view_all_posts_standby=true;
    this.you="";
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
  urgent_post_counter=0;
  urgent_posts_objs:any;
  urgent_posts_boolean=false;
  urgent_posts_fn_show(){
    this.urgent_posts_fn();
    this.urgent_posts_boolean=true;
  }
  urgent_posts_fn(){
    /*this.like_clicked=false;
    this.view_all_posts_standby=true;
    this.you="";
    this.view_all_post=true;*/
    this.PostModel.urgent=true;
           this._enrollmentService.getUrgentPosts(this.PostModel).subscribe(
    (urgent_posts_objs=>{
      this.urgent_posts_objs=urgent_posts_objs;
      this.urgent_post_counter=this.urgent_posts_objs.length;
      console.log(this.urgent_posts_objs);
    this.view_all_posts_standby=false;
    }));
  }
  urgent_posts_fn_close(){
    this.urgent_posts_boolean=false;
  }
  urgent_post_know_more(){
    alert("If you need urgent response from people, please mark your post as Urgent. Your post will be displayed in urgent section of our website, so that people can see your post easily. If you get your desired response, please do not forget to untag urgent from your post. You can do this from your post section which is located in view profile section.");
  }

  hideAllPost(){
    this.you="";
    this.view_all_post=false;
    this.hide_all_post_clicked=true;
  }
  post_close(){
    this.reset_post_Model();
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
  //view wholikedyourpostfromside navbar
      openNav_right_view_who_liked(){
    console.log("open called for view who liked");
    document.getElementById("mySidebar_right_who_liked").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
  }

  closeNav_right_view_who_liked() {
    console.log("close navbar for view who liked called");
  document.getElementById("mySidebar_right_who_liked").style.width = "0";
  document.getElementById("main").style.marginRight= "0";
  this.who_liked_close();
  }

  who_liked_only_show=false;
  who_liked_obj:any;
  who_liked_string="";
  loading_status=false;
  no_like_yet=false;
  who_liked(post_id){
    //this.loading_status=true;
    //this.who_liked_only_show=true;
    //this.who_liked_string="loading..";
    this.openNav_right_view_who_liked();
    this.PostModelAdv.post_id=post_id;
  this._enrollmentService.who_liked(this.PostModelAdv).subscribe(
    who_liked=>{
      //console.log(who_liked);
      //console.log(who_liked.length);
      this.who_liked_string="";
      if(who_liked.length!==0){
        //this.loading_status=false;
        this.who_liked_obj=who_liked;
        console.log(this.who_liked_obj);
    }else{
      this.no_like_yet=true;
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
    this.no_like_yet=false;
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
    alert("Terms and conditions\n\nNo harmful or abusive comments or post should be shared in this website. Authority reserves the right to block user's profile if such posts/comments are being reported and found to be authentic.")
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
     //console.log(this.LoginModel.remember_me);
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
            this.password_received_from_server=this.CustomerDetaillsRoot[0].password;
          //setting up cookies
            if(this.LoginModel.remember_me){
            this.setCookie_userName("user_id", this.user_id_received_from_server, 365);
            this.setCookie_password("password",this.password_received_from_server, 365);
            }
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
  remember_me_know_more(){
    alert("By clicking Remember me you agree to store your user id and password in the local cookies in your website. Hence we will remember you while you login next time. Please left the box unchecked if you do not want to save your credentails in cookies.")
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
  //functions for right sidebar for topics
    openNav_right(){
    console.log("open called for topic");
    document.getElementById("mySidebar_right").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
  }

  closeNav_right() {
    console.log("close navbar for topic called");
  document.getElementById("mySidebar_right").style.width = "0";
  document.getElementById("main").style.marginRight= "0";
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

    //clear cookies section
    document.cookie = "user_id=this.user_id_received_from_server; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"; 
    document.cookie = "password=this.password_received_from_server; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"; 
    //document.cookie = "username=rajdeep; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

    this.full_name_received_from_server="Guest";
    this.email_received_from_server="";
    this.user_id_received_from_server="";
    this.password_received_from_server="";
    this.notifications_back();
    /*    public name:string,
    public user_id:string,
    public message:string,
    public like_count:number,
    public post_time:string,
    public topics:string*/
    this.reset_post_Model();
    }
    else{
      this.closeNav();
    }

  }
  fullname_edit_called=false;
  fullname_edit_cancelled=false;
  full_name_edit_saved=false;

  basic_details_updated=false;
  fullname_edit(){
    this.YourBasicDetailsEditModel.full_name='';
    this.fullname_edit_called=true;
    this.fullname_edit_cancelled=false;
    this.full_name_edit_saved=false;
  }
  response_for_full_name_edit=false;
  full_name_edit_submitted(){
    console.log(this.YourBasicDetailsEditModel);
    this.response_for_full_name_edit=confirm("You are about to change your full name as "+this.YourBasicDetailsEditModel.full_name+". Click ok to continue.");
    if(this.response_for_full_name_edit){
      //
      this.YourBasicDetailsEditModel.user_id=this.user_id_received_from_server;
      this._enrollmentService.update_full_name(this.YourBasicDetailsEditModel).subscribe(response_from_server_update_full_name=>{
        console.log(response_from_server_update_full_name);
        if(response_from_server_update_full_name.message_from_server="update_started"){
          //need to change also
          //this.checkCookie();
          this.basic_details_updated=true;
          this.get_latest_user_id_and_email();
        }else{
          alert("something went wrong. Please try again.")
        }

      
      })
      this.full_name_edit_saved=true;
    }
    else{
      //
      this.fullname_edit_cancel();
    }
  }
  fullname_edit_cancel(){
    this.fullname_edit_cancelled=true;
    this.YourBasicDetailsEditModel.full_name='';
  }
  email_edit_called=false;
  email_edit_cancelled=false;
  email_edit_saved=false;
  email_edit(){
    this.YourBasicDetailsEditModel.email='';
    this.email_edit_called=true;
    this.email_edit_cancelled=false;
    this.email_edit_saved=false;
  }
  response_for_email_edit=false;
  email_edit_submitted(){
    console.log(this.YourBasicDetailsEditModel);
    this.response_for_email_edit=confirm("You are about to change your email id as "+this.YourBasicDetailsEditModel.email+". Click ok to continue.");
    if(this.response_for_email_edit){
      //
      this.YourBasicDetailsEditModel.user_id=this.user_id_received_from_server;
      this._enrollmentService.update_email(this.YourBasicDetailsEditModel).subscribe(response_from_server_update_email=>{
        console.log(response_from_server_update_email);
        if(response_from_server_update_email.message_from_server="update_started"){
          //this.checkCookie();
          //this.your_account();
          this.basic_details_updated=true;
          this.get_latest_user_id_and_email();
        }else{
          alert("something went wrong. Please try again.")
        }
      })
      this.email_edit_saved=true;
    }
    else{
      //
      this.email_edit_cancel();
    }
  }
  email_edit_cancel(){
    this.email_edit_cancelled=true;
    this.YourBasicDetailsEditModel.email='';
  }
  password_edit_called=false;
  password_edit_cancelled=false;
  password_edit_saved=false;
  messgae_password_edit_boolean=false;
  message_password_edit="";
  password_edit_fun(){
    console.log("change password called");
    this.YourBasicDetailsEditModel.old_password='';
    this.YourBasicDetailsEditModel.new_password='';
    this.password_edit_called=true;
    this.password_edit_cancelled=false;
    this.password_edit_saved=false;
  }
  password_edit_submitted(){
    if(this.YourBasicDetailsEditModel.old_password===this.password_received_from_server){
          this.password_edit_saved=true;
    this.YourBasicDetailsEditModel.user_id=this.user_id_received_from_server;
    //console.log(this.YourBasicDetailsEditModel);
    this._enrollmentService.update_password(this.YourBasicDetailsEditModel).subscribe(response_from_server_password_update=>{
      if(response_from_server_password_update.message_from_server==="password_updated"){
        //let uses know password updated successfully
        //this.messgae_password_edit_boolean=true;
        this.setCookie_password("password",this.YourBasicDetailsEditModel.new_password, 365);
        alert("Password updated successfully");
      }else{
        //this.messgae_password_edit_boolean=true;
        alert("Something went wrong. Your password did not change. Please try again after sometime.");
        //let user know password did not update successfully
      }
      //console.log(response_from_server_password_update);
    })
    }
    else{
      alert("Old password is not matched.");
      this.password_edit_saved=false;
    }
  }
  password_edit_cancel(){
    this.password_edit_cancelled=true;
  }
  id_password_old:any;
  id_password_new:any;
  show_hide_old_password(){
    this.id_password_old=document.getElementById("password_edit_old");
    if(this.id_password_old.type==="password"){
      this.id_password_old.type="text";
    }
    else{
      this.id_password_old.type="password";
    }
  }
  show_hide_new_password(){
    this.id_password_new=document.getElementById("password_edit_new");
    if(this.id_password_new.type==="password"){
      this.id_password_new.type="text";
    }
    else{
      this.id_password_new.type="password";
    }
  }
  latest_user_id_and_email_objs:any;
  get_latest_user_id_and_email(){
    this.YourBasicDetailsEditModel.user_id=this.user_id_received_from_server;
    this._enrollmentService.get_latest_user_id_and_email(this.YourBasicDetailsEditModel).subscribe(latest_user_id_and_email=>{
      this.latest_user_id_and_email_objs=latest_user_id_and_email;
      console.log(latest_user_id_and_email);
    })
  }
  //
  reset_post_Model(){
    this.PostModel.name="";
    this.PostModel.user_id="";
    this.PostModel.message="";
    this.PostModel.like_count=0;
    this.PostModel.post_time="";
    this.PostModel.topics="";
    this.PostModel.urgent=false;
  }
  contact_us(){
    alert("Please email us your query or issue to\n raj.bhadra94@gmail.com\n");
    this.closeNav();
  }
  your_posts(){
    console.log("your posts called");
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
    //this.your_posts();
    this.get_how_many_notifications_read();
  }
  notification_show_pressed(){
    this.notifications();
    this.notifications_boolean=true;
    this.closeNav();
    //this.no_notification=true;
  }
  notification_obj:any;
  notification_loading="";
  notification_string="";
  notification_loading_status=false;
  notification_counter:any;
  notification_exist=false;
  notifications(){
    this.home();
    //this.your_posts_back();
    console.log("notifications");
    this.notification_loading_status=true;
    this.notification_loading="loading...";
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
         this.notification_string="No new notification";
         this.snackbar();
         console.log("no notification");
       }
       else{
         this.notification_exist=true;
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
    this.no_notification=false;
  }
  your_account(){
    console.log("your account called");
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
  no_post_to_show=false;
get_my_posts(user_id){
  this.LoginModel.user_id=this.user_id_received_from_server;
  console.log(this.user_id_received_from_server);
  //this.CustomerDetaillsRoot.user_id=this.user_id_received_from_server;
  this._enrollmentService.get_my_posts(this.LoginModel).subscribe(my_posts=>{
    if(my_posts.length!==0){
      this.my_posts=my_posts;
      this.no_post_to_show=false;
    console.log(my_posts);
    }
    else{
      //no post to show.
      this.no_post_to_show=true;
      this.snackbar_your_posts();
    }
  })
}
post_here(){
  this.home();
}
home(){
  this.your_account_boolean=false;
  this.closeNav();
  this.your_posts_back();
  this.submitted=false;
  this.notifications_back();
  this.PostModel.message="";
  this.PostModel.topics="";
  this.PostModel.urgent=false;
}
/////////
slideIndex = 1;

// Next/previous controls
plusSlides(n) {
  console.log("plus slide method called");
  this.showSlides(this.slideIndex += n);
}

// Thumbnail image controls
currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}
slides:any;
dots:any;

showSlides(n) {
  //console.log("show slide method called n"+n);
  this.slides = document.getElementsByClassName("mySlides");
  this.dots = document.getElementsByClassName("dot");
  if (n > this.slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = this.slides.length}
  for (var i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
  }
  for (var i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace(" active", "");
  }
  console.log(this.slideIndex);
  this.slides[this.slideIndex-1].style.display = "block";
  this.dots[this.slideIndex-1].className += " active";
}
topicHasError=false;
validateTopic(topic){
  if(topic==="Select your topic"){
    this.topicHasError=true;
  }
  else{
    this.topicHasError=false;
  }
}
//topic wise paginf start 
topic_wise_paging(){
  console.log("topic called");
  this.openNav_right();
  this.urgent_posts_fn_close();
}
//js for snackbar
snackbar() {
  console.log("snackbar called");
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 
snackbar_your_posts() {
  console.log("snackbar for your posts called");
  // Get the snackbar DIV
  var x = document.getElementById("snackbar_for_your_post");
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 
//cookies
setCookie_userName(user_id, user_id_value, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = user_id + "=" + user_id_value + ";" + expires + ";path=/";
}
setCookie_password(password, password_value, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = password + "=" + password_value + ";" + expires + ";path=/";
}
getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
user_id_pwd="";
checkCookie() {
  var user_id = this.getCookie("user_id");
  var password = this.getCookie("password");
  if (user_id != "" && user_id !=null && password!="" && password!=null) {
    //alert("Welcome again " + user_id);
    this.LoginModel.user_id=user_id;
    this.LoginModel.password=password;
    this.loginAuthCheck();
  } else {
    this.login();
  }
}
posts_by_topic:any;
posts_length_array=[];
posts_by_topic_boolean=false;
no_post_to_this_topic_boolean=false;
no_post_to_this_topic_string='';
//topic functions
viewAllPost_topic_wise(topic){
    this.Topic.topic=topic;
    this.like_clicked=false;
    //var hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
    //console.log(hash);
    var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

    //console.log(typeof(indiaTime));

    //this.view_all_posts_standby=true;
    this.you="";
    //this.PostIdAndMessageToUser.message_to_user="";
    //this.page_load=true;
    this.view_all_post=true;
           this._enrollmentService.getPosts_topic_wise(this.Topic).subscribe(
    posts=>{
      console.log(posts);
      this.posts_by_topic=posts;
      if(this.posts_by_topic.length===0){
        this.no_post_to_this_topic_boolean=true;
        this.snackbar_if_no_post_by_topic();
      }
      else{
        this.posts_by_topic_boolean=true;
        this.view_post_topic_wise_boolean=true;
              this.posts_length_array=[];
      for(var i=0;i<this.posts_by_topic.length;i++)
    {
      this.posts_length_array.push(i);
    }
      }
    //this.view_all_posts_standby=false;
    });
  }
  viewAllPost_topic_wise_close(){
    this.posts_by_topic_boolean=false;
    this.view_post_topic_wise_boolean=false;
  }
  snackbar_if_no_post_by_topic() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar_if_no_post_by_topic");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 
//'Technology','Science','Movies ','Music','Health','Food','Books','Visiting and Travel','Business','Psychology','Others'
Technology(){
  //this.Topic.topic="Technology";
  //var topic="Technology";
  this.closeNav_right();
  this.viewAllPost_topic_wise("Technology");
}
Science(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Science");
}
Movies(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Movies");
}
Music(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Music");
}
Health(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Health");
}
Food(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Food");
}
Books(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Books");
}
Travel(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Visiting and Travel");
}
Business(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Business");
}
Psychology(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Psychology");
}
Others(){
  this.closeNav_right();
  this.viewAllPost_topic_wise("Others");
}
}
