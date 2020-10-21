/**
* @license
* MarionetteJS (Marionette.AppRouter)
* ----------------------------------
* v1.0.1
*
* Copyright (c)2018 Derick Bailey, Muted Solutions, LLC.
* Distributed under MIT license
*
* http://marionettejs.com
 */
var AppRouter, ClassOptions, ObjectAPI;

import _ from 'lodash';

import {
  Router
} from 'backbone';

import {
  MnObject
} from 'backbone.marionette';

// App Router
// ----------
// Reduce the boilerplate code of handling route events
// and then calling a single method on another object,
// called a controller.
// Have your routers configured to call the method on
// your controller, directly.

// Configure an AppRouter with `appRoutes`.

// App routers can only take one `controller` object.
// It is recommended that you divide your controller
// objects in to smaller pieces of related functionality
// and have multiple routers / controllers, instead of
// just one giant router and controller.

// You can also add standard routes to an AppRouter.
// API borrowed from Marionette.Object
ObjectAPI = ['triggerMethod', 'normalizeMethods', '_setOptions', 'mergeOptions', 'getOption', 'bindEvents', 'unbindEvents'];

ClassOptions = ['appRoutes', 'controller'];

AppRouter = Router.extend({
  constructor: function(options) {
    var appRoutes, controller;
    this._setOptions(options);
    this.mergeOptions(options, ClassOptions);
    Router.apply(this, arguments);
    appRoutes = this.appRoutes;
    controller = this._getController();
    this.processAppRoutes(controller, appRoutes);
    this.on('route', this._processOnRoute, this);
  },
  // Similar to route method on a Backbone Router but
  // method is called on the controller
  appRoute: function(route, methodName) {
    var controller;
    controller = this._getController();
    this._addAppRoute(controller, route, methodName);
    return this;
  },
  // process the route event and trigger the onRoute
  // method call, if it exists
  _processOnRoute: function(routeName, routeArgs) {
    var routePath;
    // make sure an onRoute before trying to call it
    if (_.isFunction(this.onRoute)) {
      // find the path that matches the current route
      routePath = _.invert(this.appRoutes)[routeName];
      this.onRoute(routeName, routePath, routeArgs);
    }
  },
  // Internal method to process the `appRoutes` for the
  // router, and turn them in to routes that trigger the
  // specified method on the specified `controller`.
  processAppRoutes: function(controller, appRoutes) {
    var routeNames;
    if (!appRoutes) {
      return this;
    }
    routeNames = _.keys(appRoutes).reverse();
    // Backbone requires reverted order of routes
    _.each(routeNames, (route) => {
      this._addAppRoute(controller, route, appRoutes[route]);
    });
    return this;
  },
  _getController: function() {
    return this.controller;
  },
  _addAppRoute: function(controller, route, methodName) {
    var method;
    method = controller[methodName];
    if (!method) {
      throw new Error(`Method ${methodName} was not found on the controller`);
    }
    this.route(route, methodName, _.bind(method, controller));
  }
});

_.extend(AppRouter.prototype, _.pick(MnObject.prototype, ObjectAPI));

export default AppRouter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVycy9hcHByb3V0ZXIuanMiLCJzb3VyY2VzIjpbInJvdXRlcnMvYXBwcm91dGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVRzs7Ozs7Ozs7Ozs7QUFBQSxJQUFBLFNBQUEsRUFBQSxZQUFBLEVBQUE7O0FBRUgsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxRQUFUO0NBQUEsTUFBQSxzQkFKRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkgsU0FBQSxHQUFZLENBQ1YsZUFEVSxFQUVWLGtCQUZVLEVBR1YsYUFIVSxFQUlWLGNBSlUsRUFLVixXQUxVLEVBTVYsWUFOVSxFQU9WLGNBUFU7O0FBU1osWUFBQSxHQUFlLENBQ2IsV0FEYSxFQUViLFlBRmE7O0FBS2YsU0FBQSxHQUFZLE1BQU0sQ0FBQyxNQUFQLENBQ1Y7RUFBQSxXQUFBLEVBQWEsUUFBQSxDQUFDLE9BQUQsQ0FBQTtBQUNmLFFBQUEsU0FBQSxFQUFBO0lBQUksSUFBQyxDQUFBLFdBQUQsQ0FBYSxPQUFiO0lBQ0EsSUFBQyxDQUFBLFlBQUQsQ0FBYyxPQUFkLEVBQXVCLFlBQXZCO0lBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBYSxJQUFiLEVBQW1CLFNBQW5CO0lBQ0EsU0FBQSxHQUFZLElBQUMsQ0FBQTtJQUNiLFVBQUEsR0FBYSxJQUFDLENBQUEsY0FBRCxDQUFBO0lBQ2IsSUFBQyxDQUFBLGdCQUFELENBQWtCLFVBQWxCLEVBQThCLFNBQTlCO0lBQ0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxPQUFKLEVBQWEsSUFBQyxDQUFBLGVBQWQsRUFBK0IsSUFBL0I7RUFQVyxDQUFiOzs7RUFXQSxRQUFBLEVBQVUsUUFBQSxDQUFDLEtBQUQsRUFBUSxVQUFSLENBQUE7QUFDWixRQUFBO0lBQUksVUFBQSxHQUFhLElBQUMsQ0FBQSxjQUFELENBQUE7SUFDYixJQUFDLENBQUEsWUFBRCxDQUFjLFVBQWQsRUFBMEIsS0FBMUIsRUFBaUMsVUFBakM7QUFDQSxXQUFPO0VBSEMsQ0FYVjs7O0VBaUJBLGVBQUEsRUFBaUIsUUFBQSxDQUFDLFNBQUQsRUFBWSxTQUFaLENBQUE7QUFDbkIsUUFBQSxTQUFBOztJQUNJLElBQUcsQ0FBQyxDQUFDLFVBQUYsQ0FBYSxJQUFDLENBQUEsT0FBZCxDQUFIOztNQUVFLFNBQUEsR0FBWSxDQUFDLENBQUMsTUFBRixDQUFTLElBQUMsQ0FBQSxTQUFWLENBQW9CLENBQUMsU0FBRDtNQUNoQyxJQUFDLENBQUEsT0FBRCxDQUFTLFNBQVQsRUFBb0IsU0FBcEIsRUFBK0IsU0FBL0IsRUFIRjs7RUFGZSxDQWpCakI7Ozs7RUEyQkEsZ0JBQUEsRUFBa0IsUUFBQSxDQUFDLFVBQUQsRUFBYSxTQUFiLENBQUE7QUFDcEIsUUFBQTtJQUFJLElBQUcsQ0FBQyxTQUFKO0FBQ0UsYUFBTyxLQURUOztJQUVBLFVBQUEsR0FBYSxDQUFDLENBQUMsSUFBRixDQUFPLFNBQVAsQ0FBaUIsQ0FBQyxPQUFsQixDQUFBLEVBRmpCOztJQUlJLENBQUMsQ0FBQyxJQUFGLENBQU8sVUFBUCxFQUFtQixDQUFDLEtBQUQsQ0FBQSxHQUFBO01BQ2pCLElBQUMsQ0FBQSxZQUFELENBQWMsVUFBZCxFQUEwQixLQUExQixFQUFpQyxTQUFTLENBQUMsS0FBRCxDQUExQztJQURpQixDQUFuQjtBQUdBLFdBQU87RUFSUyxDQTNCbEI7RUFvQ0EsY0FBQSxFQUFnQixRQUFBLENBQUEsQ0FBQTtBQUNkLFdBQU8sSUFBQyxDQUFBO0VBRE0sQ0FwQ2hCO0VBc0NBLFlBQUEsRUFBYyxRQUFBLENBQUMsVUFBRCxFQUFhLEtBQWIsRUFBb0IsVUFBcEIsQ0FBQTtBQUNoQixRQUFBO0lBQUksTUFBQSxHQUFTLFVBQVUsQ0FBQyxVQUFEO0lBQ25CLElBQUcsQ0FBQyxNQUFKO01BQ0UsTUFBTSxJQUFJLEtBQUosQ0FBVSxDQUFBLE9BQUEsQ0FBQSxDQUFVLFVBQVYsQ0FBQSxnQ0FBQSxDQUFWLEVBRFI7O0lBRUEsSUFBQyxDQUFBLEtBQUQsQ0FBTyxLQUFQLEVBQWMsVUFBZCxFQUEwQixDQUFDLENBQUMsSUFBRixDQUFPLE1BQVAsRUFBZSxVQUFmLENBQTFCO0VBSlk7QUF0Q2QsQ0FEVTs7QUErQ1osQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFTLENBQUMsU0FBbkIsRUFBOEIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxRQUFRLENBQUMsU0FBaEIsRUFBMkIsU0FBM0IsQ0FBOUI7O0FBRUEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiIyMjKlxuKiBAbGljZW5zZVxuKiBNYXJpb25ldHRlSlMgKE1hcmlvbmV0dGUuQXBwUm91dGVyKVxuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qIHYxLjAuMVxuKlxuKiBDb3B5cmlnaHQgKGMpMjAxOCBEZXJpY2sgQmFpbGV5LCBNdXRlZCBTb2x1dGlvbnMsIExMQy5cbiogRGlzdHJpYnV0ZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbipcbiogaHR0cDovL21hcmlvbmV0dGVqcy5jb21cbiMjI1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IE1uT2JqZWN0IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuIyBBcHAgUm91dGVyXG4jIC0tLS0tLS0tLS1cbiMgUmVkdWNlIHRoZSBib2lsZXJwbGF0ZSBjb2RlIG9mIGhhbmRsaW5nIHJvdXRlIGV2ZW50c1xuIyBhbmQgdGhlbiBjYWxsaW5nIGEgc2luZ2xlIG1ldGhvZCBvbiBhbm90aGVyIG9iamVjdCxcbiMgY2FsbGVkIGEgY29udHJvbGxlci5cbiMgSGF2ZSB5b3VyIHJvdXRlcnMgY29uZmlndXJlZCB0byBjYWxsIHRoZSBtZXRob2Qgb25cbiMgeW91ciBjb250cm9sbGVyLCBkaXJlY3RseS5cbiNcbiMgQ29uZmlndXJlIGFuIEFwcFJvdXRlciB3aXRoIGBhcHBSb3V0ZXNgLlxuI1xuIyBBcHAgcm91dGVycyBjYW4gb25seSB0YWtlIG9uZSBgY29udHJvbGxlcmAgb2JqZWN0LlxuIyBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSBkaXZpZGUgeW91ciBjb250cm9sbGVyXG4jIG9iamVjdHMgaW4gdG8gc21hbGxlciBwaWVjZXMgb2YgcmVsYXRlZCBmdW5jdGlvbmFsaXR5XG4jIGFuZCBoYXZlIG11bHRpcGxlIHJvdXRlcnMgLyBjb250cm9sbGVycywgaW5zdGVhZCBvZlxuIyBqdXN0IG9uZSBnaWFudCByb3V0ZXIgYW5kIGNvbnRyb2xsZXIuXG4jXG4jIFlvdSBjYW4gYWxzbyBhZGQgc3RhbmRhcmQgcm91dGVzIHRvIGFuIEFwcFJvdXRlci5cbiMgQVBJIGJvcnJvd2VkIGZyb20gTWFyaW9uZXR0ZS5PYmplY3Rcbk9iamVjdEFQSSA9IFtcbiAgJ3RyaWdnZXJNZXRob2QnXG4gICdub3JtYWxpemVNZXRob2RzJ1xuICAnX3NldE9wdGlvbnMnXG4gICdtZXJnZU9wdGlvbnMnXG4gICdnZXRPcHRpb24nXG4gICdiaW5kRXZlbnRzJ1xuICAndW5iaW5kRXZlbnRzJ1xuXVxuQ2xhc3NPcHRpb25zID0gW1xuICAnYXBwUm91dGVzJ1xuICAnY29udHJvbGxlcidcbl1cblxuQXBwUm91dGVyID0gUm91dGVyLmV4dGVuZFxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG4gICAgQF9zZXRPcHRpb25zIG9wdGlvbnNcbiAgICBAbWVyZ2VPcHRpb25zIG9wdGlvbnMsIENsYXNzT3B0aW9uc1xuICAgIFJvdXRlci5hcHBseSB0aGlzLCBhcmd1bWVudHNcbiAgICBhcHBSb3V0ZXMgPSBAYXBwUm91dGVzXG4gICAgY29udHJvbGxlciA9IEBfZ2V0Q29udHJvbGxlcigpXG4gICAgQHByb2Nlc3NBcHBSb3V0ZXMgY29udHJvbGxlciwgYXBwUm91dGVzXG4gICAgQG9uICdyb3V0ZScsIEBfcHJvY2Vzc09uUm91dGUsIHRoaXNcbiAgICByZXR1cm5cbiAgIyBTaW1pbGFyIHRvIHJvdXRlIG1ldGhvZCBvbiBhIEJhY2tib25lIFJvdXRlciBidXRcbiAgIyBtZXRob2QgaXMgY2FsbGVkIG9uIHRoZSBjb250cm9sbGVyXG4gIGFwcFJvdXRlOiAocm91dGUsIG1ldGhvZE5hbWUpIC0+XG4gICAgY29udHJvbGxlciA9IEBfZ2V0Q29udHJvbGxlcigpXG4gICAgQF9hZGRBcHBSb3V0ZSBjb250cm9sbGVyLCByb3V0ZSwgbWV0aG9kTmFtZVxuICAgIHJldHVybiBAXG4gICMgcHJvY2VzcyB0aGUgcm91dGUgZXZlbnQgYW5kIHRyaWdnZXIgdGhlIG9uUm91dGVcbiAgIyBtZXRob2QgY2FsbCwgaWYgaXQgZXhpc3RzXG4gIF9wcm9jZXNzT25Sb3V0ZTogKHJvdXRlTmFtZSwgcm91dGVBcmdzKSAtPlxuICAgICMgbWFrZSBzdXJlIGFuIG9uUm91dGUgYmVmb3JlIHRyeWluZyB0byBjYWxsIGl0XG4gICAgaWYgXy5pc0Z1bmN0aW9uKEBvblJvdXRlKVxuICAgICAgIyBmaW5kIHRoZSBwYXRoIHRoYXQgbWF0Y2hlcyB0aGUgY3VycmVudCByb3V0ZVxuICAgICAgcm91dGVQYXRoID0gXy5pbnZlcnQoQGFwcFJvdXRlcylbcm91dGVOYW1lXVxuICAgICAgQG9uUm91dGUgcm91dGVOYW1lLCByb3V0ZVBhdGgsIHJvdXRlQXJnc1xuICAgIHJldHVyblxuICAjIEludGVybmFsIG1ldGhvZCB0byBwcm9jZXNzIHRoZSBgYXBwUm91dGVzYCBmb3IgdGhlXG4gICMgcm91dGVyLCBhbmQgdHVybiB0aGVtIGluIHRvIHJvdXRlcyB0aGF0IHRyaWdnZXIgdGhlXG4gICMgc3BlY2lmaWVkIG1ldGhvZCBvbiB0aGUgc3BlY2lmaWVkIGBjb250cm9sbGVyYC5cbiAgcHJvY2Vzc0FwcFJvdXRlczogKGNvbnRyb2xsZXIsIGFwcFJvdXRlcykgLT5cbiAgICBpZiAhYXBwUm91dGVzXG4gICAgICByZXR1cm4gdGhpc1xuICAgIHJvdXRlTmFtZXMgPSBfLmtleXMoYXBwUm91dGVzKS5yZXZlcnNlKClcbiAgICAjIEJhY2tib25lIHJlcXVpcmVzIHJldmVydGVkIG9yZGVyIG9mIHJvdXRlc1xuICAgIF8uZWFjaCByb3V0ZU5hbWVzLCAocm91dGUpID0+XG4gICAgICBAX2FkZEFwcFJvdXRlIGNvbnRyb2xsZXIsIHJvdXRlLCBhcHBSb3V0ZXNbcm91dGVdXG4gICAgICByZXR1cm5cbiAgICByZXR1cm4gQFxuICBfZ2V0Q29udHJvbGxlcjogLT5cbiAgICByZXR1cm4gQGNvbnRyb2xsZXJcbiAgX2FkZEFwcFJvdXRlOiAoY29udHJvbGxlciwgcm91dGUsIG1ldGhvZE5hbWUpIC0+XG4gICAgbWV0aG9kID0gY29udHJvbGxlclttZXRob2ROYW1lXVxuICAgIGlmICFtZXRob2RcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCAje21ldGhvZE5hbWV9IHdhcyBub3QgZm91bmQgb24gdGhlIGNvbnRyb2xsZXJcIilcbiAgICBAcm91dGUgcm91dGUsIG1ldGhvZE5hbWUsIF8uYmluZChtZXRob2QsIGNvbnRyb2xsZXIpXG4gICAgcmV0dXJuXG5cblxuXy5leHRlbmQgQXBwUm91dGVyLnByb3RvdHlwZSwgXy5waWNrKE1uT2JqZWN0LnByb3RvdHlwZSwgT2JqZWN0QVBJKVxuXG5leHBvcnQgZGVmYXVsdCBBcHBSb3V0ZXJcbiJdfQ==
