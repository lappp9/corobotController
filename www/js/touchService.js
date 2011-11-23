var oldLeftAndRight, oldRotation, oldScale, oldUpAndDown, rotationCurrent, rotationValueToSendCorobot, scaleCurrent, scaleValueToSendCorobot, sendValues, touchLeftAndRight, touchRotation, touchScale, touchStart, touchUpAndDown, xCurrent, xStart, xValueToSendCorobot, yCurrent, yValueToSendCorobot;
oldUpAndDown = void 0;
oldLeftAndRight = void 0;
oldRotation = void 0;
oldScale = void 0;
xValueToSendCorobot = 90;
yValueToSendCorobot = -70;
rotationValueToSendCorobot = 0;
scaleValueToSendCorobot = void 0;
scaleCurrent = void 0;
rotationCurrent = void 0;
xStart = void 0;
xCurrent = void 0;
yCurrent = void 0;
document.addEventListener('gesturechange', function(event) {
  touchScale(event);
  touchRotation(event);
  return sendValues();
}, false);
document.addEventListener('touchstart', function(event) {
  return touchStart(event);
}, false);
document.addEventListener('touchmove', function(event) {
  if (event.touches.length === 1) {
    touchLeftAndRight(event);
    touchUpAndDown(event);
    return sendValues();
  }
}, false);
touchStart = function(event) {
  return console.log('STARTED A NEW SWIPE');
};
touchLeftAndRight = function(event) {
  xCurrent = event.touches[0].pageX;
  if (xCurrent < oldLeftAndRight) {
    if (xValueToSendCorobot > 313.5) {
      xValueToSendCorobot = 315;
    } else {
      xValueToSendCorobot += 2.5;
    }
  }
  if (xCurrent > oldLeftAndRight) {
    if (xValueToSendCorobot < 92.5) {
      xValueToSendCorobot = 90;
    } else {
      xValueToSendCorobot -= 2.5;
    }
  }
  return oldLeftAndRight = xCurrent;
};
touchRotation = function(event) {
  rotationCurrent = Math.round(event.rotation * Math.pow(10, 2)) / Math.pow(10, 2);
  if (rotationCurrent > oldRotation) {
    if (rotationValueToSendCorobot > 87.5) {
      rotationValueToSendCorobot = 90;
    } else {
      rotationValueToSendCorobot += 2.5;
    }
  }
  if (rotationCurrent < oldRotation) {
    if (rotationValueToSendCorobot < -87.5) {
      rotationValueToSendCorobot = -90;
    } else {
      rotationValueToSendCorobot -= 2.5;
    }
  }
  return oldRotation = rotationCurrent;
};
touchScale = function(event) {
  scaleCurrent = Math.round(event.scale * Math.pow(10, 2)) / Math.pow(10, 2);
  if (scaleCurrent > oldScale) {
    scaleValueToSendCorobot = 'open_cmd';
  }
  if (scaleCurrent < oldScale) {
    scaleValueToSendCorobot = 'close_cmd';
  }
  return oldScale = scaleCurrent;
};
touchUpAndDown = function(event) {
  yCurrent = event.touches[0].pageY;
  if (yCurrent < oldUpAndDown) {
    if (yValueToSendCorobot > 298.5) {
      yValueToSendCorobot = 300;
    } else {
      yValueToSendCorobot += 2.5;
    }
  }
  if (yCurrent > oldUpAndDown) {
    if (yValueToSendCorobot < -72.5) {
      yValueToSendCorobot = -75;
    } else {
      yValueToSendCorobot -= 2.5;
    }
  }
  return oldUpAndDown = yCurrent;
};
sendValues = function() {
  return $('#tempValueDisplayTouches').html("X value: " + xValueToSendCorobot + "<br/>" + "Y Value: " + yValueToSendCorobot + "<br/>" + "Scale: " + scaleValueToSendCorobot + "<br/>" + "Rotation: " + rotationValueToSendCorobot);
};