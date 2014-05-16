angular.module('angular-dimple.line-graph', [])

.directive('lineGraph', [function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '='
    },
    require: ['lineGraph'],
    transclude: true,
    compile: function($element, $attrs) {
      $element.append('<div class="dimple-line-graph" id="line-graph"></div>');
      return {
        post: function postLink($scope, $element, $attrs, $controllers, transclude) {
          var graphController = $controllers[0];
          $scope.$watch('data', function(newValue, oldValue) {
            if (newValue) {
              graphController.setData();
            }
          });
          transclude($scope, function(clone){
            $element.append(clone);
          });
        }
      };
    },
    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
      var chart, x, s;
      var svg = dimple.newSvg('#line-graph', $attrs.width, $attrs.height);
      chart = new dimple.chart(svg);

      this.getChart = function () {
        return chart;
      };

      this.setData = function () {
        chart.data = $scope.data;
        y = chart.addMeasureAxis('y', 'Unit Sales');
      };

      this.draw = function () {
        chart.draw();
      };

    }]
  };
}]);