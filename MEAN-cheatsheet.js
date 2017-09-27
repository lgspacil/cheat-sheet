"start project"

//in terminal
mkdir [[project]]
cd [[project]]

npm init -y
npm install express --save
npm install body-parser --save
npm install mongoose --save


"*then take a look at package.json to see that everything's there"

"add modularity"
//on the same level as package.json:
touch server.js
mkdir server

mkdir server/config
touch server/config/mongoose.js
touch server/config/routes.js

mkdir server/controller
touch server/controller/[[items.js]]

mkdir server/models
touch server/models/[[item.js]]

"add angular"
ng new public //make SURE no nested Git
//angular with ROUTING:
ng new public --routing
// to route, can also add later with:
ng g module app-routing
//anyway back to business
cd public
ng build -w
//add cookies:
npm install angular2-cookie --save

"server.js:"
/*
 * SETUP
 */
const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      path = require('path'),
      app = express();

app.use(bodyParser.json());//use bodyParser with json
app.use(express.static(path.join(__dirname, './public/dist')));//connect angular

/*
 * ROUTES
 */
require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

/*
 * SERVER PORT 
 */
app.listen(8000, function(){
    console.log('listening on port 8000');
});

"mongoose.js"
/*
 * VARIABLES
 */

var mongoose = require('mongoose');//get mongoose
var fs = require('fs');//for loading model files
var path = require('path');//use to get models path

//1 - connect to database
mongoose.connect('mongodb://localhost/[[DATABASE NAME]]');

//2 - point to where models live
var models_path = path.join(__dirname, '../models');

//3 - load models in models path
fs.readdirSync(models_path).forEach(function(file){
    if (file.indexOf('.js') >= 0){
        //run model file w/ schema
        require(models_path + '/' + file);
    }
});

"routes.js - ADD CRUD"
/*
 * VARIABLES
 */
var quotes = require('../controller/[[ITEMS]].js'),
    path = require('path');

/*
 * ROUTES
 */
module.exports = function(app){
    
    app.post('/newitem', (req, res) => {
        items.createItem(req, res);
    });
    app.get('/items', (req, res) => {
        items.index(req, res);
    });
    app.post('/delete/item', (req, res) => {
        console.log('reached routes.js/app.delete()');
        items.deleteItem(req, res);
    })
    app.all("*", (req,res) => {
        res.sendfile(path.resolve("./public/dist/index.html"));
    });
}

"items.js - ADD CRUD"
/*
 * VARIABLES
 */
var mongoose = require('mongoose');
var Item = mongoose.model('Item');
mongoose.Promise = global.Promise;

var path = require('path');

/*
 * LOGIC
 */

module.exports = {

    index: function(req, res){
        Quote.find({})
        .then(data => {
            console.log('success in quotes.js/findNotes()');
            res.json(data);
        })
        .catch(err => {
            console.log('error in quotes.js/findNotes()');
            res.json(err);
        })
    },

    createItem: function(req, res){
        var item = new Item(req.body);
        item.save(item)
        .then(data => {
             console.log('success in quotes.js/createNote()');
             res.json(data);
        })
        .catch(err => {
            console.log('error in quotes.js/createNote()');
            res.json(err);
        })
    },

    deleteItem: (req, res) => {
        console.log("deleteitem(): item is:",req.body);
        Item.deleteOne(req.body.id)
        .then(data => {
            console.log('success in items.js/deleteItem()');
            res.json(data);
        })
        .catch(err => {
            console.log('error in items.js/deleteItem()');
            res.json(err);
        })
    }
}

"item.js"
/*
 * ITEM MODEL 
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//create schema
var ItemSchema = new mongoose.Schema({
    created: Date,
    note: String
}, {timestamp: true});

//register schema as model
var Item = mongoose.model('Item', ItemSchema);

"add service"
cd public/src/app
ng g service http "[[generates http.service.ts]]"

"app/http.servce.ts"
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  retrieveItems() {
    return this._http.get('/notes')
    .map( data => data.json() )
    .toPromise();
  }
  makeItem(item) {
    return this._http.post('/newitem', item)
    .map((data) => data.json())
    .toPromise();
  }
}
"app/app.module.ts"
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

"generate component"
ng g c [[componenet name]]
"generate class"
ng g class [[class name]]