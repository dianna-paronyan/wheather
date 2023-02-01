const input = document.querySelector('#input');
const showBox = document.querySelector('.show');
const btn = document.querySelector('button');

// Get the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const API_KEY = '968d6d0c7091bb7ada936d49741a8185';

btn.addEventListener('click', showData);
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    showData();
  }
});

function showData() {
    const cityName = input.value;
    input.value = '';

    if (cityName === '') {
        return;
    }
    try {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
            .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const divItem = document.createElement('div');
            const h3 = document.createElement('h3');
            let pTemp = document.createElement('p');
            let pDesc = document.createElement('p');
            let iconDiv = document.createElement('div');
            let img = document.createElement('img');

            let icon = data.weather[0].icon;
            img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
            h3.textContent = data.name;
            pTemp.textContent = Math.round(data.main.temp) + '°C';
            pDesc.textContent = data.weather[0].description;
            pDesc.classList.add('second');

            iconDiv.appendChild(img);
            divItem.append(h3, pTemp, iconDiv, pDesc);
            divItem.classList.add('item');
            showBox.appendChild(divItem);
        }).catch(() => {
            modal.style.display = "block";
              
            // span.onclick = function() {
            //     modal.style.display = "none";
            // }
              
            window.onclick = function(event) {
                if (event.target === modal) {
                  modal.style.display = "none";
                }
            }
        });
    } catch(error) {
        console.error(error);
    }
}

// function showData() {
//     const cityName = input.value;
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
//         .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     });
// }


