var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var centerLocation = new google.maps.LatLng(43.001032, -78.788871);
var geocoder = new google.maps.Geocoder();
var map;
var d;
var total;

var mapOptions = {                      //Initial Map Setting
    zoom:15,
    center: centerLocation
};


function initial() {                    //Initial the google Map
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    directionsDisplay.setMap(map);

}

function findLocation(){
    var input = document.getElementById("search").value;

    if(input == ""){
        alert("Put Address Before You Submit");
    }
    geocoder.geocode({
        'address' : input
    },
        function (results,status) {
            if(status == google.maps.GeocoderStatus.OK){
                // alert(results[0].geometry.location.lat());
                var mapOptions2 = {
                    zoom: 15,
                    center: results[0].geometry.location,
                }

                map = new google.maps.Map(document.getElementById('map'), mapOptions2);

                directionsDisplay.setMap(map);

                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map
            });
                addWeather(marker,marker.position.lat(),marker.position.lng());
            }

            else{
                alert("Your Address Is Incorrect");
            }
        });

}

function addWeather(marker,lat,lng){
    var retVal = "";
    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units=imperial" + "&APPID=ae3629cdd7983fff04e572e812d30ca3",
        success: function (data) {
            var picUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + "png";
            retVal = data;
        }, async: false
    });

    var weatherInformation = new google.maps.InfoWindow({
        content :
            '<h1> <img src="http://openweathermap.org/img/w/'+retVal.weather[0].icon+'.png"></h1>'+
            '<p><b>Description: ' + retVal.weather[0].description+ '<br> ' +
            'Temp : '+retVal.main.temp_min+' F - '+retVal.main.temp_max+ 'F<br>'+
            'Humidity: '+retVal.main.humidity +'%'+
            '</b></p>'
    });
    marker.addListener('mouseover',function(){              //If mouseover the marker then show the information window
        weatherInformation.open(map,marker);
    });

    marker.addListener('mouseout', function () {            //If mouse off the marker then close the information window.
        weatherInformation.close();
    });

    if(d==2){
        var h2 = document.createElement("h2");
        var word3 = document.createTextNode(marker.title);
        h2.appendChild(word3);
        weather.appendChild(h2);
    }
    if(total == d){
        while(weather.hasChildNodes()){                       // Remove Stuff from InputPanel
            weather.removeChild(weather.lastChild);
        }
        total = 0;
    }
    total += 1;

    var h3 = document.createElement("h3");
    var p = document.createElement("img");
    p.src = 'http://openweathermap.org/img/w/'+retVal.weather[0].icon+'.png';
    h3.appendChild(p);
    var word = document.createTextNode(retVal.main.temp+' °F');
    h3.appendChild(word);
    weather.appendChild(h3)


    var h4 = document.createElement("h4");
    var word2 = document.createTextNode("Description : "+retVal.weather[0].description);
    h4.appendChild(word2);
    weather.appendChild(h4);

    var table = document.createElement('table');

    table.border = "1";

    var tablebody = document.createElement('tbody');

    table.appendChild(tablebody);

    var tr1 = document.createElement('tr');
    var td11 = document.createElement('td');
    var td12 = document.createElement('td');
    var w = document.createTextNode("Wind");
    var w1 = document.createTextNode("Speed : "+retVal.wind.speed+" m/s,("+retVal.wind.deg+")")

    td11.appendChild(w);
    td12.appendChild(w1);
    tr1.appendChild(td11);
    tr1.appendChild(td12);
    tablebody.appendChild(tr1);


    var tr2 = document.createElement('tr');
    var td21 = document.createElement('td');
    var td22 = document.createElement('td');
    var w2 = document.createTextNode("Pressure");
    var w22 = document.createTextNode(retVal.main.pressure + " hpa");

    td21.appendChild(w2);
    td22.appendChild(w22);
    tr2.appendChild(td21);
    tr2.appendChild(td22);
    tablebody.appendChild(tr2);

    var tr3 = document.createElement('tr');
    var td31 = document.createElement('td');
    var td32 = document.createElement('td');
    var w3 = document.createTextNode("Clouds");
    var w32 = document.createTextNode(retVal.clouds.all + " %");

    td31.appendChild(w3);
    td32.appendChild(w32);
    tr3.appendChild(td31);
    tr3.appendChild(td32);
    tablebody.appendChild(tr3);
    weather.appendChild(table);

    var tr4 = document.createElement('tr');
    var td41 = document.createElement('td');
    var td42 = document.createElement('td');
    var w4 = document.createTextNode("Humanidity");
    var w42 = document.createTextNode(retVal.main.humidity + " %");

    td41.appendChild(w4);
    td42.appendChild(w42);
    tr4.appendChild(td41);
    tr4.appendChild(td42);
    tablebody.appendChild(tr4);
    weather.appendChild(table);

    var tr5 = document.createElement('tr');
    var td51 = document.createElement('td');
    var td52 = document.createElement('td');
    var w5 = document.createTextNode("Sunrise");
    var w52 = document.createTextNode(new Date(1000*retVal.sys.sunrise));

    td51.appendChild(w5);
    td52.appendChild(w52);
    tr5.appendChild(td51);
    tr5.appendChild(td52);
    tablebody.appendChild(tr5);
    weather.appendChild(table);


    var tr6 = document.createElement('tr');
    var td61 = document.createElement('td');
    var td62 = document.createElement('td');
    var w6 = document.createTextNode("Sunset");
    var w62 = document.createTextNode(new Date(1000*retVal.sys.sunset));

    td61.appendChild(w6);
    td62.appendChild(w62);
    tr6.appendChild(td61);
    tr6.appendChild(td62);
    tablebody.appendChild(tr6);

    var tr7 = document.createElement('tr');
    var td71 = document.createElement('td');
    var td72 = document.createElement('td');
    var w7 = document.createTextNode("Location");
    var w72 = document.createTextNode("("+retVal.coord.lon+" ，"+retVal.coord.lat+")");

    td71.appendChild(w7);
    td72.appendChild(w72);
    tr7.appendChild(td71);
    tr7.appendChild(td72);
    tablebody.appendChild(tr7);


    weather.appendChild(table);

}

function getDirection() {
    var start = document.getElementById('startLocation').value;     //Get start location
    var end = document.getElementById('endLocation').value;         //Get end location

    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {            //Request Route from Google Map API
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            resultDirection = result;


            console.log(result.routes[0].legs[0].end_location.lat())
            location1 = new google.maps.LatLng(result.routes[0].legs[0].start_location.lat(), result.routes[0].legs[0].start_location.lng());
            location2 = new google.maps.LatLng(result.routes[0].legs[0].end_location.lat(), result.routes[0].legs[0].end_location.lng());
            var marker1 = new google.maps.Marker({
                position: location1,
                map: map,
                title: start
            });
            addWeather(marker1,marker1.position.lat(),marker1.position.lng());

            var marker2 = new google.maps.Marker({
                position: location2,
                map: map,
                title: end
            });
            addWeather(marker2,marker2.position.lat(),marker2.position.lng());
        }
        else {
            alert('Direction Fails And The Status Is + ' + status);
        }
    })
}
function getSelectValue(){
    var selection = $('#selection option:selected').val();   // Get Option Value From HTML
    var inputPanel = document.getElementById("inputPanel")   // Get Input Div

    while(inputPanel.hasChildNodes()){                       // Remove Stuff from InputPanel
        inputPanel.removeChild(inputPanel.lastChild);
    }

    if(selection == "search"){                               // If Option Value Is Search
        directionsDisplay.set('directions',null);
        d = 1;
        total = 0;
        while(weather.hasChildNodes()){                       // Remove Stuff from InputPanel
            weather.removeChild(weather.lastChild);
        }
        var text = document.createTextNode("Enter A Location : ");
        inputPanel.appendChild(text);
        var br1 = document.createElement('br');
        inputPanel.appendChild(br1)
        var input = document.createElement("input");
        input.type = "text";
        input.className = "searchInput";
        input.id = "search";
        inputPanel.appendChild(input);

        var submit1 = document.createElement("button");
        submit1.innerHTML = "Submit";
        var br4 = document.createElement('br');
        inputPanel.appendChild(br4)
        inputPanel.appendChild(submit1);
        // submit1.onclick = findLocation();
        submit1.addEventListener("click",findLocation);
     }

    else if(selection == "direction"){                        // If Option Value is Direction
        directionsDisplay.set('directions',null);
        d = 2;
        total = 0;
        while(weather.hasChildNodes()){                       // Remove Stuff from InputPanel
            weather.removeChild(weather.lastChild);
        }

        var starT = document.createTextNode("Strat Location :")
        var br1 = document.createElement('br');
        inputPanel.appendChild(starT);
        inputPanel.appendChild(br1);
        var input1 = document.createElement("input");
        input1.type = "text";
        input1.className = "directionInput";
        input1.id = 'startLocation';
        inputPanel.appendChild(input1);

        var br2 = document.createElement('br');

        inputPanel.appendChild(br2);
        var endT = document.createTextNode("End Location :")
        var br3 = document.createElement('br');

        inputPanel.appendChild(endT);
        inputPanel.appendChild(br3);
        var input2 = document.createElement("input");
        input2.type = "text";
        input2.className = "directionInput";
        input2.id = 'endLocation';


        inputPanel.appendChild(input2);
        var br4 = document.createElement('br');
        inputPanel.appendChild(br4)
        var submit2 = document.createElement("button");
        submit2.innerHTML = "Submit";
        inputPanel.appendChild(submit2);
        submit2.addEventListener("click",getDirection);
    }
}

var t = null;
t = setTimeout(time,0);
function time(){
    clearTimeout(t);
    date = new Date();
    var year = date.getFullYear();
    var months = date.getMonth()+1;
    var d = date.getDate();
    var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var day = date.getDay();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();


    if(second<10){
        second = "0" + second;
    }
    if(minute<10){
        minute = "0" + minute;
    }
    if(hour<10){
        hour = "0" + hour;
    }
    document.getElementById("timeDisplay").innerHTML = "Current Time Is : " + year + "/" + months + "/" + d + "   "+ weekdays[day] +  "   "+hour+":"+minute+":"+second;
    t = setTimeout(time,1000);
}
