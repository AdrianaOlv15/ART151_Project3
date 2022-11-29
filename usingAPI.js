// Notes:
// (UIC Quad = 41.87188234951141, -87.64924998840038)
// key = 7b701115f492f64526949019c7ca44a8e0ebe7ae8e4c4c2b1acb802b3e26a908


    transit_key = "7b701115f492f64526949019c7ca44a8e0ebe7ae8e4c4c2b1acb802b3e26a908"

    // --- Get transit stops which are near a location --------------------------- //
    
    // parameters required: 
    url = "https://external.transitapp.com/v3/public/nearby_stops?"
    transit_key = "7b701115f492f64526949019c7ca44a8e0ebe7ae8e4c4c2b1acb802b3e26a908"

    latitude = "41.87188234951141" 
    longitude = "-87.64924998840038"
    search_rad = 100; // (must be: int <= 1500)

    location_params = {
        "lat": latitude,
        "lon": longitude,
        "max_distance": search_rad,
        "apiKey" : transit_key
    }

    // function for API call
    function make_api_call(){
        $.ajax({
            url: url,
            type: "GET",
            data: location_params,
            success: function(resp){ console.log(resp); },
            error: function(error){ console.log(error); }
        });
    }

    // function to parse response for requested data
//    function parse_info_near_stops(resp){
        
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