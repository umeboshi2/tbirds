var MainChannel, TkAppState, TopApp;

import {
  Model,
  Radio
} from 'backbone';

import {
  Region
} from 'backbone.marionette';

import {
  App
} from 'marionette.toolkit';

import MessagesApp from './tkmessages';

import NavbarApp from './tknavbar';

import MainPageLayout from './tklayout';

MainChannel = Radio.channel('global');

TkAppState = (function() {
  class TkAppState extends Model {};

  TkAppState.prototype.defaults = {
    startHistory: true,
    appConfig: {}
  };

  return TkAppState;

}).call(this);

TopApp = App.extend({
  StateModel: TkAppState,
  options: {
    appConfig: {}
  },
  onBeforeStart: function() {
    var cfg, useMessages, useNavbar;
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
      this.addChildApp('messages', {
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
      return this.addChildApp('navbar', {
        AppClass: NavbarApp,
        startWithParent: true,
        appConfig: cfg,
        parentApp: this
      });
    }
  },
  initPage: function() {
    var AppLayout, cfg, layout;
    cfg = this.options.appConfig;
    AppLayout = (cfg != null ? cfg.layout : void 0) || MainPageLayout;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEdBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUNBLE9BQU8sU0FBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBRVI7RUFBTixNQUFBLFdBQUEsUUFBeUIsTUFBekIsQ0FBQTs7dUJBQ0UsUUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLElBQWQ7SUFDQSxTQUFBLEVBQVcsQ0FBQTtFQURYOzs7Ozs7QUFHSixNQUFBLEdBQVMsR0FBRyxDQUFDLE1BQUosQ0FDUDtFQUFBLFVBQUEsRUFBWSxVQUFaO0VBQ0EsT0FBQSxFQUNFO0lBQUEsU0FBQSxFQUFXLENBQUE7RUFBWCxDQUZGO0VBR0EsYUFBQSxFQUFlLFFBQUEsQ0FBQSxDQUFBO0FBQ2pCLFFBQUEsR0FBQSxFQUFBLFdBQUEsRUFBQTtJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsZUFBYjtJQUNBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxDQUFBLENBQUEsR0FBQTthQUNuQztJQURtQyxDQUFyQztJQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxDQUFBLENBQUEsR0FBQTthQUNuQyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVg7SUFEbUMsQ0FBckM7SUFFQSxHQUFBLEdBQU0sSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYLEVBTFY7O0lBT0ksSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQVBKOztJQVNJLFdBQUEsR0FBYztJQUNkLElBQUcseUJBQUEsSUFBcUIsR0FBRyxDQUFDLFdBQUosS0FBbUIsS0FBM0M7TUFDRSxXQUFBLEdBQWMsTUFEaEI7O0lBRUEsSUFBRyxXQUFIO01BQ0UsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLEVBQ0U7UUFBQSxRQUFBLEVBQVUsV0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFHQSxTQUFBLEVBQVc7TUFIWCxDQURGLEVBREY7S0FaSjs7SUFtQkksU0FBQSxHQUFZO0lBQ1osSUFBRyx1QkFBQSxJQUFtQixHQUFHLENBQUMsU0FBSixLQUFpQixLQUF2QztNQUNFLFNBQUEsR0FBWSxNQURkOztJQUVBLElBQUcsU0FBSDthQUNFLElBQUMsQ0FBQSxXQUFELENBQWEsUUFBYixFQUNFO1FBQUEsUUFBQSxFQUFVLFNBQVY7UUFDQSxlQUFBLEVBQWlCLElBRGpCO1FBRUEsU0FBQSxFQUFXLEdBRlg7UUFJQSxTQUFBLEVBQVc7TUFKWCxDQURGLEVBREY7O0VBdkJhLENBSGY7RUFrQ0EsUUFBQSxFQUFVLFFBQUEsQ0FBQSxDQUFBO0FBQ1osUUFBQSxTQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUksR0FBQSxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixTQUFBLGtCQUFZLEdBQUcsQ0FBRSxnQkFBTCxJQUFlO0lBQzNCLE1BQUEsR0FBUyxJQUFJLFNBQUosQ0FBYyxHQUFHLENBQUMsYUFBbEIsRUFGYjs7SUFJSSxJQUFDLENBQUEsU0FBRCxDQUFXLElBQUksTUFBSixDQUFXO01BQUEsRUFBQSxpQkFBSSxHQUFHLENBQUUsbUJBQUwsSUFBa0I7SUFBdEIsQ0FBWCxDQUFYO1dBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0VBTlEsQ0FsQ1Y7RUEwQ0EsT0FBQSxFQUFTLFFBQUEsQ0FBQSxDQUFBO0FBQ1gsUUFBQTtJQUFJLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxjQUFWLENBQUg7Ozs7TUFJRSxDQUFBLEdBQUksV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO2FBQ0osQ0FBQyxDQUFDLGFBQUYsQ0FBQSxFQUxGOztFQURPO0FBMUNULENBRE87O0FBbURULE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsLCBSYWRpbyB9IGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB7IEFwcCB9IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcblxuaW1wb3J0IE1lc3NhZ2VzQXBwIGZyb20gJy4vdGttZXNzYWdlcydcbmltcG9ydCBOYXZiYXJBcHAgZnJvbSAnLi90a25hdmJhcidcbmltcG9ydCBNYWluUGFnZUxheW91dCBmcm9tICcuL3RrbGF5b3V0J1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgVGtBcHBTdGF0ZSBleHRlbmRzIE1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHN0YXJ0SGlzdG9yeTogdHJ1ZVxuICAgIGFwcENvbmZpZzoge31cbiAgICBcblRvcEFwcCA9IEFwcC5leHRlbmRcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBvcHRpb25zOlxuICAgIGFwcENvbmZpZzoge31cbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBjb25zb2xlLndhcm4gXCJvbkJlZm9yZVN0YXJ0XCJcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6b2JqZWN0JywgPT5cbiAgICAgIEBcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y29uZmlnJywgPT5cbiAgICAgIEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICBjZmcgPSBAZ2V0T3B0aW9uICdhcHBDb25maWcnXG4gICAgIyBidWlsZCBtYWluIHBhZ2UgbGF5b3V0XG4gICAgQGluaXRQYWdlKClcbiAgICAjIHNldHVwIG1lc3NhZ2VzXG4gICAgdXNlTWVzc2FnZXMgPSB0cnVlXG4gICAgaWYgY2ZnLnVzZU1lc3NhZ2VzPyBhbmQgY2ZnLnVzZU1lc3NhZ2VzIGlzIGZhbHNlXG4gICAgICB1c2VNZXNzYWdlcyA9IGZhbHNlXG4gICAgaWYgdXNlTWVzc2FnZXNcbiAgICAgIEBhZGRDaGlsZEFwcCAnbWVzc2FnZXMnLFxuICAgICAgICBBcHBDbGFzczogTWVzc2FnZXNBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgIyBzZXR1cCBuYXZiYXJcbiAgICB1c2VOYXZiYXIgPSB0cnVlXG4gICAgaWYgY2ZnLnVzZU5hdmJhcj8gYW5kIGNmZy51c2VOYXZiYXIgaXMgZmFsc2VcbiAgICAgIHVzZU5hdmJhciA9IGZhbHNlXG4gICAgaWYgdXNlTmF2YmFyXG4gICAgICBAYWRkQ2hpbGRBcHAgJ25hdmJhcicsXG4gICAgICAgIEFwcENsYXNzOiBOYXZiYXJBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogY2ZnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBpbml0UGFnZTogLT5cbiAgICBjZmcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBBcHBMYXlvdXQgPSBjZmc/LmxheW91dCBvciBNYWluUGFnZUxheW91dFxuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgY2ZnLmxheW91dE9wdGlvbnNcbiAgICAjIEZJWE1FIC0gdGVzdCBmb3IgcmVnaW9uIGNsYXNzXG4gICAgQHNldFJlZ2lvbiBuZXcgUmVnaW9uIGVsOiBjZmc/LmFwcFJlZ2lvbiBvciAnYm9keSdcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogLT5cbiAgICBpZiBAZ2V0U3RhdGUgJ3N0YXJ0SGlzdG9yeSdcbiAgICAgICMgRklYTUUgd2UgbmVlZCBzb21ldGhpbmcgYmV0dGVyXG4gICAgICAjIHdlIHNlZW0gdG8gYmUgcmVxdWlyZWQgdG8sIGF0IG1pbmltdW0sIGxvYWRcbiAgICAgICMgdGhlIGZyb250ZG9vciBhbmQgaGFuZGxlIHRoZSBcImVtcHR5XCIgcm91dGVcbiAgICAgIGMgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLWNvbnRyb2xsZXInXG4gICAgICBjLmxvYWRGcm9udERvb3IoKVxuICAgICAgXG5leHBvcnQgZGVmYXVsdCBUb3BBcHBcblxuXG4iXX0=
