
    
    // // parameters required:
    key = "1b9051b8-c8ed-4123-a64b-c75b8a0a6e86"
    key1 = "5ba2a2cc-7fba-4abb-b1be-d5cd88a363f8"
    key2 = "ff185814-18c0-4499-8322-8dac1c48696a"

    count = 0;

    // get data -------------------------------------------------------------------------------------------- //
    function make_api_call_getFullData(){

        if (count%3 == 0){
            keys = key;
        } else if (count%3 == 1){
            keys = key1;
        } else if (count%3 == 2){
            keys = key2;
        }   
        console.log("using key = " + keys);

        count = count + 1; 

        // generate latitude (-90 ; 90)
        rand_lat = (Math.floor(Math.random() * (90 - 1) - 0)).toString();;
        
        // generate longitude (-180 ; 180)
        rand_lon = (Math.floor(Math.random() * (180 - 1) - 0)).toString();;

        // http://api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}
        
        console.log("lat = " + rand_lat + " should be: (-90/90)");
        console.log("lon = " + rand_lon + " should be: (-180/180)");
        
        getData = "https://api.airvisual.com/v2/nearest_city?lat=" + rand_lat + "&lon=" + rand_lon + "&key=" + keys
        //getData = 'https://api.airvisual.com/v2/nearest_city?lat=48.02&lon=-50.20&key=' + key
        console.log("url = " + getData );

        console.log("url = http://api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}")

        $.ajax({
            url: getData,
            type: "GET",
            success: function(resp){ parseData(resp); },
            error: function(error){ console.log(error); }
        });
    }

    function parseData(resp){
        
        // get names (country/city/state)
        country = resp["data"]["country"] 
        console.log( country )

        state = resp["data"]["state"] 
        console.log( state )

        city = resp["data"]["city"] 
        console.log( city )

        // change labels
        elemCountry = document.getElementById("country");
        elemCountry.innerHTML = country;
        elemCountry = document.getElementById("state");
        elemCountry.innerHTML = state;
        elemCountry = document.getElementById("city");
        elemCountry.innerHTML = city;

        // change small labels
        elemCountry = document.getElementById("country_sm");
        elemCountry.innerHTML = " - COUNTRY - ";
        elemState = document.getElementById("state_sm");
        elemState.innerHTML = " - STATE - ";
        elemCity = document.getElementById("city_sm");
        elemCity.innerHTML = " - CITY - ";

         // get values 
         weather = resp["data"]["current"]["weather"] 
         hu = weather["hu"]
         pr = weather["pr"]
         tp = weather["tp"]
         ws = weather["ws"]
         ic = weather["ic"]

         console.log( "Temperature in Celsius: " + tp )
         console.log( "Humidity %:" + hu )
         console.log( "Atmospheric pressure in hPa: " + pr )
         console.log( "Wind speed (m/s):" + ws )
         console.log( "ic):" + ic )

        launchWeather(ic);

        // change labels
        tpL = document.getElementById("tp1");
        tpL.innerHTML = tp;
        huL = document.getElementById("hu1");
        huL.innerHTML = hu;
        wsL = document.getElementById("ws1");
        wsL.innerHTML = ws;
        prL = document.getElementById("pr1");
        prL.innerHTML = pr;
        
        // change small labels
        tpL = document.getElementById("tp");
        tpL.innerHTML = "- - - - - Temperature in Celsius - - - - -";
        huL = document.getElementById("hu");
        huL.innerHTML = "- - - - - - - - Humidity % - - - - - - - -";
        wsL = document.getElementById("ws");
        wsL.innerHTML = "- - - - - - Wind speed (m/s) - - - - - - ";
        prL = document.getElementById("pr");
        prL.innerHTML = "- - - Atmospheric pressure in hPa - - - ";

        console.log( resp )
    }

    

//// LAUNCHPAD HANDLING /////

sun = [96,61,94,59,88,52,54,55,84,85,50,51,80,81,83,47,41,74,39,76];
moon = [59,88,84,85,80,81,76,47];
stars = [64,96,94,53,44,39,79];
low_cloud_blue = [44,45,42,39,72,77,82,83];
low_cloud_white = [40,41,36,37,38,68,69,70,71,73,74,75,78,79];
mid_cloud_blue = [94,95,89,59,84,54,49,46,47,76,77,78,79];
mid_cloud_white = [90,91,55,85,86,87,50,51,80,81,82,83];
up_sun = [65,66,60,61,62,63,56,57,58,53];
up_moon = [65,66,62,63,58,53];
thunder = [42,43,37,38,74,75,69,70];
rain = [42,38,72,68,74,70];
snow = [64,65,60,98,93,94,95,90,59,54,55,84,51,45,40,41, 42,37,78,73,74, 75,70];
mist = [56,61,62,59,88,93,94,91,44,49,50,47,76,81,82,79,37,38, 69,70];
scatter_clouds_blue = [60,61,58,63,67,99,94,91,44,45,42,39,72,77,82,83];
scatter_clouds_white = [64,65,66,62,95,40,41,36,37,38,68,69,70,71,73,74,75,78,79]; 

darkBlue = 67;
lightBlue = 37;
yellow = 124;
orange = 84;
gray = 1;
white = 3; 


console.log(navigator);
let device;


if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure);
}

function failure(){
    console.log("Could not connect MIDI");
}

function updateDevices(event){
    console.log(event);
}

function success(midiAccess){
    //console.log(midiAccess);
    midiAccess.addEventListener('statechange',updateDevices);
    let inputs = midiAccess.inputs;
    // console.log(inputs);

    for (let output of midiAccess.outputs.values()){
        device = output;
        console.log('Output device selected', device);
    }

    inputs.forEach((input) => {
        console.log(input);
        input.addEventListener('midimessage', handleInput);
    });
}

function handleInput(input){
    console.log(input);

    let command = input.data[0];
    let note = input.data[1];
    let velocity = input.data[2];

    console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);


    if (velocity > 0){
        noteOn(note);
    }
    if (velocity == 0){
        noteOff(note);
    }
}

function noteOn(note){
    //document.getElementById("keyID").innerHTML = "Hello";
    //colorM(note,104);

    
}

function launchWeather(note){

    if(note == "01d"){ 
        blueBackground();
        paint(sun,orange);   
    }
    if(note == "01n"){
        blueBackground();
        paint(moon,yellow);
        paint(stars,white);
    }
    if(note == "02d"){
        blueBackground();
        paint(sun,orange);
        paint(low_cloud_blue,lightBlue);
        paint(low_cloud_white,white);
    }
    if(note == "02n"){
        blueBackground();
        paint(moon,yellow);
        paint(stars,white);
        paint(low_cloud_blue,lightBlue);
        paint(low_cloud_white,white);
    }
    if(note == "03d"){
        blueBackground();
        paint(low_cloud_blue,lightBlue);
        paint(low_cloud_white,white);
    }
    if(note == "10d"){
        blueBackground();
        paint(up_sun,orange)
        paint(mid_cloud_blue,lightBlue);
        paint(mid_cloud_white,white);
        paint(rain,gray);
    }
    if(note == "10n"){
        blueBackground();
        paint(up_moon,yellow)
        paint(mid_cloud_blue,lightBlue);
        paint(mid_cloud_white,white);
        paint(rain,gray);
    }
    if(note == "09d"){
        blueBackground();
        paint(mid_cloud_blue,lightBlue);
        paint(mid_cloud_white,white);
        paint(rain,gray);
    }
    if(note == "11d"){
        blueBackground();
        paint(mid_cloud_blue,lightBlue);
        paint(mid_cloud_white,white);
        paint(thunder,yellow);
    }
    if(note == "04d"){
        blueBackground();
        paint(scatter_clouds_blue,lightBlue);
        paint(scatter_clouds_white,white);
    }
    if(note == "13d"){
        blueBackground();
        paint(snow,white);
    }
    if(note == "50d"){
        whiteBackground();
        paint(mist,gray);
    }
}



/// functions 
function blueBackground(){
    for (var i = 36; i < 100; i ++){
        colorM(i,darkBlue);
    }
}

function whiteBackground(){
    for (var i = 36; i < 100; i ++){
        colorM(i,white);
    }
}
function paint(arr, color){
    for (var i = 0; i < arr.length; i ++){
        colorM(arr.at(i),color);
    }
}

function colorM(key,clr){
    device && device.send([0x90,key,clr]);
}








// Notes:
// (UIC Quad = 41.87188234951141, -87.64924998840038)
// key = 7b701115f492f64526949019c7ca44a8e0ebe7ae8e4c4c2b1acb802b3e26a908



    // --- Get Anime Quote --------------------------- //
    // parameters required: 
    // url = "https://animechan.vercel.app/api/random"

    // // function for API call
    // function make_api_call_getAnimeQuote(){
    //     $.ajax({
    //         url: url,
    //         type: "GET",
    //         success: function(resp){ console.log(resp); },
    //         error: function(error){ console.log(error); }
    //     });
    // }
    // ---------------------------------------------- //


    // F_country = "Mexico"
    // F_state = "none"
    // F_city = "none"

    // // get countries -------------------------------------------------------------------------------------------- //
    
    // // function getCountries(){
        
    // //     getCountries_url = "https://api.airvisual.com/v2/countries?key=" + key
    // //     //console.log( getCountries_url )
    // //     $.ajax({
    // //         url: getCountries_url,
    // //         type: "GET",
    // //         success: function(resp){ getRandomCountry(resp); },
    // //         error: function(error){ console.log(error); }
    // //     });
    // // }

    // // function getRandomCountry(resp){
    // //     countries_array = resp["data"] // get an array of all the countries!
    // //     console.log( countries_array )
        
    // //     rand_country = Math.floor(Math.random() * (countries_array.length - 1) + 1);
    // //     country = resp["data"][rand_country]["country"]
    // //     console.log( country )
    // //     F_country = country;
    // //     // change label
    // //     elem = document.getElementById("country");
    // //     elem.innerHTML = country;
    // // }    

    // // get state -------------------------------------------------------------------------------------------- //
    // function getStates(){

    //     getStates_url = "https://api.airvisual.com/v2/states?country=" + F_country + "&key=" + key
    //     console.log( getStates_url )
    //     $.ajax({
    //         url: getStates_url,
    //         type: "GET",
    //         success: function(resp){ getRandomState(resp, F_country); },
    //         error: function(error){ console.log(error); }
    //     });
    // }

    // function getRandomState(resp, country){
    //     state_array = resp["data"] // get an array of all the countries!
    //     console.log( state_array )
    //     rand_state = Math.floor(Math.random() * (state_array.length - 1) + 1);
    //     state = resp["data"][rand_state]["state"]
    //     console.log( state )
    //     F_state = state;
    //     // change label
    //     elem = document.getElementById("state");
    //     elem.innerHTML = state;
    // }    
        
    // // get city -------------------------------------------------------------------------------------------- //
    // function getCities(){

    //     getCities_url = "https://api.airvisual.com/v2/cities?state=" + F_state + "&country=" + F_country + "&key=" + key
    //     console.log( getCities_url )

    //     $.ajax({
    //         url: getCities_url,
    //         type: "GET",
    //         success: function(resp){ getRandomCity(resp, F_country, F_state); },
    //         error: function(error){ console.log(error); }
    //     });
    // }

    // function getRandomCity(resp, country, state){
    //     city_array = resp["data"] // get an array of all the countries!
    //     //console.log( city_array )

    //     rand_city = Math.floor(Math.random() * (city_array.length - 1) + 1);
    //     city = resp["data"][rand_city]["city"]
    //     console.log( city )
    //     F_city = city;
    //     // change label
    //     elem = document.getElementById("city");
    //     elem.innerHTML = city;
    // }













        //windSpeed = resp["wind"]["speed"]
        //description = resp["weather"][0]["description"]
        // make sure the data is a number(type float) not a string
        // console.log(typeof windSpeed)
        // console.log(`description = ${description}\ntemp in farinheight = ${temp}\nwind speed in mph = ${windSpeed}`)
        //}


//    function parse_CountriesArray(resp){
//         countries = resp["data"]
        

        
//    }
   
   
   
    // function parseWeather(resp){
    // // index into the JSON resp as dictionary to get the individual pieces of data 
    //     temp = resp["main"]["temp"]
    //     windSpeed = resp["wind"]["speed"]
    //     description = resp["weather"][0]["description"]
    // // make sure the data is a number(type float) not a string
    //     // console.log(typeof temp)
    //     // console.log(typeof windSpeed)
    //     console.log(`description = ${description}\ntemp in farinheight = ${temp}\nwind speed in mph = ${windSpeed}`)
    // }


    // -------------------------------------------------------------------------- //