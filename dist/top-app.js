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

if (__useCssModules__) {
  require("../sass/tklayout.scss");
}

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEdBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUNBLE9BQU8sU0FBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUVBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsdUJBQVIsRUFERjs7O0FBR0EsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFUjtFQUFOLE1BQUEsV0FBQSxRQUF5QixNQUF6QixDQUFBOzt1QkFDRSxRQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsSUFBZDtJQUNBLFNBQUEsRUFBVyxDQUFBO0VBRFg7Ozs7OztBQUdKLE1BQUEsR0FBUyxHQUFHLENBQUMsTUFBSixDQUNQO0VBQUEsVUFBQSxFQUFZLFVBQVo7RUFDQSxPQUFBLEVBQ0U7SUFBQSxTQUFBLEVBQVcsQ0FBQTtFQUFYLENBRkY7RUFHQSxhQUFBLEVBQWUsUUFBQSxDQUFBLENBQUE7QUFDakIsUUFBQSxHQUFBLEVBQUEsV0FBQSxFQUFBO0lBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxlQUFiO0lBQ0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DO0lBRG1DLENBQXJDO0lBRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2FBQ25DLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtJQURtQyxDQUFyQztJQUVBLEdBQUEsR0FBTSxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVgsRUFMVjs7SUFPSSxJQUFDLENBQUEsUUFBRCxDQUFBLEVBUEo7O0lBU0ksV0FBQSxHQUFjO0lBQ2QsSUFBRyx5QkFBQSxJQUFxQixHQUFHLENBQUMsV0FBSixLQUFtQixLQUEzQztNQUNFLFdBQUEsR0FBYyxNQURoQjs7SUFFQSxJQUFHLFdBQUg7TUFDRSxJQUFDLENBQUEsV0FBRCxDQUFhLFVBQWIsRUFDRTtRQUFBLFFBQUEsRUFBVSxXQUFWO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUdBLFNBQUEsRUFBVztNQUhYLENBREYsRUFERjtLQVpKOztJQW1CSSxTQUFBLEdBQVk7SUFDWixJQUFHLHVCQUFBLElBQW1CLEdBQUcsQ0FBQyxTQUFKLEtBQWlCLEtBQXZDO01BQ0UsU0FBQSxHQUFZLE1BRGQ7O0lBRUEsSUFBRyxTQUFIO2FBQ0UsSUFBQyxDQUFBLFdBQUQsQ0FBYSxRQUFiLEVBQ0U7UUFBQSxRQUFBLEVBQVUsU0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFFQSxTQUFBLEVBQVcsR0FGWDtRQUlBLFNBQUEsRUFBVztNQUpYLENBREYsRUFERjs7RUF2QmEsQ0FIZjtFQWtDQSxRQUFBLEVBQVUsUUFBQSxDQUFBLENBQUE7QUFDWixRQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUE7SUFBSSxHQUFBLEdBQU0sSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNmLFNBQUEsa0JBQVksR0FBRyxDQUFFLGdCQUFMLElBQWU7SUFDM0IsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLEdBQUcsQ0FBQyxhQUFsQixFQUZiOztJQUlJLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxNQUFKLENBQVc7TUFBQSxFQUFBLGlCQUFJLEdBQUcsQ0FBRSxtQkFBTCxJQUFrQjtJQUF0QixDQUFYLENBQVg7V0FDQSxJQUFDLENBQUEsUUFBRCxDQUFVLE1BQVY7RUFOUSxDQWxDVjtFQTBDQSxPQUFBLEVBQVMsUUFBQSxDQUFBLENBQUE7QUFDWCxRQUFBO0lBQUksSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLGNBQVYsQ0FBSDs7OztNQUlFLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7YUFDSixDQUFDLENBQUMsYUFBRixDQUFBLEVBTEY7O0VBRE87QUExQ1QsQ0FETzs7QUFtRFQsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwsIFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBSZWdpb24gfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuXG5pbXBvcnQgTWVzc2FnZXNBcHAgZnJvbSAnLi90a21lc3NhZ2VzJ1xuaW1wb3J0IE5hdmJhckFwcCBmcm9tICcuL3RrbmF2YmFyJ1xuaW1wb3J0IE1haW5QYWdlTGF5b3V0IGZyb20gJy4vdGtsYXlvdXQnXG5cbmlmIF9fdXNlQ3NzTW9kdWxlc19fXG4gIHJlcXVpcmUgXCIuLi9zYXNzL3RrbGF5b3V0LnNjc3NcIlxuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgVGtBcHBTdGF0ZSBleHRlbmRzIE1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHN0YXJ0SGlzdG9yeTogdHJ1ZVxuICAgIGFwcENvbmZpZzoge31cbiAgICBcblRvcEFwcCA9IEFwcC5leHRlbmRcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBvcHRpb25zOlxuICAgIGFwcENvbmZpZzoge31cbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBjb25zb2xlLndhcm4gXCJvbkJlZm9yZVN0YXJ0XCJcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6b2JqZWN0JywgPT5cbiAgICAgIEBcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y29uZmlnJywgPT5cbiAgICAgIEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICBjZmcgPSBAZ2V0T3B0aW9uICdhcHBDb25maWcnXG4gICAgIyBidWlsZCBtYWluIHBhZ2UgbGF5b3V0XG4gICAgQGluaXRQYWdlKClcbiAgICAjIHNldHVwIG1lc3NhZ2VzXG4gICAgdXNlTWVzc2FnZXMgPSB0cnVlXG4gICAgaWYgY2ZnLnVzZU1lc3NhZ2VzPyBhbmQgY2ZnLnVzZU1lc3NhZ2VzIGlzIGZhbHNlXG4gICAgICB1c2VNZXNzYWdlcyA9IGZhbHNlXG4gICAgaWYgdXNlTWVzc2FnZXNcbiAgICAgIEBhZGRDaGlsZEFwcCAnbWVzc2FnZXMnLFxuICAgICAgICBBcHBDbGFzczogTWVzc2FnZXNBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgIyBzZXR1cCBuYXZiYXJcbiAgICB1c2VOYXZiYXIgPSB0cnVlXG4gICAgaWYgY2ZnLnVzZU5hdmJhcj8gYW5kIGNmZy51c2VOYXZiYXIgaXMgZmFsc2VcbiAgICAgIHVzZU5hdmJhciA9IGZhbHNlXG4gICAgaWYgdXNlTmF2YmFyXG4gICAgICBAYWRkQ2hpbGRBcHAgJ25hdmJhcicsXG4gICAgICAgIEFwcENsYXNzOiBOYXZiYXJBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogY2ZnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBpbml0UGFnZTogLT5cbiAgICBjZmcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBBcHBMYXlvdXQgPSBjZmc/LmxheW91dCBvciBNYWluUGFnZUxheW91dFxuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgY2ZnLmxheW91dE9wdGlvbnNcbiAgICAjIEZJWE1FIC0gdGVzdCBmb3IgcmVnaW9uIGNsYXNzXG4gICAgQHNldFJlZ2lvbiBuZXcgUmVnaW9uIGVsOiBjZmc/LmFwcFJlZ2lvbiBvciAnYm9keSdcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogLT5cbiAgICBpZiBAZ2V0U3RhdGUgJ3N0YXJ0SGlzdG9yeSdcbiAgICAgICMgRklYTUUgd2UgbmVlZCBzb21ldGhpbmcgYmV0dGVyXG4gICAgICAjIHdlIHNlZW0gdG8gYmUgcmVxdWlyZWQgdG8sIGF0IG1pbmltdW0sIGxvYWRcbiAgICAgICMgdGhlIGZyb250ZG9vciBhbmQgaGFuZGxlIHRoZSBcImVtcHR5XCIgcm91dGVcbiAgICAgIGMgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLWNvbnRyb2xsZXInXG4gICAgICBjLmxvYWRGcm9udERvb3IoKVxuICAgICAgXG5leHBvcnQgZGVmYXVsdCBUb3BBcHBcblxuXG4iXX0=
