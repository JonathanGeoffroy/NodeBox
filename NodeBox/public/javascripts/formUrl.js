var inputFile = document.getElementById("inputFile");
var fileForm = document.getElementById('fileForm');

inputFile.onchange = function () {
	console.log('on change');
	var file = inputFile.files;
	if(file) {
		var urlRequest = window.location.protocol + "//" + window.location.host + "/" +
			window.location.pathname + '/' + file[0].name;
		fileForm.setAttribute('action', urlRequest);
	}
};