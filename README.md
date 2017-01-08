# paintata
AngularJS / HTML project to display the art and mural data of Baltimore.


###################
### Running
###################
To run the project type:
    `./run.sh`
    (You may have to give permissions to run this file: `chmod +x run.sh`)
    -OR-
    `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome index.html`

To run the test suite type:
    `./test_suite.sh`
    (You may have to give permisions: `chmod +x test_suite.sh`)
    (Note: this opens up a bunch of web pages)

###################
### Usage
###################

Fill out "Chart width", "Chart height", "Chart type", "Chart label",
    and "Chart value" to dynamically change the chart that displays the
    Tax Data.  ("Chart value" will change how the data is ordered.
    For example, if "Chart value" is "City Tax", then the data will
    be ordered by "City Tax").

Fill out the number of records to be displayed in the table (and
    consequently the number of records in the chart) via "Limit".
    "Offset" is the offset into the retrieved data (for example,
    if "Offset" is 1, then we will not display the otherwise first
    entry, and we would display one entry more at the end).

Check "Reverse" or not.  This determines whether the data is
    ordered ascending or descending.  Note that this is
    reflected in the chart's subcaption.

Possibly lookup a single record by either its property address
    or its property ID via "Addr lookup" or "ID lookup".
    Some examples to try are:
    TODO: example for "Addr lookup"
    TODO: example for "ID lookup"
    These have to be exact.

Enter in filters for "Ward", "Sect", and/or "Coun Distr" (Council District).
    One can see examples of possible wards, sectors, and council districts
    by looking at the table below the chart.

Press "Fetch Tax Data" to submit a request to retrieve the data.
    Note that this button only has to be pressed when altering
    "Limit", "Offset", "Reverse", "Ward", "Sect", or "Coun Distr".
    Editing anything else will automatically update the graph.

Alternative to all the above steps: press "Fetch Spending Data" to
    retrieve data corresponding to Baltimore Contract Spending Data by Agency.
    This data retrieval and display is not dependent on any of the inputs mentioned
    above.

###################
### Libraries
###################
    AngularJS framework
    Fusion Charts:
        http://www.fusioncharts.com/
    Angular Charts:
        http://www.fusioncharts.com/angularjs-charts/
    Bootstrap
    jQuery (for Bootstrap)


###################
### Notes
###################

I use SoQL queries to retrive the Baltimore data.  That is, queries like so:
https://data.baltimorecity.gov/resource/6act-qzuy.json?
            $$app_token=e84J9MwiPjWzzSDSHDTz9po1x
            &$limit=100
            &$offset=0
            &$order=citytax
            ...

It is possible to order differently from that of chartvalue by changing
    the url parameters.

propertyaddress lookup and propertyid lookup must match exactly.
    TODO: make this not the case.

The ordering is based on the "chartvalue" variable in the ng model.  This also
    determines what values are displayed along the y-axis.


###################
### Files
###################

Files included in project:

    index.html
        The single webpage of this project.
        
    manage_data.js
        My javascript to manage (filter, retrieve, order) the incoming data
        from the Baltimore page.

    style.css
        Page for the style of my webpage.


###################
### Bugs
###################
When displaying lotsize, some lots have odd formats that are not
parsed correctly by the default SoQL sorter.
i.e. lot sizes such as "X134", "REAR PART 697 S.F", and "O-98 ACRES"
will not be correctly interpreted.

Sorting by Block and Lot does not have correct parsing either.