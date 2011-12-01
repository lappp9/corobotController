var killAcceleration, stopAndGo;
stopAndGo = function() {
  if ($('button').attr('id') === "stop") {
    stopWatch();
    killAcceleration();
    $('button').attr('id', 'go');
    return $('button').html('Go');
  } else if ($('button').attr('id') === "go") {
    startWatch();
    $('button').attr('id', 'stop');
    return $('button').html('Stop');
  }
};
killAcceleration = function() {
  var request;
  request = "<?xml version='1.0'?>" + "<methodCall><methodName>p.set_cmd_vel</methodName>" + "<params><param><value><double>0.0</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><double>0.0</double></value></param>" + "<param><value><int>1</int></value></param>" + "</params></methodCall>";
  return talkToCorobot(request);
};