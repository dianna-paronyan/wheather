
    const APIkey = "4f36ebb5b85fdca239f928e327f5e13e"
    const country = "Armenia"
    let cities = document.querySelector(".cities")
    let btn = document.getElementById("btn")
    let cityinput = document.getElementById("cityinput")
    let temp = document.querySelector(".temp")
    let form=document.querySelector("form")
    let wrong= document.querySelector(".error1")

    function forecast(e) {
    e.preventDefault()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityinput.value}&appid=4f36ebb5b85fdca239f928e327f5e13e&units=metric`)
        .then(function (response) {
            return response.json();
        }).then(function (response){
            wrong.textContent=""
            console.log(response)
            let h2 = document.createElement("h2")
            h2.textContent = response.name
            cities.appendChild(h2)
            let h3 = document.createElement("h3")
            h3.textContent = Math.round(response.main.temp)
            temp.appendChild(h3)
            let div=document.createElement("div")
            div.append(h2,h3)
            div.classList.add("item")
            cities.appendChild(div)
            cityinput.value=""
            let icon=document.createElement("img")
            icon.src=`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${response.weather[0]["icon"]}.svg`
           div.appendChild(icon)
        })
.catch((error)=>{
            wrong.textContent="Please search for a valid city 😩 "
        })
    }
    form.addEventListener("submit", forecast);
    
