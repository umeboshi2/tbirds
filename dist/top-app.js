var MainChannel, TkAppState, TopApp;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import MessagesApp from './tkmessages';

import NavbarApp from './tknavbar';

import MainPageLayout from './tklayout';

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
    MainChannel.reply('main:app:object', () => {
      return this;
    });
    MainChannel.reply('main:app:config', () => {
      return this.getOption('appConfig');
    });
    cfg = this.getOption('appConfig');
    // FIXME - test for region class
    this.setRegion(new Marionette.Region({
      el: (cfg != null ? cfg.appRegion : void 0) || 'body'
    }));
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
    return this.showView(layout);
  },
  onStart: function() {
    var c;
    // build main page layout
    this.initPage();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUNBLE9BQU8sU0FBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVI7RUFBTixNQUFBLFdBQUEsUUFBeUIsUUFBUSxDQUFDLE1BQWxDLENBQUE7O3VCQUNFLFFBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxJQUFkO0lBQ0EsU0FBQSxFQUFXLENBQUE7RUFEWDs7Ozs7O0FBR0osV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxNQUFBLEdBQVMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFaLENBQ1A7RUFBQSxVQUFBLEVBQVksVUFBWjtFQUNBLE9BQUEsRUFDRTtJQUFBLFNBQUEsRUFBVyxDQUFBO0VBQVgsQ0FGRjtFQUdBLGFBQUEsRUFBZSxRQUFBLENBQUEsQ0FBQTtBQUNiLFFBQUEsR0FBQSxFQUFBLFdBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBO0lBQUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DO0lBRG1DLENBQXJDO0lBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtJQURtQyxDQUFyQztJQUVBLEdBQUEsR0FBTSxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVgsRUFKTjs7SUFNQSxJQUFDLENBQUEsU0FBRCxDQUFXLElBQUksVUFBVSxDQUFDLE1BQWYsQ0FBc0I7TUFBQSxFQUFBLGlCQUFJLEdBQUcsQ0FBRSxtQkFBTCxJQUFrQjtJQUF0QixDQUF0QixDQUFYLEVBTkE7O0lBUUEsV0FBQSxHQUFjO0lBQ2QsSUFBRyx5QkFBQSxJQUFxQixHQUFHLENBQUMsV0FBSixLQUFtQixLQUEzQztNQUNFLFdBQUEsR0FBYyxNQURoQjs7SUFFQSxJQUFHLFdBQUg7TUFDRSxXQUFBLEdBQWMsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLEVBQ1o7UUFBQSxRQUFBLEVBQVUsV0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFHQSxTQUFBLEVBQVc7TUFIWCxDQURZLEVBRGhCO0tBWEE7O0lBa0JBLFNBQUEsR0FBWTtJQUNaLElBQUcsdUJBQUEsSUFBbUIsR0FBRyxDQUFDLFNBQUosS0FBaUIsS0FBdkM7TUFDRSxTQUFBLEdBQVksTUFEZDs7SUFFQSxJQUFHLFNBQUg7YUFDRSxTQUFBLEdBQVksSUFBQyxDQUFBLFdBQUQsQ0FBYSxRQUFiLEVBQ1Y7UUFBQSxRQUFBLEVBQVUsU0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFFQSxTQUFBLEVBQVcsR0FGWDtRQUlBLFNBQUEsRUFBVztNQUpYLENBRFUsRUFEZDs7RUF0QmEsQ0FIZjtFQWlDQSxRQUFBLEVBQVUsUUFBQSxDQUFBLENBQUE7QUFDUixRQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBO0lBQUEsR0FBQSxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixTQUFBLGtCQUFZLEdBQUcsQ0FBRSxnQkFBTCxJQUFlO0lBQzNCLFVBQUEsR0FBYSxHQUFHLENBQUM7SUFDakIsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLEdBQUcsQ0FBQyxhQUFsQjtXQUNULElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtFQUxRLENBakNWO0VBd0NBLE9BQUEsRUFBUyxRQUFBLENBQUEsQ0FBQTtBQUVQLFFBQUEsQ0FBQTs7SUFBQSxJQUFDLENBQUEsUUFBRCxDQUFBO0lBQ0EsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLGNBQVYsQ0FBSDs7OztNQUlFLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7YUFDSixDQUFDLENBQUMsYUFBRixDQUFBLEVBTEY7O0VBSE87QUF4Q1QsQ0FETzs7QUFtRFQsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBNZXNzYWdlc0FwcCBmcm9tICcuL3RrbWVzc2FnZXMnXG5pbXBvcnQgTmF2YmFyQXBwIGZyb20gJy4vdGtuYXZiYXInXG5pbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIFRrQXBwU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICBzdGFydEhpc3Rvcnk6IHRydWVcbiAgICBhcHBDb25maWc6IHt9XG4gICAgXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblRvcEFwcCA9IFRvb2xraXQuQXBwLmV4dGVuZFxuICBTdGF0ZU1vZGVsOiBUa0FwcFN0YXRlXG4gIG9wdGlvbnM6XG4gICAgYXBwQ29uZmlnOiB7fVxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpvYmplY3QnLCA9PlxuICAgICAgQFxuICAgIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjb25maWcnLCA9PlxuICAgICAgQGdldE9wdGlvbiAnYXBwQ29uZmlnJ1xuICAgIGNmZyA9IEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICAjIEZJWE1FIC0gdGVzdCBmb3IgcmVnaW9uIGNsYXNzXG4gICAgQHNldFJlZ2lvbiBuZXcgTWFyaW9uZXR0ZS5SZWdpb24gZWw6IGNmZz8uYXBwUmVnaW9uIG9yICdib2R5J1xuICAgICMgc2V0dXAgbWVzc2FnZXNcbiAgICB1c2VNZXNzYWdlcyA9IHRydWVcbiAgICBpZiBjZmcudXNlTWVzc2FnZXM/IGFuZCBjZmcudXNlTWVzc2FnZXMgaXMgZmFsc2VcbiAgICAgIHVzZU1lc3NhZ2VzID0gZmFsc2VcbiAgICBpZiB1c2VNZXNzYWdlc1xuICAgICAgbWVzc2FnZXNBcHAgPSBAYWRkQ2hpbGRBcHAgJ21lc3NhZ2VzJyxcbiAgICAgICAgQXBwQ2xhc3M6IE1lc3NhZ2VzQXBwXG4gICAgICAgIHN0YXJ0V2l0aFBhcmVudDogdHJ1ZVxuICAgICAgICAsXG4gICAgICAgIHBhcmVudEFwcDogQFxuICAgICMgc2V0dXAgbmF2YmFyXG4gICAgdXNlTmF2YmFyID0gdHJ1ZVxuICAgIGlmIGNmZy51c2VOYXZiYXI/IGFuZCBjZmcudXNlTmF2YmFyIGlzIGZhbHNlXG4gICAgICB1c2VOYXZiYXIgPSBmYWxzZVxuICAgIGlmIHVzZU5hdmJhclxuICAgICAgbmF2YmFyQXBwID0gQGFkZENoaWxkQXBwICduYXZiYXInLFxuICAgICAgICBBcHBDbGFzczogTmF2YmFyQXBwXG4gICAgICAgIHN0YXJ0V2l0aFBhcmVudDogdHJ1ZVxuICAgICAgICBhcHBDb25maWc6IGNmZ1xuICAgICAgICAsXG4gICAgICAgIHBhcmVudEFwcDogQFxuICAgICAgICBcbiAgaW5pdFBhZ2U6IC0+XG4gICAgY2ZnID0gQG9wdGlvbnMuYXBwQ29uZmlnXG4gICAgQXBwTGF5b3V0ID0gY2ZnPy5sYXlvdXQgb3IgTWFpblBhZ2VMYXlvdXRcbiAgICBsYXlvdXRPcHRzID0gY2ZnLmxheW91dE9wdGlvbnNcbiAgICBsYXlvdXQgPSBuZXcgQXBwTGF5b3V0IGNmZy5sYXlvdXRPcHRpb25zXG4gICAgQHNob3dWaWV3IGxheW91dFxuXG4gIG9uU3RhcnQ6IC0+XG4gICAgIyBidWlsZCBtYWluIHBhZ2UgbGF5b3V0XG4gICAgQGluaXRQYWdlKClcbiAgICBpZiBAZ2V0U3RhdGUgJ3N0YXJ0SGlzdG9yeSdcbiAgICAgICMgRklYTUUgd2UgbmVlZCBzb21ldGhpbmcgYmV0dGVyXG4gICAgICAjIHdlIHNlZW0gdG8gYmUgcmVxdWlyZWQgdG8sIGF0IG1pbmltdW0sIGxvYWRcbiAgICAgICMgdGhlIGZyb250ZG9vciBhbmQgaGFuZGxlIHRoZSBcImVtcHR5XCIgcm91dGVcbiAgICAgIGMgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLWNvbnRyb2xsZXInXG4gICAgICBjLmxvYWRGcm9udERvb3IoKVxuICAgICAgXG5leHBvcnQgZGVmYXVsdCBUb3BBcHBcblxuXG4iXX0=
