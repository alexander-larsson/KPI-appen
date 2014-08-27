'use strict';

/* Factorys */


angular.module('kpi.factorys', [])
.factory('HistoryItem', function() {

    return function(fromYear, toYear, fromAmount, toAmount) {
        this.fromYear = fromYear;
        this.toYear = toYear;
        this.fromAmount = fromAmount;
        this.toAmount = toAmount;
    };
    
});