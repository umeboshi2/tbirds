var MainChannel, NavbarChannel, TkApplet,
  indexOf = [].indexOf;

import Backbone from 'backbone';

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

  getController() {
    return this.router.controller;
  }

};

export default TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUEsUUFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVYsV0FBTixNQUFBLFNBQUEsUUFBdUIsT0FBTyxDQUFDLElBQS9CO0VBQ0Usa0JBQW9CLENBQUEsQ0FBQTtBQUNsQixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxRQUFyQztJQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxhQUFKO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsYUFBYixFQURGOztJQUVBLFdBQUEsR0FBYyxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxNQUFyQztXQUNkLFdBQVcsQ0FBQyxLQUFaLENBQUE7RUFOa0I7O0VBT3BCLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQUNBLFVBQUEsR0FBYSxJQUFJLElBQUMsQ0FBQTtJQUNsQixVQUFVLENBQUMsTUFBWCxHQUFvQjtJQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBQyxDQUFBLE1BQUwsQ0FDUjtNQUFBLFVBQUEsRUFBWTtJQUFaLENBRFE7SUFFVixtQkFBRyxJQUFDLENBQUUsa0JBQU47TUFDRSxTQUFBLDJDQUFZLElBQUMsQ0FBQSxxQkFBRCxJQUFpQixJQUFDLENBQUE7TUFDOUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLENBQXNCLENBQUMsT0FBdkIsQ0FBK0IsQ0FBQyxDQUFELENBQUEsR0FBQTtlQUM3QixJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsU0FBVSxDQUFBLENBQUEsQ0FBOUI7TUFENkIsQ0FBL0IsRUFGRjtLQUxBOzs7O0lBWUEsc0NBQVcsQ0FBRSwwQkFBYjtNQUNFLE1BQUEsa0RBQTJCLENBQUUsOEJBQXBCLElBQTRDO01BQ3JELElBQU8sYUFBTSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBcEIsQ0FBTixFQUFBLEVBQUEsS0FBUDtRQUNFLElBQUcsT0FBSDtVQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsMEJBQWIsRUFERjs7UUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsRUFBakIsRUFBcUIsTUFBckIsRUFIRjtPQUZGOztJQU1BLElBQUMsQ0FBQSxhQUFELEdBQWlCLENBQUE7V0FDakIsSUFBQyxDQUFBLGdCQUFELENBQUE7RUFwQmE7O0VBcUJmLE1BQVEsQ0FBQSxDQUFBO0lBQ04sSUFBRyxPQUFIO2FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFDLENBQUMsU0FBRixDQUFBLENBQWpDLEVBREY7O0VBRE07O0VBR1IsY0FBZ0IsQ0FBQyxJQUFELEVBQU8sV0FBUCxFQUFvQixlQUFwQixDQUFBO0FBQ2QsUUFBQSxDQUFBLEVBQUE7SUFBQSxDQUFBLEdBQUksSUFBSTtJQUNSLENBQUEsR0FBSSxJQUFJLFdBQUosQ0FDRjtNQUFBLFVBQUEsRUFBWTtJQUFaLENBREU7V0FFSixJQUFDLENBQUEsYUFBYyxDQUFBLElBQUEsQ0FBZixHQUF1QjtFQUpUOztFQUtoQixnQkFBa0IsQ0FBQSxDQUFBO0FBQ2hCLFFBQUEsTUFBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0lBQUEsWUFBQSxHQUFlLElBQUMsQ0FBQSxTQUFELENBQVcsY0FBWDtJQUNmLE1BQUEsR0FBUyxJQUFDLENBQUEsU0FBRCxDQUFXLGNBQVg7QUFDVDtJQUFBLEtBQUEsbUJBQUE7TUFDRSxLQUFBLEdBQVEsWUFBYSxDQUFBLEdBQUE7TUFDckIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCO01BQ0EsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsR0FBaEIsRUFBcUIsS0FBTSxDQUFBLFFBQUEsQ0FBM0IsRUFBc0MsS0FBTSxDQUFBLFlBQUEsQ0FBNUM7TUFDQSxJQUFHLE9BQUg7cUJBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLGFBQUEsQ0FBQSxDQUFnQixHQUFoQixDQUFvQixRQUFwQixDQUFaLEdBREY7T0FBQSxNQUFBOzZCQUFBOztJQUpGLENBQUE7O0VBSGdCOztFQVNsQixjQUFnQixDQUFDLElBQUQsQ0FBQTtBQUNkLFdBQU8sSUFBQyxDQUFBLGFBQWMsQ0FBQSxJQUFBO0VBRFI7O0VBRWhCLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsV0FBTyxJQUFDLENBQUEsTUFBTSxDQUFDO0VBREY7O0FBaERqQjs7QUFvREEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk5hdmJhckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICduYXZiYXInXG5cbmNsYXNzIFRrQXBwbGV0IGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgc2V0dXBBcHBsZXRFbnRyaWVzOiAtPlxuICAgIGVudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBlbnRyaWVzLnJlc2V0KClcbiAgICBpZiBAYXBwbGV0RW50cmllc1xuICAgICAgZW50cmllcy5zZXQgQGFwcGxldEVudHJpZXNcbiAgICB2aWV3RW50cmllcyA9IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAndmlldydcbiAgICB2aWV3RW50cmllcy5yZXNldCgpXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgQHNldHVwQXBwbGV0RW50cmllcygpXG4gICAgY29udHJvbGxlciA9IG5ldyBAQ29udHJvbGxlclxuICAgIGNvbnRyb2xsZXIuYXBwbGV0ID0gQFxuICAgIEByb3V0ZXIgPSBuZXcgQFJvdXRlclxuICAgICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICAgIGlmIEA/LmFwcFJvdXRlc1xuICAgICAgYXBwUm91dGVzID0gQGFwcFJvdXRlcz8oKSBvciBAYXBwUm91dGVzXG4gICAgICBPYmplY3Qua2V5cyhhcHBSb3V0ZXMpLmZvckVhY2ggKHIpID0+XG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgciwgYXBwUm91dGVzW3JdXG4gICAgIyB3ZSB3YW50IHRvIGFkanVzdCB0aGUgYXBwcm91dGVyIGZvciBmcm9udGRvb3JcbiAgICAjIHVzZSBoZXJlLCBpbnN0ZWFkIG9mIGluIHRoZSBBcHBSb3V0ZXIgY2xhc3MsXG4gICAgIyBzbyBob3BlZnVsbHksIG9ubHkgb25lIGFwcGxldCBoYW5kbGVzIHRoZSBcImVtcHR5IHJvdXRlLlxuICAgIGlmIEBvcHRpb25zPy5pc0Zyb250ZG9vckFwcGxldFxuICAgICAgbWV0aG9kID0gQG9wdGlvbnMuYXBwQ29uZmlnPy5zdGFydEZyb250ZG9vck1ldGhvZCBvciAnc3RhcnQnXG4gICAgICB1bmxlc3MgJycgaW4gT2JqZWN0LmtleXMgQHJvdXRlci5hcHBSb3V0ZXNcbiAgICAgICAgaWYgX19ERVZfX1xuICAgICAgICAgIGNvbnNvbGUud2FybiBcIkFkZGluZyBzdGFydCB0byBUa0FwcGxldFwiXG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgJycsIG1ldGhvZFxuICAgIEBfZXh0cmFSb3V0ZXJzID0ge31cbiAgICBAaW5pdEV4dHJhUm91dGVycygpXG4gIG9uU3RvcDogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIlN0b3BwaW5nIFRrQXBwbGV0XCIsIEAuaXNSdW5uaW5nKClcbiAgc2V0RXh0cmFSb3V0ZXI6IChuYW1lLCByb3V0ZXJDbGFzcywgY29udHJvbGxlckNsYXNzKSAtPlxuICAgIGMgPSBuZXcgY29udHJvbGxlckNsYXNzXG4gICAgciA9IG5ldyByb3V0ZXJDbGFzc1xuICAgICAgY29udHJvbGxlcjogY1xuICAgIEBfZXh0cmFSb3V0ZXJzW25hbWVdID0gclxuICBpbml0RXh0cmFSb3V0ZXJzOiAtPlxuICAgIGV4dHJhUm91dGVycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBleFJ0cnMgPSBAZ2V0T3B0aW9uICdleHRyYVJvdXRlcnMnXG4gICAgZm9yIHJ0ciBvZiBleHRyYVJvdXRlcnNcbiAgICAgIHJvcHRzID0gZXh0cmFSb3V0ZXJzW3J0cl1cbiAgICAgIGNvbnNvbGUubG9nIFwicnRyXCIsIHJ0ciwgcm9wdHNcbiAgICAgIEBzZXRFeHRyYVJvdXRlciBydHIsIHJvcHRzWydyb3V0ZXInXSwgcm9wdHNbJ2NvbnRyb2xsZXInXVxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcImV4dHJhIHJvdXRlciAje3J0cn0gY3JlYXRlZFwiXG4gIGdldEV4dHJhUm91dGVyOiAobmFtZSkgLT5cbiAgICByZXR1cm4gQF9leHRyYVJvdXRlcnNbbmFtZV1cbiAgZ2V0Q29udHJvbGxlcjogLT5cbiAgICByZXR1cm4gQHJvdXRlci5jb250cm9sbGVyXG4gICAgXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IFRrQXBwbGV0XG5cbiJdfQ==
