//# from backbone.routefilter
var nop, originalRoute;

import _ from 'lodash';

import {
  Router
} from 'backbone';

// Save a reference to the original route method to be called
// after we pave it over.
originalRoute = Router.prototype.route;

// Create a reusable no operation func for the case where a before
// or after filter is not set. Backbone or Underscore should have
// a global one of these in my opinion.
nop = function() {};

// Extend the router prototype with a default before function,
// a default after function, and a pave over of _bindRoutes.
_.extend(Router.prototype, {
  before: nop,
  after: nop,
  route: function(route, name, callback) {
    var wrappedCallback;
    if (!callback) {
      callback = this[name];
    }
    // Create a new callback to replace the original callback that calls
    // the before and after filters as well as the original callback
    // internally.
    wrappedCallback = _.bind((function() {
      var afterCallback, beforeCallback, callbackArgs;
      // Call the before filter and if it returns false, run the
      // route's original callback, and after filter. This allows
      // the user to return false from within the before filter
      // to prevent the original route callback and after
      // filter from running.
      callbackArgs = [route, _.toArray(arguments)];
      beforeCallback = void 0;
      if (_.isFunction(this.before)) {
        // If the before filter is just a single function, then call
        // it with the arguments.
        beforeCallback = this.before;
      } else if (typeof this.before[route] !== 'undefined') {
        // otherwise, find the appropriate callback for the route name
        // and call that.
        beforeCallback = this.before[route];
      } else {
        // otherwise, if we have a hash of routes, but no before callback
        // for this route, just use a nop function.
        beforeCallback = nop;
      }
      // If the before callback fails during its execusion (by returning)
      // false, then do not proceed with the route triggering.
      if (beforeCallback.apply(this, callbackArgs) === false) {
        return;
      }
      // If the callback exists, then call it. This means that the before
      // and after filters will be called whether or not an actual
      // callback function is supplied to handle a given route.
      if (callback) {
        callback.apply(this, arguments);
      }
      afterCallback = void 0;
      if (_.isFunction(this.after)) {
        // If the after filter is a single funciton, then call it with
        // the proper arguments.
        afterCallback = this.after;
      } else if (typeof this.after[route] !== 'undefined') {
        // otherwise if we have a hash of routes, call the appropriate
        // callback based on the route name.
        afterCallback = this.after[route];
      } else {
        // otherwise, if we have a has of routes but no after callback
        // for this route, just use the nop function.
        afterCallback = nop;
      }
      // Call the after filter.
      afterCallback.apply(this, callbackArgs);
    }), this);
    // Call our original route, replacing the callback that was originally
    // passed in when Backbone.Router.route was invoked with our wrapped
    // callback that calls the before and after callbacks as well as the
    // original callback.
    return originalRoute.call(this, route, name, wrappedCallback);
  }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVycy9maWx0ZXJlZC1yb3V0ZXIuanMiLCJzb3VyY2VzIjpbInJvdXRlcnMvZmlsdGVyZWQtcm91dGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBNEI7QUFBQSxJQUFBLEdBQUEsRUFBQTs7QUFDNUIsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBLFdBRjRCOzs7O0FBTTVCLGFBQUEsR0FBZ0IsTUFBTSxDQUFBLFNBQUUsQ0FBQSxNQU5JOzs7OztBQVc1QixHQUFBLEdBQU0sUUFBQSxDQUFBLENBQUEsRUFBQSxFQVhzQjs7OztBQWU1QixDQUFDLENBQUMsTUFBRixDQUFTLE1BQU0sQ0FBQyxTQUFoQixFQUNFO0VBQUEsTUFBQSxFQUFRLEdBQVI7RUFDQSxLQUFBLEVBQU8sR0FEUDtFQUVBLEtBQUEsRUFBTyxRQUFBLENBQUMsS0FBRCxFQUFRLElBQVIsRUFBYyxRQUFkLENBQUE7QUFDVCxRQUFBO0lBT0ksSUFBRyxDQUFDLFFBQUo7TUFDRSxRQUFBLEdBQVcsSUFBQyxDQUFDLElBQUQsRUFEZDtLQVBKOzs7O0lBWUksZUFBQSxHQUFrQixDQUFDLENBQUMsSUFBRixDQUFPLENBQUMsUUFBQSxDQUFBLENBQUE7QUFDOUIsVUFBQSxhQUFBLEVBQUEsY0FBQSxFQUFBLFlBQUE7Ozs7OztNQUtNLFlBQUEsR0FBZSxDQUNiLEtBRGEsRUFFYixDQUFDLENBQUMsT0FBRixDQUFVLFNBQVYsQ0FGYTtNQUlmLGNBQUEsR0FBaUI7TUFDakIsSUFBRyxDQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxNQUFkLENBQUg7OztRQUdFLGNBQUEsR0FBaUIsSUFBQyxDQUFBLE9BSHBCO09BQUEsTUFJSyxJQUFHLE9BQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFELENBQWQsS0FBeUIsV0FBNUI7OztRQUdILGNBQUEsR0FBaUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFELEVBSHJCO09BQUEsTUFBQTs7O1FBT0gsY0FBQSxHQUFpQixJQVBkO09BZFg7OztNQXdCTSxJQUFHLGNBQWMsQ0FBQyxLQUFmLENBQXFCLElBQXJCLEVBQTJCLFlBQTNCLENBQUEsS0FBNEMsS0FBL0M7QUFDRSxlQURGO09BeEJOOzs7O01BNkJNLElBQUcsUUFBSDtRQUNFLFFBQVEsQ0FBQyxLQUFULENBQWUsSUFBZixFQUFxQixTQUFyQixFQURGOztNQUVBLGFBQUEsR0FBZ0I7TUFDaEIsSUFBRyxDQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxLQUFkLENBQUg7OztRQUdFLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLE1BSG5CO09BQUEsTUFJSyxJQUFHLE9BQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFELENBQWIsS0FBd0IsV0FBM0I7OztRQUdILGFBQUEsR0FBZ0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFELEVBSG5CO09BQUEsTUFBQTs7O1FBT0gsYUFBQSxHQUFnQixJQVBiO09BcENYOztNQTZDTSxhQUFhLENBQUMsS0FBZCxDQUFvQixJQUFwQixFQUEwQixZQUExQjtJQTlDd0IsQ0FBRCxDQUFQLEVBZ0RmLElBaERlLEVBWnRCOzs7OztXQWlFSSxhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFuQixFQUF5QixLQUF6QixFQUFnQyxJQUFoQyxFQUFzQyxlQUF0QztFQWxFSztBQUZQLENBREYiLCJzb3VyY2VzQ29udGVudCI6WyIjIyBmcm9tIGJhY2tib25lLnJvdXRlZmlsdGVyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdiYWNrYm9uZSdcblxuIyBTYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCByb3V0ZSBtZXRob2QgdG8gYmUgY2FsbGVkXG4jIGFmdGVyIHdlIHBhdmUgaXQgb3Zlci5cbm9yaWdpbmFsUm91dGUgPSBSb3V0ZXI6OnJvdXRlXG4jIENyZWF0ZSBhIHJldXNhYmxlIG5vIG9wZXJhdGlvbiBmdW5jIGZvciB0aGUgY2FzZSB3aGVyZSBhIGJlZm9yZVxuIyBvciBhZnRlciBmaWx0ZXIgaXMgbm90IHNldC4gQmFja2JvbmUgb3IgVW5kZXJzY29yZSBzaG91bGQgaGF2ZVxuIyBhIGdsb2JhbCBvbmUgb2YgdGhlc2UgaW4gbXkgb3Bpbmlvbi5cblxubm9wID0gLT5cblxuIyBFeHRlbmQgdGhlIHJvdXRlciBwcm90b3R5cGUgd2l0aCBhIGRlZmF1bHQgYmVmb3JlIGZ1bmN0aW9uLFxuIyBhIGRlZmF1bHQgYWZ0ZXIgZnVuY3Rpb24sIGFuZCBhIHBhdmUgb3ZlciBvZiBfYmluZFJvdXRlcy5cbl8uZXh0ZW5kIFJvdXRlci5wcm90b3R5cGUsXG4gIGJlZm9yZTogbm9wXG4gIGFmdGVyOiBub3BcbiAgcm91dGU6IChyb3V0ZSwgbmFtZSwgY2FsbGJhY2spIC0+XG4gICAgIyBJZiB0aGVyZSBpcyBubyBjYWxsYmFjayBwcmVzZW50IGZvciB0aGlzIHJvdXRlLCB0aGVuIHNldCBpdCB0b1xuICAgICMgYmUgdGhlIG5hbWUgdGhhdCB3YXMgc2V0IGluIHRoZSByb3V0ZXMgcHJvcGVydHkgb2YgdGhlIGNvbnN0cnVjdG9yLFxuICAgICMgb3IgdGhlIG5hbWUgYXJndWVtZW50IG9mIHRoZSByb3V0ZSBtZXRob2QgaW52b2NhdGlvbi4gVGhpcyBpcyB3aGF0XG4gICAgIyBCYWNrYm9uZS5Sb3V0ZXIucm91dGUgYWxyZWFkeSBkb2VzLiBXZSBuZWVkIHRvIGRvIGl0IGFnYWluLFxuICAgICMgYmVjYXVzZSB3ZSBhcmUgYWJvdXQgdG8gd3JhcCB0aGUgY2FsbGJhY2sgaW4gYSBmdW5jdGlvbiB0aGF0IGNhbGxzXG4gICAgIyB0aGUgYmVmb3JlIGFuZCBhZnRlciBmaWx0ZXJzIGFzIHdlbGwgYXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrIHRoYXRcbiAgICAjIHdhcyBwYXNzZWQgaW4uXG4gICAgaWYgIWNhbGxiYWNrXG4gICAgICBjYWxsYmFjayA9IEBbbmFtZV1cbiAgICAjIENyZWF0ZSBhIG5ldyBjYWxsYmFjayB0byByZXBsYWNlIHRoZSBvcmlnaW5hbCBjYWxsYmFjayB0aGF0IGNhbGxzXG4gICAgIyB0aGUgYmVmb3JlIGFuZCBhZnRlciBmaWx0ZXJzIGFzIHdlbGwgYXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrXG4gICAgIyBpbnRlcm5hbGx5LlxuICAgIHdyYXBwZWRDYWxsYmFjayA9IF8uYmluZCgoLT5cbiAgICAgICMgQ2FsbCB0aGUgYmVmb3JlIGZpbHRlciBhbmQgaWYgaXQgcmV0dXJucyBmYWxzZSwgcnVuIHRoZVxuICAgICAgIyByb3V0ZSdzIG9yaWdpbmFsIGNhbGxiYWNrLCBhbmQgYWZ0ZXIgZmlsdGVyLiBUaGlzIGFsbG93c1xuICAgICAgIyB0aGUgdXNlciB0byByZXR1cm4gZmFsc2UgZnJvbSB3aXRoaW4gdGhlIGJlZm9yZSBmaWx0ZXJcbiAgICAgICMgdG8gcHJldmVudCB0aGUgb3JpZ2luYWwgcm91dGUgY2FsbGJhY2sgYW5kIGFmdGVyXG4gICAgICAjIGZpbHRlciBmcm9tIHJ1bm5pbmcuXG4gICAgICBjYWxsYmFja0FyZ3MgPSBbXG4gICAgICAgIHJvdXRlXG4gICAgICAgIF8udG9BcnJheShhcmd1bWVudHMpXG4gICAgICBdXG4gICAgICBiZWZvcmVDYWxsYmFjayA9IHVuZGVmaW5lZFxuICAgICAgaWYgXy5pc0Z1bmN0aW9uKEBiZWZvcmUpXG4gICAgICAgICMgSWYgdGhlIGJlZm9yZSBmaWx0ZXIgaXMganVzdCBhIHNpbmdsZSBmdW5jdGlvbiwgdGhlbiBjYWxsXG4gICAgICAgICMgaXQgd2l0aCB0aGUgYXJndW1lbnRzLlxuICAgICAgICBiZWZvcmVDYWxsYmFjayA9IEBiZWZvcmVcbiAgICAgIGVsc2UgaWYgdHlwZW9mIEBiZWZvcmVbcm91dGVdICE9ICd1bmRlZmluZWQnXG4gICAgICAgICMgb3RoZXJ3aXNlLCBmaW5kIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFjayBmb3IgdGhlIHJvdXRlIG5hbWVcbiAgICAgICAgIyBhbmQgY2FsbCB0aGF0LlxuICAgICAgICBiZWZvcmVDYWxsYmFjayA9IEBiZWZvcmVbcm91dGVdXG4gICAgICBlbHNlXG4gICAgICAgICMgb3RoZXJ3aXNlLCBpZiB3ZSBoYXZlIGEgaGFzaCBvZiByb3V0ZXMsIGJ1dCBubyBiZWZvcmUgY2FsbGJhY2tcbiAgICAgICAgIyBmb3IgdGhpcyByb3V0ZSwganVzdCB1c2UgYSBub3AgZnVuY3Rpb24uXG4gICAgICAgIGJlZm9yZUNhbGxiYWNrID0gbm9wXG4gICAgICAjIElmIHRoZSBiZWZvcmUgY2FsbGJhY2sgZmFpbHMgZHVyaW5nIGl0cyBleGVjdXNpb24gKGJ5IHJldHVybmluZylcbiAgICAgICMgZmFsc2UsIHRoZW4gZG8gbm90IHByb2NlZWQgd2l0aCB0aGUgcm91dGUgdHJpZ2dlcmluZy5cbiAgICAgIGlmIGJlZm9yZUNhbGxiYWNrLmFwcGx5KHRoaXMsIGNhbGxiYWNrQXJncykgPT0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICAjIElmIHRoZSBjYWxsYmFjayBleGlzdHMsIHRoZW4gY2FsbCBpdC4gVGhpcyBtZWFucyB0aGF0IHRoZSBiZWZvcmVcbiAgICAgICMgYW5kIGFmdGVyIGZpbHRlcnMgd2lsbCBiZSBjYWxsZWQgd2hldGhlciBvciBub3QgYW4gYWN0dWFsXG4gICAgICAjIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIHN1cHBsaWVkIHRvIGhhbmRsZSBhIGdpdmVuIHJvdXRlLlxuICAgICAgaWYgY2FsbGJhY2tcbiAgICAgICAgY2FsbGJhY2suYXBwbHkgdGhpcywgYXJndW1lbnRzXG4gICAgICBhZnRlckNhbGxiYWNrID0gdW5kZWZpbmVkXG4gICAgICBpZiBfLmlzRnVuY3Rpb24oQGFmdGVyKVxuICAgICAgICAjIElmIHRoZSBhZnRlciBmaWx0ZXIgaXMgYSBzaW5nbGUgZnVuY2l0b24sIHRoZW4gY2FsbCBpdCB3aXRoXG4gICAgICAgICMgdGhlIHByb3BlciBhcmd1bWVudHMuXG4gICAgICAgIGFmdGVyQ2FsbGJhY2sgPSBAYWZ0ZXJcbiAgICAgIGVsc2UgaWYgdHlwZW9mIEBhZnRlcltyb3V0ZV0gIT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgIyBvdGhlcndpc2UgaWYgd2UgaGF2ZSBhIGhhc2ggb2Ygcm91dGVzLCBjYWxsIHRoZSBhcHByb3ByaWF0ZVxuICAgICAgICAjIGNhbGxiYWNrIGJhc2VkIG9uIHRoZSByb3V0ZSBuYW1lLlxuICAgICAgICBhZnRlckNhbGxiYWNrID0gQGFmdGVyW3JvdXRlXVxuICAgICAgZWxzZVxuICAgICAgICAjIG90aGVyd2lzZSwgaWYgd2UgaGF2ZSBhIGhhcyBvZiByb3V0ZXMgYnV0IG5vIGFmdGVyIGNhbGxiYWNrXG4gICAgICAgICMgZm9yIHRoaXMgcm91dGUsIGp1c3QgdXNlIHRoZSBub3AgZnVuY3Rpb24uXG4gICAgICAgIGFmdGVyQ2FsbGJhY2sgPSBub3BcbiAgICAgICMgQ2FsbCB0aGUgYWZ0ZXIgZmlsdGVyLlxuICAgICAgYWZ0ZXJDYWxsYmFjay5hcHBseSB0aGlzLCBjYWxsYmFja0FyZ3NcbiAgICAgIHJldHVyblxuICAgICksIHRoaXMpXG4gICAgIyBDYWxsIG91ciBvcmlnaW5hbCByb3V0ZSwgcmVwbGFjaW5nIHRoZSBjYWxsYmFjayB0aGF0IHdhcyBvcmlnaW5hbGx5XG4gICAgIyBwYXNzZWQgaW4gd2hlbiBCYWNrYm9uZS5Sb3V0ZXIucm91dGUgd2FzIGludm9rZWQgd2l0aCBvdXIgd3JhcHBlZFxuICAgICMgY2FsbGJhY2sgdGhhdCBjYWxscyB0aGUgYmVmb3JlIGFuZCBhZnRlciBjYWxsYmFja3MgYXMgd2VsbCBhcyB0aGVcbiAgICAjIG9yaWdpbmFsIGNhbGxiYWNrLlxuICAgIG9yaWdpbmFsUm91dGUuY2FsbCB0aGlzLCByb3V0ZSwgbmFtZSwgd3JhcHBlZENhbGxiYWNrXG4iXX0=
