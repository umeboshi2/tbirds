var MainChannel, NavbarChannel, TkApplet,
  indexOf = [].indexOf;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

MainChannel = Backbone.Radio.channel('global');

NavbarChannel = Backbone.Radio.channel('navbar');

TkApplet = class TkApplet extends Toolkit.App {
  setupAppletEntries() {
    var entries;
    entries = NavbarChannel.request('get-entries', 'applet');
    entries.reset();
    if (this.appletEntries) {
      return entries.set(this.appletEntries);
    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUEsUUFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVYsV0FBTixNQUFBLFNBQUEsUUFBdUIsT0FBTyxDQUFDLElBQS9CO0VBQ0Usa0JBQW9CLENBQUEsQ0FBQTtBQUNsQixRQUFBO0lBQUEsT0FBQSxHQUFVLGFBQWEsQ0FBQyxPQUFkLENBQXNCLGFBQXRCLEVBQXFDLFFBQXJDO0lBQ1YsT0FBTyxDQUFDLEtBQVIsQ0FBQTtJQUNBLElBQUcsSUFBQyxDQUFBLGFBQUo7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxhQUFiLEVBREY7O0VBSGtCOztFQUtwQixhQUFlLENBQUEsQ0FBQTtBQUNiLFFBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUEsSUFBQyxDQUFBLGtCQUFELENBQUE7SUFDQSxVQUFBLEdBQWEsSUFBSSxJQUFDLENBQUE7SUFDbEIsVUFBVSxDQUFDLE1BQVgsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLElBQUMsQ0FBQSxNQUFMLENBQ1I7TUFBQSxVQUFBLEVBQVk7SUFBWixDQURRO0lBRVYsbUJBQUcsSUFBQyxDQUFFLGtCQUFOO01BQ0UsU0FBQSwyQ0FBWSxJQUFDLENBQUEscUJBQUQsSUFBaUIsSUFBQyxDQUFBO01BQzlCLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQUFzQixDQUFDLE9BQXZCLENBQStCLENBQUMsQ0FBRCxDQUFBLEdBQUE7ZUFDN0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLENBQWpCLEVBQW9CLFNBQVUsQ0FBQSxDQUFBLENBQTlCO01BRDZCLENBQS9CLEVBRkY7S0FMQTs7OztJQVlBLHNDQUFXLENBQUUsMEJBQWI7TUFDRSxNQUFBLGtEQUEyQixDQUFFLDhCQUFwQixJQUE0QztNQUNyRCxJQUFPLGFBQU0sTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQXBCLENBQU4sRUFBQSxFQUFBLEtBQVA7UUFDRSxJQUFHLE9BQUg7VUFDRSxPQUFPLENBQUMsSUFBUixDQUFhLDBCQUFiLEVBREY7O1FBRUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLEVBQWpCLEVBQXFCLE1BQXJCLEVBSEY7T0FGRjs7SUFNQSxJQUFDLENBQUEsYUFBRCxHQUFpQixDQUFBO1dBQ2pCLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0VBcEJhOztFQXFCZixNQUFRLENBQUEsQ0FBQTtJQUNOLElBQUcsT0FBSDthQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksbUJBQVosRUFBaUMsSUFBQyxDQUFDLFNBQUYsQ0FBQSxDQUFqQyxFQURGOztFQURNOztFQUdSLGNBQWdCLENBQUMsSUFBRCxFQUFPLFdBQVAsRUFBb0IsZUFBcEIsQ0FBQTtBQUNkLFFBQUEsQ0FBQSxFQUFBO0lBQUEsQ0FBQSxHQUFJLElBQUk7SUFDUixDQUFBLEdBQUksSUFBSSxXQUFKLENBQ0Y7TUFBQSxVQUFBLEVBQVk7SUFBWixDQURFO1dBRUosSUFBQyxDQUFBLGFBQWMsQ0FBQSxJQUFBLENBQWYsR0FBdUI7RUFKVDs7RUFLaEIsZ0JBQWtCLENBQUEsQ0FBQTtBQUNoQixRQUFBLE1BQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtJQUFBLFlBQUEsR0FBZSxJQUFDLENBQUEsU0FBRCxDQUFXLGNBQVg7SUFDZixNQUFBLEdBQVMsSUFBQyxDQUFBLFNBQUQsQ0FBVyxjQUFYO0FBQ1Q7SUFBQSxLQUFBLG1CQUFBO01BQ0UsS0FBQSxHQUFRLFlBQWEsQ0FBQSxHQUFBO01BQ3JCLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixLQUF4QjtNQUNBLElBQUMsQ0FBQSxjQUFELENBQWdCLEdBQWhCLEVBQXFCLEtBQU0sQ0FBQSxRQUFBLENBQTNCLEVBQXNDLEtBQU0sQ0FBQSxZQUFBLENBQTVDO01BQ0EsSUFBRyxPQUFIO3FCQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsR0FBaEIsQ0FBb0IsUUFBcEIsQ0FBWixHQURGO09BQUEsTUFBQTs2QkFBQTs7SUFKRixDQUFBOztFQUhnQjs7RUFTbEIsY0FBZ0IsQ0FBQyxJQUFELENBQUE7V0FDZCxJQUFDLENBQUEsYUFBYyxDQUFBLElBQUE7RUFERDs7QUE1Q2xCOztBQWdEQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk5hdmJhckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICduYXZiYXInXG5cbmNsYXNzIFRrQXBwbGV0IGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgc2V0dXBBcHBsZXRFbnRyaWVzOiAtPlxuICAgIGVudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBlbnRyaWVzLnJlc2V0KClcbiAgICBpZiBAYXBwbGV0RW50cmllc1xuICAgICAgZW50cmllcy5zZXQgQGFwcGxldEVudHJpZXNcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBAc2V0dXBBcHBsZXRFbnRyaWVzKClcbiAgICBjb250cm9sbGVyID0gbmV3IEBDb250cm9sbGVyXG4gICAgY29udHJvbGxlci5hcHBsZXQgPSBAXG4gICAgQHJvdXRlciA9IG5ldyBAUm91dGVyXG4gICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gICAgaWYgQD8uYXBwUm91dGVzXG4gICAgICBhcHBSb3V0ZXMgPSBAYXBwUm91dGVzPygpIG9yIEBhcHBSb3V0ZXNcbiAgICAgIE9iamVjdC5rZXlzKGFwcFJvdXRlcykuZm9yRWFjaCAocikgPT5cbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSByLCBhcHBSb3V0ZXNbcl1cbiAgICAjIHdlIHdhbnQgdG8gYWRqdXN0IHRoZSBhcHByb3V0ZXIgZm9yIGZyb250ZG9vclxuICAgICMgdXNlIGhlcmUsIGluc3RlYWQgb2YgaW4gdGhlIEFwcFJvdXRlciBjbGFzcyxcbiAgICAjIHNvIGhvcGVmdWxseSwgb25seSBvbmUgYXBwbGV0IGhhbmRsZXMgdGhlIFwiZW1wdHkgcm91dGUuXG4gICAgaWYgQG9wdGlvbnM/LmlzRnJvbnRkb29yQXBwbGV0XG4gICAgICBtZXRob2QgPSBAb3B0aW9ucy5hcHBDb25maWc/LnN0YXJ0RnJvbnRkb29yTWV0aG9kIG9yICdzdGFydCdcbiAgICAgIHVubGVzcyAnJyBpbiBPYmplY3Qua2V5cyBAcm91dGVyLmFwcFJvdXRlc1xuICAgICAgICBpZiBfX0RFVl9fXG4gICAgICAgICAgY29uc29sZS53YXJuIFwiQWRkaW5nIHN0YXJ0IHRvIFRrQXBwbGV0XCJcbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSAnJywgbWV0aG9kXG4gICAgQF9leHRyYVJvdXRlcnMgPSB7fVxuICAgIEBpbml0RXh0cmFSb3V0ZXJzKClcbiAgb25TdG9wOiAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiU3RvcHBpbmcgVGtBcHBsZXRcIiwgQC5pc1J1bm5pbmcoKVxuICBzZXRFeHRyYVJvdXRlcjogKG5hbWUsIHJvdXRlckNsYXNzLCBjb250cm9sbGVyQ2xhc3MpIC0+XG4gICAgYyA9IG5ldyBjb250cm9sbGVyQ2xhc3NcbiAgICByID0gbmV3IHJvdXRlckNsYXNzXG4gICAgICBjb250cm9sbGVyOiBjXG4gICAgQF9leHRyYVJvdXRlcnNbbmFtZV0gPSByXG4gIGluaXRFeHRyYVJvdXRlcnM6IC0+XG4gICAgZXh0cmFSb3V0ZXJzID0gQGdldE9wdGlvbiAnZXh0cmFSb3V0ZXJzJ1xuICAgIGV4UnRycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBmb3IgcnRyIG9mIGV4dHJhUm91dGVyc1xuICAgICAgcm9wdHMgPSBleHRyYVJvdXRlcnNbcnRyXVxuICAgICAgY29uc29sZS5sb2cgXCJydHJcIiwgcnRyLCByb3B0c1xuICAgICAgQHNldEV4dHJhUm91dGVyIHJ0ciwgcm9wdHNbJ3JvdXRlciddLCByb3B0c1snY29udHJvbGxlciddXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGNvbnNvbGUubG9nIFwiZXh0cmEgcm91dGVyICN7cnRyfSBjcmVhdGVkXCJcbiAgZ2V0RXh0cmFSb3V0ZXI6IChuYW1lKSAtPlxuICAgIEBfZXh0cmFSb3V0ZXJzW25hbWVdXG4gICAgXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IFRrQXBwbGV0XG5cbiJdfQ==
