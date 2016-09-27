/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Responsible(names, adresss, functionss,images) {
      this.name = names;
      this.adress = adresss;
      this.functions = functionss;
      this.image = images;
}

//$.extend(Responsible.prototype, {
      Responsible.prototype.name= function() {
           return this.name;
      };
      Responsible.prototype.adress= function() {
            return this.adress;
      };
       Responsible.prototype.functions= function() {
            return  this.functions;
      };
      Responsible.prototype.image= function() {
             return  this.image;
      };

function News(title, date, desc,image,link) {
      this.title = title;
      this.date = date;
      this.desc = desc;
      this.image = image;
      this.link = link;
}
   News.prototype.title= function() {
           return this.title;
      };
      News.prototype.date= function() {
            return this.date;
      };
       News.prototype.desc= function() {
            return  this.desc;
      };
      News.prototype.image= function() {
             return  this.image;
      };
       News.prototype.link= function() {
             return  this.link;
      };
      
      function MensaPlan(title,preis, zustoffe) {
      this.title = title;
      this.zustoffe = zustoffe;
      this.preis = preis;
  }

      MensaPlan.prototype.title= function() {
             return  this.title;
      };
      MensaPlan.prototype.zustoffe= function() {
             return  this.zustoffe;
      };
      MensaPlan.prototype.preis= function() {
             return  this.preis;
      };
function MensaWeek(week, days) {
      this.week = week;
      this.days = days;
  }
  MensaWeek.prototype.week= function() {
             return  this.week;
      };
      MensaWeek.prototype.days= function() {
             return  this.days;
      };
      
function MensaDay(day,speisen) {
      this.day = day;
      this.speisen = speisen;
  }
  MensaDay.prototype.day= function() {
             return  this.day;
      };
      MensaDay.prototype.speisen= function() {
             return  this.speisen;
      };