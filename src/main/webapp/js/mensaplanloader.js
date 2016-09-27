/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var weekday = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    var nowc = $("#mensaNow");
    var nown = $("#mensaNext");
    var timestamps;
     var timestampDD;
      var timestampDDD;
       var timestampDDDD;
        var timestampDDDDD;
    getTheOthersDays();
//    var jsDate = new Date(timestamp * 1000);
//    alert("Formated time : " + jsDate.toDateString());

    var resMensaC = [];
    var resMensaN = [];
    var todayNord = [];
    var todayHub = [];
    var kw = [];
    var urlhubland = "http://www.studentenwerk-wuerzburg.de/essen-trinken/speiseplaene/plan/show/mensa-am-hubland-wuerzburg.html";
    $.ajax({
        url: urlhubland,
        type: 'GET',
        success: function (res) {
            //alert("überhaupt");
            var headline = $(res.responseText);
            var kwselectors = headline.find('aside.mensaselectors').each(function () {
                var kws = $(this).find('section.kw').children(".week").each(function () {
                    kw.push($(this).text());
                });
            });
            var menuselectors = headline.find('section.mensamenu').each(function () {

                var cwm = $(this).find('div.currentweek').children("div.day").each(function () {
                    var day = $(this).find('h5').text();
                    var price = "";
                    var title = "";
                    var menu = [];

                    var speisen = $(this).find('article.menu').each(function () {
                        title = $(this).find('div.title').text();
                        price = $(this).find('div.price').text();
                        var stoffe = [];
                        var zstoffe = $(this).find('div.toggler > ul').children("li").each(function () {
                            stoffe.push($(this).text());
                        });
                        var m = new MensaPlan(title, price, stoffe);
                        menu.push(m);
                    });

                    var mensaday = new MensaDay(day, menu);
                    resMensaC.push(mensaday);
                });

                var nwm = $(this).find('div.nextweek').children("div.day").each(function () {
                    var day = $(this).find('h5').text();
                    var price = "";
                    var title = "";
                    var menu = [];

                    var speisen = $(this).find('article.menu').each(function () {
                        title = $(this).find('div.title').text();
                        price = $(this).find('div.price').text();
                        var stoffe = [];
                        var zstoffe = $(this).find('div.toggler > ul').children("li").each(function () {
                            stoffe.push($(this).text());
                        });
                        var m = new MensaPlan(title, price, stoffe);
                        menu.push(m);
                    });

                    var mensaday = new MensaDay(day, menu);
                    resMensaN.push(mensaday);
                });
            });
            fillMensaList(resMensaC, nowc, "now");
        }
    });

    var urlhublandnord = "http://www.studentenwerk-wuerzburg.de/index.php?type=4249&tx_thmensamenu_pi3%5Bcontroller%5D=Speiseplan&tx_thmensamenu_pi3%5Baction%5D=showjson&tx_thmensamenu_pi3%5Bmensen%5D=54";
    $.ajax({
        url: urlhublandnord,
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            var f = data.responseText.indexOf("[");
            var n = data.responseText.indexOf("]");
            var modul = data.responseText.substring(f, n + 1);
            var mod = $.parseJSON(modul);
            $.each(mod, function (i, v) {
                if (v.date === timestamps.toString()) {
                    var menu=[];
                    menu.push(new MensaPlan(v.name, v.price, v.additive.split(',')));
                    var mensaday = new MensaDay(v.date,menu);
                    todayNord.push(mensaday);
                }
            });
            fillMensaListHUB(todayNord,nown,"next");
              getTodaysMenu();
        }
    });

    function addRowToContainer(row, container) {
        container.append(row);
    }
    function addNewRow(index, container, dif) {
        container.append('<div class="row" id="cRow' + dif + index + '"></div>');
    }

    function fillMensaList(resMenu, container, dif) {
        var rowcounter = 3;
        var simplecounter = -1;
        var newsContainer = container;
        addNewRow(simplecounter, newsContainer, dif);
        var roww = $('#cRow' + dif + simplecounter);

        for (var i = 0; i < resMenu.length; i++) {
            //alert(i);
            var title = resMenu[i].day;
            var sp = resMenu[i].speisen;
            var desc = '';
            var price = '';
            var stofs = [];
            var toAppend = '';
            var spdiv = '';
            for (var y = 0; y < sp.length; y++) {
                var stofli = '';
                desc = sp[y].title;
                price = sp[y].preis;
                stofs = sp[y].zustoffe;
                //alert(stofs.length);
                spdiv += '<div class="container">' + desc +
                        '<br><div class="btn-group"><button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                        'Zusatzstoffe / Allergene<span class="caret"></span></button><ul class="dropdown-menu">';
                for (var x = 0; x < stofs.length; x++) {
                    //alert(stofs[x]);
                    stofli += '<li>' + stofs[x] + '</li>';
                }
                spdiv += stofli + '</ul></div>    <span class="badge">' + price + '</span>' + '</div>';
            }
            toAppend += '<div class="col-md-4 col-lg-4"><div class="jumbotron" id="jumb"><h3 class="text-center">' +
                    title + '</h3>' + spdiv + '</div></div>';

            $(roww).append(toAppend);
            //alert(row);
            if (i === (rowcounter - 1)) {
                //newsContainer.append(row);
                addRowToContainer(roww, newsContainer);
                rowcounter += 3;
                simplecounter++;
                addNewRow(simplecounter, newsContainer, dif);
                roww = $('#cRow' + dif + simplecounter);
            }
        }
    }
    
    function fillMensaListHUB(resMenu, container, dif) {
        var rowcounter = 3;
        var simplecounter = -1;
        var newsContainer = container;
        addNewRow(simplecounter, newsContainer, dif);
        var roww = $('#cRow' + dif + simplecounter);

        for (var i = 0; i < resMenu.length; i++) {
            //alert(i);
            var title = resMenu[i].day;
            var sp = resMenu[i].speisen;
            var desc = '';
            var price = '';
            var stofs = [];
            var toAppend = '';
            var spdiv = '';
            for (var y = 0; y < sp.length; y++) {
                var stofli = '';
                desc = sp[y].title;
                price = sp[y].preis;
                stofs = sp[y].zustoffe;
                //alert(stofs.length);
                spdiv += '<div class="container">' + desc +
                        '<br><div class="btn-group"><button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                        'Zusatzstoffe / Allergene<span class="caret"></span></button><ul class="dropdown-menu">';
                for (var x = 0; x < stofs.length; x++) {
                    //alert(stofs[x]);
                    stofli += '<li>' + stofs[x] + '</li>';
                }
                spdiv += stofli + '</ul></div>    <span class="badge">' + price + '</span>' + '</div>';
            }
            toAppend += '<div class="col-md-4 col-lg-4"><div class="jumbotron" id="jumb"><h3 class="text-center">' +
                    getThisDay() + '</h3>' + spdiv + '</div></div>';

            $(roww).append(toAppend);
            //alert(row);
            if (i === (rowcounter - 1)) {
                //newsContainer.append(row);
                addRowToContainer(roww, newsContainer);
                rowcounter += 3;
                simplecounter++;
                addNewRow(simplecounter, newsContainer, dif);
                roww = $('#cRow' + dif + simplecounter);
            }
        }
    }
    
    function getThisDay() {
        var currentTime = new Date();
        var month = currentTime.getUTCMonth() + 1;
        var day = currentTime.getUTCDay();
        var dat = currentTime.getDate();
        return  weekday[day] + (dat > 9 ? ' ' + dat : ' 0' + dat) + (month > 9 ? '.' + month : '.0' + month);
    }
//    function getTodaysMenu() {
//        var todaymenu = '';
//        var today = getThisDay();
//        for (var i = 0; i < resMensaC.length; i++) {
//            var title = resMensaC[i].day;
//            //alert(today+'und'+title);
//            if (title.indexOf(today) !== -1) {
//                // alert('yes');
//                todaymenu = resMensaC[i];
//                var title = todaymenu.day;
//                var sp = resMensaC[i].speisen;
//                var desc = '';
//                var price = '';
//                var stofs = [];
//                var toAppend = '';
//                var spdiv = '';
//                for (var y = 0; y < sp.length; y++) {
//                    var stofli = '';
//                    desc = sp[y].title;
//                    price = sp[y].preis;
//                    stofs = sp[y].zustoffe;
//                    //alert(stofs.length);
//                    spdiv += '<div class="container">' + desc +
//                            '<br><div class="btn-group"><button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
//                            'Zusatzstoffe / Allergene<span class="caret"></span></button><ul class="dropdown-menu">';
//                    for (var x = 0; x < stofs.length; x++) {
//                        stofli += '<li>' + stofs[x] + '</li>';
//                    }
//                    spdiv += stofli + '</ul></div>    <span class="badge">' + price + '</span>' + '</div>';
//                }
//                toAppend += '<h3 class="text-center">' +
//                        title + '</h3>' + spdiv;
//                //alert(toAppend);
//                $('#jumb1').append(toAppend);
//            } else {
//                //alert(" is a philosopher.is NOT a philosopher.");
//            }
//        }
//    }
    function getTodaysMenu() {
        var todaymenu = '';
        var today = getThisDay();
        for (var i = 0; i < todayNord.length; i++) {

                todaymenu = todayNord[i];
                var title = todaymenu.day;
                var sp = todayNord[i].speisen;
                var desc = '';
                var price = '';
                var stofs = [];
                var toAppend = '';
                var spdiv = '';
                for (var y = 0; y < sp.length; y++) {
                    var stofli = '';
                    desc = sp[y].title;
                    price = sp[y].preis;
                    stofs = sp[y].zustoffe;
                    //alert(stofs.length);
                    spdiv += '<div class="container">' + desc +
                            '<br><div class="btn-group"><button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                            'Zusatzstoffe / Allergene<span class="caret"></span></button><ul class="dropdown-menu">';
                    for (var x = 0; x < stofs.length; x++) {
                        stofli += '<li>' + stofs[x] + '</li>';
                    }
                    spdiv += stofli + '</ul></div>    <span class="badge">' + price + '</span>' + '</div>';
                }
                toAppend += '<h3 class="text-center">' +
                        today + '</h3>' + spdiv;
                $('#jumb1').append(toAppend);
        }
    }
    function getTheOthersDays() {
        var thisDay = new Date();
        var t = thisDay.getMonth() + 1;
        var dy=thisDay.getUTCDate();
        var conc = thisDay.getUTCFullYear() + '/' + t + '/' + dy;
        timestamps = new Date(conc).getTime() / 1000;
        switch (dy) {
            case 1:
                var n=dy+1;
              timestampDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             n++;
              timestampDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             n++;
              timestampDDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             n++;
             timestampDDDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             break;
             case 2:
              var n=dy+1;
             var timestampDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             n++;
             var timestampDDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             n++;
             var timestampDDDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             break;
             case 3:
                  var n=dy+1;
             var timestampDDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
              n++;
             var timestampDDDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             break;
             case 4:
                var n=dy+1;
             var timestampDDDDD = new Date(thisDay.getUTCFullYear() + '/' + t + '/' + n).getTime() / 1000;
             break;
        }

    }
});