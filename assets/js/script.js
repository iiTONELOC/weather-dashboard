var currentCityEl= document.getElementById('currentCity');
var titleContainerEl=document.getElementById('title-container');
var forecastCardContainerEl=document.getElementById('forecastCards');
var landingMessageEl=document.getElementById('landingMessage');
var btn=document.getElementById('search');
var location=document.querySelector("input").value;

//show landing message only on load
//currentCityEl.style.visibility="hidden";
//titleContainerEl.style.visibility="hidden";
//forecastCardContainerEl.style.visibility="hidden";

// city list function
//var cityList= function(){

//}
//getWeather function
var getWeather= function(event){
    event.target.preventDefault();
    //get the value from the input form
    console.log(event.target);
   
    console.log(location);
}


//event listener for button
btn.addEventListener('click', getWeather)