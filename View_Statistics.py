import pandas as pd
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    ARRAY,
    DateTime,
    REAL,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



Base = declarative_base()


class Meduza(Base):
    __tablename__ = 'meduza'
    id = Column(Integer, primary_key=True)
    datetime = Column(DateTime)
    source = Column(String)
    link = Column(String, unique=True)
    title = Column(String)
    text = Column(String)
    locs = Column(ARRAY(String))
    pers = Column(ARRAY(String))
    orgs = Column(ARRAY(String))


class Kommersant(Base):
    __tablename__ = 'commersant'
    id = Column(Integer, primary_key=True)
    datetime = Column(DateTime)
    rubric = Column(ARRAY(String))
    link = Column(String, unique=True)
    title = Column(String)
    text = Column(String)
    locs = Column(ARRAY(String))
    pers = Column(ARRAY(String))
    orgs = Column(ARRAY(String))
    x = Column(REAL)
    y = Column(REAL)
    highlights = Column(String)

Base.metadata.bind = engine
#Base.metadata.create_all(engine)

DBSession = sessionmaker(bind=engine)
session = DBSession()

dataset = pd.read_sql(session.query(Kommersant).statement,session.bind) 
dataset["date"] = dataset['datetime'].apply(lambda x: x.date())
dataset = dataset.sort_values(by=['datetime'], ascending=False)

import plotly.express as px
import plotly.graph_objects as go
import datetime
import random as rd
import math

max1=datetime.date(1000, 1, 1)
min1=datetime.date(3000, 1, 1)
for i in dataset['date']:
    max1=max(max1,i)
    min1=min(min1,i)
d1 = min1
d2 = max1
days = [d1 + datetime.timedelta(days=x) for x in range((d2-d1).days + 1)]
make={}
all=0
for i in days:
    make[i]=0
    all+=1
for i in dataset['date']:
    make[i]+=1
    
give=[]
count=0
sum=0
for key, value in make.items():
  if count!=10:
    sum+=value
    give.append(0)
    count+=1
  else:
    give.append(sum)
    sum=0
    count=0
from bokeh.palettes import Viridis256
color=[]
for i in Viridis256:
    color.append(i)
Viridis256[:all]
color2=[]
for i in range(len(give)):
  if give[i]==0:
    color2.append('white')
  else:
    color2.append(give[i])
fig=go.Figure(go.Scatter(x=days,y=give,mode='markers',marker=dict(size=give,color=color2),text=days))
fig.update_traces(hoverinfo="text,y")
fig.show()
