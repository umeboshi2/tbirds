var MainChannel, NavbarChannel, TkApplet,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import {
  App
} from 'marionette.toolkit';

MainChannel = Backbone.Radio.channel('global');

NavbarChannel = Backbone.Radio.channel('navbar');

TkApplet = class TkApplet extends App {
  setupAppletEntries() {
    var entries, viewEntries;
    entries = NavbarChannel.request('get-entries', 'applet');
    entries.reset();
    if (this.appletEntries) {
      entries.set(this.appletEntries);
    }
    viewEntries = NavbarChannel.request('get-entries', 'view');
    return viewEntries.reset();
  }

  onBeforeStart() {
    var appRoutes, controller, method, ref, ref1;
    this.setupAppletEntries();
    controller = new this.Controller({
      channelName: this.getChannel().channelName
    });
    controller.applet = this;
    this.router = new this.Router({
      controller: controller,
      channelName: this.getChannel().channelName
    });
    if (this != null ? this.appRoutes : void 0) {
      appRoutes = (typeof this.appRoutes === "function" ? this.appRoutes() : void 0) || this.appRoutes;
      Object.keys(appRoutes).forEach((r) => {
        return this.router.appRoute(r, appRoutes[r]);
      });
    }
    // we want to adjust the approuter for frontdoor
    // use here, instead of in the AppRouter class,
    // so hopefully, only one applet handles the "empty route.
    if ((ref = this.options) != null ? ref.isFrontdoorApplet : void 0) {
      method = ((ref1 = this.options.appConfig) != null ? ref1.startFrontdoorMethod : void 0) || 'start';
      if (indexOf.call(Object.keys(this.router.appRoutes), '') < 0) {
        if (__DEV__) {
          console.warn("Adding start to TkApplet");
        }
        this.router.appRoute('', method);
      }
    }
    this._extraRouters = {};
    this.initExtraRouters();
    return this.getChannel().reply('get-applet', () => {
      return this;
    });
  }

  onStop() {
    if (__DEV__) {
      return console.log("Stopping TkApplet", this.isRunning());
    }
  }

  setExtraRouter(name, routerClass, controllerClass) {
    var c, r;
    c = new controllerClass;
    r = new routerClass({
      controller: c
    });
    return this._extraRouters[name] = r;
  }

  initExtraRouters() {
    var exRtrs, extraRouters, results, ropts, rtr;
    extraRouters = this.getOption('extraRouters');
    exRtrs = this.getOption('extraRouters');
    results = [];
    for (rtr in extraRouters) {
      ropts = extraRouters[rtr];
      console.log("rtr", rtr, ropts);
      this.setExtraRouter(rtr, ropts['router'], ropts['controller']);
      if (__DEV__) {
        results.push(console.log(`extra router ${rtr} created`));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  getExtraRouter(name) {
    return this._extraRouters[name];
  }

  getController() {
    return this.router.controller;
  }

};

export default TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUEsUUFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxHQUFUO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVWLFdBQU4sTUFBQSxTQUFBLFFBQXVCLElBQXZCO0VBQ0Usa0JBQW9CLENBQUEsQ0FBQTtBQUNsQixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxRQUFyQztJQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxhQUFKO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsYUFBYixFQURGOztJQUVBLFdBQUEsR0FBYyxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxNQUFyQztXQUNkLFdBQVcsQ0FBQyxLQUFaLENBQUE7RUFOa0I7O0VBT3BCLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQUNBLFVBQUEsR0FBYSxJQUFJLElBQUMsQ0FBQSxVQUFMLENBQ1g7TUFBQSxXQUFBLEVBQWEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFhLENBQUM7SUFBM0IsQ0FEVztJQUViLFVBQVUsQ0FBQyxNQUFYLEdBQW9CO0lBQ3BCLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxJQUFDLENBQUEsTUFBTCxDQUNSO01BQUEsVUFBQSxFQUFZLFVBQVo7TUFDQSxXQUFBLEVBQWEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFhLENBQUM7SUFEM0IsQ0FEUTtJQUdWLG1CQUFHLElBQUMsQ0FBRSxrQkFBTjtNQUNFLFNBQUEsMkNBQVksSUFBQyxDQUFBLHFCQUFELElBQWlCLElBQUMsQ0FBQTtNQUM5QixNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVosQ0FBc0IsQ0FBQyxPQUF2QixDQUErQixDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQzdCLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFvQixTQUFVLENBQUEsQ0FBQSxDQUE5QjtNQUQ2QixDQUEvQixFQUZGO0tBUEE7Ozs7SUFjQSxzQ0FBVyxDQUFFLDBCQUFiO01BQ0UsTUFBQSxrREFBMkIsQ0FBRSw4QkFBcEIsSUFBNEM7TUFDckQsSUFBTyxhQUFNLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFwQixDQUFOLEVBQUEsRUFBQSxLQUFQO1FBQ0UsSUFBRyxPQUFIO1VBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYSwwQkFBYixFQURGOztRQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixFQUFqQixFQUFxQixNQUFyQixFQUhGO09BRkY7O0lBTUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsQ0FBQTtJQUNqQixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDLEtBQWQsQ0FBb0IsWUFBcEIsRUFBa0MsQ0FBQSxDQUFBLEdBQUE7QUFDaEMsYUFBTztJQUR5QixDQUFsQztFQXZCYTs7RUF5QmYsTUFBUSxDQUFBLENBQUE7SUFDTixJQUFHLE9BQUg7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FBakMsRUFERjs7RUFETTs7RUFHUixjQUFnQixDQUFDLElBQUQsRUFBTyxXQUFQLEVBQW9CLGVBQXBCLENBQUE7QUFDZCxRQUFBLENBQUEsRUFBQTtJQUFBLENBQUEsR0FBSSxJQUFJO0lBQ1IsQ0FBQSxHQUFJLElBQUksV0FBSixDQUNGO01BQUEsVUFBQSxFQUFZO0lBQVosQ0FERTtXQUVKLElBQUMsQ0FBQSxhQUFjLENBQUEsSUFBQSxDQUFmLEdBQXVCO0VBSlQ7O0VBS2hCLGdCQUFrQixDQUFBLENBQUE7QUFDaEIsUUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7SUFBQSxZQUFBLEdBQWUsSUFBQyxDQUFBLFNBQUQsQ0FBVyxjQUFYO0lBQ2YsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQVcsY0FBWDtBQUNUO0lBQUEsS0FBQSxtQkFBQTtNQUNFLEtBQUEsR0FBUSxZQUFhLENBQUEsR0FBQTtNQUNyQixPQUFPLENBQUMsR0FBUixDQUFZLEtBQVosRUFBbUIsR0FBbkIsRUFBd0IsS0FBeEI7TUFDQSxJQUFDLENBQUEsY0FBRCxDQUFnQixHQUFoQixFQUFxQixLQUFNLENBQUEsUUFBQSxDQUEzQixFQUFzQyxLQUFNLENBQUEsWUFBQSxDQUE1QztNQUNBLElBQUcsT0FBSDtxQkFDRSxPQUFPLENBQUMsR0FBUixDQUFZLENBQUEsYUFBQSxDQUFBLENBQWdCLEdBQWhCLENBQW9CLFFBQXBCLENBQVosR0FERjtPQUFBLE1BQUE7NkJBQUE7O0lBSkYsQ0FBQTs7RUFIZ0I7O0VBU2xCLGNBQWdCLENBQUMsSUFBRCxDQUFBO0FBQ2QsV0FBTyxJQUFDLENBQUEsYUFBYyxDQUFBLElBQUE7RUFEUjs7RUFFaEIsYUFBZSxDQUFBLENBQUE7QUFDYixXQUFPLElBQUMsQ0FBQSxNQUFNLENBQUM7RUFERjs7QUFwRGpCOztBQXdEQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTmF2YmFyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ25hdmJhcidcblxuY2xhc3MgVGtBcHBsZXQgZXh0ZW5kcyBBcHBcbiAgc2V0dXBBcHBsZXRFbnRyaWVzOiAtPlxuICAgIGVudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBlbnRyaWVzLnJlc2V0KClcbiAgICBpZiBAYXBwbGV0RW50cmllc1xuICAgICAgZW50cmllcy5zZXQgQGFwcGxldEVudHJpZXNcbiAgICB2aWV3RW50cmllcyA9IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAndmlldydcbiAgICB2aWV3RW50cmllcy5yZXNldCgpXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgQHNldHVwQXBwbGV0RW50cmllcygpXG4gICAgY29udHJvbGxlciA9IG5ldyBAQ29udHJvbGxlclxuICAgICAgY2hhbm5lbE5hbWU6IEBnZXRDaGFubmVsKCkuY2hhbm5lbE5hbWVcbiAgICBjb250cm9sbGVyLmFwcGxldCA9IEBcbiAgICBAcm91dGVyID0gbmV3IEBSb3V0ZXJcbiAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgICAgIGNoYW5uZWxOYW1lOiBAZ2V0Q2hhbm5lbCgpLmNoYW5uZWxOYW1lXG4gICAgaWYgQD8uYXBwUm91dGVzXG4gICAgICBhcHBSb3V0ZXMgPSBAYXBwUm91dGVzPygpIG9yIEBhcHBSb3V0ZXNcbiAgICAgIE9iamVjdC5rZXlzKGFwcFJvdXRlcykuZm9yRWFjaCAocikgPT5cbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSByLCBhcHBSb3V0ZXNbcl1cbiAgICAjIHdlIHdhbnQgdG8gYWRqdXN0IHRoZSBhcHByb3V0ZXIgZm9yIGZyb250ZG9vclxuICAgICMgdXNlIGhlcmUsIGluc3RlYWQgb2YgaW4gdGhlIEFwcFJvdXRlciBjbGFzcyxcbiAgICAjIHNvIGhvcGVmdWxseSwgb25seSBvbmUgYXBwbGV0IGhhbmRsZXMgdGhlIFwiZW1wdHkgcm91dGUuXG4gICAgaWYgQG9wdGlvbnM/LmlzRnJvbnRkb29yQXBwbGV0XG4gICAgICBtZXRob2QgPSBAb3B0aW9ucy5hcHBDb25maWc/LnN0YXJ0RnJvbnRkb29yTWV0aG9kIG9yICdzdGFydCdcbiAgICAgIHVubGVzcyAnJyBpbiBPYmplY3Qua2V5cyBAcm91dGVyLmFwcFJvdXRlc1xuICAgICAgICBpZiBfX0RFVl9fXG4gICAgICAgICAgY29uc29sZS53YXJuIFwiQWRkaW5nIHN0YXJ0IHRvIFRrQXBwbGV0XCJcbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSAnJywgbWV0aG9kXG4gICAgQF9leHRyYVJvdXRlcnMgPSB7fVxuICAgIEBpbml0RXh0cmFSb3V0ZXJzKClcbiAgICBAZ2V0Q2hhbm5lbCgpLnJlcGx5ICdnZXQtYXBwbGV0JywgPT5cbiAgICAgIHJldHVybiBAXG4gIG9uU3RvcDogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIlN0b3BwaW5nIFRrQXBwbGV0XCIsIEAuaXNSdW5uaW5nKClcbiAgc2V0RXh0cmFSb3V0ZXI6IChuYW1lLCByb3V0ZXJDbGFzcywgY29udHJvbGxlckNsYXNzKSAtPlxuICAgIGMgPSBuZXcgY29udHJvbGxlckNsYXNzXG4gICAgciA9IG5ldyByb3V0ZXJDbGFzc1xuICAgICAgY29udHJvbGxlcjogY1xuICAgIEBfZXh0cmFSb3V0ZXJzW25hbWVdID0gclxuICBpbml0RXh0cmFSb3V0ZXJzOiAtPlxuICAgIGV4dHJhUm91dGVycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBleFJ0cnMgPSBAZ2V0T3B0aW9uICdleHRyYVJvdXRlcnMnXG4gICAgZm9yIHJ0ciBvZiBleHRyYVJvdXRlcnNcbiAgICAgIHJvcHRzID0gZXh0cmFSb3V0ZXJzW3J0cl1cbiAgICAgIGNvbnNvbGUubG9nIFwicnRyXCIsIHJ0ciwgcm9wdHNcbiAgICAgIEBzZXRFeHRyYVJvdXRlciBydHIsIHJvcHRzWydyb3V0ZXInXSwgcm9wdHNbJ2NvbnRyb2xsZXInXVxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcImV4dHJhIHJvdXRlciAje3J0cn0gY3JlYXRlZFwiXG4gIGdldEV4dHJhUm91dGVyOiAobmFtZSkgLT5cbiAgICByZXR1cm4gQF9leHRyYVJvdXRlcnNbbmFtZV1cbiAgZ2V0Q29udHJvbGxlcjogLT5cbiAgICByZXR1cm4gQHJvdXRlci5jb250cm9sbGVyXG4gICAgXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IFRrQXBwbGV0XG5cbiJdfQ==
