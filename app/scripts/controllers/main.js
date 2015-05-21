'use strict';

angular.module('CSSEditorApp')
  .controller(
  'MainCtrl', ['$scope', '$http', '$q', '$timeout', function ($scope, $http, $q, $timeout) {
    $scope.data = {less_variables: '', less_theme: '', css: ''};
    $scope.ctrl = {auto: false};
    $scope.less_cache = '';

    $scope.transform = function () {
      var parser = new less.Parser({
        paths: ['./styles/tbs/less/']
      });
      var source_less = '';
      $scope.prefetch(function (cache) {
        if (cache) {
          source_less = cache;
        }
        parser.parse(source_less + $scope.data.less_variables + $scope.data.less_theme, function (error, root) {
          if (error) {
            console.log(error);
            return false;
          }
          $('#html').find('style').remove();
          if ($scope.data.css = root.toCSS()) {
            $("<style scoped>" + $scope.data.css + "</style>").appendTo("#html");
          }
          return true;
        });
      });
    };

    $scope.$watch('data.less_variables', function (newV) {
      if (angular.isUndefined(newV)) {
        return true;
      }
      if (!$scope.ctrl.auto) {
        return false;
      }
      $timeout(function () {
        if (newV === $scope.data.less_variables) {
          $scope.transform();
        }
      }, 400);
      return true;
    });

    $scope.$watch('data.less_theme', function (newV) {
      if (angular.isUndefined(newV)) {
        return true;
      }
      if (!$scope.ctrl.auto) {
        return false;
      }
      $timeout(function () {
        if (newV === $scope.data.less_theme) {
          $scope.transform();
        }
      }, 400);
      return true;
    });

    $scope.pasteVariables = function () {
      $http.get('./styles/tbs/less/variables.less').
        success(function (response) {
          $scope.data.less_variables += "\n" + response + "\n";
        });
    };

    $scope.prefetch = function (callback) {
      if ($scope.less_cache != '') {
        if (callback) {
          callback($scope.less_cache);
        }
        return false;
      }
      var less_files = [];
      // Core variables and mixins
      less_files.push("variables.less");
      less_files.push("mixins.less");

      // Reset
      less_files.push("normalize.less");
      less_files.push("print.less");

      // Core CSS
      less_files.push("scaffolding.less");
      less_files.push("type.less");
      less_files.push("code.less");
      less_files.push("grid.less");
      less_files.push("tables.less");
      less_files.push("forms.less");
      less_files.push("buttons.less");

      // Components
      less_files.push("component-animations.less");
      less_files.push("glyphicons.less");
      less_files.push("dropdowns.less");
      less_files.push("button-groups.less");
      less_files.push("input-groups.less");
      less_files.push("navs.less");
      less_files.push("navbar.less");
      less_files.push("breadcrumbs.less");
      less_files.push("pagination.less");
      less_files.push("pager.less");
      less_files.push("labels.less");
      less_files.push("badges.less");
      less_files.push("jumbotron.less");
      less_files.push("thumbnails.less");
      less_files.push("alerts.less");
      less_files.push("progress-bars.less");
      less_files.push("media.less");
      less_files.push("list-group.less");
      less_files.push("panels.less");
      less_files.push("wells.less");
      less_files.push("close.less");

      // Components w/ JavaScript
      less_files.push("modals.less");
      less_files.push("tooltip.less");
      less_files.push("popovers.less");
      less_files.push("carousel.less");

      // Utility classes
      less_files.push("utilities.less");
      less_files.push("responsive-utilities.less");

      $scope.less_cache = '';
      var requests = [];

      for (var i = 0; i < less_files.length; ++i) {
        requests.push($http.get('./styles/tbs/less/' + less_files[i]));
      }
      $q.all(requests).then(function (values) {
        for (var i = 0; i < values.length; ++i) {
          $scope.less_cache += values[i].data + "\n";
        }
        if (callback) {
          callback($scope.less_cache);
        }
      });
      return true;
    }
  }]);
