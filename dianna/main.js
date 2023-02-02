const form = document.querySelector("form");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const forecast_div = document.querySelector(".forecast");
const right_side = document.querySelector(".right_side");
const left_side = document.querySelector(".left_side");
const description = document.querySelector(".description");
const container = document.querySelector(".container");
const API_KEY = "b0a276daf292b30e22439b0fca835ba4";

let bool = true;

function showForecast(e) {
  e.preventDefault();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);

      const p = document.createElement("p");
      p.textContent = res.name;
      const h3 = document.createElement("h3");
      h3.textContent = `${Math.round(res.main.temp)} °C`;
      const img = document.createElement("img");
      img.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${res.weather[0]["icon"]}.svg`;
      img.style.width = "70px";
      const desc = document.createElement("p");
      desc.textContent = res.weather[0].description;
      left_side.append(p, img, desc);
      right_side.append(h3);

      const min = document.createElement("div");
      min.className = "min";
      const max = document.createElement("div");
      max.className = "max";
      const feels_like = document.createElement("div");
      feels_like.className = "feels_like";

      const min_arrow = document.createElement("p");
      min_arrow.innerHTML = `\&#x2193 Min`;
      const min_temp = document.createElement("p");
      min_temp.textContent = `${Math.round(res.main.temp_min)} °C`;
      min.append(min_arrow, min_temp);
      const max_arrow = document.createElement("p");
      max_arrow.innerHTML = `\&#8593; Max`;
      const max_temp = document.createElement("p");
      max_temp.textContent = `${Math.round(res.main.temp_max)} °C`;
      max.append(max_arrow, max_temp);

      const feels_arrow = document.createElement("p");
      feels_arrow.innerHTML = `\&#9786; Feels like`;
      const feels = document.createElement("p");
      feels.textContent = `${Math.round(res.main.feels_like)} °C`;
      feels_like.append(feels_arrow, feels);
      // description.append(min,max,feels_like);

      // presure humidity wind
      const pressure = document.createElement("div");
      pressure.className = "pressure";
      const humidity = document.createElement("div");
      humidity.className = "humidity";
      const wind = document.createElement("div");
      wind.className = "wind";

      const pressure_icon = document.createElement("p");
      pressure_icon.innerHTML = `\&#247; Pressure`;
      const pressure_text = document.createElement("p");
      pressure_text.textContent = `${res.main.pressure} hPa`;
      pressure.append(pressure_icon, pressure_text);

      const humidity_icon = document.createElement("p");
      humidity_icon.innerHTML = `\&#x2614; Humidity`;
      const humidity_text = document.createElement("p");
      humidity_text.textContent = `${res.main.humidity} %`;
      humidity.append(humidity_icon, humidity_text);

      const wind_icon = document.createElement("p");
      wind_icon.innerHTML = `\&#x2197 Wind`;
      const wind_text = document.createElement("p");
      wind_text.textContent = `${res.wind.speed} m/s`;
      wind.append(wind_icon, wind_text);
      description.append(min, max, feels_like, pressure, humidity, wind);

      input.value = "";
    });
}

form.addEventListener("submit", showForecast);
