var Backbone, BaseAppModel, example_applet_menu_entry,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

BaseAppModel = (function(superClass) {
  extend(BaseAppModel, superClass);

  function BaseAppModel() {
    return BaseAppModel.__super__.constructor.apply(this, arguments);
  }

  BaseAppModel.prototype.defaults = {
    apiRoot: '/api/dev',
    brand: {
      name: 'Brand',
      url: '/'
    },
    frontdoor_app: 'frontdoor',
    userprofile_app: 'userprofile',
    hasUser: false,
    needUser: false,
    applets: [],
    applet_menus: [],
    appRegion: 'body',
    appView: null,
    navbarView: null,
    container: 'container',
    regions: {},
    routes: []
  };

  return BaseAppModel;

})(Backbone.Model);

example_applet_menu_entry = {
  label: 'Applets',
  applets: ['foo', 'bar', 'another'],
  single_applet: false,
  url: '/this/is/used/if/applets/is/empty/for/plain/link'
};

module.exports = BaseAppModel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbW9kZWwuanMiLCJzb3VyY2VzIjpbImFwcG1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGlEQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFHTDs7Ozs7Ozt5QkFDSixRQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVMsVUFBVDtJQUNBLEtBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxPQUFOO01BQ0EsR0FBQSxFQUFLLEdBREw7S0FGRjtJQU1BLGFBQUEsRUFBZSxXQU5mO0lBT0EsZUFBQSxFQUFpQixhQVBqQjtJQVFBLE9BQUEsRUFBUyxLQVJUO0lBU0EsUUFBQSxFQUFVLEtBVFY7SUFXQSxPQUFBLEVBQVMsRUFYVDtJQWVBLFlBQUEsRUFBYyxFQWZkO0lBa0JBLFNBQUEsRUFBVyxNQWxCWDtJQXVCQSxPQUFBLEVBQVMsSUF2QlQ7SUEwQkEsVUFBQSxFQUFZLElBMUJaO0lBOEJBLFNBQUEsRUFBVyxXQTlCWDtJQWlDQSxPQUFBLEVBQVMsRUFqQ1Q7SUFrQ0EsTUFBQSxFQUFRLEVBbENSOzs7OztHQUZ1QixRQUFRLENBQUM7O0FBd0NwQyx5QkFBQSxHQUNFO0VBQUEsS0FBQSxFQUFPLFNBQVA7RUFJQSxPQUFBLEVBQVMsQ0FBRSxLQUFGLEVBQVMsS0FBVCxFQUFnQixTQUFoQixDQUpUO0VBU0EsYUFBQSxFQUFlLEtBVGY7RUFZQSxHQUFBLEVBQUssa0RBWkw7OztBQWVGLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcblxuXG5jbGFzcyBCYXNlQXBwTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICBhcGlSb290OiAnL2FwaS9kZXYnXG4gICAgYnJhbmQ6XG4gICAgICBuYW1lOiAnQnJhbmQnXG4gICAgICB1cmw6ICcvJ1xuICAgICMgRklYTUUgZnJvbnRkb29yX2FwcCBoYXMgdG8gYmUgc3RhdGljYWxseSByZXF1aXJlZCBpblxuICAgICMgYXBwbGljYXRpb24uY29mZmVlXG4gICAgZnJvbnRkb29yX2FwcDogJ2Zyb250ZG9vcidcbiAgICB1c2VycHJvZmlsZV9hcHA6ICd1c2VycHJvZmlsZSdcbiAgICBoYXNVc2VyOiBmYWxzZVxuICAgIG5lZWRVc2VyOiBmYWxzZVxuICAgIFxuICAgIGFwcGxldHM6IFtdXG4gICAgIyBhcHBsZXRfbWVudXMgaXMgYSBwcm9wZXJ0eSB0aGF0IHByb3ZpZGVzIHRoZSBhYmlsaXR5XG4gICAgIyB0byBvcmdhbml6ZSB0aGUgYXBwbGV0cyBpbiBkcm9wZG93biBtZW51cyBvbiB0aGVcbiAgICAjIG5hdmJhci5cbiAgICBhcHBsZXRfbWVudXM6IFtdXG5cbiAgICAjIHRoaXMgaXMgdGhlIHJlZ2lvbiBmb3IgdGhlIG1haW4gdmlld1xuICAgIGFwcFJlZ2lvbjogJ2JvZHknXG5cbiAgICAjIHRoaXMgaXMgZm9yIGEgY3VzdG9tIHJvb3QgdmlldyBjbGFzc1xuICAgICMgaXQgc2hvdWxkIGhhdmUgdGhlc2UgcmVnaW9uczpcbiAgICAjIG5hdmJhciwgbWVzc2FnZXMsIG1vZGFsLCBhbmQgYXBwbGV0XG4gICAgYXBwVmlldzogbnVsbFxuXG4gICAgIyB0aGlzIGlzIGZvciBhIGN1c3RvbSBuYXZiYXIgdmlldyBjbGFzc1xuICAgIG5hdmJhclZpZXc6IG51bGxcblxuICAgICMgRklYTUUsIEknbSBzdGlsbCB1c2luZyB0aGlzIGZvciB0aGUgbmF2YmFyXG4gICAgIyBidXQgbm90IGZvciBtYWluIGxheW91dC5cbiAgICBjb250YWluZXI6ICdjb250YWluZXInXG4gICAgXG4gICAgIyBGSVhNRSByZWdpb25zIGFuZCByb3V0ZXMgYXJlIG5vdCB1c2VkXG4gICAgcmVnaW9uczoge31cbiAgICByb3V0ZXM6IFtdXG5cblxuXG5leGFtcGxlX2FwcGxldF9tZW51X2VudHJ5ID1cbiAgbGFiZWw6ICdBcHBsZXRzJ1xuICAjIFRoZSBhcHBsZXRzIGFycmF5IGlzIGEgbGlzdCBvZiBhcHBuYW1lc1xuICAjIGRlc2NyaWJlZCBpbiB0aGUgYXBwbGV0cyBhcnJheSBvZiB0aGVcbiAgIyBhcHAgbW9kZWwuXG4gIGFwcGxldHM6IFsgJ2ZvbycsICdiYXInLCAnYW5vdGhlciddXG4gICMgSWYgYXBwbGV0cyBpcyBlbXB0eSwgdGhlbiBjaGVjayBpZlxuICAjIHRoZSBuYXYgZW50cnkgaXMgYSBzaW5nbGUgYXBwbGV0LlxuICAjIFNldCB0aGlzIHRvIHRoZSBuYW1lIG9mIGFuIGFwcGxldFxuICAjIGZvciBhIHNpbmdsZSBhcHBsZXQgZW50cnkuXG4gIHNpbmdsZV9hcHBsZXQ6IGZhbHNlXG4gICMgaWYgc2luZ2xlX2FwcGxldCBpcyBmYWxzZSwgdGhlbiB1c2VcbiAgIyBhIHNpbXBsZSBuYXZiYXIgbGluay5cbiAgdXJsOiAnL3RoaXMvaXMvdXNlZC9pZi9hcHBsZXRzL2lzL2VtcHR5L2Zvci9wbGFpbi9saW5rJ1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUFwcE1vZGVsXG4gIFxuIl19
