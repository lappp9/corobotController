oldUpAndDown = undefined
oldLeftAndRight = undefined
oldRotation = undefined
oldScale = undefined

xValueToSendCorobot = 90
yValueToSendCorobot = -70

rotationValueToSendCorobot = 0
scaleValueToSendCorobot = 0

scaleCurrent = undefined
rotationCurrent = undefined
xStart = undefined
xCurrent = undefined
yCurrent = undefined
direction = undefined

document.addEventListener('gesturechange', (event)->
	
		touchScale(event)
		touchRotation(event)
		displayValues()
, false)

document.addEventListener('touchstart', (event)->
	
		touchStart(event)
	
, false)
	
document.addEventListener('touchmove', (event)->
	
		if event.touches.length is 1
				touchLeftAndRight(event)
				touchUpAndDown(event)
				displayValues()
, false)
	
touchStart = (event) ->
	console.log 'STARTED A NEW SWIPE'
	
touchLeftAndRight = (event) ->
		xCurrent = event.touches[0].pageX
		
		if xCurrent < oldLeftAndRight
			if xValueToSendCorobot > 313.5
				xValueToSendCorobot = 315
			else
				xValueToSendCorobot += 2.5
				direction = 'LEFT'
		
		if xCurrent > oldLeftAndRight
			if xValueToSendCorobot < 92.5
				xValueToSendCorobot = 90
			else
				xValueToSendCorobot -= 2.5
				direction = 'RIGHT'
	
		oldLeftAndRight = xCurrent

touchRotation = (event) ->
	rotationCurrent = Math.round(event.rotation*Math.pow(10,2))/Math.pow(10,2);
	
	if rotationCurrent > oldRotation
		if rotationValueToSendCorobot > 87.5
			rotationValueToSendCorobot = 90
		else
			rotationValueToSendCorobot += 2.5
	
	if rotationCurrent < oldRotation
		if rotationValueToSendCorobot < -87.5
			rotationValueToSendCorobot = -90
		else
			rotationValueToSendCorobot -=2.5
			
	oldRotation = rotationCurrent

touchScale = (event) ->
	scaleCurrent = Math.round(event.scale*Math.pow(10,2))/Math.pow(10,2);

	if scaleCurrent > oldScale
		if scaleValueToSendCorobot > 251.5
			scaleValueToSendCorobot = 254
		else
			scaleValueToSendCorobot += 2.5
	
	if scaleCurrent < oldScale
		if scaleValueToSendCorobot < 2.5
			scaleValueToSendCorobot = 0
		else
			scaleValueToSendCorobot -= 2.5
			
	oldScale = scaleCurrent
	
touchUpAndDown = (event) ->
	yCurrent = event.touches[0].pageY;
	
	if yCurrent < oldUpAndDown
		if yValueToSendCorobot > 298.5
			yValueToSendCorobot = 300
		else 
			yValueToSendCorobot += 2.5
			direction = 'UP'
	
	if yCurrent > oldUpAndDown
		if yValueToSendCorobot < -72.5
			yValueToSendCorobot = -75
		else
			yValueToSendCorobot -=2.5
			direction = 'DOWN'
	
	oldUpAndDown = yCurrent
		
displayValues = ->
	
	$('#tempValueDisplayTouches').html	"<br/><h3>" + "Direction: " + direction +
										"</h3><br/>" + "X value: " + xValueToSendCorobot + 
										"<br/>" + "Y Value: " + yValueToSendCorobot + 
										"<br/>" + "Scale: " + scaleValueToSendCorobot + 
										"<br/>" + "Rotation: " + rotationValueToSendCorobot