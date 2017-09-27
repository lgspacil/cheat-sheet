//angular cheet sheet....


//////////////////////////////////////////////
/////to start a new project in express..//////
/////////////////////////////////////////////

1. make a server.js file in a folder
2. navigate to it in terminal:
3.  npm init -y
4. npm install --save express
4.1 npm install angular-cookies
4.2 (google maps) npm install @agm/core --save
5. npm install --save body-parser
6. npm install --save mongoose
7. change your angular folder name to public
8 drop that project into your express project folder
9. cd into the public folder
10. ng build -w
11. open another terminal 
12. sudo mongod
13. open a third terminal 
14. navigate to the area where you have the server.js file
15 . nodemon server.js 
16. to access your database from terminal: have sudo mongod running
17. in another terminal run mongo



//to start a new project in angular:
ng new test-weather --routing

//cd into the app
cd test-weather

//to start a service
ng generate service http

//to generate a component
ng generate component temperature
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
============================================================================================
============================================================================================
"How to modularize the app"

1. "Make a new folder called server... it should be at the same level as your server.js file"
2. "three subfolders --> config, controllers, models"
============================================================================================
============================================================================================
3. *server.js*

var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/dist')));


//setting up mongoose configs
require('./server/config/mongoose.js');

// define routes and controllers
//this is where all the logic is done.....
var routes = require('./server/config/routes.js')(app)

http.listen(8000, () => {
  console.log('started on port 8080');
});
============================================================================================
============================================================================================

4. "now that the server.js file was cut down go to the config/mongoose.js"

*config/mongoose.js*

//this will pull all the schemas that I have set up in the models folder

var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;
var path = require('path');

mongoose.connect('mongodb://localhost/main_travel_app');

//will look in the models folder and anything that has a js file name it will read
var models_path = (__dirname + '/../models');
fs.readdirSync(models_path).forEach(function (file){
    if(file.indexOf('.js') >= 0){
        require(models_path + '/' + file);
    }
})
============================================================================================
============================================================================================

*models/users.js*

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    confirm_password: {type: String},
    _trip_id: [{type: Schema.Types.ObjectId, ref:'Trip'}],
    country: {type: String}
})

var User = mongoose.model('User', UserSchema);


============================================================================================
============================================================================================

*config/routes.js*

//we need to require the controllers because thats where we will send info after we recieved it in the routes section. 
//creating users locations and trips variables that will handel the logic that is sent to them from the routes

var users = require('../controllers/users.js')
var locations = require('../controllers/locations.js')
var trips = require('../controllers/trips.js')

module.exports = function (app){
    app.post('/add_user', function(req, res){
        users.add_user(req, res);
    })
    
    app.post('/log_in', function(req, res){
        users.log_in(req, res);
    })
    
    app.post('/load_trips', function(req, res){
        trips.load_trips(req, res);
    })
    
    app.post('/adding_new_trip', function(req, res){
        trips.adding_trip(req, res);
    })
    
    //creating a new marker location you must also update the users locations array
    app.post('/add_newMarker', function(req, res){
        trips.add_new_marker(req, res);
    })

    // etc.......
}
============================================================================================
============================================================================================

*controllers/trips.js*

"the controllers should have as many files as you have Schemas in your models, this is just one"

var mongoose = require('mongoose');

var Trip = mongoose.model('Trip');
var Location = mongoose.model('Location');


module.exports = {
    load_trips: function(req, res){
        Trip.find({_user_id: req.body.user_id}, function(err, result){
            if(err){
                console.log("there was an error retreiving the trips from the user..")
            }else{
                return res.json(result)
            }
        })
    },

    adding_trip: function(req, res){
        console.log("adding a new trip in the server.js with this info: ", req.body)
        Trip.findOne({ $and: [{trip_name: req.body.trip_name}, {_user_id: req.body._user_id}]}, function(err, result){
            if(err){
                console.log("there was an error when adding a new trip")
            } else {
                if(result == null){
                    var trip = new Trip(req.body)
    
                    trip.save(function(err){
                        if(err){
                            console.log("error when adding a new trip to DB")
                        } else{
                            return res.json(trip)
                        }
                    })
                }else{
                    console.log("there was not a null, you have already named a trip this name")
                    return res.json(false);
                }
            }
        })
    },

    add_new_marker: function(req, res){
        console.log("****************** ", req.body)
        Trip.findOne({_id: req.body._trip}, function(err, trip){
            var location = new Location(req.body);
            trip._locations.push(location);
            location.save(function(err){
                trip.save(function(err){
                    if(err){console.log("sadly this did not work")}
                    else{res.json(location)}
                })
            })
        })
    },
}





============================================================================================
============================================================================================






/////////////////////
//Input and Output////
//////////////////////-----------------------------------------------------------
- note.component.ts
names = [{name: "lucas"}, {name: "monika"}]

//----------------------------------------------------------------------
-note component.html
// it is making names available to the child
 <app-note.list [myName]='names'>

 //----------------------------------------------------------------------
 - note-list-component.ts
 //importing nyName that was made available
 @Input() nyName;

 //----------------------------------------------------------------------
 - note-list-component.html
 //now that we used the @input in the ts file we can acces it in the HTML 
 {{nyName | json}}

 //displaying the parents info in the childs component
 <ul>
  <li *ngFor="let name of myName">
    <p>{{name.name}}<button (click)=deleteName(name)</button></p>
    <li>
  <ul>

//----------------------------------------------------------------------
 //the deleteName() function is run when clicked
 //the child want to trigger a function in the parents class
 -note-list-component.ts
 //we can call "clearName" whatever we want
 @Output() clearName = new EventEmitter();

 //this is omitting and passing obj to the parent
 deleteName(obj){
  this.clearName.emit(obj)
 }

//----------------------------------------------------------------------
- Note component.html
//the code will listen for () from the @output function in the TS file
//it will then go to that function
(clearnName) = "deleteName($event)"

//----------------------------------------------------------------------
-note-component.ts

  deleteName(obj){
    let index = this.names.indexOf(obj);
    this.names.splice(index, 1)
  }



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//app.module.ts
//----------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WindComponent } from './wind/wind.component';
import { TempComponent } from './temp/temp.component';
import { SkyComponent } from './sky/sky.component';
import { WeatherService } from './weather.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WindComponent,
    TempComponent,
    SkyComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    routing
  ],
  providers: [WeatherService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//---------------------------------------------------------------------------------------------------


//**app.routes.ts
//---------------------------------------------------------------------------------------------------------------
import { NgModule } from '@angular/core';				
import { Routes, RouterModule } from '@angular/router';
// importing classes from the components
import { WeatherComponent } from './weather/weather.component';
import { SkyComponent } from './sky/sky.component';
import { TempComponent } from './temp/temp.component';
import { WindComponent } from './wind/wind.component';


const routes: Routes = [
    //the first is what we want to thr url to match
    //the second param is what class in the component we want to load component we want to load
    // pathMatch: 'full' matches the exact path
    // redirectTo will automatically redirect you to another component and it takes the place of a Component
    {path: '', redirectTo: '/temp', pathMatch: 'full'},
    {path: 'temp/:temp', component: TempComponent},
    {path: 'wind/:speed', component: WindComponent},
    {path: 'sky/:clouds', component: SkyComponent},
];


export const routing = RouterModule.forRoot(routes);
//----------------------------------------------------------------------

//  SERVICE
//----------------------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs' //this is for using map

@Injectable()
export class WeatherService {

  //the constructor is making a private vaiable that is of type Http
  constructor(private _http: Http) { }


  getWeather(zip){
    //we want the service to be able to grab data from the API
    return this._http.get("http://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&units=imperial&APPID=bb928725dc4b57216334e06c6fbafa99").map((data)=> data.json()).toPromise()

  }

}

//----------------------------------------------------------------------------------------------



//weather.component.ts
//----------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
//we are importing the serive that we created in the weather.service file
import { WeatherService } from './../weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  //decalre all the variables up here.

  zip: string;
  weather = null;
  errors = null;

  //setting up variables in the constructor _weatherService to be of type WeatherService
  //_weatherService is now a class and we can now access the methods we created in there from weather.service such as getWeather
  constructor(private _weatherService: WeatherService, private _router: Router) { }


  //when the page loads it will automatically run this function
  ngOnInit() {
  }

  getWeather(){
    // when we call this function we get back a Promise, promises have a then and catch
    this._weatherService.getWeather(this.zip)
    .then((data) => {console.log("we got this information thanks to our serviec", data)
      this.weather = data;
      this.errors = null;
      //if everything goes well we want to automatially route us to the temperature spot.
      this._router.navigate(['/temp', this.weather.main.temp]);
    })
    //if something goes wrong we want to catch it in the error
   .catch((err) => {console.log("we got an error when trying to fetch info from the service", err)
      this.weather = null;
      if (err.status == '400' || err.status == '404'){
        this.errors = "the zip code: "+ (this.zip).toString() + " does not exist!";
      }
    }) 

  }
}

//----------------------------------------------------------------------


//temp.component.ts
//----------------------------------------------------------------------
import { Component, OnInit, OnDestroy } from '@angular/core';
//we first need to import this to grab the info that is in the url
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit, OnDestroy {

  //set a variable temp to be null
  temp = null;
  sub = null;

  //create a private variable named _route set to ActivatedRoute
  // grab the _route and subscribe to the param in url  
  constructor(private _route: ActivatedRoute) {
   
   }

   //as soon as the page loads up to access the component
   // we make a subscription to the params passed into the url
   // next is to set the temperature to the params so we can output it.
  ngOnInit() {
    this.sub = this._route.params.subscribe((params) => {
      this.temp = params.temp
    })
  }

  //after we receive the param data we wnt to unsubscribe to prevent memory leaks
  ngOnDestroy(){
    console.log("Unsubscribing ");
    this.sub.unsubscribe();
    
  }

}

//---------------------------------------------------------------------------------------------------

//WEATHER.COMPONENT.HTML

<div class="blue">
  <h4>This is the weather Component</h4>

  <!--{{weather | json}}-->

  <div *ngIf='weather'><h2>{{weather.name}}</h2></div>

  <form class="form-inline" (submit)="getWeather()">
    <div class="form-group">
      <label for="zip">Zip Code</label>
      <!--we want to two way bind the zip code to the variable we just made-->
      <input type="text" class="form-control" name="zip" [(ngModel)]='zip'>
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>

  <!--we need to provide the routerLink in the a tag because we do not want the web page to go to 
  somewhere else. the first paramater in the array is the route we set in app.route, the second param
  is to take in whatever param we want to provide for the temperature. it will be coming from the object
  we got back from the API-->

  <div *ngIf='weather'>
    <a [routerLink] = "['temp', weather.main.temp]">Temperature</a>
    <a [routerLink] = "['sky', weather.weather[0].description]">Sky</a>
    <a [routerLink] = "['wind', weather.wind.speed]">Wind</a>
  </div>

  <div *ngIf='errors' class="red">{{errors}}</div>

<!--we want whatever that will come back form this link to dispaly in the page-->
<!--the components will render here-->

<router-outlet></router-outlet>

</div>

