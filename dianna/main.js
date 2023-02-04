const form = document.querySelector("form");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const forecast_div = document.querySelector(".forecast");
const right_side = document.querySelector(".right_side");
const left_side = document.querySelector(".left_side");
const description = document.querySelector(".description");
const container = document.querySelector(".container");
const five_days_link = document.querySelector(".five_days");
const temp = document.querySelector(".temp");
const error = document.querySelector(".error");
const content = document.querySelector(".content");
const API_KEY = "b0a276daf292b30e22439b0fca835ba4";

let loading = true;
const loading_icon = document.createElement("img");
let val;
function showForecast(e) {
  e.preventDefault();
  loading = true;
  val = input.value;
  console.log(val);
  if (loading) {
    console.log(loading);
    // loading_icon.style.width = '100px'
    loading_icon.src = "https://i.stack.imgur.com/hzk6C.gif";
    content.appendChild(loading_icon);
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`
  )
    .then((res) => {
      // loading = false;

      return res.json();
    })
    .then((res) => {
      console.log(res);
      loading = false;
      // loading_icon.style.display = 'none';
      if (!loading) {
        console.log(loading);
        loading_icon.src = "";
        error.textContent = "";
        const name_date_div = document.createElement("div");
        name_date_div.className = "name_date_div";
        const p = document.createElement("p");
        p.textContent = res.name;
        p.style.fontSize = "40px";
        const date = document.createElement("p");
        date.textContent = `${new Date().toISOString().slice(0, 10)}`;
        name_date_div.append(p, date);
        const h2 = document.createElement("h2");
        h2.textContent = `${Math.round(res.main.temp)} °C`;
        h2.style.fontSize = "40px";
        const img_descr_div = document.createElement("div");
        img_descr_div.className = "img_descr_div";
        const img = document.createElement("img");
        img.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${res.weather[0]["icon"]}.svg`;
        img.style.width = "50px";
        const desc = document.createElement("p");
        desc.textContent = res.weather[0].description;
        img_descr_div.append(img, desc);
        left_side.append(name_date_div, img_descr_div);
        right_side.append(h2);

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
      }

      input.value = "";
    })
    .catch((err) => {
      loading = false;
      error.textContent = "Type valid city name";
      error.style.color = "red";
    });
}

form.addEventListener("submit", showForecast);
five_days_link.addEventListener("click", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${val}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.list.length; i += 8) {
        console.log(res.list[i]);
        const container = document.createElement("div");
        container.className = "five_days_block";
        const day = document.createElement("p");
        day.textContent = res.list[i].dt_txt.slice(0, 10);
        const p = document.createElement("p");
        p.textContent = `${Math.round(res.list[i].main.temp)} °C`;
        const icon = document.createElement("img");
        icon.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${res.list[i].weather[0]["icon"]}.svg`;
        container.append(day, icon, p);
        temp.append(container);
      }
    });
});
