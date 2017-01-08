angular.module('application', ["ng-fusioncharts"])
.controller('controller',
function($scope, $http) {

    // Fusionchart properties
    $scope.myDataSource = {
            chart: {
                caption: "Baltimore Tax Data",
                subCaption: "TODO: Subcaption",
                numberPrefix: "$",
                theme: "ocean"
            },
            data:[]
        };

    $scope.init = function() {
        $scope.data = null;

        // Default parameters into SoQL query
        $scope.limit = 100;
        $scope.offset = 0;
        $scope.order = "";
        $scope.where = "";
        $scope.reverse = "";

        // Fusionchart width and height
        $scope.chartwidth = 600;
        $scope.chartheight = 400;
        $scope.charttype = "column2d";
        $scope.chartlabel = "propertyaddress";
        $scope.chartvalue = "citytax";
    }

    // Assigns labels and values to objects on chart
    $scope.relabel = function() {
        var chartdata = [];
        var to_label;
        var to_value;
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
                case "lotsize":  to_value = record.lotsize; break;
                default: to_value = record.citytax; break;
            }
            if (to_value != null)
                chartdata.push({ label: to_label, value: to_value });
        }
        $scope.myDataSource.data = chartdata
    }

    $scope.getData = function() {
        // get API endpoint data in JSON format via http with params:
        //   limit: number of items to show AND
        //   offset: starting point at which to display items
        var where_clause;
        if ($scope.order != null && $scope.order != "") {
            where_clause = $scope.order + " IS NOT NULL ";
            if ($scope.where != null & $scope.where != "")
                where_clause += " AND " + $scope.where;
        }
        else
            where_clause = $scope.where;

        $http.get(
            "https://data.baltimorecity.gov/resource/6act-qzuy.json?" +
            "$$app_token=e84J9MwiPjWzzSDSHDTz9po1x" +
            "&$limit="  + $scope.limit +
            "&$offset=" + $scope.offset +
            "&$order=" + $scope.order + " " + $scope.reverse +
            "&$where=" + where_clause)
        .then(function(response) {
            $scope.data = response.data;
            $scope.relabel();
        });

    }

});