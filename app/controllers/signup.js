var url = 'http://localhost:8000/api/v1/get_schools'
var xhr = Ti.Network.createHTTPClient({
		onload: function(e){
			Ti.API.debug(this.responseText );
			alert('success');
		},
		onerror: function(e){
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout:5000
});
xhr.open('GET', url);
xhr.send();
