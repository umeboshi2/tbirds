var MainChannel, TkAppState, TopApp;

import Backbone from 'backbone';

import {
  Region
} from 'backbone.marionette';

import {
  App
} from 'marionette.toolkit';

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

TopApp = App.extend({
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
    this.setRegion(new Region({
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsR0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxXQUFQLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBQ0EsT0FBTyxjQUFQLE1BQUE7O0FBRUEsSUFBRyxpQkFBSDtFQUNFLE9BQUEsQ0FBUSx1QkFBUixFQURGOzs7QUFHQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVSO0VBQU4sTUFBQSxXQUFBLFFBQXlCLFFBQVEsQ0FBQyxNQUFsQyxDQUFBOzt1QkFDRSxRQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsSUFBZDtJQUNBLFNBQUEsRUFBVyxDQUFBO0VBRFg7Ozs7OztBQUdKLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsTUFBQSxHQUFTLEdBQUcsQ0FBQyxNQUFKLENBQ1A7RUFBQSxVQUFBLEVBQVksVUFBWjtFQUNBLE9BQUEsRUFDRTtJQUFBLFNBQUEsRUFBVyxDQUFBO0VBQVgsQ0FGRjtFQUdBLGFBQUEsRUFBZSxRQUFBLENBQUEsQ0FBQTtBQUNiLFFBQUEsR0FBQSxFQUFBLFdBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBO0lBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxlQUFiO0lBQ0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DO0lBRG1DLENBQXJDO0lBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtJQURtQyxDQUFyQztJQUVBLEdBQUEsR0FBTSxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVgsRUFMTjs7SUFPQSxJQUFDLENBQUEsUUFBRCxDQUFBLEVBUEE7O0lBU0EsV0FBQSxHQUFjO0lBQ2QsSUFBRyx5QkFBQSxJQUFxQixHQUFHLENBQUMsV0FBSixLQUFtQixLQUEzQztNQUNFLFdBQUEsR0FBYyxNQURoQjs7SUFFQSxJQUFHLFdBQUg7TUFDRSxXQUFBLEdBQWMsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLEVBQ1o7UUFBQSxRQUFBLEVBQVUsV0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFHQSxTQUFBLEVBQVc7TUFIWCxDQURZLEVBRGhCO0tBWkE7O0lBbUJBLFNBQUEsR0FBWTtJQUNaLElBQUcsdUJBQUEsSUFBbUIsR0FBRyxDQUFDLFNBQUosS0FBaUIsS0FBdkM7TUFDRSxTQUFBLEdBQVksTUFEZDs7SUFFQSxJQUFHLFNBQUg7YUFDRSxTQUFBLEdBQVksSUFBQyxDQUFBLFdBQUQsQ0FBYSxRQUFiLEVBQ1Y7UUFBQSxRQUFBLEVBQVUsU0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFFQSxTQUFBLEVBQVcsR0FGWDtRQUlBLFNBQUEsRUFBVztNQUpYLENBRFUsRUFEZDs7RUF2QmEsQ0FIZjtFQWtDQSxRQUFBLEVBQVUsUUFBQSxDQUFBLENBQUE7QUFDUixRQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBO0lBQUEsR0FBQSxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixTQUFBLGtCQUFZLEdBQUcsQ0FBRSxnQkFBTCxJQUFlO0lBQzNCLFVBQUEsR0FBYSxHQUFHLENBQUM7SUFDakIsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLEdBQUcsQ0FBQyxhQUFsQixFQUhUOztJQUtBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxNQUFKLENBQVc7TUFBQSxFQUFBLGlCQUFJLEdBQUcsQ0FBRSxtQkFBTCxJQUFrQjtJQUF0QixDQUFYLENBQVg7V0FDQSxJQUFDLENBQUEsUUFBRCxDQUFVLE1BQVY7RUFQUSxDQWxDVjtFQTJDQSxPQUFBLEVBQVMsUUFBQSxDQUFBLENBQUE7QUFDUCxRQUFBO0lBQUEsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLGNBQVYsQ0FBSDs7OztNQUlFLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7YUFDSixDQUFDLENBQUMsYUFBRixDQUFBLEVBTEY7O0VBRE87QUEzQ1QsQ0FETzs7QUFvRFQsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB7IEFwcCB9IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBNZXNzYWdlc0FwcCBmcm9tICcuL3RrbWVzc2FnZXMnXG5pbXBvcnQgTmF2YmFyQXBwIGZyb20gJy4vdGtuYXZiYXInXG5pbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uL3Nhc3MvdGtsYXlvdXQuc2Nzc1wiXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBUa0FwcFN0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgc3RhcnRIaXN0b3J5OiB0cnVlXG4gICAgYXBwQ29uZmlnOiB7fVxuICAgIFxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5Ub3BBcHAgPSBBcHAuZXh0ZW5kXG4gIFN0YXRlTW9kZWw6IFRrQXBwU3RhdGVcbiAgb3B0aW9uczpcbiAgICBhcHBDb25maWc6IHt9XG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgY29uc29sZS53YXJuIFwib25CZWZvcmVTdGFydFwiXG4gICAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOm9iamVjdCcsID0+XG4gICAgICBAXG4gICAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmNvbmZpZycsID0+XG4gICAgICBAZ2V0T3B0aW9uICdhcHBDb25maWcnXG4gICAgY2ZnID0gQGdldE9wdGlvbiAnYXBwQ29uZmlnJ1xuICAgICMgYnVpbGQgbWFpbiBwYWdlIGxheW91dFxuICAgIEBpbml0UGFnZSgpXG4gICAgIyBzZXR1cCBtZXNzYWdlc1xuICAgIHVzZU1lc3NhZ2VzID0gdHJ1ZVxuICAgIGlmIGNmZy51c2VNZXNzYWdlcz8gYW5kIGNmZy51c2VNZXNzYWdlcyBpcyBmYWxzZVxuICAgICAgdXNlTWVzc2FnZXMgPSBmYWxzZVxuICAgIGlmIHVzZU1lc3NhZ2VzXG4gICAgICBtZXNzYWdlc0FwcCA9IEBhZGRDaGlsZEFwcCAnbWVzc2FnZXMnLFxuICAgICAgICBBcHBDbGFzczogTWVzc2FnZXNBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgIyBzZXR1cCBuYXZiYXJcbiAgICB1c2VOYXZiYXIgPSB0cnVlXG4gICAgaWYgY2ZnLnVzZU5hdmJhcj8gYW5kIGNmZy51c2VOYXZiYXIgaXMgZmFsc2VcbiAgICAgIHVzZU5hdmJhciA9IGZhbHNlXG4gICAgaWYgdXNlTmF2YmFyXG4gICAgICBuYXZiYXJBcHAgPSBAYWRkQ2hpbGRBcHAgJ25hdmJhcicsXG4gICAgICAgIEFwcENsYXNzOiBOYXZiYXJBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogY2ZnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBpbml0UGFnZTogLT5cbiAgICBjZmcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBBcHBMYXlvdXQgPSBjZmc/LmxheW91dCBvciBNYWluUGFnZUxheW91dFxuICAgIGxheW91dE9wdHMgPSBjZmcubGF5b3V0T3B0aW9uc1xuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgY2ZnLmxheW91dE9wdGlvbnNcbiAgICAjIEZJWE1FIC0gdGVzdCBmb3IgcmVnaW9uIGNsYXNzXG4gICAgQHNldFJlZ2lvbiBuZXcgUmVnaW9uIGVsOiBjZmc/LmFwcFJlZ2lvbiBvciAnYm9keSdcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogLT5cbiAgICBpZiBAZ2V0U3RhdGUgJ3N0YXJ0SGlzdG9yeSdcbiAgICAgICMgRklYTUUgd2UgbmVlZCBzb21ldGhpbmcgYmV0dGVyXG4gICAgICAjIHdlIHNlZW0gdG8gYmUgcmVxdWlyZWQgdG8sIGF0IG1pbmltdW0sIGxvYWRcbiAgICAgICMgdGhlIGZyb250ZG9vciBhbmQgaGFuZGxlIHRoZSBcImVtcHR5XCIgcm91dGVcbiAgICAgIGMgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLWNvbnRyb2xsZXInXG4gICAgICBjLmxvYWRGcm9udERvb3IoKVxuICAgICAgXG5leHBvcnQgZGVmYXVsdCBUb3BBcHBcblxuXG4iXX0=
