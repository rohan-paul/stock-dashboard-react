#### To launch the project, just run `npm install` and then `npm start`

<img src="./Peek 2019-05-05 22-31.gif">

### [Live Demo](https://stock-analytics-dashboard.netlify.com/)

A stock-analytics dashboard with React, Highcharts, @vx (charting lib) and usinng finnancial analytics API data from - [www.worldtradingdata.com](www.worldtradingdata.com), api.iextrading.com and financialmodelingprep.com

#### Some notes on using [www.quandl.com/api](www.quandl.com/api) - I ultimately did not use Quandl as its free API gives old data

#### The main disadvantage, of Quandl Free API is that most stocks the "newest_available_date" is "2018-03-27"

[https://github.com/quantopian/zipline/issues/2145](https://github.com/quantopian/zipline/issues/2145)

[https://github.com/quantopian/zipline/issues/22](https://github.com/quantopian/zipline/issues/22)

```
this is expected behavior as Quandl stopped updating their WIKI pricing dataset,
```

1> The main official doc is at -

[https://docs.quandl.com/docs/in-depth-usage](https://docs.quandl.com/docs/in-depth-usage)

– Under API > TIME-SERIES > USAGE

2> Lets say, from the big-full-fledged data, which has the following parameters for ‘column_names”

"column_names": ["Date", "Open", "High", "Low", "Close", "Volume", "Ex-Dividend", "Split Ratio", "Adj. Open", "Adj. High", "Adj. Low", "Adj. Close", "Adj. Volume"],

I only want the field for ‘Close’

The above page ( [https://docs.quandl.com/docs/in-depth-usage](https://docs.quandl.com/docs/in-depth-usage)) says -
“You can slice, transform and otherwise customize your time-series dataset prior to download by appending various optional parameters to your query.”

And now when I click on the hyperlink - ‘parameters’ it takes me to -

[https://docs.quandl.com/docs/parameters-2](https://docs.quandl.com/docs/parameters-2)

Here, I have

column_index - Request a specific column. Column 0 is the date column and is always returned. Data begins at column 1.

This column_index is the parameter that I have to fileter by for filitering ‘column_names’ array in the response data.

So my final query becomes -

[https://www.quandl.com/api/v3/datasets/WIKI/FB.json?&column_index=4&api_key=xVgPxg_akYvyDdHhqEox](https://www.quandl.com/api/v3/datasets/WIKI/FB.json?&column_index=4&api_key=Your-API-KEY)

And I get a ‘data’ field in the response as below

"data": [
["2018-03-27", 152.19],
["2018-03-26", 160.06],
...
...
]
