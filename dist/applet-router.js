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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LXJvdXRlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0LXJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx5RkFBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQVlqQixlQUFBLEdBQWtCOztBQU1sQixXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsU0FBQyxPQUFEO1NBQzFDLE9BQU8sZUFBZ0IsQ0FBQSxPQUFBO0FBRG1CLENBQTVDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHNCQUFsQixFQUEwQyxTQUFDLE9BQUQsRUFBVSxNQUFWO1NBQ3hDLGVBQWdCLENBQUEsT0FBQSxDQUFoQixHQUEyQjtBQURhLENBQTFDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHdCQUFsQixFQUE0QyxTQUFDLE9BQUQ7U0FDMUMsZUFBZ0IsQ0FBQSxPQUFBO0FBRDBCLENBQTVDOztBQUlNOzs7Ozs7OzhCQUNKLGFBQUEsR0FBZSxTQUFBO0FBQ2IsUUFBQTtJQUFBLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7SUFDVCxPQUFBLHFCQUFVLE1BQU0sQ0FBRSx5QkFBUixJQUEyQjtJQUNyQyxPQUFBLEdBQVUsTUFBTSxFQUFDLE1BQUQsRUFBTixDQUFjLFVBQUEsR0FBVyxPQUFYLEdBQW1CLE9BQWpDO0lBQ1YsSUFBRyxPQUFIO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxPQUF2QyxFQURGOztXQUVBLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLE1BQUQ7QUFDWCxZQUFBO1FBQUEsTUFBQSxHQUFTLElBQUksTUFB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QUFrQixpQkFBbEIsRUFBcUMsU0FBQTtXQUNuQztFQURtQyxDQUFyQztTQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGFBQWxCLEVBQWlDLFNBQUE7V0FDL0I7RUFEK0IsQ0FBakM7QUFOa0MsQ0FBcEM7O0FBU0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLGlCQUFBLEVBQW1CLGlCQUFuQjtFQUNBLFlBQUEsRUFBYyxZQURkIiwic291cmNlc0NvbnRlbnQiOlsiTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuIyBGSVhNRVxuIyBhcHBsZXRzL2FwcG5hbWUvbWFpbiBuZWVkcyB0byBiZSByZXNvbHZhYmxlXG4jIGJ5IHVzaW5nIHdlYnBhY2sgcmVzb2x2ZSBhbGlhc1xuXG4jIE9iamVjdCB0byBjb250YWluIHJlZ2lzdGVyZWQgYXBwbGV0c1xuIyBVc2luZyB0aGlzIHByZXZlbnRzIGEgbG9vcCB3aGVuIGEgYXBwcm91dGVcbiMgaXMgcmVxdWVzdGVkIGJ1dCBub3QgbWF0Y2hlZCBpbiBhbiBBcHBSb3V0ZXJcbiMgVW5sZXNzIHRoZSBBcHBSb3V0ZXIgaGFzIGEgbWF0Y2ggZm9yIHRoZSByZXF1ZXN0ZWRcbiMgYXBwcm91dGUsIHRoZSBtYWluIHJvdXRlciB3aWxsIHRyeSB0byBsb2FkIHRoZVxuIyBBcHBSb3V0ZXIgYWdhaW4sIGNhdXNpbmcgYSBsb29wLlxucmVnaXN0ZXJlZF9hcHBzID0ge31cblxuIyBGSVhNRVxuIyBUaGlzIGlzbid0IGJlaW5nIHVzZWQgY3VycmVudGx5LiAgVGhpcyBpcyBoZXJlXG4jIHdoZW4gdGhlIGNvZGUgZGV2ZWxvcHMgdG8gdGhlIHBvaW50IG9mIGJlaW5nXG4jIGFibGUgdG8gcmVtb3ZlIHVudXNlZCBjaGlsZCBhcHBzIHRvIHNhdmUgbWVtb3J5LlxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OnVucmVnaXN0ZXInLCAoYXBwbmFtZSkgLT5cbiAgZGVsZXRlIHJlZ2lzdGVyZWRfYXBwc1thcHBuYW1lXVxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCAoYXBwbmFtZSwgYXBwbGV0KSAtPlxuICByZWdpc3RlcmVkX2FwcHNbYXBwbmFtZV0gPSBhcHBsZXRcblxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwbGV0OmdldC1hcHBsZXQnLCAoYXBwbmFtZSkgLT5cbiAgcmVnaXN0ZXJlZF9hcHBzW2FwcG5hbWVdXG4gIFxuXG5jbGFzcyBSZXF1aXJlQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuT2JqZWN0XG4gIGxvYWRGcm9udERvb3I6IC0+XG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGFwcG5hbWUgPSBjb25maWc/LmZyb250ZG9vckFwcGxldCBvciAnZnJvbnRkb29yJ1xuICAgIGhhbmRsZXIgPSBTeXN0ZW0uaW1wb3J0IFwiYXBwbGV0cy8je2FwcG5hbWV9L21haW5cIlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiRnJvbnRkb29yIHN5c3RlbS5pbXBvcnRcIiwgYXBwbmFtZVxuICAgIGhhbmRsZXIudGhlbiAoQXBwbGV0KSA9PlxuICAgICAgYXBwbGV0ID0gbmV3IEFwcGxldFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBpc0Zyb250ZG9vckFwcGxldDogdHJ1ZVxuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHBsZXQ6cmVnaXN0ZXInLCBhcHBuYW1lLCBhcHBsZXRcbiAgICAgIGFwcGxldC5zdGFydCgpXG4gICAgICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCkgdW5sZXNzIEJhY2tib25lLmhpc3Rvcnkuc3RhcnRlZFxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICAgICAgY29uc29sZS5sb2cgXCJIaXN0b3J5IFN0YXJ0ZWQgYXRcIiwgaGFzaFxuICAgICAgXG4gIF9oYW5kbGVfcm91dGU6IChhcHBuYW1lLCBzdWZmaXgpIC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJfaGFuZGxlX3JvdXRlXCIsIGFwcG5hbWUsIHN1ZmZpeFxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBpZiBub3QgYXBwbmFtZVxuICAgICAgY29uc29sZS53YXJuIFwiTm8gYXBwbGV0IHJlY29nbml6ZWRcIiwgYXBwbmFtZVxuICAgICAgYXBwbmFtZSA9ICdmcm9udGRvb3InXG4gICAgaWYgYXBwbmFtZSBpbiBPYmplY3Qua2V5cyBjb25maWcuYXBwbGV0Um91dGVzXG4gICAgICBhcHBuYW1lID0gY29uZmlnLmFwcGxldFJvdXRlc1thcHBuYW1lXVxuICAgICAgY29uc29sZS5sb2cgXCJVc2luZyBkZWZpbmVkIGFwcGxldFJvdXRlXCIsIGFwcG5hbWVcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIHJlZ2lzdGVyZWRfYXBwc1xuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiVW5oYW5kbGVkIGFwcGxldCBwYXRoICMje2FwcG5hbWV9LyN7c3VmZml4fVwiXG4gICAgaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXRcbiAgICAgICAgYXBwQ29uZmlnOiBjb25maWdcbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwbGV0OnJlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5sb2FkVXJsKClcbiAgICAuY2F0Y2ggKGVycikgLT5cbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ0Nhbm5vdCBmaW5kIG1vZHVsZSdcbiAgICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnd2FybmluZycsIFwiQmFkIHJvdXRlICN7YXBwbmFtZX0sICN7c3VmZml4fSEhXCJcbiAgICAgICMgY2F0Y2ggdGhpcyBoZXJlIGZvciBpbml0aWFsIHBhZ2UgbG9hZCB3aXRoIGludmFsaWRcbiAgICAgICMgc3VicGF0aFxuICAgICAgZWxzZSBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICBcbiAgcm91dGVBcHBsZXQ6IChhcHBsZXQsIGhyZWYpIC0+XG4gICAgdHJ5XG4gICAgICBAX2hhbmRsZV9yb3V0ZSBhcHBsZXQsIGhyZWZcbiAgICBjYXRjaCBlcnJcbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICBkaXJlY3RMaW5rOiAocmVtYWluZGVyKSAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiZGlyZWN0TGlua1wiLCByZW1haW5kZXJcbiAgICBcbmNsYXNzIEFwcGxldFJvdXRlciBleHRlbmRzIE1hcmlvbmV0dGUuQXBwUm91dGVyXG4gIGFwcFJvdXRlczpcbiAgICAnaHR0cCpyZW1haW5kZXInOiAnZGlyZWN0TGluaydcbiAgICAnOmFwcGxldCcgOiAncm91dGVBcHBsZXQnXG4gICAgJzphcHBsZXQvKnBhdGgnOiAncm91dGVBcHBsZXQnXG5cbiAgb25Sb3V0ZTogKG5hbWUsIHBhdGgsIGFyZ3MpIC0+XG4gICAgaWYgbmFtZSBpcyAnZGlyZWN0TGluaydcbiAgICAgIGlmIGFyZ3MubGVuZ3RoID09IDJcbiAgICAgICAgaWYgYXJnc1sxXSBpc250IG51bGxcbiAgICAgICAgICB1cmwgPSBcImh0dHAje2FyZ3Muam9pbignPycpfVwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB1cmwgPSBcImh0dHAje2FyZ3NbMF19XCJcbiAgICAgICAgd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyBcInVuaGFuZGxlZCBkaXJlY3RMaW5rXCJcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIk1haW5Sb3V0ZXIub25Sb3V0ZVwiLCBuYW1lLCBwYXRoLCBhcmdzXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpyb3V0ZScsICgpIC0+XG4gIGNvbnRyb2xsZXIgPSBuZXcgUmVxdWlyZUNvbnRyb2xsZXJcbiAgcm91dGVyID0gbmV3IEFwcGxldFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW4tY29udHJvbGxlcicsIC0+XG4gICAgY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1yb3V0ZXInLCAtPlxuICAgIHJvdXRlclxuICAgIFxubW9kdWxlLmV4cG9ydHMgPVxuICBSZXF1aXJlQ29udHJvbGxlcjogUmVxdWlyZUNvbnRyb2xsZXJcbiAgQXBwbGV0Um91dGVyOiBBcHBsZXRSb3V0ZXJcblxuICBcbiJdfQ==
