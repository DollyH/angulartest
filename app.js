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

    this.One=false;

    this.showOne = function (){
      this.One = true;
    };

    var promise = itemsFactory.itemDetails();
    this.recipeReviews = [];
    promise.then(function (data) {
        $scope.itemDetails = data;
    });

    $scope.select = function(item) {
      $scope.selected = item;
    }

    $scope.selected = {};
    this.review = {};

    this.addReview = function(product) {
      var i;
      for(i = 0; i < this.recipeReviews.length; i++) {
        if(this.recipeReviews[i].name === product.name) {
          this.recipeReviews[i].reviews.push(this.review);
          break;
        }
      }

      if (i == this.recipeReviews.length) {
        var tempRecipeReview = {
          name:product.name, 
          reviews:[]
        };
        tempRecipeReview.reviews.push(this.review);
        this.recipeReviews.push(tempRecipeReview);
      } 
          
      this.review = {};
    };
    }]);

})();
