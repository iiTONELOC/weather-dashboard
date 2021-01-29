var currentCityEl= document.getElementById('currentCity');
var titleContainerEl=document.getElementById('title-container');
var forecastCardContainerEl=document.getElementById('forecastCards');
var landingMessageEl=document.getElementById('landingMessage');
var btn=document.getElementById('search');
var storage= [];
var listGroup=document.querySelector('.list-group');

//show landing message only on load
currentCityEl.style.visibility="hidden";
titleContainerEl.style.visibility="hidden";
forecastCardContainerEl.style.visibility="hidden";

// load localStorage append items to page
var loadMemory=function(){
    var memory= JSON.parse(localStorage.getItem("storage"));

    if(memory!=null){
        listGroup.innerHTML="";
        for (let i = 0; i < memory.length; i++) {
        storage.push(memory[i])        
        var city=document.createElement('li');
        city.setAttribute("class","list-group-item");
        city.setAttribute("value",memory[i]);
        city.textContent=memory[i];
        listGroup.appendChild(city);


        }
        console.log(storage);
    }
}
//save data to local storage 
var save=function(){

    localStorage.setItem("storage", JSON.stringify(storage));
}

//getWeather function
var getWeather= function(event){
    event.preventDefault();
    //get the value from the input form
    console.log(event.target);
    var location=document.querySelector("input").value.trim();
    console.log(location);
    //clear input
    document.querySelector("input").value="";
    //hide landing message show rest of page
    currentCityEl.style.visibility="visible";
    titleContainerEl.style.visibility="visible";
    forecastCardContainerEl.style.visibility="visible";
    landingMessageEl.style.visibility="hidden";
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid="+"339a47de31fdebaebb64d0a528d98345")
    .then(function(response){
        return response.json();
        
    })
    .then(function(data){

        
        console.log(data);
        var cityName=data.name;
        //check for duplicates before saving
        var duplicate = false;
        for (let i = 0; i < storage.length; i++) {
            const element = storage[i];
            if(element == cityName){
                duplicate=true;
            }
            
        }
        //if not a duplicate, push cityName to storage array, save the array to localStorage, generate last searched item to page, 
        if(!duplicate){
            storage.push(cityName);
            save();
            var city=document.createElement('li');
            city.setAttribute("class","list-group-item");
            city.setAttribute("value",cityName);
            city.textContent=cityName;
            listGroup.appendChild(city);
            //display current weather data

        }  
        
        
        
        
    })
    
    
}

loadMemory();
//event listener for button
btn.addEventListener('click', getWeather)