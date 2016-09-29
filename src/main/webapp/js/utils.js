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

function getFacultyNews(){
    
    var resNews = [];
    var prefix = 'http://www.welearn.de/';

    /*function fillList(resNew) {
        var rowcounter = 3;
        var simplecounter = -1;

        var newsContainer = $("#nContainer");

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
    }*/

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
                alert(" date:"+newsDate+"\n title "+newsTitle+"\n text "+newsText+"\n link "+newslink+"\n img "+newsimgs);
                var myNews = new News(newsTitle, newsDate, newsText, prefix + newsimgs, prefix + newslink);
                alert(myNews.text);
                resNews.push(myNews);
            });
             //fillList(resNews);
             //fillRecentNews(resNews[resNews.length - 1]);
             //changeInfosInStart(resNews);
        }
    });
        alert(resNews.length);
       return resNews;
}


//Changing the news content each second-- so too quick :)
/*setInterval(function () {
        fillRecentNews(resNews[Math.floor((Math.random() * resNews.length-1) + 1)]);
     }, 15000);*/
     
    function fillRecentNews(news,infoArray) {
        
        var infos = infoArray;
        
         //$(news).empty();
        var title = infos.title;
        var date = infos.date;
        var desc = infos.desc;
        var image = infos.image;
        
        $(news).find(".cafe-header").text(title);  //.each(function(index,a){
        $(news).find("papaer-card.test").find('image').change(infos.image);  //.each(function(index,a){
        $(news).find("span.day").text(date);
        $(news).find(".cafe-light").text(desc);
        //$(news).find("strong").text();
    }
    