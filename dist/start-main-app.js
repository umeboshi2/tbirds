var MainChannel, createMainApp;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import RootApp from './root-app';

import MessagesApp from './tkmessages';

import NavbarApp from './tknavbar';

MainChannel = Backbone.Radio.channel('global');

createMainApp = function(cfg) {
  var layout, mainApp, msgApp, nbApp, nbview, options, rootEl, rootRegion, useMessages, useNavbar, userMenuApp;
  rootEl = (cfg != null ? cfg.appRegion : void 0) || 'body';
  rootRegion = new Marionette.Region({
    el: rootEl
  });
  mainApp = new RootApp({
    appConfig: cfg,
    region: rootRegion
  });
  MainChannel.reply('main:app:object', function() {
    return mainApp;
  });
  MainChannel.reply('main:app:config', function() {
    return cfg;
  });
  layout = mainApp.getView();
  // setup messages
  useMessages = true;
  if ((cfg.useMessages != null) && cfg.useMessages === false) {
    useMessages = false;
  }
  if (useMessages) {
    msgApp = mainApp.addChildApp('messages', MessagesApp, {
      region: layout.getRegion('messages'),
      appConfig: cfg,
      parentApp: mainApp
    });
  }
  // setup navbar
  useNavbar = true;
  if ((cfg.useNavbar != null) && cfg.useNavbar === false) {
    useNavbar = false;
  }
  if (useNavbar) {
    nbApp = mainApp.addChildApp('navbar', NavbarApp, {
      region: layout.getRegion('navbar'),
      startWithParent: true,
      appConfig: cfg,
      parentApp: mainApp
    });
    if (cfg.hasUser) {
      nbview = nbApp.getView();
      options = {
        region: nbview.getRegion('userEntries'),
        startWithParent: true,
        appConfig: cfg,
        parentApp: nbApp,
        user: MainChannel.request("main:app:decode-auth-token")
      };
      userMenuApp = nbApp.addChildApp('user-menu', cfg.userMenuApp, options);
    }
  }
  return mainApp;
};

export default createMainApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtbWFpbi1hcHAuanMiLCJzb3VyY2VzIjpbInN0YXJ0LW1haW4tYXBwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLE9BQVAsTUFBQTs7QUFDQSxPQUFPLFdBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLGFBQUEsR0FBZ0IsUUFBQSxDQUFDLEdBQUQsQ0FBQTtBQUNkLE1BQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFVBQUEsRUFBQSxXQUFBLEVBQUEsU0FBQSxFQUFBO0VBQUEsTUFBQSxrQkFBUyxHQUFHLENBQUUsbUJBQUwsSUFBa0I7RUFDM0IsVUFBQSxHQUFhLElBQUksVUFBVSxDQUFDLE1BQWYsQ0FBc0I7SUFBQSxFQUFBLEVBQUk7RUFBSixDQUF0QjtFQUNiLE9BQUEsR0FBVSxJQUFJLE9BQUosQ0FDUjtJQUFBLFNBQUEsRUFBVyxHQUFYO0lBQ0EsTUFBQSxFQUFRO0VBRFIsQ0FEUTtFQUdWLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxRQUFBLENBQUEsQ0FBQTtBQUNuQyxXQUFPO0VBRDRCLENBQXJDO0VBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFFBQUEsQ0FBQSxDQUFBO0FBQ25DLFdBQU87RUFENEIsQ0FBckM7RUFFQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE9BQVIsQ0FBQSxFQVRUOztFQVdBLFdBQUEsR0FBYztFQUNkLElBQUcseUJBQUEsSUFBcUIsR0FBRyxDQUFDLFdBQUosS0FBbUIsS0FBM0M7SUFDRSxXQUFBLEdBQWMsTUFEaEI7O0VBRUEsSUFBRyxXQUFIO0lBQ0UsTUFBQSxHQUFTLE9BQU8sQ0FBQyxXQUFSLENBQW9CLFVBQXBCLEVBQWdDLFdBQWhDLEVBQ1A7TUFBQSxNQUFBLEVBQVEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsVUFBakIsQ0FBUjtNQUNBLFNBQUEsRUFBVyxHQURYO01BRUEsU0FBQSxFQUFXO0lBRlgsQ0FETyxFQURYO0dBZEE7O0VBb0JBLFNBQUEsR0FBWTtFQUNaLElBQUcsdUJBQUEsSUFBbUIsR0FBRyxDQUFDLFNBQUosS0FBaUIsS0FBdkM7SUFDRSxTQUFBLEdBQVksTUFEZDs7RUFFQSxJQUFHLFNBQUg7SUFDRSxLQUFBLEdBQVEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsUUFBcEIsRUFBOEIsU0FBOUIsRUFDTjtNQUFBLE1BQUEsRUFBUSxNQUFNLENBQUMsU0FBUCxDQUFpQixRQUFqQixDQUFSO01BQ0EsZUFBQSxFQUFpQixJQURqQjtNQUVBLFNBQUEsRUFBVyxHQUZYO01BR0EsU0FBQSxFQUFXO0lBSFgsQ0FETTtJQUtSLElBQUcsR0FBRyxDQUFDLE9BQVA7TUFDRSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU4sQ0FBQTtNQUNULE9BQUEsR0FDRTtRQUFBLE1BQUEsRUFBUSxNQUFNLENBQUMsU0FBUCxDQUFpQixhQUFqQixDQUFSO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUVBLFNBQUEsRUFBVyxHQUZYO1FBR0EsU0FBQSxFQUFXLEtBSFg7UUFJQSxJQUFBLEVBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsNEJBQXBCO01BSk47TUFLRixXQUFBLEdBQWMsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsV0FBbEIsRUFBK0IsR0FBRyxDQUFDLFdBQW5DLEVBQWdELE9BQWhELEVBUmhCO0tBTkY7O0FBZUEsU0FBTztBQXZDTzs7QUF5Q2hCLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgUm9vdEFwcCBmcm9tICcuL3Jvb3QtYXBwJ1xuaW1wb3J0IE1lc3NhZ2VzQXBwIGZyb20gJy4vdGttZXNzYWdlcydcbmltcG9ydCBOYXZiYXJBcHAgZnJvbSAnLi90a25hdmJhcidcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNyZWF0ZU1haW5BcHAgPSAoY2ZnKSAtPlxuICByb290RWwgPSBjZmc/LmFwcFJlZ2lvbiBvciAnYm9keSdcbiAgcm9vdFJlZ2lvbiA9IG5ldyBNYXJpb25ldHRlLlJlZ2lvbiBlbDogcm9vdEVsXG4gIG1haW5BcHAgPSBuZXcgUm9vdEFwcFxuICAgIGFwcENvbmZpZzogY2ZnXG4gICAgcmVnaW9uOiByb290UmVnaW9uXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpvYmplY3QnLCAtPlxuICAgIHJldHVybiBtYWluQXBwXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjb25maWcnLCAtPlxuICAgIHJldHVybiBjZmdcbiAgbGF5b3V0ID0gbWFpbkFwcC5nZXRWaWV3KClcbiAgIyBzZXR1cCBtZXNzYWdlc1xuICB1c2VNZXNzYWdlcyA9IHRydWVcbiAgaWYgY2ZnLnVzZU1lc3NhZ2VzPyBhbmQgY2ZnLnVzZU1lc3NhZ2VzIGlzIGZhbHNlXG4gICAgdXNlTWVzc2FnZXMgPSBmYWxzZVxuICBpZiB1c2VNZXNzYWdlc1xuICAgIG1zZ0FwcCA9IG1haW5BcHAuYWRkQ2hpbGRBcHAgJ21lc3NhZ2VzJywgTWVzc2FnZXNBcHAsXG4gICAgICByZWdpb246IGxheW91dC5nZXRSZWdpb24gJ21lc3NhZ2VzJ1xuICAgICAgYXBwQ29uZmlnOiBjZmdcbiAgICAgIHBhcmVudEFwcDogbWFpbkFwcFxuICAjIHNldHVwIG5hdmJhclxuICB1c2VOYXZiYXIgPSB0cnVlXG4gIGlmIGNmZy51c2VOYXZiYXI/IGFuZCBjZmcudXNlTmF2YmFyIGlzIGZhbHNlXG4gICAgdXNlTmF2YmFyID0gZmFsc2VcbiAgaWYgdXNlTmF2YmFyXG4gICAgbmJBcHAgPSBtYWluQXBwLmFkZENoaWxkQXBwICduYXZiYXInLCBOYXZiYXJBcHAsXG4gICAgICByZWdpb246IGxheW91dC5nZXRSZWdpb24gJ25hdmJhcidcbiAgICAgIHN0YXJ0V2l0aFBhcmVudDogdHJ1ZVxuICAgICAgYXBwQ29uZmlnOiBjZmdcbiAgICAgIHBhcmVudEFwcDogbWFpbkFwcFxuICAgIGlmIGNmZy5oYXNVc2VyXG4gICAgICBuYnZpZXcgPSBuYkFwcC5nZXRWaWV3KClcbiAgICAgIG9wdGlvbnMgPVxuICAgICAgICByZWdpb246IG5idmlldy5nZXRSZWdpb24gJ3VzZXJFbnRyaWVzJ1xuICAgICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgICAgYXBwQ29uZmlnOiBjZmdcbiAgICAgICAgcGFyZW50QXBwOiBuYkFwcFxuICAgICAgICB1c2VyOiBNYWluQ2hhbm5lbC5yZXF1ZXN0IFwibWFpbjphcHA6ZGVjb2RlLWF1dGgtdG9rZW5cIlxuICAgICAgdXNlck1lbnVBcHAgPSBuYkFwcC5hZGRDaGlsZEFwcCAndXNlci1tZW51JywgY2ZnLnVzZXJNZW51QXBwLCBvcHRpb25zXG4gIHJldHVybiBtYWluQXBwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU1haW5BcHBcblxuICAgIFxuICAgIFxuIl19