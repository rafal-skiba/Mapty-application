'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
const {latitude} = position.coords;
const {longitude} = position.coords;
// const coords = [latitude, longitude]

map = L.map('map').setView([latitude, longitude], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



map.on('click', function (mapE) {
mapEvent = mapE;
form.classList.toggle('hidden');
inputDistance.focus();
    
})

}, function() {
alert('could not get your postion')
})

}

form.addEventListener('submit', function (e) {

e.preventDefault();
inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
const {lat, lng} = mapEvent.latlng;
    L.marker([lat, lng])
    .addTo(map)
    .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnclick: false,
        className: 'running-popup'
    }))
    .setPopupContent('working in progress')
    .openPopup();
})

inputType.addEventListener('change', function () {
   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})