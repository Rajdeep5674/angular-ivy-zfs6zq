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
      if((data.message_from_server)=="Data_inserted")
        console.log("post successful")
      else
        console.log("error in posting details")
        }
    ));
    this.submitted = true; 
  }

  newHero() {
    this.model = new Hero(42, '', '');
  }

}
