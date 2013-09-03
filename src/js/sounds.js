define({

	mouseOver : [

		new Howl({
		  urls: ['audio/over1.mp3', 'audio/over1.ogg'],
		  loop: false,
		  volume: 1.0,
		}),

		new Howl({
	  		urls: ['audio/over2.mp3', 'audio/over2.ogg'],
	  		loop: false,
	  		volume: 1.0,
		})
	],

	mouseDrag: new Howl({
	  urls: ['audio/turn.mp3', 'audio/turn.ogg'],
	  loop: false,
	  volume: 1.0
	}),

	ambient: new Howl({
	  urls: ['audio/raum.mp3', 'audio/raum.ogg'],
	  loop: true,
	  volume: 1.0
	}),
	

	search : new Howl({
	  urls: ['audio/search.mp3', 'audio/search.ogg'],
	  loop: false,
	  volume: 1.0,
	}),


	click : [
		new Howl({
		  urls: ['audio/fly-in1.mp3', 'audio/fly-in1.ogg'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/fly-in2.mp3', 'audio/fly-in2.ogg'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/fly-in3.mp3', 'audio/fly-in3.ogg'],
		  volume: 1.0,
		  loop: false
		})
	],

	closer : [
		new Howl({
		  urls: ['audio/closer1.mp3', 'audio/closer1.ogg'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/closer2.mp3', 'audio/closer2.ogg'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/closer3.mp3', 'audio/closer3.ogg'],
		  volume: 1.0,
		  loop: false
		})
	],

	out : new Howl({
	  urls: ['audio/flyout.mp3', 'audio/flyout.ogg'],
	  volume: 1.0,
	  loop: false
	}),

	entering : [
		new Howl({
		  urls: ['audio/entering1.mp3', 'audio/entering1.ogg'],
		  volume: 1.0,
		  loop: false
		}),

		new Howl({
		  urls: ['audio/entering2.mp3', 'audio/entering2.ogg'],
		  volume: 1.0,
		  loop: false
		})
	]

})