angular.module('application', ["ng-fusioncharts"])
.controller('controller',
function($scope, $http) {

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

        // Fusionchart width and height
        $scope.chartwidth = 600;
        $scope.chartheight = 400;
    }

    $scope.getData = function() {
        // get API endpoint data in JSON format via http with params:
        //   limit: number of items to show AND
        //   offset: starting point at which to display items
        $http.get(
            "https://data.baltimorecity.gov/resource/6act-qzuy.json?" +
            "$$app_token=e84J9MwiPjWzzSDSHDTz9po1x" +
            "&$limit="  + $scope.limit +
            "&$offset=" + $scope.offset +
            "&$order=" + $scope.order)
        .then(function(response) {
            /*
            for (x in response.data) {
                console.log("before" + typeof x.citytax)
                x.citytax = parseFloat(x.citytax)
                console.log("after" + typeof x.citytax)
                console.log("~~~~~")
            }
            */
    
            $scope.data = response.data;

            chartdata = []
            for (var x in response.data) {
                if (response.data[x].citytax != null) {
                    chartdata.push(
                        {
                            label: response.data[x].propertyaddress,
                            value: response.data[x].citytax
                        }
                    );
                }
            }
            $scope.myDataSource.data = chartdata
        });

        /*
        console.log("scope.data" + $scope.data);
        var i = 0;
        for (x in $scope.data) {
            console.log(i);
            console.log(x.constructor.name);
            console.log(x.name);
            console.log("~~~");

            i++;
        } */
    }

});