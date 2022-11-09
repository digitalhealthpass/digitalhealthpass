

function getProductName() {
	try{
		var nameEQ = "ozProductName=";
		var ca = document.cookie.split(';');
		var retName;
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) {
				retName= c.substring(nameEQ.length,c.length);
				if (retName != null && retName.length > 0)
					return retName;
			}
		}
	}
	catch(err){}
	return "Ad Hoc Report Writer";
}

