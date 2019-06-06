var Controller, FrontdoorLayout, MainChannel, MainController, MessageChannel, frontdoor_template, login_form, tc,
  indexOf = [].indexOf;

import path from 'path';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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

frontdoor_template = tc.renderable(function() {
  return tc.div('#main-content.col-sm-12');
});

FrontdoorLayout = (function() {
  class FrontdoorLayout extends Backbone.Marionette.View {
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

    _view_resource(doc) {
      this.setup_layout_if_needed();
      return require.ensure([], () => {
        var FrontDoorMainView, view;
        ({FrontDoorMainView} = require('./views'));
        view = new FrontDoorMainView({
          model: doc
        });
        return this.layout.showChildView('content', view);
      // name the chunk
      }, 'frontdoor-main-view');
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
      return navigate_to_url('/');
    }

    frontdoor_hasuser(user) {
      return this.defaultView();
    }

    viewPage(name) {
      var model, response;
      console.log("NAME IS", name);
      this.setupLayoutIfNeeded();
      model = MainChannel.request('main:app:get-document', name);
      //model = new AssetDocument()
      //model.url = path.join urlRoot, name
      console.log("MODEL IS", model);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxVQUFBLEVBQUEsZUFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsY0FBQSxFQUFBLGtCQUFBLEVBQUEsVUFBQSxFQUFBLEVBQUE7RUFBQTs7QUFBQSxPQUFPLElBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxDQUFBLENBQUUsY0FBRixDQUFBLEdBQXFCLE9BQUEsQ0FBUSxtQkFBUixDQUFyQjs7QUFDQSxDQUFBLENBQUUsVUFBRixDQUFBLEdBQWlCLE9BQUEsQ0FBUSx1QkFBUixDQUFqQjs7QUFDQSxPQUFPLGVBQVAsTUFBQTs7QUFDQSxPQUFPLGVBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsZ0JBQVQ7Q0FBQSxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRWpCLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxrQkFBQSxHQUFxQixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1NBQ2pDLEVBQUUsQ0FBQyxHQUFILENBQU8seUJBQVA7QUFEaUMsQ0FBZDs7QUFHZjtFQUFOLE1BQUEsZ0JBQUEsUUFBOEIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFsRDtJQUVFLE9BQVMsQ0FBQSxDQUFBO2FBQ1A7UUFBQSxPQUFBLEVBQVMsSUFBSSxlQUFKLENBQ1A7VUFBQSxFQUFBLEVBQUksZUFBSjtVQUNBLEtBQUEsRUFBTztRQURQLENBRE87TUFBVDtJQURPOztFQUZYOzs0QkFDRSxRQUFBLEdBQVU7Ozs7OztBQU9OO0VBQU4s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QUUsa0JBQVg7ZUFDRSxJQUFDLENBQUEsa0JBQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxXQUFELENBQUEsRUFIRjs7SUFGUzs7RUEvRGI7O3VCQUNFLFdBQUEsR0FBYTs7Ozs7O0FBc0VmLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG57IE1haW5Db250cm9sbGVyIH0gPSByZXF1aXJlICcuLi8uLi9jb250cm9sbGVycydcbnsgbG9naW5fZm9ybSB9ID0gcmVxdWlyZSAnLi4vLi4vdGVtcGxhdGVzL2Zvcm1zJ1xuaW1wb3J0IFNsaWRlRG93blJlZ2lvbiBmcm9tICcuLi8uLi9yZWdpb25zL3NsaWRlZG93bidcbmltcG9ydCBuYXZpZ2F0ZV90b191cmwgZnJvbSAnLi4vLi4vdXRpbC9uYXZpZ2F0ZS10by11cmwnXG5pbXBvcnQgeyBCYXNlQXBwbGV0TGF5b3V0IH0gZnJvbSAnLi4vLi4vdmlld3MvbGF5b3V0J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5mcm9udGRvb3JfdGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gIHRjLmRpdiAnI21haW4tY29udGVudC5jb2wtc20tMTInXG4gIFxuY2xhc3MgRnJvbnRkb29yTGF5b3V0IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBmcm9udGRvb3JfdGVtcGxhdGVcbiAgcmVnaW9uczogLT5cbiAgICBjb250ZW50OiBuZXcgU2xpZGVEb3duUmVnaW9uXG4gICAgICBlbDogJyNtYWluLWNvbnRlbnQnXG4gICAgICBzcGVlZDogJ3Nsb3cnXG4gIFxuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFpbkNvbnRyb2xsZXJcbiAgbGF5b3V0Q2xhc3M6IEZyb250ZG9vckxheW91dFxuICBcbiAgc2V0dXBMYXlvdXRJZk5lZWRlZDogLT5cbiAgICBzdXBlcigpXG4gICAgQGxheW91dC5jb250cm9sbGVyID0gQFxuICAgIFxuICBfdmlld1Jlc291cmNlOiAoZG9jKSAtPlxuICAgIEBzZXR1cExheW91dElmTmVlZGVkKClcbiAgICB2aWV3ID0gbmV3IEZyb250RG9vck1haW5WaWV3XG4gICAgICBtb2RlbDogZG9jXG4gICAgQGxheW91dC5zaG93Q2hpbGRWaWV3ICdjb250ZW50Jywgdmlld1xuXG4gIF92aWV3TG9naW46IC0+XG4gICAgdmlldyA9IG5ldyBMb2dpblZpZXdcbiAgICBAbGF5b3V0LnNob3dDaGlsZFZpZXcgJ2NvbnRlbnQnLCB2aWV3XG4gICAgXG4gIF92aWV3X3Jlc291cmNlOiAoZG9jKSAtPlxuICAgIEBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkKClcbiAgICByZXF1aXJlLmVuc3VyZSBbXSwgKCkgPT5cbiAgICAgIHsgRnJvbnREb29yTWFpblZpZXcgfSA9IHJlcXVpcmUgJy4vdmlld3MnXG4gICAgICB2aWV3ID0gbmV3IEZyb250RG9vck1haW5WaWV3XG4gICAgICAgIG1vZGVsOiBkb2NcbiAgICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICAjIG5hbWUgdGhlIGNodW5rXG4gICAgLCAnZnJvbnRkb29yLW1haW4tdmlldydcbiAgICBcbiAgZnJvbnRkb29yX25lZWR1c2VyOiAtPlxuICAgIHRva2VuID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW4nXG4gICAgaWYgJ25hbWUnIGluIE9iamVjdC5rZXlzIHRva2VuXG4gICAgICBAZnJvbnRkb29yX2hhc3VzZXIgdG9rZW5cbiAgICBlbHNlXG4gICAgICBAc2hvd19sb2dpbigpXG4gICAgICBcbiAgc2hvd0xvZ2luOiAtPlxuICAgIEBzZXR1cExheW91dElmTmVlZGVkKClcbiAgICBAX3ZpZXdMb2dpbigpXG4gICAgXG4gIHNob3dMb2dvdXQ6IC0+XG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZGVzdHJveS1hdXRoLXRva2VuJ1xuICAgIG5hdmlnYXRlX3RvX3VybCAnLydcbiAgICBcbiAgZnJvbnRkb29yX2hhc3VzZXI6ICh1c2VyKSAtPlxuICAgIEBkZWZhdWx0VmlldygpXG5cbiAgdmlld1BhZ2U6IChuYW1lKSAtPlxuICAgIGNvbnNvbGUubG9nIFwiTkFNRSBJU1wiLCBuYW1lXG4gICAgQHNldHVwTGF5b3V0SWZOZWVkZWQoKVxuICAgIG1vZGVsID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Z2V0LWRvY3VtZW50JywgbmFtZVxuICAgICNtb2RlbCA9IG5ldyBBc3NldERvY3VtZW50KClcbiAgICAjbW9kZWwudXJsID0gcGF0aC5qb2luIHVybFJvb3QsIG5hbWVcbiAgICBjb25zb2xlLmxvZyBcIk1PREVMIElTXCIsIG1vZGVsXG4gICAgcmVzcG9uc2UgPSBtb2RlbC5mZXRjaCgpXG4gICAgcmVzcG9uc2UuZG9uZSA9PlxuICAgICAgQF92aWV3UmVzb3VyY2UgbW9kZWxcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgXCJmYWlsZWQgdG8gZ2V0ICN7bmFtZX1cIlxuICAgIFxuICBkZWZhdWx0VmlldzogLT5cbiAgICBAc2V0dXBMYXlvdXRJZk5lZWRlZCgpXG4gICAgI0BzaG93X2xvZ2luKClcbiAgICBAdmlld19yZWFkbWUoKVxuICAgIFxuICBmcm9udGRvb3I6IC0+XG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGlmIGNvbmZpZz8ubmVlZExvZ2luXG4gICAgICBAZnJvbnRkb29yX25lZWR1c2VyKClcbiAgICBlbHNlXG4gICAgICBAZGVmYXVsdFZpZXcoKVxuICAgICAgXG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXJcbiJdfQ==
