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
  full_name_array=[];
  power_array=[];
  alterEgo_array=[];
  master_array=[];
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
           this._enrollmentService.getPosts().subscribe(
    (data=>{
      for(var i=0;i<data.length;i++)
    {
    this.master_array.push(data[i].full_name+":"+data[i].message);
    }

     
    
    }));
  }

}
