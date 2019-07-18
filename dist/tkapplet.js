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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUEsUUFBQTtFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVYsV0FBTixNQUFBLFNBQUEsUUFBdUIsT0FBTyxDQUFDLElBQS9CO0VBQ0Usa0JBQW9CLENBQUEsQ0FBQTtBQUNsQixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxRQUFyQztJQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxhQUFKO01BQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsYUFBYixFQURGOztJQUVBLFdBQUEsR0FBYyxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxNQUFyQztXQUNkLFdBQVcsQ0FBQyxLQUFaLENBQUE7RUFOa0I7O0VBT3BCLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxJQUFDLENBQUEsa0JBQUQsQ0FBQTtJQUNBLFVBQUEsR0FBYSxJQUFJLElBQUMsQ0FBQSxVQUFMLENBQ1g7TUFBQSxXQUFBLEVBQWEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFhLENBQUM7SUFBM0IsQ0FEVztJQUViLFVBQVUsQ0FBQyxNQUFYLEdBQW9CO0lBQ3BCLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBSSxJQUFDLENBQUEsTUFBTCxDQUNSO01BQUEsVUFBQSxFQUFZLFVBQVo7TUFDQSxXQUFBLEVBQWEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFhLENBQUM7SUFEM0IsQ0FEUTtJQUdWLG1CQUFHLElBQUMsQ0FBRSxrQkFBTjtNQUNFLFNBQUEsMkNBQVksSUFBQyxDQUFBLHFCQUFELElBQWlCLElBQUMsQ0FBQTtNQUM5QixNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVosQ0FBc0IsQ0FBQyxPQUF2QixDQUErQixDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQzdCLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFvQixTQUFVLENBQUEsQ0FBQSxDQUE5QjtNQUQ2QixDQUEvQixFQUZGO0tBUEE7Ozs7SUFjQSxzQ0FBVyxDQUFFLDBCQUFiO01BQ0UsTUFBQSxrREFBMkIsQ0FBRSw4QkFBcEIsSUFBNEM7TUFDckQsSUFBTyxhQUFNLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFwQixDQUFOLEVBQUEsRUFBQSxLQUFQO1FBQ0UsSUFBRyxPQUFIO1VBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYSwwQkFBYixFQURGOztRQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixFQUFqQixFQUFxQixNQUFyQixFQUhGO09BRkY7O0lBTUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsQ0FBQTtJQUNqQixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDLEtBQWQsQ0FBb0IsWUFBcEIsRUFBa0MsQ0FBQSxDQUFBLEdBQUE7QUFDaEMsYUFBTztJQUR5QixDQUFsQztFQXZCYTs7RUF5QmYsTUFBUSxDQUFBLENBQUE7SUFDTixJQUFHLE9BQUg7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FBakMsRUFERjs7RUFETTs7RUFHUixjQUFnQixDQUFDLElBQUQsRUFBTyxXQUFQLEVBQW9CLGVBQXBCLENBQUE7QUFDZCxRQUFBLENBQUEsRUFBQTtJQUFBLENBQUEsR0FBSSxJQUFJO0lBQ1IsQ0FBQSxHQUFJLElBQUksV0FBSixDQUNGO01BQUEsVUFBQSxFQUFZO0lBQVosQ0FERTtXQUVKLElBQUMsQ0FBQSxhQUFjLENBQUEsSUFBQSxDQUFmLEdBQXVCO0VBSlQ7O0VBS2hCLGdCQUFrQixDQUFBLENBQUE7QUFDaEIsUUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7SUFBQSxZQUFBLEdBQWUsSUFBQyxDQUFBLFNBQUQsQ0FBVyxjQUFYO0lBQ2YsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQVcsY0FBWDtBQUNUO0lBQUEsS0FBQSxtQkFBQTtNQUNFLEtBQUEsR0FBUSxZQUFhLENBQUEsR0FBQTtNQUNyQixPQUFPLENBQUMsR0FBUixDQUFZLEtBQVosRUFBbUIsR0FBbkIsRUFBd0IsS0FBeEI7TUFDQSxJQUFDLENBQUEsY0FBRCxDQUFnQixHQUFoQixFQUFxQixLQUFNLENBQUEsUUFBQSxDQUEzQixFQUFzQyxLQUFNLENBQUEsWUFBQSxDQUE1QztNQUNBLElBQUcsT0FBSDtxQkFDRSxPQUFPLENBQUMsR0FBUixDQUFZLENBQUEsYUFBQSxDQUFBLENBQWdCLEdBQWhCLENBQW9CLFFBQXBCLENBQVosR0FERjtPQUFBLE1BQUE7NkJBQUE7O0lBSkYsQ0FBQTs7RUFIZ0I7O0VBU2xCLGNBQWdCLENBQUMsSUFBRCxDQUFBO0FBQ2QsV0FBTyxJQUFDLENBQUEsYUFBYyxDQUFBLElBQUE7RUFEUjs7RUFFaEIsYUFBZSxDQUFBLENBQUE7QUFDYixXQUFPLElBQUMsQ0FBQSxNQUFNLENBQUM7RUFERjs7QUFwRGpCOztBQXdEQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgVG9vbGtpdCBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTmF2YmFyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ25hdmJhcidcblxuY2xhc3MgVGtBcHBsZXQgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBzZXR1cEFwcGxldEVudHJpZXM6IC0+XG4gICAgZW50cmllcyA9IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnYXBwbGV0J1xuICAgIGVudHJpZXMucmVzZXQoKVxuICAgIGlmIEBhcHBsZXRFbnRyaWVzXG4gICAgICBlbnRyaWVzLnNldCBAYXBwbGV0RW50cmllc1xuICAgIHZpZXdFbnRyaWVzID0gTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICd2aWV3J1xuICAgIHZpZXdFbnRyaWVzLnJlc2V0KClcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBAc2V0dXBBcHBsZXRFbnRyaWVzKClcbiAgICBjb250cm9sbGVyID0gbmV3IEBDb250cm9sbGVyXG4gICAgICBjaGFubmVsTmFtZTogQGdldENoYW5uZWwoKS5jaGFubmVsTmFtZVxuICAgIGNvbnRyb2xsZXIuYXBwbGV0ID0gQFxuICAgIEByb3V0ZXIgPSBuZXcgQFJvdXRlclxuICAgICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICAgICAgY2hhbm5lbE5hbWU6IEBnZXRDaGFubmVsKCkuY2hhbm5lbE5hbWVcbiAgICBpZiBAPy5hcHBSb3V0ZXNcbiAgICAgIGFwcFJvdXRlcyA9IEBhcHBSb3V0ZXM/KCkgb3IgQGFwcFJvdXRlc1xuICAgICAgT2JqZWN0LmtleXMoYXBwUm91dGVzKS5mb3JFYWNoIChyKSA9PlxuICAgICAgICBAcm91dGVyLmFwcFJvdXRlIHIsIGFwcFJvdXRlc1tyXVxuICAgICMgd2Ugd2FudCB0byBhZGp1c3QgdGhlIGFwcHJvdXRlciBmb3IgZnJvbnRkb29yXG4gICAgIyB1c2UgaGVyZSwgaW5zdGVhZCBvZiBpbiB0aGUgQXBwUm91dGVyIGNsYXNzLFxuICAgICMgc28gaG9wZWZ1bGx5LCBvbmx5IG9uZSBhcHBsZXQgaGFuZGxlcyB0aGUgXCJlbXB0eSByb3V0ZS5cbiAgICBpZiBAb3B0aW9ucz8uaXNGcm9udGRvb3JBcHBsZXRcbiAgICAgIG1ldGhvZCA9IEBvcHRpb25zLmFwcENvbmZpZz8uc3RhcnRGcm9udGRvb3JNZXRob2Qgb3IgJ3N0YXJ0J1xuICAgICAgdW5sZXNzICcnIGluIE9iamVjdC5rZXlzIEByb3V0ZXIuYXBwUm91dGVzXG4gICAgICAgIGlmIF9fREVWX19cbiAgICAgICAgICBjb25zb2xlLndhcm4gXCJBZGRpbmcgc3RhcnQgdG8gVGtBcHBsZXRcIlxuICAgICAgICBAcm91dGVyLmFwcFJvdXRlICcnLCBtZXRob2RcbiAgICBAX2V4dHJhUm91dGVycyA9IHt9XG4gICAgQGluaXRFeHRyYVJvdXRlcnMoKVxuICAgIEBnZXRDaGFubmVsKCkucmVwbHkgJ2dldC1hcHBsZXQnLCA9PlxuICAgICAgcmV0dXJuIEBcbiAgb25TdG9wOiAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiU3RvcHBpbmcgVGtBcHBsZXRcIiwgQC5pc1J1bm5pbmcoKVxuICBzZXRFeHRyYVJvdXRlcjogKG5hbWUsIHJvdXRlckNsYXNzLCBjb250cm9sbGVyQ2xhc3MpIC0+XG4gICAgYyA9IG5ldyBjb250cm9sbGVyQ2xhc3NcbiAgICByID0gbmV3IHJvdXRlckNsYXNzXG4gICAgICBjb250cm9sbGVyOiBjXG4gICAgQF9leHRyYVJvdXRlcnNbbmFtZV0gPSByXG4gIGluaXRFeHRyYVJvdXRlcnM6IC0+XG4gICAgZXh0cmFSb3V0ZXJzID0gQGdldE9wdGlvbiAnZXh0cmFSb3V0ZXJzJ1xuICAgIGV4UnRycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBmb3IgcnRyIG9mIGV4dHJhUm91dGVyc1xuICAgICAgcm9wdHMgPSBleHRyYVJvdXRlcnNbcnRyXVxuICAgICAgY29uc29sZS5sb2cgXCJydHJcIiwgcnRyLCByb3B0c1xuICAgICAgQHNldEV4dHJhUm91dGVyIHJ0ciwgcm9wdHNbJ3JvdXRlciddLCByb3B0c1snY29udHJvbGxlciddXG4gICAgICBpZiBfX0RFVl9fXG4gICAgICAgIGNvbnNvbGUubG9nIFwiZXh0cmEgcm91dGVyICN7cnRyfSBjcmVhdGVkXCJcbiAgZ2V0RXh0cmFSb3V0ZXI6IChuYW1lKSAtPlxuICAgIHJldHVybiBAX2V4dHJhUm91dGVyc1tuYW1lXVxuICBnZXRDb250cm9sbGVyOiAtPlxuICAgIHJldHVybiBAcm91dGVyLmNvbnRyb2xsZXJcbiAgICBcbiAgICAgIFxuZXhwb3J0IGRlZmF1bHQgVGtBcHBsZXRcblxuIl19
