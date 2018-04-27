var AppletRouter, MainChannel, MessageChannel, RequireController, registered_apps,
  indexOf = [].indexOf;

import Marionette from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

// FIXME
// applets/appname/main needs to be resolvable
// by using webpack resolve alias

// Object to contain registered applets
// Using this prevents a loop when a approute
// is requested but not matched in an AppRouter
// Unless the AppRouter has a match for the requested
// approute, the main router will try to load the
// AppRouter again, causing a loop.
registered_apps = {};

// FIXME
// This isn't being used currently.  This is here
// when the code develops to the point of being
// able to remove unused child apps to save memory.
MainChannel.reply('main:applet:unregister', function(appname) {
  delete registered_apps[appname];
});

MainChannel.reply('main:applet:register', function(appname, applet) {
  registered_apps[appname] = applet;
});

MainChannel.reply('main:applet:get-applet', function(appname) {
  return registered_apps[appname];
});

// FIXME: Using backticks for import() statements. Inner
// js backticks are escaped for dynamic expressions.
// https://github.com/jashkenas/coffeescript/issues/4834#issuecomment-354375627
RequireController = class RequireController extends Marionette.Object {
  loadFrontDoor() {
    var appname, config, handler;
    config = MainChannel.request('main:app:config');
    appname = (config != null ? config.frontdoorApplet : void 0) || 'frontdoor';
    //handler = System.import "applets/#{appname}/main"
    handler = import(`applets/${appname}/main`);
    if (__DEV__ && DEBUG) {
      console.log("Frontdoor system.import", appname);
    }
    handler.then(function(Applet) {
      var applet;
      // FIXME fix applet structure to provide appropriate export
      applet = new Applet.default({
        appConfig: config,
        appName: appname,
        isFrontdoorApplet: true,
        channelName: appname
      });
      MainChannel.request('main:applet:register', appname, applet);
      applet.start();
      if (!Backbone.history.started) {
        Backbone.history.start();
      }
    });
  }

  _handleRoute(appname, suffix) {
    var config, handler;
    if (__DEV__ && DEBUG) {
      console.log("_handleRoute", appname, suffix);
    }
    if (suffix && suffix.startsWith('/')) {
      while (suffix.startsWith('/')) {
        console.log("Suffix.Startswith", suffix);
        suffix = suffix.slice(1);
      }
    }
    config = MainChannel.request('main:app:config');
    if (!appname) {
      console.warn("No applet recognized", appname);
      appname = 'frontdoor';
    }
    if (indexOf.call(Object.keys(config.appletRoutes), appname) >= 0) {
      appname = config.appletRoutes[appname];
      if (__DEV__) {
        console.log("Using defined appletRoute", appname);
      }
    }
    if (indexOf.call(Object.keys(registered_apps), appname) >= 0) {
      throw new Error(`Unhandled applet path #${appname}/${suffix}`);
    }
    //handler = System.import "applets/#{appname}/main"
    handler = import(`applets/${appname}/main`);
    if (__DEV__ && DEBUG) {
      console.log("system.import", appname);
    }
    handler.then(function(Applet) {
      var applet;
      // FIXME fix applet structure to provide appropriate export
      applet = new Applet.default({
        appConfig: config,
        appName: appname,
        channelName: appname
      });
      MainChannel.request('main:applet:register', appname, applet);
      applet.start();
      Backbone.history.loadUrl();
    }).catch(function(err) {
      if (err.message.startsWith('Cannot find module')) {
        MessageChannel.request('warning', `Bad route ${appname}, ${suffix}!!`);
      // catch this here for initial page load with invalid
      // subpath
      } else if (err.message.startsWith('Unhandled applet')) {
        MessageChannel.request('warning', err.message);
      } else {
        throw err;
      }
    });
  }

  routeApplet(applet, href) {
    var err;
    try {
      this._handleRoute(applet, href);
    } catch (error) {
      err = error;
      if (err.message.startsWith('Unhandled applet')) {
        MessageChannel.request('warning', err.message);
        return;
      }
    }
  }

  directLink(remainder) {
    if (__DEV__) {
      console.warn("directLink", remainder);
    }
  }

};

AppletRouter = (function() {
  class AppletRouter extends Marionette.AppRouter {
    onRoute(name, path, args) {
      var url;
      if (name === 'directLink') {
        if (args.length === 2) {
          if (args[1] !== null) {
            url = `http${args.join('?')}`;
          } else {
            url = `http${args[0]}`;
          }
          window.open(url, '_blank');
        } else {
          console.warn("unhandled directLink");
        }
      }
      if (__DEV__ && DEBUG) {
        return console.log("MainRouter.onRoute", name, path, args);
      }
    }

  };

  AppletRouter.prototype.appRoutes = {
    'http*remainder': 'directLink',
    ':applet*path': 'routeApplet'
  };

  return AppletRouter;

}).call(this);

MainChannel.reply('main:app:route', function() {
  var controller, router;
  controller = new RequireController;
  router = new AppletRouter({
    controller: controller
  });
  MainChannel.reply('main-controller', function() {
    return controller;
  });
  MainChannel.reply('main-router', function() {
    return router;
  });
});

export {
  RequireController,
  AppletRouter
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCLEVBSGpCOzs7Ozs7Ozs7Ozs7QUFlQSxlQUFBLEdBQWtCLENBQUEsRUFmbEI7Ozs7OztBQXFCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWdCLENBQUEsT0FBQTtBQURtQixDQUE1Qzs7QUFJQSxXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUE7RUFDeEMsZUFBZ0IsQ0FBQSxPQUFBLENBQWhCLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDMUMsU0FBTyxlQUFnQixDQUFBLE9BQUE7QUFEbUIsQ0FBNUMsRUE3QkE7Ozs7O0FBb0NNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsVUFBVSxDQUFDLE9BQTNDO0VBQ0UsYUFBZSxDQUFBLENBQUE7QUFDYixRQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7SUFBQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsT0FBQSxxQkFBVSxNQUFNLENBQUUseUJBQVIsSUFBMkIsWUFEckM7O0lBR0EsT0FBQSxHQUFVO0lBQ1YsSUFBRyxPQUFBLElBQVksS0FBZjtNQUNFLE9BQU8sQ0FBQyxHQUFS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TUFBQTtVQU9FLE9BQU8sQ0FBQyxJQUFSLENBQWEsc0JBQWIsRUFQRjtTQURGOztNQVNBLElBQUcsT0FBQSxJQUFZLEtBQWY7ZUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDLEVBQThDLElBQTlDLEVBREY7O0lBVk87O0VBSlg7O3lCQUNFLFNBQUEsR0FDRTtJQUFBLGdCQUFBLEVBQWtCLFlBQWxCO0lBQ0EsY0FBQSxFQUFnQjtFQURoQjs7Ozs7O0FBZUosV0FBVyxDQUFDLEtBQVosQ0FBa0IsZ0JBQWxCLEVBQW9DLFFBQUEsQ0FBQSxDQUFBO0FBQ2xDLE1BQUEsVUFBQSxFQUFBO0VBQUEsVUFBQSxHQUFhLElBQUk7RUFDakIsTUFBQSxHQUFTLElBQUksWUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztFQUVULFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxXQUFPO0VBRDRCLENBQXJDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsYUFBbEIsRUFBaUMsUUFBQSxDQUFBLENBQUE7QUFDL0IsV0FBTztFQUR3QixDQUFqQztBQU5rQyxDQUFwQzs7QUFVQSxPQUFBO0VBQ0UsaUJBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FXG4jIGFwcGxldHMvYXBwbmFtZS9tYWluIG5lZWRzIHRvIGJlIHJlc29sdmFibGVcbiMgYnkgdXNpbmcgd2VicGFjayByZXNvbHZlIGFsaWFzXG5cbiMgT2JqZWN0IHRvIGNvbnRhaW4gcmVnaXN0ZXJlZCBhcHBsZXRzXG4jIFVzaW5nIHRoaXMgcHJldmVudHMgYSBsb29wIHdoZW4gYSBhcHByb3V0ZVxuIyBpcyByZXF1ZXN0ZWQgYnV0IG5vdCBtYXRjaGVkIGluIGFuIEFwcFJvdXRlclxuIyBVbmxlc3MgdGhlIEFwcFJvdXRlciBoYXMgYSBtYXRjaCBmb3IgdGhlIHJlcXVlc3RlZFxuIyBhcHByb3V0ZSwgdGhlIG1haW4gcm91dGVyIHdpbGwgdHJ5IHRvIGxvYWQgdGhlXG4jIEFwcFJvdXRlciBhZ2FpbiwgY2F1c2luZyBhIGxvb3AuXG5yZWdpc3RlcmVkX2FwcHMgPSB7fVxuXG4jIEZJWE1FXG4jIFRoaXMgaXNuJ3QgYmVpbmcgdXNlZCBjdXJyZW50bHkuICBUaGlzIGlzIGhlcmVcbiMgd2hlbiB0aGUgY29kZSBkZXZlbG9wcyB0byB0aGUgcG9pbnQgb2YgYmVpbmdcbiMgYWJsZSB0byByZW1vdmUgdW51c2VkIGNoaWxkIGFwcHMgdG8gc2F2ZSBtZW1vcnkuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6dW5yZWdpc3RlcicsIChhcHBuYW1lKSAtPlxuICBkZWxldGUgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG4gIHJldHVyblxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIChhcHBuYW1lLCBhcHBsZXQpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXSA9IGFwcGxldFxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIChhcHBuYW1lKSAtPlxuICByZXR1cm4gcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG5cbiMgRklYTUU6IFVzaW5nIGJhY2t0aWNrcyBmb3IgaW1wb3J0KCkgc3RhdGVtZW50cy4gSW5uZXJcbiMganMgYmFja3RpY2tzIGFyZSBlc2NhcGVkIGZvciBkeW5hbWljIGV4cHJlc3Npb25zLlxuIyBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL2NvZmZlZXNjcmlwdC9pc3N1ZXMvNDgzNCNpc3N1ZWNvbW1lbnQtMzU0Mzc1NjI3XG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5PYmplY3RcbiAgbG9hZEZyb250RG9vcjogLT5cbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgYXBwbmFtZSA9IGNvbmZpZz8uZnJvbnRkb29yQXBwbGV0IG9yICdmcm9udGRvb3InXG4gICAgI2hhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGhhbmRsZXIgPSBgaW1wb3J0KFxcYGFwcGxldHMvJHthcHBuYW1lfS9tYWluXFxgKWBcbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJGcm9udGRvb3Igc3lzdGVtLmltcG9ydFwiLCBhcHBuYW1lXG4gICAgaGFuZGxlci50aGVuIChBcHBsZXQpIC0+XG4gICAgICAjIEZJWE1FIGZpeCBhcHBsZXQgc3RydWN0dXJlIHRvIHByb3ZpZGUgYXBwcm9wcmlhdGUgZXhwb3J0XG4gICAgICBhcHBsZXQgPSBuZXcgQXBwbGV0LmRlZmF1bHRcbiAgICAgICAgYXBwQ29uZmlnOiBjb25maWdcbiAgICAgICAgYXBwTmFtZTogYXBwbmFtZVxuICAgICAgICBpc0Zyb250ZG9vckFwcGxldDogdHJ1ZVxuICAgICAgICBjaGFubmVsTmFtZTogYXBwbmFtZVxuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCBhcHBuYW1lLCBhcHBsZXRcbiAgICAgIGFwcGxldC5zdGFydCgpXG4gICAgICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCkgdW5sZXNzIEJhY2tib25lLmhpc3Rvcnkuc3RhcnRlZFxuICAgICAgcmV0dXJuXG4gICAgcmV0dXJuXG4gICAgXG4gIF9oYW5kbGVSb3V0ZTogKGFwcG5hbWUsIHN1ZmZpeCkgLT5cbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJfaGFuZGxlUm91dGVcIiwgYXBwbmFtZSwgc3VmZml4XG4gICAgaWYgc3VmZml4IGFuZCBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgIHdoaWxlIHN1ZmZpeC5zdGFydHNXaXRoICcvJ1xuICAgICAgICBjb25zb2xlLmxvZyBcIlN1ZmZpeC5TdGFydHN3aXRoXCIsIHN1ZmZpeFxuICAgICAgICBzdWZmaXggPSBzdWZmaXguc2xpY2UgMVxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBpZiBub3QgYXBwbmFtZVxuICAgICAgY29uc29sZS53YXJuIFwiTm8gYXBwbGV0IHJlY29nbml6ZWRcIiwgYXBwbmFtZVxuICAgICAgYXBwbmFtZSA9ICdmcm9udGRvb3InXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyBjb25maWcuYXBwbGV0Um91dGVzXG4gICAgICBhcHBuYW1lID0gY29uZmlnLmFwcGxldFJvdXRlc1thcHBuYW1lXVxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcIlVzaW5nIGRlZmluZWQgYXBwbGV0Um91dGVcIiwgYXBwbmFtZVxuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgcmVnaXN0ZXJlZF9hcHBzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJVbmhhbmRsZWQgYXBwbGV0IHBhdGggIyN7YXBwbmFtZX0vI3tzdWZmaXh9XCJcbiAgICAjaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaGFuZGxlciA9IGBpbXBvcnQoXFxgYXBwbGV0cy8ke2FwcG5hbWV9L21haW5cXGApYFxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcInN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgICAgY2hhbm5lbE5hbWU6IGFwcG5hbWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5sb2FkVXJsKClcbiAgICAgIHJldHVyblxuICAgIC5jYXRjaCAoZXJyKSAtPlxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnQ2Fubm90IGZpbmQgbW9kdWxlJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgXCJCYWQgcm91dGUgI3thcHBuYW1lfSwgI3tzdWZmaXh9ISFcIlxuICAgICAgICByZXR1cm5cbiAgICAgICMgY2F0Y2ggdGhpcyBoZXJlIGZvciBpbml0aWFsIHBhZ2UgbG9hZCB3aXRoIGludmFsaWRcbiAgICAgICMgc3VicGF0aFxuICAgICAgZWxzZSBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IGVyclxuICAgIHJldHVyblxuICAgICAgXG4gIHJvdXRlQXBwbGV0OiAoYXBwbGV0LCBocmVmKSAtPlxuICAgIHRyeVxuICAgICAgQF9oYW5kbGVSb3V0ZSBhcHBsZXQsIGhyZWZcbiAgICBjYXRjaCBlcnJcbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgZGlyZWN0TGluazogKHJlbWFpbmRlcikgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLndhcm4gXCJkaXJlY3RMaW5rXCIsIHJlbWFpbmRlclxuICAgIHJldHVyblxuICAgIFxuY2xhc3MgQXBwbGV0Um91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICdodHRwKnJlbWFpbmRlcic6ICdkaXJlY3RMaW5rJ1xuICAgICc6YXBwbGV0KnBhdGgnOiAncm91dGVBcHBsZXQnXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIG5hbWUgaXMgJ2RpcmVjdExpbmsnXG4gICAgICBpZiBhcmdzLmxlbmd0aCA9PSAyXG4gICAgICAgIGlmIGFyZ3NbMV0gaXNudCBudWxsXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzLmpvaW4oJz8nKX1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzWzBdfVwiXG4gICAgICAgIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS53YXJuIFwidW5oYW5kbGVkIGRpcmVjdExpbmtcIlxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIk1haW5Sb3V0ZXIub25Sb3V0ZVwiLCBuYW1lLCBwYXRoLCBhcmdzXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpyb3V0ZScsICgpIC0+XG4gIGNvbnRyb2xsZXIgPSBuZXcgUmVxdWlyZUNvbnRyb2xsZXJcbiAgcm91dGVyID0gbmV3IEFwcGxldFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW4tY29udHJvbGxlcicsIC0+XG4gICAgcmV0dXJuIGNvbnRyb2xsZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW4tcm91dGVyJywgLT5cbiAgICByZXR1cm4gcm91dGVyXG4gIHJldHVyblxuXG5leHBvcnQge1xuICBSZXF1aXJlQ29udHJvbGxlclxuICBBcHBsZXRSb3V0ZXJcbiAgfVxuIl19
