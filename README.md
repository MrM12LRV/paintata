# paintata
AngularJS / HTML project to display the art and mural data of Baltimore.

To run the project type:
    `./run.sh`
    (You may have to give permissions to run this file: `chmod +x run.sh`)
    -OR-
    `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome index.html`

Libraries used:
    AngularJS framework
    Fusion Charts:
        http://www.fusioncharts.com/
    Angular Charts:
        http://www.fusioncharts.com/angularjs-charts/


I use SoQL queries to retrive the Baltimore data.  That is, queries like so:
https://data.baltimorecity.gov/resource/6act-qzuy.json?
            $$app_token=e84J9MwiPjWzzSDSHDTz9po1x
            &$limit=100
            &$offset=0
            &$order=citytax
            ...

Files included in project:

    index.html
        The single webpage of this project.
        
    manage_data.js
        My javascript to manage (filter, retrieve, order) the incoming data
        from the Baltimore page.

    style.css
        Page for the style of my webpage.


Bugs:
    When displaying lotsize, some lots have odd formats that are not
    parsed correctly by the default SoQL sorter.
    i.e. lot sizes such as "X134", "REAR PART 697 S.F", and "O-98 ACRES"
    will not be correctly interpreted.