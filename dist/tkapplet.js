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
    c = new controllerClass;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGFBQUEsRUFBQSxRQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxHQUFUO0NBQUEsTUFBQTs7QUFFQSxhQUFBLEdBQWdCLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFVixXQUFOLE1BQUEsU0FBQSxRQUF1QixJQUF2QjtFQUNFLGtCQUFvQixDQUFBLENBQUE7QUFDbEIsUUFBQSxPQUFBLEVBQUE7SUFBQSxPQUFBLEdBQVUsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsYUFBdEIsRUFBcUMsUUFBckM7SUFDVixPQUFPLENBQUMsS0FBUixDQUFBO0lBQ0EsSUFBRyxJQUFDLENBQUEsYUFBSjtNQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBQyxDQUFBLGFBQWIsRUFERjs7SUFFQSxXQUFBLEdBQWMsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsYUFBdEIsRUFBcUMsTUFBckM7V0FDZCxXQUFXLENBQUMsS0FBWixDQUFBO0VBTmtCOztFQU9wQixhQUFlLENBQUEsQ0FBQTtBQUNiLFFBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUEsSUFBQyxDQUFBLGtCQUFELENBQUE7SUFDQSxVQUFBLEdBQWEsSUFBSSxJQUFDLENBQUEsVUFBTCxDQUNYO01BQUEsV0FBQSxFQUFhLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDO0lBQTNCLENBRFc7SUFFYixVQUFVLENBQUMsTUFBWCxHQUFvQjtJQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBQyxDQUFBLE1BQUwsQ0FDUjtNQUFBLFVBQUEsRUFBWSxVQUFaO01BQ0EsV0FBQSxFQUFhLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDO0lBRDNCLENBRFE7SUFHVixtQkFBRyxJQUFDLENBQUUsa0JBQU47TUFDRSxTQUFBLDJDQUFZLElBQUMsQ0FBQSxxQkFBRCxJQUFpQixJQUFDLENBQUE7TUFDOUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLENBQXNCLENBQUMsT0FBdkIsQ0FBK0IsQ0FBQyxDQUFELENBQUEsR0FBQTtlQUM3QixJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsU0FBVSxDQUFBLENBQUEsQ0FBOUI7TUFENkIsQ0FBL0IsRUFGRjtLQVBBOzs7O0lBY0Esc0NBQVcsQ0FBRSwwQkFBYjtNQUNFLE1BQUEsa0RBQTJCLENBQUUsOEJBQXBCLElBQTRDO01BQ3JELElBQU8sYUFBTSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBcEIsQ0FBTixFQUFBLEVBQUEsS0FBUDtRQUNFLElBQUcsT0FBSDtVQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsMEJBQWIsRUFERjs7UUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsRUFBakIsRUFBcUIsTUFBckIsRUFIRjtPQUZGOztJQU1BLElBQUMsQ0FBQSxhQUFELEdBQWlCLENBQUE7SUFDakIsSUFBQyxDQUFBLGdCQUFELENBQUE7V0FDQSxJQUFDLENBQUEsVUFBRCxDQUFBLENBQWEsQ0FBQyxLQUFkLENBQW9CLFlBQXBCLEVBQWtDLENBQUEsQ0FBQSxHQUFBO0FBQ2hDLGFBQU87SUFEeUIsQ0FBbEM7RUF2QmE7O0VBeUJmLE1BQVEsQ0FBQSxDQUFBO0lBQ04sSUFBRyxPQUFIO2FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFDLENBQUMsU0FBRixDQUFBLENBQWpDLEVBREY7O0VBRE07O0VBR1IsY0FBZ0IsQ0FBQyxJQUFELEVBQU8sV0FBUCxFQUFvQixlQUFwQixDQUFBO0FBQ2QsUUFBQSxDQUFBLEVBQUE7SUFBQSxDQUFBLEdBQUksSUFBSTtJQUNSLENBQUEsR0FBSSxJQUFJLFdBQUosQ0FDRjtNQUFBLFVBQUEsRUFBWTtJQUFaLENBREU7V0FFSixJQUFDLENBQUEsYUFBYyxDQUFBLElBQUEsQ0FBZixHQUF1QjtFQUpUOztFQUtoQixnQkFBa0IsQ0FBQSxDQUFBO0FBQ2hCLFFBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7SUFBQSxZQUFBLEdBQWUsSUFBQyxDQUFBLFNBQUQsQ0FBVyxjQUFYO0FBQ2Y7SUFBQSxLQUFBLG1CQUFBO01BQ0UsS0FBQSxHQUFRLFlBQWEsQ0FBQSxHQUFBO01BQ3JCLElBQUMsQ0FBQSxjQUFELENBQWdCLEdBQWhCLEVBQXFCLEtBQU0sQ0FBQSxRQUFBLENBQTNCLEVBQXNDLEtBQU0sQ0FBQSxZQUFBLENBQTVDO01BQ0EsSUFBRyxPQUFIO1FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLGFBQUEsQ0FBQSxDQUFnQixHQUFoQixDQUFvQixRQUFwQixDQUFaO3FCQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixLQUF4QixHQUZGO09BQUEsTUFBQTs2QkFBQTs7SUFIRixDQUFBOztFQUZnQjs7RUFRbEIsY0FBZ0IsQ0FBQyxJQUFELENBQUE7QUFDZCxXQUFPLElBQUMsQ0FBQSxhQUFjLENBQUEsSUFBQTtFQURSOztFQUVoQixhQUFlLENBQUEsQ0FBQTtBQUNiLFdBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQztFQURGOztBQW5EakI7O0FBdURBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbk5hdmJhckNoYW5uZWwgPSBSYWRpby5jaGFubmVsICduYXZiYXInXG5cbmNsYXNzIFRrQXBwbGV0IGV4dGVuZHMgQXBwXG4gIHNldHVwQXBwbGV0RW50cmllczogLT5cbiAgICBlbnRyaWVzID0gTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdhcHBsZXQnXG4gICAgZW50cmllcy5yZXNldCgpXG4gICAgaWYgQGFwcGxldEVudHJpZXNcbiAgICAgIGVudHJpZXMuc2V0IEBhcHBsZXRFbnRyaWVzXG4gICAgdmlld0VudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ3ZpZXcnXG4gICAgdmlld0VudHJpZXMucmVzZXQoKVxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIEBzZXR1cEFwcGxldEVudHJpZXMoKVxuICAgIGNvbnRyb2xsZXIgPSBuZXcgQENvbnRyb2xsZXJcbiAgICAgIGNoYW5uZWxOYW1lOiBAZ2V0Q2hhbm5lbCgpLmNoYW5uZWxOYW1lXG4gICAgY29udHJvbGxlci5hcHBsZXQgPSBAXG4gICAgQHJvdXRlciA9IG5ldyBAUm91dGVyXG4gICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gICAgICBjaGFubmVsTmFtZTogQGdldENoYW5uZWwoKS5jaGFubmVsTmFtZVxuICAgIGlmIEA/LmFwcFJvdXRlc1xuICAgICAgYXBwUm91dGVzID0gQGFwcFJvdXRlcz8oKSBvciBAYXBwUm91dGVzXG4gICAgICBPYmplY3Qua2V5cyhhcHBSb3V0ZXMpLmZvckVhY2ggKHIpID0+XG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgciwgYXBwUm91dGVzW3JdXG4gICAgIyB3ZSB3YW50IHRvIGFkanVzdCB0aGUgYXBwcm91dGVyIGZvciBmcm9udGRvb3JcbiAgICAjIHVzZSBoZXJlLCBpbnN0ZWFkIG9mIGluIHRoZSBBcHBSb3V0ZXIgY2xhc3MsXG4gICAgIyBzbyBob3BlZnVsbHksIG9ubHkgb25lIGFwcGxldCBoYW5kbGVzIHRoZSBcImVtcHR5IHJvdXRlLlxuICAgIGlmIEBvcHRpb25zPy5pc0Zyb250ZG9vckFwcGxldFxuICAgICAgbWV0aG9kID0gQG9wdGlvbnMuYXBwQ29uZmlnPy5zdGFydEZyb250ZG9vck1ldGhvZCBvciAnc3RhcnQnXG4gICAgICB1bmxlc3MgJycgaW4gT2JqZWN0LmtleXMgQHJvdXRlci5hcHBSb3V0ZXNcbiAgICAgICAgaWYgX19ERVZfX1xuICAgICAgICAgIGNvbnNvbGUud2FybiBcIkFkZGluZyBzdGFydCB0byBUa0FwcGxldFwiXG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgJycsIG1ldGhvZFxuICAgIEBfZXh0cmFSb3V0ZXJzID0ge31cbiAgICBAaW5pdEV4dHJhUm91dGVycygpXG4gICAgQGdldENoYW5uZWwoKS5yZXBseSAnZ2V0LWFwcGxldCcsID0+XG4gICAgICByZXR1cm4gQFxuICBvblN0b3A6IC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJTdG9wcGluZyBUa0FwcGxldFwiLCBALmlzUnVubmluZygpXG4gIHNldEV4dHJhUm91dGVyOiAobmFtZSwgcm91dGVyQ2xhc3MsIGNvbnRyb2xsZXJDbGFzcykgLT5cbiAgICBjID0gbmV3IGNvbnRyb2xsZXJDbGFzc1xuICAgIHIgPSBuZXcgcm91dGVyQ2xhc3NcbiAgICAgIGNvbnRyb2xsZXI6IGNcbiAgICBAX2V4dHJhUm91dGVyc1tuYW1lXSA9IHJcbiAgaW5pdEV4dHJhUm91dGVyczogLT5cbiAgICBleHRyYVJvdXRlcnMgPSBAZ2V0T3B0aW9uICdleHRyYVJvdXRlcnMnXG4gICAgZm9yIHJ0ciBvZiBleHRyYVJvdXRlcnNcbiAgICAgIHJvcHRzID0gZXh0cmFSb3V0ZXJzW3J0cl1cbiAgICAgIEBzZXRFeHRyYVJvdXRlciBydHIsIHJvcHRzWydyb3V0ZXInXSwgcm9wdHNbJ2NvbnRyb2xsZXInXVxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcImV4dHJhIHJvdXRlciAje3J0cn0gY3JlYXRlZFwiXG4gICAgICAgIGNvbnNvbGUubG9nIFwicnRyXCIsIHJ0ciwgcm9wdHNcbiAgZ2V0RXh0cmFSb3V0ZXI6IChuYW1lKSAtPlxuICAgIHJldHVybiBAX2V4dHJhUm91dGVyc1tuYW1lXVxuICBnZXRDb250cm9sbGVyOiAtPlxuICAgIHJldHVybiBAcm91dGVyLmNvbnRyb2xsZXJcbiAgICBcbiAgICAgIFxuZXhwb3J0IGRlZmF1bHQgVGtBcHBsZXRcblxuIl19
