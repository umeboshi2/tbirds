var AppletRouter, MainChannel, MessageChannel, RequireController, registered_apps,
  indexOf = [].indexOf;

import {
  MnObject
} from 'backbone.marionette';

import AppRouter from 'marionette.approuter';

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
RequireController = class RequireController extends MnObject {
  loadFrontDoor() {
    var appname, config, handler;
    config = MainChannel.request('main:app:config');
    appname = (config != null ? config.frontdoorApplet : void 0) || 'frontdoor';
    //handler = System.import "applets/#{appname}/main"
    handler = import(`applets/${appname}/main`); // noqa
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
    handler = import(`applets/${appname}/main`); // noqa
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
  class AppletRouter extends AppRouter {
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

MainChannel.reply('main:app:create-main-router', function() {
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

MainChannel.reply('main:app:route', function() {
  console.warn("Use 'main:app:create-main-router' instead.");
  return MainChannel.request('main:app:create-main-router');
});

export {
  RequireController,
  AppletRouter
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2QixFQUpqQjs7Ozs7Ozs7Ozs7O0FBZ0JBLGVBQUEsR0FBa0IsQ0FBQSxFQWhCbEI7Ozs7OztBQXNCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWdCLENBQUEsT0FBQTtBQURtQixDQUE1Qzs7QUFJQSxXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUE7RUFDeEMsZUFBZ0IsQ0FBQSxPQUFBLENBQWhCLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDMUMsU0FBTyxlQUFnQixDQUFBLE9BQUE7QUFEbUIsQ0FBNUMsRUE5QkE7Ozs7O0FBcUNNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsU0FBaEM7RUFDRSxhQUFlLENBQUEsQ0FBQTtBQUNiLFFBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtJQUFBLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7SUFDVCxPQUFBLHFCQUFVLE1BQU0sQ0FBRSx5QkFBUixJQUEyQixZQURyQzs7SUFHQSxPQUFBLEdBQVUsa0NBSFY7SUFJQSxJQUFHLE9BQUEs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R0FBWixFQUFpQixRQUFqQixFQUxGO1NBQUEsTUFBQTtVQU9FLE9BQU8sQ0FBQyxJQUFSLENBQWEsc0JBQWIsRUFQRjtTQURGOztNQVNBLElBQUcsT0FBQSxJQUFZLEtBQWY7ZUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDLEVBQThDLElBQTlDLEVBREY7O0lBVk87O0VBSlg7O3lCQUNFLFNBQUEsR0FDRTtJQUFBLGdCQUFBLEVBQWtCLFlBQWxCO0lBQ0EsY0FBQSxFQUFnQjtFQURoQjs7Ozs7O0FBZUosV0FBVyxDQUFDLEtBQVosQ0FBa0IsNkJBQWxCLEVBQWlELFFBQUEsQ0FBQSxDQUFBO0FBQy9DLE1BQUEsVUFBQSxFQUFBO0VBQUEsVUFBQSxHQUFhLElBQUk7RUFDakIsTUFBQSxHQUFTLElBQUksWUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztFQUVULFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxXQUFPO0VBRDRCLENBQXJDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsYUFBbEIsRUFBaUMsUUFBQSxDQUFBLENBQUE7QUFDL0IsV0FBTztFQUR3QixDQUFqQztBQU4rQyxDQUFqRDs7QUFXQSxXQUFXLENBQUMsS0FBWixDQUFrQixnQkFBbEIsRUFBb0MsUUFBQSxDQUFBLENBQUE7RUFDbEMsT0FBTyxDQUFDLElBQVIsQ0FBYSw0Q0FBYjtTQUNBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDZCQUFwQjtBQUZrQyxDQUFwQzs7QUFHQSxPQUFBO0VBQ0UsaUJBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW5PYmplY3QgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IEFwcFJvdXRlciBmcm9tICdtYXJpb25ldHRlLmFwcHJvdXRlcidcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FXG4jIGFwcGxldHMvYXBwbmFtZS9tYWluIG5lZWRzIHRvIGJlIHJlc29sdmFibGVcbiMgYnkgdXNpbmcgd2VicGFjayByZXNvbHZlIGFsaWFzXG5cbiMgT2JqZWN0IHRvIGNvbnRhaW4gcmVnaXN0ZXJlZCBhcHBsZXRzXG4jIFVzaW5nIHRoaXMgcHJldmVudHMgYSBsb29wIHdoZW4gYSBhcHByb3V0ZVxuIyBpcyByZXF1ZXN0ZWQgYnV0IG5vdCBtYXRjaGVkIGluIGFuIEFwcFJvdXRlclxuIyBVbmxlc3MgdGhlIEFwcFJvdXRlciBoYXMgYSBtYXRjaCBmb3IgdGhlIHJlcXVlc3RlZFxuIyBhcHByb3V0ZSwgdGhlIG1haW4gcm91dGVyIHdpbGwgdHJ5IHRvIGxvYWQgdGhlXG4jIEFwcFJvdXRlciBhZ2FpbiwgY2F1c2luZyBhIGxvb3AuXG5yZWdpc3RlcmVkX2FwcHMgPSB7fVxuXG4jIEZJWE1FXG4jIFRoaXMgaXNuJ3QgYmVpbmcgdXNlZCBjdXJyZW50bHkuICBUaGlzIGlzIGhlcmVcbiMgd2hlbiB0aGUgY29kZSBkZXZlbG9wcyB0byB0aGUgcG9pbnQgb2YgYmVpbmdcbiMgYWJsZSB0byByZW1vdmUgdW51c2VkIGNoaWxkIGFwcHMgdG8gc2F2ZSBtZW1vcnkuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6dW5yZWdpc3RlcicsIChhcHBuYW1lKSAtPlxuICBkZWxldGUgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG4gIHJldHVyblxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIChhcHBuYW1lLCBhcHBsZXQpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXSA9IGFwcGxldFxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIChhcHBuYW1lKSAtPlxuICByZXR1cm4gcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG5cbiMgRklYTUU6IFVzaW5nIGJhY2t0aWNrcyBmb3IgaW1wb3J0KCkgc3RhdGVtZW50cy4gSW5uZXJcbiMganMgYmFja3RpY2tzIGFyZSBlc2NhcGVkIGZvciBkeW5hbWljIGV4cHJlc3Npb25zLlxuIyBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL2NvZmZlZXNjcmlwdC9pc3N1ZXMvNDgzNCNpc3N1ZWNvbW1lbnQtMzU0Mzc1NjI3XG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgTW5PYmplY3RcbiAgbG9hZEZyb250RG9vcjogLT5cbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgYXBwbmFtZSA9IGNvbmZpZz8uZnJvbnRkb29yQXBwbGV0IG9yICdmcm9udGRvb3InXG4gICAgI2hhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGhhbmRsZXIgPSBgaW1wb3J0KFxcYGFwcGxldHMvJHthcHBuYW1lfS9tYWluXFxgKWAgIyBub3FhXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiRnJvbnRkb29yIHN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgICAgaXNGcm9udGRvb3JBcHBsZXQ6IHRydWVcbiAgICAgICAgY2hhbm5lbE5hbWU6IGFwcG5hbWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpIHVubGVzcyBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0ZWRcbiAgICAgIHJldHVyblxuICAgIHJldHVyblxuICAgIFxuICBfaGFuZGxlUm91dGU6IChhcHBuYW1lLCBzdWZmaXgpIC0+XG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiX2hhbmRsZVJvdXRlXCIsIGFwcG5hbWUsIHN1ZmZpeFxuICAgIGlmIHN1ZmZpeCBhbmQgc3VmZml4LnN0YXJ0c1dpdGggJy8nXG4gICAgICB3aGlsZSBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgICAgY29uc29sZS5sb2cgXCJTdWZmaXguU3RhcnRzd2l0aFwiLCBzdWZmaXhcbiAgICAgICAgc3VmZml4ID0gc3VmZml4LnNsaWNlIDFcbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgaWYgbm90IGFwcG5hbWVcbiAgICAgIGNvbnNvbGUud2FybiBcIk5vIGFwcGxldCByZWNvZ25pemVkXCIsIGFwcG5hbWVcbiAgICAgIGFwcG5hbWUgPSAnZnJvbnRkb29yJ1xuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgY29uZmlnLmFwcGxldFJvdXRlc1xuICAgICAgYXBwbmFtZSA9IGNvbmZpZy5hcHBsZXRSb3V0ZXNbYXBwbmFtZV1cbiAgICAgIGlmIF9fREVWX19cbiAgICAgICAgY29uc29sZS5sb2cgXCJVc2luZyBkZWZpbmVkIGFwcGxldFJvdXRlXCIsIGFwcG5hbWVcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIHJlZ2lzdGVyZWRfYXBwc1xuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVW5oYW5kbGVkIGFwcGxldCBwYXRoICMje2FwcG5hbWV9LyN7c3VmZml4fVwiXG4gICAgI2hhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGhhbmRsZXIgPSBgaW1wb3J0KFxcYGFwcGxldHMvJHthcHBuYW1lfS9tYWluXFxgKWAgIyBub3FhXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwic3lzdGVtLmltcG9ydFwiLCBhcHBuYW1lXG4gICAgaGFuZGxlci50aGVuIChBcHBsZXQpIC0+XG4gICAgICAjIEZJWE1FIGZpeCBhcHBsZXQgc3RydWN0dXJlIHRvIHByb3ZpZGUgYXBwcm9wcmlhdGUgZXhwb3J0XG4gICAgICBhcHBsZXQgPSBuZXcgQXBwbGV0LmRlZmF1bHRcbiAgICAgICAgYXBwQ29uZmlnOiBjb25maWdcbiAgICAgICAgYXBwTmFtZTogYXBwbmFtZVxuICAgICAgICBjaGFubmVsTmFtZTogYXBwbmFtZVxuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCBhcHBuYW1lLCBhcHBsZXRcbiAgICAgIGFwcGxldC5zdGFydCgpXG4gICAgICBCYWNrYm9uZS5oaXN0b3J5LmxvYWRVcmwoKVxuICAgICAgcmV0dXJuXG4gICAgLmNhdGNoIChlcnIpIC0+XG4gICAgICBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdDYW5ub3QgZmluZCBtb2R1bGUnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBcIkJhZCByb3V0ZSAje2FwcG5hbWV9LCAje3N1ZmZpeH0hIVwiXG4gICAgICAgIHJldHVyblxuICAgICAgIyBjYXRjaCB0aGlzIGhlcmUgZm9yIGluaXRpYWwgcGFnZSBsb2FkIHdpdGggaW52YWxpZFxuICAgICAgIyBzdWJwYXRoXG4gICAgICBlbHNlIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgcmV0dXJuXG4gICAgICBcbiAgcm91dGVBcHBsZXQ6IChhcHBsZXQsIGhyZWYpIC0+XG4gICAgdHJ5XG4gICAgICBAX2hhbmRsZVJvdXRlIGFwcGxldCwgaHJlZlxuICAgIGNhdGNoIGVyclxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnVW5oYW5kbGVkIGFwcGxldCdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIGVyci5tZXNzYWdlXG4gICAgICAgIHJldHVyblxuICAgIHJldHVyblxuICAgIFxuICBkaXJlY3RMaW5rOiAocmVtYWluZGVyKSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUud2FybiBcImRpcmVjdExpbmtcIiwgcmVtYWluZGVyXG4gICAgcmV0dXJuXG4gICAgXG5jbGFzcyBBcHBsZXRSb3V0ZXIgZXh0ZW5kcyBBcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICdodHRwKnJlbWFpbmRlcic6ICdkaXJlY3RMaW5rJ1xuICAgICc6YXBwbGV0KnBhdGgnOiAncm91dGVBcHBsZXQnXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIG5hbWUgaXMgJ2RpcmVjdExpbmsnXG4gICAgICBpZiBhcmdzLmxlbmd0aCA9PSAyXG4gICAgICAgIGlmIGFyZ3NbMV0gaXNudCBudWxsXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzLmpvaW4oJz8nKX1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzWzBdfVwiXG4gICAgICAgIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS53YXJuIFwidW5oYW5kbGVkIGRpcmVjdExpbmtcIlxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIk1haW5Sb3V0ZXIub25Sb3V0ZVwiLCBuYW1lLCBwYXRoLCBhcmdzXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjcmVhdGUtbWFpbi1yb3V0ZXInLCAtPlxuICBjb250cm9sbGVyID0gbmV3IFJlcXVpcmVDb250cm9sbGVyXG4gIHJvdXRlciA9IG5ldyBBcHBsZXRSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIHJldHVybiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLXJvdXRlcicsIC0+XG4gICAgcmV0dXJuIHJvdXRlclxuICByZXR1cm5cblxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cm91dGUnLCAtPlxuICBjb25zb2xlLndhcm4gXCJVc2UgJ21haW46YXBwOmNyZWF0ZS1tYWluLXJvdXRlcicgaW5zdGVhZC5cIlxuICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjcmVhdGUtbWFpbi1yb3V0ZXInXG5leHBvcnQge1xuICBSZXF1aXJlQ29udHJvbGxlclxuICBBcHBsZXRSb3V0ZXJcbiAgfVxuIl19
