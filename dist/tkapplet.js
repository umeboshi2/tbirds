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

};

export default TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUEsUUFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVYsV0FBTixNQUFBLFNBQUEsUUFBdUIsT0FBTyxDQUFDLElBQS9CO0VBQ0Usa0JBQW9CLENBQUEsQ0FBQTtBQUNsQixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxRQUFyQztJQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxhQUFKO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsYUFBYixFQURGOztJQUVBLFdBQUEsR0FBYyxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxNQUFyQztXQUNkLFdBQVcsQ0FBQyxLQUFaLENBQUE7RUFOa0I7O0VBT3BCLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQUNBLFVBQUEsR0FBYSxJQUFJLElBQUMsQ0FBQTtJQUNsQixVQUFVLENBQUMsTUFBWCxHQUFvQjtJQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBQyxDQUFBLE1BQUwsQ0FDUjtNQUFBLFVBQUEsRUFBWTtJQUFaLENBRFE7SUFFVixtQkFBRyxJQUFDLENBQUUsa0JBQU47TUFDRSxTQUFBLDJDQUFZLElBQUMsQ0FBQSxxQkFBRCxJQUFpQixJQUFDLENBQUE7TUFDOUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLENBQXNCLENBQUMsT0FBdkIsQ0FBK0IsQ0FBQyxDQUFELENBQUEsR0FBQTtlQUM3QixJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsU0FBVSxDQUFBLENBQUEsQ0FBOUI7TUFENkIsQ0FBL0IsRUFGRjtLQUxBOzs7O0lBWUEsc0NBQVcsQ0FBRSwwQkFBYjtNQUNFLE1BQUEsa0RBQTJCLENBQUUsOEJBQXBCLElBQTRDO01BQ3JELElBQU8sYUFBTSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBcEIsQ0FBTixFQUFBLEVBQUEsS0FBUDtRQUNFLElBQUcsT0FBSDtVQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsMEJBQWIsRUFERjs7UUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsRUFBakIsRUFBcUIsTUFBckIsRUFIRjtPQUZGOztJQU1BLElBQUMsQ0FBQSxhQUFELEdBQWlCLENBQUE7V0FDakIsSUFBQyxDQUFBLGdCQUFELENBQUE7RUFwQmE7O0VBcUJmLE1BQVEsQ0FBQSxDQUFBO0lBQ04sSUFBRyxPQUFIO2FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFDLENBQUMsU0FBRixDQUFBLENBQWpDLEVBREY7O0VBRE07O0VBR1IsY0FBZ0IsQ0FBQyxJQUFELEVBQU8sV0FBUCxFQUFvQixlQUFwQixDQUFBO0FBQ2QsUUFBQSxDQUFBLEVBQUE7SUFBQSxDQUFBLEdBQUksSUFBSTtJQUNSLENBQUEsR0FBSSxJQUFJLFdBQUosQ0FDRjtNQUFBLFVBQUEsRUFBWTtJQUFaLENBREU7V0FFSixJQUFDLENBQUEsYUFBYyxDQUFBLElBQUEsQ0FBZixHQUF1QjtFQUpUOztFQUtoQixnQkFBa0IsQ0FBQSxDQUFBO0FBQ2hCLFFBQUEsTUFBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBO0lBQUEsWUFBQSxHQUFlLElBQUMsQ0FBQSxTQUFELENBQVcsY0FBWDtJQUNmLE1BQUEsR0FBUyxJQUFDLENBQUEsU0FBRCxDQUFXLGNBQVg7QUFDVDtJQUFBLEtBQUEsbUJBQUE7TUFDRSxLQUFBLEdBQVEsWUFBYSxDQUFBLEdBQUE7TUFDckIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCO01BQ0EsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsR0FBaEIsRUFBcUIsS0FBTSxDQUFBLFFBQUEsQ0FBM0IsRUFBc0MsS0FBTSxDQUFBLFlBQUEsQ0FBNUM7TUFDQSxJQUFHLE9BQUg7cUJBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFBLGFBQUEsQ0FBQSxDQUFnQixHQUFoQixDQUFvQixRQUFwQixDQUFaLEdBREY7T0FBQSxNQUFBOzZCQUFBOztJQUpGLENBQUE7O0VBSGdCOztFQVNsQixjQUFnQixDQUFDLElBQUQsQ0FBQTtXQUNkLElBQUMsQ0FBQSxhQUFjLENBQUEsSUFBQTtFQUREOztBQTlDbEI7O0FBa0RBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5OYXZiYXJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbmF2YmFyJ1xuXG5jbGFzcyBUa0FwcGxldCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIHNldHVwQXBwbGV0RW50cmllczogLT5cbiAgICBlbnRyaWVzID0gTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdhcHBsZXQnXG4gICAgZW50cmllcy5yZXNldCgpXG4gICAgaWYgQGFwcGxldEVudHJpZXNcbiAgICAgIGVudHJpZXMuc2V0IEBhcHBsZXRFbnRyaWVzXG4gICAgdmlld0VudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ3ZpZXcnXG4gICAgdmlld0VudHJpZXMucmVzZXQoKVxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIEBzZXR1cEFwcGxldEVudHJpZXMoKVxuICAgIGNvbnRyb2xsZXIgPSBuZXcgQENvbnRyb2xsZXJcbiAgICBjb250cm9sbGVyLmFwcGxldCA9IEBcbiAgICBAcm91dGVyID0gbmV3IEBSb3V0ZXJcbiAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgICBpZiBAPy5hcHBSb3V0ZXNcbiAgICAgIGFwcFJvdXRlcyA9IEBhcHBSb3V0ZXM/KCkgb3IgQGFwcFJvdXRlc1xuICAgICAgT2JqZWN0LmtleXMoYXBwUm91dGVzKS5mb3JFYWNoIChyKSA9PlxuICAgICAgICBAcm91dGVyLmFwcFJvdXRlIHIsIGFwcFJvdXRlc1tyXVxuICAgICMgd2Ugd2FudCB0byBhZGp1c3QgdGhlIGFwcHJvdXRlciBmb3IgZnJvbnRkb29yXG4gICAgIyB1c2UgaGVyZSwgaW5zdGVhZCBvZiBpbiB0aGUgQXBwUm91dGVyIGNsYXNzLFxuICAgICMgc28gaG9wZWZ1bGx5LCBvbmx5IG9uZSBhcHBsZXQgaGFuZGxlcyB0aGUgXCJlbXB0eSByb3V0ZS5cbiAgICBpZiBAb3B0aW9ucz8uaXNGcm9udGRvb3JBcHBsZXRcbiAgICAgIG1ldGhvZCA9IEBvcHRpb25zLmFwcENvbmZpZz8uc3RhcnRGcm9udGRvb3JNZXRob2Qgb3IgJ3N0YXJ0J1xuICAgICAgdW5sZXNzICcnIGluIE9iamVjdC5rZXlzIEByb3V0ZXIuYXBwUm91dGVzXG4gICAgICAgIGlmIF9fREVWX19cbiAgICAgICAgICBjb25zb2xlLndhcm4gXCJBZGRpbmcgc3RhcnQgdG8gVGtBcHBsZXRcIlxuICAgICAgICBAcm91dGVyLmFwcFJvdXRlICcnLCBtZXRob2RcbiAgICBAX2V4dHJhUm91dGVycyA9IHt9XG4gICAgQGluaXRFeHRyYVJvdXRlcnMoKVxuICBvblN0b3A6IC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJTdG9wcGluZyBUa0FwcGxldFwiLCBALmlzUnVubmluZygpXG4gIHNldEV4dHJhUm91dGVyOiAobmFtZSwgcm91dGVyQ2xhc3MsIGNvbnRyb2xsZXJDbGFzcykgLT5cbiAgICBjID0gbmV3IGNvbnRyb2xsZXJDbGFzc1xuICAgIHIgPSBuZXcgcm91dGVyQ2xhc3NcbiAgICAgIGNvbnRyb2xsZXI6IGNcbiAgICBAX2V4dHJhUm91dGVyc1tuYW1lXSA9IHJcbiAgaW5pdEV4dHJhUm91dGVyczogLT5cbiAgICBleHRyYVJvdXRlcnMgPSBAZ2V0T3B0aW9uICdleHRyYVJvdXRlcnMnXG4gICAgZXhSdHJzID0gQGdldE9wdGlvbiAnZXh0cmFSb3V0ZXJzJ1xuICAgIGZvciBydHIgb2YgZXh0cmFSb3V0ZXJzXG4gICAgICByb3B0cyA9IGV4dHJhUm91dGVyc1tydHJdXG4gICAgICBjb25zb2xlLmxvZyBcInJ0clwiLCBydHIsIHJvcHRzXG4gICAgICBAc2V0RXh0cmFSb3V0ZXIgcnRyLCByb3B0c1sncm91dGVyJ10sIHJvcHRzWydjb250cm9sbGVyJ11cbiAgICAgIGlmIF9fREVWX19cbiAgICAgICAgY29uc29sZS5sb2cgXCJleHRyYSByb3V0ZXIgI3tydHJ9IGNyZWF0ZWRcIlxuICBnZXRFeHRyYVJvdXRlcjogKG5hbWUpIC0+XG4gICAgQF9leHRyYVJvdXRlcnNbbmFtZV1cbiAgICBcbiAgICAgIFxuZXhwb3J0IGRlZmF1bHQgVGtBcHBsZXRcblxuIl19
