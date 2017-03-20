var Backbone, EmptyView, Marionette, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

EmptyView = (function(superClass) {
  extend(EmptyView, superClass);

  function EmptyView() {
    return EmptyView.__super__.constructor.apply(this, arguments);
  }

  EmptyView.prototype.template = tc.renderable(function() {
    return tc.div('.jumbotron', function() {
      return tc.h1(function() {
        tc.text('Loading ...');
        return tc.i('.fa.fa-spinner.fa-spin');
      });
    });
  });

  return EmptyView;

})(Backbone.Marionette.View);

module.exports = EmptyView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW1wdHkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2VtcHR5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG1DQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFQzs7Ozs7OztzQkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixTQUFBO2FBQ25CLEVBQUUsQ0FBQyxFQUFILENBQU0sU0FBQTtRQUNKLEVBQUUsQ0FBQyxJQUFILENBQVEsYUFBUjtlQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssd0JBQUw7TUFGSSxDQUFOO0lBRG1CLENBQXJCO0VBRHNCLENBQWQ7Ozs7R0FEWSxRQUFRLENBQUMsVUFBVSxDQUFDOztBQVE1QyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5jbGFzcyBFbXB0eVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5kaXYgJy5qdW1ib3Ryb24nLCAtPlxuICAgICAgdGMuaDEgLT5cbiAgICAgICAgdGMudGV4dCAnTG9hZGluZyAuLi4nXG4gICAgICAgIHRjLmkgJy5mYS5mYS1zcGlubmVyLmZhLXNwaW4nXG4gICAgXG4gIFxubW9kdWxlLmV4cG9ydHMgPSBFbXB0eVZpZXdcbiJdfQ==
