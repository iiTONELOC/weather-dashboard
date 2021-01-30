var currentCityEl = document.getElementById('currentCity');
var titleContainerEl = document.getElementById('title-container');
var forecastCardContainerEl = document.getElementById('forecastCards');
var landingMessageEl = document.getElementById('landingMessage');
var btn = document.getElementById('search');
var storage = [];
var listGroup = document.querySelector('.list-group');


//show landing message only on load
currentCityEl.style.visibility = "hidden";
titleContainerEl.style.visibility = "hidden";
forecastCardContainerEl.style.visibility = "hidden";

//function to show page/hide landing message
var show = function () {
    currentCityEl.style.visibility = "visible";
    titleContainerEl.style.visibility = "visible";
    forecastCardContainerEl.style.visibility = "visible";
    landingMessageEl.style.visibility = "hidden";
}



// load localStorage append items to page
var loadMemory = function () {
    var memory = JSON.parse(localStorage.getItem("storage"));

    if (memory != null) {
        listGroup.innerHTML = "";
        for (let i = 0; i < memory.length; i++) {
            storage.push(memory[i])
            var city = document.createElement('li');
            city.setAttribute("class", "list-group-item");
            city.setAttribute("value", memory[i]);
            city.textContent = memory[i];
            listGroup.appendChild(city);
        }
        console.log(storage);
    }
}
//save data to local storage 
var save = function () {
    localStorage.setItem("storage", JSON.stringify(storage));
}

var reload = function (event) {
    var city = event.target.textContent
    console.log(city)
    show();
    //fetch from api
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + "339a47de31fdebaebb64d0a528d98345")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            //capture weather icon
            var iconURL = data.weather[0].icon
            console.log(iconURL)
            //capture lat and long for uvi
            var lat = data.coord.lat;
            console.log("Lattitude: " + lat);
            var long = data.coord.lon;
            console.log("Longitude: " + long);
            //display current weather data    
            var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
            document.getElementById('city').textContent = data.name;
            document.querySelector('.temp').textContent = data.main.temp;
            document.querySelector('.humid').textContent = data.main.humidity;
            document.querySelector('.wind').textContent = data.wind.speed;
            document.querySelector('#currentIcon').setAttribute("src", url);
            var currentDay = moment().format('L');
            document.querySelector('.currentDate').textContent = currentDay;

            fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely,alerts&units=imperial&appid=339a47de31fdebaebb64d0a528d98345")
                .then(function (forecast) {
                    return forecast.json();
                })
                .then(function (forecastData) {
                    console.log(forecastData);
                    //add the data for forecast day 1
                    var iconURL = forecastData.daily[1].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day1').textContent = moment().add(1, 'day').format('L');
                    document.getElementById("iconDay1").setAttribute("src", url);
                    document.querySelector('.temp1').textContent = forecastData.daily[1].temp.max;
                    document.querySelector('.hum1').textContent = forecastData.daily[1].humidity;

                    //don't want to repeat my self but not sure how to make these into functions
                    // add the data for day 2
                    var iconURL = forecastData.daily[2].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day2').textContent = moment().add(2, 'days').format('L');
                    document.getElementById("iconDay2").setAttribute("src", url);
                    document.querySelector('.temp2').textContent = forecastData.daily[2].temp.max;
                    document.querySelector('.hum2').textContent = forecastData.daily[2].humidity;

                    //data for day 3
                    var iconURL = forecastData.daily[3].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day3').textContent = moment().add(3, 'days').format('L');
                    document.getElementById("iconDay3").setAttribute("src", url);
                    document.querySelector('.temp3').textContent = forecastData.daily[3].temp.max;
                    document.querySelector('.hum3').textContent = forecastData.daily[3].humidity;

                    //data for day 4
                    var iconURL = forecastData.daily[4].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day4').textContent = moment().add(4, 'days').format('L');
                    document.getElementById("iconDay4").setAttribute("src", url);
                    document.querySelector('.temp4').textContent = forecastData.daily[4].temp.max;
                    document.querySelector('.hum4').textContent = forecastData.daily[4].humidity;

                    //data for day 5
                    var iconURL = forecastData.daily[5].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day5').textContent = moment().add(5, 'days').format('L');
                    document.getElementById("iconDay5").setAttribute("src", url);
                    document.querySelector('.temp5').textContent = forecastData.daily[5].temp.max;
                    document.querySelector('.hum5').textContent = forecastData.daily[5].humidity;

                    //get the uvi for current weather

                    var uvIndex = forecastData.current.uvi;
                    //add the index to the page
                    document.querySelector('.uv').textContent = uvIndex;
                    //set background color
                    if (forecastData.current.uvi < 3) {
                        document.querySelector('.uv').setAttribute("class", "green uv");
                    }
                    if (forecastData.current.uvi > 2 & forecastData.current.uvi < 6) {
                        document.querySelector('.uv').setAttribute("class", "yellow uv");
                    }
                    if (forecastData.current.uvi > 5 & forecastData.current.uvi < 8) {
                        document.querySelector('.uv').setAttribute("class", "orange uv");
                    }
                    if (forecastData.current.uvi > 7 & forecastData.current.uvi < 11) {
                        document.querySelector('.uv').setAttribute("class", "red uv");
                    }
                    if (forecastData.current.uvi >= 11) {
                        document.querySelector('.uv').setAttribute("class", "indigo uv");
                    }
                })
        })


}

//getWeather function
var getWeather = function (event) {
    event.preventDefault();
    //get the value from the input form
    console.log(event.target);
    var location = document.querySelector("input").value.trim();
    console.log(location);
    //clear input
    document.querySelector("input").value = "";
    //hide landing message show rest of page
    show();

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + "339a47de31fdebaebb64d0a528d98345")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else { return; }

        })
        .then(function (data) {
            console.log(data);
            //capture city name
            var cityName = data.name;
            //capture weather icon
            var iconURL = data.weather[0].icon
            console.log(iconURL)
            //capture lat and long for uvi
            var lat = data.coord.lat;
            console.log("Lattitude: " + lat);
            var long = data.coord.lon;
            console.log("Longitude: " + long);
            //display current weather data    
            var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
            document.getElementById('city').textContent = data.name;
            document.querySelector('.temp').textContent = data.main.temp;
            document.querySelector('.humid').textContent = data.main.humidity;
            document.querySelector('.wind').textContent = data.wind.speed;
            document.querySelector('#currentIcon').setAttribute("src", url);
            var currentDay = moment().format('L');
            document.querySelector('.currentDate').textContent = currentDay;



            //check for duplicates before saving
            var duplicate = false;
            for (let i = 0; i < storage.length; i++) {
                const element = storage[i];
                if (element == cityName) {
                    duplicate = true;
                }

            }
            //if not a duplicate, push cityName to storage array, save the array to localStorage, generate last searched item to page, 
            if (!duplicate) {
                storage.push(cityName);
                save();
                var city = document.createElement('li');
                city.setAttribute("class", "list-group-item");
                city.setAttribute("value", cityName);
                city.textContent = cityName;
                listGroup.appendChild(city);
            }

            fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely,alerts&units=imperial&appid=339a47de31fdebaebb64d0a528d98345")
                .then(function (forecast) {
                    return forecast.json();
                })
                .then(function (forecastData) {
                    console.log(forecastData);
                    //add the data for forecast day 1
                    var iconURL = forecastData.daily[1].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day1').textContent = moment().add(1, 'day').format('L');
                    document.getElementById("iconDay1").setAttribute("src", url);
                    document.querySelector('.temp1').textContent = forecastData.daily[1].temp.max;
                    document.querySelector('.hum1').textContent = forecastData.daily[1].humidity;

                    //don't want to repeat my self but not sure how to make these into functions
                    // add the data for day 2
                    var iconURL = forecastData.daily[2].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day2').textContent = moment().add(2, 'days').format('L');
                    document.getElementById("iconDay2").setAttribute("src", url);
                    document.querySelector('.temp2').textContent = forecastData.daily[2].temp.max;
                    document.querySelector('.hum2').textContent = forecastData.daily[2].humidity;

                    //data for day 3
                    var iconURL = forecastData.daily[3].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day3').textContent = moment().add(3, 'days').format('L');
                    document.getElementById("iconDay3").setAttribute("src", url);
                    document.querySelector('.temp3').textContent = forecastData.daily[3].temp.max;
                    document.querySelector('.hum3').textContent = forecastData.daily[3].humidity;

                    //data for day 4
                    var iconURL = forecastData.daily[4].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day4').textContent = moment().add(4, 'days').format('L');
                    document.getElementById("iconDay4").setAttribute("src", url);
                    document.querySelector('.temp4').textContent = forecastData.daily[4].temp.max;
                    document.querySelector('.hum4').textContent = forecastData.daily[4].humidity;

                    //data for day 5
                    var iconURL = forecastData.daily[5].weather[0].icon
                    var url = "http://openweathermap.org/img/wn/" + iconURL + ".png"
                    document.getElementById('day5').textContent = moment().add(5, 'days').format('L');
                    document.getElementById("iconDay5").setAttribute("src", url);
                    document.querySelector('.temp5').textContent = forecastData.daily[5].temp.max;
                    document.querySelector('.hum5').textContent = forecastData.daily[5].humidity;

                    //get the uvi for current weather

                    var uvIndex = forecastData.current.uvi;
                    //add the index to the page
                    document.querySelector('.uv').textContent = uvIndex;
                    //set background color
                    if (forecastData.current.uvi < 3) {
                        document.querySelector('.uv').setAttribute("class", "green uv");
                    }
                    if (forecastData.current.uvi > 2 & forecastData.current.uvi < 6) {
                        document.querySelector('.uv').setAttribute("class", "yellow uv");
                    }
                    if (forecastData.current.uvi > 5 & forecastData.current.uvi < 8) {
                        document.querySelector('.uv').setAttribute("class", "orange uv");
                    }
                    if (forecastData.current.uvi > 7 & forecastData.current.uvi < 11) {
                        document.querySelector('.uv').setAttribute("class", "red uv");
                    }
                    if (forecastData.current.uvi >= 11) {
                        document.querySelector('.uv').setAttribute("class", "indigo uv");
                    }
                })


        })


}

loadMemory();
//event listener for button
btn.addEventListener('click', getWeather)
listGroup.addEventListener('click', reload)