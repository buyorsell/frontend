async function loadEmbsList() {

	response = await fetch('https://buyorsell.ml/api/db/stock');

	result = await response.json();

	result.forEach(function(item) {

			template_lg = _.template(document.getElementById('template-list').innerHTML);	
			
			item.cls = "emb";
			item.id = item.sec_id;
			item.name = item.shortname;

			document.getElementById('embs').innerHTML += template_lg(item);
		}
	);

}

async function loadTopicsList() {

	response = await fetch('https://buyorsell.ml/api/db/topics');

	result = await response.json();

	result.forEach(function(item) {

			template_lg = _.template(document.getElementById('template-list').innerHTML);	
			
			item.cls = "topic";

			document.getElementById('topics').innerHTML += template_lg(item);
		}
	);

}

async function loadEntitiesList() {

	response = await fetch('https://buyorsell.ml/api/db/entities');

	result = await response.json();

	result.forEach(function(item) {

			template_lg = _.template(document.getElementById('template-list').innerHTML);	
			
			item.cls = "entity";

			document.getElementById('entities').innerHTML += template_lg(item);
		}
	);

}

function onPlotChange(item) {

	if(item.classList.contains('emb')) {

		document.getElementById('emb_plot').src = `https://buyorsell.ml/stock/emb_${item.id}.html`;

	} else if(item.classList.contains('topic')) {

		document.getElementById('tf_plot').src = `https://buyorsell.ml/stock/tf_${item.id}.html`;
		document.getElementById('dtm_plot').src = `https://buyorsell.ml/stock/dtm_${item.id}.html`;

	} else if(item.classList.contains('entity')) {

		document.getElementById('ner_plot').src = `https://buyorsell.ml/stock/ner_${item.id}.html`;

	}

}

onload = function() {

	loadEmbsList();
	loadTopicsList();
	loadEntitiesList();

}