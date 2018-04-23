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
    if (__DEV__) {
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
    if (__DEV__) {
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
      console.log("Using defined appletRoute", appname);
    }
    if (indexOf.call(Object.keys(registered_apps), appname) >= 0) {
      throw new Error(`Unhandled applet path #${appname}/${suffix}`);
    }
    //handler = System.import "applets/#{appname}/main"
    handler = import(`applets/${appname}/main`);
    if (__DEV__) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCLEVBSGpCOzs7Ozs7Ozs7Ozs7QUFlQSxlQUFBLEdBQWtCLENBQUEsRUFmbEI7Ozs7OztBQXFCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWdCLENBQUEsT0FBQTtBQURtQixDQUE1Qzs7QUFJQSxXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUE7RUFDeEMsZUFBZ0IsQ0FBQSxPQUFBLENBQWhCLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDMUMsU0FBTyxlQUFnQixDQUFBLE9BQUE7QUFEbUIsQ0FBNUMsRUE3QkE7Ozs7O0FBb0NNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsVUFBVSxDQUFDLE9BQTNDO0VBQ0UsYUFBZSxDQUFBLENBQUE7QUFDYixRQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7SUFBQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsT0FBQSxxQkFBVSxNQUFNLENBQUUseUJBQVIsSUFBMkIsWUFEckM7O0lBR0EsT0FBQSxHQUFVO0lBQ1YsSUFBRyxPQUFIO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFB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QSxJQUFHLE9BQUg7ZUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDLEVBQThDLElBQTlDLEVBREY7O0lBVk87O0VBSlg7O3lCQUNFLFNBQUEsR0FDRTtJQUFBLGdCQUFBLEVBQWtCLFlBQWxCO0lBQ0EsY0FBQSxFQUFnQjtFQURoQjs7Ozs7O0FBZUosV0FBVyxDQUFDLEtBQVosQ0FBa0IsZ0JBQWxCLEVBQW9DLFFBQUEsQ0FBQSxDQUFBO0FBQ2xDLE1BQUEsVUFBQSxFQUFBO0VBQUEsVUFBQSxHQUFhLElBQUk7RUFDakIsTUFBQSxHQUFTLElBQUksWUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztFQUVULFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxXQUFPO0VBRDRCLENBQXJDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsYUFBbEIsRUFBaUMsUUFBQSxDQUFBLENBQUE7QUFDL0IsV0FBTztFQUR3QixDQUFqQztBQU5rQyxDQUFwQzs7QUFVQSxPQUFBO0VBQ0UsaUJBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FXG4jIGFwcGxldHMvYXBwbmFtZS9tYWluIG5lZWRzIHRvIGJlIHJlc29sdmFibGVcbiMgYnkgdXNpbmcgd2VicGFjayByZXNvbHZlIGFsaWFzXG5cbiMgT2JqZWN0IHRvIGNvbnRhaW4gcmVnaXN0ZXJlZCBhcHBsZXRzXG4jIFVzaW5nIHRoaXMgcHJldmVudHMgYSBsb29wIHdoZW4gYSBhcHByb3V0ZVxuIyBpcyByZXF1ZXN0ZWQgYnV0IG5vdCBtYXRjaGVkIGluIGFuIEFwcFJvdXRlclxuIyBVbmxlc3MgdGhlIEFwcFJvdXRlciBoYXMgYSBtYXRjaCBmb3IgdGhlIHJlcXVlc3RlZFxuIyBhcHByb3V0ZSwgdGhlIG1haW4gcm91dGVyIHdpbGwgdHJ5IHRvIGxvYWQgdGhlXG4jIEFwcFJvdXRlciBhZ2FpbiwgY2F1c2luZyBhIGxvb3AuXG5yZWdpc3RlcmVkX2FwcHMgPSB7fVxuXG4jIEZJWE1FXG4jIFRoaXMgaXNuJ3QgYmVpbmcgdXNlZCBjdXJyZW50bHkuICBUaGlzIGlzIGhlcmVcbiMgd2hlbiB0aGUgY29kZSBkZXZlbG9wcyB0byB0aGUgcG9pbnQgb2YgYmVpbmdcbiMgYWJsZSB0byByZW1vdmUgdW51c2VkIGNoaWxkIGFwcHMgdG8gc2F2ZSBtZW1vcnkuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6dW5yZWdpc3RlcicsIChhcHBuYW1lKSAtPlxuICBkZWxldGUgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG4gIHJldHVyblxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIChhcHBuYW1lLCBhcHBsZXQpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXSA9IGFwcGxldFxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIChhcHBuYW1lKSAtPlxuICByZXR1cm4gcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG5cbiMgRklYTUU6IFVzaW5nIGJhY2t0aWNrcyBmb3IgaW1wb3J0KCkgc3RhdGVtZW50cy4gSW5uZXJcbiMganMgYmFja3RpY2tzIGFyZSBlc2NhcGVkIGZvciBkeW5hbWljIGV4cHJlc3Npb25zLlxuIyBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL2NvZmZlZXNjcmlwdC9pc3N1ZXMvNDgzNCNpc3N1ZWNvbW1lbnQtMzU0Mzc1NjI3XG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5PYmplY3RcbiAgbG9hZEZyb250RG9vcjogLT5cbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgYXBwbmFtZSA9IGNvbmZpZz8uZnJvbnRkb29yQXBwbGV0IG9yICdmcm9udGRvb3InXG4gICAgI2hhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGhhbmRsZXIgPSBgaW1wb3J0KFxcYGFwcGxldHMvJHthcHBuYW1lfS9tYWluXFxgKWBcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIkZyb250ZG9vciBzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGlzRnJvbnRkb29yQXBwbGV0OiB0cnVlXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKSB1bmxlc3MgQmFja2JvbmUuaGlzdG9yeS5zdGFydGVkXG4gICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgX2hhbmRsZVJvdXRlOiAoYXBwbmFtZSwgc3VmZml4KSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiX2hhbmRsZVJvdXRlXCIsIGFwcG5hbWUsIHN1ZmZpeFxuICAgIGlmIHN1ZmZpeCBhbmQgc3VmZml4LnN0YXJ0c1dpdGggJy8nXG4gICAgICB3aGlsZSBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgICAgY29uc29sZS5sb2cgXCJTdWZmaXguU3RhcnRzd2l0aFwiLCBzdWZmaXhcbiAgICAgICAgc3VmZml4ID0gc3VmZml4LnNsaWNlIDFcbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgaWYgbm90IGFwcG5hbWVcbiAgICAgIGNvbnNvbGUud2FybiBcIk5vIGFwcGxldCByZWNvZ25pemVkXCIsIGFwcG5hbWVcbiAgICAgIGFwcG5hbWUgPSAnZnJvbnRkb29yJ1xuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgY29uZmlnLmFwcGxldFJvdXRlc1xuICAgICAgYXBwbmFtZSA9IGNvbmZpZy5hcHBsZXRSb3V0ZXNbYXBwbmFtZV1cbiAgICAgIGNvbnNvbGUubG9nIFwiVXNpbmcgZGVmaW5lZCBhcHBsZXRSb3V0ZVwiLCBhcHBuYW1lXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyByZWdpc3RlcmVkX2FwcHNcbiAgICAgIHRocm93IG5ldyBFcnJvciBcIlVuaGFuZGxlZCBhcHBsZXQgcGF0aCAjI3thcHBuYW1lfS8je3N1ZmZpeH1cIlxuICAgICNoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBoYW5kbGVyID0gYGltcG9ydChcXGBhcHBsZXRzLyR7YXBwbmFtZX0vbWFpblxcYClgXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJhY2tib25lLmhpc3RvcnkubG9hZFVybCgpXG4gICAgICByZXR1cm5cbiAgICAuY2F0Y2ggKGVycikgLT5cbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ0Nhbm5vdCBmaW5kIG1vZHVsZSdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIFwiQmFkIHJvdXRlICN7YXBwbmFtZX0sICN7c3VmZml4fSEhXCJcbiAgICAgICAgcmV0dXJuXG4gICAgICAjIGNhdGNoIHRoaXMgaGVyZSBmb3IgaW5pdGlhbCBwYWdlIGxvYWQgd2l0aCBpbnZhbGlkXG4gICAgICAjIHN1YnBhdGhcbiAgICAgIGVsc2UgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnVW5oYW5kbGVkIGFwcGxldCdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIGVyci5tZXNzYWdlXG4gICAgICAgIHJldHVyblxuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBlcnJcbiAgICByZXR1cm5cbiAgICAgIFxuICByb3V0ZUFwcGxldDogKGFwcGxldCwgaHJlZikgLT5cbiAgICB0cnlcbiAgICAgIEBfaGFuZGxlUm91dGUgYXBwbGV0LCBocmVmXG4gICAgY2F0Y2ggZXJyXG4gICAgICBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuXG4gICAgcmV0dXJuXG4gICAgXG4gIGRpcmVjdExpbms6IChyZW1haW5kZXIpIC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS53YXJuIFwiZGlyZWN0TGlua1wiLCByZW1haW5kZXJcbiAgICByZXR1cm5cbiAgICBcbmNsYXNzIEFwcGxldFJvdXRlciBleHRlbmRzIE1hcmlvbmV0dGUuQXBwUm91dGVyXG4gIGFwcFJvdXRlczpcbiAgICAnaHR0cCpyZW1haW5kZXInOiAnZGlyZWN0TGluaydcbiAgICAnOmFwcGxldCpwYXRoJzogJ3JvdXRlQXBwbGV0J1xuICBvblJvdXRlOiAobmFtZSwgcGF0aCwgYXJncykgLT5cbiAgICBpZiBuYW1lIGlzICdkaXJlY3RMaW5rJ1xuICAgICAgaWYgYXJncy5sZW5ndGggPT0gMlxuICAgICAgICBpZiBhcmdzWzFdIGlzbnQgbnVsbFxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJncy5qb2luKCc/Jyl9XCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJnc1swXX1cIlxuICAgICAgICB3aW5kb3cub3BlbiB1cmwsICdfYmxhbmsnXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUubG9nIFwidW5oYW5kbGVkIGRpcmVjdExpbmtcIlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiTWFpblJvdXRlci5vblJvdXRlXCIsIG5hbWUsIHBhdGgsIGFyZ3NcblxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnJvdXRlJywgKCkgLT5cbiAgY29udHJvbGxlciA9IG5ldyBSZXF1aXJlQ29udHJvbGxlclxuICByb3V0ZXIgPSBuZXcgQXBwbGV0Um91dGVyXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1jb250cm9sbGVyJywgLT5cbiAgICByZXR1cm4gY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1yb3V0ZXInLCAtPlxuICAgIHJldHVybiByb3V0ZXJcbiAgcmV0dXJuXG5cbmV4cG9ydCB7XG4gIFJlcXVpcmVDb250cm9sbGVyXG4gIEFwcGxldFJvdXRlclxuICB9XG4iXX0=
