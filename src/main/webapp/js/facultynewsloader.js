/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

//$(".mThumbnailScrollers").mThumbnailScroller({
//              axis:"y" //change to "y" for vertical scroller
//            });

    var resNews = [];
    var prefix = 'http://www.welearn.de/';

    function addRowToContainer(row, container) {
        container.append(row);
    }
    function addNewRow(index, container) {
        container.append('<div class="row" id="cRow' + index + '"></div>');
    }

    function fillList(resNew) {
        var rowcounter = 3;
        var simplecounter = -1;

        var newsContainer = $("#nContainer");
//var row='<div class="row" id="cRow"></div>';
// newsContainer.append(row);

        addNewRow(simplecounter, newsContainer);
        var roww = $('#cRow' + simplecounter);
        for (var i = 0; i < resNews.length; i++) {
            //alert(i);
            var title = resNew[i].title;
            var date = resNew[i].date;
            var desc = resNew[i].desc;
            var link = resNew[i].link;
            var image = resNew[i].image;

            var myDiv = '<div class="col-md-4 col-lg-4 portfolio-item" id="divN' + i + '"><a href="' + link + '">' +
                    '<img class="img-responsive" src="' + image + '" id="imageN' + i + '" alt="">' +
                    '</a><h3><a href="' + link + '">' + title + '</a></h3><h5><a href="' + link + '">' + date + '</a></h5>' +
                    ' <p>' + desc + '</p></div>';

            $(roww).append(myDiv);
            //alert(row);
            if (i === (rowcounter - 1)) {
                //newsContainer.append(row);
                addRowToContainer(roww, newsContainer);
                rowcounter += 3;
                simplecounter++;
                addNewRow(simplecounter, newsContainer);
                roww = $('#cRow' + simplecounter);
            }
        }
    }

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
                resNews.push(myNews);
            });
             fillList(resNews);
             fillRecentNews(resNews[resNews.length - 1]);
             //changeInfosInStart(resNews);
        }
    });


//Changing the news content each second-- so too quick :)
setInterval(function () {
        fillRecentNews(resNews[Math.floor((Math.random() * resNews.length-1) + 1)]);
     }, 15000);
     
    function fillRecentNews(news) {
         $('#jumb2').empty();
        var title = news.title;
        var date = news.date;
        var desc = news.desc;
        var link = news.link;
        var image = news.image;
        
        var myDiv = '<a href="' + link + '">' +
                '<img class="img-responsive" src="' + image + '"  alt="">' +
                '</a><h3><a href="' + link + '">' + title + '</a></h3><h5><a href="' + link + '">' + date + '</a></h5>' +
                ' <p>' + desc + '</p>';

        $('#jumb2').append(myDiv);
    }

});
