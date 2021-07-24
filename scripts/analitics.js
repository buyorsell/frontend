Date.prototype.getWeek = function() {
	
	onejan = new Date(this.getFullYear(), 0, 4);

	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

function declOfNum(number, titles) {  
    
    cases = [2, 0, 1, 1, 1, 2];  
    
    return titles[(number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5]];  
}

async function loadSecsPlot() {

	document.getElementById('plot').src = `https://buyorsell.ml/stock/${secid}.html`;
}

function renderSentBook(data) {

	bos_pos = data.bos_positive
	bos_neg = data.bos_negative

	per_pos = Math.round(bos_pos / (bos_pos + Math.abs(bos_neg)) * 100);

	template = _.template(document.getElementById('template-sent').innerHTML);	
			
	item = template({
		per_pos: per_pos,
		per_neg: 100 - per_pos,
		num_pos: `${data.num_positive} ${declOfNum(data.num_positive, ['новость', 'новости', 'новостей'])}`,
		num_neg: `${data.num_negative} ${declOfNum(data.num_negative, ['новость', 'новости', 'новостей'])}`,
	});

	document.getElementById('sent').innerHTML = item;

	document.getElementById('week').value = `${year}-W${week}`
}

function renderNewsList(data) {

	document.getElementById('news').innerHTML = ''

	data.forEach(async function(news) {
		
		response = await fetch(`https://buyorsell.ml/api/db/news?id=${news[0].id}&secid=${secid}`);

		result = await response.json();
		
		template = _.template(document.getElementById('template-news').innerHTML);

		news[0].bos = (result.bos * 100).toFixed(1)


		options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timezone: 'UTC'
		};

		news[0].datetime = new Date(news[0].datetime).toLocaleString("ru", options)

		document.getElementById('news').innerHTML += template(news[0]);

		}
	);
}

function renderSecsList(data) {

	data.forEach(function(ticker) {

			template = _.template(document.getElementById('template-sec').innerHTML);	
			
			ticker.bos = (ticker.bos * 100).toFixed(1);
			
			item = template(ticker);

			document.getElementById('secs').innerHTML += item;
		}
	);
}

async function loadAnalitics() {

	response = await fetch(`https://buyorsell.ml/api/db/news?secid=${secid}&date=${unix}`);

	result = await response.json();
	
	renderSentBook(result.sent);
	renderNewsList(result.news);
}

async function loadSecsList()
{
	response = await fetch('https://buyorsell.ml/api/db/stock');

	result = await response.json();
	
	renderSecsList(result);
}

function onSecsChange(secid2) {

	date = new Date();
	week = date.getWeek();
	year = date.getFullYear();

	unix = Math.round((new Date().getTime() / 1000) / (60*60*24*7));

	secid = secid2;

	loadSecsPlot();
	loadAnalitics();
}

function onWeekChange(date1) {

	year = date1.split("-W")[0]
	week = date1.split("-W")[1]

	date = new Date(year, 0, 1);
	date.setDate(date.getDate() + (week * 7));
	
	unix = Math.round((date.getTime() / 1000) / (60*60*24*7))

	loadAnalitics();
}

onload = function() {

	secid = window.location.href.split("?")[1].split("=")[1];

	date = new Date();
	week = date.getWeek();
	year = date.getFullYear();

	unix = Math.round((new Date().getTime() / 1000) / (60*60*24*7));

	loadSecsList();
	loadAnalitics();
	loadSecsPlot();

}