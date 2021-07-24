async function loadSecList() {

	response = await fetch('https://buyorsell.ml/api/db/stock');

	result = await response.json();
	
	result.forEach(function(ticker) {

			template_lg = _.template(document.getElementById('template-sec').innerHTML);	
			
			ticker.bos = (ticker.bos * 100).toFixed(1)

			sec = template_lg(ticker);

			document.getElementById('sec').innerHTML += sec;
		}
	);
}

function openSecRate(secid) {
	
	document.location = "analitics.html?secid=" + secid;
}

onload = function() {

	loadSecList();
}