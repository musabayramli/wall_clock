const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const clockFace = document.querySelector('.clock-face');
const tickSound = document.getElementById('tick-sound'); 

function createNumbers() {
    for (let i = 1; i <= 12; i++) {
        const number = document.createElement('div');
        number.classList.add('number');
        number.innerText = i;

        const angle = i * 360 / 12;
        const x = 50 + 40 * Math.cos((angle - 90) * (Math.PI / 180));
        const y = 50 + 40 * Math.sin((angle - 90) * (Math.PI / 180));

        number.style.left = `${x}%`;
        number.style.top = `${y}%`;

        clockFace.appendChild(number);
    }
}

function setClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes() + seconds / 60;
    const hours = now.getHours() % 12 + minutes / 60 + seconds / 3600;

    const secondsDegrees = seconds * 360 / 60 - 90;
    const minutesDegrees = minutes * 360 / 60 - 90;
    const hoursDegrees = hours * 360 / 12 - 90;

    if (seconds === 0) {
        secondHand.style.transition = 'none'; 
    } else {
        secondHand.style.transition = 'transform 0.05s ease-in-out'; 
    }

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;


    tickSound.play();
}


window.addEventListener('DOMContentLoaded', function () {
    createNumbers();
    setClock();
    setInterval(setClock, 1000); 

    if (localStorage.getItem('soundEnabled') === 'true') {
        tickSound.play();
    }
});

window.addEventListener('click', function () {
    tickSound.play();
    localStorage.setItem('soundEnabled', 'true'); 
}, { once: true }); 
