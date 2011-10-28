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
	
	$(function() {
	  
	  var x = Math.round(acceleration.x*Math.pow(10,2))/Math.pow(10,2);
	  var y = Math.round(acceleration.y*Math.pow(10,2))/Math.pow(10,2);
	  
	  alert(x);
	  
	  //making some jsonish shtuff to send to server... 
	  var drive = {
			translation:  x,
			rotation: y
	  };
	  
	  //converts json to xml using jquery
	  var options = { formatOutput: false };
	  var xml = $.json2xml(drive, options);
	  
	  
	  //-----NOTE:----- var XML has the xml data.  we are not using it yet, since we don't know what we're doing yet.
	  
	  //displays acceleration to prove it's working...
	  var element = document.getElementById("tempValueDisplayAccelerometer");
	  
	  element.innerHTML = "<br/>" + "Tracking Accelerometer: " +
						  "<br/>" + "<br/>" +
						  "<br/>" + "Translation value: " + x + 
						  "<br/>" + "Rotation value: " + y;
	  
	  });
}


// onError: Failed to get the acceleration
//
function onError() {
            alert('onError!');
        }
