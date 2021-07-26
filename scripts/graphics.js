async function loadEmbsList(id) {

	response = await fetch('https://buyorsell.ml/api/db/stock');

	result = await response.json();

	document.getElementById('embs').innerHTML = ""

	result.forEach(function(item) {

			template_lg = _.template(document.getElementById('template-list').innerHTML);	
			
			item.cls = "emb";
			item.id = item.sec_id;
			item.name = item.shortname;

			item.color = item.id == id ? "#05A9FF" : "#212529"

			document.getElementById('embs').innerHTML += template_lg(item);
		}
	);

}

async function loadTopicsList(id) {

	response = await fetch('https://buyorsell.ml/api/db/topics');

	result = await response.json();

	document.getElementById('topics').innerHTML = ""

	result.forEach(function(item) {

			template_lg = _.template(document.getElementById('template-list').innerHTML);	
			
			item.cls = "topic";

			item.color = item.id == id ? "#05A9FF" : "#212529" 

			document.getElementById('topics').innerHTML += template_lg(item);
		}
	);

}

async function loadEntitiesList(id) {

	response = await fetch('https://buyorsell.ml/api/db/entities');

	result = await response.json();

	document.getElementById('entities').innerHTML = ""

	result.forEach(function(item) {

			template_lg = _.template(document.getElementById('template-list').innerHTML);	
			
			item.cls = "entity";

			item.color = item.id == id ? "#05A9FF" : "#212529"

			document.getElementById('entities').innerHTML += template_lg(item);
		}
	);

}

function onPlotChange(item) {

	if(item.classList.contains('emb')) {

		document.getElementById('emb_plot').src = `https://buyorsell.ml/stock/emb_${item.id}.html`;
		loadEmbsList(item.id);

	} else if(item.classList.contains('topic')) {

		document.getElementById('tf_plot').src = `https://buyorsell.ml/stock/tf_${item.id}.html`;
		document.getElementById('dtm_plot').src = `https://buyorsell.ml/stock/dtm_${item.id}.html`;

		loadTopicsList(item.id);

	} else if(item.classList.contains('entity')) {

		document.getElementById('ner_plot').src = `https://buyorsell.ml/stock/ner_${item.id}.html`;

		loadEntitiesList(item.id);

	}

}

onload = function() {

	loadEmbsList("SBER");
	loadTopicsList(1);
	loadEntitiesList(1);

}