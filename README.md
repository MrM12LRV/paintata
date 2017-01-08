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