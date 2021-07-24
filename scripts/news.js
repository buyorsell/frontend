async function loadNewsList(page) {

	response = await fetch('https://buyorsell.ml/api/db/news?page=' + page);

	result = await response.json();
	
	result.forEach(function(ticker) {

			template_lg = _.template(document.getElementById('template-news').innerHTML);	
			
			options = {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				timezone: 'UTC'
			};

			ticker.datetime = new Date(ticker.datetime).toLocaleString("ru", options)

			sec = template_lg(ticker);

			document.getElementById('feed').innerHTML += sec;
		}
	);
}

onload = function() {
	
	page = 0

	loadNewsList(page);
}

onscroll = function() {

    var scrollHeight = Math.min(

        document.body.scrollHeight, document.documentElement.scrollHeight,

        document.body.offsetHeight, document.documentElement.offsetHeight,

        document.body.clientHeight, document.documentElement.clientHeight

    );

    if(window.scrollY >= scrollHeight - innerHeight) {

    	page ++;

    	loadNewsList(page);
    }; 

}
