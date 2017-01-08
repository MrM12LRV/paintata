angular.module('application', ["ng-fusioncharts"])
.controller('controller',
function($scope, $http) {

    // Assigns default value if input is empty string:
    function assignDefault(input, default_val) {
        return (input == "" || input == null) ? default_val : input
    }

    $scope.init = function() {
        $scope.data = null;

        // Fusionchart properties
        $scope.myDataSource = { chart: {
            caption: "", subCaption: "",
            numberPrefix: "", theme: "ocean" }, data:[] };

        // Get parameters from URL:
            $scope.limit = getParam('limit');
            $scope.offset = getParam('offset');
            $scope.order = getParam('order');
            $scope.reverse = getParam('reverse');
            $scope.ward = getParam('ward');
            $scope.sect = getParam('sect');
            $scope.councildistrict = getParam('councildistrict');
            $scope.search = getParam('search');
            $scope.idlookup = getParam('idlookup');
            $scope.chartwidth = getParam('chartwidth');
            $scope.chartheight = getParam('chartheight');
            $scope.charttype = getParam('charttype');
            $scope.chartlabel = getParam('chartlabel');
            $scope.chartvalue = getParam('chartvalue');


        // If any parameters from URL are empty, fill with default values:
            // Default parameters into SoQL query:
            $scope.limit = assignDefault($scope.limit, 100);
            $scope.offset = assignDefault($scope.offset, 0);
            $scope.order = assignDefault($scope.order, "citytax");
            $scope.reverse = assignDefault($scope.reverse, "DESC");

            // Lookup and search parameters into query:
            $scope.search = assignDefault($scope.search, "");
            $scope.idlookup = assignDefault($scope.idlookup, "");

            // Filter parameters into query:
            $scope.block = assignDefault($scope.block, "");
            $scope.lot = assignDefault($scope.lot, "");
            $scope.ward = assignDefault($scope.ward, "");
            $scope.sect = assignDefault($scope.sect, "");
            $scope.councildistrict = assignDefault($scope.councildistrict, "");

            // Fusionchart width and height:
            $scope.chartwidth = assignDefault($scope.chartwidth, 1200);
            $scope.chartheight = assignDefault($scope.chartheight, 600);
            $scope.charttype = assignDefault($scope.charttype, "column2d");
            $scope.chartlabel = assignDefault($scope.chartlabel, "propertyaddress");
            $scope.chartvalue = assignDefault($scope.chartvalue, "citytax");
    }

    // Assigns labels and values to objects on chart (called on SoQL query
    //     requests and option modifications to dynamically alter chart):
    $scope.relabelTaxData = function() {
        $scope.myDataSource.chart.numberPrefix =
                        ($scope.chartvalue=="lotsize") ? "" : "$";
        // Label chart title and set chart properties:
        switch ($scope.chartvalue) {
            case "citytax":
                $scope.myDataSource.chart.caption = "Baltimore City Tax Data";
                break;
            case "statetax":
                $scope.myDataSource.chart.caption = "Baltimore State Tax Data";
                break;
            case "amountdue":
                $scope.myDataSource.chart.caption = "Baltimore Amount Due Data";
                break;
            case "lotsize":
                $scope.myDataSource.chart.caption = "Baltimore Lot Size Data";
                break;
        }

        var chartdata = [];
        var to_label;
        var to_value;
        // Assign labels to chart records to display:
        for (var i in $scope.data) {
            record = $scope.data[i];
            switch ($scope.chartlabel) {
                case "propertyaddress":
                    to_label = record.propertyaddress; break;
                case "propertyid":
                    to_label = record.propertyid; break;
                default:
                    to_label = record.propertyaddress; break;
            }
            switch ($scope.chartvalue) {
                case "citytax":  to_value = record.citytax; break;
                case "statetax": to_value = record.statetax; break;
                case "amountdue":  to_value = record.amountdue; break;
                case "lotsize":  to_value = record.lotsize; break;
                default: to_value = record.citytax; break;
            }

            if (to_value != null)
                chartdata.push({ label: to_label, value: to_value });
        }

        // Assign the relabeled data to the chart's data source:
        $scope.myDataSource.data = chartdata;
    }

    // Reordering data requires another GET request (SoQL query):
    $scope.reorderTaxData = function() {
        $scope.getTaxData();
        $scope.relabelTaxData();
    }

    // Build where clause for SoQL query so that only items
    //     with column we are ordering by are displayed:
    function buildWhereClause() {
        var where_clause;
        where_clause = $scope.order + " IS NOT NULL ";

        // Add lookups to where clause
        //     (Extra space after idlookup is necessary due to
        //      how property id is stored in database):
        if ($scope.idlookup != "")
            where_clause += "AND propertyid='" + $scope.idlookup +" ' ";

        // Add filters to where clause:
        if ($scope.block != "")
            where_clause += "AND block='" + $scope.block + "' ";
        if ($scope.lot != "")
            where_clause += "AND lot='" + $scope.lot + "' ";
        if ($scope.ward != "")
            where_clause += "AND ward='" + $scope.ward + "' ";
        if ($scope.sect != "")
            where_clause += "AND sect='" + $scope.sect + "' ";
        if ($scope.councildistrict != "")
            where_clause += "AND councildistrict='" +
                $scope.councildistrict + "' ";

        return where_clause;
    }

    $scope.getTaxData = function() {
        // Order data based on the value being displayed currently:
        $scope.order = $scope.chartvalue;
        // Display subcaption based on ascending or descending order:
        if ($scope.reverse == "DESC")
            $scope.myDataSource.chart.subCaption =
                "Ordered from highest to lowest";
        else
            $scope.myDataSource.chart.subCaption =
                "Ordered from lowest to highest";

        var where_clause = buildWhereClause();

        // Get API endpoint data in JSON format via http with params:
        $http.get(
            "https://data.baltimorecity.gov/resource/6act-qzuy.json?" +
            "$$app_token=e84J9MwiPjWzzSDSHDTz9po1x" +  // 'unlimited' requests
            "&$limit="  + $scope.limit +       // number of records to display
            "&$offset=" + $scope.offset +                  // offset into data
            "&$order=" + $scope.order + " " + $scope.reverse +      // sorting
            "&$where=" + where_clause +                           // filtering
            "&$q=" + $scope.search)                               // searching
        .then(function(response) {
            $scope.data = response.data;
            $scope.relabelTaxData();
        });

    }

    // Assigns labels and values to objects on chart (called on SoQL query
    //     requests and option modifications to dynamically alter chart):
    $scope.relabelSpendingData = function() {
        $scope.myDataSource.chart.numberPrefix = "$";
        $scope.myDataSource.chart.caption = "Baltimore Contract Spending Data";
        $scope.myDataSource.chart.subCaption = "By Agency";

        // Assign labels to chart records to display:
        var chartdata = [];
        for (var i in $scope.data) {
            record = $scope.data[i];
            chartdata.push({ label: record.agency,
                             value: record.sum_totalcontractamt });
        }

        // Assign the relabeled data to the chart's data source:
        $scope.myDataSource.data = chartdata;
    }

    $scope.getSpendingData = function() {
        // Get API endpoint data in JSON format via http with params:
        $http.get(
            "https://data.baltimorecity.gov/resource/8yd7-f3df.json?" +
            "$$app_token=e84J9MwiPjWzzSDSHDTz9po1x" // 'unlimited' requests
            )
        .then(function(response) {
            $scope.data = response.data;
            $scope.relabelSpendingData();
        });

    }

});

// from http://stackoverflow.com/questions/
//     9718634/how-to-get-the-parameter-value-from-the-url-in-javascript
function getParam(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}