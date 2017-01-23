var end = new Date('03/30/2017 9:0 PM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('time').innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
		
		if (days < 10) {
			document.getElementById('time').innerHTML = '0' + days + ':';
		} else {
			document.getElementById('time').innerHTML = days + ':';
		}
		
		if (hours < 10) {
			document.getElementById('time').innerHTML += '0' + hours + ':';
		} else {
			document.getElementById('time').innerHTML += hours + ':';
		}
		
		if (minutes < 10) {
			document.getElementById('time').innerHTML += '0' + minutes + ':';
		} else {
			document.getElementById('time').innerHTML += minutes + ':';
		}
		
		if (seconds < 10) {
			document.getElementById('time').innerHTML += '0' + seconds;
		} else {
			document.getElementById('time').innerHTML += seconds;
		}
    }

    timer = setInterval(showRemaining, 1000);
