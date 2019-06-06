var appConfig;

import MainPageLayout from './tklayout';

appConfig = {
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
  loginUrl: '#login',
  guestUserName: 'Guest',
  
  // navbar entries is an array of objects
  navbarEntries: [],
  // appletRoutes lets you place
  // the applet name as a property
  // with the applet directory name
  // as a value.  The AppRouter should
  // respond to property prefixes urls.
  appletRoutes: {
    pages: 'frontdoor',
    login: 'frontdoor',
    logout: 'frontdoor'
  },
  
  // authToken is for auth token config
  authToken: {
    refreshInterval: '5m',
    refreshIntervalMultiple: 3,
    loginUrl: '#login',
    refreshUrl: '/auth/refresh',
    bearerName: 'Bearer',
    requestHeader: 'Authorization',
    tokenKeyName: 'auth_token',
    tokenResponseProperty: 'token'
  }
};

export default appConfig;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZXMiOlsiYXBwLWNvbmZpZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLGNBQVAsTUFBQTs7QUFFQSxTQUFBLEdBR0UsQ0FBQTs7O0VBQUEsU0FBQSxFQUFXLE1BQVg7O0VBRUEsTUFBQSxFQUFRLGNBRlI7OztFQUtBLGFBQUEsRUFBZSxDQUFBLENBTGY7OztFQVFBLFdBQUEsRUFBYSxJQVJiOzs7RUFXQSxTQUFBLEVBQVcsSUFYWDs7RUFhQSxLQUFBLEVBQ0U7SUFBQSxLQUFBLEVBQU8sUUFBUDtJQUNBLEdBQUEsRUFBSztFQURMLENBZEY7O0VBaUJBLGVBQUEsRUFBaUIsV0FqQmpCOzs7O0VBc0JBLE9BQUEsRUFBUyxLQXRCVDs7RUF5QkEsV0FBQSxFQUFhLE1BekJiOzs7OztFQThCQSxTQUFBLEVBQVcsS0E5Qlg7O0VBaUNBLFFBQUEsRUFBVSxRQWpDVjtFQWtDQSxhQUFBLEVBQWUsT0FsQ2Y7OztFQXFDQSxhQUFBLEVBQWUsRUFyQ2Y7Ozs7OztFQTJDQSxZQUFBLEVBQ0U7SUFBQSxLQUFBLEVBQU8sV0FBUDtJQUNBLEtBQUEsRUFBTyxXQURQO0lBRUEsTUFBQSxFQUFRO0VBRlIsQ0E1Q0Y7OztFQWtEQSxTQUFBLEVBQ0U7SUFBQSxlQUFBLEVBQWlCLElBQWpCO0lBQ0EsdUJBQUEsRUFBeUIsQ0FEekI7SUFFQSxRQUFBLEVBQVUsUUFGVjtJQUdBLFVBQUEsRUFBWSxlQUhaO0lBSUEsVUFBQSxFQUFZLFFBSlo7SUFLQSxhQUFBLEVBQWUsZUFMZjtJQU1BLFlBQUEsRUFBYyxZQU5kO0lBT0EscUJBQUEsRUFBdUI7RUFQdkI7QUFuREY7O0FBNkRGLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYWluUGFnZUxheW91dCBmcm9tICcuL3RrbGF5b3V0J1xuXG5hcHBDb25maWcgPVxuICAjIFRoaXMgaXMgdGhlIGh0bWwgZWxlbWVudCB0byBhdHRhY2hcbiAgIyB0aGUgYXBwLiAgVGhpcyBpcyB0byBiZSBtYXJpb25ldHRlIFJlZ2lvblxuICBhcHBSZWdpb246ICdib2R5J1xuICAjIFRoaXMgaXMgYSBtYXJpb25ldHRlIHZpZXcgd2l0aCByZWdpb25zXG4gIGxheW91dDogTWFpblBhZ2VMYXlvdXRcbiAgIyBoZXJlIHlvdSBjYW4gc2V0IG9wdGlvbnMgdG8gYmUgcGFzc2VkXG4gICMgdG8gdGhlIGxheW91dFxuICBsYXlvdXRPcHRpb25zOiB7fVxuICAjIHNldCB0aGlzIHRvIGZhbHNlIGlmIHlvdSBkb24ndCBuZWVkXG4gICMgbWVzc2FnZXNcbiAgdXNlTWVzc2FnZXM6IHRydWVcbiAgIyBzZXQgdXNlTmF2YmFyIHRvIGZhbHNlIHRvIHNraXBcbiAgIyB1c2luZyBhIG5hdmJhciBpbiB0aGUgYXBwXG4gIHVzZU5hdmJhcjogdHJ1ZVxuICAjIHRoaXMgaXMgdGhlIGJyYW5kIGVudHJ5IGZvciB0aGUgbmF2YmFyXG4gIGJyYW5kOlxuICAgIGxhYmVsOiAnVEJpcmRzJ1xuICAgIHVybDogJyMnXG4gICMgYXBwbGV0IHRvIGJlIHVzZWQgZm9yIGZyb250ZG9vclxuICBmcm9udGRvb3JBcHBsZXQ6ICdmcm9udGRvb3InXG5cbiAgIyBEb2VzIHRoZSBhcHBsaWNhdGlvbiBoYXZlIGEgdXNlcj9cbiAgIyBJZiB0aGlzIGlzIHRydWUsIGEgdXNlck1lbnVBcHAgbXVzdCBiZSBzZXRcbiAgIyB0byBhIHRvb2xraXQgQXBwXG4gIGhhc1VzZXI6IGZhbHNlXG5cbiAgIyBJZiB0aGVyZSBpcyBhIHVzZXIsIHByb3ZpZGUgYSB1c2VyIG1lbnUgYXBwXG4gIHVzZXJNZW51QXBwOiB1bmRlZmluZWRcbiAgXG4gICMgaWYgbmVlZExvZ2luIGlzIHRydWUsIGZyb250ZG9vckFwcGxldCBzaG91bGRcbiAgIyBwcm92aWRlIGEgI2Zyb250ZG9vci9sb2dpbiByb3V0ZSB3aGljaCB3aWxsXG4gICMgYmUgZGlzcGxheWVkIGJ5IGRlZmF1bHRcbiAgbmVlZExvZ2luOiBmYWxzZVxuXG4gICMgdGhlIHVybCBmb3IgbG9naW5cbiAgbG9naW5Vcmw6ICcjbG9naW4nXG4gIGd1ZXN0VXNlck5hbWU6ICdHdWVzdCdcbiAgXG4gICMgbmF2YmFyIGVudHJpZXMgaXMgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICBuYXZiYXJFbnRyaWVzOiBbXVxuICAjIGFwcGxldFJvdXRlcyBsZXRzIHlvdSBwbGFjZVxuICAjIHRoZSBhcHBsZXQgbmFtZSBhcyBhIHByb3BlcnR5XG4gICMgd2l0aCB0aGUgYXBwbGV0IGRpcmVjdG9yeSBuYW1lXG4gICMgYXMgYSB2YWx1ZS4gIFRoZSBBcHBSb3V0ZXIgc2hvdWxkXG4gICMgcmVzcG9uZCB0byBwcm9wZXJ0eSBwcmVmaXhlcyB1cmxzLlxuICBhcHBsZXRSb3V0ZXM6XG4gICAgcGFnZXM6ICdmcm9udGRvb3InXG4gICAgbG9naW46ICdmcm9udGRvb3InXG4gICAgbG9nb3V0OiAnZnJvbnRkb29yJ1xuICAgIFxuXG4gICMgYXV0aFRva2VuIGlzIGZvciBhdXRoIHRva2VuIGNvbmZpZ1xuICBhdXRoVG9rZW46XG4gICAgcmVmcmVzaEludGVydmFsOiAnNW0nXG4gICAgcmVmcmVzaEludGVydmFsTXVsdGlwbGU6IDNcbiAgICBsb2dpblVybDogJyNsb2dpbidcbiAgICByZWZyZXNoVXJsOiAnL2F1dGgvcmVmcmVzaCdcbiAgICBiZWFyZXJOYW1lOiAnQmVhcmVyJ1xuICAgIHJlcXVlc3RIZWFkZXI6ICdBdXRob3JpemF0aW9uJ1xuICAgIHRva2VuS2V5TmFtZTogJ2F1dGhfdG9rZW4nXG4gICAgdG9rZW5SZXNwb25zZVByb3BlcnR5OiAndG9rZW4nXG5cblxuZXhwb3J0IGRlZmF1bHQgYXBwQ29uZmlnXG4iXX0=
