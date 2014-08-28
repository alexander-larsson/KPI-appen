/*jshint browser: true*/
/*global alert, $*/
'use strict';

/* Controllers */

angular.module('kpi.controllers', [])
.controller('kpiController', ['$scope', '$http', 'HistoryItem', 'ScbKpi', function($scope, $http, HistoryItem, ScbKpi) {

    $scope.history = [];
    $scope.showInfoState = false;
    //Test below
    $scope.history.push(new HistoryItem(1992,2012,100,150));

    ScbKpi.getYears(function(data){
        $scope.years = data.variables[1].values;
        $scope.toYear = $scope.years[$scope.years.length-1];
        $scope.fromYear = $scope.years[$scope.years.length-1];
    });

    $scope.calculate = function() {
        var toYearKPI,fromYearKPI;

        if($scope.toYear === $scope.fromYear) {
            $scope.showInfoState = true;
        }else{
            var request = {
                query: [
                    {
                        code: "Tid",
                        selection: {
                            filter: "item",
                            values: [$scope.toYear, $scope.fromYear]
                        }
                    }
                ],
                response: {
                    format: "json"
                }};

            $.ajax({
                type: 'POST',
                url: "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A/KPILevindexAr",
                data: JSON.stringify(request),
                dataType: "json",
                success: function (response) {
                    if (response.data[0].key[0] === $scope.toYear) {
                        toYearKPI = response.data[0].values[0];
                        fromYearKPI = response.data[1].values[0];
                    } else {
                        toYearKPI = response.data[1].values[0];
                        fromYearKPI = response.data[0].values[0];
                    }
                    $scope.history.push(new HistoryItem($scope.fromYear, $scope.toYear, 100, 150));
                }
            });
        }


    };

    $scope.showInfo = function() {
        return $scope.showInfoState;
    };

    $scope.hideInfo = function() {
        $scope.showInfoState = false;
    };
}]);
