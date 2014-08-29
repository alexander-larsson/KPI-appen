'use strict';

/* Services */

angular.module('kpi.services', ['ngResource']).
value('version', '0.1').
factory('ScbKpi', ['$resource', function($resource) {
    return $resource('http://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A/KPILevindexAr', {}, {
        getYears: {method:'GET', isArray:false},
        //Setting the Content-Type to text/plain is needed to avoid preflight OPTIONS request
        requestKPIValues: {method:'POST', headers:{'Content-Type':'text/plain'}}
    });
}]).
factory('HistoryItem', function() {

    return function(fromYear, toYear, fromAmount, toAmount) {
        this.fromYear = fromYear;
        this.toYear = toYear;
        this.fromAmount = fromAmount;
        this.toAmount = toAmount;
    };
});
