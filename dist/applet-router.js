var AppletRouter, MainChannel, MessageChannel, RequireController, registered_apps,
  indexOf = [].indexOf;

import {
  Radio,
  history as BBhistory
} from 'backbone';

import {
  MnObject
} from 'backbone.marionette';

import AppRouter from './routers/approuter';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

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
      if (!BBhistory.started) {
        BBhistory.start();
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
        if (__DEV__ && DEBUG) {
          console.log("Suffix.Startswith", suffix);
        }
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
      BBhistory.loadUrl();
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
  controller = new RequireController();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixPQUFBLGFBQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFDZCxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZCxFQUxqQjs7Ozs7Ozs7Ozs7O0FBaUJBLGVBQUEsR0FBa0IsQ0FBQSxFQWpCbEI7Ozs7OztBQXVCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWUsQ0FBQyxPQUFEO0FBRG9CLENBQTVDOztBQUlBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHNCQUFsQixFQUEwQyxRQUFBLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBQTtFQUN4QyxlQUFlLENBQUMsT0FBRCxDQUFmLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDMUMsU0FBTyxlQUFlLENBQUMsT0FBRDtBQURvQixDQUE1QyxFQS9CQTs7Ozs7QUFzQ00sb0JBQU4sTUFBQSxrQkFBQSxRQUFnQyxTQUFoQztFQUNFLGFBQWUsQ0FBQSxDQUFBO0FBQ2pCLFFBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtJQUFJLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7SUFDVCxPQUFBLHFCQUFVLE1BQU0sQ0FBRSx5QkFBUixJQUEyQixZQUR6Qzs7SUFHSSxPQUFBLEdBQVUs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LEVBTEY7U0FBQSxNQUFBO1VBT0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxzQkFBYixFQVBGO1NBREY7O01BU0EsSUFBRyxPQUFBLElBQVksS0FBZjtlQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEMsRUFBOEMsSUFBOUMsRUFERjs7SUFWTzs7RUFKWDs7eUJBQ0UsU0FBQSxHQUNFO0lBQUEsZ0JBQUEsRUFBa0IsWUFBbEI7SUFDQSxjQUFBLEVBQWdCO0VBRGhCOzs7Ozs7QUFlSixXQUFXLENBQUMsS0FBWixDQUFrQiw2QkFBbEIsRUFBaUQsUUFBQSxDQUFBLENBQUE7QUFDakQsTUFBQSxVQUFBLEVBQUE7RUFBRSxVQUFBLEdBQWEsSUFBSSxpQkFBSixDQUFBO0VBQ2IsTUFBQSxHQUFTLElBQUksWUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZO0VBQVosQ0FETztFQUVULFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxXQUFPO0VBRDRCLENBQXJDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsYUFBbEIsRUFBaUMsUUFBQSxDQUFBLENBQUE7QUFDL0IsV0FBTztFQUR3QixDQUFqQztBQU4rQyxDQUFqRDs7QUFXQSxXQUFXLENBQUMsS0FBWixDQUFrQixnQkFBbEIsRUFBb0MsUUFBQSxDQUFBLENBQUE7RUFDbEMsT0FBTyxDQUFDLElBQVIsQ0FBYSw0Q0FBYjtTQUNBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDZCQUFwQjtBQUZrQyxDQUFwQzs7QUFHQSxPQUFBO0VBQ0UsaUJBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8sIGhpc3RvcnkgYXMgQkJoaXN0b3J5IH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBNbk9iamVjdCB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgQXBwUm91dGVyIGZyb20gJy4vcm91dGVycy9hcHByb3V0ZXInXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuIyBGSVhNRVxuIyBhcHBsZXRzL2FwcG5hbWUvbWFpbiBuZWVkcyB0byBiZSByZXNvbHZhYmxlXG4jIGJ5IHVzaW5nIHdlYnBhY2sgcmVzb2x2ZSBhbGlhc1xuXG4jIE9iamVjdCB0byBjb250YWluIHJlZ2lzdGVyZWQgYXBwbGV0c1xuIyBVc2luZyB0aGlzIHByZXZlbnRzIGEgbG9vcCB3aGVuIGEgYXBwcm91dGVcbiMgaXMgcmVxdWVzdGVkIGJ1dCBub3QgbWF0Y2hlZCBpbiBhbiBBcHBSb3V0ZXJcbiMgVW5sZXNzIHRoZSBBcHBSb3V0ZXIgaGFzIGEgbWF0Y2ggZm9yIHRoZSByZXF1ZXN0ZWRcbiMgYXBwcm91dGUsIHRoZSBtYWluIHJvdXRlciB3aWxsIHRyeSB0byBsb2FkIHRoZVxuIyBBcHBSb3V0ZXIgYWdhaW4sIGNhdXNpbmcgYSBsb29wLlxucmVnaXN0ZXJlZF9hcHBzID0ge31cblxuIyBGSVhNRVxuIyBUaGlzIGlzbid0IGJlaW5nIHVzZWQgY3VycmVudGx5LiAgVGhpcyBpcyBoZXJlXG4jIHdoZW4gdGhlIGNvZGUgZGV2ZWxvcHMgdG8gdGhlIHBvaW50IG9mIGJlaW5nXG4jIGFibGUgdG8gcmVtb3ZlIHVudXNlZCBjaGlsZCBhcHBzIHRvIHNhdmUgbWVtb3J5LlxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OnVucmVnaXN0ZXInLCAoYXBwbmFtZSkgLT5cbiAgZGVsZXRlIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCAoYXBwbmFtZSwgYXBwbGV0KSAtPlxuICByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV0gPSBhcHBsZXRcbiAgcmV0dXJuXG4gIFxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OmdldC1hcHBsZXQnLCAoYXBwbmFtZSkgLT5cbiAgcmV0dXJuIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuXG4jIEZJWE1FOiBVc2luZyBiYWNrdGlja3MgZm9yIGltcG9ydCgpIHN0YXRlbWVudHMuIElubmVyXG4jIGpzIGJhY2t0aWNrcyBhcmUgZXNjYXBlZCBmb3IgZHluYW1pYyBleHByZXNzaW9ucy5cbiMgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy9jb2ZmZWVzY3JpcHQvaXNzdWVzLzQ4MzQjaXNzdWVjb21tZW50LTM1NDM3NTYyN1xuXG5jbGFzcyBSZXF1aXJlQ29udHJvbGxlciBleHRlbmRzIE1uT2JqZWN0XG4gIGxvYWRGcm9udERvb3I6IC0+XG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGFwcG5hbWUgPSBjb25maWc/LmZyb250ZG9vckFwcGxldCBvciAnZnJvbnRkb29yJ1xuICAgICNoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBoYW5kbGVyID0gYGltcG9ydChcXGBhcHBsZXRzLyR7YXBwbmFtZX0vbWFpblxcYClgICMgbm9xYVxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIkZyb250ZG9vciBzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGlzRnJvbnRkb29yQXBwbGV0OiB0cnVlXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJCaGlzdG9yeS5zdGFydCgpIHVubGVzcyBCQmhpc3Rvcnkuc3RhcnRlZFxuICAgICAgcmV0dXJuXG4gICAgcmV0dXJuXG4gICAgXG4gIF9oYW5kbGVSb3V0ZTogKGFwcG5hbWUsIHN1ZmZpeCkgLT5cbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJfaGFuZGxlUm91dGVcIiwgYXBwbmFtZSwgc3VmZml4XG4gICAgaWYgc3VmZml4IGFuZCBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgIHdoaWxlIHN1ZmZpeC5zdGFydHNXaXRoICcvJ1xuICAgICAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgICAgIGNvbnNvbGUubG9nIFwiU3VmZml4LlN0YXJ0c3dpdGhcIiwgc3VmZml4XG4gICAgICAgIHN1ZmZpeCA9IHN1ZmZpeC5zbGljZSAxXG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGlmIG5vdCBhcHBuYW1lXG4gICAgICBjb25zb2xlLndhcm4gXCJObyBhcHBsZXQgcmVjb2duaXplZFwiLCBhcHBuYW1lXG4gICAgICBhcHBuYW1lID0gJ2Zyb250ZG9vcidcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIGNvbmZpZy5hcHBsZXRSb3V0ZXNcbiAgICAgIGFwcG5hbWUgPSBjb25maWcuYXBwbGV0Um91dGVzW2FwcG5hbWVdXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGNvbnNvbGUubG9nIFwiVXNpbmcgZGVmaW5lZCBhcHBsZXRSb3V0ZVwiLCBhcHBuYW1lXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyByZWdpc3RlcmVkX2FwcHNcbiAgICAgIHRocm93IG5ldyBFcnJvciBcIlVuaGFuZGxlZCBhcHBsZXQgcGF0aCAjI3thcHBuYW1lfS8je3N1ZmZpeH1cIlxuICAgICNoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBoYW5kbGVyID0gYGltcG9ydChcXGBhcHBsZXRzLyR7YXBwbmFtZX0vbWFpblxcYClgICMgbm9xYVxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcInN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgICAgY2hhbm5lbE5hbWU6IGFwcG5hbWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQkJoaXN0b3J5LmxvYWRVcmwoKVxuICAgICAgcmV0dXJuXG4gICAgLmNhdGNoIChlcnIpIC0+XG4gICAgICBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdDYW5ub3QgZmluZCBtb2R1bGUnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBcIkJhZCByb3V0ZSAje2FwcG5hbWV9LCAje3N1ZmZpeH0hIVwiXG4gICAgICAgIHJldHVyblxuICAgICAgIyBjYXRjaCB0aGlzIGhlcmUgZm9yIGluaXRpYWwgcGFnZSBsb2FkIHdpdGggaW52YWxpZFxuICAgICAgIyBzdWJwYXRoXG4gICAgICBlbHNlIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgcmV0dXJuXG4gICAgICBcbiAgcm91dGVBcHBsZXQ6IChhcHBsZXQsIGhyZWYpIC0+XG4gICAgdHJ5XG4gICAgICBAX2hhbmRsZVJvdXRlIGFwcGxldCwgaHJlZlxuICAgIGNhdGNoIGVyclxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnVW5oYW5kbGVkIGFwcGxldCdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIGVyci5tZXNzYWdlXG4gICAgICAgIHJldHVyblxuICAgIHJldHVyblxuICAgIFxuICBkaXJlY3RMaW5rOiAocmVtYWluZGVyKSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUud2FybiBcImRpcmVjdExpbmtcIiwgcmVtYWluZGVyXG4gICAgcmV0dXJuXG4gICAgXG5jbGFzcyBBcHBsZXRSb3V0ZXIgZXh0ZW5kcyBBcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICdodHRwKnJlbWFpbmRlcic6ICdkaXJlY3RMaW5rJ1xuICAgICc6YXBwbGV0KnBhdGgnOiAncm91dGVBcHBsZXQnXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIG5hbWUgaXMgJ2RpcmVjdExpbmsnXG4gICAgICBpZiBhcmdzLmxlbmd0aCA9PSAyXG4gICAgICAgIGlmIGFyZ3NbMV0gaXNudCBudWxsXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzLmpvaW4oJz8nKX1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzWzBdfVwiXG4gICAgICAgIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS53YXJuIFwidW5oYW5kbGVkIGRpcmVjdExpbmtcIlxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIk1haW5Sb3V0ZXIub25Sb3V0ZVwiLCBuYW1lLCBwYXRoLCBhcmdzXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjcmVhdGUtbWFpbi1yb3V0ZXInLCAtPlxuICBjb250cm9sbGVyID0gbmV3IFJlcXVpcmVDb250cm9sbGVyXG4gIHJvdXRlciA9IG5ldyBBcHBsZXRSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIHJldHVybiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLXJvdXRlcicsIC0+XG4gICAgcmV0dXJuIHJvdXRlclxuICByZXR1cm5cblxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cm91dGUnLCAtPlxuICBjb25zb2xlLndhcm4gXCJVc2UgJ21haW46YXBwOmNyZWF0ZS1tYWluLXJvdXRlcicgaW5zdGVhZC5cIlxuICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjcmVhdGUtbWFpbi1yb3V0ZXInXG5leHBvcnQge1xuICBSZXF1aXJlQ29udHJvbGxlclxuICBBcHBsZXRSb3V0ZXJcbiAgfVxuIl19
