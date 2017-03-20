var $, Backbone, BaseController, DefaultAppletLayout, MainChannel, MainController, Marionette, Util,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

DefaultAppletLayout = require('./views/layout').DefaultAppletLayout;

Util = require('./apputil');

MainChannel = Backbone.Radio.channel('global');

BaseController = (function(superClass) {
  extend(BaseController, superClass);

  function BaseController() {
    return BaseController.__super__.constructor.apply(this, arguments);
  }

  BaseController.prototype.init_page = function() {};

  BaseController.prototype.scroll_top = Util.scroll_top_fast;

  BaseController.prototype.navigate_to_url = Util.navigate_to_url;

  BaseController.prototype.navbar_set_active = Util.navbar_set_active;

  return BaseController;

})(Backbone.Marionette.Object);

MainController = (function(superClass) {
  extend(MainController, superClass);

  function MainController() {
    return MainController.__super__.constructor.apply(this, arguments);
  }

  MainController.prototype.layoutClass = DefaultAppletLayout;

  MainController.prototype._get_applet = function() {
    var app;
    app = MainChannel.request('main:app:object');
    return app.getView().getRegion('applet');
  };

  MainController.prototype.setup_layout = function() {
    var applet;
    this.layout = new this.layoutClass;
    applet = this._get_applet();
    if (applet.hasView()) {
      applet.empty();
    }
    return applet.show(this.layout);
  };

  MainController.prototype.setup_layout_if_needed = function() {
    if (this.layout === void 0) {
      return this.setup_layout();
    } else if (this.layout.isDestroyed()) {
      return this.setup_layout();
    }
  };

  MainController.prototype._get_region = function(region) {
    return this.layout.getRegion(region);
  };

  MainController.prototype._show_content = function(view) {
    var content;
    console.warn("_show_content is deprecated");
    content = this._get_region('content');
    return content.show(view);
  };

  MainController.prototype._empty_sidebar = function() {
    var sidebar;
    sidebar = this._get_region('sidebar');
    sidebar.empty();
    return sidebar;
  };

  MainController.prototype._make_sidebar = function() {
    var sidebar, view;
    console.warn("_make_sidebar is deprecated");
    sidebar = this._empty_sidebar();
    view = new this.sidebarclass({
      model: this.sidebar_model
    });
    return sidebar.show(view);
  };

  MainController.prototype._show_view = function(vclass, model) {
    var view;
    view = new vclass({
      model: model
    });
    return this.layout.showChildView('content', view);
  };

  MainController.prototype._load_view = function(vclass, model, objname) {
    var response;
    if (model.isEmpty() || Object.keys(model.attributes).length === 1) {
      response = model.fetch();
      response.done((function(_this) {
        return function() {
          return _this._show_view(vclass, model);
        };
      })(this));
      return response.fail((function(_this) {
        return function() {
          var msg;
          msg = "Failed to load " + objname + " data.";
          return MessageChannel.request('danger', msg);
        };
      })(this));
    } else {
      return this._show_view(vclass, model);
    }
  };

  return MainController;

})(BaseController);

module.exports = {
  BaseController: BaseController,
  MainController: MainController
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLCtGQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFWCxzQkFBd0IsT0FBQSxDQUFRLGdCQUFSOztBQUMxQixJQUFBLEdBQU8sT0FBQSxDQUFRLFdBQVI7O0FBRVAsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjs7Ozs7OzsyQkFDSixTQUFBLEdBQVcsU0FBQSxHQUFBOzsyQkFFWCxVQUFBLEdBQVksSUFBSSxDQUFDOzsyQkFDakIsZUFBQSxHQUFpQixJQUFJLENBQUM7OzJCQUN0QixpQkFBQSxHQUFtQixJQUFJLENBQUM7Ozs7R0FMRyxRQUFRLENBQUMsVUFBVSxDQUFDOztBQU8zQzs7Ozs7OzsyQkFDSixXQUFBLEdBQWE7OzJCQUNiLFdBQUEsR0FBYSxTQUFBO0FBQ1gsUUFBQTtJQUFBLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7V0FDTixHQUFHLENBQUMsT0FBSixDQUFBLENBQWEsQ0FBQyxTQUFkLENBQXdCLFFBQXhCO0VBRlc7OzJCQUliLFlBQUEsR0FBYyxTQUFBO0FBQ1osUUFBQTtJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxJQUFDLENBQUE7SUFFZixNQUFBLEdBQVMsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUNULElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO01BRUUsTUFBTSxDQUFDLEtBQVAsQ0FBQSxFQUZGOztXQUdBLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBQyxDQUFBLE1BQWI7RUFQWTs7MkJBWWQsc0JBQUEsR0FBd0IsU0FBQTtJQUN0QixJQUFHLElBQUMsQ0FBQSxNQUFELEtBQVcsTUFBZDthQUVFLElBQUMsQ0FBQSxZQUFELENBQUEsRUFGRjtLQUFBLE1BR0ssSUFBRyxJQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsQ0FBQSxDQUFIO2FBRUgsSUFBQyxDQUFBLFlBQUQsQ0FBQSxFQUZHOztFQUppQjs7MkJBU3hCLFdBQUEsR0FBYSxTQUFDLE1BQUQ7V0FDWCxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsQ0FBa0IsTUFBbEI7RUFEVzs7MkJBR2IsYUFBQSxHQUFlLFNBQUMsSUFBRDtBQUNiLFFBQUE7SUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLDZCQUFiO0lBQ0EsT0FBQSxHQUFVLElBQUMsQ0FBQSxXQUFELENBQWEsU0FBYjtXQUNWLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBYjtFQUhhOzsyQkFLZixjQUFBLEdBQWdCLFNBQUE7QUFDZCxRQUFBO0lBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxXQUFELENBQWEsU0FBYjtJQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7V0FDQTtFQUhjOzsyQkFLaEIsYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSw2QkFBYjtJQUNBLE9BQUEsR0FBVSxJQUFDLENBQUEsY0FBRCxDQUFBO0lBQ1YsSUFBQSxHQUFPLElBQUksSUFBQyxDQUFBLFlBQUwsQ0FDTDtNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsYUFBUjtLQURLO1dBRVAsT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFiO0VBTGE7OzJCQU9mLFVBQUEsR0FBWSxTQUFDLE1BQUQsRUFBUyxLQUFUO0FBQ1YsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLE1BQUosQ0FDTDtNQUFBLEtBQUEsRUFBTyxLQUFQO0tBREs7V0FFUCxJQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakM7RUFIVTs7MkJBS1osVUFBQSxHQUFZLFNBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsT0FBaEI7QUFHVixRQUFBO0lBQUEsSUFBRyxLQUFLLENBQUMsT0FBTixDQUFBLENBQUEsSUFBbUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFLLENBQUMsVUFBbEIsQ0FBNkIsQ0FBQyxNQUE5QixLQUF3QyxDQUE5RDtNQUNFLFFBQUEsR0FBVyxLQUFLLENBQUMsS0FBTixDQUFBO01BQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQ1osS0FBQyxDQUFBLFVBQUQsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCO1FBRFk7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQ7YUFFQSxRQUFRLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtBQUNaLGNBQUE7VUFBQSxHQUFBLEdBQU0saUJBQUEsR0FBa0IsT0FBbEIsR0FBMEI7aUJBQ2hDLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLEdBQWpDO1FBRlk7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQsRUFKRjtLQUFBLE1BQUE7YUFRRSxJQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosRUFBb0IsS0FBcEIsRUFSRjs7RUFIVTs7OztHQXBEZTs7QUFrRTdCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxjQUFBLEVBQWdCLGNBQWhCO0VBQ0EsY0FBQSxFQUFnQixjQURoQiIsInNvdXJjZXNDb250ZW50IjpbIiQgPSByZXF1aXJlICdqcXVlcnknXG5CYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbnsgRGVmYXVsdEFwcGxldExheW91dCB9ID0gcmVxdWlyZSAnLi92aWV3cy9sYXlvdXQnXG5VdGlsID0gcmVxdWlyZSAnLi9hcHB1dGlsJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgQmFzZUNvbnRyb2xsZXIgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLk9iamVjdFxuICBpbml0X3BhZ2U6ICgpIC0+XG4gICAgIyBkbyBub3RoaW5nXG4gIHNjcm9sbF90b3A6IFV0aWwuc2Nyb2xsX3RvcF9mYXN0XG4gIG5hdmlnYXRlX3RvX3VybDogVXRpbC5uYXZpZ2F0ZV90b191cmxcbiAgbmF2YmFyX3NldF9hY3RpdmU6IFV0aWwubmF2YmFyX3NldF9hY3RpdmVcblxuY2xhc3MgTWFpbkNvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlclxuICBsYXlvdXRDbGFzczogRGVmYXVsdEFwcGxldExheW91dFxuICBfZ2V0X2FwcGxldDogLT5cbiAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgYXBwLmdldFZpZXcoKS5nZXRSZWdpb24gJ2FwcGxldCdcbiAgICBcbiAgc2V0dXBfbGF5b3V0OiAtPlxuICAgIEBsYXlvdXQgPSBuZXcgQGxheW91dENsYXNzXG4gICAgI2NvbnNvbGUubG9nIFwiY3JlYXRlZCBsYXlvdXRcIiwgQGxheW91dFxuICAgIGFwcGxldCA9IEBfZ2V0X2FwcGxldCgpXG4gICAgaWYgYXBwbGV0Lmhhc1ZpZXcoKVxuICAgICAgI2NvbnNvbGUubG9nIFwiYXBwbGV0IGhhcyB2aWV3XCJcbiAgICAgIGFwcGxldC5lbXB0eSgpXG4gICAgYXBwbGV0LnNob3cgQGxheW91dFxuXG4gICMgdXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhIGxheW91dCBvbmx5IGlmXG4gICMgbmVlZGVkLCBtYWtpbmcgcm91dGluZyB3aXRoaW4gdGhlIGFwcGxldFxuICAjIG1vcmUgZWZmaWNpZW50LlxuICBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkOiAtPlxuICAgIGlmIEBsYXlvdXQgaXMgdW5kZWZpbmVkXG4gICAgICAjY29uc29sZS5sb2cgJ2xheW91dCBpcyB1bmRlZmluZWQnXG4gICAgICBAc2V0dXBfbGF5b3V0KClcbiAgICBlbHNlIGlmIEBsYXlvdXQuaXNEZXN0cm95ZWQoKVxuICAgICAgI2NvbnNvbGUubG9nICdsYXlvdXQgaXMgZGVzdHJveWVkIC0tLS0tLT4nLCBAbGF5b3V0XG4gICAgICBAc2V0dXBfbGF5b3V0KClcbiAgICBcbiAgXG4gIF9nZXRfcmVnaW9uOiAocmVnaW9uKSAtPlxuICAgIEBsYXlvdXQuZ2V0UmVnaW9uIHJlZ2lvblxuXG4gIF9zaG93X2NvbnRlbnQ6ICh2aWV3KSAtPlxuICAgIGNvbnNvbGUud2FybiBcIl9zaG93X2NvbnRlbnQgaXMgZGVwcmVjYXRlZFwiXG4gICAgY29udGVudCA9IEBfZ2V0X3JlZ2lvbiAnY29udGVudCdcbiAgICBjb250ZW50LnNob3cgdmlld1xuXG4gIF9lbXB0eV9zaWRlYmFyOiAtPlxuICAgIHNpZGViYXIgPSBAX2dldF9yZWdpb24gJ3NpZGViYXInXG4gICAgc2lkZWJhci5lbXB0eSgpXG4gICAgc2lkZWJhclxuICAgICAgICBcbiAgX21ha2Vfc2lkZWJhcjogLT5cbiAgICBjb25zb2xlLndhcm4gXCJfbWFrZV9zaWRlYmFyIGlzIGRlcHJlY2F0ZWRcIlxuICAgIHNpZGViYXIgPSBAX2VtcHR5X3NpZGViYXIoKVxuICAgIHZpZXcgPSBuZXcgQHNpZGViYXJjbGFzc1xuICAgICAgbW9kZWw6IEBzaWRlYmFyX21vZGVsXG4gICAgc2lkZWJhci5zaG93IHZpZXdcbiAgICBcbiAgX3Nob3dfdmlldzogKHZjbGFzcywgbW9kZWwpIC0+XG4gICAgdmlldyA9IG5ldyB2Y2xhc3NcbiAgICAgIG1vZGVsOiBtb2RlbFxuICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcblxuICBfbG9hZF92aWV3OiAodmNsYXNzLCBtb2RlbCwgb2JqbmFtZSkgLT5cbiAgICAjIEZJWE1FXG4gICAgIyBwcmVzdW1lIFwiaWRcIiBpcyBvbmx5IGF0dHJpYnV0ZSB0aGVyZSBpZiBsZW5ndGggaXMgMVxuICAgIGlmIG1vZGVsLmlzRW1wdHkoKSBvciBPYmplY3Qua2V5cyhtb2RlbC5hdHRyaWJ1dGVzKS5sZW5ndGggaXMgMVxuICAgICAgcmVzcG9uc2UgPSBtb2RlbC5mZXRjaCgpXG4gICAgICByZXNwb25zZS5kb25lID0+XG4gICAgICAgIEBfc2hvd192aWV3IHZjbGFzcywgbW9kZWxcbiAgICAgIHJlc3BvbnNlLmZhaWwgPT5cbiAgICAgICAgbXNnID0gXCJGYWlsZWQgdG8gbG9hZCAje29iam5hbWV9IGRhdGEuXCJcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgbXNnXG4gICAgZWxzZVxuICAgICAgQF9zaG93X3ZpZXcgdmNsYXNzLCBtb2RlbFxuICAgICAgXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJhc2VDb250cm9sbGVyOiBCYXNlQ29udHJvbGxlclxuICBNYWluQ29udHJvbGxlcjogTWFpbkNvbnRyb2xsZXJcblxuIl19
