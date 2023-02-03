const input = document.querySelector('#input');
const showBox = document.querySelector('.show');
const btn = document.querySelector('button');
const modal = document.getElementById("myModal");
const form = document.querySelector('form');

const API_KEY = 'ec88bbe253f7310a41ce04ba00e0fc1b';

form.addEventListener('click', showData);

const itemsArr = [];

function showData(event) {
    event.preventDefault();
    const itemsArray = document.querySelectorAll('.item');
    if (itemsArray.length === 8) {
        location.reload();       
    }
    const cityName = input.value;
    input.value = '';

    if (cityName === '') {
        return;
    }

    if (itemsArr.includes(cityName.toLowerCase())) {
        showModal('This city already inputted');
        return;
    } else {
        itemsArr.push(cityName.toLowerCase());
    }

    try {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
            .then((response) => {
            return response.json();
        })
        .then((data) => {
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
            itemsArr.pop();
            showModal('Please search for a valid city');
        });
    } catch(error) {
        console.error(error);
    }
}

function showModal(msg) {
    document.querySelector('.modal-p').textContent = msg;
    modal.style.display = "block";
    input.blur();

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            input.focus();
        }
    }
}


