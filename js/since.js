var app = angular.module('since', []);
app.controller('SinceCtrl', function SinceCtrl($scope, moment, LS) {
  
  $scope.items = LS.getItems(); 
  
  $scope.addItem = function() { 
    $scope.update($scope.pendingText);
    $scope.pendingText = '';
  };

  $scope.update = function (item) {
    $scope.items = LS.addItem(item, {text: item, since: new Date().getTime()});
  };

  $scope.remove = function (item) {
    $scope.items = LS.removeItem(item);
  }
});

app.value('moment', moment);
app.value('localStorage', localStorage);

app.factory('LS', function (localStorage) {
  var itemsKey = 'items';
  var _getItems = function () {
    return JSON.parse(localStorage.getItem(itemsKey)) || {};
  };    

  return {
    getItems: function () {
      var items = _getItems(), output = [];
      for (item in items) {
        output.push(items[item]);
      }
      return output;
    },
    addItem: function (text, item) {
      var items = _getItems();
      items[text] = item;
      localStorage.setItem(itemsKey, JSON.stringify(items));
      return this.getItems();
    },
    removeItem: function (text) {
      var items = _getItems();
      delete items[text];
      localStorage.setItem(itemsKey, JSON.stringify(items));
      return this.getItems();
    } 
  };
});

app.filter('timeAgo', function (moment) {
  return function (timestamp) {
    return moment(timestamp).fromNow();
  };
});

