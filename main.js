var app;
app = angular.module("superhero", []).
    directive("enter", function () {
        return function (scope, element, attr) {
            element.bind("mouseenter", function () {
                element.addClass(attr.enter);
            })
        }
    })
    .directive("leave", function () {
        return {
            restrict : "A",
            link: function (scope, element,attr) {
                element.bind("mouseleave", function () {
                    element.removeClass(attr.leave);
                });
            }
        }

    });