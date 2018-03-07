var AppletRouter, MainChannel, Marionette, MessageChannel, RequireController, registered_apps,
  indexOf = [].indexOf;

Marionette = require('backbone.marionette');

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
  registered_apps[appname];
});

RequireController = class RequireController extends Marionette.Object {
  loadFrontDoor() {
    var appname, config, handler;
    config = MainChannel.request('main:app:config');
    appname = (config != null ? config.frontdoorApplet : void 0) || 'frontdoor';
    handler = System.import(`applets/${appname}/main`);
    if (__DEV__) {
      console.log("Frontdoor system.import", appname);
    }
    handler.then((Applet) => {
      var applet;
      applet = new Applet({
        appConfig: config,
        isFrontdoorApplet: true
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
    if (__DEV__) {
      console.log("_handleRoute", appname, suffix);
    }
    config = MainChannel.request('main:app:config');
    if (!appname) {
      console.warn("No applet recognized", appname);
      appname = 'frontdoor';
    }
    if (indexOf.call(Object.keys(config.appletRoutes), appname) >= 0) {
      appname = config.appletRoutes[appname];
      console.log("Using defined appletRoute", appname);
    }
    if (indexOf.call(Object.keys(registered_apps), appname) >= 0) {
      throw new Error(`Unhandled applet path #${appname}/${suffix}`);
    }
    handler = System.import(`applets/${appname}/main`);
    if (__DEV__) {
      console.log("system.import", appname);
    }
    handler.then(function(Applet) {
      var applet;
      applet = new Applet({
        appConfig: config
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
      console.log("directLink", remainder);
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
          console.log("unhandled directLink");
        }
      }
      if (__DEV__) {
        return console.log("MainRouter.onRoute", name, path, args);
      }
    }

  };

  AppletRouter.prototype.appRoutes = {
    'http*remainder': 'directLink',
    ':applet': 'routeApplet',
    ':applet/*path': 'routeApplet'
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

module.exports = {
  RequireController: RequireController,
  AppletRouter: AppletRouter
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsaUJBQUEsRUFBQSxlQUFBO0VBQUE7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCLEVBSGpCOzs7Ozs7Ozs7Ozs7QUFlQSxlQUFBLEdBQWtCLENBQUEsRUFmbEI7Ozs7OztBQXFCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWdCLENBQUEsT0FBQTtBQURtQixDQUE1Qzs7QUFJQSxXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUE7RUFDeEMsZUFBZ0IsQ0FBQSxPQUFBLENBQWhCLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7RUFDMUMsZUFBZ0IsQ0FBQSxPQUFBO0FBRDBCLENBQTVDOztBQUlNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsVUFBVSxDQUFDLE9BQTNDO0VBQ0UsYUFBZSxDQUFBLENBQUE7QUFDYixRQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7SUFBQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsT0FBQSxxQkFBVSxNQUFNLENBQUUseUJBQVIsSUFBMkI7SUFDckMsT0FBQSxHQUFVLE1BQU0sQ0FBQyxNQUFQLENBQWMsQ0FBQSxRQUFBLENBQUEsQ0FBVyxPQUFY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QUFpQkosV0FBVyxDQUFDLEtBQVosQ0FBa0IsZ0JBQWxCLEVBQW9DLFFBQUEsQ0FBQSxDQUFBO0FBQ2xDLE1BQUEsVUFBQSxFQUFBO0VBQUEsVUFBQSxHQUFhLElBQUk7RUFDakIsTUFBQSxHQUFTLElBQUksWUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztFQUVULFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxXQUFPO0VBRDRCLENBQXJDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsYUFBbEIsRUFBaUMsUUFBQSxDQUFBLENBQUE7QUFDL0IsV0FBTztFQUR3QixDQUFqQztBQU5rQyxDQUFwQzs7QUFVQSxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsaUJBQUEsRUFBbUIsaUJBQW5CO0VBQ0EsWUFBQSxFQUFjO0FBRGQiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FXG4jIGFwcGxldHMvYXBwbmFtZS9tYWluIG5lZWRzIHRvIGJlIHJlc29sdmFibGVcbiMgYnkgdXNpbmcgd2VicGFjayByZXNvbHZlIGFsaWFzXG5cbiMgT2JqZWN0IHRvIGNvbnRhaW4gcmVnaXN0ZXJlZCBhcHBsZXRzXG4jIFVzaW5nIHRoaXMgcHJldmVudHMgYSBsb29wIHdoZW4gYSBhcHByb3V0ZVxuIyBpcyByZXF1ZXN0ZWQgYnV0IG5vdCBtYXRjaGVkIGluIGFuIEFwcFJvdXRlclxuIyBVbmxlc3MgdGhlIEFwcFJvdXRlciBoYXMgYSBtYXRjaCBmb3IgdGhlIHJlcXVlc3RlZFxuIyBhcHByb3V0ZSwgdGhlIG1haW4gcm91dGVyIHdpbGwgdHJ5IHRvIGxvYWQgdGhlXG4jIEFwcFJvdXRlciBhZ2FpbiwgY2F1c2luZyBhIGxvb3AuXG5yZWdpc3RlcmVkX2FwcHMgPSB7fVxuXG4jIEZJWE1FXG4jIFRoaXMgaXNuJ3QgYmVpbmcgdXNlZCBjdXJyZW50bHkuICBUaGlzIGlzIGhlcmVcbiMgd2hlbiB0aGUgY29kZSBkZXZlbG9wcyB0byB0aGUgcG9pbnQgb2YgYmVpbmdcbiMgYWJsZSB0byByZW1vdmUgdW51c2VkIGNoaWxkIGFwcHMgdG8gc2F2ZSBtZW1vcnkuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6dW5yZWdpc3RlcicsIChhcHBuYW1lKSAtPlxuICBkZWxldGUgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG4gIHJldHVyblxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIChhcHBuYW1lLCBhcHBsZXQpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXSA9IGFwcGxldFxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIChhcHBuYW1lKSAtPlxuICByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV1cbiAgcmV0dXJuXG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5PYmplY3RcbiAgbG9hZEZyb250RG9vcjogLT5cbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgYXBwbmFtZSA9IGNvbmZpZz8uZnJvbnRkb29yQXBwbGV0IG9yICdmcm9udGRvb3InXG4gICAgaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJGcm9udGRvb3Igc3lzdGVtLmltcG9ydFwiLCBhcHBuYW1lXG4gICAgaGFuZGxlci50aGVuIChBcHBsZXQpID0+XG4gICAgICBhcHBsZXQgPSBuZXcgQXBwbGV0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGlzRnJvbnRkb29yQXBwbGV0OiB0cnVlXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKSB1bmxlc3MgQmFja2JvbmUuaGlzdG9yeS5zdGFydGVkXG4gICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgX2hhbmRsZVJvdXRlOiAoYXBwbmFtZSwgc3VmZml4KSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiX2hhbmRsZVJvdXRlXCIsIGFwcG5hbWUsIHN1ZmZpeFxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBpZiBub3QgYXBwbmFtZVxuICAgICAgY29uc29sZS53YXJuIFwiTm8gYXBwbGV0IHJlY29nbml6ZWRcIiwgYXBwbmFtZVxuICAgICAgYXBwbmFtZSA9ICdmcm9udGRvb3InXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyBjb25maWcuYXBwbGV0Um91dGVzXG4gICAgICBhcHBuYW1lID0gY29uZmlnLmFwcGxldFJvdXRlc1thcHBuYW1lXVxuICAgICAgY29uc29sZS5sb2cgXCJVc2luZyBkZWZpbmVkIGFwcGxldFJvdXRlXCIsIGFwcG5hbWVcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIHJlZ2lzdGVyZWRfYXBwc1xuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVW5oYW5kbGVkIGFwcGxldCBwYXRoICMje2FwcG5hbWV9LyN7c3VmZml4fVwiXG4gICAgaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXRcbiAgICAgICAgYXBwQ29uZmlnOiBjb25maWdcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5sb2FkVXJsKClcbiAgICAgIHJldHVyblxuICAgIC5jYXRjaCAoZXJyKSAtPlxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnQ2Fubm90IGZpbmQgbW9kdWxlJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgXCJCYWQgcm91dGUgI3thcHBuYW1lfSwgI3tzdWZmaXh9ISFcIlxuICAgICAgICByZXR1cm5cbiAgICAgICMgY2F0Y2ggdGhpcyBoZXJlIGZvciBpbml0aWFsIHBhZ2UgbG9hZCB3aXRoIGludmFsaWRcbiAgICAgICMgc3VicGF0aFxuICAgICAgZWxzZSBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IGVyclxuICAgIHJldHVyblxuICAgICAgXG4gIHJvdXRlQXBwbGV0OiAoYXBwbGV0LCBocmVmKSAtPlxuICAgIHRyeVxuICAgICAgQF9oYW5kbGVSb3V0ZSBhcHBsZXQsIGhyZWZcbiAgICBjYXRjaCBlcnJcbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgZGlyZWN0TGluazogKHJlbWFpbmRlcikgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcImRpcmVjdExpbmtcIiwgcmVtYWluZGVyXG4gICAgcmV0dXJuXG4gICAgXG5jbGFzcyBBcHBsZXRSb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJ2h0dHAqcmVtYWluZGVyJzogJ2RpcmVjdExpbmsnXG4gICAgJzphcHBsZXQnIDogJ3JvdXRlQXBwbGV0J1xuICAgICc6YXBwbGV0LypwYXRoJzogJ3JvdXRlQXBwbGV0J1xuXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIG5hbWUgaXMgJ2RpcmVjdExpbmsnXG4gICAgICBpZiBhcmdzLmxlbmd0aCA9PSAyXG4gICAgICAgIGlmIGFyZ3NbMV0gaXNudCBudWxsXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzLmpvaW4oJz8nKX1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzWzBdfVwiXG4gICAgICAgIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2cgXCJ1bmhhbmRsZWQgZGlyZWN0TGlua1wiXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJNYWluUm91dGVyLm9uUm91dGVcIiwgbmFtZSwgcGF0aCwgYXJnc1xuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cm91dGUnLCAoKSAtPlxuICBjb250cm9sbGVyID0gbmV3IFJlcXVpcmVDb250cm9sbGVyXG4gIHJvdXRlciA9IG5ldyBBcHBsZXRSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIHJldHVybiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLXJvdXRlcicsIC0+XG4gICAgcmV0dXJuIHJvdXRlclxuICByZXR1cm5cbiAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIFJlcXVpcmVDb250cm9sbGVyOiBSZXF1aXJlQ29udHJvbGxlclxuICBBcHBsZXRSb3V0ZXI6IEFwcGxldFJvdXRlclxuXG4gIFxuIl19
