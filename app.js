var express = require('express');
var app = express();
var wpi = require('wiring-pi');
wpi.wiringPiSetup();
wpi.setup('gpio');
app.set('view engine', 'jade');

app.get('/', function(req,res) {
	res.render('index', { title: 'NodePi' });
});

app.get('/gpio/:pin/on', function(req,res) {
	res.send(req.params.pin + " is now on.");
	var pin = parseInt(req.params.pin);
	wpi.pinModeAlt(pin, wpi.FSEL_OUTP);
	wpi.digitalWrite(pin, 1);
});

app.get('/gpio/:pin/off', function(req,res) {
        res.send(req.params.pin + " is now off.");
        var pin = parseInt(req.params.pin);
        wpi.pinModeAlt(pin, wpi.FSEL_OUTP);
        wpi.digitalWrite(pin, 0);
});

app.get('/gpio/:pin/direction/:dir', function(req,res) {

	if(req.params.dir == "in") {
		wpi.pinModeAlt(parseInt(req.params.pin),wpi.FSEL_INPT);
		res.send(req.params.pin + " is now directed to " + req.params.dir);
	} else if(req.params.dir == "out") {
		wpi.pinModeAlt(parseInt(req.params.pin),wpi.FSEL_OUTP);
		res.send(req.params.pin + " is now directed to " + req.params.dir);
	} else {
		res.send("Error directing pin");
	}
})

app.get('/gpio/:pin/pwm/setup/:value/:range', function(req,res) {
	var range = parseInt(req.params.range);
	var pin = parseInt(req.params.pin);
	var value = parseInt(req.params.value);
	if(value > range) {
		res.send("Value can't be bigger than the range.");
	} else if(value < 0) {
		res.send("value can't be negative.");
	} else {
		wpi.softPwmCreate(pin,value,range);
		res.send("PWM on pin " + pin + " with a range of " + range + " and the value of  " + value + " is now set.");
	}
});

app.get('/gpio/:pin/pwm/change/:value', function(req,res) {
	var pin = parseInt(req.params.pin);
	var value = parseInt(req.params.value);
	wpi.softPwmWrite(pin,value);
	res.send("PWM on pin " + pin + " has been changed to value " + value);
});


app.get('/gpio/:pin/servo/:value', function(req,res) {
	var pin = parseInt(req.params.pin);
	var value = parseInt(req.params.value);
	wpi.softServoWrite(pin,value);
	res.send("Servo on pin " + pin + " has been set to value " + value);
});

app.get('/gpio/:pin/analog/:value', function(req,res) {
	var pin = parseInt(req.params.pin);
	var value = parseInt(req.params.value);
	wpi.analogWrite(pin,value);
	res.send("Value of  " + value + " has been written on pin " + pin);
});

app.get('/gpio/:pin/analog/', function(req,res) {
	var pin = parseInt(req.params.pin);
	res.send(wpi.analogRead(pin));
});
app.get('/gpio/:pin/read', function(req,res) {
	var pin = parseInt(req.params.pin);
	res.send(wpi.digitalRead(pin));
});




app.listen(3000, function() {
	console.log('Listening on port 3000');
});

