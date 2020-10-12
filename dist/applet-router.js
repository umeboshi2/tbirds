var AppletRouter, MainChannel, MessageChannel, RequireController, registered_apps,
  indexOf = [].indexOf;

import {
  Radio,
  history as BBhistory
} from 'backbone';

import {
  MnObject
} from 'backbone.marionette';

import AppRouter from 'marionette.approuter';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixPQUFBLGFBQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFDZCxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZCxFQUxqQjs7Ozs7Ozs7Ozs7O0FBaUJBLGVBQUEsR0FBa0IsQ0FBQSxFQWpCbEI7Ozs7OztBQXVCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWUsQ0FBQyxPQUFEO0FBRG9CLENBQTVDOztBQUlBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHNCQUFsQixFQUEwQyxRQUFBLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBQTtFQUN4QyxlQUFlLENBQUMsT0FBRCxDQUFmLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDMUMsU0FBTyxlQUFlLENBQUMsT0FBRDtBQURvQixDQUE1QyxFQS9CQTs7Ozs7QUFzQ00sb0JBQU4sTUFBQSxrQkFBQSxRQUFnQyxTQUFoQztFQUNFLGFBQWUsQ0FBQSxDQUFBO0FBQ2pCLFFBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtJQUFJLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7SUFDVCxPQUFBLHFCQUFVLE1BQU0sQ0FBRSx5QkFBUixJQUEyQixZQUR6Qzs7SUFHSSxPQUFBLEdBQVUs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SUFBUixDQUFhLHNCQUFiLEVBUEY7U0FERjs7TUFTQSxJQUFHLE9BQUEsSUFBWSxLQUFmO2VBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxFQUE4QyxJQUE5QyxFQURGOztJQVZPOztFQUpYOzt5QkFDRSxTQUFBLEdBQ0U7SUFBQSxnQkFBQSxFQUFrQixZQUFsQjtJQUNBLGNBQUEsRUFBZ0I7RUFEaEI7Ozs7OztBQWVKLFdBQVcsQ0FBQyxLQUFaLENBQWtCLDZCQUFsQixFQUFpRCxRQUFBLENBQUEsQ0FBQTtBQUNqRCxNQUFBLFVBQUEsRUFBQTtFQUFFLFVBQUEsR0FBYSxJQUFJLGlCQUFKLENBQUE7RUFDYixNQUFBLEdBQVMsSUFBSSxZQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVk7RUFBWixDQURPO0VBRVQsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFFBQUEsQ0FBQSxDQUFBO0FBQ25DLFdBQU87RUFENEIsQ0FBckM7RUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQixhQUFsQixFQUFpQyxRQUFBLENBQUEsQ0FBQTtBQUMvQixXQUFPO0VBRHdCLENBQWpDO0FBTitDLENBQWpEOztBQVdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGdCQUFsQixFQUFvQyxRQUFBLENBQUEsQ0FBQTtFQUNsQyxPQUFPLENBQUMsSUFBUixDQUFhLDRDQUFiO1NBQ0EsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNkJBQXBCO0FBRmtDLENBQXBDOztBQUdBLE9BQUE7RUFDRSxpQkFERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYWRpbywgaGlzdG9yeSBhcyBCQmhpc3RvcnkgfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IE1uT2JqZWN0IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBBcHBSb3V0ZXIgZnJvbSAnbWFyaW9uZXR0ZS5hcHByb3V0ZXInXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuIyBGSVhNRVxuIyBhcHBsZXRzL2FwcG5hbWUvbWFpbiBuZWVkcyB0byBiZSByZXNvbHZhYmxlXG4jIGJ5IHVzaW5nIHdlYnBhY2sgcmVzb2x2ZSBhbGlhc1xuXG4jIE9iamVjdCB0byBjb250YWluIHJlZ2lzdGVyZWQgYXBwbGV0c1xuIyBVc2luZyB0aGlzIHByZXZlbnRzIGEgbG9vcCB3aGVuIGEgYXBwcm91dGVcbiMgaXMgcmVxdWVzdGVkIGJ1dCBub3QgbWF0Y2hlZCBpbiBhbiBBcHBSb3V0ZXJcbiMgVW5sZXNzIHRoZSBBcHBSb3V0ZXIgaGFzIGEgbWF0Y2ggZm9yIHRoZSByZXF1ZXN0ZWRcbiMgYXBwcm91dGUsIHRoZSBtYWluIHJvdXRlciB3aWxsIHRyeSB0byBsb2FkIHRoZVxuIyBBcHBSb3V0ZXIgYWdhaW4sIGNhdXNpbmcgYSBsb29wLlxucmVnaXN0ZXJlZF9hcHBzID0ge31cblxuIyBGSVhNRVxuIyBUaGlzIGlzbid0IGJlaW5nIHVzZWQgY3VycmVudGx5LiAgVGhpcyBpcyBoZXJlXG4jIHdoZW4gdGhlIGNvZGUgZGV2ZWxvcHMgdG8gdGhlIHBvaW50IG9mIGJlaW5nXG4jIGFibGUgdG8gcmVtb3ZlIHVudXNlZCBjaGlsZCBhcHBzIHRvIHNhdmUgbWVtb3J5LlxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OnVucmVnaXN0ZXInLCAoYXBwbmFtZSkgLT5cbiAgZGVsZXRlIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCAoYXBwbmFtZSwgYXBwbGV0KSAtPlxuICByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV0gPSBhcHBsZXRcbiAgcmV0dXJuXG4gIFxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OmdldC1hcHBsZXQnLCAoYXBwbmFtZSkgLT5cbiAgcmV0dXJuIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuXG4jIEZJWE1FOiBVc2luZyBiYWNrdGlja3MgZm9yIGltcG9ydCgpIHN0YXRlbWVudHMuIElubmVyXG4jIGpzIGJhY2t0aWNrcyBhcmUgZXNjYXBlZCBmb3IgZHluYW1pYyBleHByZXNzaW9ucy5cbiMgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy9jb2ZmZWVzY3JpcHQvaXNzdWVzLzQ4MzQjaXNzdWVjb21tZW50LTM1NDM3NTYyN1xuXG5jbGFzcyBSZXF1aXJlQ29udHJvbGxlciBleHRlbmRzIE1uT2JqZWN0XG4gIGxvYWRGcm9udERvb3I6IC0+XG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGFwcG5hbWUgPSBjb25maWc/LmZyb250ZG9vckFwcGxldCBvciAnZnJvbnRkb29yJ1xuICAgICNoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBoYW5kbGVyID0gYGltcG9ydChcXGBhcHBsZXRzLyR7YXBwbmFtZX0vbWFpblxcYClgICMgbm9xYVxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIkZyb250ZG9vciBzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGlzRnJvbnRkb29yQXBwbGV0OiB0cnVlXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJCaGlzdG9yeS5zdGFydCgpIHVubGVzcyBCQmhpc3Rvcnkuc3RhcnRlZFxuICAgICAgcmV0dXJuXG4gICAgcmV0dXJuXG4gICAgXG4gIF9oYW5kbGVSb3V0ZTogKGFwcG5hbWUsIHN1ZmZpeCkgLT5cbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJfaGFuZGxlUm91dGVcIiwgYXBwbmFtZSwgc3VmZml4XG4gICAgaWYgc3VmZml4IGFuZCBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgIHdoaWxlIHN1ZmZpeC5zdGFydHNXaXRoICcvJ1xuICAgICAgICBjb25zb2xlLmxvZyBcIlN1ZmZpeC5TdGFydHN3aXRoXCIsIHN1ZmZpeFxuICAgICAgICBzdWZmaXggPSBzdWZmaXguc2xpY2UgMVxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBpZiBub3QgYXBwbmFtZVxuICAgICAgY29uc29sZS53YXJuIFwiTm8gYXBwbGV0IHJlY29nbml6ZWRcIiwgYXBwbmFtZVxuICAgICAgYXBwbmFtZSA9ICdmcm9udGRvb3InXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyBjb25maWcuYXBwbGV0Um91dGVzXG4gICAgICBhcHBuYW1lID0gY29uZmlnLmFwcGxldFJvdXRlc1thcHBuYW1lXVxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcIlVzaW5nIGRlZmluZWQgYXBwbGV0Um91dGVcIiwgYXBwbmFtZVxuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgcmVnaXN0ZXJlZF9hcHBzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJVbmhhbmRsZWQgYXBwbGV0IHBhdGggIyN7YXBwbmFtZX0vI3tzdWZmaXh9XCJcbiAgICAjaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaGFuZGxlciA9IGBpbXBvcnQoXFxgYXBwbGV0cy8ke2FwcG5hbWV9L21haW5cXGApYCAjIG5vcWFcbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJCaGlzdG9yeS5sb2FkVXJsKClcbiAgICAgIHJldHVyblxuICAgIC5jYXRjaCAoZXJyKSAtPlxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnQ2Fubm90IGZpbmQgbW9kdWxlJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgXCJCYWQgcm91dGUgI3thcHBuYW1lfSwgI3tzdWZmaXh9ISFcIlxuICAgICAgICByZXR1cm5cbiAgICAgICMgY2F0Y2ggdGhpcyBoZXJlIGZvciBpbml0aWFsIHBhZ2UgbG9hZCB3aXRoIGludmFsaWRcbiAgICAgICMgc3VicGF0aFxuICAgICAgZWxzZSBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IGVyclxuICAgIHJldHVyblxuICAgICAgXG4gIHJvdXRlQXBwbGV0OiAoYXBwbGV0LCBocmVmKSAtPlxuICAgIHRyeVxuICAgICAgQF9oYW5kbGVSb3V0ZSBhcHBsZXQsIGhyZWZcbiAgICBjYXRjaCBlcnJcbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgZGlyZWN0TGluazogKHJlbWFpbmRlcikgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLndhcm4gXCJkaXJlY3RMaW5rXCIsIHJlbWFpbmRlclxuICAgIHJldHVyblxuICAgIFxuY2xhc3MgQXBwbGV0Um91dGVyIGV4dGVuZHMgQXBwUm91dGVyXG4gIGFwcFJvdXRlczpcbiAgICAnaHR0cCpyZW1haW5kZXInOiAnZGlyZWN0TGluaydcbiAgICAnOmFwcGxldCpwYXRoJzogJ3JvdXRlQXBwbGV0J1xuICBvblJvdXRlOiAobmFtZSwgcGF0aCwgYXJncykgLT5cbiAgICBpZiBuYW1lIGlzICdkaXJlY3RMaW5rJ1xuICAgICAgaWYgYXJncy5sZW5ndGggPT0gMlxuICAgICAgICBpZiBhcmdzWzFdIGlzbnQgbnVsbFxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJncy5qb2luKCc/Jyl9XCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHVybCA9IFwiaHR0cCN7YXJnc1swXX1cIlxuICAgICAgICB3aW5kb3cub3BlbiB1cmwsICdfYmxhbmsnXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnNvbGUud2FybiBcInVuaGFuZGxlZCBkaXJlY3RMaW5rXCJcbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJNYWluUm91dGVyLm9uUm91dGVcIiwgbmFtZSwgcGF0aCwgYXJnc1xuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y3JlYXRlLW1haW4tcm91dGVyJywgLT5cbiAgY29udHJvbGxlciA9IG5ldyBSZXF1aXJlQ29udHJvbGxlclxuICByb3V0ZXIgPSBuZXcgQXBwbGV0Um91dGVyXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1jb250cm9sbGVyJywgLT5cbiAgICByZXR1cm4gY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1yb3V0ZXInLCAtPlxuICAgIHJldHVybiByb3V0ZXJcbiAgcmV0dXJuXG5cblxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnJvdXRlJywgLT5cbiAgY29uc29sZS53YXJuIFwiVXNlICdtYWluOmFwcDpjcmVhdGUtbWFpbi1yb3V0ZXInIGluc3RlYWQuXCJcbiAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y3JlYXRlLW1haW4tcm91dGVyJ1xuZXhwb3J0IHtcbiAgUmVxdWlyZUNvbnRyb2xsZXJcbiAgQXBwbGV0Um91dGVyXG4gIH1cbiJdfQ==
