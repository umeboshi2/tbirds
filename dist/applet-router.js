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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGVBQUE7RUFBQTs7QUFBQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2QixFQUpqQjs7Ozs7Ozs7Ozs7O0FBZ0JBLGVBQUEsR0FBa0IsQ0FBQSxFQWhCbEI7Ozs7OztBQXNCQSxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtFQUMxQyxPQUFPLGVBQWdCLENBQUEsT0FBQTtBQURtQixDQUE1Qzs7QUFJQSxXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUE7RUFDeEMsZUFBZ0IsQ0FBQSxPQUFBLENBQWhCLEdBQTJCO0FBRGEsQ0FBMUM7O0FBSUEsV0FBVyxDQUFDLEtBQVosQ0FBa0Isd0JBQWxCLEVBQTRDLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDMUMsU0FBTyxlQUFnQixDQUFBLE9BQUE7QUFEbUIsQ0FBNUMsRUE5QkE7Ozs7O0FBcUNNLG9CQUFOLE1BQUEsa0JBQUEsUUFBZ0MsU0FBaEM7RUFDRSxhQUFlLENBQUEsQ0FBQTtBQUNiLFFBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtJQUFBLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7SUFDVCxPQUFBLHFCQUFVLE1BQU0sQ0FBRSx5QkFBUixJQUEyQixZQURyQzs7SUFHQSxPQUFBLEdBQVU7SUFDVixJQUFHLE9BQUEsSUFBWSxLQUFmO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxPQUF2QyxFQURGOztJQUVBLE9BQU8sQ0FBQyxJQUFSLENBQWEsUUFBQSxDQUFDLE1BQUQsQ0FBQTtBQUVYLFVBQUEsTUFBQTs7TUFBQSxNQUFBLEdBQVMsSUFBSSxNQUFNLENBQUMsT0FBWCxDQUNQO1FBQUEsU0FBQSxFQUFXLE1BQVg7UUFDQSxPQUFBLEVBQVMsT0FEVDtRQUVBLGlCQUFBLEVBQW1CLElBRm5CO1FBR0EsV0FBQSxFQUFhO01BSGIsQ0FETztNQUtULFdBQVcsQ0FBQyxPQUFaLENBQW9CLHNCQUFwQixFQUE0QyxPQUE1QyxFQUFxRCxNQUFyRDtNQUNBLE1BQU0sQ0FBQyxLQUFQLENBQUE7TUFDQSxJQUFBLENBQWdDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBakQ7UUFBQSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQWpCLENBQUEsRUFBQTs7SUFUVyxDQUFiO0VBUGE7O0VBb0JmLFlBQWMsQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFBO0FBQ1osUUFBQSxNQUFBLEVBQUE7SUFBQSxJQUFHLE9BQUEsSUFBWSxLQUFmO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLE9BQTVCLEVBQXFDLE1BQXJDLEVBREY7O0lBRUEsSUFBRyxNQUFBLElBQVcsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsR0FBbEIsQ0FBZDtBQUNFLGFBQU0sTUFBTSxDQUFDLFVBQVAsQ0FBa0IsR0FBbEIsQ0FBTjtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksbUJBQVosRUFBaUMsTUFBakM7UUFDQSxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxDQUFiO01BRlgsQ0FERjs7SUFJQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsSUFBRyxDQUFJLE9BQVA7TUFDRSxPQUFPLENBQUMsSUFBUixDQUFhLHNCQUFiLEVBQXFDLE9BQXJDO01BQ0EsT0FBQSxHQUFVLFlBRlo7O0lBR0EsSUFBRyxhQUFXLE1BQU0sQ0FBQyxJQUFQLENBQVksTUFBTSxDQUFDLFlBQW5CLENBQVgsRUFBQSxPQUFBLE1BQUg7TUFDRSxPQUFBLEdBQVUsTUFBTSxDQUFDLFlBQWEsQ0FBQSxPQUFBO01BQzlCLElBQUcsT0FBSDtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksMkJBQVosRUFBeUMsT0FBekMsRUFERjtPQUZGOztJQUlBLElBQUcsYUFBVyxNQUFNLENBQUMsSUFBUCxDQUFZLGVBQVosQ0FBWCxFQUFBLE9BQUEsTUFBSDtNQUNFLE1BQU0sSUFBSSxLQUFKLENBQVUsQ0FBQSx1QkFBQSxDQUFBLENBQTBCLE9BQTFCLENBQWtDLENBQWxDLENBQUEsQ0FBcUMsTUFBckMsQ0FBQSxDQUFWLEVBRFI7S0FkQTs7SUFpQkEsT0FBQSxHQUFVO0lBQ1YsSUFBRyxPQUFBLElBQVksS0FBZjtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWixFQUE2QixPQUE3QixFQURGOztJQUVBLE9BQU8sQ0FBQyxJQUFSLENBQWEsUUFBQSxDQUFDLE1BQUQsQ0FBQTtBQUVYLFVBQUEsTUFBQTs7TUFBQSxNQUFBLEdBQVMsSUFBSSxNQUFNLENBQUMsT0FBWCxDQUNQO1FBQUEsU0FBQSxFQUFXLE1BQVg7UUFDQSxPQUFBLEVBQVMsT0FEVDtRQUVBLFdBQUEsRUFBYTtNQUZiLENBRE87TUFJVCxXQUFXLENBQUMsT0FBWixDQUFvQixzQkFBcEIsRUFBNEMsT0FBNUMsRUFBcUQsTUFBckQ7TUFDQSxNQUFNLENBQUMsS0FBUCxDQUFBO01BQ0EsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFqQixDQUFBO0lBUlcsQ0FBYixDQVVBLENBQUMsS0FWRCxDQVVPLFFBQUEsQ0FBQyxHQUFELENBQUE7TUFDTCxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBWixDQUF1QixvQkFBdkIsQ0FBSDtRQUNFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLENBQUEsVUFBQSxDQUFBLENBQWEsT0FBYixDQUFxQixFQUFyQixDQUFBLENBQXlCLE1BQXpCLENBQWdDLEVBQWhDLENBQWxDLEVBREY7OztPQUFBLE1BS0ssSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVosQ0FBdUIsa0JBQXZCLENBQUg7UUFDSCxjQUFjLENBQUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyxHQUFHLENBQUMsT0FBdEMsRUFERztPQUFBLE1BQUE7UUFJSCxNQUFNLElBSkg7O0lBTkEsQ0FWUDtFQXJCWTs7RUE0Q2QsV0FBYSxDQUFDLE1BQUQsRUFBUyxJQUFULENBQUE7QUFDWCxRQUFBO0FBQUE7TUFDRSxJQUFDLENBQUEsWUFBRCxDQUFjLE1BQWQsRUFBc0IsSUFBdEIsRUFERjtLQUFBLGFBQUE7TUFFTTtNQUNKLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFaLENBQXVCLGtCQUF2QixDQUFIO1FBQ0UsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsR0FBRyxDQUFDLE9BQXRDO0FBQ0EsZUFGRjtPQUhGOztFQURXOztFQVNiLFVBQVksQ0FBQyxTQUFELENBQUE7SUFDVixJQUFHLE9BQUg7TUFDRSxPQUFPLENBQUMsSUFBUixDQUFhLFlBQWIsRUFBMkIsU0FBM0IsRUFERjs7RUFEVTs7QUExRWQ7O0FBK0VNO0VBQU4sTUFBQSxhQUFBLFFBQTJCLFVBQTNCO0lBSUUsT0FBUyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUFBO0FBQ1AsVUFBQTtNQUFBLElBQUcsSUFBQSxLQUFRLFlBQVg7UUFDRSxJQUFHLElBQUksQ0FBQyxNQUFMLEtBQWUsQ0FBbEI7VUFDRSxJQUFHLElBQUssQ0FBQSxDQUFBLENBQUwsS0FBYSxJQUFoQjtZQUNFLEdBQUEsR0FBTSxDQUFBLElBQUEsQ0FBQSxDQUFPLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixDQUFQLENBQUEsRUFEUjtXQUFBLE1BQUE7WUFHRSxHQUFBLEdBQU0sQ0FBQSxJQUFBLENBQUEsQ0FBTyxJQUFLLENBQUEsQ0FBQSxDQUFaLENBQUEsRUFIUjs7VUFJQSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQVosRUFBaUIsUUFBakIsRUFMRjtTQUFBLE1BQUE7VUFPRSxPQUFPLENBQUMsSUFBUixDQUFhLHNCQUFiLEVBUEY7U0FERjs7TUFTQSxJQUFHLE9BQUEsSUFBWSxLQUFmO2VBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQyxJQUFsQyxFQUF3QyxJQUF4QyxFQUE4QyxJQUE5QyxFQURGOztJQVZPOztFQUpYOzt5QkFDRSxTQUFBLEdBQ0U7SUFBQSxnQkFBQSxFQUFrQixZQUFsQjtJQUNBLGNBQUEsRUFBZ0I7RUFEaEI7Ozs7OztBQWVKLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGdCQUFsQixFQUFvQyxRQUFBLENBQUEsQ0FBQTtBQUNsQyxNQUFBLFVBQUEsRUFBQTtFQUFBLFVBQUEsR0FBYSxJQUFJO0VBQ2pCLE1BQUEsR0FBUyxJQUFJLFlBQUosQ0FDUDtJQUFBLFVBQUEsRUFBWTtFQUFaLENBRE87RUFFVCxXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsUUFBQSxDQUFBLENBQUE7QUFDbkMsV0FBTztFQUQ0QixDQUFyQztFQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGFBQWxCLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO0FBQy9CLFdBQU87RUFEd0IsQ0FBakM7QUFOa0MsQ0FBcEM7O0FBVUEsT0FBQTtFQUNFLGlCQURGO0VBRUUsWUFGRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1uT2JqZWN0IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBBcHBSb3V0ZXIgZnJvbSAnbWFyaW9uZXR0ZS5hcHByb3V0ZXInXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuIyBGSVhNRVxuIyBhcHBsZXRzL2FwcG5hbWUvbWFpbiBuZWVkcyB0byBiZSByZXNvbHZhYmxlXG4jIGJ5IHVzaW5nIHdlYnBhY2sgcmVzb2x2ZSBhbGlhc1xuXG4jIE9iamVjdCB0byBjb250YWluIHJlZ2lzdGVyZWQgYXBwbGV0c1xuIyBVc2luZyB0aGlzIHByZXZlbnRzIGEgbG9vcCB3aGVuIGEgYXBwcm91dGVcbiMgaXMgcmVxdWVzdGVkIGJ1dCBub3QgbWF0Y2hlZCBpbiBhbiBBcHBSb3V0ZXJcbiMgVW5sZXNzIHRoZSBBcHBSb3V0ZXIgaGFzIGEgbWF0Y2ggZm9yIHRoZSByZXF1ZXN0ZWRcbiMgYXBwcm91dGUsIHRoZSBtYWluIHJvdXRlciB3aWxsIHRyeSB0byBsb2FkIHRoZVxuIyBBcHBSb3V0ZXIgYWdhaW4sIGNhdXNpbmcgYSBsb29wLlxucmVnaXN0ZXJlZF9hcHBzID0ge31cblxuIyBGSVhNRVxuIyBUaGlzIGlzbid0IGJlaW5nIHVzZWQgY3VycmVudGx5LiAgVGhpcyBpcyBoZXJlXG4jIHdoZW4gdGhlIGNvZGUgZGV2ZWxvcHMgdG8gdGhlIHBvaW50IG9mIGJlaW5nXG4jIGFibGUgdG8gcmVtb3ZlIHVudXNlZCBjaGlsZCBhcHBzIHRvIHNhdmUgbWVtb3J5LlxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OnVucmVnaXN0ZXInLCAoYXBwbmFtZSkgLT5cbiAgZGVsZXRlIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCAoYXBwbmFtZSwgYXBwbGV0KSAtPlxuICByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV0gPSBhcHBsZXRcbiAgcmV0dXJuXG4gIFxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OmdldC1hcHBsZXQnLCAoYXBwbmFtZSkgLT5cbiAgcmV0dXJuIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuXG4jIEZJWE1FOiBVc2luZyBiYWNrdGlja3MgZm9yIGltcG9ydCgpIHN0YXRlbWVudHMuIElubmVyXG4jIGpzIGJhY2t0aWNrcyBhcmUgZXNjYXBlZCBmb3IgZHluYW1pYyBleHByZXNzaW9ucy5cbiMgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy9jb2ZmZWVzY3JpcHQvaXNzdWVzLzQ4MzQjaXNzdWVjb21tZW50LTM1NDM3NTYyN1xuXG5jbGFzcyBSZXF1aXJlQ29udHJvbGxlciBleHRlbmRzIE1uT2JqZWN0XG4gIGxvYWRGcm9udERvb3I6IC0+XG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGFwcG5hbWUgPSBjb25maWc/LmZyb250ZG9vckFwcGxldCBvciAnZnJvbnRkb29yJ1xuICAgICNoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBoYW5kbGVyID0gYGltcG9ydChcXGBhcHBsZXRzLyR7YXBwbmFtZX0vbWFpblxcYClgXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiRnJvbnRkb29yIHN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgIyBGSVhNRSBmaXggYXBwbGV0IHN0cnVjdHVyZSB0byBwcm92aWRlIGFwcHJvcHJpYXRlIGV4cG9ydFxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldC5kZWZhdWx0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGFwcE5hbWU6IGFwcG5hbWVcbiAgICAgICAgaXNGcm9udGRvb3JBcHBsZXQ6IHRydWVcbiAgICAgICAgY2hhbm5lbE5hbWU6IGFwcG5hbWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpIHVubGVzcyBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0ZWRcbiAgICAgIHJldHVyblxuICAgIHJldHVyblxuICAgIFxuICBfaGFuZGxlUm91dGU6IChhcHBuYW1lLCBzdWZmaXgpIC0+XG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiX2hhbmRsZVJvdXRlXCIsIGFwcG5hbWUsIHN1ZmZpeFxuICAgIGlmIHN1ZmZpeCBhbmQgc3VmZml4LnN0YXJ0c1dpdGggJy8nXG4gICAgICB3aGlsZSBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgICAgY29uc29sZS5sb2cgXCJTdWZmaXguU3RhcnRzd2l0aFwiLCBzdWZmaXhcbiAgICAgICAgc3VmZml4ID0gc3VmZml4LnNsaWNlIDFcbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgaWYgbm90IGFwcG5hbWVcbiAgICAgIGNvbnNvbGUud2FybiBcIk5vIGFwcGxldCByZWNvZ25pemVkXCIsIGFwcG5hbWVcbiAgICAgIGFwcG5hbWUgPSAnZnJvbnRkb29yJ1xuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgY29uZmlnLmFwcGxldFJvdXRlc1xuICAgICAgYXBwbmFtZSA9IGNvbmZpZy5hcHBsZXRSb3V0ZXNbYXBwbmFtZV1cbiAgICAgIGlmIF9fREVWX19cbiAgICAgICAgY29uc29sZS5sb2cgXCJVc2luZyBkZWZpbmVkIGFwcGxldFJvdXRlXCIsIGFwcG5hbWVcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIHJlZ2lzdGVyZWRfYXBwc1xuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVW5oYW5kbGVkIGFwcGxldCBwYXRoICMje2FwcG5hbWV9LyN7c3VmZml4fVwiXG4gICAgI2hhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGhhbmRsZXIgPSBgaW1wb3J0KFxcYGFwcGxldHMvJHthcHBuYW1lfS9tYWluXFxgKWBcbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJhY2tib25lLmhpc3RvcnkubG9hZFVybCgpXG4gICAgICByZXR1cm5cbiAgICAuY2F0Y2ggKGVycikgLT5cbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ0Nhbm5vdCBmaW5kIG1vZHVsZSdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIFwiQmFkIHJvdXRlICN7YXBwbmFtZX0sICN7c3VmZml4fSEhXCJcbiAgICAgICAgcmV0dXJuXG4gICAgICAjIGNhdGNoIHRoaXMgaGVyZSBmb3IgaW5pdGlhbCBwYWdlIGxvYWQgd2l0aCBpbnZhbGlkXG4gICAgICAjIHN1YnBhdGhcbiAgICAgIGVsc2UgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnVW5oYW5kbGVkIGFwcGxldCdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIGVyci5tZXNzYWdlXG4gICAgICAgIHJldHVyblxuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBlcnJcbiAgICByZXR1cm5cbiAgICAgIFxuICByb3V0ZUFwcGxldDogKGFwcGxldCwgaHJlZikgLT5cbiAgICB0cnlcbiAgICAgIEBfaGFuZGxlUm91dGUgYXBwbGV0LCBocmVmXG4gICAgY2F0Y2ggZXJyXG4gICAgICBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuXG4gICAgcmV0dXJuXG4gICAgXG4gIGRpcmVjdExpbms6IChyZW1haW5kZXIpIC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS53YXJuIFwiZGlyZWN0TGlua1wiLCByZW1haW5kZXJcbiAgICByZXR1cm5cbiAgICBcbmNsYXNzIEFwcGxldFJvdXRlciBleHRlbmRzIEFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJ2h0dHAqcmVtYWluZGVyJzogJ2RpcmVjdExpbmsnXG4gICAgJzphcHBsZXQqcGF0aCc6ICdyb3V0ZUFwcGxldCdcbiAgb25Sb3V0ZTogKG5hbWUsIHBhdGgsIGFyZ3MpIC0+XG4gICAgaWYgbmFtZSBpcyAnZGlyZWN0TGluaydcbiAgICAgIGlmIGFyZ3MubGVuZ3RoID09IDJcbiAgICAgICAgaWYgYXJnc1sxXSBpc250IG51bGxcbiAgICAgICAgICB1cmwgPSBcImh0dHAje2FyZ3Muam9pbignPycpfVwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB1cmwgPSBcImh0dHAje2FyZ3NbMF19XCJcbiAgICAgICAgd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLndhcm4gXCJ1bmhhbmRsZWQgZGlyZWN0TGlua1wiXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiTWFpblJvdXRlci5vblJvdXRlXCIsIG5hbWUsIHBhdGgsIGFyZ3NcblxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnJvdXRlJywgKCkgLT5cbiAgY29udHJvbGxlciA9IG5ldyBSZXF1aXJlQ29udHJvbGxlclxuICByb3V0ZXIgPSBuZXcgQXBwbGV0Um91dGVyXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1jb250cm9sbGVyJywgLT5cbiAgICByZXR1cm4gY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1yb3V0ZXInLCAtPlxuICAgIHJldHVybiByb3V0ZXJcbiAgcmV0dXJuXG5cbmV4cG9ydCB7XG4gIFJlcXVpcmVDb250cm9sbGVyXG4gIEFwcGxldFJvdXRlclxuICB9XG4iXX0=
