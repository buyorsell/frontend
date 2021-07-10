# -*- coding: utf-8 -*-

# Run this app with `python app.py` and
# visit http://127.0.0.1:8050/ in your web browser.

import dash
import dash_core_components as dcc
import dash_html_components as html
import plotly.express as px
import pandas as pd
from View_Statistics import fig, max_news_count, min_news_count, mean_news_count

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

# assume you have a "long-form" data frame
# see https://plotly.com/python/px-arguments/ for more options
app.title = "VTB BOSS"
app.layout = html.Div(children=[
    html.H1(children='Покупать или продавать?'),

	html.H2(children='Статистика по базе данных новостей'),

	html.Div(children=[
		html.H6(children='Коммерсант: количество новостей за всё время по неделям'),
		html.P(children=('Максимальное количество новостей за день: ' + str(max_news_count["title"]))),
		html.P(children=(
			'Минимальное количество новостей за день: ' + str(min_news_count["title"]))),
		html.P(children=(
			'Среднее количество новостей за день: ' + str(int(mean_news_count["title"])))),
		dcc.Graph(
			id='graph',
			figure=fig
		),
	])
])

if __name__ == '__main__':
    app.run_server(debug=False)
