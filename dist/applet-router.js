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

  RequireController.prototype.directLink = function(remainder) {
    if (__DEV__) {
      return console.log("directLink", remainder);
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
    'http*remainder': 'directLink',
    ':applet': 'routeApplet',
    ':applet/*path': 'routeApplet'
  };

  AppletRouter.prototype.onRoute = function(name, path, args) {
    var url;
    if (name === 'directLink') {
      if (args.length === 2) {
        if (args[1] !== null) {
          url = "http" + (args.join('?'));
        } else {
          url = "http" + args[0];
        }
        window.open(url, '_blank');
      } else {
        console.log("unhandled directLink");
      }
    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx5RkFBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQVlqQixlQUFBLEdBQWtCOztBQU1sQixXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsU0FBQyxPQUFEO1NBQzFDLE9BQU8sZUFBZ0IsQ0FBQSxPQUFBO0FBRG1CLENBQTVDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHNCQUFsQixFQUEwQyxTQUFDLE9BQUQsRUFBVSxNQUFWO1NBQ3hDLGVBQWdCLENBQUEsT0FBQSxDQUFoQixHQUEyQjtBQURhLENBQTFDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHdCQUFsQixFQUE0QyxTQUFDLE9BQUQ7U0FDMUMsZUFBZ0IsQ0FBQSxPQUFBO0FBRDBCLENBQTVDOztBQUlNOzs7Ozs7OzhCQUNKLGFBQUEsR0FBZSxTQUFDLE1BQUQ7V0FDYixXQUFXLENBQUMsT0FBWixDQUFvQixTQUFBLEdBQVUsTUFBVixHQUFpQixRQUFyQztFQURhOzs4QkFHZixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxNQUFBLEdBQVMsV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ1QsT0FBQSxxQkFBVSxNQUFNLENBQUUseUJBQVIsSUFBMkI7SUFDckMsT0FBQSxHQUFVLE1BQU0sRUFBQyxNQUFELEVBQU4sQ0FBYyxVQUFBLEdBQVcsT0FBWCxHQUFtQixPQUFqQztJQUNWLElBQUcsT0FBSDtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVosRUFBdUMsT0FBdkMsRUFERjs7V0FF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QWEsSUFBSTtFQUNqQixNQUFBLEdBQVMsSUFBSSxZQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVksVUFBWjtHQURPO0VBRVQsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFNBQUE7V0FDbkM7RUFEbUMsQ0FBckM7U0FFQSxXQUFXLENBQUMsS0FBWixDQUFrQixhQUFsQixFQUFpQyxTQUFBO1dBQy9CO0VBRCtCLENBQWpDO0FBTmtDLENBQXBDOztBQVNBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxpQkFBQSxFQUFtQixpQkFBbkI7RUFDQSxZQUFBLEVBQWMsWUFEZCIsInNvdXJjZXNDb250ZW50IjpbIk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiMgRklYTUVcbiMgYXBwbGV0cy9hcHBuYW1lL21haW4gbmVlZHMgdG8gYmUgcmVzb2x2YWJsZVxuIyBieSB1c2luZyB3ZWJwYWNrIHJlc29sdmUgYWxpYXNcblxuIyBPYmplY3QgdG8gY29udGFpbiByZWdpc3RlcmVkIGFwcGxldHNcbiMgVXNpbmcgdGhpcyBwcmV2ZW50cyBhIGxvb3Agd2hlbiBhIGFwcHJvdXRlXG4jIGlzIHJlcXVlc3RlZCBidXQgbm90IG1hdGNoZWQgaW4gYW4gQXBwUm91dGVyXG4jIFVubGVzcyB0aGUgQXBwUm91dGVyIGhhcyBhIG1hdGNoIGZvciB0aGUgcmVxdWVzdGVkXG4jIGFwcHJvdXRlLCB0aGUgbWFpbiByb3V0ZXIgd2lsbCB0cnkgdG8gbG9hZCB0aGVcbiMgQXBwUm91dGVyIGFnYWluLCBjYXVzaW5nIGEgbG9vcC5cbnJlZ2lzdGVyZWRfYXBwcyA9IHt9XG5cbiMgRklYTUVcbiMgVGhpcyBpc24ndCBiZWluZyB1c2VkIGN1cnJlbnRseS4gIFRoaXMgaXMgaGVyZVxuIyB3aGVuIHRoZSBjb2RlIGRldmVsb3BzIHRvIHRoZSBwb2ludCBvZiBiZWluZ1xuIyBhYmxlIHRvIHJlbW92ZSB1bnVzZWQgY2hpbGQgYXBwcyB0byBzYXZlIG1lbW9yeS5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDp1bnJlZ2lzdGVyJywgKGFwcG5hbWUpIC0+XG4gIGRlbGV0ZSByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV1cblxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgKGFwcG5hbWUsIGFwcGxldCkgLT5cbiAgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdID0gYXBwbGV0XG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDpnZXQtYXBwbGV0JywgKGFwcG5hbWUpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuICBcblxuY2xhc3MgUmVxdWlyZUNvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLk9iamVjdFxuICBfcm91dGVfYXBwbGV0OiAoYXBwbGV0KSAtPlxuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgXCJhcHBsZXQ6I3thcHBsZXR9OnJvdXRlXCJcblxuICBsb2FkRnJvbnREb29yOiAtPlxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBhcHBuYW1lID0gY29uZmlnPy5mcm9udGRvb3JBcHBsZXQgb3IgJ2Zyb250ZG9vcidcbiAgICBoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIkZyb250ZG9vciBzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgPT5cbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXRcbiAgICAgICAgYXBwQ29uZmlnOiBjb25maWdcbiAgICAgICAgaXNGcm9udGRvb3JBcHBsZXQ6IHRydWVcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpIHVubGVzcyBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0ZWRcbiAgICAgIGlmIF9fREVWX19cbiAgICAgICAgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoXG4gICAgICAgIGNvbnNvbGUubG9nIFwiSGlzdG9yeSBTdGFydGVkIGF0XCIsIGhhc2hcbiAgICAgIFxuICBfaGFuZGxlX3JvdXRlOiAoYXBwbmFtZSwgc3VmZml4KSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiX2hhbmRsZV9yb3V0ZVwiLCBhcHBuYW1lLCBzdWZmaXhcbiAgICBjb25maWcgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpjb25maWcnXG4gICAgaWYgbm90IGFwcG5hbWVcbiAgICAgIGNvbnNvbGUud2FybiBcIk5vIGFwcGxldCByZWNvZ25pemVkXCIsIGFwcG5hbWVcbiAgICAgIGFwcG5hbWUgPSAnZnJvbnRkb29yJ1xuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgY29uZmlnLmFwcGxldFJvdXRlc1xuICAgICAgYXBwbmFtZSA9IGNvbmZpZy5hcHBsZXRSb3V0ZXNbYXBwbmFtZV1cbiAgICAgIGNvbnNvbGUubG9nIFwiVXNpbmcgZGVmaW5lZCBhcHBsZXRSb3V0ZVwiLCBhcHBuYW1lXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyByZWdpc3RlcmVkX2FwcHNcbiAgICAgIHRocm93IG5ldyBFcnJvciBcIlVuaGFuZGxlZCBhcHBsZXQgcGF0aCAjI3thcHBuYW1lfS8je3N1ZmZpeH1cIlxuICAgIGhhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwic3lzdGVtLmltcG9ydFwiLCBhcHBuYW1lXG4gICAgaGFuZGxlci50aGVuIChBcHBsZXQpIC0+XG4gICAgICBhcHBsZXQgPSBuZXcgQXBwbGV0XG4gICAgICAgIGFwcENvbmZpZzogY29uZmlnXG4gICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcGxldDpyZWdpc3RlcicsIGFwcG5hbWUsIGFwcGxldFxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJhY2tib25lLmhpc3RvcnkubG9hZFVybCgpXG4gICAgLmNhdGNoIChlcnIpIC0+XG4gICAgICBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdDYW5ub3QgZmluZCBtb2R1bGUnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBcIkJhZCByb3V0ZSAje2FwcG5hbWV9LCAje3N1ZmZpeH0hIVwiXG4gICAgICAjIGNhdGNoIHRoaXMgaGVyZSBmb3IgaW5pdGlhbCBwYWdlIGxvYWQgd2l0aCBpbnZhbGlkXG4gICAgICAjIHN1YnBhdGhcbiAgICAgIGVsc2UgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnVW5oYW5kbGVkIGFwcGxldCdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIGVyci5tZXNzYWdlXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IGVyclxuICAgICAgXG4gIHJvdXRlQXBwbGV0OiAoYXBwbGV0LCBocmVmKSAtPlxuICAgIHRyeVxuICAgICAgQF9oYW5kbGVfcm91dGUgYXBwbGV0LCBocmVmXG4gICAgY2F0Y2ggZXJyXG4gICAgICBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgZGlyZWN0TGluazogKHJlbWFpbmRlcikgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcImRpcmVjdExpbmtcIiwgcmVtYWluZGVyXG4gICAgXG5jbGFzcyBBcHBsZXRSb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJ2h0dHAqcmVtYWluZGVyJzogJ2RpcmVjdExpbmsnXG4gICAgJzphcHBsZXQnIDogJ3JvdXRlQXBwbGV0J1xuICAgICc6YXBwbGV0LypwYXRoJzogJ3JvdXRlQXBwbGV0J1xuXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIG5hbWUgaXMgJ2RpcmVjdExpbmsnXG4gICAgICBpZiBhcmdzLmxlbmd0aCA9PSAyXG4gICAgICAgIGlmIGFyZ3NbMV0gaXNudCBudWxsXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzLmpvaW4oJz8nKX1cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdXJsID0gXCJodHRwI3thcmdzWzBdfVwiXG4gICAgICAgIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcbiAgICAgIGVsc2VcbiAgICAgICAgY29uc29sZS5sb2cgXCJ1bmhhbmRsZWQgZGlyZWN0TGlua1wiXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJNYWluUm91dGVyLm9uUm91dGVcIiwgbmFtZSwgcGF0aCwgYXJnc1xuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6cm91dGUnLCAoKSAtPlxuICBjb250cm9sbGVyID0gbmV3IFJlcXVpcmVDb250cm9sbGVyXG4gIHJvdXRlciA9IG5ldyBBcHBsZXRSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIGNvbnRyb2xsZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW4tcm91dGVyJywgLT5cbiAgICByb3V0ZXJcbiAgICBcbm1vZHVsZS5leHBvcnRzID1cbiAgUmVxdWlyZUNvbnRyb2xsZXI6IFJlcXVpcmVDb250cm9sbGVyXG4gIEFwcGxldFJvdXRlcjogQXBwbGV0Um91dGVyXG5cbiAgXG4iXX0=
