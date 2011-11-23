var onError, onSuccess, sendAccelerometer, setRotation, setTranslation, startWatch, stopWatch, watchID, x, xToSend, y, yToSend;
watchID = void 0;
x = 0;
y = 0;
xToSend = 0;
yToSend = 0;
startWatch = function() {
  var options;
  options = {
    frequency: 30
  };
  return watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
};
stopWatch = function() {
  if (watchID) {
    navigator.accelerometer.clearWatch(watchID);
    return watchID = null;
  }
};
onSuccess = function(acceleration) {
  x = Math.round(acceleration.x * Math.pow(10, 2)) / Math.pow(10, 2);
  y = Math.round(acceleration.y * Math.pow(10, 2)) / Math.pow(10, 2);
  xToSend = setTranslation(x);
  yToSend = setRotation(y);
  return sendAccelerometer();
};
setTranslation = function(x) {
  if (x >= .5) {
    return .5;
  } else if (x <= -.5) {
    return -.5;
  } else if (x < .1 && x >= 0) {
    return 0;
  } else if (x > -.1 && x <= 0) {
    return 0;
  } else {
    return x;
  }
};
setRotation = function(y) {
  return y;
};
sendAccelerometer = function() {
	
	var request = new XMLHttpRequest();  
	request.open('GET', 'http://localhost:8000/client.html', false);   
	request.send(null);  
	
	if (request.status == 0)  
		console.log(request.responseText);  
	
  return $("#tempValueDisplayAccelerometer").html("UP/DOWN: " + xToSend + "<br/>LEFT/RIGHT: " + yToSend);
};
onError = function() {
  return alert("onError!");
};