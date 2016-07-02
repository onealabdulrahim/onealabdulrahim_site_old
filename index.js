var Longitude;
var highNoonTime;
var timeToStr;
var timer = setInterval(findHighNoon, 1000);

var wellItsHighNoonMP3 = new Audio("sfx/well its high noon somewhere.mp3");
var justiceAintMP3 = new Audio("sfx/justice aint gonna.mp3");
var andThatsHowMP3 = new Audio("sfx/and thats how.mp3");
var didSomeoneCallMP3 = new Audio("sfx/did someone call.mp3");
var drawMP3 = new Audio("sfx/draw.mp3");
var easyMP3 = new Audio("sfx/easy.mp3");
var howdyMP3 = new Audio("sfx/howdy.mp3");
var imYourHuckleberryMP3 = new Audio("sfx/im your huckleberry.mp3");
var likeShootingFishMP3 = new Audio("sfx/like shooting fish.mp3");
var likeSittingDucksMP3 = new Audio("sfx/like sitting ducks.mp3");
var toReaperQuoteMP3 = new Audio("sfx/toReaperQuote.mp3");

var itsHighNoonMP3 = new Audio("sfx/mccree.ogg");
var playOfTheGameMP3 = new Audio("sfx/potg.ogg");

var quotes = [justiceAintMP3, andThatsHowMP3, didSomeoneCallMP3, drawMP3, easyMP3, howdyMP3, imYourHuckleberryMP3, likeShootingFishMP3, likeSittingDucksMP3, toReaperQuoteMP3, wellItsHighNoonMP3];

wellItsHighNoonMP3.play();

function findLocalHighNoon(longitude, timeZone) {
    "use strict";
    var finalTime = (longitude - (timeZone * 15)) / 15 + 0.123;
    
    if (finalTime > 0) {
        finalTime += 12;
    } else {
        finalTime = 12 - finalTime;
    }
    
    var hours = finalTime;
    var mins = finalTime * 100 % hours;
    
    var result = new Date();
    result.setHours(hours);
    result.setMinutes(mins);
    result.setSeconds(0);
    return result;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocationInfo);
    } else {
        document.getElementById("highNoonText").innerHTML = ("Geolocation is not supported by this browser.");
    }
}

function setLocationInfo(position) {
    "use strict";
    Longitude = position.coords.longitude;
    findHighNoon();
}

function findHighNoon() {
    var currentTime = new Date();
    var timeZone = currentTime.getTimezoneOffset() / -60;
    highNoonTime = findLocalHighNoon(Longitude, timeZone);
    
    if (currentTime.getMinutes() < 10) {
        if (currentTime.getSeconds() < 10) {
            timeToStr = currentTime.getHours() + ":0" + currentTime.getMinutes() + ":0" + currentTime.getSeconds();
        } else {
            timeToStr = currentTime.getHours() + ":0" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        }
    } else if (currentTime.getSeconds() < 10) {
        timeToStr = currentTime.getHours() + ":" + currentTime.getMinutes() + ":0" + currentTime.getSeconds();
    } else {
        timeToStr = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    }
    
    if (highNoonTime.getMinutes() < 10) {
        document.getElementById("whatTimeIsHN").innerHTML = ("High noon in your location is at: " + highNoonTime.getHours() + ":0" + highNoonTime.getMinutes() + " (GMT " + timeZone.toString() + ")</br>");
    } else {
        document.getElementById("whatTimeIsHN").innerHTML = ("High noon in your location is at: " + highNoonTime.getHours() + ":" + highNoonTime.getMinutes() + " (GMT " + timeZone.toString() + ")</br>");
    }
    
    
    if (currentTime.getHours() === highNoonTime.getHours() && currentTime.getMinutes() === highNoonTime.getMinutes()) {
        itsHighNoon();
    } else {
        itsNotHighNoon();
    }
}

function itsHighNoon() {
    document.getElementById("notHighNoonText").innerHTML = ("");
    document.getElementById("highNoonText").innerHTML = ("It's HIGH NOON!!! " + timeToStr);
    
    itsHighNoonMP3.play();
    playOfTheGameMP3.play();
    
    var timeNow = new Date();
    
    if (timeNow.getSeconds() % 9 == 0 && timeNow.getSeconds() % 10 != 0) {
        quotes[Math.floor(Math.random() * 10)].play();
    }
    
    countdownToHN();
}

function itsNotHighNoon() {
    document.getElementById("highNoonText").innerHTML = ("");
    document.getElementById("notHighNoonText").innerHTML = ("It's not high noon! The current time: " + timeToStr);
    
    isHighNoonYet = false;
    
    var timeNow = new Date();
    
    if (timeNow.getSeconds() % 9 == 0 && timeNow.getSeconds() % 10 != 0) {
        quotes[Math.floor(Math.random() * 10)].play();
    }
    
    countdownToHN();
}

function countdownToHN() {
    document.getElementById("title").innerHTML = ("Time until HIGH NOON: </br>");
    var timeUntil = getTimeRemaining(highNoonTime);
    
    if (timeUntil.hours === 1) {
        document.getElementById("hoursSpan").innerHTML = timeUntil.hours + " hour, ";
    } else {
        document.getElementById("hoursSpan").innerHTML = timeUntil.hours + " hours, ";
    }
    
    if (timeUntil.minutes === 1) {
        document.getElementById("minutesSpan").innerHTML = timeUntil.minutes + " minute, ";
    } else {
        document.getElementById("minutesSpan").innerHTML = timeUntil.minutes + " minutes, ";
    }
    
    if (timeUntil.seconds === 1) {
        document.getElementById("secondsSpan").innerHTML = timeUntil.seconds + " second.";
    } else {
        document.getElementById("secondsSpan").innerHTML = timeUntil.seconds + " seconds.";
    }
    
    
    clearInterval(timer);
    timer = setInterval(findHighNoon, 1000);
}

function getTimeRemaining(endTime) {
    var t = Date.parse(endTime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    
    if (hours < 0) {
        return {
            'hours': hours + 24,
            'minutes': minutes + 60,
            'seconds': seconds + 60
        };
    } else {
        return {
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
        
}

getLocation();
