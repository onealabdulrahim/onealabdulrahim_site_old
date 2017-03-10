/*
Oneal Abdulrahim
All soundbytes property of Blizzard Entertainment
The script below is open to use by all, no citation required

Please send all feedback to onealabdul@gmail.com
*/

// Global variables because I'm bad
var Longitude;
var highNoonTime;
var timeToStr;
var timer = setInterval(findHighNoon, 1000);
var itsHighNoonMP3 = new Audio("sfx/mccree.ogg");
var playOfTheGameMP3 = new Audio("sfx/potg.ogg");

var MP3142 = new Audio("sfx/142.mp3");
// Well, it's high noon somewhere in the world...
MP3142.play();


/*
    Returns a Date object with the local high noon of the user,
    I have used information from http://courses.education.illinois.edu/satex/sp96/noon-project/noontime.html
    to approximate this.
*/
function findLocalHighNoon(longitude, timeZone) {
    "use strict";

    if (timeZone > 0) {
        var finalTime = (-longitude - (-timeZone * 15)) / 15 + 0.123;
    } else {
        var finalTime = (longitude - (timeZone * 15)) / 15 + 0.123;
    }
    
    
    if (finalTime > 0) {
        finalTime += 12;
    } else {
        finalTime = 12 - finalTime;
    }
    
    var hours = Math.floor(finalTime);
    var mins = Math.ceil((finalTime - hours) * 60);
    
    var result = new Date();
    
    result.setHours(hours);
    result.setMinutes(mins);
    result.setSeconds(0);
    return result;
}

/*
    Ensures the browser supports geolocation. If not, the code lets you know
*/
function getLocation() {
    if (!navigator.geolocation) {
        document.getElementById("title").innerHTML = "Failed to get location!";
        return;
    }

    function success(position) {
        Longitude = position.coords.longitude;
        console.log("Reached");
        findHighNoon();
    }

    function error() {
        document.getElementById("title").innerHTML = "Using default location (GMT -6) #Houston";
        clearInterval(timer);
        timer = setInterval(findHighNoon, 5000);
        Longitude = -87.6298; // Chicago
        timeZone = -6;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

/*
    Uses the passed in navigator object to record and save longitude global variable, moves on to findHighNoon();
*/
function setLocationInfo(position) {
    "use strict";
    Longitude = position.coords.longitude;
    findHighNoon();
}

/*
    Finds and prints the difference in time between now and high noon time. Counts down using repeater method.
    If it's during the high noon minute, moves to high noon method.
    
    TODO: "It's almost high noon..."
*/
function findHighNoon() {
    var currentTime = new Date();
    var timeZone = currentTime.getTimezoneOffset() / -60;
    highNoonTime = findLocalHighNoon(Longitude, timeZone);

    if (Longitude != undefined) {
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

        var minMinute = highNoonTime.getMinutes();
        var maxMinute= highNoonTime.getMinutes();
        var minHour= highNoonTime.getHours();
        var maxHour= highNoonTime.getHours();

        if (highNoonTime.getMinutes() - 15 < 0) {
            minMinute = Math.abs((highNoonTime.getMinutes() - 15)) % 60;
            minHour = Math.abs((highNoonTime.getHours() - 1)) % 24;
        } else {
            minMinute = highNoonTime.getMinutes() - 15;
        }
        
        if (highNoonTime.getMinutes() + 15 >= 60) {
            maxMinute = (highNoonTime.getMinutes() + 15) % 60;
            maxHour = (highNoonTime.getHours + 1) % 24;
        } else {
            maxMinute = minMinute + 30;
        }

        // There's a 15 minute tolerance before and after high noon time. That's 30 minutes of observance.
        if ((currentTime.getHours() >= minHour && currentTime.getMinutes() >= minMinute && currentTime.getHours() <= maxHour && currentTime.getMinutes() <= maxMinute)) {
            itsHighNoon();
        } else {
            itsNotHighNoon();
        }
    }
}

/*
    Performs actions necessary to notify user of high noon time, calls countdown method to re-check time.
    When it's high noon, let the user know by playing a sound file of the ult, printing it, and playing McCree quotes.
*/
function itsHighNoon() {
    document.getElementById("notHighNoonText").innerHTML = ("");
    document.getElementById("highNoonText").innerHTML = ("🔫 It's HIGH NOON!!! 🔫" + timeToStr);
    
    itsHighNoonMP3.play();
    playOfTheGameMP3.play();
    
    var timeNow = new Date();
    
    if (timeNow.getSeconds() % 9 == 0 && timeNow.getSeconds() % 10 != 0) {
        var soundByte = new Audio("sfx/" + (Math.floor(Math.random() * (152 + 1))) + ".mp3");
        if (MP3142.paused) {
            soundByte.play();
        }
    }
    
    countdownToHN();
}

/*
    Performs actions necessary to notify user of current time, calls countdown method to re-check time.
    When it's not high noon, let the user know by printing it and the current time, and playing McCree quotes.
*/
function itsNotHighNoon() {
    document.getElementById("highNoonText").innerHTML = ("");
    document.getElementById("notHighNoonText").innerHTML = ("It's not high noon! The current time: " + timeToStr);
    
    isHighNoonYet = false;
    
    var timeNow = new Date();
    
    if (timeNow.getSeconds() % 24 == 0 && timeNow.getSeconds() % 10 != 0) {
        var soundByte = new Audio("sfx/" + (Math.floor(Math.random() * (152 + 1))) + ".mp3");
        if (MP3142.paused) {
            soundByte.play();
        }
    }
    
    countdownToHN();
}

/*
    Prints the difference in time remaining until high noon time, with conditionals to ensure proper verbiage.
*/
function countdownToHN() {
    document.getElementById("title").innerHTML = ("Time until exact HIGH NOON: </br>");
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

/*
    Calculates the time remaining by returning a reusable object containing hours, minutes, and seconds data.
*/
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