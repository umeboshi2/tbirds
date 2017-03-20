var Backbone, BootstrapNavBarView, MainSearchFormView, Marionette, NavTemplates,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

NavTemplates = require('../templates/navbar');

BootstrapNavBarView = (function(superClass) {
  extend(BootstrapNavBarView, superClass);

  function BootstrapNavBarView() {
    return BootstrapNavBarView.__super__.constructor.apply(this, arguments);
  }

  BootstrapNavBarView.prototype.template = NavTemplates.nav_pt;

  BootstrapNavBarView.prototype.regions = {
    usermenu: '#user-menu',
    mainmenu: '#main-menu'
  };

  return BootstrapNavBarView;

})(Backbone.Marionette.View);

MainSearchFormView = (function(superClass) {
  extend(MainSearchFormView, superClass);

  function MainSearchFormView() {
    return MainSearchFormView.__super__.constructor.apply(this, arguments);
  }

  MainSearchFormView.prototype.template = NavTemplates.nav_pt_search;

  return MainSearchFormView;

})(Backbone.Marionette.View);

module.exports = {
  MainSearchFormView: MainSearchFormView,
  BootstrapNavBarView: BootstrapNavBarView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbmF2YmFyLmpzIiwic291cmNlcyI6WyJ2aWV3cy9uYXZiYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsMkVBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRWIsWUFBQSxHQUFlLE9BQUEsQ0FBUSxxQkFBUjs7QUFFVDs7Ozs7OztnQ0FDSixRQUFBLEdBQVUsWUFBWSxDQUFDOztnQ0FDdkIsT0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLFlBQVY7SUFDQSxRQUFBLEVBQVUsWUFEVjs7Ozs7R0FIOEIsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFPaEQ7Ozs7Ozs7K0JBQ0osUUFBQSxHQUFVLFlBQVksQ0FBQzs7OztHQURRLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBSXJELE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxrQkFBQSxFQUFvQixrQkFBcEI7RUFDQSxtQkFBQSxFQUFxQixtQkFEckIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk5hdlRlbXBsYXRlcyA9IHJlcXVpcmUgJy4uL3RlbXBsYXRlcy9uYXZiYXInXG5cbmNsYXNzIEJvb3RzdHJhcE5hdkJhclZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IE5hdlRlbXBsYXRlcy5uYXZfcHRcbiAgcmVnaW9uczpcbiAgICB1c2VybWVudTogJyN1c2VyLW1lbnUnXG4gICAgbWFpbm1lbnU6ICcjbWFpbi1tZW51J1xuICAgIFxuXG5jbGFzcyBNYWluU2VhcmNoRm9ybVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IE5hdlRlbXBsYXRlcy5uYXZfcHRfc2VhcmNoXG5cbiAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1haW5TZWFyY2hGb3JtVmlldzogTWFpblNlYXJjaEZvcm1WaWV3XG4gIEJvb3RzdHJhcE5hdkJhclZpZXc6IEJvb3RzdHJhcE5hdkJhclZpZXdcbiAgXG5cbiJdfQ==
