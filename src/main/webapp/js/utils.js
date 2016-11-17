
    var resNews = [];
    var resMealsMensateria = [];
    var resMealsHubland = [];
    var resFakNews = [];
    var resBusArray= [];
    var resEvent= [];
    var prefix = 'http://www.welearn.de/';
    var imageLink = "";
    var bus214 = [];
    var bus214ab19 = [];

    function doAjaxNews(callback) {
             $.ajax({
            url: 'http://www.welearn.de/aktuelles/news.html',
            type: 'GET',
            success: function (res) {
                $(res.responseText).find('li.fiwnews').each(function (item) {
                    var newsText = $(this).find("div.news_block").text();  //.each(function(index,a){
                    var imgtexts = $(this).find("div.fiwnews_img");  //.each(function(index,a){
                    var newsimgs = $(imgtexts).find('img').attr('src');
                    var newslink = $(imgtexts).find('a').attr('href');
                    var newsDate = $(this).find("span").text();
                    var newsTitle = $(this).find("strong").text();
                    var myNews = new News(newsTitle, newsDate, newsText, prefix + newsimgs, prefix + newslink);
                    //alert(myNews.date);
                    resNews.push(myNews);
                });
            },
            complete: function(){
                callback(true);
            },
            fail: function(){
                callback(false);
            }
        });
    }

    function doAjaxMealsMensateria(callback) {
            
            $.ajax({
            url: 'https://apistaging.fiw.fhws.de/mensa/api/mensas/54/meals',
            type: 'GET',
            dataType: "json",
            headers:{
                "Accept": "application/vnd.fhws-meal.default+json"
            },
            success: function (res) {
                    $.each(res, function(index, element) {
                      resMealsMensateria.push(element);
                    });
            },
            complete: function(){
                callback(true);
            },
            fail: function(){
                callback(false);
            }
        });
    }

     function doAjaxMealsHubland(callback) {
            
            $.ajax({
            url: 'https://apistaging.fiw.fhws.de/mensa/api/mensas/7/meals',
            type: 'GET',
            dataType: "json",
            headers:{
                "Accept": "application/vnd.fhws-meal.default+json"
            },
            success: function (res) {
                    $.each(res, function(index, element) {
                      resMealsHubland.push(element);
                    });
            },
            complete: function(){
                callback(true);
            },
            fail: function(){
                callback(false);
            }
        });
    }

     function doAjaxFakNews(callback) {
            
            $.ajax({
            url: 'https://apistaging.fiw.fhws.de/id/api/dateses',
            type: 'GET',
            dataType: "json",
            headers:{
                "Accept": "application/vnd.fhws-dates.default+json"
            },
            success: function (res) {
                    $.each(res, function(index, element) {
                      resFakNews.push(element);
                    });
            },
            complete: function(){
                callback(true);
            },
            fail: function(){
                callback(false);
            }
        });
    }

     function doAjaxBus(callback) {

            $.ajax({
            url: 'https://apistaging.fiw.fhws.de/pu/api/departures',
            type: 'GET',
            dataType: "json",
            headers:{
                "Accept": "application/vnd.fhws-departure.departview+json"
            },
            success: function (res) {
                    $.each(res, function(index, element) {
                      resBusArray.push(element);
                    });
                    //alert("Longueur apres get:" + resBusArray.length);
            },
            complete: function(){
                callback(true);
            },
            fail: function(){
                callback(false);
            }
        });
    }
     function doAjaxEvents(callback) {
             $.ajax({
            url: 'https://apistaging.fiw.fhws.de/mo/api/events/today',
            type: 'GET',
            dataType: "json",
            headers:{
                "Accept": "application/vnd.fhws-event.eventview+json"
            },
            success: function (res) {

                   $.each(res, function(index, element) {
                      resEvent.push(element);
                    });
                alert("After real events"+resEvent.length)
            },
            complete: function(){
                callback(true);
            },
            fail: function(){
                callback(false);
            }
        });
    }


      function setTime(element) {
          
           setInterval(function () {
            var currentTime = new Date();
            var h = currentTime.getHours();
            var m = currentTime.getMinutes();
            var s = currentTime.getSeconds();
            var time = (h > 9 ? h : '0' + h) + " : " + (m > 9 ? m : '0' + m) + " : " + (s > 9 ? s : '0' + s);
            $(element).text(time);
            }, 1000);
        }

        function setFacultyNews(element){
             doAjaxNews(function(result){
            if (result == true ){
                   //alert("Length after succes set reN :"+ resNews.length);
                   fillRecentNews(element, resNews[0]);
                     setInterval(function () {
                       fillRecentNews(element,resNews[Math.floor((Math.random() * resNews.length-1) + 1)]);
                     }, 15000);
            }
            else
               alert("Length after failed reN :");
          });
        }

         function setMealsMensateria(element){
             doAjaxMealsMensateria(function(result){
                if (result == true ){
                   //alert("Hat geklappt auch mit Essen in der Mensateria");
                   fillMeals(element, resMealsMensateria);
                   // setInterval(function () {
                   //     fillMeals(element, resMealsMensateria[0]);
                   //  }, 15000);
                }
                else alert("Length after failed reN :");
            });
            // return resMealsMensateria;
        }

          function setMealsHubland(element){
             doAjaxMealsHubland(function(result){
                if (result == true ){
                   fillMeals(element, resMealsHubland);
                   // setInterval(function () {
                   //      fillMeals(element, resMealsHubland[0]);
                   //  }, 15000);
                }
                else alert("Length after failed reN :");
            });
        }

          function setFakNews(element){
             doAjaxFakNews(function(result){
                if (result == true ){
                   //  var toSend =[];
                   // $.each(resFakNews, function(index, element) {
                   //      var mydate = new Date(element.duedate);
                   //      alert("Due Date"+mydate);
                   //      if(mydate < new Date()) {
                   //          alert("Doch 1");
                   //          toSend.push();
                   //      }
                   //  });

                   // alert("In to Date lentgh"+toSend.length);

                   // $.each(toSend, function(index, element) {
                   //       fillFakNews(element, arrayElement);
                   //  });
                   fillFakNews(element, resFakNews[0]);
                   // setInterval(function () {
                   //      fillFakNews(element, resFakNews[0]);
                   //  }, 15000);
                } else alert("Length after failed reN :");
            });
        }

        function setBusArray(element){

                 doAjaxBus(function(result){
                    if (result == true ){
                        var bussi = [];
                        bussi.push(resBusArray[0]);
                        bussi.push(resBusArray[1]);
                        bussi.push(resBusArray[2]);
                        fillBus(element,bussi);
                    }
                    else alert("Length after failed reN :");
                  });
       }

       function setEvents(element){

                 doAjaxEvents(function(result){
                    if (result == true ){
                        //fillEvents(element,resEvent);
                        //var bussi = [];
                        //alert("Before filter "+ resEvent.length);
                        //  $.each(resEvent, function(index, element) {
                        //      var currentTime = new Date();
                        //     var h = currentTime.getHours();
                        //     var m = currentTime.getMinutes();

                        //     var heures = parseInt(element.startTime.substring(11, element.scheduled.length-6));
                        //     if(h <= heures)
                        //          bussi.push(element);

                        //     });
                        
                         var newArray=[];
                         newArray.push(resEvent[0]);
                         newArray.push(resEvent[1]);
                         newArray.push(resEvent[2]);
                         newArray.push(resEvent[3]);
                         newArray.push(resEvent[4]);

                         fillEvents(element,newArray);
                    } else alert("Length after failed reN :");
                  });
       }
       



    //Changing the news content each second-- so too quick :)
    /*setInterval(function () {
            fillRecentNews(resNews[Math.floor((Math.random() * resNews.length-1) + 1)]);
         }, 15000);*/ 
         
        function fillMeals(news,arrayElement) {

            $.each(arrayElement, function(index, element) {
                 $(news).find(".card-content").append('<div class="cafe-header card-actions">'+
                        '<div><img class="meat-icon"  style="margin-right: 5px;" src="'+decodeFoodType(element.foodtype)+'"></img>'+
                        '<span class="meat-title" style="font-size:25px;">'+element.name+'</span></div>'+
                       '<paper-icon-item>'+
                          '<iron-icon  style="margin-right: 5px;" icon="shopping-cart" item-icon></iron-icon>'+
                          '<span class="meat-price">'+element.price+' €</span>'+
                      '</paper-icon-item></div>');
             });
        }

         function fillRecentNews(news,arrayElement) {

            var infos = arrayElement;
            //alert("in fillRecentNews title: " + infos.title);
            var title = infos.title;
            var date = infos.date;
            var desc = infos.desc;
            var image = infos.image;
            //alert("Image "+ image);
            $(news).find(".cafe-header").text(title); 
                if ( image !== undefined || image !== null) {
                    //alert("Image is undefined");
                    news.image="./fhws.jpg";
                    }   
                 else news.image=image;
            $(news).find(".infoDay").text(date);
            $(news).find(".cafe-light").text(desc);
        }

         function fillFakNews(news,arrayElement) {

                    var infos = arrayElement;
                    var title = infos.title;
                    var date = infos.duedate;
                    var desc = infos.description;
                    $(news).find(".titleNews").text(title); 
                    $(news).find(".dateNews").text(date.substring(0, 10));
                    $(news).find(".fakNewsBody").text(desc);

                    
        }

        function fillBus(news,arrayElement) {
            $(news).find(".card-content").empty();
            $.each(arrayElement, function(index, element) {
                 $(news).find(".card-content").append('<div class="horizontal justified">'+ 
                     '<paper-icon-item>'+ element.stopName +'</paper-icon-item>'+
                      '<paper-icon-item><iron-icon icon="icons:arrow-forward"></paper-icon-item>'+
                     '<paper-icon-item>'+ element.direction +'</paper-icon-item></div>'+
                   '<div class="card-actions"><paper-icon-item class="horizontal justified">'+
                    'Abfahrt:<paper-button style="font-size:35px;">'+  element.scheduled.substring(11, element.scheduled.length-3) +'</paper-button>'+
                    'Ankunft: <paper-button style="font-size:15px;">'+ element.arrival.substring(11, element.arrival.length-3) +'</paper-button></paper-icon-item></div>');
             });

            // if(new Date().getMinutes === 8 ||new Date().getMinutes === 28 ||||new Date().getMinutes === 48 ){
            //             news.elevation = 3;
            // }
        }

        function fillEvents(news,arrayElement) {
            
            $(news).find(".card-content").empty();
            //alert("Size in Fill :"+ arrayElement.length);
            $.each(arrayElement, function(index, element) {
                    //alert("BRrr :"+ element.startTime.substring(11, element.startTime.length-3));
                 $(news).find(".card-content").append('<div class="vertical justified">'+ 
                     '<div><paper-icon-item style="font-size:25px;">'+ element.name +'</paper-icon-item></div>'+
                     '<paper-icon-item><iron-icon icon="icons:room"></iron-icon>'+ element.roomsView[0].name +'</paper-icon-item></div>'+
                   '<div class="card-actions"><paper-icon-item class="horizontal justified">'+
                    'Start:<paper-button style="font-size:35px;">'+  element.startTime.substring(11, element.startTime.length-3) +'</paper-button>'+
                    'Ende: <paper-button style="font-size:15px;">'+ element.endTime.substring(11, element.endTime.length-3) +'</paper-button></paper-icon-item></div>');
             });
        }

        function convertStampToDate(stamp){
            var t = new Date(stamp*1000);
            //var formatted = t.format("dd.mm.yyyy hh:MM:ss");
            return t.format("dd.mm.yyyy");
        }

        function decodeFoodType(letter){
           
            var result="";
            switch (letter){
                case "V":
                    result="./icons/vegan.jpg";
                break;
                case "F":
                    result="./icons/fisch.jpg";
                break;
                case "FL":
                    result="./icons/fleischlos.jpg";
                break;
                case "S":
                    result="./icons/schwein.jpg";
                break;
                case "G":
                    result="./icons/gefluegel.jpg";
                break;
                case "R":
                    result="./icons/rind.jpg";
                break;
                default:
                    result="";
                break;
            }
            return result;
        }

        function decodeAdditive(letter){
           
            var result="";
            switch ($.trim(letter)){
                case "A1":
                    result="glutenhaltiges Getreide";
                break;
                case "A4":
                    result="Fische";
                break;
                case "A7":
                    result="Milch (einschließlich Lactose)";
                break;
                case "A9":
                    result="Sellerie";
                break;
                case "A15":
                    result="Weizen";
                break;
                case "K":
                    result="Knoblauch";
                break;
                case "F":
                    result="Fisch";
                break;
                case "Z2":
                    result="konserviert";
                break;
                case "Z3":
                    result="Antioxidationsmittel";
                break;
                case "Z4":
                    result="Geschmacksverstärker";
                break;
                case "Z5":
                    result="geschwefelt";
                break;
                case "Z8":
                    result="Phosphat";
                break;
                case "A10":
                    result="Senf";
                break;
                case "A12":
                    result="Schwefeldioxid und Sulfite";
                break;
                 case "S":
                    result="Schwein";
                break;
                 case "A17":
                    result="Gerste";
                break;
                case "A":
                    result="Alkohol";
                break;
                case "A14":
                    result="Weichtiere";
                break;
                case "A6":
                    result="Soja";
                break;
               case "A3":
                    result="Eier";
                break;
                case "G":
                    result="Gefluegel";
                break;
                case "R":
                    result="Rind/Kalb";
                break;
                case "Z1":
                    result="Farbstoff";
                break;
                case "A11":
                    result="Sesamsamen";
                break;
                case "A2":
                    result="Krebstiere";
                break;
                case "F":
                    result="Fisch";
                break;
                default:
                     result=letter;
                break;
            }
            return result;
        }


    function fillBus214() {
        bus214.push('07:51;FHWS;Busbahnhof');
        var goby = 51;
        var start = 7;
        var ende = 21;
        while (start <= ende) {
            goby += 20;
            if (goby > 60) {
                goby %= 60;
                start += 1;
            }
            var pref = (start < 10 ? '0' + start : start);
            if ((start === 19) && (goby === 11)) {
                bus214.push(pref + ':' + goby + ';FHWS;Busbahnhof');
                start = 22;
            } else
                bus214.push(pref + ':' + goby + ';FHWS;Busbahnhof');
        }

    }

    function fillBus214ab19() {
        bus214ab19.push('19:14;Universitätszentrum;Busbahnhof');
        bus214ab19.push('19:23;Universitätszentrum;Busbahnhof');
        bus214ab19.push('19:43;Universitätszentrum;Busbahnhof');
        bus214ab19.push('20:16;Universitätszentrum;Busbahnhof');
        bus214ab19.push('20:40;Universitätszentrum;Busbahnhof');
        bus214ab19.push('21:00;Universitätszentrum;Busbahnhof');
        bus214ab19.push('21:40;Universitätszentrum;Busbahnhof');
    }

    function writeBus(){
                    fillBus214();
                    fillBus214ab19();

         $.each(bus214, function (index, element) {
            console.log(element);
         });

         $.each(bus214ab19, function (index, element) {
            console.log(element);
         });
            
            }
