var NavbarChannel, TkApplet,
  indexOf = [].indexOf;

import {
  Radio
} from 'backbone';

import {
  App
} from 'marionette.toolkit';

NavbarChannel = Radio.channel('navbar');

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
    c = new controllerClass();
    r = new routerClass({
      controller: c
    });
    return this._extraRouters[name] = r;
  }

  initExtraRouters() {
    var extraRouters, results, ropts, rtr;
    extraRouters = this.getOption('extraRouters');
    results = [];
    for (rtr in extraRouters) {
      ropts = extraRouters[rtr];
      this.setExtraRouter(rtr, ropts['router'], ropts['controller']);
      if (__DEV__) {
        console.log(`extra router ${rtr} created`);
        results.push(console.log("rtr", rtr, ropts));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGFBQUEsRUFBQSxRQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxHQUFUO0NBQUEsTUFBQTs7QUFFQSxhQUFBLEdBQWdCLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFVixXQUFOLE1BQUEsU0FBQSxRQUF1QixJQUF2QjtFQUNFLGtCQUFvQixDQUFBLENBQUE7QUFDdEIsUUFBQSxPQUFBLEVBQUE7SUFBSSxPQUFBLEdBQVUsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsYUFBdEIsRUFBcUMsUUFBckM7SUFDVixPQUFPLENBQUMsS0FBUixDQUFBO0lBQ0EsSUFBRyxJQUFDLENBQUEsYUFBSjtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBQyxDQUFBLGFBQWIsRUFERjs7SUFFQSxXQUFBLEdBQWMsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsYUFBdEIsRUFBcUMsTUFBckM7V0FDZCxXQUFXLENBQUMsS0FBWixDQUFBO0VBTmtCOztFQU9wQixhQUFlLENBQUEsQ0FBQTtBQUNqQixRQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQTtJQUFJLElBQUMsQ0FBQSxrQkFBRCxDQUFBO0lBQ0EsVUFBQSxHQUFhLElBQUksSUFBQyxDQUFBLFVBQUwsQ0FDWDtNQUFBLFdBQUEsRUFBYSxJQUFDLENBQUEsVUFBRCxDQUFBLENBQWEsQ0FBQztJQUEzQixDQURXO0lBRWIsVUFBVSxDQUFDLE1BQVgsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLElBQUMsQ0FBQSxNQUFMLENBQ1I7TUFBQSxVQUFBLEVBQVksVUFBWjtNQUNBLFdBQUEsRUFBYSxJQUFDLENBQUEsVUFBRCxDQUFBLENBQWEsQ0FBQztJQUQzQixDQURRO0lBR1YsbUJBQUcsSUFBQyxDQUFFLGtCQUFOO01BQ0UsU0FBQSwyQ0FBWSxJQUFDLENBQUEscUJBQUQsSUFBaUIsSUFBQyxDQUFBO01BQzlCLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQUFzQixDQUFDLE9BQXZCLENBQStCLENBQUMsQ0FBRCxDQUFBLEdBQUE7ZUFDN0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLENBQWpCLEVBQW9CLFNBQVMsQ0FBQyxDQUFELENBQTdCO01BRDZCLENBQS9CLEVBRkY7S0FQSjs7OztJQWNJLHNDQUFXLENBQUUsMEJBQWI7TUFDRSxNQUFBLGtEQUEyQixDQUFFLDhCQUFwQixJQUE0QztNQUNyRCxpQkFBYSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBcEIsR0FBTixPQUFQO1FBQ0UsSUFBRyxPQUFIO1VBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYSwwQkFBYixFQURGOztRQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixFQUFqQixFQUFxQixNQUFyQixFQUhGO09BRkY7O0lBTUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsQ0FBQTtJQUNqQixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDLEtBQWQsQ0FBb0IsWUFBcEIsRUFBa0MsQ0FBQSxDQUFBLEdBQUE7QUFDaEMsYUFBTztJQUR5QixDQUFsQztFQXZCYTs7RUF5QmYsTUFBUSxDQUFBLENBQUE7SUFDTixJQUFHLE9BQUg7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FBakMsRUFERjs7RUFETTs7RUFHUixjQUFnQixDQUFDLElBQUQsRUFBTyxXQUFQLEVBQW9CLGVBQXBCLENBQUE7QUFDbEIsUUFBQSxDQUFBLEVBQUE7SUFBSSxDQUFBLEdBQUksSUFBSSxlQUFKLENBQUE7SUFDSixDQUFBLEdBQUksSUFBSSxXQUFKLENBQ0Y7TUFBQSxVQUFBLEVBQVk7SUFBWixDQURFO1dBRUosSUFBQyxDQUFBLGFBQWEsQ0FBQyxJQUFELENBQWQsR0FBdUI7RUFKVDs7RUFLaEIsZ0JBQWtCLENBQUEsQ0FBQTtBQUNwQixRQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0lBQUksWUFBQSxHQUFlLElBQUMsQ0FBQSxTQUFELENBQVcsY0FBWDtBQUNmO0lBQUEsS0FBQSxtQkFBQTtNQUNFLEtBQUEsR0FBUSxZQUFZLENBQUMsR0FBRDtNQUNwQixJQUFDLENBQUEsY0FBRCxDQUFnQixHQUFoQixFQUFxQixLQUFLLENBQUMsUUFBRCxDQUExQixFQUFzQyxLQUFLLENBQUMsWUFBRCxDQUEzQztNQUNBLElBQUcsT0FBSDtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsR0FBaEIsQ0FBQSxRQUFBLENBQVo7cUJBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCLEdBRkY7T0FBQSxNQUFBOzZCQUFBOztJQUhGLENBQUE7O0VBRmdCOztFQVFsQixjQUFnQixDQUFDLElBQUQsQ0FBQTtBQUNkLFdBQU8sSUFBQyxDQUFBLGFBQWEsQ0FBQyxJQUFEO0VBRFA7O0VBRWhCLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsV0FBTyxJQUFDLENBQUEsTUFBTSxDQUFDO0VBREY7O0FBbkRqQjs7QUF1REEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IEFwcCB9IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcblxuTmF2YmFyQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ25hdmJhcidcblxuY2xhc3MgVGtBcHBsZXQgZXh0ZW5kcyBBcHBcbiAgc2V0dXBBcHBsZXRFbnRyaWVzOiAtPlxuICAgIGVudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBlbnRyaWVzLnJlc2V0KClcbiAgICBpZiBAYXBwbGV0RW50cmllc1xuICAgICAgZW50cmllcy5zZXQgQGFwcGxldEVudHJpZXNcbiAgICB2aWV3RW50cmllcyA9IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAndmlldydcbiAgICB2aWV3RW50cmllcy5yZXNldCgpXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgQHNldHVwQXBwbGV0RW50cmllcygpXG4gICAgY29udHJvbGxlciA9IG5ldyBAQ29udHJvbGxlclxuICAgICAgY2hhbm5lbE5hbWU6IEBnZXRDaGFubmVsKCkuY2hhbm5lbE5hbWVcbiAgICBjb250cm9sbGVyLmFwcGxldCA9IEBcbiAgICBAcm91dGVyID0gbmV3IEBSb3V0ZXJcbiAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgICAgIGNoYW5uZWxOYW1lOiBAZ2V0Q2hhbm5lbCgpLmNoYW5uZWxOYW1lXG4gICAgaWYgQD8uYXBwUm91dGVzXG4gICAgICBhcHBSb3V0ZXMgPSBAYXBwUm91dGVzPygpIG9yIEBhcHBSb3V0ZXNcbiAgICAgIE9iamVjdC5rZXlzKGFwcFJvdXRlcykuZm9yRWFjaCAocikgPT5cbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSByLCBhcHBSb3V0ZXNbcl1cbiAgICAjIHdlIHdhbnQgdG8gYWRqdXN0IHRoZSBhcHByb3V0ZXIgZm9yIGZyb250ZG9vclxuICAgICMgdXNlIGhlcmUsIGluc3RlYWQgb2YgaW4gdGhlIEFwcFJvdXRlciBjbGFzcyxcbiAgICAjIHNvIGhvcGVmdWxseSwgb25seSBvbmUgYXBwbGV0IGhhbmRsZXMgdGhlIFwiZW1wdHkgcm91dGUuXG4gICAgaWYgQG9wdGlvbnM/LmlzRnJvbnRkb29yQXBwbGV0XG4gICAgICBtZXRob2QgPSBAb3B0aW9ucy5hcHBDb25maWc/LnN0YXJ0RnJvbnRkb29yTWV0aG9kIG9yICdzdGFydCdcbiAgICAgIHVubGVzcyAnJyBpbiBPYmplY3Qua2V5cyBAcm91dGVyLmFwcFJvdXRlc1xuICAgICAgICBpZiBfX0RFVl9fXG4gICAgICAgICAgY29uc29sZS53YXJuIFwiQWRkaW5nIHN0YXJ0IHRvIFRrQXBwbGV0XCJcbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSAnJywgbWV0aG9kXG4gICAgQF9leHRyYVJvdXRlcnMgPSB7fVxuICAgIEBpbml0RXh0cmFSb3V0ZXJzKClcbiAgICBAZ2V0Q2hhbm5lbCgpLnJlcGx5ICdnZXQtYXBwbGV0JywgPT5cbiAgICAgIHJldHVybiBAXG4gIG9uU3RvcDogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIlN0b3BwaW5nIFRrQXBwbGV0XCIsIEAuaXNSdW5uaW5nKClcbiAgc2V0RXh0cmFSb3V0ZXI6IChuYW1lLCByb3V0ZXJDbGFzcywgY29udHJvbGxlckNsYXNzKSAtPlxuICAgIGMgPSBuZXcgY29udHJvbGxlckNsYXNzXG4gICAgciA9IG5ldyByb3V0ZXJDbGFzc1xuICAgICAgY29udHJvbGxlcjogY1xuICAgIEBfZXh0cmFSb3V0ZXJzW25hbWVdID0gclxuICBpbml0RXh0cmFSb3V0ZXJzOiAtPlxuICAgIGV4dHJhUm91dGVycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBmb3IgcnRyIG9mIGV4dHJhUm91dGVyc1xuICAgICAgcm9wdHMgPSBleHRyYVJvdXRlcnNbcnRyXVxuICAgICAgQHNldEV4dHJhUm91dGVyIHJ0ciwgcm9wdHNbJ3JvdXRlciddLCByb3B0c1snY29udHJvbGxlciddXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGNvbnNvbGUubG9nIFwiZXh0cmEgcm91dGVyICN7cnRyfSBjcmVhdGVkXCJcbiAgICAgICAgY29uc29sZS5sb2cgXCJydHJcIiwgcnRyLCByb3B0c1xuICBnZXRFeHRyYVJvdXRlcjogKG5hbWUpIC0+XG4gICAgcmV0dXJuIEBfZXh0cmFSb3V0ZXJzW25hbWVdXG4gIGdldENvbnRyb2xsZXI6IC0+XG4gICAgcmV0dXJuIEByb3V0ZXIuY29udHJvbGxlclxuICAgIFxuICAgICAgXG5leHBvcnQgZGVmYXVsdCBUa0FwcGxldFxuXG4iXX0=
