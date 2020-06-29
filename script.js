console.log("app's opened");

// code here to check local storage and, if shit's there, add it to the search bar.
var searchHistory = localStorage.getItem('search')
console.log(searchHistory);

var searchEntry = $('<a>')
searchEntry.attr('href', undefined)
searchEntry.text(searchHistory)
$(searchEntry).appendTo('.searchHistory')


// holds everything that happens when the button's clicked
$('#bigSubmit').on('click', function (event) {
    event.preventDefault()
    // this is the variable which holds 
    var search = $('#userInput').val()
    localStorage.setItem('search', search)
    var currentURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=3eb9f4cbb44e700cf69a60314c08af28"
    console.log(search)
    $.ajax({
        url: currentURL,
        method: 'GET'
        }).then(function(response){
            console.log(typeof response)
            // if (typeof response !== object) {
            //     alert("City not found - please remove punctuation like apostrophes and ensure your spelling is accurate.")
            // }
            // else {
            // variables for different componenents i need:
                // city longitude FOR NEXT AJAX
                var cityLong = response.coord.lon
                    console.log(cityLong);
                // city latitude FOR NEXT AJAX
                var cityLat = response.coord.lat
                    console.log(cityLat);    
                // city's name variable
                var cityName = response.name
                    console.log(cityName);
                // temp variable
                    // grab kelvin, convert to farenheit, rounds to 0 decimals
                var cityTemp = ((response.main.temp * (9/5)) - 459.67).toFixed(0)
                    console.log(cityTemp);
                // current weather icon variables
                    // grab icon url part, add it to the image url
                    // use this to add 'src' tag for img when appending!
                var iconURL = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png'
                    console.log(iconURL);
                // date variables here
                var dateRaw = response.dt
                var dateToMillis = new Date(dateRaw * 1000)
                    // use cityDate, which gets date string, to append date
                var cityDate = dateToMillis.toDateString()
                    console.log(cityDate);
                // humidity variable (it's the percentage, add '%')
                var cityHum = response.main.humidity
                    console.log(cityHum);
                // NEED TO GET UV INDEX HERE
                
                // 
            // append results for location to the current weather card
                // set div to variable currentConditions
                var currentConditions = $('#currentConditions')
                // empty the div of the placeholder
                currentConditions.empty()
                // h6 div for city name ADD ATTRIBUTES
                var nameDiv = $('#currentTitle')
                $(nameDiv).text(cityName);
                // p div for date ADD ATTRIBUTES
                var dateDiv = $('<p>')
                $(dateDiv).text(cityDate);
                $(dateDiv).appendTo('#currentConditions');
                // img div for weather icon ADD ATTRIBUTES
                var iconDiv = $('#currentIcon')
                $(iconDiv).attr('src', iconURL);
                // p div for temperature ADD ATTRIBUTES
                var tempDiv = $('<p>')
                $(tempDiv).text('Temperature (F): ' + cityTemp);
                $(tempDiv).appendTo('#currentConditions');
                // p div for humidity ADD ATTRIBUTES
                var humDiv = $('<p>')
                $(humDiv).text('Humidity: ' + cityHum + '%');
                $(humDiv).appendTo('#currentConditions'); 

            // MAKE NEW API CALL WITHIN CURRENT, TO USE LONG AND LAT    
            var forecastURL = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLong + '&appid=3eb9f4cbb44e700cf69a60314c08af28'
            $.ajax({
            url: forecastURL,
            method: 'GET'
            }).then(function(response){
                console.log(response);
                // for UV
                var cityUV = response.current.uvi
                console.log(cityUV);
                var uvDiv = $('<p>')
                $(uvDiv).text(cityUV)
                    if (cityUV >= 11) {
                        $(uvDiv).attr('style','color:#ff0000; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black')
                    }
                    if (cityUV < 11 && cityUV >= 10) {
                        $(uvDiv).attr('style','color:#ff4000; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black')
                    }
                    if (cityUV < 10 && cityUV >= 7) {
                        $(uvDiv).attr('style','color:#ffbf00; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black')
                    }
                    if (cityUV < 7 && cityUV >= 5) {
                        $(uvDiv).attr('style','color:#ffff00; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black')
                    }
                    if (cityUV < 5 && cityUV >= 3) {
                        $(uvDiv).attr('style','color:#ffff00; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black')
                    }
                    if (cityUV < 3) {
                        $(uvDiv).attr('style','color:#00e600; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black')
                    }
                $(uvDiv).appendTo('#currentConditions')

                // for forecast 1
                // set needed variables
                    // fore1 date variable
                    var foreDateRaw1 = response.daily[0].dt
                        console.log(foreDateRaw1);
                    var foreDateToMillis1 = new Date(foreDateRaw1 * 1000)
                        // use foreDate1, which gets date string, to append date
                    var foreDate1 = foreDateToMillis1.toDateString()
                        console.log(foreDate1);
                    // fore1 weather icon variables
                    // grab icon url part, add it to the image url
                    // use this to add 'src' tag for img when appending!
                    var foreIconURL1 = 'http://openweathermap.org/img/wn/' + response.daily[0].weather[0].icon + '@2x.png'
                        console.log(foreIconURL1); 
                    // fore1 temp max
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMax1 = ((response.daily[0].temp.max * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMax1);
                    // fore1 temp min
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMin1 = ((response.daily[0].temp.min * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMin1);
                    // fore1 humidity (it's the percentage)
                    var foreHum1 = response.daily[0].humidity
                        console.log(foreHum1);             
                // append everything to the DOM
                // empty the div of the placeholder
                $('#day1').empty()
                // p div for date ADD ATTRIBUTES
                var foreDateDiv1 = $('<p>')
                $(foreDateDiv1).text(foreDate1);
                $(foreDateDiv1).appendTo('#day1');
                // img div for weather icon ADD ATTRIBUTES
                var foreIconDiv1 = $('<img>')
                $(foreIconDiv1).attr('src', foreIconURL1);
                $(foreIconDiv1).appendTo('#day1');
                // p div for temperatures ADD ATTRIBUTES
                var foreMaxDiv1 = $('<p>')
                $(foreMaxDiv1).text('Max Temp (F): ' + foreMax1);
                $(foreMaxDiv1).appendTo('#day1');
                var foreMinDiv1 = $('<p>')
                $(foreMinDiv1).text('Min Temp (F): ' + foreMin1);
                $(foreMinDiv1).appendTo('#day1');
                // p div for humidity ADD ATTRIBUTES
                var foreHumDiv1 = $('<p>')
                $(foreHumDiv1).text('Humidity: ' + foreHum1 + '%');
                $(foreHumDiv1).appendTo('#day1'); 

                // for forecast 2
                // set needed variables
                    // fore2 date variable
                    var foreDateRaw2 = response.daily[1].dt
                        console.log(foreDateRaw2);
                    var foreDateToMillis2 = new Date(foreDateRaw2 * 1000)
                        // use foreDate2, which gets date string, to append date
                    var foreDate2 = foreDateToMillis2.toDateString()
                        console.log(foreDate2);
                    // fore2 weather icon variables
                    // grab icon url part, add it to the image url
                    // use this to add 'src' tag for img when appending!
                    var foreIconURL2 = 'http://openweathermap.org/img/wn/' + response.daily[1].weather[0].icon + '@2x.png'
                        console.log(foreIconURL2); 
                    // fore2 temp max
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMax2 = ((response.daily[1].temp.max * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMax2);
                    // fore2 temp min
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMin2 = ((response.daily[1].temp.min * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMin2);
                    // fore2 humidity (it's the percentage)
                    var foreHum2 = response.daily[1].humidity
                        console.log(foreHum2);             
                // append everything to the DOM
                // empty the div of the placeholder
                $('#day2').empty()
                // p div for date ADD ATTRIBUTES
                var foreDateDiv2 = $('<p>')
                $(foreDateDiv2).text(foreDate2);
                $(foreDateDiv2).appendTo('#day2');
                // img div for weather icon ADD ATTRIBUTES
                var foreIconDiv2 = $('<img>')
                $(foreIconDiv2).attr('src', foreIconURL2);
                $(foreIconDiv2).appendTo('#day2');
                // p div for temperatures ADD ATTRIBUTES
                var foreMaxDiv2 = $('<p>')
                $(foreMaxDiv2).text('Max Temp (F): ' + foreMax2);
                $(foreMaxDiv2).appendTo('#day2');
                var foreMinDiv2 = $('<p>')
                $(foreMinDiv2).text('Min Temp (F): ' + foreMin2);
                $(foreMinDiv2).appendTo('#day2');
                // p div for humidity ADD ATTRIBUTES
                var foreHumDiv2 = $('<p>')
                $(foreHumDiv2).text('Humidity: ' + foreHum2 + '%');
                $(foreHumDiv2).appendTo('#day2'); 

                // for forecast 3
                // set needed variables
                    // fore3 date variable
                    var foreDateRaw3 = response.daily[2].dt
                        console.log(foreDateRaw3);
                    var foreDateToMillis3 = new Date(foreDateRaw3 * 1000)
                        // use foreDate3, which gets date string, to append date
                    var foreDate3 = foreDateToMillis3.toDateString()
                        console.log(foreDate3);
                    // fore3 weather icon variables
                    // grab icon url part, add it to the image url
                    // use this to add 'src' tag for img when appending!
                    var foreIconURL3 = 'http://openweathermap.org/img/wn/' + response.daily[2].weather[0].icon + '@2x.png'
                        console.log(foreIconURL3); 
                    // fore3 temp max
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMax3 = ((response.daily[2].temp.max * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMax3);
                    // fore3 temp min
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMin3 = ((response.daily[2].temp.min * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMin3);
                    // fore3 humidity (it's the percentage)
                    var foreHum3 = response.daily[2].humidity
                        console.log(foreHum3);             
                // append everything to the DOM
                // empty the div of the placeholder
                $('#day3').empty()
                // p div for date ADD ATTRIBUTES
                var foreDateDiv3 = $('<p>')
                $(foreDateDiv3).text(foreDate3);
                $(foreDateDiv3).appendTo('#day3');
                // img div for weather icon ADD ATTRIBUTES
                var foreIconDiv3 = $('<img>')
                $(foreIconDiv3).attr('src', foreIconURL3);
                $(foreIconDiv3).appendTo('#day3');
                // p div for temperatures ADD ATTRIBUTES
                var foreMaxDiv3 = $('<p>')
                $(foreMaxDiv3).text('Max Temp (F): ' + foreMax3);
                $(foreMaxDiv3).appendTo('#day3');
                var foreMinDiv3 = $('<p>')
                $(foreMinDiv3).text('Min Temp (F): ' + foreMin3);
                $(foreMinDiv3).appendTo('#day3');
                // p div for humidity ADD ATTRIBUTES
                var foreHumDiv3 = $('<p>')
                $(foreHumDiv3).text('Humidity: ' + foreHum3 + '%');
                $(foreHumDiv3).appendTo('#day3'); 

                // for forecast 4
                // set needed variables
                    // fore4 date variable
                    var foreDateRaw4 = response.daily[3].dt
                        console.log(foreDateRaw4);
                    var foreDateToMillis4 = new Date(foreDateRaw4 * 1000)
                        // use foreDate4, which gets date string, to append date
                    var foreDate4 = foreDateToMillis4.toDateString()
                        console.log(foreDate4);
                    // fore4 weather icon variables
                    // grab icon url part, add it to the image url
                    // use this to add 'src' tag for img when appending!
                    var foreIconURL4 = 'http://openweathermap.org/img/wn/' + response.daily[3].weather[0].icon + '@2x.png'
                        console.log(foreIconURL4); 
                    // fore4 temp max
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMax4 = ((response.daily[3].temp.max * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMax4);
                    // fore4 temp min
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMin4 = ((response.daily[3].temp.min * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMin4);
                    // fore4 humidity (it's the percentage)
                    var foreHum4 = response.daily[3].humidity
                        console.log(foreHum4);             
                // append everything to the DOM
                // empty the div of the placeholder
                $('#day4').empty()
                // p div for date ADD ATTRIBUTES
                var foreDateDiv4 = $('<p>')
                $(foreDateDiv4).text(foreDate4);
                $(foreDateDiv4).appendTo('#day4');
                // img div for weather icon ADD ATTRIBUTES
                var foreIconDiv4 = $('<img>')
                $(foreIconDiv4).attr('src', foreIconURL4);
                $(foreIconDiv4).appendTo('#day4');
                // p div for temperatures ADD ATTRIBUTES
                var foreMaxDiv4 = $('<p>')
                $(foreMaxDiv4).text('Max Temp (F): ' + foreMax4);
                $(foreMaxDiv4).appendTo('#day4');
                var foreMinDiv4 = $('<p>')
                $(foreMinDiv4).text('Min Temp (F): ' + foreMin4);
                $(foreMinDiv4).appendTo('#day4');
                // p div for humidity ADD ATTRIBUTES
                var foreHumDiv4 = $('<p>')
                $(foreHumDiv4).text('Humidity: ' + foreHum4 + '%');
                $(foreHumDiv4).appendTo('#day4'); 

                // for forecast 5
                // set needed variables
                    // fore5 date variable
                    var foreDateRaw5 = response.daily[4].dt
                        console.log(foreDateRaw5);
                    var foreDateToMillis5 = new Date(foreDateRaw5 * 1000)
                        // use foreDate5, which gets date string, to append date
                    var foreDate5 = foreDateToMillis5.toDateString()
                        console.log(foreDate5);
                    // fore5 weather icon variables
                    // grab icon url part, add it to the image url
                    // use this to add 'src' tag for img when appending!
                    var foreIconURL5 = 'http://openweathermap.org/img/wn/' + response.daily[4].weather[0].icon + '@2x.png'
                        console.log(foreIconURL5); 
                    // fore5 temp max
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMax5 = ((response.daily[4].temp.max * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMax5);
                    // fore5 temp min
                        // temp variable
                        // grab kelvin, convert to farenheit, rounds to 0 decimals
                    var foreMin5 = ((response.daily[4].temp.min * (9/5)) - 459.67).toFixed(0)
                        console.log(foreMin5);
                    // fore5 humidity (it's the percentage)
                    var foreHum5 = response.daily[4].humidity
                        console.log(foreHum5);             
                // append everything to the DOM
                // empty the div of the placeholder
                $('#day5').empty()
                // p div for date ADD ATTRIBUTES
                var foreDateDiv5 = $('<p>')
                $(foreDateDiv5).text(foreDate5);
                $(foreDateDiv5).appendTo('#day5');
                // img div for weather icon ADD ATTRIBUTES
                var foreIconDiv5 = $('<img>')
                $(foreIconDiv5).attr('src', foreIconURL5);
                $(foreIconDiv5).appendTo('#day5');
                // p div for temperatures ADD ATTRIBUTES
                var foreMaxDiv5 = $('<p>')
                $(foreMaxDiv5).text('Max Temp (F): ' + foreMax5);
                $(foreMaxDiv5).appendTo('#day5');
                var foreMinDiv5 = $('<p>')
                $(foreMinDiv5).text('Min Temp (F): ' + foreMin5);
                $(foreMinDiv5).appendTo('#day5');
                // p div for humidity ADD ATTRIBUTES
                var foreHumDiv5 = $('<p>')
                $(foreHumDiv5).text('Humidity: ' + foreHum5 + '%');
                $(foreHumDiv5).appendTo('#day5'); 

            });
        
            
        // }
        });

})