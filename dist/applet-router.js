var AppletRouter, MainChannel, RequireController, registered_apps,
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGlCQUFBLEVBQUEsZUFBQTtFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLE9BQUEsYUFBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxRQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkLEVBSmQ7Ozs7Ozs7Ozs7OztBQWdCQSxlQUFBLEdBQWtCLENBQUEsRUFoQmxCOzs7Ozs7QUFzQkEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7RUFDMUMsT0FBTyxlQUFnQixDQUFBLE9BQUE7QUFEbUIsQ0FBNUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isc0JBQWxCLEVBQTBDLFFBQUEsQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFBO0VBQ3hDLGVBQWdCLENBQUEsT0FBQSxDQUFoQixHQUEyQjtBQURhLENBQTFDOztBQUlBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHdCQUFsQixFQUE0QyxRQUFBLENBQUMsT0FBRCxDQUFBO0FBQzFDLFNBQU8sZUFBZ0IsQ0FBQSxPQUFBO0FBRG1CLENBQTVDLEVBOUJBOzs7OztBQXFDTSxvQkFBTixNQUFBLGtCQUFBLFFBQWdDLFNBQWhDO0VBQ0UsYUFBZSxDQUFBLENBQUE7QUFDYixRQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7SUFBQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsT0FBQSxxQkFBVSxNQUFNLENBQUUseUJBQVIsSUFBMkIsWUFEckM7O0lBR0EsT0FBQSxHQUFVLGtDQUhWO0lBSUEsSUFBRyxPQUFBLElBQVksS0FBZjtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVosRUFBdUMsT0FBdkMsRUFERjs7SUFFQSxPQUFPLENBQUMsSUFBUixDQUFhLFFBQUEsQ0FBQyxNQUFELENBQUE7QUFFWCxVQUFBLE1BQUE7O01BQUEsTUFBQSxHQUFTLElBQUksTUFBTSxDQUFDLE9BQVgsQ0FDUDtRQUFBLFNBQUEsRUFBVyxNQUFYO1FBQ0EsT0FBQSxFQUFTLE9BRFQ7UUFFQSxpQkFBQSxFQUFtQixJQUZuQjtRQUdBLFdBQUEsRUFBYTtNQUhiLENBRE87TUFLVCxXQUFXLENBQUMsT0FBWixDQUFvQixzQkFBcEIsRUFBNEMsT0FBNUMsRUFBcUQsTUFBckQ7TUFDQSxNQUFNLENBQUMsS0FBUCxDQUFBO01BQ0EsSUFBQSxDQUF5QixTQUFTLENBQUMsT0FBbkM7UUFBQSxTQUFTLENBQUMsS0FBVixDQUFBLEVBQUE7O0lBVFcsQ0FBYjtFQVBhOztFQW9CZixZQUFjLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBQTtBQUNaLFFBQUEsTUFBQSxFQUFBO0lBQUEsSUFBRyxPQUFBLElBQVksS0FBZjtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWixFQUE0QixPQUE1QixFQUFxQyxNQUFyQyxFQURGOztJQUVBLElBQUcsTUFBQSxJQUFXLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEdBQWxCLENBQWQ7QUFDRSxhQUFNLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEdBQWxCLENBQU47UUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLE1BQWpDO1FBQ0EsTUFBQSxHQUFTLE1BQU0sQ0FBQyxLQUFQLENBQWEsQ0FBYjtNQUZYLENBREY7O0lBSUEsTUFBQSxHQUFTLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtJQUNULElBQUcsQ0FBSSxPQUFQO01BQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxzQkFBYixFQUFxQyxPQUFyQztNQUNBLE9BQUEsR0FBVSxZQUZaOztJQUdBLElBQUcsYUFBVyxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxZQUFuQixDQUFYLEVBQUEsT0FBQSxNQUFIO01BQ0UsT0FBQSxHQUFVLE1BQU0sQ0FBQyxZQUFhLENBQUEsT0FBQTtNQUM5QixJQUFHLE9BQUg7UUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLDJCQUFaLEVBQXlDLE9BQXpDLEVBREY7T0FGRjs7SUFJQSxJQUFHLGFBQVcsTUFBTSxDQUFDLElBQVAsQ0FBWSxlQUFaLENBQVgsRUFBQSxPQUFBLE1BQUg7TUFDRSxNQUFNLElBQUksS0FBSixDQUFVLENBQUEsdUJBQUEsQ0FBQSxDQUEwQixPQUExQixDQUFrQyxDQUFsQyxDQUFBLENBQXFDLE1BQXJDLENBQUEsQ0FBVixFQURSO0tBZEE7O0lBaUJBLE9BQUEsR0FBVSxrQ0FqQlY7SUFrQkEsSUFBRyxPQUFBLElBQVksS0FBZjtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWixFQUE2QixPQUE3QixFQURGOztJQUVBLE9BQU8sQ0FBQyxJQUFSLENBQWEsUUFBQSxDQUFDLE1BQUQsQ0FBQTtBQUVYLFVBQUEsTUFBQTs7TUFBQSxNQUFBLEdBQVMsSUFBSSxNQUFNLENBQUMsT0FBWCxDQUNQO1FBQUEsU0FBQSxFQUFXLE1BQVg7UUFDQSxPQUFBLEVBQVMsT0FEVDtRQUVBLFdBQUEsRUFBYTtNQUZiLENBRE87TUFJVCxXQUFXLENBQUMsT0FBWixDQUFvQixzQkFBcEIsRUFBNEMsT0FBNUMsRUFBcUQsTUFBckQ7TUFDQSxNQUFNLENBQUMsS0FBUCxDQUFBO01BQ0EsU0FBUyxDQUFDLE9BQVYsQ0FBQTtJQVJXLENBQWIsQ0FVQSxDQUFDLEtBVkQsQ0FVTyxRQUFBLENBQUMsR0FBRCxDQUFBO01BQ0wsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVosQ0FBdUIsb0JBQXZCLENBQUg7UUFDRSxjQUFjLENBQUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyxDQUFBLFVBQUEsQ0FBQSxDQUFhLE9BQWIsQ0FBcUIsRUFBckIsQ0FBQSxDQUF5QixNQUF6QixDQUFnQyxFQUFoQyxDQUFsQyxFQURGOzs7T0FBQSxNQUtLLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFaLENBQXVCLGtCQUF2QixDQUFIO1FBQ0gsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsR0FBRyxDQUFDLE9BQXRDLEVBREc7T0FBQSxNQUFBO1FBSUgsTUFBTSxJQUpIOztJQU5BLENBVlA7RUFyQlk7O0VBNENkLFdBQWEsQ0FBQyxNQUFELEVBQVMsSUFBVCxDQUFBO0FBQ1gsUUFBQTtBQUFBO01BQ0UsSUFBQyxDQUFBLFlBQUQsQ0FBYyxNQUFkLEVBQXNCLElBQXRCLEVBREY7S0FBQSxhQUFBO01BRU07TUFDSixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBWixDQUF1QixrQkFBdkIsQ0FBSDtRQUNFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLEdBQUcsQ0FBQyxPQUF0QztBQUNBLGVBRkY7T0FIRjs7RUFEVzs7RUFTYixVQUFZLENBQUMsU0FBRCxDQUFBO0lBQ1YsSUFBRyxPQUFIO01BQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxZQUFiLEVBQTJCLFNBQTNCLEVBREY7O0VBRFU7O0FBMUVkOztBQStFTTtFQUFOLE1BQUEsYUFBQSxRQUEyQixVQUEzQjtJQUlFLE9BQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsQ0FBQTtBQUNQLFVBQUE7TUFBQSxJQUFHLElBQUEsS0FBUSxZQUFYO1FBQ0UsSUFBRyxJQUFJLENBQUMsTUFBTCxLQUFlLENBQWxCO1VBQ0UsSUFBRyxJQUFLLENBQUEsQ0FBQSxDQUFMLEtBQWEsSUFBaEI7WUFDRSxHQUFBLEdBQU0sQ0FBQSxJQUFBLENBQUEsQ0FBTyxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQVYsQ0FBUCxDQUFBLEVBRFI7V0FBQSxNQUFBO1lBR0UsR0FBQSxHQUFNLENBQUEsSUFBQSxDQUFBLENBQU8sSUFBSyxDQUFBLENBQUEsQ0FBWixDQUFBLEVBSFI7O1VBSUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaLEVBQWlCLFFBQWpCLEVBTEY7U0FBQSxNQUFBO1VBT0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxzQkFBYixFQVBGO1NBREY7O01BU0EsSUFBRyxPQUFBLElBQVksS0FBZjtlQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEMsRUFBOEMsSUFBOUMsRUFERjs7SUFWTzs7RUFKWDs7eUJBQ0UsU0FBQSxHQUNFO0lBQUEsZ0JBQUEsRUFBa0IsWUFBbEI7SUFDQSxjQUFBLEVBQWdCO0VBRGhCOzs7Ozs7QUFlSixXQUFXLENBQUMsS0FBWixDQUFrQiw2QkFBbEIsRUFBaUQsUUFBQSxDQUFBLENBQUE7QUFDL0MsTUFBQSxVQUFBLEVBQUE7RUFBQSxVQUFBLEdBQWEsSUFBSTtFQUNqQixNQUFBLEdBQVMsSUFBSSxZQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVk7RUFBWixDQURPO0VBRVQsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFFBQUEsQ0FBQSxDQUFBO0FBQ25DLFdBQU87RUFENEIsQ0FBckM7RUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQixhQUFsQixFQUFpQyxRQUFBLENBQUEsQ0FBQTtBQUMvQixXQUFPO0VBRHdCLENBQWpDO0FBTitDLENBQWpEOztBQVdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGdCQUFsQixFQUFvQyxRQUFBLENBQUEsQ0FBQTtFQUNsQyxPQUFPLENBQUMsSUFBUixDQUFhLDRDQUFiO1NBQ0EsV0FBVyxDQUFDLE9BQVosQ0FBb0IsNkJBQXBCO0FBRmtDLENBQXBDOztBQUdBLE9BQUE7RUFDRSxpQkFERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYWRpbywgaGlzdG9yeSBhcyBCQmhpc3RvcnkgfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IE1uT2JqZWN0IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBBcHBSb3V0ZXIgZnJvbSAnbWFyaW9uZXR0ZS5hcHByb3V0ZXInXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG4jIEZJWE1FXG4jIGFwcGxldHMvYXBwbmFtZS9tYWluIG5lZWRzIHRvIGJlIHJlc29sdmFibGVcbiMgYnkgdXNpbmcgd2VicGFjayByZXNvbHZlIGFsaWFzXG5cbiMgT2JqZWN0IHRvIGNvbnRhaW4gcmVnaXN0ZXJlZCBhcHBsZXRzXG4jIFVzaW5nIHRoaXMgcHJldmVudHMgYSBsb29wIHdoZW4gYSBhcHByb3V0ZVxuIyBpcyByZXF1ZXN0ZWQgYnV0IG5vdCBtYXRjaGVkIGluIGFuIEFwcFJvdXRlclxuIyBVbmxlc3MgdGhlIEFwcFJvdXRlciBoYXMgYSBtYXRjaCBmb3IgdGhlIHJlcXVlc3RlZFxuIyBhcHByb3V0ZSwgdGhlIG1haW4gcm91dGVyIHdpbGwgdHJ5IHRvIGxvYWQgdGhlXG4jIEFwcFJvdXRlciBhZ2FpbiwgY2F1c2luZyBhIGxvb3AuXG5yZWdpc3RlcmVkX2FwcHMgPSB7fVxuXG4jIEZJWE1FXG4jIFRoaXMgaXNuJ3QgYmVpbmcgdXNlZCBjdXJyZW50bHkuICBUaGlzIGlzIGhlcmVcbiMgd2hlbiB0aGUgY29kZSBkZXZlbG9wcyB0byB0aGUgcG9pbnQgb2YgYmVpbmdcbiMgYWJsZSB0byByZW1vdmUgdW51c2VkIGNoaWxkIGFwcHMgdG8gc2F2ZSBtZW1vcnkuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6dW5yZWdpc3RlcicsIChhcHBuYW1lKSAtPlxuICBkZWxldGUgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG4gIHJldHVyblxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIChhcHBuYW1lLCBhcHBsZXQpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXSA9IGFwcGxldFxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIChhcHBuYW1lKSAtPlxuICByZXR1cm4gcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG5cbiMgRklYTUU6IFVzaW5nIGJhY2t0aWNrcyBmb3IgaW1wb3J0KCkgc3RhdGVtZW50cy4gSW5uZXJcbiMganMgYmFja3RpY2tzIGFyZSBlc2NhcGVkIGZvciBkeW5hbWljIGV4cHJlc3Npb25zLlxuIyBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL2NvZmZlZXNjcmlwdC9pc3N1ZXMvNDgzNCNpc3N1ZWNvbW1lbnQtMzU0Mzc1NjI3XG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgTW5PYmplY3RcbiAgbG9hZEZyb250RG9vcjogLT5cbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgYXBwbmFtZSA9IGNvbmZpZz8uZnJvbnRkb29yQXBwbGV0IG9yICdmcm9udGRvb3InXG4gICAgI2hhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGhhbmRsZXIgPSBgaW1wb3J0KFxcYGFwcGxldHMvJHthcHBuYW1lfS9tYWluXFxgKWAgIyBub3FhXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiRnJvbnRkb29yIHN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgICAgaXNGcm9udGRvb3JBcHBsZXQ6IHRydWVcbiAgICAgICAgY2hhbm5lbE5hbWU6IGFwcG5hbWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQkJoaXN0b3J5LnN0YXJ0KCkgdW5sZXNzIEJCaGlzdG9yeS5zdGFydGVkXG4gICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgX2hhbmRsZVJvdXRlOiAoYXBwbmFtZSwgc3VmZml4KSAtPlxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIl9oYW5kbGVSb3V0ZVwiLCBhcHBuYW1lLCBzdWZmaXhcbiAgICBpZiBzdWZmaXggYW5kIHN1ZmZpeC5zdGFydHNXaXRoICcvJ1xuICAgICAgd2hpbGUgc3VmZml4LnN0YXJ0c1dpdGggJy8nXG4gICAgICAgIGNvbnNvbGUubG9nIFwiU3VmZml4LlN0YXJ0c3dpdGhcIiwgc3VmZml4XG4gICAgICAgIHN1ZmZpeCA9IHN1ZmZpeC5zbGljZSAxXG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGlmIG5vdCBhcHBuYW1lXG4gICAgICBjb25zb2xlLndhcm4gXCJObyBhcHBsZXQgcmVjb2duaXplZFwiLCBhcHBuYW1lXG4gICAgICBhcHBuYW1lID0gJ2Zyb250ZG9vcidcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIGNvbmZpZy5hcHBsZXRSb3V0ZXNcbiAgICAgIGFwcG5hbWUgPSBjb25maWcuYXBwbGV0Um91dGVzW2FwcG5hbWVdXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGNvbnNvbGUubG9nIFwiVXNpbmcgZGVmaW5lZCBhcHBsZXRSb3V0ZVwiLCBhcHBuYW1lXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyByZWdpc3RlcmVkX2FwcHNcbiAgICAgIHRocm93IG5ldyBFcnJvciBcIlVuaGFuZGxlZCBhcHBsZXQgcGF0aCAjI3thcHBuYW1lfS8je3N1ZmZpeH1cIlxuICAgICNoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBoYW5kbGVyID0gYGltcG9ydChcXGBhcHBsZXRzLyR7YXBwbmFtZX0vbWFpblxcYClgICMgbm9xYVxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcInN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgICAgY2hhbm5lbE5hbWU6IGFwcG5hbWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQkJoaXN0b3J5LmxvYWRVcmwoKVxuICAgICAgcmV0dXJuXG4gICAgLmNhdGNoIChlcnIpIC0+XG4gICAgICBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdDYW5ub3QgZmluZCBtb2R1bGUnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBcIkJhZCByb3V0ZSAje2FwcG5hbWV9LCAje3N1ZmZpeH0hIVwiXG4gICAgICAgIHJldHVyblxuICAgICAgIyBjYXRjaCB0aGlzIGhlcmUgZm9yIGluaXRpYWwgcGFnZSBsb2FkIHdpdGggaW52YWxpZFxuICAgICAgIyBzdWJwYXRoXG4gICAgICBlbHNlIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgcmV0dXJuXG4gICAgICBcbiAgcm91dGVBcHBsZXQ6IChhcHBsZXQsIGhyZWYpIC0+XG4gICAgdHJ5XG4gICAgICBAX2hhbmRsZVJvdXRlIGFwcGxldCwgaHJlZlxuICAgIGNhdGNoIGVyclxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnVW5oYW5kbGVkIGFwcGxldCdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIGVyci5tZXNzYWdlXG4gICAgICAgIHJldHVyblxuICAgIHJldHVyblxuICAgIFxuICBkaXJlY3RMaW5rOiAocmVtYWluZGVyKSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUud2FybiBcImRpcmVjdExpbmtcIiwgcmVtYWluZGVyXG4gICAgcmV0dXJuXG4gICAgXG5jbGFzcyBBcHBsZXRSb3V0ZXIgZXh0ZW5kcyBBcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICdodHRwKnJlbWFpbmRlcic6ICdkaXJlY3RMaW5rJ1xuICAgICc6YXBwbGV0KnBhdGgnOiAncm91dGVBcHBsZXQnXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIG5hbWUgaXMgJ2RpcmVjdExpbmsnXG4gICAgICBpZiBhcmdzLmxlbmd0aCA9PSAyXG4gICAgICAgIGlmIGFyZ3NbMV0gaXNudCBudWxsXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzLmpvaW4oJz8nKX1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzWzBdfVwiXG4gICAgICAgIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS53YXJuIFwidW5oYW5kbGVkIGRpcmVjdExpbmtcIlxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIk1haW5Sb3V0ZXIub25Sb3V0ZVwiLCBuYW1lLCBwYXRoLCBhcmdzXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjcmVhdGUtbWFpbi1yb3V0ZXInLCAtPlxuICBjb250cm9sbGVyID0gbmV3IFJlcXVpcmVDb250cm9sbGVyXG4gIHJvdXRlciA9IG5ldyBBcHBsZXRSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIHJldHVybiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLXJvdXRlcicsIC0+XG4gICAgcmV0dXJuIHJvdXRlclxuICByZXR1cm5cblxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cm91dGUnLCAtPlxuICBjb25zb2xlLndhcm4gXCJVc2UgJ21haW46YXBwOmNyZWF0ZS1tYWluLXJvdXRlcicgaW5zdGVhZC5cIlxuICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjcmVhdGUtbWFpbi1yb3V0ZXInXG5leHBvcnQge1xuICBSZXF1aXJlQ29udHJvbGxlclxuICBBcHBsZXRSb3V0ZXJcbiAgfVxuIl19
