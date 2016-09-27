
$(document).ready(function () {
    /*
     * This script starts with calculating the current day
     * converting it to a timestamp between  7H00 and 23h59 and passing it as
     * parameter to the url used by the ajax request.
     * For just example we have taken the Friday, December 4th
     * The method getDayFromStampStart help us to get the day starting by 7h till midnight
     */
    var months = ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"];
    var weekday = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    var items = [];
    var toShow = [];
    var ts = '1449208800000';
    var timeStart = '';
    var timeEnd = '';
    //Get start and end Timestamp
    getThisDay();
    getDayFromStampStart();

    var url = "http://backend2.applab.fhws.de:8080/fhwsapi/v1/lectures?from=1449208800000&to=1449269999000";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, val) {
                var title = val.label;
                $.each(val.events, function (key, val) {
                    var evt = val["label"];
                    var n = evt.indexOf("um");
                    var tme = evt.substring(n + 2, evt.length);
                    items.push(tme + ";" + title);
                });
            });
            sortList();
            reorganize();
            actualizeStartEvent();
            fillTheCurrentLectures();
        }
    });
    function sortList() {
        items.sort(function (a, b) {
            var x = parseInt(a.substring(0, 3) + a.substring(4, 6));
            var y = parseInt(b.substring(0, 3) + b.substring(4, 6));
            return x - y;
        });
    }
    
    //clean the doubles
    function reorganize(){
        var uniqueNames=[];
          $.each(items, function(i, el){
              if(el.indexOf('.')!==-1){
                   var le = el.substring(0,el.indexOf('.')-2);
              uniqueNames.push(le);
              }else  uniqueNames.push(el);
             
      });
     items=[],
      $.each(uniqueNames, function(i, el){
            if($.inArray(el, items) === -1) items.push(el);
            //else items.push(el);
      });

    }


 
    
    // try to call it each hour so replace 5000 with 3600000
    function actualizeStartEvent() {
        setInterval(fillTheCurrentLecturesForStart(), 5000);
    }
    function fillTheCurrentLectures() {
        $('#eventDate').append(getDayFromTimeStamp(ts));
        $.each(items, function (key, val) {
            var row = val.split(';');
            $('#eventContent').append('<tr class="success"><td>' + row[0] + '</td><td>' + row[1] + '</td> </tr>');
        });

    }
    /*
     * This method fills the jumbo box of the start page
     * according to current time
     */
    function fillTheCurrentLecturesForStart() {
        var toShow = [];
        //var currentHM = getHM();
        // alert(currentHM);
        //We can try to change the time here to check if it works!!
        var currentHM=1100;
        $.each(items, function (key, val) {
            var x = parseInt(val.substring(0, 3) + val.substring(4, 6));
            //  alert(x);
            if (x >= currentHM) {
                toShow.push(val);
            }
        });
        if (toShow.length === 0) {
            $('#startEvents').append('<tr class="success"><td> --- </td><td> Gerade leider keine</td> </tr>');
            return;
        } else {
            for (var i = 0; i < 2; i++) {
                var row = toShow[i].split(';');
                $('#startEvents').append('<tr class="success"><td>' + row[0] + '</td><td>' + row[1] + '</td> </tr>');
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
    //This method concatenates the hours and minutes and parse it as integer
    function getHM() {
        var currentTime = new Date();
        var hourMinutes = currentTime.getHours() + '' + currentTime.getMinutes();
        return  parseInt(hourMinutes);
    }
    function getDayFromStampStart() {
        var thisDay = new Date();
        var t = thisDay.getMonth() + 1;
        var dy = thisDay.getUTCDate();
        var conc = thisDay.getUTCFullYear() + '/' + t + '/' + dy + " 00:00:00";
        timeStart = new Date(conc).getTime() / 1000;
        var concEnd = thisDay.getUTCFullYear() + '/' + t + '/' + dy + " 23:59:59";
        timeEnd = new Date(concEnd).getTime() / 1000;
        return timeStart+''+timeEnd;
    }
    function getDayFromTimeStamp(timest) {
        var thisDay = new Date(parseInt(timest));
        var t = thisDay.getMonth();
        var dy = weekday[thisDay.getDay()];
        var conc = dy + ', den ' + thisDay.getUTCDate() + '. ' + months[t] + ' ' + thisDay.getUTCFullYear();
        return conc;
    }
});