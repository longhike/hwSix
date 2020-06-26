console.log("app's opened");
// var search = the value parsed in the way i can use it with the weather api call

// holds everything that happens when the button's clicked
$('#bigSubmit').on('click', function (event) {
    event.preventDefault()
    // this is the variable which holds 
    var search = $('#userInput').val()
    var currentURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=3eb9f4cbb44e700cf69a60314c08af28"
    console.log(search)
    $.ajax({
        url: currentURL,
        method: 'GET'
        }).then(function(response){
            console.log(response)
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
                var nameDiv = $('<h6>')
                $(nameDiv).text(cityName);
                $(nameDiv).appendTo('#currentConditions');
                // p div for date ADD ATTRIBUTES
                var dateDiv = $('<p>')
                $(dateDiv).text(cityDate);
                $(dateDiv).appendTo('#currentConditions');
                // img div for weather icon ADD ATTRIBUTES
                var iconDiv = $('<img>')
                $(iconDiv).attr('src', iconURL);
                $(iconDiv).appendTo('#currentConditions');
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

                // for forecast
                // set div to variable forecast1
                var forcast1 = $('#day1')
                // empty the div of the placeholder
                currentConditions.empty()

            });
        });

})