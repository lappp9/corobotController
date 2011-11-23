var onError, onSuccess, startWatch, stopWatch, watchID, x, y;
watchID = void 0;
x = void 0;
y = void 0;
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
  return $("#tempValueDisplayAccelerometer").html("<br/>" + "Tracking Accelerometer: " + "<br/>" + "<br/>" + "<br/>" + "Translation value: " + x + "<br/>" + "Rotation value: " + y);
};
onError = function() {
  return alert("onError!");
};