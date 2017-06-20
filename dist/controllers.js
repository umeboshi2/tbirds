var $, Backbone, BaseController, DefaultAppletLayout, MainChannel, MainController, Marionette, navbar_set_active, navigate_to_url, scroll_top_fast,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

DefaultAppletLayout = require('./views/layout').DefaultAppletLayout;

navbar_set_active = require('./util').navbar_set_active;

navigate_to_url = require('./util/navigate-to-url');

scroll_top_fast = require('./util/scroll-top-fast');

MainChannel = Backbone.Radio.channel('global');

BaseController = (function(superClass) {
  extend(BaseController, superClass);

  function BaseController() {
    return BaseController.__super__.constructor.apply(this, arguments);
  }

  BaseController.prototype.init_page = function() {};

  BaseController.prototype.scroll_top = scroll_top_fast;

  BaseController.prototype.navigate_to_url = navigate_to_url;

  BaseController.prototype.navbar_set_active = navbar_set_active;

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhJQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFWCxzQkFBd0IsT0FBQSxDQUFRLGdCQUFSOztBQUV4QixvQkFBc0IsT0FBQSxDQUFRLFFBQVI7O0FBQ3hCLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHdCQUFSOztBQUNsQixlQUFBLEdBQWtCLE9BQUEsQ0FBUSx3QkFBUjs7QUFFbEIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjs7Ozs7OzsyQkFDSixTQUFBLEdBQVcsU0FBQSxHQUFBOzsyQkFFWCxVQUFBLEdBQVk7OzJCQUNaLGVBQUEsR0FBaUI7OzJCQUNqQixpQkFBQSxHQUFtQjs7OztHQUxRLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBTzNDOzs7Ozs7OzJCQUNKLFdBQUEsR0FBYTs7MkJBQ2IsV0FBQSxHQUFhLFNBQUE7QUFDWCxRQUFBO0lBQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtXQUNOLEdBQUcsQ0FBQyxPQUFKLENBQUEsQ0FBYSxDQUFDLFNBQWQsQ0FBd0IsUUFBeEI7RUFGVzs7MkJBSWIsWUFBQSxHQUFjLFNBQUE7QUFDWixRQUFBO0lBQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLElBQUMsQ0FBQTtJQUVmLE1BQUEsR0FBUyxJQUFDLENBQUEsV0FBRCxDQUFBO0lBQ1QsSUFBRyxNQUFNLENBQUMsT0FBUCxDQUFBLENBQUg7TUFFRSxNQUFNLENBQUMsS0FBUCxDQUFBLEVBRkY7O1dBR0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFDLENBQUEsTUFBYjtFQVBZOzsyQkFZZCxzQkFBQSxHQUF3QixTQUFBO0lBQ3RCLElBQUcsSUFBQyxDQUFBLE1BQUQsS0FBVyxNQUFkO2FBRUUsSUFBQyxDQUFBLFlBQUQsQ0FBQSxFQUZGO0tBQUEsTUFHSyxJQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBUixDQUFBLENBQUg7YUFFSCxJQUFDLENBQUEsWUFBRCxDQUFBLEVBRkc7O0VBSmlCOzsyQkFTeEIsV0FBQSxHQUFhLFNBQUMsTUFBRDtXQUNYLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixDQUFrQixNQUFsQjtFQURXOzsyQkFHYixhQUFBLEdBQWUsU0FBQyxJQUFEO0FBQ2IsUUFBQTtJQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsNkJBQWI7SUFDQSxPQUFBLEdBQVUsSUFBQyxDQUFBLFdBQUQsQ0FBYSxTQUFiO1dBQ1YsT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFiO0VBSGE7OzJCQUtmLGNBQUEsR0FBZ0IsU0FBQTtBQUNkLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLFdBQUQsQ0FBYSxTQUFiO0lBQ1YsT0FBTyxDQUFDLEtBQVIsQ0FBQTtXQUNBO0VBSGM7OzJCQUtoQixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLDZCQUFiO0lBQ0EsT0FBQSxHQUFVLElBQUMsQ0FBQSxjQUFELENBQUE7SUFDVixJQUFBLEdBQU8sSUFBSSxJQUFDLENBQUEsWUFBTCxDQUNMO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxhQUFSO0tBREs7V0FFUCxPQUFPLENBQUMsSUFBUixDQUFhLElBQWI7RUFMYTs7MkJBT2YsVUFBQSxHQUFZLFNBQUMsTUFBRCxFQUFTLEtBQVQ7QUFDVixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUksTUFBSixDQUNMO01BQUEsS0FBQSxFQUFPLEtBQVA7S0FESztXQUVQLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQztFQUhVOzsyQkFLWixVQUFBLEdBQVksU0FBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixPQUFoQjtBQUdWLFFBQUE7SUFBQSxJQUFHLEtBQUssQ0FBQyxPQUFOLENBQUEsQ0FBQSxJQUFtQixNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssQ0FBQyxVQUFsQixDQUE2QixDQUFDLE1BQTlCLEtBQXdDLENBQTlEO01BQ0UsUUFBQSxHQUFXLEtBQUssQ0FBQyxLQUFOLENBQUE7TUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFDWixLQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosRUFBb0IsS0FBcEI7UUFEWTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZDthQUVBLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO0FBQ1osY0FBQTtVQUFBLEdBQUEsR0FBTSxpQkFBQSxHQUFrQixPQUFsQixHQUEwQjtpQkFDaEMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsR0FBakM7UUFGWTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZCxFQUpGO0tBQUEsTUFBQTthQVFFLElBQUMsQ0FBQSxVQUFELENBQVksTUFBWixFQUFvQixLQUFwQixFQVJGOztFQUhVOzs7O0dBcERlOztBQWtFN0IsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLGNBQUEsRUFBZ0IsY0FBaEI7RUFDQSxjQUFBLEVBQWdCLGNBRGhCIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxueyBEZWZhdWx0QXBwbGV0TGF5b3V0IH0gPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxueyBuYXZiYXJfc2V0X2FjdGl2ZSB9ID0gcmVxdWlyZSAnLi91dGlsJ1xubmF2aWdhdGVfdG9fdXJsID0gcmVxdWlyZSAnLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbnNjcm9sbF90b3BfZmFzdCA9IHJlcXVpcmUgJy4vdXRpbC9zY3JvbGwtdG9wLWZhc3QnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuT2JqZWN0XG4gIGluaXRfcGFnZTogKCkgLT5cbiAgICAjIGRvIG5vdGhpbmdcbiAgc2Nyb2xsX3RvcDogc2Nyb2xsX3RvcF9mYXN0XG4gIG5hdmlnYXRlX3RvX3VybDogbmF2aWdhdGVfdG9fdXJsXG4gIG5hdmJhcl9zZXRfYWN0aXZlOiBuYXZiYXJfc2V0X2FjdGl2ZVxuXG5jbGFzcyBNYWluQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyXG4gIGxheW91dENsYXNzOiBEZWZhdWx0QXBwbGV0TGF5b3V0XG4gIF9nZXRfYXBwbGV0OiAtPlxuICAgIGFwcCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgICBhcHAuZ2V0VmlldygpLmdldFJlZ2lvbiAnYXBwbGV0J1xuICAgIFxuICBzZXR1cF9sYXlvdXQ6IC0+XG4gICAgQGxheW91dCA9IG5ldyBAbGF5b3V0Q2xhc3NcbiAgICAjY29uc29sZS5sb2cgXCJjcmVhdGVkIGxheW91dFwiLCBAbGF5b3V0XG4gICAgYXBwbGV0ID0gQF9nZXRfYXBwbGV0KClcbiAgICBpZiBhcHBsZXQuaGFzVmlldygpXG4gICAgICAjY29uc29sZS5sb2cgXCJhcHBsZXQgaGFzIHZpZXdcIlxuICAgICAgYXBwbGV0LmVtcHR5KClcbiAgICBhcHBsZXQuc2hvdyBAbGF5b3V0XG5cbiAgIyB1c2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGEgbGF5b3V0IG9ubHkgaWZcbiAgIyBuZWVkZWQsIG1ha2luZyByb3V0aW5nIHdpdGhpbiB0aGUgYXBwbGV0XG4gICMgbW9yZSBlZmZpY2llbnQuXG4gIHNldHVwX2xheW91dF9pZl9uZWVkZWQ6IC0+XG4gICAgaWYgQGxheW91dCBpcyB1bmRlZmluZWRcbiAgICAgICNjb25zb2xlLmxvZyAnbGF5b3V0IGlzIHVuZGVmaW5lZCdcbiAgICAgIEBzZXR1cF9sYXlvdXQoKVxuICAgIGVsc2UgaWYgQGxheW91dC5pc0Rlc3Ryb3llZCgpXG4gICAgICAjY29uc29sZS5sb2cgJ2xheW91dCBpcyBkZXN0cm95ZWQgLS0tLS0tPicsIEBsYXlvdXRcbiAgICAgIEBzZXR1cF9sYXlvdXQoKVxuICAgIFxuICBcbiAgX2dldF9yZWdpb246IChyZWdpb24pIC0+XG4gICAgQGxheW91dC5nZXRSZWdpb24gcmVnaW9uXG5cbiAgX3Nob3dfY29udGVudDogKHZpZXcpIC0+XG4gICAgY29uc29sZS53YXJuIFwiX3Nob3dfY29udGVudCBpcyBkZXByZWNhdGVkXCJcbiAgICBjb250ZW50ID0gQF9nZXRfcmVnaW9uICdjb250ZW50J1xuICAgIGNvbnRlbnQuc2hvdyB2aWV3XG5cbiAgX2VtcHR5X3NpZGViYXI6IC0+XG4gICAgc2lkZWJhciA9IEBfZ2V0X3JlZ2lvbiAnc2lkZWJhcidcbiAgICBzaWRlYmFyLmVtcHR5KClcbiAgICBzaWRlYmFyXG4gICAgICAgIFxuICBfbWFrZV9zaWRlYmFyOiAtPlxuICAgIGNvbnNvbGUud2FybiBcIl9tYWtlX3NpZGViYXIgaXMgZGVwcmVjYXRlZFwiXG4gICAgc2lkZWJhciA9IEBfZW1wdHlfc2lkZWJhcigpXG4gICAgdmlldyA9IG5ldyBAc2lkZWJhcmNsYXNzXG4gICAgICBtb2RlbDogQHNpZGViYXJfbW9kZWxcbiAgICBzaWRlYmFyLnNob3cgdmlld1xuICAgIFxuICBfc2hvd192aWV3OiAodmNsYXNzLCBtb2RlbCkgLT5cbiAgICB2aWV3ID0gbmV3IHZjbGFzc1xuICAgICAgbW9kZWw6IG1vZGVsXG4gICAgQGxheW91dC5zaG93Q2hpbGRWaWV3ICdjb250ZW50Jywgdmlld1xuXG4gIF9sb2FkX3ZpZXc6ICh2Y2xhc3MsIG1vZGVsLCBvYmpuYW1lKSAtPlxuICAgICMgRklYTUVcbiAgICAjIHByZXN1bWUgXCJpZFwiIGlzIG9ubHkgYXR0cmlidXRlIHRoZXJlIGlmIGxlbmd0aCBpcyAxXG4gICAgaWYgbW9kZWwuaXNFbXB0eSgpIG9yIE9iamVjdC5rZXlzKG1vZGVsLmF0dHJpYnV0ZXMpLmxlbmd0aCBpcyAxXG4gICAgICByZXNwb25zZSA9IG1vZGVsLmZldGNoKClcbiAgICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgICAgQF9zaG93X3ZpZXcgdmNsYXNzLCBtb2RlbFxuICAgICAgcmVzcG9uc2UuZmFpbCA9PlxuICAgICAgICBtc2cgPSBcIkZhaWxlZCB0byBsb2FkICN7b2JqbmFtZX0gZGF0YS5cIlxuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBtc2dcbiAgICBlbHNlXG4gICAgICBAX3Nob3dfdmlldyB2Y2xhc3MsIG1vZGVsXG4gICAgICBcbiAgICBcbm1vZHVsZS5leHBvcnRzID1cbiAgQmFzZUNvbnRyb2xsZXI6IEJhc2VDb250cm9sbGVyXG4gIE1haW5Db250cm9sbGVyOiBNYWluQ29udHJvbGxlclxuXG4iXX0=
