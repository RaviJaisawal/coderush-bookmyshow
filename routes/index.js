var express = require('express');
var router = express.Router();
var mongo = require('../Utils/mongoWrapper');
var mongojs = require('mongojs');
var db = mongojs('resale', ['seatlayout','bookings']);
var mailer = require('../utils/mailer');

/* GET home page. */
router.get('/', function(req, res, next) {


	db.seatlayout.find({}, {
		_id: 0
	}, function(err, data) {
		if (err) {
			console.log('error in select ' + err);

		} else {
			console.log(data);
			res.render('index', {
				data: data
			});

		}

	});
});


router.post('/updatemongo', function(req, res, next) {
	var qty = req.body.qty;
	var email = req.body.email;
	var phone = req.body.phone;
	var status = req.body.status;
	var query = {
		'status': '0'
	};
	console.log(query);
	var tid = Math.floor((1 + Math.random()) * 0x10000000).toString(16);
	console.log(tid);
	var update = {
		$set: {
			'tid': tid,
			'status': "1"
		}
	};
	for (var i = 0; i < qty; i++) {
		console.log('inside for');
		db.seatlayout.update(query, update, {
			multi: false
		}, function(err, data) {
			if (err) {
				console.log('err', err);
			} else {
				console.log('daa', data);
			}
		});
	}

	var userdata = {
		tid: tid,
		qty: qty,
		email: email,
		phone: phone,
		status:"1"
	};
	db.bookings.insert(userdata, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);

			var mailOptions = {
					from: 'Ticket-Bookmyshow@bookmyshow.com', // sender address
					to: email, // list of receivers
					subject: 'Your Ticket', // Subject line
					text: '', // plain text body
					html: '<html> <head>  <title>BookMyShow</title> </head> <body>  <h3>MOVIE NAME: Bhaubhali</h3> <h3>showTime: 10:30 PM</h3> <h3>QTY:</h3>'+qty+'<h3>BookingId:</h3>'+tid+'</body> </html>' // html body
				};
				console.log('3');
				mailer.sent(mailOptions, function(err, data) {
					console.log('4');
					if (err) {
						console.log(err);
					} else {
						 res.status(200).send(data);
					}
				});


		   

		}
	});


});




router.post('/UpdateBooking', function(req, res, next) {
	var qty = req.body.qty;
	var email = req.body.email;
	var phone = req.body.phone;
	var status = req.body.status;
	var query = {
		'status': '2',
		'qty' :qty
	};

	db.bookings.find(query,{tid:1,_id:0},{limit:1},function(err,data){
		if (err) {
			console.log(err);
		}
		else{
			if (data[0]) {
			var d = data[0];
			console.log(d);
			
		var update = {
		$set: {
			'status': "3"
		}
	};
			db.seatlayout.update(d,update,{multi: true},function(err,seatdata){
					if (err) {
						console.log(err);
					}
					else{
						console.log(seatdata);
						db.bookings.update(d,update,{multi: false},function(err,bookingdata){
							if (err) {
								console.log(err);
							}
							else{
								console.log(bookingdata);
								res.status(200).send('Completed');
							}
						});
					}
			});

		}else{
		res.status(304).send('Error');
	}
}
	});

	console.log(query);
	
	

});




router.get('/BT', function(req, res, next) {
	res.render('BT');
});


router.get('/resale', function(req, res, next) {
	res.render('resale');
});

router.post('/GetMemberHistory', function(req, res) {
	console.log(req.body);
	var query = {
		email: req.body.email,
		status: '1'
	};

	db.bookings.find(query, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.send(data);
		}
	});
});


router.post('/GetTransactionData', function(req, res) {
	console.log(req.body);
	var query = {
		tid: req.body.tid,
		status: '1'
	};

	db.bookings.find(query, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			res.send(data);
		}
	});
});



router.post('/MarkResale',function(req,res){
	console.log('inside post',req.body);
	var query = {
		'tid' : req.body.id.toString()
	};
	var update = {
		$set: {
			'status': '2'
		}
	};
	console.log(query);
	console.log(update);
	db.bookings.update(query,update,{multi:false},function(err,data){
		if (err) {
			console.log(err);
		}
		else{
			console.log('inside');
			db.seatlayout.update(query,update,{multi:true},function(err,data){
				console.log('inin');
				res.send(data);
			});
		}
	});
	
});


module.exports = router;