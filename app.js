(function() {
// Add your javascript here
var app = angular.module('recipeModule', []);

app.factory('itemsFactory', ['$http', function($http){
  var itemsFactory ={
    itemDetails: function() {
      return $http(
      {
        url: "recipes.json",
        method: "GET",
      })
      .then(function (response) {
        return response.data;
        });
      }
    };
    return itemsFactory;
  
}]);


app.controller('RecipeController', ['$scope', 'itemsFactory', function($scope, itemsFactory){
  var promise = itemsFactory.itemDetails();
  this.recipeReviews = [];
    promise.then(function (data) {
        $scope.itemDetails = data;
        console.log(data);
    });
    $scope.select = function(item) {
      $scope.selected = item;
    }
    $scope.selected = {};
    this.review = {};

      this.addReview = function(product) {
      this.recipeReviews.push(this.review);
      this.review = {};
    };
}]);

  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

    };
  });

})();
