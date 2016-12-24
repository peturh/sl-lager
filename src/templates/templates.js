angular.module('templates-main', ['parts/login.html', 'parts/main.html']);

angular.module("parts/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("parts/login.html",
    "");
}]);

angular.module("parts/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("parts/main.html",
    "<div class=\"panel text-center big-box\"><img class=\"img-responsive inline\" src=img/mobill.png><h2>Sök på registreringsnummer</h2></div><div class=\"input-group search-group\"><input class=\"form-control search\" placeholder=Registreringsnummer ng-model=searchQuery on-enter=searchForRegNbr()> <span class=input-group-btn><button class=\"btn btn-default search\" ng-click=searchForRegNbr() type=button><img class=search src=img/search.png></button></span></div><div class=table-responsive ng-show=searched><table class=\"table table-striped table-bordered\"><tr><th>Reg Nr</th><th>Start</th><th>Stop</th><th>Zon</th></tr><tr ng-repeat=\"parking in parkings\"><td>{{parking.registrationNumber}}</td><td>{{getDate(parking.validFrom)}}</td><td>{{getDate(parking.validUntil)}}</td><td>{{parking.zones}}</td><td><span ng-show=\"{{parking.valid == true}}\" class=\"label label-success\">Giltig</span> <span ng-show=\"{{parking.valid == false}}\" class=\"label label-danger\">Ej Giltig</span></td></tr></table></div>");
}]);
