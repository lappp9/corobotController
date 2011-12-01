var onError, onSuccess, roundNumber, sendAccelerometer, setRotation, setTranslation, startWatch, stopWatch, watchID, x, xToSend, y, yToSend;
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
  x = roundNumber(acceleration.x, 2);
  y = roundNumber(acceleration.y, 3);
  y = y * 100;
  y = roundNumber(y, 1);
  console.log(yToSend);
  xToSend = setTranslation(x);
  yToSend = setRotation(y);
  yToSend = yToSend * Math.PI / 180.0;
  return sendAccelerometer();
};
roundNumber = function(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
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
  if (y >= 30) {
    return 30;
  } else if (y <= -30) {
    return -30;
  } else if (y < 10 && y >= 0) {
    return 0;
  } else if (y > -10 && y <= 0) {
    return 0;
  } else {
    return y;
  }
};
sendAccelerometer = function() {
  var request;
  request = "<?xml version='1.0'?>" + "<methodCall><methodName>p.set_cmd_vel</methodName>" + "<params><param><value><double>" + xToSend + "</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><double>" + yToSend + "</double></value></param>" + "<param><value><int>1</int></value></param>" + "</params></methodCall>";
  talkToCorobot(request);
  return $("#tempValueDisplayAccelerometer").html("UP/DOWN: " + xToSend + "<br/>LEFT/RIGHT: " + roundNumber(yToSend, 2));
};
onError = function() {
  return alert("onError!");
};