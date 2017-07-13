var MainChannel, Marionette, TkApplet, Toolkit,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

MainChannel = Backbone.Radio.channel('global');

TkApplet = (function(superClass) {
  extend(TkApplet, superClass);

  function TkApplet() {
    return TkApplet.__super__.constructor.apply(this, arguments);
  }

  TkApplet.prototype.onBeforeStart = function() {
    var appRoutes, controller, method, ref, ref1;
    controller = new this.Controller;
    controller.applet = this;
    this.router = new this.Router({
      controller: controller
    });
    if (this != null ? this.appRoutes : void 0) {
      appRoutes = (typeof this.appRoutes === "function" ? this.appRoutes() : void 0) || this.appRoutes;
      Object.keys(appRoutes).forEach((function(_this) {
        return function(r) {
          return _this.router.appRoute(r, appRoutes[r]);
        };
      })(this));
    }
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
  };

  TkApplet.prototype.onStop = function() {
    if (__DEV__) {
      return console.log("Stopping TkApplet", this.isRunning());
    }
  };

  TkApplet.prototype.setExtraRouter = function(name, routerClass, controllerClass) {
    var c, r;
    c = new controllerClass;
    r = new routerClass({
      controller: c
    });
    return this._extraRouters[name] = r;
  };

  TkApplet.prototype.initExtraRouters = function() {
    var exRtrs, extraRouters, results, ropts, rtr;
    extraRouters = this.getOption('extraRouters');
    exRtrs = this.getOption('extraRouters');
    results = [];
    for (rtr in extraRouters) {
      ropts = extraRouters[rtr];
      console.log("rtr", rtr, ropts);
      this.setExtraRouter(rtr, ropts['router'], ropts['controller']);
      if (__DEV__) {
        results.push(console.log("extra router " + rtr + " created"));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  TkApplet.prototype.getExtraRouter = function(name) {
    return this._extraRouters[name];
  };

  return TkApplet;

})(Toolkit.App);

module.exports = TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBDQUFBO0VBQUE7Ozs7QUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLE9BQUEsR0FBVSxPQUFBLENBQVEsb0JBQVI7O0FBRVYsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjs7Ozs7OztxQkFDSixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxVQUFBLEdBQWEsSUFBSSxJQUFDLENBQUE7SUFDbEIsVUFBVSxDQUFDLE1BQVgsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLElBQUMsQ0FBQSxNQUFMLENBQ1I7TUFBQSxVQUFBLEVBQVksVUFBWjtLQURRO0lBRVYsbUJBQUcsSUFBQyxDQUFFLGtCQUFOO01BQ0UsU0FBQSwyQ0FBWSxJQUFDLENBQUEscUJBQUQsSUFBaUIsSUFBQyxDQUFBO01BQzlCLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQUFzQixDQUFDLE9BQXZCLENBQStCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxDQUFEO2lCQUM3QixLQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsU0FBVSxDQUFBLENBQUEsQ0FBOUI7UUFENkI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9CLEVBRkY7O0lBT0Esc0NBQVcsQ0FBRSwwQkFBYjtNQUNFLE1BQUEsa0RBQTJCLENBQUUsOEJBQXBCLElBQTRDO01BQ3JELElBQU8sYUFBTSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBcEIsQ0FBTixFQUFBLEVBQUEsS0FBUDtRQUNFLElBQUcsT0FBSDtVQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsMEJBQWIsRUFERjs7UUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsRUFBakIsRUFBcUIsTUFBckIsRUFIRjtPQUZGOztJQU1BLElBQUMsQ0FBQSxhQUFELEdBQWlCO1dBQ2pCLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0VBbkJhOztxQkFvQmYsTUFBQSxHQUFRLFNBQUE7SUFDTixJQUFHLE9BQUg7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FBakMsRUFERjs7RUFETTs7cUJBR1IsY0FBQSxHQUFnQixTQUFDLElBQUQsRUFBTyxXQUFQLEVBQW9CLGVBQXBCO0FBQ2QsUUFBQTtJQUFBLENBQUEsR0FBSSxJQUFJO0lBQ1IsQ0FBQSxHQUFJLElBQUksV0FBSixDQUNGO01BQUEsVUFBQSxFQUFZLENBQVo7S0FERTtXQUVKLElBQUMsQ0FBQSxhQUFjLENBQUEsSUFBQSxDQUFmLEdBQXVCO0VBSlQ7O3FCQUtoQixnQkFBQSxHQUFrQixTQUFBO0FBQ2hCLFFBQUE7SUFBQSxZQUFBLEdBQWUsSUFBQyxDQUFBLFNBQUQsQ0FBVyxjQUFYO0lBQ2YsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQVcsY0FBWDtBQUNUO1NBQUEsbUJBQUE7TUFDRSxLQUFBLEdBQVEsWUFBYSxDQUFBLEdBQUE7TUFDckIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEtBQXhCO01BQ0EsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsR0FBaEIsRUFBcUIsS0FBTSxDQUFBLFFBQUEsQ0FBM0IsRUFBc0MsS0FBTSxDQUFBLFlBQUEsQ0FBNUM7TUFDQSxJQUFHLE9BQUg7cUJBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFBLEdBQWdCLEdBQWhCLEdBQW9CLFVBQWhDLEdBREY7T0FBQSxNQUFBOzZCQUFBOztBQUpGOztFQUhnQjs7cUJBU2xCLGNBQUEsR0FBZ0IsU0FBQyxJQUFEO1dBQ2QsSUFBQyxDQUFBLGFBQWMsQ0FBQSxJQUFBO0VBREQ7Ozs7R0F0Q0ssT0FBTyxDQUFDOztBQTBDL0IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBUa0FwcGxldCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgY29udHJvbGxlciA9IG5ldyBAQ29udHJvbGxlclxuICAgIGNvbnRyb2xsZXIuYXBwbGV0ID0gQFxuICAgIEByb3V0ZXIgPSBuZXcgQFJvdXRlclxuICAgICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICAgIGlmIEA/LmFwcFJvdXRlc1xuICAgICAgYXBwUm91dGVzID0gQGFwcFJvdXRlcz8oKSBvciBAYXBwUm91dGVzXG4gICAgICBPYmplY3Qua2V5cyhhcHBSb3V0ZXMpLmZvckVhY2ggKHIpID0+XG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgciwgYXBwUm91dGVzW3JdXG4gICAgIyB3ZSB3YW50IHRvIGFkanVzdCB0aGUgYXBwcm91dGVyIGZvciBmcm9udGRvb3JcbiAgICAjIHVzZSBoZXJlLCBpbnN0ZWFkIG9mIGluIHRoZSBBcHBSb3V0ZXIgY2xhc3MsXG4gICAgIyBzbyBob3BlZnVsbHksIG9ubHkgb25lIGFwcGxldCBoYW5kbGVzIHRoZSBcImVtcHR5IHJvdXRlLlxuICAgIGlmIEBvcHRpb25zPy5pc0Zyb250ZG9vckFwcGxldFxuICAgICAgbWV0aG9kID0gQG9wdGlvbnMuYXBwQ29uZmlnPy5zdGFydEZyb250ZG9vck1ldGhvZCBvciAnc3RhcnQnXG4gICAgICB1bmxlc3MgJycgaW4gT2JqZWN0LmtleXMgQHJvdXRlci5hcHBSb3V0ZXNcbiAgICAgICAgaWYgX19ERVZfX1xuICAgICAgICAgIGNvbnNvbGUud2FybiBcIkFkZGluZyBzdGFydCB0byBUa0FwcGxldFwiXG4gICAgICAgIEByb3V0ZXIuYXBwUm91dGUgJycsIG1ldGhvZFxuICAgIEBfZXh0cmFSb3V0ZXJzID0ge31cbiAgICBAaW5pdEV4dHJhUm91dGVycygpXG4gIG9uU3RvcDogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcIlN0b3BwaW5nIFRrQXBwbGV0XCIsIEAuaXNSdW5uaW5nKClcbiAgc2V0RXh0cmFSb3V0ZXI6IChuYW1lLCByb3V0ZXJDbGFzcywgY29udHJvbGxlckNsYXNzKSAtPlxuICAgIGMgPSBuZXcgY29udHJvbGxlckNsYXNzXG4gICAgciA9IG5ldyByb3V0ZXJDbGFzc1xuICAgICAgY29udHJvbGxlcjogY1xuICAgIEBfZXh0cmFSb3V0ZXJzW25hbWVdID0gclxuICBpbml0RXh0cmFSb3V0ZXJzOiAtPlxuICAgIGV4dHJhUm91dGVycyA9IEBnZXRPcHRpb24gJ2V4dHJhUm91dGVycydcbiAgICBleFJ0cnMgPSBAZ2V0T3B0aW9uICdleHRyYVJvdXRlcnMnXG4gICAgZm9yIHJ0ciBvZiBleHRyYVJvdXRlcnNcbiAgICAgIHJvcHRzID0gZXh0cmFSb3V0ZXJzW3J0cl1cbiAgICAgIGNvbnNvbGUubG9nIFwicnRyXCIsIHJ0ciwgcm9wdHNcbiAgICAgIEBzZXRFeHRyYVJvdXRlciBydHIsIHJvcHRzWydyb3V0ZXInXSwgcm9wdHNbJ2NvbnRyb2xsZXInXVxuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcImV4dHJhIHJvdXRlciAje3J0cn0gY3JlYXRlZFwiXG4gIGdldEV4dHJhUm91dGVyOiAobmFtZSkgLT5cbiAgICBAX2V4dHJhUm91dGVyc1tuYW1lXVxuICAgIFxuICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IFRrQXBwbGV0XG4iXX0=
