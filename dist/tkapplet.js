var MainChannel, NavbarChannel, TkApplet,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

MainChannel = Backbone.Radio.channel('global');

NavbarChannel = Backbone.Radio.channel('navbar');

TkApplet = class TkApplet extends Toolkit.App {
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
    controller = new this.Controller;
    controller.applet = this;
    this.router = new this.Router({
      controller: controller
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
    return this.initExtraRouters();
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

};

export default TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUEsUUFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVYsV0FBTixNQUFBLFNBQUEsUUFBdUIsT0FBTyxDQUFDLElBQS9CO0VBQ0Usa0JBQW9CLENBQUEsQ0FBQTtBQUNsQixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxRQUFyQztJQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxhQUFKO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsYUFBYixFQURGOztJQUVBLFdBQUEsR0FBYyxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxNQUFyQztXQUNkLFdBQVcsQ0FBQyxLQUFaLENBQUE7RUFOa0I7O0VBT3BCLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQUNBLFVBQUEsR0FBYSxJQUFJLElBQUMsQ0FBQTtJQUNsQixVQUFVLENBQUMsTUFBWCxHQUFvQjtJQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBQyxDQUFBLE1BQUwsQ0FDUjtNQUFBLFVBQUEsRUFBWTtJQUFaLENBRFE7SUFFVixtQkFBRyxJQUFDLENBQUUsa0JBQU47TUFDRSxTQUFBLDJDQUFZLElBQUMsQ0FBQSxxQkFBRCxJQUFpQixJQUFDLENBQUE7TUFDOUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLENBQXNCLENBQUMsT0FBdkIsQ0FBK0IsQ0FBQyxDQUFELENBQUEsR0FBQTtlQUM3QixJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsU0FBVSxDQUFBLENBQUEsQ0FBOUI7TUFENkIsQ0FBL0IsRUFGRjtLQUxBOzs7O0lBWUEsc0NBQVcsQ0FBRSwwQkFBYjtNQUNFLE1BQUEsa0RBQTJCLENBQUUsOEJBQXBCLElBQTRDO01BQ3JELElBQU8sYUFBTSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBcEIsQ0FBTixFQUFBLEVBQUEsS0FBUDtRQUNFLElBQUcsT0FBSDtVQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsMEJBQWIsRUFERjs7UUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsRUFBakIsRUFBcUIsTUFBckIsRUFIRjtPQUZGOztJQU1BLElBQUMsQ0FBQSxhQUFELEdBQWlCLENBQUE7V0FDakIsSUFBQyxDQUFBLGdCQUFELENBQUE7RUFwQmE7O0VBcUJmLE1BQVEsQ0FBQSxDQUFBO0lBQ04sSUFBRyxPQUFIO2FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFDLENBQUMsU0FBRixDQUFBLENBQWpDLEVBREY7O0VBRE07O0VBR1IsY0FBZ0IsQ0FBQyxJQUFELEVBQU8sV0FBUCxFQUFvQixlQUFwQixDQUFBO0FBQ2QsUUFBQSxDQUFBLEVBQUE7SUFBQSxDQUFBLEdBQUksSUFBSTtJQUNSLENBQUEsR0FBSSxJQUFJLFdBQUosQ0FDRjtNQUFBLFVBQUEsRUFBWTtJQUFaLENBREU7V0FFSixJQUFDLENBQUEsYUFBYyxDQUFBLElBQUEsQ0FBZixHQUF1QjtFQUpUOztFQUtoQixnQkFBa0IsQ0FBQSxDQUFBO0FBQ2hCLFFBQUEsTUFBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0lBQUEsWUFBQSxHQUFlLElBQUMsQ0FBQSxTQUFELENBQVcsY0FBWDtJQUNmLE1BQUEsR0FBUyxJQUFDLENBQUEsU0FBRCxDQUFXLGNBQVg7QUFDVDtJQUFBLEtBQUEsbUJBQUE7TUFDRSxLQUFBLEdBQVEsWUFBYSxDQUFBLEdBQUE7TUFDckIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCO01BQ0EsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsR0FBaEIsRUFBcUIsS0FBTSxDQUFBLFFBQUEsQ0FBM0IsRUFBc0MsS0FBTSxDQUFBLFlBQUEsQ0FBNUM7TUFDQSxJQUFHLE9BQUg7cUJBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLGFBQUEsQ0FBQSxDQUFnQixHQUFoQixDQUFvQixRQUFwQixDQUFaLEdBREY7T0FBQSxNQUFBOzZCQUFBOztJQUpGLENBQUE7O0VBSGdCOztFQVNsQixjQUFnQixDQUFDLElBQUQsQ0FBQTtXQUNkLElBQUMsQ0FBQSxhQUFjLENBQUEsSUFBQTtFQUREOztBQTlDbEI7O0FBa0RBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgVG9vbGtpdCBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTmF2YmFyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ25hdmJhcidcblxuY2xhc3MgVGtBcHBsZXQgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBzZXR1cEFwcGxldEVudHJpZXM6IC0+XG4gICAgZW50cmllcyA9IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnYXBwbGV0J1xuICAgIGVudHJpZXMucmVzZXQoKVxuICAgIGlmIEBhcHBsZXRFbnRyaWVzXG4gICAgICBlbnRyaWVzLnNldCBAYXBwbGV0RW50cmllc1xuICAgIHZpZXdFbnRyaWVzID0gTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICd2aWV3J1xuICAgIHZpZXdFbnRyaWVzLnJlc2V0KClcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBAc2V0dXBBcHBsZXRFbnRyaWVzKClcbiAgICBjb250cm9sbGVyID0gbmV3IEBDb250cm9sbGVyXG4gICAgY29udHJvbGxlci5hcHBsZXQgPSBAXG4gICAgQHJvdXRlciA9IG5ldyBAUm91dGVyXG4gICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gICAgaWYgQD8uYXBwUm91dGVzXG4gICAgICBhcHBSb3V0ZXMgPSBAYXBwUm91dGVzPygpIG9yIEBhcHBSb3V0ZXNcbiAgICAgIE9iamVjdC5rZXlzKGFwcFJvdXRlcykuZm9yRWFjaCAocikgPT5cbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSByLCBhcHBSb3V0ZXNbcl1cbiAgICAjIHdlIHdhbnQgdG8gYWRqdXN0IHRoZSBhcHByb3V0ZXIgZm9yIGZyb250ZG9vclxuICAgICMgdXNlIGhlcmUsIGluc3RlYWQgb2YgaW4gdGhlIEFwcFJvdXRlciBjbGFzcyxcbiAgICAjIHNvIGhvcGVmdWxseSwgb25seSBvbmUgYXBwbGV0IGhhbmRsZXMgdGhlIFwiZW1wdHkgcm91dGUuXG4gICAgaWYgQG9wdGlvbnM/LmlzRnJvbnRkb29yQXBwbGV0XG4gICAgICBtZXRob2QgPSBAb3B0aW9ucy5hcHBDb25maWc/LnN0YXJ0RnJvbnRkb29yTWV0aG9kIG9yICdzdGFydCdcbiAgICAgIHVubGVzcyAnJyBpbiBPYmplY3Qua2V5cyBAcm91dGVyLmFwcFJvdXRlc1xuICAgICAgICBpZiBfX0RFVl9fXG4gICAgICAgICAgY29uc29sZS53YXJuIFwiQWRkaW5nIHN0YXJ0IHRvIFRrQXBwbGV0XCJcbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSAnJywgbWV0aG9kXG4gICAgQF9leHRyYVJvdXRlcnMgPSB7fVxuICAgIEBpbml0RXh0cmFSb3V0ZXJzKClcbiAgb25TdG9wOiAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiU3RvcHBpbmcgVGtBcHBsZXRcIiwgQC5pc1J1bm5pbmcoKVxuICBzZXRFeHRyYVJvdXRlcjogKG5hbWUsIHJvdXRlckNsYXNzLCBjb250cm9sbGVyQ2xhc3MpIC0+XG4gICAgYyA9IG5ldyBjb250cm9sbGVyQ2xhc3NcbiAgICByID0gbmV3IHJvdXRlckNsYXNzXG4gICAgICBjb250cm9sbGVyOiBjXG4gICAgQF9leHRyYVJvdXRlcnNbbmFtZV0gPSByXG4gIGluaXRFeHRyYVJvdXRlcnM6IC0+XG4gICAgZXh0cmFSb3V0ZXJzID0gQGdldE9wdGlvbiAnZXh0cmFSb3V0ZXJzJ1xuICAgIGV4UnRycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBmb3IgcnRyIG9mIGV4dHJhUm91dGVyc1xuICAgICAgcm9wdHMgPSBleHRyYVJvdXRlcnNbcnRyXVxuICAgICAgY29uc29sZS5sb2cgXCJydHJcIiwgcnRyLCByb3B0c1xuICAgICAgQHNldEV4dHJhUm91dGVyIHJ0ciwgcm9wdHNbJ3JvdXRlciddLCByb3B0c1snY29udHJvbGxlciddXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGNvbnNvbGUubG9nIFwiZXh0cmEgcm91dGVyICN7cnRyfSBjcmVhdGVkXCJcbiAgZ2V0RXh0cmFSb3V0ZXI6IChuYW1lKSAtPlxuICAgIEBfZXh0cmFSb3V0ZXJzW25hbWVdXG4gICAgXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IFRrQXBwbGV0XG5cbiJdfQ==
