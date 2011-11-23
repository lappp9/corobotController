watchID = undefined
x = 0
y = 0
xToSend = 0
yToSend = 0

startWatch = ->
  options = frequency: 30
  watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options)

stopWatch = ->
  if watchID
    navigator.accelerometer.clearWatch watchID
    watchID = null

onSuccess = (acceleration) ->
  x = Math.round(acceleration.x * Math.pow(10, 2)) / Math.pow(10, 2)
  y = Math.round(acceleration.y * Math.pow(10, 2)) / Math.pow(10, 2)

  xToSend = setTranslation(x)
  yToSend = setRotation(y)
  sendAccelerometer()
  
setTranslation = (x) ->
	if x >= .5 
		.5
	else if x <= -.5 
		-.5
	else if x <.1 and x >=0
		0
	else if x > -.1 and x <= 0
		0
	else x
	
setRotation = (y) ->
	y
	
sendAccelerometer = ->
	$("#tempValueDisplayAccelerometer").html "UP/DOWN: " + xToSend + "<br/>LEFT/RIGHT: " + yToSend

onError = ->
  alert "onError!"