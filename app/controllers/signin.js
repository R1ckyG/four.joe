var createUser = function(e){
  Ti.API.debug(this.responseText);
  var user = JSON.parse(this.responseText);
  Alloy.Models.user = Alloy.createModel('user', user);
  
  var home = Alloy.createController('home');
  home.getView().open();
};


$.submit.addEventListener('click', function(e){
  var xhr = Ti.Network.createHTTPClient({
  		onload: createUser, 
  		onerror: function(e){
  			Ti.API.debug(e.error);
  			alert('you fucked up');
  		},
  		timeout:5000
  }),
  url = 'http://localhost:8000/api/v1/signin';
  xhr.open('POST',url);
  xhr.send({email:$.email.value, password:$.password.value});
});