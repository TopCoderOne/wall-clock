document.addEventListener("DOMContentLoaded", () => {
    const clockElements = {
        hourHand: document.getElementById('hr'),
        minuteHand: document.getElementById('mn'),
        secondHand: document.getElementById('sc'),
        turnOnBtn: document.getElementById("turn-on-button"),
        turnOffBtn: document.getElementById("turn-off-button"),
        lights: document.getElementById("lights"),
    };

    function updateClock(handsPosition) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const hourDegrees = handsPosition ? (30 * (hours % 12) + 0.5 * minutes) : 0;
        const minuteDegrees = handsPosition ? (6 * minutes + 0.1 * seconds) : 0;
        const secondDegrees = handsPosition ? (6 * seconds) : 0;

        clockElements.hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        clockElements.minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        clockElements.secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    }

    let clockInterval = null;

    function initializeClock() {
        const isClockOn = localStorage.getItem('clockStatus') === 'on';
        updateButtonStyles(isClockOn);
        if (isClockOn) {
            turnOn();
        } else {
            turnOff();
        }
    }

    function updateButtonStyles(isOn) {
        const {
            turnOnBtn,
            turnOffBtn
        } = clockElements;
        turnOnBtn.style.backgroundColor = isOn ? "#008000" : "#0491e3";
        turnOffBtn.style.backgroundColor = isOn ? "#0491e3" : "#ff0000";
    }

    function turnOn() {
        if (!clockInterval) {
            clockInterval = setInterval(() => updateClock(true), 1000);
            clockElements.lights.classList.add("active");
            updateButtonStyles(true);
            localStorage.setItem('clockStatus', 'on');
        }
    }

    function turnOff() {
        clearInterval(clockInterval);
        clockInterval = null;
        updateClock(false);
        clockElements.lights.classList.remove("active");
        updateButtonStyles(false);
        localStorage.setItem('clockStatus', 'off');
    }

    initializeClock();

    clockElements.turnOnBtn.addEventListener("click", turnOn);
    clockElements.turnOffBtn.addEventListener("click", turnOff);
});