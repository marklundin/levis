THREE.Clock=function(e){this.autoStart=void 0!==e?e:!0,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1},THREE.Clock.prototype={constructor:THREE.Clock,start:function(){this.startTime=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now(),this.oldTime=this.startTime,this.running=!0},stop:function(){this.getElapsedTime(),this.running=!1},getElapsedTime:function(){return this.getDelta(),this.elapsedTime},getDelta:function(){var e=0;if(this.autoStart&&!this.running&&this.start(),this.running){var t=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now();e=.001*(t-this.oldTime),this.oldTime=t,this.elapsedTime+=e}return e}};