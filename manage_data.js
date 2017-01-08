angular.module('application', ["ng-fusioncharts"])
.controller('controller',
function($scope, $http) {

    // Fusionchart properties
    $scope.myDataSource = {
            chart: {
                caption: "",
                subCaption: "",
                numberPrefix: "",
                theme: "ocean"
            },
            data:[]
        };

    $scope.init = function() {
        $scope.data = null;

        // Default parameters into SoQL query
        $scope.limit = 100;
        $scope.offset = 0;
        $scope.order = "citytax";
        $scope.where = "";
        $scope.reverse = "DESC";

        // Fusionchart width and height
        $scope.chartwidth = 1200;
        $scope.chartheight = 400;
        $scope.charttype = "column2d";
        $scope.chartlabel = "propertyaddress";
        $scope.chartvalue = "citytax";
    }

    // Assigns labels and values to objects on chart (called on SoQL query
    //     requests and option modifications to dynamically alter chart):
    $scope.relabel = function() {
        var caption;
        var subCaption;
        var numberPrefix;
        // Label chart title and set chart properties:
        switch ($scope.chartvalue) {
            case "citytax":
                $scope.myDataSource.chart.caption = "Baltimore City Tax Data"
                $scope.myDataSource.chart.subCaption = "TODO"
                $scope.myDataSource.chart.numberPrefix = "$"
                break;
            case "statetax":
                $scope.myDataSource.chart.caption = "Baltimore State Tax Data"
                $scope.myDataSource.chart.subCaption = "TODO"
                $scope.myDataSource.chart.numberPrefix = "$"
                break;
            case "amountdue":
                $scope.myDataSource.chart.caption = "Baltimore Amount Due Data"
                $scope.myDataSource.chart.subCaption = "TODO"
                $scope.myDataSource.chart.numberPrefix = "$"
                break;
            case "lotsize":
                $scope.myDataSource.chart.caption = "Baltimore Lot Size Data"
                $scope.myDataSource.chart.subCaption = "TODO"
                $scope.myDataSource.chart.numberPrefix = ""
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
    $scope.reorder = function() {
        $scope.getData();
        $scope.relabel();
    }

    $scope.getData = function() {
        // Order data based on the value being displayed currently:
        $scope.order = $scope.chartvalue;

        // Build where clause for SoQL query based on whether or not
        //     there is an order and/or a preexisting where
        //     to the request:
        var where_clause;
        if ($scope.order != null && $scope.order != "") {
            where_clause = $scope.order + " IS NOT NULL ";
            if ($scope.where != null & $scope.where != "")
                where_clause += " AND " + $scope.where;
        }
        else
            where_clause = $scope.where;

        // Get API endpoint data in JSON format via http with params:
        $http.get(
            "https://data.baltimorecity.gov/resource/6act-qzuy.json?" +
            "$$app_token=e84J9MwiPjWzzSDSHDTz9po1x" +  // 'unlimited' requests
            "&$limit="  + $scope.limit +       // number of records to display
            "&$offset=" + $scope.offset +                  // offset into data
            "&$order=" + $scope.order + " " + $scope.reverse +      // sorting
            "&$where=" + where_clause)                            // filtering
        .then(function(response) {
            $scope.data = response.data;
            $scope.relabel();
        });

    }

});