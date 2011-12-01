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
  x = roundNumber(acceleration.x, 2)
  y = roundNumber(acceleration.y, 3)
  
  y = y * 100
  y = roundNumber(y, 1)
  
  console.log(yToSend)
  
  xToSend = setTranslation(x)
  yToSend = setRotation(y)
  yToSend = yToSend * Math.PI / 180.0
  
  sendAccelerometer()
  
roundNumber = (num, dec) ->
	Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
  
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
	if y >= 30 
		30
	else if y <= -30 
		-30
	else if y < 10 and y >=0
		0
	else if y > -10 and y <= 0
		0
	else y
	
sendAccelerometer = ->
	
	request = "<?xml version='1.0'?>" + 
	"<methodCall><methodName>p.set_cmd_vel</methodName>" + 
	"<params><param><value><double>" + xToSend + "</double></value></param>" + 
	"<param><value><double>0.0</double></value></param>"+ 
	"<param><value><double>" + yToSend + "</double></value></param>"+ 
	"<param><value><int>1</int></value></param>"+ 
	"</params></methodCall>"
		
	talkToCorobot(request)

	$("#tempValueDisplayAccelerometer").html "UP/DOWN: " + xToSend + "<br/>LEFT/RIGHT: " + roundNumber(yToSend,2)

onError = ->
  alert "onError!"