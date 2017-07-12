var $, Backbone, BaseController, DefaultAppletLayout, MainChannel, MainController, Marionette, navigate_to_url, scroll_top_fast,
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

module.exports = {
  BaseController: BaseController,
  MainController: MainController
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDJIQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFWCxzQkFBd0IsT0FBQSxDQUFRLGdCQUFSOztBQUUxQixlQUFBLEdBQWtCLE9BQUEsQ0FBUSx3QkFBUjs7QUFDbEIsZUFBQSxHQUFrQixPQUFBLENBQVEsd0JBQVI7O0FBRWxCLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVI7Ozs7Ozs7MkJBQ0osU0FBQSxHQUFXLFNBQUEsR0FBQTs7MkJBRVgsVUFBQSxHQUFZOzsyQkFDWixlQUFBLEdBQWlCOzs7O0dBSlUsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFNM0M7Ozs7Ozs7MkJBQ0osV0FBQSxHQUFhOzsyQkFDYixXQUFBLEdBQWEsU0FBQTtBQUNYLFFBQUE7SUFBQSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1dBQ04sR0FBRyxDQUFDLE9BQUosQ0FBQSxDQUFhLENBQUMsU0FBZCxDQUF3QixRQUF4QjtFQUZXOzsyQkFJYixZQUFBLEdBQWMsU0FBQTtBQUNaLFFBQUE7SUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBQyxDQUFBO0lBRWYsTUFBQSxHQUFTLElBQUMsQ0FBQSxXQUFELENBQUE7SUFDVCxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBSDtNQUVFLE1BQU0sQ0FBQyxLQUFQLENBQUEsRUFGRjs7V0FHQSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFiO0VBUFk7OzJCQVlkLHNCQUFBLEdBQXdCLFNBQUE7SUFDdEIsSUFBRyxJQUFDLENBQUEsTUFBRCxLQUFXLE1BQWQ7YUFFRSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBRkY7S0FBQSxNQUdLLElBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxXQUFSLENBQUEsQ0FBSDthQUVILElBQUMsQ0FBQSxZQUFELENBQUEsRUFGRzs7RUFKaUI7OzJCQVN4QixXQUFBLEdBQWEsU0FBQyxNQUFEO1dBQ1gsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQWtCLE1BQWxCO0VBRFc7OzJCQUdiLFVBQUEsR0FBWSxTQUFDLE1BQUQsRUFBUyxLQUFUO0FBQ1YsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLE1BQUosQ0FDTDtNQUFBLEtBQUEsRUFBTyxLQUFQO0tBREs7V0FFUCxJQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakM7RUFIVTs7MkJBS1osVUFBQSxHQUFZLFNBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsT0FBaEI7QUFHVixRQUFBO0lBQUEsSUFBRyxLQUFLLENBQUMsT0FBTixDQUFBLENBQUEsSUFBbUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFLLENBQUMsVUFBbEIsQ0FBNkIsQ0FBQyxNQUE5QixLQUF3QyxDQUE5RDtNQUNFLFFBQUEsR0FBVyxLQUFLLENBQUMsS0FBTixDQUFBO01BQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7aUJBQ1osS0FBQyxDQUFBLFVBQUQsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCO1FBRFk7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQ7YUFFQSxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQUE7QUFDWixZQUFBO1FBQUEsR0FBQSxHQUFNLGlCQUFBLEdBQWtCLE9BQWxCLEdBQTBCO2VBQ2hDLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLEdBQWpDO01BRlksQ0FBZCxFQUpGO0tBQUEsTUFBQTthQVFFLElBQUMsQ0FBQSxVQUFELENBQVksTUFBWixFQUFvQixLQUFwQixFQVJGOztFQUhVOzs7O0dBbkNlOztBQWlEN0IsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLGNBQUEsRUFBZ0IsY0FBaEI7RUFDQSxjQUFBLEVBQWdCLGNBRGhCIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxueyBEZWZhdWx0QXBwbGV0TGF5b3V0IH0gPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxubmF2aWdhdGVfdG9fdXJsID0gcmVxdWlyZSAnLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbnNjcm9sbF90b3BfZmFzdCA9IHJlcXVpcmUgJy4vdXRpbC9zY3JvbGwtdG9wLWZhc3QnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBCYXNlQ29udHJvbGxlciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuT2JqZWN0XG4gIGluaXRfcGFnZTogKCkgLT5cbiAgICAjIGRvIG5vdGhpbmdcbiAgc2Nyb2xsX3RvcDogc2Nyb2xsX3RvcF9mYXN0XG4gIG5hdmlnYXRlX3RvX3VybDogbmF2aWdhdGVfdG9fdXJsXG5cbmNsYXNzIE1haW5Db250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXJcbiAgbGF5b3V0Q2xhc3M6IERlZmF1bHRBcHBsZXRMYXlvdXRcbiAgX2dldF9hcHBsZXQ6IC0+XG4gICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgIGFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICdhcHBsZXQnXG4gICAgXG4gIHNldHVwX2xheW91dDogLT5cbiAgICBAbGF5b3V0ID0gbmV3IEBsYXlvdXRDbGFzc1xuICAgICNjb25zb2xlLmxvZyBcImNyZWF0ZWQgbGF5b3V0XCIsIEBsYXlvdXRcbiAgICBhcHBsZXQgPSBAX2dldF9hcHBsZXQoKVxuICAgIGlmIGFwcGxldC5oYXNWaWV3KClcbiAgICAgICNjb25zb2xlLmxvZyBcImFwcGxldCBoYXMgdmlld1wiXG4gICAgICBhcHBsZXQuZW1wdHkoKVxuICAgIGFwcGxldC5zaG93IEBsYXlvdXRcblxuICAjIHVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYSBsYXlvdXQgb25seSBpZlxuICAjIG5lZWRlZCwgbWFraW5nIHJvdXRpbmcgd2l0aGluIHRoZSBhcHBsZXRcbiAgIyBtb3JlIGVmZmljaWVudC5cbiAgc2V0dXBfbGF5b3V0X2lmX25lZWRlZDogLT5cbiAgICBpZiBAbGF5b3V0IGlzIHVuZGVmaW5lZFxuICAgICAgI2NvbnNvbGUubG9nICdsYXlvdXQgaXMgdW5kZWZpbmVkJ1xuICAgICAgQHNldHVwX2xheW91dCgpXG4gICAgZWxzZSBpZiBAbGF5b3V0LmlzRGVzdHJveWVkKClcbiAgICAgICNjb25zb2xlLmxvZyAnbGF5b3V0IGlzIGRlc3Ryb3llZCAtLS0tLS0+JywgQGxheW91dFxuICAgICAgQHNldHVwX2xheW91dCgpXG4gICAgXG4gIFxuICBfZ2V0X3JlZ2lvbjogKHJlZ2lvbikgLT5cbiAgICBAbGF5b3V0LmdldFJlZ2lvbiByZWdpb25cblxuICBfc2hvd192aWV3OiAodmNsYXNzLCBtb2RlbCkgLT5cbiAgICB2aWV3ID0gbmV3IHZjbGFzc1xuICAgICAgbW9kZWw6IG1vZGVsXG4gICAgQGxheW91dC5zaG93Q2hpbGRWaWV3ICdjb250ZW50Jywgdmlld1xuXG4gIF9sb2FkX3ZpZXc6ICh2Y2xhc3MsIG1vZGVsLCBvYmpuYW1lKSAtPlxuICAgICMgRklYTUVcbiAgICAjIHByZXN1bWUgXCJpZFwiIGlzIG9ubHkgYXR0cmlidXRlIHRoZXJlIGlmIGxlbmd0aCBpcyAxXG4gICAgaWYgbW9kZWwuaXNFbXB0eSgpIG9yIE9iamVjdC5rZXlzKG1vZGVsLmF0dHJpYnV0ZXMpLmxlbmd0aCBpcyAxXG4gICAgICByZXNwb25zZSA9IG1vZGVsLmZldGNoKClcbiAgICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgICAgQF9zaG93X3ZpZXcgdmNsYXNzLCBtb2RlbFxuICAgICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgICBtc2cgPSBcIkZhaWxlZCB0byBsb2FkICN7b2JqbmFtZX0gZGF0YS5cIlxuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBtc2dcbiAgICBlbHNlXG4gICAgICBAX3Nob3dfdmlldyB2Y2xhc3MsIG1vZGVsXG4gICAgICBcbiAgICBcbm1vZHVsZS5leHBvcnRzID1cbiAgQmFzZUNvbnRyb2xsZXI6IEJhc2VDb250cm9sbGVyXG4gIE1haW5Db250cm9sbGVyOiBNYWluQ29udHJvbGxlclxuXG4iXX0=
