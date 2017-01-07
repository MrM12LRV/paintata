angular.module('application', ["ng-fusioncharts"])
.controller('controller',
function($scope, $http) {

        $scope.myDataSource = {
                chart: {
                    caption: "Harry's SuperMart",
                    subCaption: "Top 5 stores in last month by revenue",
                    numberPrefix: "$",
                    theme: "ocean"
                },
                data:[{
                    label: "Bakersfield Central",
                    value: "880000"
                },
                {
                    label: "Garden Groove harbour",
                    value: "730000"
                },
                {
                    label: "Los Angeles Topanga",
                    value: "590000"
                },
                {
                    label: "Compton-Rancho Dom",
                    value: "520000"
                },
                {
                    label: "Daly City Serramonte",
                    value: "330000"
                }]
            };
            
    $scope.init = function() {
        $scope.limit = 10;
        $scope.offset = 0;
        $scope.data= null;
    }

    $scope.getData = function() {
        // get API endpoint data in JSON format via http with params:
        //   limit: number of items to show AND
        //   offset: starting point at which to display items
        $http.get(
            "https://data.baltimorecity.gov/resource/6act-qzuy.json" +
            "?$limit="  + $scope.limit +
            "&$offset=" + $scope.offset)
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