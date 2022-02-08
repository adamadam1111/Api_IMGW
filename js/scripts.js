'use strict';

const baseUrl = 'https://danepubliczne.imgw.pl/api/data/synop/format/html1';

let stations = [];

const getWheater = async () => {

    try {

        const response = await fetch(baseUrl);

        const data = await response.json();

        return data;

    } catch (err) {

        console.error(`Błąd - spróbuj ponownie ${err}`);
    }
}

getWheater().then(data => {
    stations = data;

    data.forEach(element => {
        const optionHtml = document.createElement('option');

        optionHtml.setAttribute('value', element.id_stacji);
        optionHtml.innerText = element.stacja;

        document.querySelector('select').appendChild(optionHtml);
    });
});

document.querySelector('select').addEventListener('input', (e) => {
    const stationId = e.target.value;

    if (stationId === 5) {}

    const station = stations.find(x => x.id_stacji === stationId);

    if (!station) {return;}

    document.querySelector('div.temperatura').innerHTML
        = `${station.temperatura}°C`;

    document.querySelector('div.czas').innerHTML
        = `Godz. pomiaru<img class="image" src="assets/img/data.png"><br> ${station.godzina_pomiaru}:00`;

    document.querySelector('div.cisnienie').innerHTML
        = `Ciśnienie<img class="image" src="assets/img/cisnienie.png"><br> ${station.cisnienie} hPa`;

    document.querySelector('div.predkosc_wiatru').innerHTML
        = `Wiatr<img class="image" src="assets/img/predkosc_wiatru.png"><br> ${station.predkosc_wiatru} m/s`;

    document.querySelector('div.suma_opadu').innerHTML
        = `Opady<img class="image" src="assets/img/suma_opadu.png"><br> ${station.suma_opadu} mm`;
});
