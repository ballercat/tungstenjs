var ENV = {};
var queryParams = {};
if (window.location.search.length > 0) {
  var qStr = window.location.search.substr(1);
  var qParams = qStr.split('&');
  for (var i = 0; i < qParams.length; i++) {
    var param = qParams[i].split('=');
    if (param.length === 2) {
      queryParams[param[0]] = param[1];
    }
  }
}
ENV.rows = queryParams.rows || 100;
ENV.timeout = queryParams.timeout || 0;
window.timing = false;
window.counter = 0;
function runTimer(seconds) {
  window.timing = true;
  window.counter = 0;
  setTimeout(function() {
    window.timing = false;
    console.log((window.counter / seconds) + ' renders per second');
  }, seconds * 1000);
}