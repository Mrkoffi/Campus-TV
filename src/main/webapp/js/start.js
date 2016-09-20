/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var items = [];
    var rangeList = [];
    var queue = [];
    var jumbo = '#jumb';
    var hazard = 0;
    var jumboText1;
    var jumboText2;
    var jumboText3;
    var jumboText4;
    var link_one = 'http://www.tagesschau.de/tagesschau24/';
    var link_two = '';
    var greets = ["Holla!", "Hey!", "Hallo!", "Hi!", "Servus!", "Sers"];
    var upComing = [];
    var bus214 = [];
    var bus214ab19 = [];
    fillBus214();
    fillBus214ab19();
    prepareTableRow(bus214.slice(0, 11), $('#fahr214'));
    prepareTableRow(bus214.slice(11, 25), $('#fahr214ab'));
    prepareTableRow(bus214.slice(25, bus214.length), $('#fahr214b'));
    prepareTableRow(bus214ab19, $('#fahr214abb'));
    getTheNextCombination();

    // Check every second if someone is near the beacon
    setInterval(function () {
        getRangeList();
    }, 10000);

    $.ajax({
        url: "http://video.sport1.de/sport",
        type: 'GET',
        success: function (res) {
            var headline = $(res.responseText);
            var kwselectors = headline.find('a.s1-video-link');
            link_two = $(kwselectors).attr('href');
        }
    });

    function getRangeList() {
        $.ajax({
            url: "http://193.175.31.102/api/rangelist",
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.length > 0) {
                    $("#somediv").dialog("close");
                    rangeList = data;
                    showIt();
                }
            }
        });
    }
    function showIt() {
        $.each(rangeList, function (index, element) {
            hazard = (hazard % 4) + 1;
            getTheEventsForThem(element.course, element.semester, element.spec);
            fillTheJumbos(hazard, element.username, jumbo + hazard);
        });
    }
    setInterval(function () {
        ResetTheText();
    }, 10000);

    function runIt(hazard) {
        $('#jumb' + hazard).show("slow")
                .animate({left: "+=20", top: "+=20"}, 2000)
                .slideToggle(1000)
                .slideToggle("fast")
                .animate({left: "-=20", top: "-=20"}, 1500)
                .hide("slow")
                .show(1200)
                .slideUp("normal", runIt);
    }
    function stopIt(hazard) {
        $('#jumb' + hazard).stop().animate({
            left: '-90%',
            width: '80%'
        });
    }

    // For the time
    setInterval(function () {
        var currentTime = new Date();
        var h = currentTime.getHours();
        var m = currentTime.getMinutes();
        var s = currentTime.getSeconds();
        var time = (h > 9 ? h : '0' + h) + " : " + (m > 9 ? m : '0' + m) + " : " + (s > 9 ? s : '0' + s);
        $('#time').text(time);
    }, 1000);
    
      function setTime() {
        var retval;
        var currentTime = new Date();
        var h = currentTime.getHours();
        var m = currentTime.getMinutes();
        var s = currentTime.getSeconds();
        var time = (h > 9 ? h : '0' + h) + " : " + (m > 9 ? m : '0' + m) + " : " + (s > 9 ? s : '0' + s);
        retval=time;
           return retval;
      }

    //For checking the bus each 15 minutes
    setInterval(function () {
        getTheNextCombination();
    }, 90000);

    function ResetTheText() {
        $.each(queue, function (index, element) {
            var div = jumbo + element;
            $(div).empty();
            switch (element) {
                case 1:
                    $(div).append(jumboText1);
                    break;
                case 2:
                    $(div).append(jumboText2);
                    break;
                case 3:
                    $(div).append(jumboText3);
                    break;
                case 4:
                    $(div).append(jumboText4);
                    break;
            }
        });
        queue = [];
    }

    function fillTheJumbos(hazard, name, jumbo) {
        // getTheCurrentSubjects(element.course,element.semester,element.spec);
        queue.push(hazard);
        var row = '';
        var greeting = greets[hazard];
        row += '<h3>' + greeting + ' ' + name + '</h3><h4>Deine n&auml;chste Veranstaltung :</h4>';
        row += '<table class="table"><tbody>' + fillHisJumbo() + '</tbody></table>';
        var textToSave = $(jumbo).html();
        $(jumbo).empty();
        $(jumbo).append(row);
        $(jumbo).animate({'zoom': 1.3}, 600);
        $(jumbo).animate({'zoom': 1}, 600);
        switch (hazard) {
            case 1:
                jumboText1 = textToSave;
                break;
            case 2:
                jumboText2 = textToSave;
                break;
            case 3:
                jumboText3 = textToSave;
                break;
            case 4:
                jumboText4 = textToSave;
                break;
        }
    }
// For the Busplan
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

    function getTheNextCombination() {
        var currentTime = new Date();
        var intime = currentTime.getHours() + '' + currentTime.getMinutes();
        upComing = [];
        for (var i = 0; i < bus214.length; i++) {
            var timeInList = bus214[i].substring(0, 2) + '' + bus214[i].substring(3, 5);
            if (timeInList >= intime) {
                upComing.push(bus214[i]);
            }
            if (intime >= 1911) {
                prepareTableRow(bus214ab19, $('#fahrbody'));
                return;
            }
            if (upComing.length === 4) {
                prepareTableRow(upComing, $('#fahrbody'));
                return;
            }
        }
    }

    function prepareTableRow(arr, bd) {
        var row = '';
        for (var i = 0; i < arr.length; i++) {
            row += '<tr class="' + (i === 0 ? 'danger' : 'success') + '">' +
                    '<td>' + arr[i].split(';')[0] + '</td><td>' + arr[i].split(';')[1] +
                    '</td><td>' + arr[i].split(';')[2] + '</td></tr>';
        }
        bd.empty();
        bd.append(row);
    }

    function getTheEventsForThem(course, sem, spec) {
        var url = "http://backend2.applab.fhws.de:8080/fhwsapi/v1/lectures?from=1449208800000&to=1449269999000";
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                $.each(data, function (key, val) {
                    if ((val.program === course && ((val.session === sem) || (val.session === (sem + spec))))) {
                        var title = val.label;
                        $.each(val.events, function (key, val) {
                            var evt = val["label"];
                            var n = evt.indexOf("um");
                            var tme = evt.substring(n + 2, evt.length);
                            items.push(tme + ";" + title);
                        });
                    }

                });
                sortList();
                reorganize();
            }
        });
    }
    function reorganize() {
        var uniqueNames = [];
        $.each(items, function (i, el) {
            if (el.indexOf('.') !== -1) {
                var le = el.substring(0, el.indexOf('.') - 2);
                uniqueNames.push(le);
            } else
                uniqueNames.push(el);

        });
        items = [],
                $.each(uniqueNames, function (i, el) {
                    if ($.inArray(el, items) === -1)
                        items.push(el);
                    //else items.push(el);
                });

    }
    function fillHisJumbo() {
        var toShow = [];
        var currentHM = getHM();
        var row = '';
        // alert(currentHM);
        //We can try to change the time here to check if it works!!
        //var currentHM=0900;
        $.each(items, function (key, val) {
            var x = parseInt(val.substring(0, 3) + val.substring(4, 6));
            //  alert(x);
            if (x >= currentHM) {
                toShow.push(val);
            }
            if (x - currentHM <= 100) {
                row += '<tr class="success"><td> --- </td><td>Vor weniger als eine Stunde angefangen!</td> </tr>';
            }

        });
        if (toShow.length === 0) {
            row = '<tr class="success"><td> --- </td><td> Gerade leider keine</td> </tr>';
            return row;
        }
        for (var i = 0; i < 2; i++) {
            var rows = toShow[i].split(';');
            row += '<tr class="success"><td>' + rows[0] + '</td><td>' + rows[1] + '</td> </tr>';
        }
        return row;
    }
    function sortList() {
        items.sort(function (a, b) {
            var x = parseInt(a.substring(0, 3) + a.substring(4, 6));
            var y = parseInt(b.substring(0, 3) + b.substring(4, 6));
            return x - y;
        });
    }
    function getHM() {
        var currentTime = new Date();
        var hourMinutes = currentTime.getHours() + '' + currentTime.getMinutes();
        return  parseInt(hourMinutes);
    }
    var link = 0;
    setInterval(function () {
        showTagesschau();
    }, 20000);
    function showTagesschau() {
//        if(link===0){
//        $('#thedialog').attr('src', link_one);
//        link=1;
//    }
//    else{
//        $('#thedialog').attr('src', link_two);
//        link=0;
//    }

        $("#somediv").dialog({
            autoOpen: false,
            'width': $(window).width() * 0.9,
            'height': $(window).height() * 0.9,
            draggable: false,
            resizable: false,
            modal: true,
            hide: {effect: "puff", duration: 500},
            open: function (event, ui) {
                setTimeout(function () {
                    $("#somediv").dialog("close");
                }, 110000);
            }
        }).prev(".ui-dialog-titlebar").css("background", "#F9A825").css("color", "black").css("font-size", "25px");
    }
});
