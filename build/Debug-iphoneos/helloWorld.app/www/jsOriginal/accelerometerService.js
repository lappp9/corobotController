function startWatch() {
	
	// Update acceleration every .3 seconds
	//can take more options... just not sure what
	var options = { frequency: 30 };
	
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	
}

// Stop watching the acceleration
function stopWatch() {
	if (watchID) {
		navigator.accelerometer.clearWatch(watchID);
		watchID = null;
	}
}


// onSuccess: Get a snapshot of the current acceleration
// instead of displaying the accelerometer's values directly
// i'm using the json2xml to convert them to xml and displaying them instead of sending them...?
function onSuccess(acceleration) {
		
	  var x = Math.round(acceleration.x*Math.pow(10,2))/Math.pow(10,2);
	  var y = Math.round(acceleration.y*Math.pow(10,2))/Math.pow(10,2);

	  
	  //displays acceleration to prove it's working...
	  $('#tempValueDisplayAccelerometer').html("<br/>" + "Tracking Accelerometer: " +
											   "<br/>" + "<br/>" +
											   "<br/>" + "Translation value: " + x + 
											   "<br/>" + "Rotation value: " + y);
}


// onError: Failed to get the acceleration
function onError() {
            alert('onError!');
        }
