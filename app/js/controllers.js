/*jshint browser: true*/
/*global alert, $*/
'use strict';

/* Controllers */

angular.module('kpi.controllers', [])
.controller('kpiController', ['$scope', '$http', 'HistoryItem', 'ScbKpi', function($scope, $http, HistoryItem, ScbKpi) {

    $scope.history = [];
    $scope.showInfoState = false;

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
            //TODO CHeck if I can move this to the $resource service
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

            ScbKpi.requestKPIValues(request,function(response){
                if (response.data[0].key[0] === $scope.toYear) {
                    toYearKPI = response.data[0].values[0];
                    fromYearKPI = response.data[1].values[0];
                } else {
                    toYearKPI = response.data[1].values[0];
                    fromYearKPI = response.data[0].values[0];
                }
                $scope.history.push(new HistoryItem($scope.fromYear, $scope.toYear, toYearKPI, fromYearKPI));
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
