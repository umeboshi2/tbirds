var AssetCollection, AssetDocument, Controller, FrontdoorLayout, MainChannel, MainController, MessageChannel, ReadMeModel, frontdoor_template, intro, login_form, tc, urlRoot,
  indexOf = [].indexOf;

import path from 'path';

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

({MainController} = require('../../controllers'));

({login_form} = require('../../templates/forms'));

import SlideDownRegion from '../../regions/slidedown';

import navigate_to_url from '../../util/navigate-to-url';

import {
  BaseAppletLayout
} from '../../views/layout';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

tc = require('teacup');

import LoginView from './loginview';

import FrontDoorMainView from './views/docview';

urlRoot = "/assets/documents";

AssetDocument = class AssetDocument extends Backbone.Model {
  fetch(options) {
    options = options || {};
    options.dataType = 'text';
    return super.fetch(options);
  }

  parse(response) {
    return {
      content: response
    };
  }

};

AssetCollection = (function() {
  class AssetCollection extends Backbone.Collection {};

  AssetCollection.prototype.urlRoot = urlRoot;

  return AssetCollection;

}).call(this);

intro = 'intro';

if (__DEV__) {
  intro = 'intro-dev';
}

ReadMeModel = (function() {
  class ReadMeModel extends AssetDocument {};

  ReadMeModel.prototype.url = `/assets/documents/${intro}.md`;

  return ReadMeModel;

}).call(this);

frontdoor_template = tc.renderable(function() {
  //tc.div '#main-content.col-sm-10.col-sm-offset-1'
  return tc.div('.row', function() {
    return tc.div('#main-content');
  });
});

FrontdoorLayout = (function() {
  class FrontdoorLayout extends BaseAppletLayout {
    regions() {
      return {
        content: new SlideDownRegion({
          el: '#main-content',
          speed: 'slow'
        })
      };
    }

  };

  FrontdoorLayout.prototype.template = frontdoor_template;

  return FrontdoorLayout;

}).call(this);

Controller = (function() {
  class Controller extends MainController {
    setupLayoutIfNeeded() {
      super.setupLayoutIfNeeded();
      return this.layout.controller = this;
    }

    _viewResource(doc) {
      var view;
      this.setupLayoutIfNeeded();
      view = new FrontDoorMainView({
        model: doc
      });
      return this.layout.showChildView('content', view);
    }

    _viewLogin() {
      var view;
      view = new LoginView;
      return this.layout.showChildView('content', view);
    }

    frontdoor_needuser() {
      var token;
      token = MainChannel.request('main:app:decode-auth-token');
      if (indexOf.call(Object.keys(token), 'name') >= 0) {
        return this.frontdoor_hasuser(token);
      } else {
        return this.show_login();
      }
    }

    showLogin() {
      this.setupLayoutIfNeeded();
      return this._viewLogin();
    }

    showLogout() {
      MainChannel.request('main:app:destroy-auth-token');
      SiteNavChannel.request('set-index-entries');
      return navigate_to_url('#');
    }

    frontdoor_hasuser(user) {
      return this.defaultView();
    }

    viewPage(name) {
      var model, response;
      if (__DEV__) {
        console.log("NAME IS", name);
      }
      this.setupLayoutIfNeeded();
      model = MainChannel.request('main:app:get-document', name);
      response = model.fetch();
      response.done(() => {
        return this._viewResource(model);
      });
      return response.fail(function() {
        return MessageChannel.request('warning', `failed to get ${name}`);
      });
    }

    defaultView() {
      this.setupLayoutIfNeeded();
      //@show_login()
      return this.view_readme();
    }

    frontdoor() {
      var config;
      config = MainChannel.request('main:app:config');
      if (config != null ? config.needLogin : void 0) {
        return this.frontdoor_needuser();
      } else {
        return this.defaultView();
      }
    }

  };

  Controller.prototype.layoutClass = FrontdoorLayout;

  return Controller;

}).call(this);

export default Controller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxlQUFBLEVBQUEsYUFBQSxFQUFBLFVBQUEsRUFBQSxlQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLGtCQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxFQUFBLEVBQUEsT0FBQTtFQUFBOztBQUFBLE9BQU8sSUFBUCxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFFQSxDQUFBLENBQUUsY0FBRixDQUFBLEdBQXFCLE9BQUEsQ0FBUSxtQkFBUixDQUFyQjs7QUFDQSxDQUFBLENBQUUsVUFBRixDQUFBLEdBQWlCLE9BQUEsQ0FBUSx1QkFBUixDQUFqQjs7QUFDQSxPQUFPLGVBQVAsTUFBQTs7QUFDQSxPQUFPLGVBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsZ0JBQVQ7Q0FBQSxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRWpCLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxPQUFPLFNBQVAsTUFBQTs7QUFDQSxPQUFPLGlCQUFQLE1BQUE7O0FBRUEsT0FBQSxHQUFVOztBQUVKLGdCQUFOLE1BQUEsY0FBQSxRQUE0QixRQUFRLENBQUMsTUFBckM7RUFDRSxLQUFPLENBQUMsT0FBRCxDQUFBO0lBQ0wsT0FBQSxHQUFVLE9BQUEsSUFBVyxDQUFBO0lBQ3JCLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO2dCQUZyQixDQUFBLEtBR0UsQ0FBTSxPQUFOO0VBSEs7O0VBSVAsS0FBTyxDQUFDLFFBQUQs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VCxDQUFjLFFBQUEsQ0FBQSxDQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsQ0FBQSxjQUFBLENBQUEsQ0FBaUIsSUFBakIsQ0FBQSxDQUFsQztNQURZLENBQWQ7SUFSUTs7SUFXVixXQUFhLENBQUEsQ0FBQTtNQUNYLElBQUMsQ0FBQSxtQkFBRCxDQUFBLEVBQUE7O2FBRUEsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUhXOztJQUtiLFNBQVcsQ0FBQSxDQUFBO0FBQ1QsVUFBQTtNQUFBLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7TUFDVCxxQkFBRyxNQUFNLENBQUUsa0JBQVg7ZUFDRSxJQUFDLENBQUEsa0JBQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxXQUFELENBQUEsRUFIRjs7SUFGUzs7RUFwRGI7O3VCQUNFLFdBQUEsR0FBYTs7Ozs7O0FBMERmLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxueyBNYWluQ29udHJvbGxlciB9ID0gcmVxdWlyZSAnLi4vLi4vY29udHJvbGxlcnMnXG57IGxvZ2luX2Zvcm0gfSA9IHJlcXVpcmUgJy4uLy4uL3RlbXBsYXRlcy9mb3JtcydcbmltcG9ydCBTbGlkZURvd25SZWdpb24gZnJvbSAnLi4vLi4vcmVnaW9ucy9zbGlkZWRvd24nXG5pbXBvcnQgbmF2aWdhdGVfdG9fdXJsIGZyb20gJy4uLy4uL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuaW1wb3J0IHsgQmFzZUFwcGxldExheW91dCB9IGZyb20gJy4uLy4uL3ZpZXdzL2xheW91dCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuaW1wb3J0IExvZ2luVmlldyBmcm9tICcuL2xvZ2ludmlldydcbmltcG9ydCBGcm9udERvb3JNYWluVmlldyBmcm9tICcuL3ZpZXdzL2RvY3ZpZXcnXG5cbnVybFJvb3QgPSBcIi9hc3NldHMvZG9jdW1lbnRzXCJcblxuY2xhc3MgQXNzZXREb2N1bWVudCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGZldGNoOiAob3B0aW9ucykgLT5cbiAgICBvcHRpb25zID0gb3B0aW9ucyBvciB7fVxuICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAndGV4dCdcbiAgICBzdXBlciBvcHRpb25zXG4gIHBhcnNlOiAocmVzcG9uc2UpIC0+XG4gICAgY29udGVudDogcmVzcG9uc2VcblxuY2xhc3MgQXNzZXRDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICB1cmxSb290OiB1cmxSb290XG5cbmludHJvID0gJ2ludHJvJ1xuaWYgX19ERVZfX1xuICBpbnRybyA9ICdpbnRyby1kZXYnXG5jbGFzcyBSZWFkTWVNb2RlbCBleHRlbmRzIEFzc2V0RG9jdW1lbnRcbiAgdXJsOiBcIi9hc3NldHMvZG9jdW1lbnRzLyN7aW50cm99Lm1kXCJcblxuZnJvbnRkb29yX3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAoKSAtPlxuICAjdGMuZGl2ICcjbWFpbi1jb250ZW50LmNvbC1zbS0xMC5jb2wtc20tb2Zmc2V0LTEnXG4gIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgdGMuZGl2ICcjbWFpbi1jb250ZW50J1xuXG5jbGFzcyBGcm9udGRvb3JMYXlvdXQgZXh0ZW5kcyBCYXNlQXBwbGV0TGF5b3V0XG4gIHRlbXBsYXRlOiBmcm9udGRvb3JfdGVtcGxhdGVcbiAgcmVnaW9uczogLT5cbiAgICBjb250ZW50OiBuZXcgU2xpZGVEb3duUmVnaW9uXG4gICAgICBlbDogJyNtYWluLWNvbnRlbnQnXG4gICAgICBzcGVlZDogJ3Nsb3cnXG5cbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYWluQ29udHJvbGxlclxuICBsYXlvdXRDbGFzczogRnJvbnRkb29yTGF5b3V0XG5cbiAgc2V0dXBMYXlvdXRJZk5lZWRlZDogLT5cbiAgICBzdXBlcigpXG4gICAgQGxheW91dC5jb250cm9sbGVyID0gQFxuICAgIFxuICBfdmlld1Jlc291cmNlOiAoZG9jKSAtPlxuICAgIEBzZXR1cExheW91dElmTmVlZGVkKClcbiAgICB2aWV3ID0gbmV3IEZyb250RG9vck1haW5WaWV3XG4gICAgICBtb2RlbDogZG9jXG4gICAgQGxheW91dC5zaG93Q2hpbGRWaWV3ICdjb250ZW50Jywgdmlld1xuXG4gIF92aWV3TG9naW46IC0+XG4gICAgdmlldyA9IG5ldyBMb2dpblZpZXdcbiAgICBAbGF5b3V0LnNob3dDaGlsZFZpZXcgJ2NvbnRlbnQnLCB2aWV3XG4gICAgXG4gIGZyb250ZG9vcl9uZWVkdXNlcjogLT5cbiAgICB0b2tlbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlY29kZS1hdXRoLXRva2VuJ1xuICAgIGlmICduYW1lJyBpbiBPYmplY3Qua2V5cyB0b2tlblxuICAgICAgQGZyb250ZG9vcl9oYXN1c2VyIHRva2VuXG4gICAgZWxzZVxuICAgICAgQHNob3dfbG9naW4oKVxuICAgICAgXG4gIHNob3dMb2dpbjogLT5cbiAgICBAc2V0dXBMYXlvdXRJZk5lZWRlZCgpXG4gICAgQF92aWV3TG9naW4oKVxuICAgIFxuICBzaG93TG9nb3V0OiAtPlxuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmRlc3Ryb3ktYXV0aC10b2tlbidcbiAgICBTaXRlTmF2Q2hhbm5lbC5yZXF1ZXN0ICdzZXQtaW5kZXgtZW50cmllcydcbiAgICBuYXZpZ2F0ZV90b191cmwgJyMnXG4gICAgXG4gIGZyb250ZG9vcl9oYXN1c2VyOiAodXNlcikgLT5cbiAgICBAZGVmYXVsdFZpZXcoKVxuXG4gIHZpZXdQYWdlOiAobmFtZSkgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIk5BTUUgSVNcIiwgbmFtZVxuICAgIEBzZXR1cExheW91dElmTmVlZGVkKClcbiAgICBtb2RlbCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmdldC1kb2N1bWVudCcsIG5hbWVcbiAgICByZXNwb25zZSA9IG1vZGVsLmZldGNoKClcbiAgICByZXNwb25zZS5kb25lID0+XG4gICAgICBAX3ZpZXdSZXNvdXJjZSBtb2RlbFxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBcImZhaWxlZCB0byBnZXQgI3tuYW1lfVwiXG4gICAgXG4gIGRlZmF1bHRWaWV3OiAtPlxuICAgIEBzZXR1cExheW91dElmTmVlZGVkKClcbiAgICAjQHNob3dfbG9naW4oKVxuICAgIEB2aWV3X3JlYWRtZSgpXG4gICAgXG4gIGZyb250ZG9vcjogLT5cbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgaWYgY29uZmlnPy5uZWVkTG9naW5cbiAgICAgIEBmcm9udGRvb3JfbmVlZHVzZXIoKVxuICAgIGVsc2VcbiAgICAgIEBkZWZhdWx0VmlldygpXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXJcblxuIl19
