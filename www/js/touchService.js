var closedEnd, closedStart, oldLeftAndRight, oldRotation, oldScale, oldUpAndDown, openOrClose, rotationCurrent, rotationValueToSendCorobot, roundNumber, scaleCurrent, scaleValueToSendCorobot, sendGestureValues, touchLeftAndRight, touchRotation, touchStart, touchUpAndDown, xCurrent, xStart, xValueToSendCorobot, yCurrent, yValueToSendCorobot;
oldUpAndDown = void 0;
oldLeftAndRight = void 0;
oldRotation = void 0;
oldScale = void 0;
closedStart = void 0;
closedEnd = void 0;
xValueToSendCorobot = .15;
yValueToSendCorobot = .15;
rotationValueToSendCorobot = 0;
scaleValueToSendCorobot = 'g.close_cmd';
scaleCurrent = void 0;
rotationCurrent = void 0;
xStart = void 0;
xCurrent = void 0;
yCurrent = void 0;
document.addEventListener('gesturechange', function(event) {
  touchRotation(event);
  return sendGestureValues();
}, false);
document.addEventListener('gesturestart', function(event) {
  return closedStart = roundNumber(event.scale, 2);
}, false);
document.addEventListener('gestureend', function(event) {
  closedEnd = roundNumber(event.scale, 2);
  return openOrClose();
}, false);
document.addEventListener('touchstart', function(event) {
  return touchStart(event);
}, false);
document.addEventListener('touchmove', function(event) {
  if (event.touches.length === 1) {
    touchLeftAndRight(event);
    touchUpAndDown(event);
    return sendGestureValues();
  }
}, false);
touchStart = function(event) {
  return console.log('STARTED A NEW SWIPE');
};
touchLeftAndRight = function(event) {
  xCurrent = event.touches[0].pageX;
  if (xCurrent > oldLeftAndRight) {
    if (xValueToSendCorobot > .34) {
      xValueToSendCorobot = .35;
    } else {
      xValueToSendCorobot += .005;
    }
  }
  if (xCurrent < oldLeftAndRight) {
    if (xValueToSendCorobot < .16) {
      xValueToSendCorobot = .15;
    } else {
      xValueToSendCorobot -= .005;
    }
  }
  return oldLeftAndRight = xCurrent;
};
touchRotation = function(event) {
  rotationCurrent = roundNumber(event.rotation, 2);
  if (rotationCurrent < .3 && rotationCurrent > -.3) {
    rotationValueToSendCorobot = 0;
  }
  if (rotationCurrent > oldRotation) {
    if (rotationValueToSendCorobot > 1.45) {
      rotationValueToSendCorobot = 1.5;
    } else {
      rotationValueToSendCorobot += .05;
    }
  }
  if (rotationCurrent < oldRotation) {
    if (rotationValueToSendCorobot < -1.45) {
      rotationValueToSendCorobot = -1.5;
    } else {
      rotationValueToSendCorobot -= .05;
    }
  }
  return oldRotation = rotationCurrent;
};
touchUpAndDown = function(event) {
  yCurrent = event.touches[0].pageY;
  if (yCurrent < oldUpAndDown) {
    if (yValueToSendCorobot > .34) {
      yValueToSendCorobot = .35;
    } else {
      yValueToSendCorobot += .005;
    }
  }
  if (yCurrent > oldUpAndDown) {
    if (yValueToSendCorobot < -.14) {
      yValueToSendCorobot = -.15;
    } else {
      yValueToSendCorobot -= .005;
    }
  }
  return oldUpAndDown = yCurrent;
};
roundNumber = function(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};
openOrClose = function() {
  var request;
  if ((closedStart - closedEnd) > .5) {
    scaleValueToSendCorobot = 'g.close_cmd';
    request = "<?xml version='1.0'?>" + "<methodCall><methodName>" + scaleValueToSendCorobot + "</methodName>" + "</methodCall>";
    talkToCorobot(request);
  }
  if ((closedStart - closedEnd) < -2) {
    scaleValueToSendCorobot = 'g.open_cmd';
    request = "<?xml version='1.0'?>" + "<methodCall><methodName>" + scaleValueToSendCorobot + "</methodName>" + "</methodCall>";
    return talkToCorobot(request);
  }
};
sendGestureValues = function() {
  var request;
  request = "<?xml version='1.0'?>" + "<methodCall><methodName>l.setpose_cmd</methodName>" + "<params><param><value><double>" + roundNumber(xValueToSendCorobot, 2) + "</double></value></param>" + "<param><value><double>" + roundNumber(yValueToSendCorobot, 2) + "</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><double>" + roundNumber(rotationValueToSendCorobot, 2) + "</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "</params></methodCall>";
  talkToCorobot(request);
  return $('#tempValueDisplayTouches').html("X value: " + roundNumber(xValueToSendCorobot, 2) + "<br/>" + "Y Value: " + roundNumber(yValueToSendCorobot, 2) + "<br/>" + "Scale: " + scaleValueToSendCorobot + "<br/>" + "Rotation: " + roundNumber(rotationValueToSendCorobot, 2));
};