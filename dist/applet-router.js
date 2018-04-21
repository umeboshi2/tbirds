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
        appName: appname
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCLEVBSGpCOzs7Ozs7Ozs7Ozs7QUFlQSxlQUFBLEdBQWtCLENBQUEsRUFmbEI7Ozs7OztBQXFCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWdCLENBQUEsT0FBQTtBQURtQixDQUE1Qzs7QUFJQSxXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUE7RUFDeEMsZUFBZ0IsQ0FBQSxPQUFBLENBQWhCLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDMUMsU0FBTyxlQUFnQixDQUFBLE9BQUE7QUFEbUIsQ0FBNUMsRUE3QkE7Ozs7O0FBb0NNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsVUFBVSxDQUFDLE9BQTNDO0VBQ0UsYUFBZSxDQUFBLENBQUE7QUFDYixRQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7SUFBQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsT0FBQSxxQkFBVSxNQUFNLENBQUUseUJBQVIsSUFBMkIsWUFEckM7O0lBR0EsT0FBQSxHQUFVO0lBQ1YsSUFBRyxPQUFIO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFB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QVosRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEMsRUFBOEMsSUFBOUMsRUFERjs7SUFWTzs7RUFKWDs7eUJBQ0UsU0FBQSxHQUNFO0lBQUEsZ0JBQUEsRUFBa0IsWUFBbEI7SUFDQSxjQUFBLEVBQWdCO0VBRGhCOzs7Ozs7QUFlSixXQUFXLENBQUMsS0FBWixDQUFrQixnQkFBbEIsRUFBb0MsUUFBQSxDQUFBLENBQUE7QUFDbEMsTUFBQSxVQUFBLEVBQUE7RUFBQSxVQUFBLEdBQWEsSUFBSTtFQUNqQixNQUFBLEdBQVMsSUFBSSxZQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVk7RUFBWixDQURPO0VBRVQsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFFBQUEsQ0FBQSxDQUFBO0FBQ25DLFdBQU87RUFENEIsQ0FBckM7RUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQixhQUFsQixFQUFpQyxRQUFBLENBQUEsQ0FBQTtBQUMvQixXQUFPO0VBRHdCLENBQWpDO0FBTmtDLENBQXBDOztBQVVBLE9BQUE7RUFDRSxpQkFERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiMgRklYTUVcbiMgYXBwbGV0cy9hcHBuYW1lL21haW4gbmVlZHMgdG8gYmUgcmVzb2x2YWJsZVxuIyBieSB1c2luZyB3ZWJwYWNrIHJlc29sdmUgYWxpYXNcblxuIyBPYmplY3QgdG8gY29udGFpbiByZWdpc3RlcmVkIGFwcGxldHNcbiMgVXNpbmcgdGhpcyBwcmV2ZW50cyBhIGxvb3Agd2hlbiBhIGFwcHJvdXRlXG4jIGlzIHJlcXVlc3RlZCBidXQgbm90IG1hdGNoZWQgaW4gYW4gQXBwUm91dGVyXG4jIFVubGVzcyB0aGUgQXBwUm91dGVyIGhhcyBhIG1hdGNoIGZvciB0aGUgcmVxdWVzdGVkXG4jIGFwcHJvdXRlLCB0aGUgbWFpbiByb3V0ZXIgd2lsbCB0cnkgdG8gbG9hZCB0aGVcbiMgQXBwUm91dGVyIGFnYWluLCBjYXVzaW5nIGEgbG9vcC5cbnJlZ2lzdGVyZWRfYXBwcyA9IHt9XG5cbiMgRklYTUVcbiMgVGhpcyBpc24ndCBiZWluZyB1c2VkIGN1cnJlbnRseS4gIFRoaXMgaXMgaGVyZVxuIyB3aGVuIHRoZSBjb2RlIGRldmVsb3BzIHRvIHRoZSBwb2ludCBvZiBiZWluZ1xuIyBhYmxlIHRvIHJlbW92ZSB1bnVzZWQgY2hpbGQgYXBwcyB0byBzYXZlIG1lbW9yeS5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDp1bnJlZ2lzdGVyJywgKGFwcG5hbWUpIC0+XG4gIGRlbGV0ZSByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV1cbiAgcmV0dXJuXG4gIFxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgKGFwcG5hbWUsIGFwcGxldCkgLT5cbiAgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdID0gYXBwbGV0XG4gIHJldHVyblxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpnZXQtYXBwbGV0JywgKGFwcG5hbWUpIC0+XG4gIHJldHVybiByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV1cblxuIyBGSVhNRTogVXNpbmcgYmFja3RpY2tzIGZvciBpbXBvcnQoKSBzdGF0ZW1lbnRzLiBJbm5lclxuIyBqcyBiYWNrdGlja3MgYXJlIGVzY2FwZWQgZm9yIGR5bmFtaWMgZXhwcmVzc2lvbnMuXG4jIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvY29mZmVlc2NyaXB0L2lzc3Vlcy80ODM0I2lzc3VlY29tbWVudC0zNTQzNzU2MjdcblxuY2xhc3MgUmVxdWlyZUNvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLk9iamVjdFxuICBsb2FkRnJvbnREb29yOiAtPlxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBhcHBuYW1lID0gY29uZmlnPy5mcm9udGRvb3JBcHBsZXQgb3IgJ2Zyb250ZG9vcidcbiAgICAjaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaGFuZGxlciA9IGBpbXBvcnQoXFxgYXBwbGV0cy8ke2FwcG5hbWV9L21haW5cXGApYFxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiRnJvbnRkb29yIHN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgICAgaXNGcm9udGRvb3JBcHBsZXQ6IHRydWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpIHVubGVzcyBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0ZWRcbiAgICAgIHJldHVyblxuICAgIHJldHVyblxuICAgIFxuICBfaGFuZGxlUm91dGU6IChhcHBuYW1lLCBzdWZmaXgpIC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJfaGFuZGxlUm91dGVcIiwgYXBwbmFtZSwgc3VmZml4XG4gICAgaWYgc3VmZml4IGFuZCBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgIHdoaWxlIHN1ZmZpeC5zdGFydHNXaXRoICcvJ1xuICAgICAgICBjb25zb2xlLmxvZyBcIlN1ZmZpeC5TdGFydHN3aXRoXCIsIHN1ZmZpeFxuICAgICAgICBzdWZmaXggPSBzdWZmaXguc2xpY2UgMVxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBpZiBub3QgYXBwbmFtZVxuICAgICAgY29uc29sZS53YXJuIFwiTm8gYXBwbGV0IHJlY29nbml6ZWRcIiwgYXBwbmFtZVxuICAgICAgYXBwbmFtZSA9ICdmcm9udGRvb3InXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyBjb25maWcuYXBwbGV0Um91dGVzXG4gICAgICBhcHBuYW1lID0gY29uZmlnLmFwcGxldFJvdXRlc1thcHBuYW1lXVxuICAgICAgY29uc29sZS5sb2cgXCJVc2luZyBkZWZpbmVkIGFwcGxldFJvdXRlXCIsIGFwcG5hbWVcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIHJlZ2lzdGVyZWRfYXBwc1xuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVW5oYW5kbGVkIGFwcGxldCBwYXRoICMje2FwcG5hbWV9LyN7c3VmZml4fVwiXG4gICAgI2hhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGhhbmRsZXIgPSBgaW1wb3J0KFxcYGFwcGxldHMvJHthcHBuYW1lfS9tYWluXFxgKWBcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcInN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5sb2FkVXJsKClcbiAgICAgIHJldHVyblxuICAgIC5jYXRjaCAoZXJyKSAtPlxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnQ2Fubm90IGZpbmQgbW9kdWxlJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgXCJCYWQgcm91dGUgI3thcHBuYW1lfSwgI3tzdWZmaXh9ISFcIlxuICAgICAgICByZXR1cm5cbiAgICAgICMgY2F0Y2ggdGhpcyBoZXJlIGZvciBpbml0aWFsIHBhZ2UgbG9hZCB3aXRoIGludmFsaWRcbiAgICAgICMgc3VicGF0aFxuICAgICAgZWxzZSBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IGVyclxuICAgIHJldHVyblxuICAgICAgXG4gIHJvdXRlQXBwbGV0OiAoYXBwbGV0LCBocmVmKSAtPlxuICAgIHRyeVxuICAgICAgQF9oYW5kbGVSb3V0ZSBhcHBsZXQsIGhyZWZcbiAgICBjYXRjaCBlcnJcbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgZGlyZWN0TGluazogKHJlbWFpbmRlcikgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLndhcm4gXCJkaXJlY3RMaW5rXCIsIHJlbWFpbmRlclxuICAgIHJldHVyblxuICAgIFxuY2xhc3MgQXBwbGV0Um91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICdodHRwKnJlbWFpbmRlcic6ICdkaXJlY3RMaW5rJ1xuICAgICc6YXBwbGV0KnBhdGgnOiAncm91dGVBcHBsZXQnXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIG5hbWUgaXMgJ2RpcmVjdExpbmsnXG4gICAgICBpZiBhcmdzLmxlbmd0aCA9PSAyXG4gICAgICAgIGlmIGFyZ3NbMV0gaXNudCBudWxsXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzLmpvaW4oJz8nKX1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzWzBdfVwiXG4gICAgICAgIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2cgXCJ1bmhhbmRsZWQgZGlyZWN0TGlua1wiXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJNYWluUm91dGVyLm9uUm91dGVcIiwgbmFtZSwgcGF0aCwgYXJnc1xuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cm91dGUnLCAoKSAtPlxuICBjb250cm9sbGVyID0gbmV3IFJlcXVpcmVDb250cm9sbGVyXG4gIHJvdXRlciA9IG5ldyBBcHBsZXRSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIHJldHVybiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLXJvdXRlcicsIC0+XG4gICAgcmV0dXJuIHJvdXRlclxuICByZXR1cm5cblxuZXhwb3J0IHtcbiAgUmVxdWlyZUNvbnRyb2xsZXJcbiAgQXBwbGV0Um91dGVyXG4gIH1cbiJdfQ==
