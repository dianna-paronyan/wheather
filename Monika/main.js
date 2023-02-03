//selector variables
const inputval = document.querySelector('#cityinput')
const btn = document.querySelector('#add')
const city = document.querySelector('#cityoutput')
const descrip = document.querySelector('#description')
const temp = document.querySelector('#temp')
const wind = document.querySelector('#wind')
const visibility = document.querySelector('#visibility')
const humidity = document.querySelector('#humidity')

// Get your own free OWM API key at https://www.openweathermap.org/appid - please do not re-use mine!
const apik = "bb6942628ddb97c02e8c3149c8091cb2";

//convert kelvin to celcious
function convertion(val){
    return (val - 273).toFixed(2)
}

//fetch
    btn.addEventListener('click', function(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputval.value}&appid=${apik}`)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            const nameval = data['name']
            const descrip = data['weather']['0']['description']
            const tempature = data['main']['temp']
            const wndSpd = data['wind']['speed']

            const visibilityVal = data['visibility']
            const humidityVal = data['main']['humidity']
            
            city.innerHTML=`City: ${nameval}`;
            temp.innerHTML = `Temperature: ${ convertion(tempature)}°C`;
            description.innerHTML = `Conditions: ${descrip}`;
            wind.innerHTML = `Wind Speed: ${wndSpd} m/s W`;

            visibility.innerHTML = `Visibility: ${(visibilityVal/1000).toFixed(1)} km`;
            humidity.innerHTML = `Humidity: ${humidityVal}%`;

        })
        .catch(err => alert('You entered wrong city name'));
    })
