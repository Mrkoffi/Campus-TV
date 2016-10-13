
var resNews = [];
var resN = [];
var prefix = 'http://www.welearn.de/';

function doAjax(callback) {

    // NOTE:  This function must return the value 
    //        from calling the $.ajax() method.
   //var resNews = [];
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
                //alert(" date:"+newsDate+"\n title "+newsTitle+"\n text "+newsText+"\n link "+newslink+"\n img "+newsimgs);
                var myNews = new News(newsTitle, newsDate, newsText, prefix + newsimgs, prefix + newslink);
                alert(myNews.date);
                resNews.push(myNews);
                //resNews.push(newsDate+";"+newsTitle+";"+newsText+";"+newslink+";"+newsimgs);
            });
                //alert("Length af:"+resNews.length);
        },
        complete: function(){
            fillRecentNews($(".test"));
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

function setFacultyNews(){
     doAjax(function(result){
    if (result == true ){
           alert("Length after succes set reN :"+ resNews.length);
    }
    else
       alert("Length after failed reN :");
  });
}


//Changing the news content each second-- so too quick :)
/*setInterval(function () {
        fillRecentNews(resNews[Math.floor((Math.random() * resNews.length-1) + 1)]);
     }, 15000);*/ 
     
    function fillRecentNews(news) {

        var infos = resNews[0];
        alert("in fillRecentNews title: " + infos.title)
         //$(news).empty();

        var title = infos.title;
        var date = infos.date;
        var desc = infos.desc;
        var image = infos.image;

        alert("Image "+ image);
        console.log(image);
        
        $(news).find(".cafe-header").text(title); 
        //news.image=image 
         //news.image=image;
        $(news).find(".infoDay").text(date);
        $(news).find(".cafe-light").text(desc);
    }
    