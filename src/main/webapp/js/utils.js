
    var resNews = [];
    var resMealsMensateria = [];
    var resMealsHubland = [];
    var resFakNews = [];
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
                    // setInterval(function () {
                    //    fillRecentNews(element,resNews[Math.floor((Math.random() * resNews.length-1) + 1)]);
                    // }, 15000);
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
                   //alert("Hat geklappt auch mit Essen am Hubland");
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
                   //alert("Hat geklappt mit News");
                   fillFakNews(element, resFakNews[0]);
                   // setInterval(function () {
                   //      fillFakNews(element, resFakNews[0]);
                   //  }, 15000);
                }
                else alert("Length after failed reN :");
            });
        }


    //Changing the news content each second-- so too quick :)
    /*setInterval(function () {
            fillRecentNews(resNews[Math.floor((Math.random() * resNews.length-1) + 1)]);
         }, 15000);*/ 
         
        function fillMeals(news,arrayElement) {

            //var meal = arrayElement;  

            
            //alert("in fillMeals title: " + meal.name);
            //$(news).find("span.meat-title").text(meal.name);
            //alert("foodtype: "+ decodeFoodType(meal.foodtype));
            //$(news).find(".meat-icon").attr('src',decodeFoodType(meal.foodtype));
            //$(news).find("div.meal-date").text(convertStampToDate(meal.tstamp));
            //$(news).find(".meat-price").text(meal.price + "€");
            //$(news).find(".bed").attr("on-click",alert("yes button"));
            //$(news).find(".bed").attr("on-click",  $(news).find("div.meat-price").text(meal.pricebed));
            // $(news).find(".allergene").text("");
            // $.each(meal.additivenumbers.split(','), function(index, element) {
            //      $(news).find(".allergene").append("<paper-button>"+decodeAdditive(element)+"</paper-button>");
            // });

            $.each(arrayElement, function(index, element) {
                 $(news).find(".card-content").append('<div class="cafe-header card-actions">'+
                        '<div><img class="meat-icon"  style="margin-right: 5px;" src="'+decodeFoodType(element.foodtype)+'"></img>'+
                        '<span class="meat-title">'+element.name+'</span></div>'+
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
                    //alert("in fFakNews title: " + infos.title);
                    var title = infos.title;
                    var date = infos.duedate;
                    var desc = infos.description;
                    //alert("Image "+ image);
                    $(news).find(".titleNews").text(title); 
                    $(news).find(".dateNews").text(date);
                    $(news).find(".fakNewsBody").text(desc);
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
