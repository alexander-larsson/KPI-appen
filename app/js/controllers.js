/*jshint browser: true*/
/*global alert*/
'use strict';

/* Controllers */

angular.module('kpi.controllers', [])
.controller('kpiController', ['$scope', '$http', 'HistoryItem', 'ScbKpi', function($scope, $http, HistoryItem, ScbKpi) {

    $scope.history = [];
    $scope.showInfoState = false;
    //Test below
    $scope.history.push(new HistoryItem(1992,1012,100,150));

    ScbKpi.getYears(function(data){
        $scope.years = data.variables[1].values;
        $scope.toYear = $scope.years[$scope.years.length-1];
        $scope.fromYear = $scope.years[$scope.years.length-1];
    });

    $scope.calculate = function() {

        if($scope.toYear === $scope.fromYear) {
            $scope.showInfoState = true;
        }else{
            alert(JSON.stringify($scope.history[0]));
        }


    };

    $scope.showInfo = function() {
        return $scope.showInfoState;
    };
    
    $scope.hideInfo = function() {
        $scope.showInfoState = false;
    };
}]);
