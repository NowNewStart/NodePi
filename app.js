var gpio = require("gpio");
var intervalTimer;
var express = require("express");
var app = express();

app.set('view engine', 'jade');

app.get('/gpio/:pin/blink', function(req,res) {
	res.send(req.params.pin + " is now blinking.");
	var gpiob = gpio.export(req.params.pin, {
   		ready: function() {
        		intervalTimer = setInterval(function() {
         			gpiob.set();
        	 		setTimeout(function() { gpiob.reset(); }, 500);
	                }, 1000);
   		}
	});
});


app.get('/gpio/:pin/on', function(req,res) {
	res.send(req.params.pin + " is now on");
	var gpioo = gpio.export(req.params.pin, {
		ready: function() {
			gpioo.set();
		}
	});
});


app.get('/gpio/:pin/off', function(req,res) {
        res.send(req.params.pin + " is now off");
        var gpioo = gpio.export(req.params.pin, {
                ready: function() {
                        gpioo.set(0);
                }
        });
});

app.get('/gpio/:pin/direction/:dir', function(req,res) {
		res.send("Direction of Pin " + req.params.pin + " is now on " + req.params.dir);
		var gpiod = gpio.export(req.params.pin, {
			ready: function() {
				gpiod.setDirection(req.params.dir);
			}
		});
});

app.get('/gpio/:pin/reset', function(req,res) {
	res.send(req.params.pin + " is now resetted.");
	var gpior = gpio.export(req.params.pin, {
		ready: function() {
			gpior.reset();
		}
	});
});

app.get('/', function(req,res) {
	res.render('index', { title: 'NodePi'});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
