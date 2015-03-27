'use strict';

angular.module('psd', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;

function getProperty(obj, property, list) {
  if (!obj) return list;
  if (obj instanceof Array) {
    for (var i in obj) {
        list = list.concat(getProperty(obj[i], []));
    }
    return list;
  }
  if (obj[property]) list.push(obj);
  if (obj.children) return getProperty(obj.children, list);
  return list;
}
