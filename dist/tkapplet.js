var Backbone, MainChannel, Marionette, TkApplet, Toolkit,
  indexOf = [].indexOf;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

MainChannel = Backbone.Radio.channel('global');

TkApplet = class TkApplet extends Toolkit.App {
  onBeforeStart() {
    var appRoutes, controller, method, ref, ref1;
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

module.exports = TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBO0VBQUE7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsT0FBQSxHQUFVLE9BQUEsQ0FBUSxvQkFBUjs7QUFFVixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVSLFdBQU4sTUFBQSxTQUFBLFFBQXVCLE9BQU8sQ0FBQyxJQUEvQjtFQUNFLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxVQUFBLEdBQWEsSUFBSSxJQUFDLENBQUE7SUFDbEIsVUFBVSxDQUFDLE1BQVgsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLElBQUMsQ0FBQSxNQUFMLENBQ1I7TUFBQSxVQUFBLEVBQVk7SUFBWixDQURRO0lBRVYsbUJBQUcsSUFBQyxDQUFFLGtCQUFOO01BQ0UsU0FBQSwyQ0FBWSxJQUFDLENBQUEscUJBQUQsSUFBaUIsSUFBQyxDQUFBO01BQzlCLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQUFzQixDQUFDLE9BQXZCLENBQStCLENBQUMsQ0FBRCxDQUFBLEdBQUE7ZUFDN0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLENBQWpCLEVBQW9CLFNBQVUsQ0FBQSxDQUFBLENBQTlCO01BRDZCLENBQS9CLEVBRkY7S0FKQTs7OztJQVdBLHNDQUFXLENBQUUsMEJBQWI7TUFDRSxNQUFBLGtEQUEyQixDQUFFLDhCQUFwQixJQUE0QztNQUNyRCxJQUFPLGFBQU0sTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQXBCLENBQU4sRUFBQSxFQUFBLEtBQVA7UUFDRSxJQUFHLE9BQUg7VUFDRSxPQUFPLENBQUMsSUFBUixDQUFhLDBCQUFiLEVBREY7O1FBRUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLEVBQWpCLEVBQXFCLE1BQXJCLEVBSEY7T0FGRjs7SUFNQSxJQUFDLENBQUEsYUFBRCxHQUFpQixDQUFBO1dBQ2pCLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0VBbkJhOztFQW9CZixNQUFRLENBQUEsQ0FBQTtJQUNOLElBQUcsT0FBSDthQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksbUJBQVosRUFBaUMsSUFBQyxDQUFDLFNBQUYsQ0FBQSxDQUFqQyxFQURGOztFQURNOztFQUdSLGNBQWdCLENBQUMsSUFBRCxFQUFPLFdBQVAsRUFBb0IsZUFBcEIsQ0FBQTtBQUNkLFFBQUEsQ0FBQSxFQUFBO0lBQUEsQ0FBQSxHQUFJLElBQUk7SUFDUixDQUFBLEdBQUksSUFBSSxXQUFKLENBQ0Y7TUFBQSxVQUFBLEVBQVk7SUFBWixDQURFO1dBRUosSUFBQyxDQUFBLGFBQWMsQ0FBQSxJQUFBLENBQWYsR0FBdUI7RUFKVDs7RUFLaEIsZ0JBQWtCLENBQUEsQ0FBQTtBQUNoQixRQUFBLE1BQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtJQUFBLFlBQUEsR0FBZSxJQUFDLENBQUEsU0FBRCxDQUFXLGNBQVg7SUFDZixNQUFBLEdBQVMsSUFBQyxDQUFBLFNBQUQsQ0FBVyxjQUFYO0FBQ1Q7SUFBQSxLQUFBLG1CQUFBO01BQ0UsS0FBQSxHQUFRLFlBQWEsQ0FBQSxHQUFBO01BQ3JCLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixLQUF4QjtNQUNBLElBQUMsQ0FBQSxjQUFELENBQWdCLEdBQWhCLEVBQXFCLEtBQU0sQ0FBQSxRQUFBLENBQTNCLEVBQXNDLEtBQU0sQ0FBQSxZQUFBLENBQTVDO01BQ0EsSUFBRyxPQUFIO3FCQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsR0FBaEIsQ0FBb0IsUUFBcEIsQ0FBWixHQURGO09BQUEsTUFBQTs2QkFBQTs7SUFKRixDQUFBOztFQUhnQjs7RUFTbEIsY0FBZ0IsQ0FBQyxJQUFELENBQUE7V0FDZCxJQUFDLENBQUEsYUFBYyxDQUFBLElBQUE7RUFERDs7QUF0Q2xCOztBQTBDQSxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBUa0FwcGxldCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgY29udHJvbGxlciA9IG5ldyBAQ29udHJvbGxlclxuICAgIGNvbnRyb2xsZXIuYXBwbGV0ID0gQFxuICAgIEByb3V0ZXIgPSBuZXcgQFJvdXRlclxuICAgICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICAgIGlmIEA/LmFwcFJvdXRlc1xuICAgICAgYXBwUm91dGVzID0gQGFwcFJvdXRlcz8oKSBvciBAYXBwUm91dGVzXG4gICAgICBPYmplY3Qua2V5cyhhcHBSb3V0ZXMpLmZvckVhY2ggKHIpID0+XG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgciwgYXBwUm91dGVzW3JdXG4gICAgIyB3ZSB3YW50IHRvIGFkanVzdCB0aGUgYXBwcm91dGVyIGZvciBmcm9udGRvb3JcbiAgICAjIHVzZSBoZXJlLCBpbnN0ZWFkIG9mIGluIHRoZSBBcHBSb3V0ZXIgY2xhc3MsXG4gICAgIyBzbyBob3BlZnVsbHksIG9ubHkgb25lIGFwcGxldCBoYW5kbGVzIHRoZSBcImVtcHR5IHJvdXRlLlxuICAgIGlmIEBvcHRpb25zPy5pc0Zyb250ZG9vckFwcGxldFxuICAgICAgbWV0aG9kID0gQG9wdGlvbnMuYXBwQ29uZmlnPy5zdGFydEZyb250ZG9vck1ldGhvZCBvciAnc3RhcnQnXG4gICAgICB1bmxlc3MgJycgaW4gT2JqZWN0LmtleXMgQHJvdXRlci5hcHBSb3V0ZXNcbiAgICAgICAgaWYgX19ERVZfX1xuICAgICAgICAgIGNvbnNvbGUud2FybiBcIkFkZGluZyBzdGFydCB0byBUa0FwcGxldFwiXG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgJycsIG1ldGhvZFxuICAgIEBfZXh0cmFSb3V0ZXJzID0ge31cbiAgICBAaW5pdEV4dHJhUm91dGVycygpXG4gIG9uU3RvcDogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIlN0b3BwaW5nIFRrQXBwbGV0XCIsIEAuaXNSdW5uaW5nKClcbiAgc2V0RXh0cmFSb3V0ZXI6IChuYW1lLCByb3V0ZXJDbGFzcywgY29udHJvbGxlckNsYXNzKSAtPlxuICAgIGMgPSBuZXcgY29udHJvbGxlckNsYXNzXG4gICAgciA9IG5ldyByb3V0ZXJDbGFzc1xuICAgICAgY29udHJvbGxlcjogY1xuICAgIEBfZXh0cmFSb3V0ZXJzW25hbWVdID0gclxuICBpbml0RXh0cmFSb3V0ZXJzOiAtPlxuICAgIGV4dHJhUm91dGVycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBleFJ0cnMgPSBAZ2V0T3B0aW9uICdleHRyYVJvdXRlcnMnXG4gICAgZm9yIHJ0ciBvZiBleHRyYVJvdXRlcnNcbiAgICAgIHJvcHRzID0gZXh0cmFSb3V0ZXJzW3J0cl1cbiAgICAgIGNvbnNvbGUubG9nIFwicnRyXCIsIHJ0ciwgcm9wdHNcbiAgICAgIEBzZXRFeHRyYVJvdXRlciBydHIsIHJvcHRzWydyb3V0ZXInXSwgcm9wdHNbJ2NvbnRyb2xsZXInXVxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcImV4dHJhIHJvdXRlciAje3J0cn0gY3JlYXRlZFwiXG4gIGdldEV4dHJhUm91dGVyOiAobmFtZSkgLT5cbiAgICBAX2V4dHJhUm91dGVyc1tuYW1lXVxuICAgIFxuICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IFRrQXBwbGV0XG4iXX0=
