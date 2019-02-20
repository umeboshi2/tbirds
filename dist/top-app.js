var MainChannel, TkAppState, TopApp;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import MessagesApp from './tkmessages';

import NavbarApp from './tknavbar';

import MainPageLayout from './tklayout';

if (__useCssModules__) {
  require("../sass/tklayout.scss");
}

MainChannel = Backbone.Radio.channel('global');

TkAppState = (function() {
  class TkAppState extends Backbone.Model {};

  TkAppState.prototype.defaults = {
    startHistory: true,
    appConfig: {}
  };

  return TkAppState;

}).call(this);

MainChannel = Backbone.Radio.channel('global');

TopApp = Toolkit.App.extend({
  StateModel: TkAppState,
  options: {
    appConfig: {}
  },
  onBeforeStart: function() {
    var cfg, messagesApp, navbarApp, useMessages, useNavbar;
    console.warn("onBeforeStart");
    MainChannel.reply('main:app:object', () => {
      return this;
    });
    MainChannel.reply('main:app:config', () => {
      return this.getOption('appConfig');
    });
    cfg = this.getOption('appConfig');
    // build main page layout
    this.initPage();
    // setup messages
    useMessages = true;
    if ((cfg.useMessages != null) && cfg.useMessages === false) {
      useMessages = false;
    }
    if (useMessages) {
      messagesApp = this.addChildApp('messages', {
        AppClass: MessagesApp,
        startWithParent: true,
        parentApp: this
      });
    }
    // setup navbar
    useNavbar = true;
    if ((cfg.useNavbar != null) && cfg.useNavbar === false) {
      useNavbar = false;
    }
    if (useNavbar) {
      return navbarApp = this.addChildApp('navbar', {
        AppClass: NavbarApp,
        startWithParent: true,
        appConfig: cfg,
        parentApp: this
      });
    }
  },
  initPage: function() {
    var AppLayout, cfg, layout, layoutOpts;
    cfg = this.options.appConfig;
    AppLayout = (cfg != null ? cfg.layout : void 0) || MainPageLayout;
    layoutOpts = cfg.layoutOptions;
    layout = new AppLayout(cfg.layoutOptions);
    // FIXME - test for region class
    this.setRegion(new Marionette.Region({
      el: (cfg != null ? cfg.appRegion : void 0) || 'body'
    }));
    return this.showView(layout);
  },
  onStart: function() {
    var c;
    if (this.getState('startHistory')) {
      // FIXME we need something better
      // we seem to be required to, at minimum, load
      // the frontdoor and handle the "empty" route
      c = MainChannel.request('main-controller');
      return c.loadFrontDoor();
    }
  }
});

export default TopApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUNBLE9BQU8sU0FBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUVBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsdUJBQVIsRUFERjs7O0FBR0EsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjtFQUFOLE1BQUEsV0FBQSxRQUF5QixRQUFRLENBQUMsTUFBbEMsQ0FBQTs7dUJBQ0UsUUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLElBQWQ7SUFDQSxTQUFBLEVBQVcsQ0FBQTtFQURYOzs7Ozs7QUFHSixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLE1BQUEsR0FBUyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQVosQ0FDUDtFQUFBLFVBQUEsRUFBWSxVQUFaO0VBQ0EsT0FBQSxFQUNFO0lBQUEsU0FBQSxFQUFXLENBQUE7RUFBWCxDQUZGO0VBR0EsYUFBQSxFQUFlLFFBQUEsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxHQUFBLEVBQUEsV0FBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUE7SUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLGVBQWI7SUFDQSxXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsQ0FBQSxDQUFBLEdBQUE7YUFDbkM7SUFEbUMsQ0FBckM7SUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsQ0FBQSxDQUFBLEdBQUE7YUFDbkMsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO0lBRG1DLENBQXJDO0lBRUEsR0FBQSxHQUFNLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxFQUxOOztJQU9BLElBQUMsQ0FBQSxRQUFELENBQUEsRUFQQTs7SUFTQSxXQUFBLEdBQWM7SUFDZCxJQUFHLHlCQUFBLElBQXFCLEdBQUcsQ0FBQyxXQUFKLEtBQW1CLEtBQTNDO01BQ0UsV0FBQSxHQUFjLE1BRGhCOztJQUVBLElBQUcsV0FBSDtNQUNFLFdBQUEsR0FBYyxJQUFDLENBQUEsV0FBRCxDQUFhLFVBQWIsRUFDWjtRQUFBLFFBQUEsRUFBVSxXQUFWO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUdBLFNBQUEsRUFBVztNQUhYLENBRFksRUFEaEI7S0FaQTs7SUFtQkEsU0FBQSxHQUFZO0lBQ1osSUFBRyx1QkFBQSxJQUFtQixHQUFHLENBQUMsU0FBSixLQUFpQixLQUF2QztNQUNFLFNBQUEsR0FBWSxNQURkOztJQUVBLElBQUcsU0FBSDthQUNFLFNBQUEsR0FBWSxJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWIsRUFDVjtRQUFBLFFBQUEsRUFBVSxTQUFWO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUVBLFNBQUEsRUFBVyxHQUZYO1FBSUEsU0FBQSxFQUFXO01BSlgsQ0FEVSxFQURkOztFQXZCYSxDQUhmO0VBa0NBLFFBQUEsRUFBVSxRQUFBLENBQUEsQ0FBQTtBQUNSLFFBQUEsU0FBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUE7SUFBQSxHQUFBLEdBQU0sSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNmLFNBQUEsa0JBQVksR0FBRyxDQUFFLGdCQUFMLElBQWU7SUFDM0IsVUFBQSxHQUFhLEdBQUcsQ0FBQztJQUNqQixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsR0FBRyxDQUFDLGFBQWxCLEVBSFQ7O0lBS0EsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFmLENBQXNCO01BQUEsRUFBQSxpQkFBSSxHQUFHLENBQUUsbUJBQUwsSUFBa0I7SUFBdEIsQ0FBdEIsQ0FBWDtXQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtFQVBRLENBbENWO0VBMkNBLE9BQUEsRUFBUyxRQUFBLENBQUEsQ0FBQTtBQUNQLFFBQUE7SUFBQSxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVixDQUFIOzs7O01BSUUsQ0FBQSxHQUFJLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjthQUNKLENBQUMsQ0FBQyxhQUFGLENBQUEsRUFMRjs7RUFETztBQTNDVCxDQURPOztBQW9EVCxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE1lc3NhZ2VzQXBwIGZyb20gJy4vdGttZXNzYWdlcydcbmltcG9ydCBOYXZiYXJBcHAgZnJvbSAnLi90a25hdmJhcidcbmltcG9ydCBNYWluUGFnZUxheW91dCBmcm9tICcuL3RrbGF5b3V0J1xuXG5pZiBfX3VzZUNzc01vZHVsZXNfX1xuICByZXF1aXJlIFwiLi4vc2Fzcy90a2xheW91dC5zY3NzXCJcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIFRrQXBwU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICBzdGFydEhpc3Rvcnk6IHRydWVcbiAgICBhcHBDb25maWc6IHt9XG4gICAgXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblRvcEFwcCA9IFRvb2xraXQuQXBwLmV4dGVuZFxuICBTdGF0ZU1vZGVsOiBUa0FwcFN0YXRlXG4gIG9wdGlvbnM6XG4gICAgYXBwQ29uZmlnOiB7fVxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIGNvbnNvbGUud2FybiBcIm9uQmVmb3JlU3RhcnRcIlxuICAgIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpvYmplY3QnLCA9PlxuICAgICAgQFxuICAgIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjb25maWcnLCA9PlxuICAgICAgQGdldE9wdGlvbiAnYXBwQ29uZmlnJ1xuICAgIGNmZyA9IEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICAjIGJ1aWxkIG1haW4gcGFnZSBsYXlvdXRcbiAgICBAaW5pdFBhZ2UoKVxuICAgICMgc2V0dXAgbWVzc2FnZXNcbiAgICB1c2VNZXNzYWdlcyA9IHRydWVcbiAgICBpZiBjZmcudXNlTWVzc2FnZXM/IGFuZCBjZmcudXNlTWVzc2FnZXMgaXMgZmFsc2VcbiAgICAgIHVzZU1lc3NhZ2VzID0gZmFsc2VcbiAgICBpZiB1c2VNZXNzYWdlc1xuICAgICAgbWVzc2FnZXNBcHAgPSBAYWRkQ2hpbGRBcHAgJ21lc3NhZ2VzJyxcbiAgICAgICAgQXBwQ2xhc3M6IE1lc3NhZ2VzQXBwXG4gICAgICAgIHN0YXJ0V2l0aFBhcmVudDogdHJ1ZVxuICAgICAgICAsXG4gICAgICAgIHBhcmVudEFwcDogQFxuICAgICMgc2V0dXAgbmF2YmFyXG4gICAgdXNlTmF2YmFyID0gdHJ1ZVxuICAgIGlmIGNmZy51c2VOYXZiYXI/IGFuZCBjZmcudXNlTmF2YmFyIGlzIGZhbHNlXG4gICAgICB1c2VOYXZiYXIgPSBmYWxzZVxuICAgIGlmIHVzZU5hdmJhclxuICAgICAgbmF2YmFyQXBwID0gQGFkZENoaWxkQXBwICduYXZiYXInLFxuICAgICAgICBBcHBDbGFzczogTmF2YmFyQXBwXG4gICAgICAgIHN0YXJ0V2l0aFBhcmVudDogdHJ1ZVxuICAgICAgICBhcHBDb25maWc6IGNmZ1xuICAgICAgICAsXG4gICAgICAgIHBhcmVudEFwcDogQFxuICAgICAgICBcbiAgaW5pdFBhZ2U6IC0+XG4gICAgY2ZnID0gQG9wdGlvbnMuYXBwQ29uZmlnXG4gICAgQXBwTGF5b3V0ID0gY2ZnPy5sYXlvdXQgb3IgTWFpblBhZ2VMYXlvdXRcbiAgICBsYXlvdXRPcHRzID0gY2ZnLmxheW91dE9wdGlvbnNcbiAgICBsYXlvdXQgPSBuZXcgQXBwTGF5b3V0IGNmZy5sYXlvdXRPcHRpb25zXG4gICAgIyBGSVhNRSAtIHRlc3QgZm9yIHJlZ2lvbiBjbGFzc1xuICAgIEBzZXRSZWdpb24gbmV3IE1hcmlvbmV0dGUuUmVnaW9uIGVsOiBjZmc/LmFwcFJlZ2lvbiBvciAnYm9keSdcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogLT5cbiAgICBpZiBAZ2V0U3RhdGUgJ3N0YXJ0SGlzdG9yeSdcbiAgICAgICMgRklYTUUgd2UgbmVlZCBzb21ldGhpbmcgYmV0dGVyXG4gICAgICAjIHdlIHNlZW0gdG8gYmUgcmVxdWlyZWQgdG8sIGF0IG1pbmltdW0sIGxvYWRcbiAgICAgICMgdGhlIGZyb250ZG9vciBhbmQgaGFuZGxlIHRoZSBcImVtcHR5XCIgcm91dGVcbiAgICAgIGMgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLWNvbnRyb2xsZXInXG4gICAgICBjLmxvYWRGcm9udERvb3IoKVxuICAgICAgXG5leHBvcnQgZGVmYXVsdCBUb3BBcHBcblxuXG4iXX0=
