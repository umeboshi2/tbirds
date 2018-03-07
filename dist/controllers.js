var $, Backbone, BaseController, DefaultAppletLayout, ExtraController, MainChannel, MainController, Marionette, navigate_to_url, scroll_top_fast;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

({DefaultAppletLayout} = require('./views/layout'));

navigate_to_url = require('./util/navigate-to-url');

scroll_top_fast = require('./util/scroll-top-fast');

MainChannel = Backbone.Radio.channel('global');

BaseController = (function() {
  class BaseController extends Marionette.Object {
    init_page() {}

  };

  // do nothing
  BaseController.prototype.scroll_top = scroll_top_fast;

  BaseController.prototype.navigate_to_url = navigate_to_url;

  return BaseController;

}).call(this);

MainController = (function() {
  class MainController extends BaseController {
    _get_applet() {
      var app;
      app = MainChannel.request('main:app:object');
      return app.getView().getRegion('applet');
    }

    setupLayout() {
      var applet;
      this.layout = new this.layoutClass;
      //console.log "created layout", @layout
      applet = this._get_applet();
      if (applet.hasView()) {
        //console.log "applet has view"
        applet.empty();
      }
      applet.show(this.layout);
    }

    setup_layout() {
      console.warn("don't use setup_layout");
      this.setupLayout();
    }

    
    // use this method to create a layout only if
    // needed, making routing within the applet
    // more efficient.
    setup_layout_if_needed() {
      if (this.layout === void 0) {
        //console.log 'layout is undefined'
        this.setupLayout();
      } else if (this.layout.isDestroyed()) {
        //console.log 'layout is destroyed ------>', @layout
        this.setupLayout();
      }
    }

    _get_region(region) {
      return this.layout.getRegion(region);
    }

    _show_view(vclass, model) {
      var view;
      view = new vclass({
        model: model
      });
      this.layout.showChildView('content', view);
    }

    _load_view(vclass, model, objname) {
      var response;
      // FIXME
      // presume "id" is only attribute there if length is 1
      if (model.isEmpty() || Object.keys(model.attributes).length === 1) {
        response = model.fetch();
        response.done(() => {
          this._show_view(vclass, model);
        });
        response.fail(function() {
          var msg;
          msg = `Failed to load ${objname} data.`;
          MessageChannel.request('danger', msg);
        });
      } else {
        this._show_view(vclass, model);
      }
    }

  };

  MainController.prototype.layoutClass = DefaultAppletLayout;

  return MainController;

}).call(this);

ExtraController = class ExtraController extends BaseController {
  channelName() {
    return this.getOption('channelName') || 'global';
  }

  initialize(options) {
    this.appletName = options.appletName;
    this.applet = MainChannel.request('main:applet:get-applet', this.appletName);
    this.mainController = this.applet.router.controller;
    this.channel = this.getChannel();
  }

  setup_layout_if_needed() {
    this.mainController.setup_layout_if_needed();
  }

  showChildView(region, view) {
    this.mainController.layout.showChildView(region, view);
  }

};

module.exports = {
  BaseController: BaseController,
  MainController: MainController,
  ExtraController: ExtraController
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUEsRUFBQSxRQUFBLEVBQUEsY0FBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsVUFBQSxFQUFBLGVBQUEsRUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRWIsQ0FBQSxDQUFFLG1CQUFGLENBQUEsR0FBMEIsT0FBQSxDQUFRLGdCQUFSLENBQTFCOztBQUVBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHdCQUFSOztBQUNsQixlQUFBLEdBQWtCLE9BQUEsQ0FBUSx3QkFBUjs7QUFFbEIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjtFQUFOLE1BQUEsZUFBQSxRQUE2QixVQUFVLENBQUMsT0FBeEM7SUFDRSxTQUFXLENBQUEsQ0FBQSxFQUFBOztFQURiOzs7MkJBR0UsVUFBQSxHQUFZOzsyQkFDWixlQUFBLEdBQWlCOzs7Ozs7QUFFYjtFQUFOLE1BQUEsZUFBQSxRQUE2QixlQUE3QjtJQUVFLFdBQWEsQ0FBQSxDQUFBO0FBQ1gsVUFBQTtNQUFBLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7YUFDTixHQUFHLENBQUMsT0FBSixDQUFBLENBQWEsQ0FBQyxTQUFkLENBQXdCLFFBQXhCO0lBRlc7O0lBSWIsV0FBYSxDQUFBLENBQUE7QUFDWCxVQUFBO01BQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLElBQUMsQ0FBQSxZQUFmOztNQUVBLE1BQUEsR0FBUyxJQUFDLENBQUEsV0FBRCxDQUFBO01BQ1QsSUFBRyxNQUFNLENBQUMsT0FBUCxDQUFBLENBQUg7O1FBRUUsTUFBTSxD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bmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG57IERlZmF1bHRBcHBsZXRMYXlvdXQgfSA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuc2Nyb2xsX3RvcF9mYXN0ID0gcmVxdWlyZSAnLi91dGlsL3Njcm9sbC10b3AtZmFzdCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIEJhc2VDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5PYmplY3RcbiAgaW5pdF9wYWdlOiAoKSAtPlxuICAgICMgZG8gbm90aGluZ1xuICBzY3JvbGxfdG9wOiBzY3JvbGxfdG9wX2Zhc3RcbiAgbmF2aWdhdGVfdG9fdXJsOiBuYXZpZ2F0ZV90b191cmxcblxuY2xhc3MgTWFpbkNvbnRyb2xsZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlclxuICBsYXlvdXRDbGFzczogRGVmYXVsdEFwcGxldExheW91dFxuICBfZ2V0X2FwcGxldDogLT5cbiAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgYXBwLmdldFZpZXcoKS5nZXRSZWdpb24gJ2FwcGxldCdcbiAgICBcbiAgc2V0dXBMYXlvdXQ6IC0+XG4gICAgQGxheW91dCA9IG5ldyBAbGF5b3V0Q2xhc3NcbiAgICAjY29uc29sZS5sb2cgXCJjcmVhdGVkIGxheW91dFwiLCBAbGF5b3V0XG4gICAgYXBwbGV0ID0gQF9nZXRfYXBwbGV0KClcbiAgICBpZiBhcHBsZXQuaGFzVmlldygpXG4gICAgICAjY29uc29sZS5sb2cgXCJhcHBsZXQgaGFzIHZpZXdcIlxuICAgICAgYXBwbGV0LmVtcHR5KClcbiAgICBhcHBsZXQuc2hvdyBAbGF5b3V0XG4gICAgcmV0dXJuXG4gICAgXG4gIHNldHVwX2xheW91dDogLT5cbiAgICBjb25zb2xlLndhcm4gXCJkb24ndCB1c2Ugc2V0dXBfbGF5b3V0XCJcbiAgICBAc2V0dXBMYXlvdXQoKVxuICAgIHJldHVyblxuICAgIFxuICAjIHVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYSBsYXlvdXQgb25seSBpZlxuICAjIG5lZWRlZCwgbWFraW5nIHJvdXRpbmcgd2l0aGluIHRoZSBhcHBsZXRcbiAgIyBtb3JlIGVmZmljaWVudC5cbiAgc2V0dXBfbGF5b3V0X2lmX25lZWRlZDogLT5cbiAgICBpZiBAbGF5b3V0IGlzIHVuZGVmaW5lZFxuICAgICAgI2NvbnNvbGUubG9nICdsYXlvdXQgaXMgdW5kZWZpbmVkJ1xuICAgICAgQHNldHVwTGF5b3V0KClcbiAgICBlbHNlIGlmIEBsYXlvdXQuaXNEZXN0cm95ZWQoKVxuICAgICAgI2NvbnNvbGUubG9nICdsYXlvdXQgaXMgZGVzdHJveWVkIC0tLS0tLT4nLCBAbGF5b3V0XG4gICAgICBAc2V0dXBMYXlvdXQoKVxuICAgIHJldHVyblxuICBcbiAgX2dldF9yZWdpb246IChyZWdpb24pIC0+XG4gICAgcmV0dXJuIEBsYXlvdXQuZ2V0UmVnaW9uIHJlZ2lvblxuXG4gIF9zaG93X3ZpZXc6ICh2Y2xhc3MsIG1vZGVsKSAtPlxuICAgIHZpZXcgPSBuZXcgdmNsYXNzXG4gICAgICBtb2RlbDogbW9kZWxcbiAgICBAbGF5b3V0LnNob3dDaGlsZFZpZXcgJ2NvbnRlbnQnLCB2aWV3XG4gICAgcmV0dXJuXG4gICAgXG4gIF9sb2FkX3ZpZXc6ICh2Y2xhc3MsIG1vZGVsLCBvYmpuYW1lKSAtPlxuICAgICMgRklYTUVcbiAgICAjIHByZXN1bWUgXCJpZFwiIGlzIG9ubHkgYXR0cmlidXRlIHRoZXJlIGlmIGxlbmd0aCBpcyAxXG4gICAgaWYgbW9kZWwuaXNFbXB0eSgpIG9yIE9iamVjdC5rZXlzKG1vZGVsLmF0dHJpYnV0ZXMpLmxlbmd0aCBpcyAxXG4gICAgICByZXNwb25zZSA9IG1vZGVsLmZldGNoKClcbiAgICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgICAgQF9zaG93X3ZpZXcgdmNsYXNzLCBtb2RlbFxuICAgICAgICByZXR1cm5cbiAgICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgICAgbXNnID0gXCJGYWlsZWQgdG8gbG9hZCAje29iam5hbWV9IGRhdGEuXCJcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgbXNnXG4gICAgICAgIHJldHVyblxuICAgIGVsc2VcbiAgICAgIEBfc2hvd192aWV3IHZjbGFzcywgbW9kZWxcbiAgICByZXR1cm4gIFxuY2xhc3MgRXh0cmFDb250cm9sbGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xsZXJcbiAgY2hhbm5lbE5hbWU6IC0+XG4gICAgcmV0dXJuIEBnZXRPcHRpb24oJ2NoYW5uZWxOYW1lJykgb3IgJ2dsb2JhbCdcbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG4gICAgQGFwcGxldE5hbWUgPSBvcHRpb25zLmFwcGxldE5hbWVcbiAgICBAYXBwbGV0ID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIEBhcHBsZXROYW1lXG4gICAgQG1haW5Db250cm9sbGVyID0gQGFwcGxldC5yb3V0ZXIuY29udHJvbGxlclxuICAgIEBjaGFubmVsID0gQGdldENoYW5uZWwoKVxuICAgIHJldHVyblxuICBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkOiAtPlxuICAgIEBtYWluQ29udHJvbGxlci5zZXR1cF9sYXlvdXRfaWZfbmVlZGVkKClcbiAgICByZXR1cm5cbiAgc2hvd0NoaWxkVmlldzogKHJlZ2lvbiwgdmlldykgLT5cbiAgICBAbWFpbkNvbnRyb2xsZXIubGF5b3V0LnNob3dDaGlsZFZpZXcgcmVnaW9uLCB2aWV3XG4gICAgcmV0dXJuXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJhc2VDb250cm9sbGVyOiBCYXNlQ29udHJvbGxlclxuICBNYWluQ29udHJvbGxlcjogTWFpbkNvbnRyb2xsZXJcbiAgRXh0cmFDb250cm9sbGVyOiBFeHRyYUNvbnRyb2xsZXJcbiAgXG4iXX0=
