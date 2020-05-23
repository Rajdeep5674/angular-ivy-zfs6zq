import { Component, VERSION } from '@angular/core';
import { PostModel } from './post-model';
import {HeroService} from './hero.service';

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
  data_length=0;
  data_length_array=[];
  view_all_post=false;
      constructor(private _enrollmentService:HeroService) { }

  ngOnInit() {
  }

  PostModel = new PostModel('','');

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
      this.master_array=[];
      this.full_name=[];
      this.post_id=[];
      this.data_length_array=[];

      //this.data_length=data.length;

      for(var i=0;i<data.length;i++)
    {
      this.data_length_array.push(i);
      this.full_name.push(data[i].full_name);
      this.post_id.push(data[i].post_id);
      this.master_array.push(data[i].post_id+") "+data[i].full_name+": "+data[i].message);
    }
  
    }));
  }

  hideAllPost(){
    this.view_all_post=false;
  }
  like(i){
    console.log(i);
  }


}
