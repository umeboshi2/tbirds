var MainPageLayout;

MainPageLayout = require('./tklayout');

module.exports = {
  // This is the html element to attach
  // the app.  This is to be marionette Region
  appRegion: 'body',
  // This is a marionette view with regions
  layout: MainPageLayout,
  // here you can set options to be passed
  // to the layout
  layoutOptions: {},
  // set this to false if you don't need
  // messages
  useMessages: true,
  // set useNavbar to false to skip
  // using a navbar in the app
  useNavbar: true,
  // this is the brand entry for the navbar
  brand: {
    label: 'TBirds',
    url: '#'
  },
  // applet to be used for frontdoor
  frontdoorApplet: 'frontdoor',
  // Does the application have a user?
  // If this is true, a userMenuApp must be set
  // to a toolkit App
  hasUser: false,
  // If there is a user, provide a user menu app
  userMenuApp: void 0,
  
  // if needLogin is true, frontdoorApplet should
  // provide a #frontdoor/login route which will
  // be displayed by default
  needLogin: false,
  // the url for login
  loginUrl: '/#frontdoor/login',
  guestUserName: 'Guest',
  
  // navbar entries is an array of objects
  navbarEntries: [],
  // appletRoutes lets you place
  // the applet name as a property
  // with the applet directory name
  // as a value.  The AppRouter should
  // respond to property prefixes urls.
  appletRoutes: {
    pages: 'frontdoor'
  },
  
  // authToken is for auth token config
  authToken: {
    refreshInterval: '5m',
    refreshIntervalMultiple: 3,
    loginUrl: '#frontdoor/login',
    refreshUrl: '/auth/refresh',
    bearerName: 'Bearer',
    requestHeader: 'Authorization',
    tokenKeyName: 'auth_token',
    tokenResponseProperty: 'token'
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZXMiOlsiYXBwLWNvbmZpZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxZQUFSOztBQUVqQixNQUFNLENBQUMsT0FBUCxHQUdFLENBQUE7OztFQUFBLFNBQUEsRUFBVyxNQUFYOztFQUVBLE1BQUEsRUFBUSxjQUZSOzs7RUFLQSxhQUFBLEVBQWUsQ0FBQSxDQUxmOzs7RUFRQSxXQUFBLEVBQWEsSUFSYjs7O0VBV0EsU0FBQSxFQUFXLElBWFg7O0VBYUEsS0FBQSxFQUNFO0lBQUEsS0FBQSxFQUFPLFFBQVA7SUFDQSxHQUFBLEVBQUs7RUFETCxDQWRGOztFQWlCQSxlQUFBLEVBQWlCLFdBakJqQjs7OztFQXNCQSxPQUFBLEVBQVMsS0F0QlQ7O0VBeUJBLFdBQUEsRUFBYSxNQXpCYjs7Ozs7RUE4QkEsU0FBQSxFQUFXLEtBOUJYOztFQWlDQSxRQUFBLEVBQVUsbUJBakNWO0VBa0NBLGFBQUEsRUFBZSxPQWxDZjs7O0VBcUNBLGFBQUEsRUFBZSxFQXJDZjs7Ozs7O0VBMkNBLFlBQUEsRUFDRTtJQUFBLEtBQUEsRUFBTztFQUFQLENBNUNGOzs7RUFnREEsU0FBQSxFQUNFO0lBQUEsZUFBQSxFQUFpQixJQUFqQjtJQUNBLHVCQUFBLEVBQXlCLENBRHpCO0lBRUEsUUFBQSxFQUFVLGtCQUZWO0lBR0EsVUFBQSxFQUFZLGVBSFo7SUFJQSxVQUFBLEVBQVksUUFKWjtJQUtBLGFBQUEsRUFBZSxlQUxmO0lBTUEsWUFBQSxFQUFjLFlBTmQ7SUFPQSxxQkFBQSxFQUF1QjtFQVB2QjtBQWpERiIsInNvdXJjZXNDb250ZW50IjpbIk1haW5QYWdlTGF5b3V0ID0gcmVxdWlyZSAnLi90a2xheW91dCdcblxubW9kdWxlLmV4cG9ydHMgPVxuICAjIFRoaXMgaXMgdGhlIGh0bWwgZWxlbWVudCB0byBhdHRhY2hcbiAgIyB0aGUgYXBwLiAgVGhpcyBpcyB0byBiZSBtYXJpb25ldHRlIFJlZ2lvblxuICBhcHBSZWdpb246ICdib2R5J1xuICAjIFRoaXMgaXMgYSBtYXJpb25ldHRlIHZpZXcgd2l0aCByZWdpb25zXG4gIGxheW91dDogTWFpblBhZ2VMYXlvdXRcbiAgIyBoZXJlIHlvdSBjYW4gc2V0IG9wdGlvbnMgdG8gYmUgcGFzc2VkXG4gICMgdG8gdGhlIGxheW91dFxuICBsYXlvdXRPcHRpb25zOiB7fVxuICAjIHNldCB0aGlzIHRvIGZhbHNlIGlmIHlvdSBkb24ndCBuZWVkXG4gICMgbWVzc2FnZXNcbiAgdXNlTWVzc2FnZXM6IHRydWVcbiAgIyBzZXQgdXNlTmF2YmFyIHRvIGZhbHNlIHRvIHNraXBcbiAgIyB1c2luZyBhIG5hdmJhciBpbiB0aGUgYXBwXG4gIHVzZU5hdmJhcjogdHJ1ZVxuICAjIHRoaXMgaXMgdGhlIGJyYW5kIGVudHJ5IGZvciB0aGUgbmF2YmFyXG4gIGJyYW5kOlxuICAgIGxhYmVsOiAnVEJpcmRzJ1xuICAgIHVybDogJyMnXG4gICMgYXBwbGV0IHRvIGJlIHVzZWQgZm9yIGZyb250ZG9vclxuICBmcm9udGRvb3JBcHBsZXQ6ICdmcm9udGRvb3InXG5cbiAgIyBEb2VzIHRoZSBhcHBsaWNhdGlvbiBoYXZlIGEgdXNlcj9cbiAgIyBJZiB0aGlzIGlzIHRydWUsIGEgdXNlck1lbnVBcHAgbXVzdCBiZSBzZXRcbiAgIyB0byBhIHRvb2xraXQgQXBwXG4gIGhhc1VzZXI6IGZhbHNlXG5cbiAgIyBJZiB0aGVyZSBpcyBhIHVzZXIsIHByb3ZpZGUgYSB1c2VyIG1lbnUgYXBwXG4gIHVzZXJNZW51QXBwOiB1bmRlZmluZWRcbiAgXG4gICMgaWYgbmVlZExvZ2luIGlzIHRydWUsIGZyb250ZG9vckFwcGxldCBzaG91bGRcbiAgIyBwcm92aWRlIGEgI2Zyb250ZG9vci9sb2dpbiByb3V0ZSB3aGljaCB3aWxsXG4gICMgYmUgZGlzcGxheWVkIGJ5IGRlZmF1bHRcbiAgbmVlZExvZ2luOiBmYWxzZVxuXG4gICMgdGhlIHVybCBmb3IgbG9naW5cbiAgbG9naW5Vcmw6ICcvI2Zyb250ZG9vci9sb2dpbidcbiAgZ3Vlc3RVc2VyTmFtZTogJ0d1ZXN0J1xuICBcbiAgIyBuYXZiYXIgZW50cmllcyBpcyBhbiBhcnJheSBvZiBvYmplY3RzXG4gIG5hdmJhckVudHJpZXM6IFtdXG4gICMgYXBwbGV0Um91dGVzIGxldHMgeW91IHBsYWNlXG4gICMgdGhlIGFwcGxldCBuYW1lIGFzIGEgcHJvcGVydHlcbiAgIyB3aXRoIHRoZSBhcHBsZXQgZGlyZWN0b3J5IG5hbWVcbiAgIyBhcyBhIHZhbHVlLiAgVGhlIEFwcFJvdXRlciBzaG91bGRcbiAgIyByZXNwb25kIHRvIHByb3BlcnR5IHByZWZpeGVzIHVybHMuXG4gIGFwcGxldFJvdXRlczpcbiAgICBwYWdlczogJ2Zyb250ZG9vcidcbiAgICBcblxuICAjIGF1dGhUb2tlbiBpcyBmb3IgYXV0aCB0b2tlbiBjb25maWdcbiAgYXV0aFRva2VuOlxuICAgIHJlZnJlc2hJbnRlcnZhbDogJzVtJ1xuICAgIHJlZnJlc2hJbnRlcnZhbE11bHRpcGxlOiAzXG4gICAgbG9naW5Vcmw6ICcjZnJvbnRkb29yL2xvZ2luJ1xuICAgIHJlZnJlc2hVcmw6ICcvYXV0aC9yZWZyZXNoJ1xuICAgIGJlYXJlck5hbWU6ICdCZWFyZXInXG4gICAgcmVxdWVzdEhlYWRlcjogJ0F1dGhvcml6YXRpb24nXG4gICAgdG9rZW5LZXlOYW1lOiAnYXV0aF90b2tlbidcbiAgICB0b2tlblJlc3BvbnNlUHJvcGVydHk6ICd0b2tlbidcbiAgICBcbiAgICBcbiJdfQ==
