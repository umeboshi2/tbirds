var AppletRouter, MainChannel, Marionette, MessageChannel, RequireController, registered_apps,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

registered_apps = {};

MainChannel.reply('main:applet:unregister', function(appname) {
  return delete registered_apps[appname];
});

MainChannel.reply('main:applet:register', function(appname, applet) {
  return registered_apps[appname] = applet;
});

MainChannel.reply('main:applet:get-applet', function(appname) {
  return registered_apps[appname];
});

RequireController = (function(superClass) {
  extend(RequireController, superClass);

  function RequireController() {
    return RequireController.__super__.constructor.apply(this, arguments);
  }

  RequireController.prototype._route_applet = function(applet) {
    return MainChannel.request("applet:" + applet + ":route");
  };

  RequireController.prototype.loadFrontDoor = function() {
    var appname, config, handler;
    config = MainChannel.request('main:app:config');
    appname = (config != null ? config.frontdoorApplet : void 0) || 'frontdoor';
    handler = System["import"]("applets/" + appname + "/main");
    if (__DEV__) {
      console.log("Frontdoor system.import", appname);
    }
    return handler.then((function(_this) {
      return function(Applet) {
        var applet, hash;
        applet = new Applet({
          appConfig: config,
          isFrontdoorApplet: true
        });
        MainChannel.request('main:applet:register', appname, applet);
        applet.start();
        if (!Backbone.history.started) {
          Backbone.history.start();
        }
        if (__DEV__) {
          hash = window.location.hash;
          return console.log("History Started at", hash);
        }
      };
    })(this));
  };

  RequireController.prototype._handle_route = function(appname, suffix) {
    var config, handler;
    if (__DEV__) {
      console.log("_handle_route", appname, suffix);
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
      throw new Error("Unhandled applet path #" + appname + "/" + suffix);
    }
    handler = System["import"]("applets/" + appname + "/main");
    if (__DEV__) {
      console.log("system.import", appname);
    }
    return handler.then(function(Applet) {
      var applet;
      applet = new Applet({
        appConfig: config
      });
      MainChannel.request('main:applet:register', appname, applet);
      applet.start();
      return Backbone.history.loadUrl();
    })["catch"](function(err) {
      if (err.message.startsWith('Cannot find module')) {
        return MessageChannel.request('warning', "Bad route " + appname + ", " + suffix + "!!");
      } else if (err.message.startsWith('Unhandled applet')) {
        return MessageChannel.request('warning', err.message);
      } else {
        throw err;
      }
    });
  };

  RequireController.prototype.routeApplet = function(applet, href) {
    var err;
    try {
      return this._handle_route(applet, href);
    } catch (error) {
      err = error;
      if (err.message.startsWith('Unhandled applet')) {
        return MessageChannel.request('warning', err.message);
      }
    }
  };

  return RequireController;

})(Marionette.Object);

AppletRouter = (function(superClass) {
  extend(AppletRouter, superClass);

  function AppletRouter() {
    return AppletRouter.__super__.constructor.apply(this, arguments);
  }

  AppletRouter.prototype.appRoutes = {
    ':applet': 'routeApplet',
    ':applet/*path': 'routeApplet'
  };

  AppletRouter.prototype.onRoute = function(name, path, args) {
    if (__DEV__) {
      return console.log("MainRouter.onRoute", name, path, args);
    }
  };

  return AppletRouter;

})(Marionette.AppRouter);

MainChannel.reply('main:app:route', function() {
  var controller, router;
  controller = new RequireController;
  router = new AppletRouter({
    controller: controller
  });
  MainChannel.reply('main-controller', function() {
    return controller;
  });
  return MainChannel.reply('main-router', function() {
    return router;
  });
});

module.exports = {
  RequireController: RequireController,
  AppletRouter: AppletRouter
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx5RkFBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQVlqQixlQUFBLEdBQWtCOztBQU1sQixXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsU0FBQyxPQUFEO1NBQzFDLE9BQU8sZUFBZ0IsQ0FBQSxPQUFBO0FBRG1CLENBQTVDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHNCQUFsQixFQUEwQyxTQUFDLE9BQUQsRUFBVSxNQUFWO1NBQ3hDLGVBQWdCLENBQUEsT0FBQSxDQUFoQixHQUEyQjtBQURhLENBQTFDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHdCQUFsQixFQUE0QyxTQUFDLE9BQUQ7U0FDMUMsZUFBZ0IsQ0FBQSxPQUFBO0FBRDBCLENBQTVDOztBQUlNOzs7Ozs7OzhCQUNKLGFBQUEsR0FBZSxTQUFDLE1BQUQ7V0FDYixXQUFXLENBQUMsT0FBWixDQUFvQixTQUFBLEdBQVUsTUFBVixHQUFpQixRQUFyQztFQURhOzs4QkFHZixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsT0FBQSxxQkFBVSxNQUFNLENBQUUseUJBQVIsSUFBMkI7SUFDckMsT0FBQSxHQUFVLE1BQU0sRUFBQyxNQUFELEVBQU4sQ0FBYyxVQUFBLEdBQVcsT0FBWCxHQUFtQixPQUFqQztJQUNWLElBQUcsT0FBSDtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVosRUFBdUMsT0FBdkMsRUFERjs7V0FF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QUVNO01BQ0osSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVosQ0FBdUIsa0JBQXZCLENBQUg7ZUFDRSxjQUFjLENBQUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyxHQUFHLENBQUMsT0FBdEMsRUFERjtPQUhGOztFQURXOzs7O0dBcERpQixVQUFVLENBQUM7O0FBMkRyQzs7Ozs7Ozt5QkFDSixTQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVksYUFBWjtJQUNBLGVBQUEsRUFBaUIsYUFEakI7Ozt5QkFHRixPQUFBLEdBQVMsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWI7SUFDUCxJQUFHLE9BQUg7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDLEVBQThDLElBQTlDLEVBREY7O0VBRE87Ozs7R0FMZ0IsVUFBVSxDQUFDOztBQVN0QyxXQUFXLENBQUMsS0FBWixDQUFrQixnQkFBbEIsRUFBb0MsU0FBQTtBQUNsQyxNQUFBO0VBQUEsVUFBQSxHQUFhLElBQUk7RUFDakIsTUFBQSxHQUFTLElBQUksWUFBSixDQUNQO0lBQUEsVUFBQSxFQUFZLFVBQVo7R0FETztFQUVULFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxTQUFBO1dBQ25DO0VBRG1DLENBQXJDO1NBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsYUFBbEIsRUFBaUMsU0FBQTtXQUMvQjtFQUQrQixDQUFqQztBQU5rQyxDQUFwQzs7QUFTQSxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsaUJBQUEsRUFBbUIsaUJBQW5CO0VBQ0EsWUFBQSxFQUFjLFlBRGQiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FXG4jIGFwcGxldHMvYXBwbmFtZS9tYWluIG5lZWRzIHRvIGJlIHJlc29sdmFibGVcbiMgYnkgdXNpbmcgd2VicGFjayByZXNvbHZlIGFsaWFzXG5cbiMgT2JqZWN0IHRvIGNvbnRhaW4gcmVnaXN0ZXJlZCBhcHBsZXRzXG4jIFVzaW5nIHRoaXMgcHJldmVudHMgYSBsb29wIHdoZW4gYSBhcHByb3V0ZVxuIyBpcyByZXF1ZXN0ZWQgYnV0IG5vdCBtYXRjaGVkIGluIGFuIEFwcFJvdXRlclxuIyBVbmxlc3MgdGhlIEFwcFJvdXRlciBoYXMgYSBtYXRjaCBmb3IgdGhlIHJlcXVlc3RlZFxuIyBhcHByb3V0ZSwgdGhlIG1haW4gcm91dGVyIHdpbGwgdHJ5IHRvIGxvYWQgdGhlXG4jIEFwcFJvdXRlciBhZ2FpbiwgY2F1c2luZyBhIGxvb3AuXG5yZWdpc3RlcmVkX2FwcHMgPSB7fVxuXG4jIEZJWE1FXG4jIFRoaXMgaXNuJ3QgYmVpbmcgdXNlZCBjdXJyZW50bHkuICBUaGlzIGlzIGhlcmVcbiMgd2hlbiB0aGUgY29kZSBkZXZlbG9wcyB0byB0aGUgcG9pbnQgb2YgYmVpbmdcbiMgYWJsZSB0byByZW1vdmUgdW51c2VkIGNoaWxkIGFwcHMgdG8gc2F2ZSBtZW1vcnkuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6dW5yZWdpc3RlcicsIChhcHBuYW1lKSAtPlxuICBkZWxldGUgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIChhcHBuYW1lLCBhcHBsZXQpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXSA9IGFwcGxldFxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6Z2V0LWFwcGxldCcsIChhcHBuYW1lKSAtPlxuICByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV1cbiAgXG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5PYmplY3RcbiAgX3JvdXRlX2FwcGxldDogKGFwcGxldCkgLT5cbiAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0IFwiYXBwbGV0OiN7YXBwbGV0fTpyb3V0ZVwiXG5cbiAgbG9hZEZyb250RG9vcjogLT5cbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgYXBwbmFtZSA9IGNvbmZpZz8uZnJvbnRkb29yQXBwbGV0IG9yICdmcm9udGRvb3InXG4gICAgaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJGcm9udGRvb3Igc3lzdGVtLmltcG9ydFwiLCBhcHBuYW1lXG4gICAgaGFuZGxlci50aGVuIChBcHBsZXQpID0+XG4gICAgICBhcHBsZXQgPSBuZXcgQXBwbGV0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICAgIGlzRnJvbnRkb29yQXBwbGV0OiB0cnVlXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKSB1bmxlc3MgQmFja2JvbmUuaGlzdG9yeS5zdGFydGVkXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaFxuICAgICAgICBjb25zb2xlLmxvZyBcIkhpc3RvcnkgU3RhcnRlZCBhdFwiLCBoYXNoXG4gICAgICBcbiAgX2hhbmRsZV9yb3V0ZTogKGFwcG5hbWUsIHN1ZmZpeCkgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIl9oYW5kbGVfcm91dGVcIiwgYXBwbmFtZSwgc3VmZml4XG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGlmIG5vdCBhcHBuYW1lXG4gICAgICBjb25zb2xlLndhcm4gXCJObyBhcHBsZXQgcmVjb2duaXplZFwiLCBhcHBuYW1lXG4gICAgICBhcHBuYW1lID0gJ2Zyb250ZG9vcidcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIGNvbmZpZy5hcHBsZXRSb3V0ZXNcbiAgICAgIGFwcG5hbWUgPSBjb25maWcuYXBwbGV0Um91dGVzW2FwcG5hbWVdXG4gICAgICBjb25zb2xlLmxvZyBcIlVzaW5nIGRlZmluZWQgYXBwbGV0Um91dGVcIiwgYXBwbmFtZVxuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgcmVnaXN0ZXJlZF9hcHBzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJVbmhhbmRsZWQgYXBwbGV0IHBhdGggIyN7YXBwbmFtZX0vI3tzdWZmaXh9XCJcbiAgICBoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcInN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSAtPlxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCBhcHBuYW1lLCBhcHBsZXRcbiAgICAgIGFwcGxldC5zdGFydCgpXG4gICAgICBCYWNrYm9uZS5oaXN0b3J5LmxvYWRVcmwoKVxuICAgIC5jYXRjaCAoZXJyKSAtPlxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnQ2Fubm90IGZpbmQgbW9kdWxlJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgXCJCYWQgcm91dGUgI3thcHBuYW1lfSwgI3tzdWZmaXh9ISFcIlxuICAgICAgIyBjYXRjaCB0aGlzIGhlcmUgZm9yIGluaXRpYWwgcGFnZSBsb2FkIHdpdGggaW52YWxpZFxuICAgICAgIyBzdWJwYXRoXG4gICAgICBlbHNlIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIFxuICByb3V0ZUFwcGxldDogKGFwcGxldCwgaHJlZikgLT5cbiAgICB0cnlcbiAgICAgIEBfaGFuZGxlX3JvdXRlIGFwcGxldCwgaHJlZlxuICAgIGNhdGNoIGVyclxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnVW5oYW5kbGVkIGFwcGxldCdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIGVyci5tZXNzYWdlXG4gICAgICAgIFxuY2xhc3MgQXBwbGV0Um91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICc6YXBwbGV0JyA6ICdyb3V0ZUFwcGxldCdcbiAgICAnOmFwcGxldC8qcGF0aCc6ICdyb3V0ZUFwcGxldCdcblxuICBvblJvdXRlOiAobmFtZSwgcGF0aCwgYXJncykgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIk1haW5Sb3V0ZXIub25Sb3V0ZVwiLCBuYW1lLCBwYXRoLCBhcmdzXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpyb3V0ZScsICgpIC0+XG4gIGNvbnRyb2xsZXIgPSBuZXcgUmVxdWlyZUNvbnRyb2xsZXJcbiAgcm91dGVyID0gbmV3IEFwcGxldFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW4tY29udHJvbGxlcicsIC0+XG4gICAgY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1yb3V0ZXInLCAtPlxuICAgIHJvdXRlclxuICAgIFxubW9kdWxlLmV4cG9ydHMgPVxuICBSZXF1aXJlQ29udHJvbGxlcjogUmVxdWlyZUNvbnRyb2xsZXJcbiAgQXBwbGV0Um91dGVyOiBBcHBsZXRSb3V0ZXJcblxuICBcbiJdfQ==
