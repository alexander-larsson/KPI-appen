/*jslint browser: true*/
/*global alert*/
'use strict';

/* Controllers */

angular.module('kpi.controllers', [])
.controller('kpiController', ['$scope', '$http', 'HistoryItem', function($scope, $http, HistoryItem) {

    $scope.history = [];
    $scope.history.push(new HistoryItem(1992,1012,100,150));
    
    //TODO Move to service
    $http.get('http://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A/KPILevindexAr').success(function(data) {
        $scope.years = data.variables[1].values;
        //Initialize the selcect elements to the first value
        $scope.toYear = $scope.years[$scope.years.length-1];
        $scope.fromYear = $scope.years[$scope.years.length-1];
    });

    $scope.calculate = function() {
        alert(JSON.stringify($scope.history[0]));
    };
}]);
