define({

	mouseOver : [

		new Howl({
		  urls: ['audio/over1.mp3'],
		  loop: false,
		  volume: 1.0,
		}),

		new Howl({
	  		urls: ['audio/over2.mp3'],
	  		loop: false,
	  		volume: 1.0,
		})
	],

	mouseDrag: new Howl({
	  urls: ['audio/turn.mp3'],
	  loop: true,
	  volume: 1.0
	}),

	ambient: new Howl({
	  urls: ['audio/raum.mp3'],
	  loop: true,
	  volume: 1.0
	}),
	

	search : new Howl({
	  urls: ['audio/search.mp3'],
	  loop: false,
	  volume: 1.0,
	}),


	click : [
		new Howl({
		  urls: ['audio/fly-in1.mp3'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/fly-in2.mp3'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/fly-in3.mp3'],
		  volume: 1.0,
		  loop: false
		})
	],

	closer : [
		new Howl({
		  urls: ['audio/closer1.mp3'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/closer2.mp3'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/closer3.mp3'],
		  volume: 1.0,
		  loop: false
		})
	],

	out : new Howl({
	  urls: ['audio/flyout.mp3'],
	  volume: 1.0,
	  loop: false
	}),

	entering : [
		new Howl({
		  urls: ['audio/entering1.mp3'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/entering2.mp3'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/turn.mp3'],
		  volume: 1.0,
		  loop: false
		})
	]

})