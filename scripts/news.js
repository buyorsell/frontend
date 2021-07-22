async function loadNewsList(page) {

	response = await fetch('https://buyorsell.ml/api/db/news?page=' + page);

	result = await response.json();
	
	result.forEach(function(ticker) {

			template_lg = _.template(document.getElementById('template-news').innerHTML);	
			
			sec = template_lg(ticker);

			document.getElementById('news').innerHTML += sec;
		}
	);
}

function onBodyLoad() {
	
	loadNewsList(0);
}