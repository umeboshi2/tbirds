var MainChannel, MainRouter, Marionette, MessageChannel, RequireController, registered_apps,
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

MainChannel.reply('main:applet:register', function(appname) {
  return registered_apps[appname] = true;
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
        applet = new Applet;
        MainChannel.request('main:applet:register', appname);
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
    return handler.then((function(_this) {
      return function(Applet) {
        var applet;
        applet = new Applet;
        MainChannel.request('main:applet:register', appname);
        applet.start();
        return Backbone.history.loadUrl();
      };
    })(this))["catch"](function(err) {
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

MainRouter = (function(superClass) {
  extend(MainRouter, superClass);

  function MainRouter() {
    return MainRouter.__super__.constructor.apply(this, arguments);
  }

  MainRouter.prototype.appRoutes = {
    ':applet': 'routeApplet',
    ':applet/*path': 'routeApplet'
  };

  MainRouter.prototype.onRoute = function(name, path, args) {
    if (__DEV__) {
      return console.log("MainRouter.onRoute", name, path, args);
    }
  };

  return MainRouter;

})(Marionette.AppRouter);

MainChannel.reply('main:app:route', function() {
  var controller, router;
  controller = new RequireController;
  router = new MainRouter({
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
  MainRouter: MainRouter
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yb3V0ZXIuanMiLCJzb3VyY2VzIjpbIm1haW4tcm91dGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHVGQUFBO0VBQUE7Ozs7QUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBWWpCLGVBQUEsR0FBa0I7O0FBTWxCLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHdCQUFsQixFQUE0QyxTQUFDLE9BQUQ7U0FDMUMsT0FBTyxlQUFnQixDQUFBLE9BQUE7QUFEbUIsQ0FBNUM7O0FBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0Isc0JBQWxCLEVBQTBDLFNBQUMsT0FBRDtTQUN4QyxlQUFnQixDQUFBLE9BQUEsQ0FBaEIsR0FBMkI7QUFEYSxDQUExQzs7QUFHTTs7Ozs7Ozs4QkFDSixhQUFBLEdBQWUsU0FBQyxNQUFEO1dBQ2IsV0FBVyxDQUFDLE9BQVosQ0FBb0IsU0FBQSxHQUFVLE1BQVYsR0FBaUIsUUFBckM7RUFEYTs7OEJBR2YsYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsTUFBQSxHQUFTLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtJQUNULE9BQUEscUJBQVUsTUFBTSxDQUFFLHlCQUFSLElBQTJCO0lBQ3JDLE9BQUEsR0FBVSxNQUFNLEVBQUMsTUFBRCxFQUFOLENBQWMsVUFBQSxHQUFXLE9BQVgsR0FBbUIsT0FBakM7SUFDVixJQUFHLE9BQUg7TUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLHlCQUFaLEVBQXVDLE9BQXZDLEVBREY7O1dBRUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsTUFBRDtBQUNYLFlBQUE7UUFBQSxNQUFBLEdBQVMsSUFBSTtRQUNiLFdBQVcsQ0FBQyxP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LEdBQ0U7SUFBQSxTQUFBLEVBQVksYUFBWjtJQUNBLGVBQUEsRUFBaUIsYUFEakI7Ozt1QkFHRixPQUFBLEdBQVMsU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWI7SUFDUCxJQUFHLE9BQUg7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDLEVBQThDLElBQTlDLEVBREY7O0VBRE87Ozs7R0FMYyxVQUFVLENBQUM7O0FBU3BDLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGdCQUFsQixFQUFvQyxTQUFBO0FBQ2xDLE1BQUE7RUFBQSxVQUFBLEdBQWEsSUFBSTtFQUNqQixNQUFBLEdBQVMsSUFBSSxVQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVksVUFBWjtHQURPO0VBRVQsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFNBQUE7V0FDbkM7RUFEbUMsQ0FBckM7U0FFQSxXQUFXLENBQUMsS0FBWixDQUFrQixhQUFsQixFQUFpQyxTQUFBO1dBQy9CO0VBRCtCLENBQWpDO0FBTmtDLENBQXBDOztBQVNBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxpQkFBQSxFQUFtQixpQkFBbkI7RUFDQSxVQUFBLEVBQVksVUFEWiIsInNvdXJjZXNDb250ZW50IjpbIk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiMgRklYTUVcbiMgYXBwbGV0cy9hcHBuYW1lL21haW4gbmVlZHMgdG8gYmUgcmVzb2x2YWJsZVxuIyBieSB1c2luZyB3ZWJwYWNrIHJlc29sdmUgYWxpYXNcblxuIyBPYmplY3QgdG8gY29udGFpbiByZWdpc3RlcmVkIGFwcGxldHNcbiMgVXNpbmcgdGhpcyBwcmV2ZW50cyBhIGxvb3Agd2hlbiBhIGFwcHJvdXRlXG4jIGlzIHJlcXVlc3RlZCBidXQgbm90IG1hdGNoZWQgaW4gYW4gQXBwUm91dGVyXG4jIFVubGVzcyB0aGUgQXBwUm91dGVyIGhhcyBhIG1hdGNoIGZvciB0aGUgcmVxdWVzdGVkXG4jIGFwcHJvdXRlLCB0aGUgbWFpbiByb3V0ZXIgd2lsbCB0cnkgdG8gbG9hZCB0aGVcbiMgQXBwUm91dGVyIGFnYWluLCBjYXVzaW5nIGEgbG9vcC5cbnJlZ2lzdGVyZWRfYXBwcyA9IHt9XG5cbiMgRklYTUVcbiMgVGhpcyBpc24ndCBiZWluZyB1c2VkIGN1cnJlbnRseS4gIFRoaXMgaXMgaGVyZVxuIyB3aGVuIHRoZSBjb2RlIGRldmVsb3BzIHRvIHRoZSBwb2ludCBvZiBiZWluZ1xuIyBhYmxlIHRvIHJlbW92ZSB1bnVzZWQgY2hpbGQgYXBwcyB0byBzYXZlIG1lbW9yeS5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcGxldDp1bnJlZ2lzdGVyJywgKGFwcG5hbWUpIC0+XG4gIGRlbGV0ZSByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV1cblxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgKGFwcG5hbWUpIC0+XG4gIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXSA9IHRydWVcblxuY2xhc3MgUmVxdWlyZUNvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLk9iamVjdFxuICBfcm91dGVfYXBwbGV0OiAoYXBwbGV0KSAtPlxuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgXCJhcHBsZXQ6I3thcHBsZXR9OnJvdXRlXCJcblxuICBsb2FkRnJvbnREb29yOiAtPlxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBhcHBuYW1lID0gY29uZmlnPy5mcm9udGRvb3JBcHBsZXQgb3IgJ2Zyb250ZG9vcidcbiAgICBoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIkZyb250ZG9vciBzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgPT5cbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXRcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZVxuICAgICAgYXBwbGV0LnN0YXJ0KClcbiAgICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKSB1bmxlc3MgQmFja2JvbmUuaGlzdG9yeS5zdGFydGVkXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaFxuICAgICAgICBjb25zb2xlLmxvZyBcIkhpc3RvcnkgU3RhcnRlZCBhdFwiLCBoYXNoXG4gICAgICBcbiAgX2hhbmRsZV9yb3V0ZTogKGFwcG5hbWUsIHN1ZmZpeCkgLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIl9oYW5kbGVfcm91dGVcIiwgYXBwbmFtZSwgc3VmZml4XG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGlmIG5vdCBhcHBuYW1lXG4gICAgICBjb25zb2xlLndhcm4gXCJObyBhcHBsZXQgcmVjb2duaXplZFwiLCBhcHBuYW1lXG4gICAgICBhcHBuYW1lID0gJ2Zyb250ZG9vcidcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIGNvbmZpZy5hcHBsZXRSb3V0ZXNcbiAgICAgIGFwcG5hbWUgPSBjb25maWcuYXBwbGV0Um91dGVzW2FwcG5hbWVdXG4gICAgICBjb25zb2xlLmxvZyBcIlVzaW5nIGRlZmluZWQgYXBwbGV0Um91dGVcIiwgYXBwbmFtZVxuICAgIGlmIGFwcG5hbWUgaW4gT2JqZWN0LmtleXMgcmVnaXN0ZXJlZF9hcHBzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJVbmhhbmRsZWQgYXBwbGV0IHBhdGggIyN7YXBwbmFtZX0vI3tzdWZmaXh9XCJcbiAgICBoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcInN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSA9PlxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldFxuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCBhcHBuYW1lXG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5sb2FkVXJsKClcbiAgICAuY2F0Y2ggKGVycikgLT5cbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ0Nhbm5vdCBmaW5kIG1vZHVsZSdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIFwiQmFkIHJvdXRlICN7YXBwbmFtZX0sICN7c3VmZml4fSEhXCJcbiAgICAgICMgY2F0Y2ggdGhpcyBoZXJlIGZvciBpbml0aWFsIHBhZ2UgbG9hZCB3aXRoIGludmFsaWRcbiAgICAgICMgc3VicGF0aFxuICAgICAgZWxzZSBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICBcbiAgcm91dGVBcHBsZXQ6IChhcHBsZXQsIGhyZWYpIC0+XG4gICAgdHJ5XG4gICAgICBAX2hhbmRsZV9yb3V0ZSBhcHBsZXQsIGhyZWZcbiAgICBjYXRjaCBlcnJcbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICBcbmNsYXNzIE1haW5Sb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJzphcHBsZXQnIDogJ3JvdXRlQXBwbGV0J1xuICAgICc6YXBwbGV0LypwYXRoJzogJ3JvdXRlQXBwbGV0J1xuXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiTWFpblJvdXRlci5vblJvdXRlXCIsIG5hbWUsIHBhdGgsIGFyZ3NcbiAgICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpyb3V0ZScsICgpIC0+XG4gIGNvbnRyb2xsZXIgPSBuZXcgUmVxdWlyZUNvbnRyb2xsZXJcbiAgcm91dGVyID0gbmV3IE1haW5Sb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIGNvbnRyb2xsZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW4tcm91dGVyJywgLT5cbiAgICByb3V0ZXJcbiAgICBcbm1vZHVsZS5leHBvcnRzID1cbiAgUmVxdWlyZUNvbnRyb2xsZXI6IFJlcXVpcmVDb250cm9sbGVyXG4gIE1haW5Sb3V0ZXI6IE1haW5Sb3V0ZXJcbiAgXG4iXX0=
