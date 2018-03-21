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

export default appConfig;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZXMiOlsiYXBwLWNvbmZpZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLGNBQVAsTUFBQTs7QUFFQSxTQUFBLEdBR0UsQ0FBQTs7O0VBQUEsU0FBQSxFQUFXLE1BQVg7O0VBRUEsTUFBQSxFQUFRLGNBRlI7OztFQUtBLGFBQUEsRUFBZSxDQUFBLENBTGY7OztFQVFBLFdBQUEsRUFBYSxJQVJiOzs7RUFXQSxTQUFBLEVBQVcsSUFYWDs7RUFhQSxLQUFBLEVBQ0U7SUFBQSxLQUFBLEVBQU8sUUFBUDtJQUNBLEdBQUEsRUFBSztFQURMLENBZEY7O0VBaUJBLGVBQUEsRUFBaUIsV0FqQmpCOzs7O0VBc0JBLE9BQUEsRUFBUyxLQXRCVDs7RUF5QkEsV0FBQSxFQUFhLE1BekJiOzs7OztFQThCQSxTQUFBLEVBQVcsS0E5Qlg7O0VBaUNBLFFBQUEsRUFBVSxtQkFqQ1Y7RUFrQ0EsYUFBQSxFQUFlLE9BbENmOzs7RUFxQ0EsYUFBQSxFQUFlLEVBckNmOzs7Ozs7RUEyQ0EsWUFBQSxFQUNFO0lBQUEsS0FBQSxFQUFPO0VBQVAsQ0E1Q0Y7OztFQWdEQSxTQUFBLEVBQ0U7SUFBQSxlQUFBLEVBQWlCLElBQWpCO0lBQ0EsdUJBQUEsRUFBeUIsQ0FEekI7SUFFQSxRQUFBLEVBQVUsa0JBRlY7SUFHQSxVQUFBLEVBQVksZUFIWjtJQUlBLFVBQUEsRUFBWSxRQUpaO0lBS0EsYUFBQSxFQUFlLGVBTGY7SUFNQSxZQUFBLEVBQWMsWUFOZDtJQU9BLHFCQUFBLEVBQXVCO0VBUHZCO0FBakRGOztBQTJERixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuYXBwQ29uZmlnID1cbiAgIyBUaGlzIGlzIHRoZSBodG1sIGVsZW1lbnQgdG8gYXR0YWNoXG4gICMgdGhlIGFwcC4gIFRoaXMgaXMgdG8gYmUgbWFyaW9uZXR0ZSBSZWdpb25cbiAgYXBwUmVnaW9uOiAnYm9keSdcbiAgIyBUaGlzIGlzIGEgbWFyaW9uZXR0ZSB2aWV3IHdpdGggcmVnaW9uc1xuICBsYXlvdXQ6IE1haW5QYWdlTGF5b3V0XG4gICMgaGVyZSB5b3UgY2FuIHNldCBvcHRpb25zIHRvIGJlIHBhc3NlZFxuICAjIHRvIHRoZSBsYXlvdXRcbiAgbGF5b3V0T3B0aW9uczoge31cbiAgIyBzZXQgdGhpcyB0byBmYWxzZSBpZiB5b3UgZG9uJ3QgbmVlZFxuICAjIG1lc3NhZ2VzXG4gIHVzZU1lc3NhZ2VzOiB0cnVlXG4gICMgc2V0IHVzZU5hdmJhciB0byBmYWxzZSB0byBza2lwXG4gICMgdXNpbmcgYSBuYXZiYXIgaW4gdGhlIGFwcFxuICB1c2VOYXZiYXI6IHRydWVcbiAgIyB0aGlzIGlzIHRoZSBicmFuZCBlbnRyeSBmb3IgdGhlIG5hdmJhclxuICBicmFuZDpcbiAgICBsYWJlbDogJ1RCaXJkcydcbiAgICB1cmw6ICcjJ1xuICAjIGFwcGxldCB0byBiZSB1c2VkIGZvciBmcm9udGRvb3JcbiAgZnJvbnRkb29yQXBwbGV0OiAnZnJvbnRkb29yJ1xuXG4gICMgRG9lcyB0aGUgYXBwbGljYXRpb24gaGF2ZSBhIHVzZXI/XG4gICMgSWYgdGhpcyBpcyB0cnVlLCBhIHVzZXJNZW51QXBwIG11c3QgYmUgc2V0XG4gICMgdG8gYSB0b29sa2l0IEFwcFxuICBoYXNVc2VyOiBmYWxzZVxuXG4gICMgSWYgdGhlcmUgaXMgYSB1c2VyLCBwcm92aWRlIGEgdXNlciBtZW51IGFwcFxuICB1c2VyTWVudUFwcDogdW5kZWZpbmVkXG4gIFxuICAjIGlmIG5lZWRMb2dpbiBpcyB0cnVlLCBmcm9udGRvb3JBcHBsZXQgc2hvdWxkXG4gICMgcHJvdmlkZSBhICNmcm9udGRvb3IvbG9naW4gcm91dGUgd2hpY2ggd2lsbFxuICAjIGJlIGRpc3BsYXllZCBieSBkZWZhdWx0XG4gIG5lZWRMb2dpbjogZmFsc2VcblxuICAjIHRoZSB1cmwgZm9yIGxvZ2luXG4gIGxvZ2luVXJsOiAnLyNmcm9udGRvb3IvbG9naW4nXG4gIGd1ZXN0VXNlck5hbWU6ICdHdWVzdCdcbiAgXG4gICMgbmF2YmFyIGVudHJpZXMgaXMgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICBuYXZiYXJFbnRyaWVzOiBbXVxuICAjIGFwcGxldFJvdXRlcyBsZXRzIHlvdSBwbGFjZVxuICAjIHRoZSBhcHBsZXQgbmFtZSBhcyBhIHByb3BlcnR5XG4gICMgd2l0aCB0aGUgYXBwbGV0IGRpcmVjdG9yeSBuYW1lXG4gICMgYXMgYSB2YWx1ZS4gIFRoZSBBcHBSb3V0ZXIgc2hvdWxkXG4gICMgcmVzcG9uZCB0byBwcm9wZXJ0eSBwcmVmaXhlcyB1cmxzLlxuICBhcHBsZXRSb3V0ZXM6XG4gICAgcGFnZXM6ICdmcm9udGRvb3InXG4gICAgXG5cbiAgIyBhdXRoVG9rZW4gaXMgZm9yIGF1dGggdG9rZW4gY29uZmlnXG4gIGF1dGhUb2tlbjpcbiAgICByZWZyZXNoSW50ZXJ2YWw6ICc1bSdcbiAgICByZWZyZXNoSW50ZXJ2YWxNdWx0aXBsZTogM1xuICAgIGxvZ2luVXJsOiAnI2Zyb250ZG9vci9sb2dpbidcbiAgICByZWZyZXNoVXJsOiAnL2F1dGgvcmVmcmVzaCdcbiAgICBiZWFyZXJOYW1lOiAnQmVhcmVyJ1xuICAgIHJlcXVlc3RIZWFkZXI6ICdBdXRob3JpemF0aW9uJ1xuICAgIHRva2VuS2V5TmFtZTogJ2F1dGhfdG9rZW4nXG4gICAgdG9rZW5SZXNwb25zZVByb3BlcnR5OiAndG9rZW4nXG5cblxuZXhwb3J0IGRlZmF1bHQgYXBwQ29uZmlnXG4iXX0=
