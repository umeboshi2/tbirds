var $, Backbone, BaseController, DefaultAppletLayout, ExtraController, MainChannel, MainController, Marionette, navigate_to_url, scroll_top_fast,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

DefaultAppletLayout = require('./views/layout').DefaultAppletLayout;

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

  return BaseController;

})(Marionette.Object);

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
      return response.fail(function() {
        var msg;
        msg = "Failed to load " + objname + " data.";
        return MessageChannel.request('danger', msg);
      });
    } else {
      return this._show_view(vclass, model);
    }
  };

  return MainController;

})(BaseController);

ExtraController = (function(superClass) {
  extend(ExtraController, superClass);

  function ExtraController() {
    return ExtraController.__super__.constructor.apply(this, arguments);
  }

  ExtraController.prototype.channelName = function() {
    return this.getOption('channelName') || 'global';
  };

  ExtraController.prototype.initialize = function(options) {
    this.appletName = options.appletName;
    this.applet = MainChannel.request('main:applet:get-applet', this.appletName);
    this.mainController = this.applet.router.controller;
    return this.channel = this.getChannel();
  };

  ExtraController.prototype.setup_layout_if_needed = function() {
    return this.mainController.setup_layout_if_needed();
  };

  ExtraController.prototype.showChildView = function(region, view) {
    return this.mainController.layout.showChildView(region, view);
  };

  return ExtraController;

})(BaseController);

module.exports = {
  BaseController: BaseController,
  MainController: MainController,
  ExtraController: ExtraController
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDRJQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFWCxzQkFBd0IsT0FBQSxDQUFRLGdCQUFSOztBQUUxQixlQUFBLEdBQWtCLE9BQUEsQ0FBUSx3QkFBUjs7QUFDbEIsZUFBQSxHQUFrQixPQUFBLENBQVEsd0JBQVI7O0FBRWxCLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVI7Ozs7Ozs7MkJBQ0osU0FBQSxHQUFXLFNBQUEsR0FBQTs7MkJBRVgsVUFBQSxHQUFZOzsyQkFDWixlQUFBLEdBQWlCOzs7O0dBSlUsVUFBVSxDQUFDOztBQU1sQzs7Ozs7OzsyQkFDSixXQUFBLEdBQWE7OzJCQUNiLFdBQUEsR0FBYSxTQUFBO0FBQ1gsUUFBQTtJQUFBLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7V0FDTixHQUFHLENBQUMsT0FBSixDQUFBLENBQWEsQ0FBQyxTQUFkLENBQXdCLFFBQXhCO0VBRlc7OzJCQUliLFlBQUEsR0FBYyxTQUFBO0FBQ1osUUFBQTtJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxJQUFDLENBQUE7SUFFZixNQUFBLEdBQVMsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUNULElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO01BRUUsTUFBTSxDQUFDLEtBQVAsQ0FBQSxFQUZGOztXQUdBLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBQyxDQUFBLE1BQWI7RUFQWTs7MkJBWWQsc0JBQUEsR0FBd0IsU0FBQTtJQUN0QixJQUFHLElBQUMsQ0FBQSxNQUFELEtBQVcsTUFBZDthQUVFLElBQUMsQ0FBQSxZQUFELENBQUEsRUFGRjtLQUFBLE1BR0ssSUFBRyxJQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsQ0FBQSxDQUFIO2FBRUgsSUFBQyxDQUFBLFlBQUQsQ0FBQSxFQUZHOztFQUppQjs7MkJBU3hCLFdBQUEsR0FBYSxTQUFDLE1BQUQ7V0FDWCxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsQ0FBa0IsTUFBbEI7RUFEVzs7MkJBR2IsVUFBQSxHQUFZLFNBQUMsTUFBRCxFQUFTLEtBQVQ7QUFDVixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUksTUFBSixDQUNMO01BQUEsS0FBQSxFQUFPLEtBQVA7S0FESztXQUVQLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQztFQUhVOzsyQkFLWixVQUFBLEdBQVksU0FBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixPQUFoQjtBQUdWLFFBQUE7SUFBQSxJQUFHLEtBQUssQ0FBQyxPQUFOLENBQUEsQ0FBQSxJQUFtQixNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssQ0FBQyxVQUFsQixDQUE2QixDQUFDLE1BQTlCLEtBQXdDLENBQTlEO01BQ0UsUUFBQSxHQUFXLEtBQUssQ0FBQyxLQUFOLENBQUE7TUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFDWixLQUFDLENBQUEsVUFBRCxDQUFZLE1BQVosRUFBb0IsS0FBcEI7UUFEWTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZDthQUVBLFFBQVEsQ0FBQyxJQUFULENBQWMsU0FBQTtBQUNaLFlBQUE7UUFBQSxHQUFBLEdBQU0saUJBQUEsR0FBa0IsT0FBbEIsR0FBMEI7ZUFDaEMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsR0FBakM7TUFGWSxDQUFkLEVBSkY7S0FBQSxNQUFBO2FBUUUsSUFBQyxDQUFBLFVBQUQsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCLEVBUkY7O0VBSFU7Ozs7R0FuQ2U7O0FBZ0R2Qjs7Ozs7Ozs0QkFDSixXQUFBLEdBQWEsU0FBQTtXQUNYLElBQUMsQ0FBQSxTQUFELENBQVcsYUFBWCxDQUFBLElBQTZCO0VBRGxCOzs0QkFFYixVQUFBLEdBQVksU0FBQyxPQUFEO0lBQ1YsSUFBQyxDQUFBLFVBQUQsR0FBYyxPQUFPLENBQUM7SUFDdEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxXQUFXLENBQUMsT0FBWixDQUFvQix3QkFBcEIsRUFBOEMsSUFBQyxDQUFBLFVBQS9DO0lBQ1YsSUFBQyxDQUFBLGNBQUQsR0FBa0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUM7V0FDakMsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsVUFBRCxDQUFBO0VBSkQ7OzRCQUtaLHNCQUFBLEdBQXdCLFNBQUE7V0FDdEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxzQkFBaEIsQ0FBQTtFQURzQjs7NEJBRXhCLGFBQUEsR0FBZSxTQUFDLE1BQUQsRUFBUyxJQUFUO1dBQ2IsSUFBQyxDQUFBLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBdkIsQ0FBcUMsTUFBckMsRUFBNkMsSUFBN0M7RUFEYTs7OztHQVZhOztBQWE5QixNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsY0FBQSxFQUFnQixjQUFoQjtFQUNBLGNBQUEsRUFBZ0IsY0FEaEI7RUFFQSxlQUFBLEVBQWlCLGVBRmpCIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxueyBEZWZhdWx0QXBwbGV0TGF5b3V0IH0gPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxubmF2aWdhdGVfdG9fdXJsID0gcmVxdWlyZSAnLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbnNjcm9sbF90b3BfZmFzdCA9IHJlcXVpcmUgJy4vdXRpbC9zY3JvbGwtdG9wLWZhc3QnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuT2JqZWN0XG4gIGluaXRfcGFnZTogKCkgLT5cbiAgICAjIGRvIG5vdGhpbmdcbiAgc2Nyb2xsX3RvcDogc2Nyb2xsX3RvcF9mYXN0XG4gIG5hdmlnYXRlX3RvX3VybDogbmF2aWdhdGVfdG9fdXJsXG5cbmNsYXNzIE1haW5Db250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXJcbiAgbGF5b3V0Q2xhc3M6IERlZmF1bHRBcHBsZXRMYXlvdXRcbiAgX2dldF9hcHBsZXQ6IC0+XG4gICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgIGFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICdhcHBsZXQnXG4gICAgXG4gIHNldHVwX2xheW91dDogLT5cbiAgICBAbGF5b3V0ID0gbmV3IEBsYXlvdXRDbGFzc1xuICAgICNjb25zb2xlLmxvZyBcImNyZWF0ZWQgbGF5b3V0XCIsIEBsYXlvdXRcbiAgICBhcHBsZXQgPSBAX2dldF9hcHBsZXQoKVxuICAgIGlmIGFwcGxldC5oYXNWaWV3KClcbiAgICAgICNjb25zb2xlLmxvZyBcImFwcGxldCBoYXMgdmlld1wiXG4gICAgICBhcHBsZXQuZW1wdHkoKVxuICAgIGFwcGxldC5zaG93IEBsYXlvdXRcblxuICAjIHVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYSBsYXlvdXQgb25seSBpZlxuICAjIG5lZWRlZCwgbWFraW5nIHJvdXRpbmcgd2l0aGluIHRoZSBhcHBsZXRcbiAgIyBtb3JlIGVmZmljaWVudC5cbiAgc2V0dXBfbGF5b3V0X2lmX25lZWRlZDogLT5cbiAgICBpZiBAbGF5b3V0IGlzIHVuZGVmaW5lZFxuICAgICAgI2NvbnNvbGUubG9nICdsYXlvdXQgaXMgdW5kZWZpbmVkJ1xuICAgICAgQHNldHVwX2xheW91dCgpXG4gICAgZWxzZSBpZiBAbGF5b3V0LmlzRGVzdHJveWVkKClcbiAgICAgICNjb25zb2xlLmxvZyAnbGF5b3V0IGlzIGRlc3Ryb3llZCAtLS0tLS0+JywgQGxheW91dFxuICAgICAgQHNldHVwX2xheW91dCgpXG4gICAgXG4gIFxuICBfZ2V0X3JlZ2lvbjogKHJlZ2lvbikgLT5cbiAgICBAbGF5b3V0LmdldFJlZ2lvbiByZWdpb25cblxuICBfc2hvd192aWV3OiAodmNsYXNzLCBtb2RlbCkgLT5cbiAgICB2aWV3ID0gbmV3IHZjbGFzc1xuICAgICAgbW9kZWw6IG1vZGVsXG4gICAgQGxheW91dC5zaG93Q2hpbGRWaWV3ICdjb250ZW50Jywgdmlld1xuXG4gIF9sb2FkX3ZpZXc6ICh2Y2xhc3MsIG1vZGVsLCBvYmpuYW1lKSAtPlxuICAgICMgRklYTUVcbiAgICAjIHByZXN1bWUgXCJpZFwiIGlzIG9ubHkgYXR0cmlidXRlIHRoZXJlIGlmIGxlbmd0aCBpcyAxXG4gICAgaWYgbW9kZWwuaXNFbXB0eSgpIG9yIE9iamVjdC5rZXlzKG1vZGVsLmF0dHJpYnV0ZXMpLmxlbmd0aCBpcyAxXG4gICAgICByZXNwb25zZSA9IG1vZGVsLmZldGNoKClcbiAgICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgICAgQF9zaG93X3ZpZXcgdmNsYXNzLCBtb2RlbFxuICAgICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgICBtc2cgPSBcIkZhaWxlZCB0byBsb2FkICN7b2JqbmFtZX0gZGF0YS5cIlxuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBtc2dcbiAgICBlbHNlXG4gICAgICBAX3Nob3dfdmlldyB2Y2xhc3MsIG1vZGVsXG4gICAgICBcbmNsYXNzIEV4dHJhQ29udHJvbGxlciBleHRlbmRzIEJhc2VDb250cm9sbGVyXG4gIGNoYW5uZWxOYW1lOiAtPlxuICAgIEBnZXRPcHRpb24oJ2NoYW5uZWxOYW1lJykgb3IgJ2dsb2JhbCdcbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG4gICAgQGFwcGxldE5hbWUgPSBvcHRpb25zLmFwcGxldE5hbWVcbiAgICBAYXBwbGV0ID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIEBhcHBsZXROYW1lXG4gICAgQG1haW5Db250cm9sbGVyID0gQGFwcGxldC5yb3V0ZXIuY29udHJvbGxlclxuICAgIEBjaGFubmVsID0gQGdldENoYW5uZWwoKVxuICBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkOiAtPlxuICAgIEBtYWluQ29udHJvbGxlci5zZXR1cF9sYXlvdXRfaWZfbmVlZGVkKClcbiAgc2hvd0NoaWxkVmlldzogKHJlZ2lvbiwgdmlldykgLT5cbiAgICBAbWFpbkNvbnRyb2xsZXIubGF5b3V0LnNob3dDaGlsZFZpZXcgcmVnaW9uLCB2aWV3XG4gIFxubW9kdWxlLmV4cG9ydHMgPVxuICBCYXNlQ29udHJvbGxlcjogQmFzZUNvbnRyb2xsZXJcbiAgTWFpbkNvbnRyb2xsZXI6IE1haW5Db250cm9sbGVyXG4gIEV4dHJhQ29udHJvbGxlcjogRXh0cmFDb250cm9sbGVyXG4gIFxuIl19
