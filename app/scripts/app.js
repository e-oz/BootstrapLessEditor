'use strict';

angular.module('CSSEditorApp', ['ngRoute'])
  .config(function($locationProvider) {
            $locationProvider.html5Mode(true);
          })
;
