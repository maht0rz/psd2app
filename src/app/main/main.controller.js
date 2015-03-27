'use strict';

angular.module('psd')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.previewData = {};
    $scope.previewMeta = {};


    $http.get('assets/test.json')
      .success(function(data){
        $scope.previewData = data;
      })
      .error(function(){
        console.log('error');
      });

    $http.get('assets/test.meta.json')
      .success(function(data){
        $scope.previewMeta = data;
      })
      .error(function(){
        console.log('error');
      });

    $scope.generatePreviewToOriginalRatio = function(){
      var width = $('#psd-preview')[0].width
      $scope.previewMeta.ratio = $scope.previewMeta.width / width;
      $scope.previewMeta.edge = ($(document).width() - width) / 2;
    }

    setTimeout(function(){
      $scope.generatePreviewToOriginalRatio();
    },300);

    $scope.results = []

    var search = function(tree, x, y){
      if(tree.children){
        if(tree.left <= x && tree.right >= x){
          if(tree.top <= y && tree.bottom >= y){
            tree.children.forEach(function(subtree){
              if(!subtree.parent) subtree.parent = ''
              if(!subtree.depth) subtree.depth = 0
              subtree.parent = tree
              subtree.depth++
              search(subtree,x,y);
            });
          }
        }
      }else{
        if(tree.left <= x && x <= tree.right){
          if(tree.top <= y && tree.bottom >= y){
            if(!tree.depth) tree.depth = 0
            $scope.results.push(tree);
           // console.log('parent', tree.parent);
          }
        }
      }
    }

    var lookForMatch = function(x,y){
      $scope.results = [];
      var tree = $scope.previewData;
      tree.children.forEach(function(subtree){
        search(subtree, x, y);
      });
    }

    var CSStoObj = function(cssString){
      var pairs = cssString.split(';');
      var result = {};
      pairs.forEach(function(pair){
        var values = pair.split(':');
        if(values[0].length > 0){
          result[values[0].trim()] = values[1];
        }
      })
      return result;
    }

    $scope.findMatchingElement = function($event){
      var ratio = $scope.previewMeta.ratio;
      var x = ($event.clientX - $scope.previewMeta.edge) * ratio;
      var y = $event.clientY * ratio;
      console.log('Current: ',x,y);
      lookForMatch(x,y);
      var result = $scope.results[0];
      // console.log(result);
      // console.log({
      //   text: {
      //     value: result.text.value,
      //     css: CSStoObj(result.text.font.css)
      //   }
      // });
      //
      console.log(result.text.value);
    }

  });
