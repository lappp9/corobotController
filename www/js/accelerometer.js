function startWatch() {
	
	// Update acceleration every .3 seconds
	//can take more options... just not sure what
	var options = { frequency: 30 };
	
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	
}

// Stop watching the acceleration
// this is mainly made for a button click or etc.  So onClick='stopWatch()' and it stops tracking accelerometer
// we discussed a 'kill' switch if the iphone was dropped or something, and it shuts off the communication.
// this would shut off the movement of the corobot...
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
	
	//builds JSON and calls the xml converter to return xml into var 'xml'
	$(function() {
	  
	  var x = Math.round(acceleration.x*Math.pow(10,2))/Math.pow(10,2);
	  var y = Math.round(acceleration.y*Math.pow(10,2))/Math.pow(10,2);
	  
	  var drive = {
			translation:  x,
			rotation: y
	  };
	  
	  var options = { formatOutput: false };
	  var xml = $.json2xml(drive, options);
	  
	  //-----NOTE:----- var XML has the xml data.  we are not using it yet, since we don't know what we're doing yet.
	  
	  //this is strictly to show modes are changing from drive(accelerometer) to claw.  displays the actual text of acceleration
	  var element = document.getElementById("tempValueDisplay");
	  element.innerHTML = "<br/>Tracking Accelerometer: <br/><br/><br/> Translation value: " + x + "<br/<br/>" + "Rotation value: " + y;
	  
	  });
}


// onError: Failed to get the acceleration
//
function onError() {
            alert('onError!');
        }
