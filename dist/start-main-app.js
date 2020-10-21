var MainChannel, createMainApp;

import Backbone from 'backbone';

import {
  Region
} from 'backbone.marionette';

import RootApp from './root-app';

import MessagesApp from './tkmessages';

import NavbarApp from './tknavbar';

MainChannel = Backbone.Radio.channel('global');

createMainApp = function(cfg) {
  var layout, mainApp, nbApp, nbview, options, rootEl, rootRegion, useMessages, useNavbar;
  rootEl = (cfg != null ? cfg.appRegion : void 0) || 'body';
  rootRegion = new Region({
    el: rootEl
  });
  mainApp = new RootApp({
    appConfig: cfg,
    region: rootRegion
  });
  mainApp.setState('appConfig', cfg);
  MainChannel.reply('main:app:object', function() {
    return mainApp;
  });
  MainChannel.reply('main:app:config', function() {
    return mainApp.getState('appConfig');
  });
  layout = mainApp.getView();
  // setup messages
  useMessages = true;
  if ((cfg.useMessages != null) && cfg.useMessages === false) {
    useMessages = false;
  }
  if (useMessages) {
    mainApp.addChildApp('messages', MessagesApp, {
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
      nbApp.addChildApp('user-menu', cfg.userMenuApp, options);
    }
  }
  return mainApp;
};

export default createMainApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtbWFpbi1hcHAuanMiLCJzb3VyY2VzIjpbInN0YXJ0LW1haW4tYXBwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFZCxhQUFBLEdBQWdCLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDaEIsTUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxFQUFBO0VBQUUsTUFBQSxrQkFBUyxHQUFHLENBQUUsbUJBQUwsSUFBa0I7RUFDM0IsVUFBQSxHQUFhLElBQUksTUFBSixDQUFXO0lBQUEsRUFBQSxFQUFJO0VBQUosQ0FBWDtFQUNiLE9BQUEsR0FBVSxJQUFJLE9BQUosQ0FDUjtJQUFBLFNBQUEsRUFBVyxHQUFYO0lBQ0EsTUFBQSxFQUFRO0VBRFIsQ0FEUTtFQUdWLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFdBQWpCLEVBQThCLEdBQTlCO0VBQ0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFFBQUEsQ0FBQSxDQUFBO0FBQ25DLFdBQU87RUFENEIsQ0FBckM7RUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsUUFBQSxDQUFBLENBQUE7QUFDbkMsV0FBTyxPQUFPLENBQUMsUUFBUixDQUFpQixXQUFqQjtFQUQ0QixDQUFyQztFQUVBLE1BQUEsR0FBUyxPQUFPLENBQUMsT0FBUixDQUFBLEVBVlg7O0VBWUUsV0FBQSxHQUFjO0VBQ2QsSUFBRyx5QkFBQSxJQUFxQixHQUFHLENBQUMsV0FBSixLQUFtQixLQUEzQztJQUNFLFdBQUEsR0FBYyxNQURoQjs7RUFFQSxJQUFHLFdBQUg7SUFDRSxPQUFPLENBQUMsV0FBUixDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxFQUNFO01BQUEsTUFBQSxFQUFRLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFVBQWpCLENBQVI7TUFDQSxTQUFBLEVBQVcsR0FEWDtNQUVBLFNBQUEsRUFBVztJQUZYLENBREYsRUFERjtHQWZGOztFQXFCRSxTQUFBLEdBQVk7RUFDWixJQUFHLHVCQUFBLElBQW1CLEdBQUcsQ0FBQyxTQUFKLEtBQWlCLEtBQXZDO0lBQ0UsU0FBQSxHQUFZLE1BRGQ7O0VBRUEsSUFBRyxTQUFIO0lBQ0UsS0FBQSxHQUFRLE9BQU8sQ0FBQyxXQUFSLENBQW9CLFFBQXBCLEVBQThCLFNBQTlCLEVBQ047TUFBQSxNQUFBLEVBQVEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsQ0FBUjtNQUNBLGVBQUEsRUFBaUIsSUFEakI7TUFFQSxTQUFBLEVBQVcsR0FGWDtNQUdBLFNBQUEsRUFBVztJQUhYLENBRE07SUFLUixJQUFHLEdBQUcsQ0FBQyxPQUFQO01BQ0UsTUFBQSxHQUFTLEtBQUssQ0FBQyxPQUFOLENBQUE7TUFDVCxPQUFBLEdBQ0U7UUFBQSxNQUFBLEVBQVEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsYUFBakIsQ0FBUjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFFQSxTQUFBLEVBQVcsR0FGWDtRQUdBLFNBQUEsRUFBVyxLQUhYO1FBSUEsSUFBQSxFQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLDRCQUFwQjtNQUpOO01BS0YsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsV0FBbEIsRUFBK0IsR0FBRyxDQUFDLFdBQW5DLEVBQWdELE9BQWhELEVBUkY7S0FORjs7QUFlQSxTQUFPO0FBeENPOztBQTBDaEIsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuaW1wb3J0IFJvb3RBcHAgZnJvbSAnLi9yb290LWFwcCdcbmltcG9ydCBNZXNzYWdlc0FwcCBmcm9tICcuL3RrbWVzc2FnZXMnXG5pbXBvcnQgTmF2YmFyQXBwIGZyb20gJy4vdGtuYXZiYXInXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jcmVhdGVNYWluQXBwID0gKGNmZykgLT5cbiAgcm9vdEVsID0gY2ZnPy5hcHBSZWdpb24gb3IgJ2JvZHknXG4gIHJvb3RSZWdpb24gPSBuZXcgUmVnaW9uIGVsOiByb290RWxcbiAgbWFpbkFwcCA9IG5ldyBSb290QXBwXG4gICAgYXBwQ29uZmlnOiBjZmdcbiAgICByZWdpb246IHJvb3RSZWdpb25cbiAgbWFpbkFwcC5zZXRTdGF0ZSAnYXBwQ29uZmlnJywgY2ZnXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpvYmplY3QnLCAtPlxuICAgIHJldHVybiBtYWluQXBwXG4gIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjb25maWcnLCAtPlxuICAgIHJldHVybiBtYWluQXBwLmdldFN0YXRlICdhcHBDb25maWcnXG4gIGxheW91dCA9IG1haW5BcHAuZ2V0VmlldygpXG4gICMgc2V0dXAgbWVzc2FnZXNcbiAgdXNlTWVzc2FnZXMgPSB0cnVlXG4gIGlmIGNmZy51c2VNZXNzYWdlcz8gYW5kIGNmZy51c2VNZXNzYWdlcyBpcyBmYWxzZVxuICAgIHVzZU1lc3NhZ2VzID0gZmFsc2VcbiAgaWYgdXNlTWVzc2FnZXNcbiAgICBtYWluQXBwLmFkZENoaWxkQXBwICdtZXNzYWdlcycsIE1lc3NhZ2VzQXBwLFxuICAgICAgcmVnaW9uOiBsYXlvdXQuZ2V0UmVnaW9uICdtZXNzYWdlcydcbiAgICAgIGFwcENvbmZpZzogY2ZnXG4gICAgICBwYXJlbnRBcHA6IG1haW5BcHBcbiAgIyBzZXR1cCBuYXZiYXJcbiAgdXNlTmF2YmFyID0gdHJ1ZVxuICBpZiBjZmcudXNlTmF2YmFyPyBhbmQgY2ZnLnVzZU5hdmJhciBpcyBmYWxzZVxuICAgIHVzZU5hdmJhciA9IGZhbHNlXG4gIGlmIHVzZU5hdmJhclxuICAgIG5iQXBwID0gbWFpbkFwcC5hZGRDaGlsZEFwcCAnbmF2YmFyJywgTmF2YmFyQXBwLFxuICAgICAgcmVnaW9uOiBsYXlvdXQuZ2V0UmVnaW9uICduYXZiYXInXG4gICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgIGFwcENvbmZpZzogY2ZnXG4gICAgICBwYXJlbnRBcHA6IG1haW5BcHBcbiAgICBpZiBjZmcuaGFzVXNlclxuICAgICAgbmJ2aWV3ID0gbmJBcHAuZ2V0VmlldygpXG4gICAgICBvcHRpb25zID1cbiAgICAgICAgcmVnaW9uOiBuYnZpZXcuZ2V0UmVnaW9uICd1c2VyRW50cmllcydcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogY2ZnXG4gICAgICAgIHBhcmVudEFwcDogbmJBcHBcbiAgICAgICAgdXNlcjogTWFpbkNoYW5uZWwucmVxdWVzdCBcIm1haW46YXBwOmRlY29kZS1hdXRoLXRva2VuXCJcbiAgICAgIG5iQXBwLmFkZENoaWxkQXBwICd1c2VyLW1lbnUnLCBjZmcudXNlck1lbnVBcHAsIG9wdGlvbnNcbiAgcmV0dXJuIG1haW5BcHBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWFpbkFwcFxuXG4gICAgXG4gICAgXG4iXX0=
