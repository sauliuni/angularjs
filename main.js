var app = angular.module('twitterApp', []);
app.controller("AppCtrl", function($scope){
    $scope.loadMoreTweets = function(){
        alert("Laoding tweets");
    };
    $scope.deleteTweets = function(){
        alert("deleting");
    };
    $scope.expanders = [
        {
            title : "Eins",
            text: "Hallo eins"
        },
        {
            title : "zwei",
            text: "Hallo zwei"
        },
        {
            title : "drei",
            text: "Hallo drei"
        }];
    $scope.format = 'M/d/yy h:mm:ss a';
    $scope.choreDone = function(chore){
        alert(chore + "ist done!");
        console.log(chore + "ist done");
    }
}).controller("timeDate", function($scope){
    $scope.format = 'M/d/yy h:mm:ss a';
})
    .directive("superhero", function(){
    return {
        restrict : "E",
        scope:{},
        controller: function ($scope) {
            $scope.abilities = [];
            this.addStength = function (){
                $scope.abilities.push("strength")
            };
            this.addSpeed = function(){
                $scope.abilities.push("speed");
            };
            this.addFlight = function(){
                $scope.abilities.push("flight");
            };
        },
        link : function (scope, element) {
            element.bind("mouseenter", function(){
                console.log(scope.abilities);
            })
        }
    }})
    .directive("speed", function(){
    return {
        require: "^superhero",
        link: function (scope, element, attr, superheroCtrl) {
            superheroCtrl.addSpeed();
            console.log('added speed');
            element.bind("mouseenter", function(){
                superheroCtrl.addSpeed();
                console.log("now added really");
            });
        }
    }})
    .directive("showDetails", function () {
        return {
            restrict: "EA",
            scope: {
                title : "@detailsTitle"
            },
            require: "^accordion",
            replace: true,
            transclude: true,
            template: '<div><div class="title" ng-click="toggle()">{{title}}</div><div class="body" ng-show="shouldShow" ng-transclude></div></div>',
            link: function(scope, element, attr, controllers){
                scope.shouldShow = false;
                controllers.addExpander(scope);
                scope.toggle = function() {
                    scope.shouldShow = !scope.shouldShow;
                };
            }
        }

    })
    .directive("accordion", function () {
        return {
            restrict: "EA",
            replace: true,
            transclude: true,
            template: "<div ng-transclude></div>",
            controller: function () {
                var expanders = [];
                console.log("accordion init");
                this.gotOpened = function(selectedItem){
                    angular.forEach(expanders, function(expander){
                        if (selectedItem = !expander){
                            expander.shouldShow = false;
                        }
                    });
                };
                this.addExpander = function(expander){
                    expanders.push(expander);

                }
            }
        }
    })
    .directive("currentTime", ['$interval', 'dateFilter',function(interval, dateFilter){
        return{
            link: function(scope, element, attr) {
                var format, timeoutId;
                console.log("init current time");
                function updateTime() {
                    element.text(dateFilter(new Date(), format));
                }

                scope.$watch(attr.currentTime, function (value) {
                    format = value;
                    updateTime();
                });

                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });

                interval(function () {
                    updateTime();
                }, 1000);
            }

        }
    }])
    .directive("kid", function () {
        return {
            restrict:"E",
            scope: {
                done : "&"
            },
            template: '<input type ="text" ng-model="chore"><div>{{chore}} <button ng-click="done({chore:chore})">OK im done</button></div>'
        }
    });