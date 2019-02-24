var MainChannel, TkAppState, TopApp;

import Backbone from 'backbone';

import {
  Region
} from 'backbone.marionette';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLE9BQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFDQSxPQUFPLGNBQVAsTUFBQTs7QUFFQSxJQUFHLGlCQUFIO0VBQ0UsT0FBQSxDQUFRLHVCQUFSLEVBREY7OztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVI7RUFBTixNQUFBLFdBQUEsUUFBeUIsUUFBUSxDQUFDLE1BQWxDLENBQUE7O3VCQUNFLFFBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxJQUFkO0lBQ0EsU0FBQSxFQUFXLENBQUE7RUFEWDs7Ozs7O0FBR0osV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxNQUFBLEdBQVMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFaLENBQ1A7RUFBQSxVQUFBLEVBQVksVUFBWjtFQUNBLE9BQUEsRUFDRTtJQUFBLFNBQUEsRUFBVyxDQUFBO0VBQVgsQ0FGRjtFQUdBLGFBQUEsRUFBZSxRQUFBLENBQUEsQ0FBQTtBQUNiLFFBQUEsR0FBQSxFQUFBLFdBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBO0lBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxlQUFiO0lBQ0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DO0lBRG1DLENBQXJDO0lBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtJQURtQyxDQUFyQztJQUVBLEdBQUEsR0FBTSxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVgsRUFMTjs7SUFPQSxJQUFDLENBQUEsUUFBRCxDQUFBLEVBUEE7O0lBU0EsV0FBQSxHQUFjO0lBQ2QsSUFBRyx5QkFBQSxJQUFxQixHQUFHLENBQUMsV0FBSixLQUFtQixLQUEzQztNQUNFLFdBQUEsR0FBYyxNQURoQjs7SUFFQSxJQUFHLFdBQUg7TUFDRSxXQUFBLEdBQWMsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLEVBQ1o7UUFBQSxRQUFBLEVBQVUsV0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFHQSxTQUFBLEVBQVc7TUFIWCxDQURZLEVBRGhCO0tBWkE7O0lBbUJBLFNBQUEsR0FBWTtJQUNaLElBQUcsdUJBQUEsSUFBbUIsR0FBRyxDQUFDLFNBQUosS0FBaUIsS0FBdkM7TUFDRSxTQUFBLEdBQVksTUFEZDs7SUFFQSxJQUFHLFNBQUg7YUFDRSxTQUFBLEdBQVksSUFBQyxDQUFBLFdBQUQsQ0FBYSxRQUFiLEVBQ1Y7UUFBQSxRQUFBLEVBQVUsU0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFFQSxTQUFBLEVBQVcsR0FGWDtRQUlBLFNBQUEsRUFBVztNQUpYLENBRFUsRUFEZDs7RUF2QmEsQ0FIZjtFQWtDQSxRQUFBLEVBQVUsUUFBQSxDQUFBLENBQUE7QUFDUixRQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBO0lBQUEsR0FBQSxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixTQUFBLGtCQUFZLEdBQUcsQ0FBRSxnQkFBTCxJQUFlO0lBQzNCLFVBQUEsR0FBYSxHQUFHLENBQUM7SUFDakIsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLEdBQUcsQ0FBQyxhQUFsQixFQUhUOztJQUtBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxNQUFKLENBQVc7TUFBQSxFQUFBLGlCQUFJLEdBQUcsQ0FBRSxtQkFBTCxJQUFrQjtJQUF0QixDQUFYLENBQVg7V0FDQSxJQUFDLENBQUEsUUFBRCxDQUFVLE1BQVY7RUFQUSxDQWxDVjtFQTJDQSxPQUFBLEVBQVMsUUFBQSxDQUFBLENBQUE7QUFDUCxRQUFBO0lBQUEsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLGNBQVYsQ0FBSDs7OztNQUlFLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7YUFDSixDQUFDLENBQUMsYUFBRixDQUFBLEVBTEY7O0VBRE87QUEzQ1QsQ0FETzs7QUFvRFQsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBNZXNzYWdlc0FwcCBmcm9tICcuL3RrbWVzc2FnZXMnXG5pbXBvcnQgTmF2YmFyQXBwIGZyb20gJy4vdGtuYXZiYXInXG5pbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uL3Nhc3MvdGtsYXlvdXQuc2Nzc1wiXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBUa0FwcFN0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgc3RhcnRIaXN0b3J5OiB0cnVlXG4gICAgYXBwQ29uZmlnOiB7fVxuICAgIFxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5Ub3BBcHAgPSBUb29sa2l0LkFwcC5leHRlbmRcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBvcHRpb25zOlxuICAgIGFwcENvbmZpZzoge31cbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBjb25zb2xlLndhcm4gXCJvbkJlZm9yZVN0YXJ0XCJcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6b2JqZWN0JywgPT5cbiAgICAgIEBcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y29uZmlnJywgPT5cbiAgICAgIEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICBjZmcgPSBAZ2V0T3B0aW9uICdhcHBDb25maWcnXG4gICAgIyBidWlsZCBtYWluIHBhZ2UgbGF5b3V0XG4gICAgQGluaXRQYWdlKClcbiAgICAjIHNldHVwIG1lc3NhZ2VzXG4gICAgdXNlTWVzc2FnZXMgPSB0cnVlXG4gICAgaWYgY2ZnLnVzZU1lc3NhZ2VzPyBhbmQgY2ZnLnVzZU1lc3NhZ2VzIGlzIGZhbHNlXG4gICAgICB1c2VNZXNzYWdlcyA9IGZhbHNlXG4gICAgaWYgdXNlTWVzc2FnZXNcbiAgICAgIG1lc3NhZ2VzQXBwID0gQGFkZENoaWxkQXBwICdtZXNzYWdlcycsXG4gICAgICAgIEFwcENsYXNzOiBNZXNzYWdlc0FwcFxuICAgICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgICAgLFxuICAgICAgICBwYXJlbnRBcHA6IEBcbiAgICAjIHNldHVwIG5hdmJhclxuICAgIHVzZU5hdmJhciA9IHRydWVcbiAgICBpZiBjZmcudXNlTmF2YmFyPyBhbmQgY2ZnLnVzZU5hdmJhciBpcyBmYWxzZVxuICAgICAgdXNlTmF2YmFyID0gZmFsc2VcbiAgICBpZiB1c2VOYXZiYXJcbiAgICAgIG5hdmJhckFwcCA9IEBhZGRDaGlsZEFwcCAnbmF2YmFyJyxcbiAgICAgICAgQXBwQ2xhc3M6IE5hdmJhckFwcFxuICAgICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgICAgYXBwQ29uZmlnOiBjZmdcbiAgICAgICAgLFxuICAgICAgICBwYXJlbnRBcHA6IEBcbiAgICAgICAgXG4gIGluaXRQYWdlOiAtPlxuICAgIGNmZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgIEFwcExheW91dCA9IGNmZz8ubGF5b3V0IG9yIE1haW5QYWdlTGF5b3V0XG4gICAgbGF5b3V0T3B0cyA9IGNmZy5sYXlvdXRPcHRpb25zXG4gICAgbGF5b3V0ID0gbmV3IEFwcExheW91dCBjZmcubGF5b3V0T3B0aW9uc1xuICAgICMgRklYTUUgLSB0ZXN0IGZvciByZWdpb24gY2xhc3NcbiAgICBAc2V0UmVnaW9uIG5ldyBSZWdpb24gZWw6IGNmZz8uYXBwUmVnaW9uIG9yICdib2R5J1xuICAgIEBzaG93VmlldyBsYXlvdXRcblxuICBvblN0YXJ0OiAtPlxuICAgIGlmIEBnZXRTdGF0ZSAnc3RhcnRIaXN0b3J5J1xuICAgICAgIyBGSVhNRSB3ZSBuZWVkIHNvbWV0aGluZyBiZXR0ZXJcbiAgICAgICMgd2Ugc2VlbSB0byBiZSByZXF1aXJlZCB0bywgYXQgbWluaW11bSwgbG9hZFxuICAgICAgIyB0aGUgZnJvbnRkb29yIGFuZCBoYW5kbGUgdGhlIFwiZW1wdHlcIiByb3V0ZVxuICAgICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICAgIGMubG9hZEZyb250RG9vcigpXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IFRvcEFwcFxuXG5cbiJdfQ==
