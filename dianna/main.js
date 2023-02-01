const btn = document.querySelector("button");
const input = document.querySelector("input");
const forecast_div = document.querySelector(".forecast");
const API_KEY = "b0a276daf292b30e22439b0fca835ba4";

function showForecast() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      console.log(input.value);
      const p = document.createElement("p");
      p.textContent = res.name;
      const h4 = document.createElement("h4");
      h4.textContent = Math.round(res.main.temp);
      forecast_div.append(p, h4);
    });
}

btn.addEventListener("click", showForecast);
