const form = document.querySelector("form");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const current_forecast_div = document.querySelector(".current_forecast");
const right_side = document.querySelector(".right_side");
const left_side = document.querySelector(".left_side");
const current_details = document.querySelector(".current_details");
const container = document.querySelector(".container");
const five_days_link = document.querySelector(".five_days");
const temperature_div = document.querySelector(".temperature_div");
const error = document.querySelector(".error");
const current_content_details = document.querySelector(".current_content_details");
const five_days_err = document.querySelector(".five_days_err");
const loading_icon = document.createElement("img");

const API_KEY = "b0a276daf292b30e22439b0fca835ba4";

let loading = true;
let input_value;

//  current forecast 

function showCurrentForecast(e) {
  e.preventDefault();
  current_details.textContent = "";
  left_side.textContent = "";
  right_side.textContent = "";
  loading = true;
  input_value = input.value;
  if (loading) {
    loading_icon.src = "https://i.stack.imgur.com/hzk6C.gif";
    current_content_details.appendChild(loading_icon);
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then(({name,main,weather,wind}) => {
      loading = false;
      if (!loading) {
        loading_icon.src = "";
        error.textContent = "";
        const name_date_div = document.createElement("div");
        name_date_div.className = "name_date_div";
        const city_name = document.createElement("p");
        city_name.textContent = name;
        city_name.style.fontSize = "40px";
        const date = document.createElement("p");
        date.textContent = `${new Date().toISOString().slice(0, 10)}`;
        name_date_div.append(city_name, date);
        const temperature = document.createElement("h2");
        temperature.textContent = `${Math.round(main.temp)} °C`;
        temperature.style.fontSize = "40px";
        const img_descr_div = document.createElement("div");
        img_descr_div.className = "img_descr_div";
        const img = document.createElement("img");
        img.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        img.style.width = "50px";
        const desc = document.createElement("p");
        desc.textContent = weather[0].description;
        img_descr_div.append(img, desc);
        left_side.append(name_date_div, img_descr_div);
        right_side.append(temperature);

        //create min, max, feels like blocks

        const min = document.createElement("div");
        min.className = "min";
        const max = document.createElement("div");
        max.className = "max";
        const feels_like_block = document.createElement("div");
        feels_like_block.className = "feels_like";

        // min block
        const min_arrow = document.createElement("p");
        min_arrow.innerHTML = `\&#x2193 Min`;
        const min_temp = document.createElement("p");
        min_temp.textContent = `${Math.floor(main.temp_min)} °C`;
        min.append(min_arrow, min_temp);

        // max block
        const max_arrow = document.createElement("p");
        max_arrow.innerHTML = `\&#8593; Max`;
        const max_temp = document.createElement("p");
        max_temp.textContent = `${Math.round(main.temp_max)} °C`;
        max.append(max_arrow, max_temp);
        // feels like block
        const feels_like_div = document.createElement("div");
        feels_like_div.className = "feels_like_div";
        const feels_icon = document.createElement("p");
        feels_icon.innerHTML = `\&#9786;`;
        feels_icon.style.fontSize = "24px";
        const feels_like_text = document.createElement("p");
        feels_like_text.textContent = "Feels like";
        feels_like_div.append(feels_icon, feels_like_text);
        const feels = document.createElement("p");
        feels.textContent = `${Math.round(main.feels_like)} °C`;
        feels_like_block.append(feels_like_div, feels);


        // create  presure, humidity, wind blocks
        const pressure_block = document.createElement("div");
        pressure_block.className = "pressure";
        const humidity_block = document.createElement("div");
        humidity_block.className = "humidity";
        const wind_block = document.createElement("div");
        wind_block.className = "wind";

        // pressure block
        const pressure_div = document.createElement("div");
        pressure_div.className = "pressure_div";
        const pressure_icon = document.createElement("img");
        pressure_icon.src = `https://cdn-icons-png.flaticon.com/512/2412/2412663.png`;
        pressure_icon.style.width = "30px";
        const txt1 = document.createElement("p");
        txt1.textContent = "Pressure";
        pressure_div.append(pressure_icon, txt1);
        const pressure_text = document.createElement("p");
        pressure_text.textContent = `${main.pressure} hPa`;
        pressure_block.append(pressure_div, pressure_text);
        // humidity block
        const humidity_div = document.createElement("div");
        humidity_div.className = "humidity_div";
        const humidity_icon = document.createElement("img");
        humidity_icon.src = `https://cdn-icons-png.flaticon.com/512/3262/3262968.png`;
        humidity_icon.style.width = "15px";
        const txt2 = document.createElement("p");
        txt2.textContent = "Humidity";
        humidity_div.append(humidity_icon, txt2);
        const humidity_text = document.createElement("p");
        humidity_text.textContent = `${main.humidity} %`;
        humidity_block.append(humidity_div, humidity_text);

        // wind block 
        const wind_div = document.createElement("div");
        wind_div.className = "wind_div";
        const wind_icon = document.createElement("img");
        wind_icon.src = `https://cdn-icons-png.flaticon.com/512/615/615486.png`;
        wind_icon.style.width = "17px";
        const txt3 = document.createElement("p");
        txt3.textContent = "Wind";
        wind_block.append(wind_icon, txt3);
        const wind_text = document.createElement("p");
        wind_text.textContent = `${wind.speed} m/s`;
        wind_block.append(wind_div, wind_text);

        // join all blocks in current_details block
        current_details.append(min, max, feels_like_block, pressure_block, humidity_block, wind_block);
      }

      input.value = "";
    })
    .catch((err) => {
      loading = false;
      error.textContent = "Type valid city name";
      error.style.color = "red";
    });
}

form.addEventListener("submit", showCurrentForecast);

function showFiveDaysForecast(e) {
  e.preventDefault();
  temperature_div.textContent = "";
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${input_value}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then(({list}) => {
      for (let i = 0; i < list.length; i += 8) {
        // console.log(list[i]);
        five_days_err.textContent = "";
        const container = document.createElement("div");
        container.className = "five_days_block";
        const day = document.createElement("p");
        day.textContent = list[i].dt_txt.slice(0, 10);
        const p = document.createElement("p");
        p.textContent = `${Math.round(list[i].main.temp)} °C`;
        const icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${list[i].weather[0].icon}@2x.png`;
        icon.style.width = "50px";
        container.append(day, icon, p);
        temperature_div.append(container);
      }
    })
    .catch((err) => {
      five_days_err.textContent = "Failed to load";
      five_days_err.style.color = "red";
    });
}

form.addEventListener("submit", showFiveDaysForecast);
