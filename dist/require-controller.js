var MainChannel, MessageChannel, RadioCotroller, RequireController, registeredApplets,
  indexOf = [].indexOf;

import {
  Radio,
  history as BBhistory
} from 'backbone';

import {
  MnObject
} from 'backbone.marionette';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

// FIXME
// applets/appname/main needs to be resolvable
// by using webpack resolve alias

// FIXME: Using backticks for import() statements. Inner
// js backticks are escaped for dynamic expressions.
// https://github.com/jashkenas/coffeescript/issues/4834#issuecomment-354375627

// Object to contain registered applets
// Using this prevents a loop when a approute
// is requested but not matched in an AppRouter
// Unless the AppRouter has a match for the requested
// approute, the main router will try to load the
// AppRouter again, causing a loop.
registeredApplets = {};

RadioCotroller = MnObject.extend({
  channelName: 'applets'
});

RequireController = class RequireController extends RadioCotroller {
  initialize() {
    var channel;
    channel = this.getChannel();
    channel.reply('register', function(appName, applet) {
      registeredApplets[appName] = applet;
    });
    channel.reply('unregister', function(appName) {
      delete registeredApplets[appName];
    });
    channel.reply('get', function(appName) {
      return registeredApplets[appName];
    });
    return channel.reply('getAll', function() {
      return registeredApplets;
    });
  }

  loadFrontDoor() {
    var appletChannel, appname, config, handler;
    appletChannel = this.getChannel();
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
      appletChannel.request('register', appname, applet);
      applet.start();
      if (!BBhistory.started) {
        BBhistory.start();
      }
    });
  }

  _handleRoute(appname, suffix) {
    var appletChannel, config, handler;
    appletChannel = this.getChannel();
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
      appname = 'frontdoor';
    }
    if (indexOf.call(_.keys(config.appletRoutes), appname) >= 0) {
      appname = config.appletRoutes[appname];
      if (__DEV__) {
        console.log("Using defined appletRoute", appname);
      }
    }
    if (indexOf.call(Object.keys(registeredApplets), appname) >= 0) {
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
      appletChannel.request('register', appname, applet);
      applet.start();
      BBhistory.loadUrl();
      return;
      return console.log("handler should have applet", applet);
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
      } else {
        throw err;
      }
    }
  }

  directLink(remainder) {
    if (__DEV__) {
      console.warn("directLink", remainder);
    }
  }

};

export default RequireController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1jb250cm9sbGVyLmpzIiwic291cmNlcyI6WyJyZXF1aXJlLWNvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBLEVBQUEsaUJBQUEsRUFBQSxpQkFBQTtFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLE9BQUEsYUFBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxRQUFUO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkOztBQUNkLGNBQUEsR0FBaUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFkLEVBSmpCOzs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLGlCQUFBLEdBQW9CLENBQUE7O0FBRXBCLGNBQUEsR0FBaUIsUUFBUSxDQUFDLE1BQVQsQ0FDZjtFQUFBLFdBQUEsRUFBYTtBQUFiLENBRGU7O0FBR1gsb0JBQU4sTUFBQSxrQkFBQSxRQUFnQyxlQUFoQztFQUNFLFVBQVksQ0FBQSxDQUFBO0FBQ2QsUUFBQTtJQUFJLE9BQUEsR0FBVSxJQUFDLENBQUEsVUFBRCxDQUFBO0lBQ1YsT0FBTyxDQUFDLEtBQVIsQ0FBYyxVQUFkLEVBQTBCLFFBQUEsQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFBO01BQ3hCLGlCQUFpQixDQUFDLE9BQUQsQ0FBakIsR0FBNkI7SUFETCxDQUExQjtJQUdBLE9BQU8sQ0FBQyxLQUFSLENBQWMsWUFBZCxFQUE0QixRQUFBLENBQUMsT0FBRCxDQUFBO01BQzFCLE9BQU8saUJBQWlCLENBQUMsT0FBRDtJQURFLENBQTVCO0lBR0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkLEVBQXFCLFFBQUEsQ0FBQyxPQUFELENBQUE7QUFDbkIsYUFBTyxpQkFBaUIsQ0FBQyxPQUFEO0lBREwsQ0FBckI7V0FFQSxPQUFPLENBQUMsS0FBUixDQUFjLFFBQWQsRUFBd0IsUUFBQSxDQUFBLENBQUE7QUFDdEIsYUFB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LFNBQVMsQ0FBQyxPQUFWLENBQUE7QUFDQTthQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVosRUFBMEMsTUFBMUM7SUFWVyxDQUFiLENBV0EsQ0FBQyxLQVhELENBV08sUUFBQSxDQUFDLEdBQUQsQ0FBQTtNQUNMLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFaLENBQXVCLG9CQUF2QixDQUFIO1FBQ0UsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsQ0FBQSxVQUFBLENBQUEsQ0FBYSxPQUFiLENBQUEsRUFBQSxDQUFBLENBQXlCLE1BQXpCLENBQUEsRUFBQSxDQUFsQyxFQURGOzs7T0FBQSxNQUtLLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFaLENBQXVCLGtCQUF2QixDQUFIO1FBQ0gsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsR0FBRyxDQUFDLE9BQXRDLEVBREc7T0FBQSxNQUFBO1FBSUgsTUFBTSxJQUpIOztJQU5BLENBWFA7RUF0Qlk7O0VBOENkLFdBQWEsQ0FBQyxNQUFELEVBQVMsSUFBVCxDQUFBO0FBQ2YsUUFBQTtBQUFJO01BQ0UsSUFBQyxDQUFBLFlBQUQsQ0FBYyxNQUFkLEVBQXNCLElBQXRCLEVBREY7S0FFQSxhQUFBO01BQU07TUFDSixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBWixDQUF1QixrQkFBdkIsQ0FBSDtRQUNFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLEdBQUcsQ0FBQyxPQUF0QztBQUNBLGVBRkY7T0FBQSxNQUFBO1FBSUUsTUFBTSxJQUpSO09BREY7O0VBSFc7O0VBV2IsVUFBWSxDQUFDLFNBQUQsQ0FBQTtJQUNWLElBQUcsT0FBSDtNQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsWUFBYixFQUEyQixTQUEzQixFQURGOztFQURVOztBQTNGZDs7QUFnR0EsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8sIGhpc3RvcnkgYXMgQkJoaXN0b3J5IH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBNbk9iamVjdCB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuIyBGSVhNRVxuIyBhcHBsZXRzL2FwcG5hbWUvbWFpbiBuZWVkcyB0byBiZSByZXNvbHZhYmxlXG4jIGJ5IHVzaW5nIHdlYnBhY2sgcmVzb2x2ZSBhbGlhc1xuXG4jIEZJWE1FOiBVc2luZyBiYWNrdGlja3MgZm9yIGltcG9ydCgpIHN0YXRlbWVudHMuIElubmVyXG4jIGpzIGJhY2t0aWNrcyBhcmUgZXNjYXBlZCBmb3IgZHluYW1pYyBleHByZXNzaW9ucy5cbiMgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy9jb2ZmZWVzY3JpcHQvaXNzdWVzLzQ4MzQjaXNzdWVjb21tZW50LTM1NDM3NTYyN1xuXG4jIE9iamVjdCB0byBjb250YWluIHJlZ2lzdGVyZWQgYXBwbGV0c1xuIyBVc2luZyB0aGlzIHByZXZlbnRzIGEgbG9vcCB3aGVuIGEgYXBwcm91dGVcbiMgaXMgcmVxdWVzdGVkIGJ1dCBub3QgbWF0Y2hlZCBpbiBhbiBBcHBSb3V0ZXJcbiMgVW5sZXNzIHRoZSBBcHBSb3V0ZXIgaGFzIGEgbWF0Y2ggZm9yIHRoZSByZXF1ZXN0ZWRcbiMgYXBwcm91dGUsIHRoZSBtYWluIHJvdXRlciB3aWxsIHRyeSB0byBsb2FkIHRoZVxuIyBBcHBSb3V0ZXIgYWdhaW4sIGNhdXNpbmcgYSBsb29wLlxucmVnaXN0ZXJlZEFwcGxldHMgPSB7fVxuXG5SYWRpb0NvdHJvbGxlciA9IE1uT2JqZWN0LmV4dGVuZFxuICBjaGFubmVsTmFtZTogJ2FwcGxldHMnXG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgUmFkaW9Db3Ryb2xsZXJcbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBjaGFubmVsID0gQGdldENoYW5uZWwoKVxuICAgIGNoYW5uZWwucmVwbHkgJ3JlZ2lzdGVyJywgKGFwcE5hbWUsIGFwcGxldCkgLT5cbiAgICAgIHJlZ2lzdGVyZWRBcHBsZXRzW2FwcE5hbWVdID0gYXBwbGV0XG4gICAgICByZXR1cm5cbiAgICBjaGFubmVsLnJlcGx5ICd1bnJlZ2lzdGVyJywgKGFwcE5hbWUpIC0+XG4gICAgICBkZWxldGUgcmVnaXN0ZXJlZEFwcGxldHNbYXBwTmFtZV1cbiAgICAgIHJldHVyblxuICAgIGNoYW5uZWwucmVwbHkgJ2dldCcsIChhcHBOYW1lKSAtPlxuICAgICAgcmV0dXJuIHJlZ2lzdGVyZWRBcHBsZXRzW2FwcE5hbWVdXG4gICAgY2hhbm5lbC5yZXBseSAnZ2V0QWxsJywgLT5cbiAgICAgIHJldHVybiByZWdpc3RlcmVkQXBwbGV0c1xuICBsb2FkRnJvbnREb29yOiAtPlxuICAgIGFwcGxldENoYW5uZWwgPSBAZ2V0Q2hhbm5lbCgpXG4gICAgY29uZmlnID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y29uZmlnJ1xuICAgIGFwcG5hbWUgPSBjb25maWc/LmZyb250ZG9vckFwcGxldCBvciAnZnJvbnRkb29yJ1xuICAgICNoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcImFwcGxldHMvI3thcHBuYW1lfS9tYWluXCJcbiAgICBoYW5kbGVyID0gYGltcG9ydChcXGBhcHBsZXRzLyR7YXBwbmFtZX0vbWFpblxcYClgICMgbm9xYVxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcIkZyb250ZG9vciBzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGlzRnJvbnRkb29yQXBwbGV0OiB0cnVlXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBhcHBsZXRDaGFubmVsLnJlcXVlc3QgJ3JlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQkJoaXN0b3J5LnN0YXJ0KCkgdW5sZXNzIEJCaGlzdG9yeS5zdGFydGVkXG4gICAgICByZXR1cm5cbiAgICByZXR1cm5cbiAgICBcbiAgX2hhbmRsZVJvdXRlOiAoYXBwbmFtZSwgc3VmZml4KSAtPlxuICAgIGFwcGxldENoYW5uZWwgPSBAZ2V0Q2hhbm5lbCgpXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiX2hhbmRsZVJvdXRlXCIsIGFwcG5hbWUsIHN1ZmZpeFxuICAgIGlmIHN1ZmZpeCBhbmQgc3VmZml4LnN0YXJ0c1dpdGggJy8nXG4gICAgICB3aGlsZSBzdWZmaXguc3RhcnRzV2l0aCAnLydcbiAgICAgICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgICAgICBjb25zb2xlLmxvZyBcIlN1ZmZpeC5TdGFydHN3aXRoXCIsIHN1ZmZpeFxuICAgICAgICBzdWZmaXggPSBzdWZmaXguc2xpY2UgMVxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBpZiBub3QgYXBwbmFtZVxuICAgICAgYXBwbmFtZSA9ICdmcm9udGRvb3InXG4gICAgaWYgYXBwbmFtZSBpbiBfLmtleXMgY29uZmlnLmFwcGxldFJvdXRlc1xuICAgICAgYXBwbmFtZSA9IGNvbmZpZy5hcHBsZXRSb3V0ZXNbYXBwbmFtZV1cbiAgICAgIGlmIF9fREVWX19cbiAgICAgICAgY29uc29sZS5sb2cgXCJVc2luZyBkZWZpbmVkIGFwcGxldFJvdXRlXCIsIGFwcG5hbWVcbiAgICBpZiBhcHBuYW1lIGluIE9iamVjdC5rZXlzIHJlZ2lzdGVyZWRBcHBsZXRzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJVbmhhbmRsZWQgYXBwbGV0IHBhdGggIyN7YXBwbmFtZX0vI3tzdWZmaXh9XCJcbiAgICAjaGFuZGxlciA9IFN5c3RlbS5pbXBvcnQgXCJhcHBsZXRzLyN7YXBwbmFtZX0vbWFpblwiXG4gICAgaGFuZGxlciA9IGBpbXBvcnQoXFxgYXBwbGV0cy8ke2FwcG5hbWV9L21haW5cXGApYCAjIG5vcWFcbiAgICBpZiBfX0RFVl9fIGFuZCBERUJVR1xuICAgICAgY29uc29sZS5sb2cgXCJzeXN0ZW0uaW1wb3J0XCIsIGFwcG5hbWVcbiAgICBoYW5kbGVyLnRoZW4gKEFwcGxldCkgLT5cbiAgICAgICMgRklYTUUgZml4IGFwcGxldCBzdHJ1Y3R1cmUgdG8gcHJvdmlkZSBhcHByb3ByaWF0ZSBleHBvcnRcbiAgICAgIGFwcGxldCA9IG5ldyBBcHBsZXQuZGVmYXVsdFxuICAgICAgICBhcHBDb25maWc6IGNvbmZpZ1xuICAgICAgICBhcHBOYW1lOiBhcHBuYW1lXG4gICAgICAgIGNoYW5uZWxOYW1lOiBhcHBuYW1lXG4gICAgICBhcHBsZXRDaGFubmVsLnJlcXVlc3QgJ3JlZ2lzdGVyJywgYXBwbmFtZSwgYXBwbGV0XG4gICAgICBhcHBsZXQuc3RhcnQoKVxuICAgICAgQkJoaXN0b3J5LmxvYWRVcmwoKVxuICAgICAgcmV0dXJuXG4gICAgICBjb25zb2xlLmxvZyBcImhhbmRsZXIgc2hvdWxkIGhhdmUgYXBwbGV0XCIsIGFwcGxldFxuICAgIC5jYXRjaCAoZXJyKSAtPlxuICAgICAgaWYgZXJyLm1lc3NhZ2Uuc3RhcnRzV2l0aCAnQ2Fubm90IGZpbmQgbW9kdWxlJ1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgXCJCYWQgcm91dGUgI3thcHBuYW1lfSwgI3tzdWZmaXh9ISFcIlxuICAgICAgICByZXR1cm5cbiAgICAgICMgY2F0Y2ggdGhpcyBoZXJlIGZvciBpbml0aWFsIHBhZ2UgbG9hZCB3aXRoIGludmFsaWRcbiAgICAgICMgc3VicGF0aFxuICAgICAgZWxzZSBpZiBlcnIubWVzc2FnZS5zdGFydHNXaXRoICdVbmhhbmRsZWQgYXBwbGV0J1xuICAgICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd3YXJuaW5nJywgZXJyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IGVyclxuICAgIHJldHVyblxuICAgICAgXG4gIHJvdXRlQXBwbGV0OiAoYXBwbGV0LCBocmVmKSAtPlxuICAgIHRyeVxuICAgICAgQF9oYW5kbGVSb3V0ZSBhcHBsZXQsIGhyZWZcbiAgICBjYXRjaCBlcnJcbiAgICAgIGlmIGVyci5tZXNzYWdlLnN0YXJ0c1dpdGggJ1VuaGFuZGxlZCBhcHBsZXQnXG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3dhcm5pbmcnLCBlcnIubWVzc2FnZVxuICAgICAgICByZXR1cm5cbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgcmV0dXJuXG4gICAgXG4gIGRpcmVjdExpbms6IChyZW1haW5kZXIpIC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS53YXJuIFwiZGlyZWN0TGlua1wiLCByZW1haW5kZXJcbiAgICByZXR1cm5cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWlyZUNvbnRyb2xsZXJcbiJdfQ==
