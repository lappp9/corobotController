watchID = undefined
x = undefined
y = undefined

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
  
  $("#tempValueDisplayAccelerometer").html "<br/>" + "Tracking Accelerometer: " + 
											"<br/>" + "<br/>" + 
											"<br/>" + "Translation value: " + x + 
											"<br/>" + "Rotation value: " + y
onError = ->
  alert "onError!"