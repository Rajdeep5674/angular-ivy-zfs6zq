import { Component, VERSION } from '@angular/core';
import { Hero } from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  name = 'Angular ' + VERSION.major;
  message_to_user="";

    constructor(private _enrollmentService:HeroService) { }

  ngOnInit() {
  }
powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { 
       this._enrollmentService.enroll(this.model).subscribe(
    (data=>{
      if((data.message_from_server)=="Data_inserted"){
        this.message_to_user="Data saved succesfully";
        this.submitted = true; 
        console.log("post successful");
        }
      else
        console.log("error in posting details")
        }
    ));
    
  }

  newHero() {
    this.model = new Hero(42, '', '');
  }
  viewHero(){
           this._enrollmentService.getHeros().subscribe(
    (data=>{
      if((data.message_from_server)=="success"){
        this.message_to_user="you will get data soon";
        this.submitted = true; 
        console.log("you will get data soon");
        }
      else
        console.log("Error occured while fetching data from database");
        
        this.message_to_user="Error occured while fetching data from database";
        }
    ));
  }

}
