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
  // set this to false if you don't need a router
  useRouter: true,
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZXMiOlsiYXBwLWNvbmZpZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFPLGNBQVAsTUFBQTs7QUFFQSxTQUFBLEdBR0UsQ0FBQTs7O0VBQUEsU0FBQSxFQUFXLE1BQVg7O0VBRUEsTUFBQSxFQUFRLGNBRlI7OztFQUtBLGFBQUEsRUFBZSxDQUFBLENBTGY7OztFQVFBLFdBQUEsRUFBYSxJQVJiOzs7RUFXQSxTQUFBLEVBQVcsSUFYWDs7RUFhQSxTQUFBLEVBQVcsSUFiWDs7RUFlQSxLQUFBLEVBQ0U7SUFBQSxLQUFBLEVBQU8sUUFBUDtJQUNBLEdBQUEsRUFBSztFQURMLENBaEJGOztFQW1CQSxlQUFBLEVBQWlCLFdBbkJqQjs7OztFQXdCQSxPQUFBLEVBQVMsS0F4QlQ7O0VBMkJBLFdBQUEsRUFBYSxNQTNCYjs7Ozs7RUFnQ0EsU0FBQSxFQUFXLEtBaENYOztFQW1DQSxRQUFBLEVBQVUsUUFuQ1Y7RUFvQ0EsYUFBQSxFQUFlLE9BcENmOzs7RUF1Q0EsYUFBQSxFQUFlLEVBdkNmOzs7Ozs7RUE2Q0EsWUFBQSxFQUNFO0lBQUEsS0FBQSxFQUFPLFdBQVA7SUFDQSxLQUFBLEVBQU8sV0FEUDtJQUVBLE1BQUEsRUFBUTtFQUZSLENBOUNGOzs7RUFvREEsU0FBQSxFQUNFO0lBQUEsZUFBQSxFQUFpQixJQUFqQjtJQUNBLHVCQUFBLEVBQXlCLENBRHpCO0lBRUEsUUFBQSxFQUFVLFFBRlY7SUFHQSxVQUFBLEVBQVksZUFIWjtJQUlBLFVBQUEsRUFBWSxRQUpaO0lBS0EsYUFBQSxFQUFlLGVBTGY7SUFNQSxZQUFBLEVBQWMsWUFOZDtJQU9BLHFCQUFBLEVBQXVCO0VBUHZCO0FBckRGOztBQStERixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuYXBwQ29uZmlnID1cbiAgIyBUaGlzIGlzIHRoZSBodG1sIGVsZW1lbnQgdG8gYXR0YWNoXG4gICMgdGhlIGFwcC4gIFRoaXMgaXMgdG8gYmUgbWFyaW9uZXR0ZSBSZWdpb25cbiAgYXBwUmVnaW9uOiAnYm9keSdcbiAgIyBUaGlzIGlzIGEgbWFyaW9uZXR0ZSB2aWV3IHdpdGggcmVnaW9uc1xuICBsYXlvdXQ6IE1haW5QYWdlTGF5b3V0XG4gICMgaGVyZSB5b3UgY2FuIHNldCBvcHRpb25zIHRvIGJlIHBhc3NlZFxuICAjIHRvIHRoZSBsYXlvdXRcbiAgbGF5b3V0T3B0aW9uczoge31cbiAgIyBzZXQgdGhpcyB0byBmYWxzZSBpZiB5b3UgZG9uJ3QgbmVlZFxuICAjIG1lc3NhZ2VzXG4gIHVzZU1lc3NhZ2VzOiB0cnVlXG4gICMgc2V0IHVzZU5hdmJhciB0byBmYWxzZSB0byBza2lwXG4gICMgdXNpbmcgYSBuYXZiYXIgaW4gdGhlIGFwcFxuICB1c2VOYXZiYXI6IHRydWVcbiAgIyBzZXQgdGhpcyB0byBmYWxzZSBpZiB5b3UgZG9uJ3QgbmVlZCBhIHJvdXRlclxuICB1c2VSb3V0ZXI6IHRydWVcbiAgIyB0aGlzIGlzIHRoZSBicmFuZCBlbnRyeSBmb3IgdGhlIG5hdmJhclxuICBicmFuZDpcbiAgICBsYWJlbDogJ1RCaXJkcydcbiAgICB1cmw6ICcjJ1xuICAjIGFwcGxldCB0byBiZSB1c2VkIGZvciBmcm9udGRvb3JcbiAgZnJvbnRkb29yQXBwbGV0OiAnZnJvbnRkb29yJ1xuXG4gICMgRG9lcyB0aGUgYXBwbGljYXRpb24gaGF2ZSBhIHVzZXI/XG4gICMgSWYgdGhpcyBpcyB0cnVlLCBhIHVzZXJNZW51QXBwIG11c3QgYmUgc2V0XG4gICMgdG8gYSB0b29sa2l0IEFwcFxuICBoYXNVc2VyOiBmYWxzZVxuXG4gICMgSWYgdGhlcmUgaXMgYSB1c2VyLCBwcm92aWRlIGEgdXNlciBtZW51IGFwcFxuICB1c2VyTWVudUFwcDogdW5kZWZpbmVkXG4gIFxuICAjIGlmIG5lZWRMb2dpbiBpcyB0cnVlLCBmcm9udGRvb3JBcHBsZXQgc2hvdWxkXG4gICMgcHJvdmlkZSBhICNmcm9udGRvb3IvbG9naW4gcm91dGUgd2hpY2ggd2lsbFxuICAjIGJlIGRpc3BsYXllZCBieSBkZWZhdWx0XG4gIG5lZWRMb2dpbjogZmFsc2VcblxuICAjIHRoZSB1cmwgZm9yIGxvZ2luXG4gIGxvZ2luVXJsOiAnI2xvZ2luJ1xuICBndWVzdFVzZXJOYW1lOiAnR3Vlc3QnXG4gIFxuICAjIG5hdmJhciBlbnRyaWVzIGlzIGFuIGFycmF5IG9mIG9iamVjdHNcbiAgbmF2YmFyRW50cmllczogW11cbiAgIyBhcHBsZXRSb3V0ZXMgbGV0cyB5b3UgcGxhY2VcbiAgIyB0aGUgYXBwbGV0IG5hbWUgYXMgYSBwcm9wZXJ0eVxuICAjIHdpdGggdGhlIGFwcGxldCBkaXJlY3RvcnkgbmFtZVxuICAjIGFzIGEgdmFsdWUuICBUaGUgQXBwUm91dGVyIHNob3VsZFxuICAjIHJlc3BvbmQgdG8gcHJvcGVydHkgcHJlZml4ZXMgdXJscy5cbiAgYXBwbGV0Um91dGVzOlxuICAgIHBhZ2VzOiAnZnJvbnRkb29yJ1xuICAgIGxvZ2luOiAnZnJvbnRkb29yJ1xuICAgIGxvZ291dDogJ2Zyb250ZG9vcidcbiAgICBcblxuICAjIGF1dGhUb2tlbiBpcyBmb3IgYXV0aCB0b2tlbiBjb25maWdcbiAgYXV0aFRva2VuOlxuICAgIHJlZnJlc2hJbnRlcnZhbDogJzVtJ1xuICAgIHJlZnJlc2hJbnRlcnZhbE11bHRpcGxlOiAzXG4gICAgbG9naW5Vcmw6ICcjbG9naW4nXG4gICAgcmVmcmVzaFVybDogJy9hdXRoL3JlZnJlc2gnXG4gICAgYmVhcmVyTmFtZTogJ0JlYXJlcidcbiAgICByZXF1ZXN0SGVhZGVyOiAnQXV0aG9yaXphdGlvbidcbiAgICB0b2tlbktleU5hbWU6ICdhdXRoX3Rva2VuJ1xuICAgIHRva2VuUmVzcG9uc2VQcm9wZXJ0eTogJ3Rva2VuJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGFwcENvbmZpZ1xuIl19
