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
        return this.router.appRoute('', method);
      }
    }
  };

  TkApplet.prototype.onStop = function() {
    return console.log("Stopping TkApplet", this.isRunning());
  };

  return TkApplet;

})(Toolkit.App);

module.exports = TkApplet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGthcHBsZXQuanMiLCJzb3VyY2VzIjpbInRrYXBwbGV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBDQUFBO0VBQUE7Ozs7QUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLE9BQUEsR0FBVSxPQUFBLENBQVEsb0JBQVI7O0FBRVYsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjs7Ozs7OztxQkFDSixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxVQUFBLEdBQWEsSUFBSSxJQUFDLENBQUE7SUFDbEIsVUFBVSxDQUFDLE1BQVgsR0FBb0I7SUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLElBQUMsQ0FBQSxNQUFMLENBQ1I7TUFBQSxVQUFBLEVBQVksVUFBWjtLQURRO0lBRVYsbUJBQUcsSUFBQyxDQUFFLGtCQUFOO01BQ0UsU0FBQSwyQ0FBWSxJQUFDLENBQUEscUJBQUQsSUFBaUIsSUFBQyxDQUFBO01BQzlCLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQUFzQixDQUFDLE9BQXZCLENBQStCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxDQUFEO2lCQUM3QixLQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsU0FBVSxDQUFBLENBQUEsQ0FBOUI7UUFENkI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9CLEVBRkY7O0lBT0Esc0NBQVcsQ0FBRSwwQkFBYjtNQUNFLE1BQUEsa0RBQTJCLENBQUUsOEJBQXBCLElBQTRDO01BQ3JELElBQU8sYUFBTSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBcEIsQ0FBTixFQUFBLEVBQUEsS0FBUDtRQUNFLElBQUcsT0FBSDtVQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsMEJBQWIsRUFERjs7ZUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsRUFBakIsRUFBcUIsTUFBckIsRUFIRjtPQUZGOztFQVphOztxQkFtQmYsTUFBQSxHQUFRLFNBQUE7V0FDTixPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLElBQUMsQ0FBQyxTQUFGLENBQUEsQ0FBakM7RUFETTs7OztHQXBCYSxPQUFPLENBQUM7O0FBMEIvQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuVG9vbGtpdCA9IHJlcXVpcmUgJ21hcmlvbmV0dGUudG9vbGtpdCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIFRrQXBwbGV0IGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBjb250cm9sbGVyID0gbmV3IEBDb250cm9sbGVyXG4gICAgY29udHJvbGxlci5hcHBsZXQgPSBAXG4gICAgQHJvdXRlciA9IG5ldyBAUm91dGVyXG4gICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gICAgaWYgQD8uYXBwUm91dGVzXG4gICAgICBhcHBSb3V0ZXMgPSBAYXBwUm91dGVzPygpIG9yIEBhcHBSb3V0ZXNcbiAgICAgIE9iamVjdC5rZXlzKGFwcFJvdXRlcykuZm9yRWFjaCAocikgPT5cbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSByLCBhcHBSb3V0ZXNbcl1cbiAgICAjIHdlIHdhbnQgdG8gYWRqdXN0IHRoZSBhcHByb3V0ZXIgZm9yIGZyb250ZG9vclxuICAgICMgdXNlIGhlcmUsIGluc3RlYWQgb2YgaW4gdGhlIEFwcFJvdXRlciBjbGFzcyxcbiAgICAjIHNvIGhvcGVmdWxseSwgb25seSBvbmUgYXBwbGV0IGhhbmRsZXMgdGhlIFwiZW1wdHkgcm91dGUuXG4gICAgaWYgQG9wdGlvbnM/LmlzRnJvbnRkb29yQXBwbGV0XG4gICAgICBtZXRob2QgPSBAb3B0aW9ucy5hcHBDb25maWc/LnN0YXJ0RnJvbnRkb29yTWV0aG9kIG9yICdzdGFydCdcbiAgICAgIHVubGVzcyAnJyBpbiBPYmplY3Qua2V5cyBAcm91dGVyLmFwcFJvdXRlc1xuICAgICAgICBpZiBfX0RFVl9fXG4gICAgICAgICAgY29uc29sZS53YXJuIFwiQWRkaW5nIHN0YXJ0IHRvIFRrQXBwbGV0XCJcbiAgICAgICAgQHJvdXRlci5hcHBSb3V0ZSAnJywgbWV0aG9kXG4gICAgI0Bpbml0RXh0cmFSb3V0ZXJzKClcbiAgb25TdG9wOiAtPlxuICAgIGNvbnNvbGUubG9nIFwiU3RvcHBpbmcgVGtBcHBsZXRcIiwgQC5pc1J1bm5pbmcoKVxuICAjaW5pdEV4dHJhUm91dGVyczogLT5cbiAgIyAgY29uc29sZS5sb2cgJ2luaXRFeHRyYVJvdXRlcnMnXG4gICAgXG4gICAgICBcbm1vZHVsZS5leHBvcnRzID0gVGtBcHBsZXRcbiJdfQ==
