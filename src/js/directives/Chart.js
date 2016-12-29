var app = require('app');
var moment = require('moment');

app.directive('chart', [function () {

    return {
        restrict: 'A',
        template: '<canvas id="chart"></canvas>',
        replace: true,
        scope: {
            history: "@"
        },
        link: function (scope, element, attr) {
            var myLineChart;
            attr.$observe('history', function () {
                if (typeof myLineChart !== 'undefined') {
                    myLineChart.destroy();
                }
                paintGraph();
            });

            var paintGraph = function () {
                var history = JSON.parse(scope.history);

                var dates = [];
                for (var i = 0; i < history.length; i++) {
                    dates.push(moment(history[i].date).format('YYYY-MM-D, hh:mm'));
                }

                var values = [];
                for (var j = 0; j < history.length; j++) {
                    values.push(history[j].quantity);
                }

                var data = {
                    labels: dates,
                    datasets: [
                        {
                            label: "Lagersaldo",
                            fill: true,
                            lineTension: 0,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: values,
                            spanGaps: false
                        }
                    ]
                };
                var ctx = document.getElementById('chart');
                myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                });

            }


        }
    }
}]);