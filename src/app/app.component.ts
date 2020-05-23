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

  newHero() {
    this.PostModel = new PostModel('','');
  }
  viewHero(){
           this._enrollmentService.getHeros().subscribe(
    (data=>{
      //console.log(data);
    this.submitted = true;
    this.message_to_user="please find your data below";
    //console.log(typeof(data[0]));
    //this.myArray=JSON.stringify(data[0]);
    //this.data_string=JSON.stringify(data[0]);
    console.log(data[0]);
    console.log(data.length);
    this.master_array=[];
    for(var i=0;i<data.length;i++)
    {
    this.full_name_array.push(data[i].full_name);
    this.power_array.push(data[i].power);
    this.alterEgo_array.push(data[i].alterEgo);

    /*this.master_array.push(data[i].full_name);
    this.master_array.push(data[i].power);
    this.master_array.push(data[i].alterEgo);
    //console.log(data[i].full_name);*/
    this.master_array.push(data[i].full_name+"--"+data[i].power+"--"+data[i].alterEgo);
    }
    //console.log(typeof(this.full_name_array));
    //console.log(typeof(Array.of(JSON.stringify(data[0]))));
    /*this.myArray=[data];
    console.log(this.myArray[0][0].full_name);*/
     
    
    }));
  }

}
