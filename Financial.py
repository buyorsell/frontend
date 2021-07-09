import pandas as pd
import numpy as np
import plotly.graph_objects as go
import random as rd
import string
import plotly.express as px
df = px.data.stocks()
fig=go.Figure()
for i in range(2,len(df.GOOG)):
    if df.GOOG[i]>=df.GOOG[i-1]:
        fig.add_trace(go.Scatter(x=df.date[i-1:i+1], y=df.GOOG[i-1:i+1],mode='lines',
        line_width=2,text=str(round(df.GOOG[i],4)),line_color='blue'))
    else:
        fig.add_trace(go.Scatter(x=df.date[i-1:i+1], y=df.GOOG[i-1:i+1],mode='lines',
        line_width=2,text=str(round(df.GOOG[i-1],4)),line_color='red'))
for trace in fig['data']: 
     trace['showlegend'] = False
fig.update_traces(hoverinfo="x,text")
#fig.show()
