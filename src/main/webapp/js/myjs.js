/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*For the scrolling bar on faculty*/
$( document ).ready(function() {
 
var getZoomtP=[];
var getZoomtT=[];
var getZoomtW=[];
$(".my-thumbs-list").mThumbnailScroller({
              axis:"x" //change to "y" for vertical scroller
            });
            
var ResponsibleAubele = new Responsible("Prof. Dr. Tobias Aubele", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: Conversion Optimierung (CO)", "Praktikantenbeauftragter: Bachelor E-Commerce"], "aubele.jpg");
var ResponsibleBalzer = new Responsible("Prof. Dr. Arndt Balzer", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Studienfachberater/in: Bachelor Informatik", "Verantwortlicher für das Vertiefungsmodul: Smart Systems (SmS)"], "balzer.jpg");
var ResponsibleBraun = new Responsible("Prof. Dr. Peter Braun", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: Smart Systems (SmS)]", "Internationales", "Dekan", "India-Gateway-Program (IGP)"], "braun.jpg");
var ResponsibleDeinzer = new Responsible("Prof. Dr. Frank Deinzer", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: Medieninformatik (MI)"], "deinzer.jpg");
var ResponsibleFischer = new Responsible("Prof. Dr. Mario Fischer", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: Electronic Commerce (EC)", "Verantwortlicher für das Vertiefungsmodul: Web Management (WM)", "Studiengangsleiter: Bachelor E-Commerce"], "mario.jpg");
var ResponsibleGroetsch = new Responsible("Prof. Eberhard Grötsch", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [""], "groetsch.jpg");
var ResponsibleHeinzl = new Responsible("Prof. Dr. Steffen Heinzl", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: E-Business Architekturen (EBA)", "Praktikantenbeauftragter: Bachelor Informatik"], "heinzl.jpg");
var ResponsibleHennermann = new Responsible("Prof. Dr. Frank Hennermann", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Studiendekan", "Stellvertretende Leitung IAL (http://ial.fhws.de)"], "hennermann.jpg");
var ResponsibleKarsten = new Responsible("Prof. Dr. Karsten Huffstadt", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul:Mobile Solutions (MS)", "Studienfachberater/in: Informationssysteme (Master)", "Studiengangsleiter: Informationssysteme (Master)", "Leiter des Instituts für Design und Informationssysteme"], "karsten.jpg");
var ResponsibleJohn = new Responsible("Prof. Dr. Isabel John", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Studiengangsleiter: Bachelor Informatik", "Frauenbeauftragte", "India-Gateway-Program (IGP)"], "john.jpg");
var ResponsibleSchilling = new Responsible("Prof. Dr. Klaus Junker-Schilling", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: Information Security (IS)", "Prüfungskommissionsvorsitzender"], "schilling.jpg");
var ResponsibleKarl = new Responsible("Prof. Dr. Karl Liebstückel", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: Business Software (BS)"], "karl.jpg");
var ResponsibleMuessig = new Responsible("Prof. Dr. Michael Müßig", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Prodekan"], "muessig.jpg");
var ResponsibleRott = new Responsible("Dipl. Inf. (FH) Michael Rott", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [""], "rott.jpg");
var ResponsibleRauch = new Responsible("Dipl. Inf. (FH) Wolfgang Rauch", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [""], "rauch.jpg");
var ResponsibleSauer = new Responsible("Prof. Dr. Gabriele Saueressig", "Sanderring 8, 97074 Würzburg", ["Verantwortlicher für das Vertiefungsmodul: Business Technologies (BT)", "Vizepräsidentin"], "sauer.jpg");
var ResponsibleWolf = new Responsible("Prof. Dr. Christina Völkl-Wolf", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Studienfachberater/in: Bachelor E-Commerce"], "wolf.jpg");
var ResponsibleWeber = new Responsible("Prof. Dr. Kristin Weber", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Studiengangsleiter: Bachelor Wirtschaftsinformatik", "Praktikantenbeauftragter: Bachelor Wirtschaftsinformatik"], "weber.jpg");
var ResponsibleEva = new Responsible("Prof. Dr. Eva Wedlich", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Studienfachberater/in: Bachelor Wirtschaftsinformatik"], "eva.jpg");

var dozs= [ResponsibleAubele, ResponsibleBalzer, ResponsibleBraun, ResponsibleDeinzer,
    ResponsibleFischer, ResponsibleGroetsch, ResponsibleHeinzl, ResponsibleHennermann, ResponsibleKarsten,
    ResponsibleJohn, ResponsibleSchilling, ResponsibleKarl, ResponsibleMuessig, ResponsibleRott, ResponsibleRauch,
    ResponsibleSauer, ResponsibleWolf, ResponsibleWeber, ResponsibleEva];
//};

var dozentContainerB = $("#myTab ul");

for (var i = 0; i < dozs.length; i++) {
    var name = dozs[i].name;
    var mimage = dozs[i].image;
    var source = "img/dozenten/" + mimage;
    var myDiv = '<li id="lili"><div class="col-sm-3 col-xs-6 col-lg-4 vcenter" id="divProf'+i+'"><div><a href="">' +
            '<img class="img-responsive portfolio-item" src="' + source + '" id="imageDozent' + i + '" alt="">' +
            '</a></div><h4><span class ="label-default center-block">' + name + '</span></h4></div></li>';
    dozentContainerB.append(myDiv);
}

setTitleUndCoDefaultGeneral(dozs[0],"#dozentTop","#titleP","#adressP","#functionP","#ah");


$("#myTab img").on("click",function (event) {
    var id = event.target.id;
    var intid=parseInt(id[id.toString().length-1]);
        var d="#divProf"+intid;
        zoom(d,getZoomtP);
    var currentP = dozs[intid];
setTitleUndCoDefaultGeneral(currentP,"#dozentTop","#titleP","#adressP","#functionP","#ah");
event.preventDefault();
});

function zoom(toZoom,ar){
    dezoom(ar);
     $(toZoom).animate({ 'zoom': 1.2 }, 400);
     ar.push(toZoom);
}
function dezoom(mar){
     mar.forEach(function (item) {
        $(item).animate({ 'zoom': 1 }, 400);
    });
}
function setTitleUndCoDefaultGeneral(currentP,imgID,tileID,adressID,functionID,hElement){
    var source = "img/dozenten/" + currentP.image;
    $(imgID).attr('src',source);
     $(tileID).empty();
    $(tileID).text(currentP.name);
    $(adressID).empty();
     $(adressID).text(currentP.adress);
     $(functionID).empty();
     if(currentP.functions.length === 0){
          $(hElement).hide();
     }else{
         $(hElement).show();
    currentP.functions.forEach(function (item) {
       $(functionID).append('<li>' + item + '</li>');
    });
      }
}

var ResponsibleDickas = new Responsible("M. Sc. Jörg Dickas", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Betreuer des Labors: NETLAB", "Verwaltung und technische Betreuung der Virtual-Server Landschaft (VM's) für Studenten"], "dickas.jpg");
var ResponsibleWendelin = new Responsible("Wendelin Freudinger", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "wendelin.jpg");
var ResponsibleReisberg = new Responsible("Dipl. Inf. (FH) Helmut Reisberg", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "reisberg.jpg");
var ResponsibleRiegler = new Responsible("Dipl.-Inform. (FH) Peter Riegler", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "peter.jpg");
var ResponsibleRust = new Responsible("Dipl. Inf. (FH) Thomas Rust", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Vorlesungsplan-Beauftragter"], "rust.jpg");
var ResponsibleLudwig = new Responsible("Ludwig Seubert", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "ludwig.jpg");
var ResponsibleNiko = new Responsible("Niko Wörtmann", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Medienbeauftragter"], "niko.jpg");
var ResponsibleChris = new Responsible("DDipl. Inf. (FH) Christian Ziegler", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "chris.jpg");

var techMit = [ResponsibleDickas, ResponsibleWendelin, ResponsibleReisberg, ResponsibleRiegler, ResponsibleRust,
    ResponsibleLudwig, ResponsibleNiko, ResponsibleChris];
setTitleUndCoDefaultGeneral(techMit[0],"#techTop","#titleT","#adressT","#functionT","#bh");
var techContainerB = $("#myTab1 ul");
for (var i = 0; i < techMit.length; i++) {
    var name = techMit[i].name;
    var mimage = techMit[i].image;
    var source = "img/dozenten/" + mimage;
    var myDiv = '<li><div class="col-sm-3 col-xs-6 vcenter" id="divTech'+i+'"><div><a href="#">' +
            '<img class="img-responsive portfolio-item" src="' + source + '" id="imageTech' + i + '" alt="">' +
            '</a></div><h4><span class ="label-default center-block">' + name + '</span></h4></div></li>';
    techContainerB.append(myDiv);
}

$("[id ^=imageTech]").on("click",function (event) {
    var id = event.target.id;
    var intid=parseInt(id[id.toString().length-1]);
            //alert(id);
             var d="#divTech"+intid;
        zoom(d,getZoomtT);
    var currentP = techMit[intid];
setTitleUndCoDefaultGeneral(currentP,"#techTop","#titleT","#adressT","#functionT","#bh");
event.preventDefault();
});

var ResponsibleToni = new Responsible("M. Sc. Toni Fetzer", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "fhws.jpg");
var ResponsibleMening = new Responsible("M. Sc. Patrick Mennig", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "fhws.jpg");
var ResponsibleVitali = new Responsible("M. Sc. Vitaliy Schreibmann", "Sanderheinrichsleitenweg 20, 97074 Würzburg", [], "fhws.jpg");
var ResponsibleOli = new Responsible("B. Sc. Oliver Weidel", "Sanderheinrichsleitenweg 20, 97074 Würzburg", ["Junior Assistants / Tutorien"], "oli.jpg");

var wiMit = [ResponsibleToni, ResponsibleMening, ResponsibleVitali, ResponsibleOli];
setTitleUndCoDefaultGeneral(wiMit[0],"#wiTop","#titleW","#adressW","#functionW","#ch");

var wiContainerB = $("#myTab2 ul");

for (var i = 0; i < wiMit.length; i++) {
    var name = wiMit[i].name;
    var mimage = wiMit[i].image;
    var source = "img/dozenten/" + mimage;
    var myDiv = '<li><div class="col-sm-3 col-xs-6 vcenter" id="divWi'+i+'"><div><a href="">' +
            '<img class="img-responsive portfolio-item" src="' + source + '" id="imageWi' + i + '" alt="">' +
            '</a></div><h4><span class ="label-default center-block">' + name + '</span></h4></div></li>';
    wiContainerB.append(myDiv);
}

$("#myTab2 img").on("click",function (event) {
    var id = event.target.id;
    var intid=parseInt(id[id.toString().length-1]);
     var d="#divWi"+intid;
        zoom(d,getZoomtW);
    var currentP = wiMit[intid];
setTitleUndCoDefaultGeneral(currentP,"#wiTop","#titleW","#adressW","#functionW","#ch");
event.preventDefault();
});

$("#prof").on("click",function (event) {
    dezoom(getZoomtP);
setTitleUndCoDefaultGeneral(dozs[0],"#dozentTop","#titleP","#adressP","#functionP","#ah");
event.preventDefault();
});
$("#tec").on("click",function (event) {
    dezoom(getZoomtT);
setTitleUndCoDefaultGeneral(techMit[0],"#techTop","#titleT","#adressT","#functionT","#bh");
event.preventDefault();
});
$("#wis").on("click",function (event) {
    dezoom(getZoomtW);
setTitleUndCoDefaultGeneral(wiMit[0],"#wiTop","#titleW","#adressW","#functionW","#ch");
event.preventDefault();
});

var refRatio = 240/300;
    
    var imgH = $(".vcenter").children("img").height();
    var imgW = $(".vcenter").children("img").width();
    
    if ( (imgW/imgH) < refRatio ) { 
        $(this).addClass("portrait");
    } else {
        $(this).addClass("landscape");
    }

////img#dozentTop.img-responsive
//var img = document.getElementById('img#dozentTop');
//img.onload = function() {
//    if(img.height > img.width) {
//        img.height = '100%';
//        img.width = 'auto';
//    }
//};
});

