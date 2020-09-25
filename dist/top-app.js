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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEdBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUNBLE9BQU8sU0FBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUVBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsdUJBQVIsRUFERjs7O0FBR0EsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFUjtFQUFOLE1BQUEsV0FBQSxRQUF5QixNQUF6QixDQUFBOzt1QkFDRSxRQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsSUFBZDtJQUNBLFNBQUEsRUFBVyxDQUFBO0VBRFg7Ozs7OztBQUdKLE1BQUEsR0FBUyxHQUFHLENBQUMsTUFBSixDQUNQO0VBQUEsVUFBQSxFQUFZLFVBQVo7RUFDQSxPQUFBLEVBQ0U7SUFBQSxTQUFBLEVBQVcsQ0FBQTtFQUFYLENBRkY7RUFHQSxhQUFBLEVBQWUsUUFBQSxDQUFBLENBQUE7QUFDYixRQUFBLEdBQUEsRUFBQSxXQUFBLEVBQUE7SUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLGVBQWI7SUFDQSxXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsQ0FBQSxDQUFBLEdBQUE7YUFDbkM7SUFEbUMsQ0FBckM7SUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsQ0FBQSxDQUFBLEdBQUE7YUFDbkMsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO0lBRG1DLENBQXJDO0lBRUEsR0FBQSxHQUFNLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxFQUxOOztJQU9BLElBQUMsQ0FBQSxRQUFELENBQUEsRUFQQTs7SUFTQSxXQUFBLEdBQWM7SUFDZCxJQUFHLHlCQUFBLElBQXFCLEdBQUcsQ0FBQyxXQUFKLEtBQW1CLEtBQTNDO01BQ0UsV0FBQSxHQUFjLE1BRGhCOztJQUVBLElBQUcsV0FBSDtNQUNFLElBQUMsQ0FBQSxXQUFELENBQWEsVUFBYixFQUNFO1FBQUEsUUFBQSxFQUFVLFdBQVY7UUFDQSxlQUFBLEVBQWlCLElBRGpCO1FBR0EsU0FBQSxFQUFXO01BSFgsQ0FERixFQURGO0tBWkE7O0lBbUJBLFNBQUEsR0FBWTtJQUNaLElBQUcsdUJBQUEsSUFBbUIsR0FBRyxDQUFDLFNBQUosS0FBaUIsS0FBdkM7TUFDRSxTQUFBLEdBQVksTUFEZDs7SUFFQSxJQUFHLFNBQUg7YUFDRSxJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWIsRUFDRTtRQUFBLFFBQUEsRUFBVSxTQUFWO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUVBLFNBQUEsRUFBVyxHQUZYO1FBSUEsU0FBQSxFQUFXO01BSlgsQ0FERixFQURGOztFQXZCYSxDQUhmO0VBa0NBLFFBQUEsRUFBVSxRQUFBLENBQUEsQ0FBQTtBQUNSLFFBQUEsU0FBQSxFQUFBLEdBQUEsRUFBQTtJQUFBLEdBQUEsR0FBTSxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ2YsU0FBQSxrQkFBWSxHQUFHLENBQUUsZ0JBQUwsSUFBZTtJQUMzQixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsR0FBRyxDQUFDLGFBQWxCLEVBRlQ7O0lBSUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLE1BQUosQ0FBVztNQUFBLEVBQUEsaUJBQUksR0FBRyxDQUFFLG1CQUFMLElBQWtCO0lBQXRCLENBQVgsQ0FBWDtXQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtFQU5RLENBbENWO0VBMENBLE9BQUEsRUFBUyxRQUFBLENBQUEsQ0FBQTtBQUNQLFFBQUE7SUFBQSxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVixDQUFIOzs7O01BSUUsQ0FBQSxHQUFJLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjthQUNKLENBQUMsQ0FBQyxhQUFGLENBQUEsRUFMRjs7RUFETztBQTFDVCxDQURPOztBQW1EVCxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCwgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFJlZ2lvbiB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbmltcG9ydCBNZXNzYWdlc0FwcCBmcm9tICcuL3RrbWVzc2FnZXMnXG5pbXBvcnQgTmF2YmFyQXBwIGZyb20gJy4vdGtuYXZiYXInXG5pbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uL3Nhc3MvdGtsYXlvdXQuc2Nzc1wiXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBUa0FwcFN0YXRlIGV4dGVuZHMgTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgc3RhcnRIaXN0b3J5OiB0cnVlXG4gICAgYXBwQ29uZmlnOiB7fVxuICAgIFxuVG9wQXBwID0gQXBwLmV4dGVuZFxuICBTdGF0ZU1vZGVsOiBUa0FwcFN0YXRlXG4gIG9wdGlvbnM6XG4gICAgYXBwQ29uZmlnOiB7fVxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIGNvbnNvbGUud2FybiBcIm9uQmVmb3JlU3RhcnRcIlxuICAgIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpvYmplY3QnLCA9PlxuICAgICAgQFxuICAgIE1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjb25maWcnLCA9PlxuICAgICAgQGdldE9wdGlvbiAnYXBwQ29uZmlnJ1xuICAgIGNmZyA9IEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICAjIGJ1aWxkIG1haW4gcGFnZSBsYXlvdXRcbiAgICBAaW5pdFBhZ2UoKVxuICAgICMgc2V0dXAgbWVzc2FnZXNcbiAgICB1c2VNZXNzYWdlcyA9IHRydWVcbiAgICBpZiBjZmcudXNlTWVzc2FnZXM/IGFuZCBjZmcudXNlTWVzc2FnZXMgaXMgZmFsc2VcbiAgICAgIHVzZU1lc3NhZ2VzID0gZmFsc2VcbiAgICBpZiB1c2VNZXNzYWdlc1xuICAgICAgQGFkZENoaWxkQXBwICdtZXNzYWdlcycsXG4gICAgICAgIEFwcENsYXNzOiBNZXNzYWdlc0FwcFxuICAgICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgICAgLFxuICAgICAgICBwYXJlbnRBcHA6IEBcbiAgICAjIHNldHVwIG5hdmJhclxuICAgIHVzZU5hdmJhciA9IHRydWVcbiAgICBpZiBjZmcudXNlTmF2YmFyPyBhbmQgY2ZnLnVzZU5hdmJhciBpcyBmYWxzZVxuICAgICAgdXNlTmF2YmFyID0gZmFsc2VcbiAgICBpZiB1c2VOYXZiYXJcbiAgICAgIEBhZGRDaGlsZEFwcCAnbmF2YmFyJyxcbiAgICAgICAgQXBwQ2xhc3M6IE5hdmJhckFwcFxuICAgICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgICAgYXBwQ29uZmlnOiBjZmdcbiAgICAgICAgLFxuICAgICAgICBwYXJlbnRBcHA6IEBcbiAgICAgICAgXG4gIGluaXRQYWdlOiAtPlxuICAgIGNmZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgIEFwcExheW91dCA9IGNmZz8ubGF5b3V0IG9yIE1haW5QYWdlTGF5b3V0XG4gICAgbGF5b3V0ID0gbmV3IEFwcExheW91dCBjZmcubGF5b3V0T3B0aW9uc1xuICAgICMgRklYTUUgLSB0ZXN0IGZvciByZWdpb24gY2xhc3NcbiAgICBAc2V0UmVnaW9uIG5ldyBSZWdpb24gZWw6IGNmZz8uYXBwUmVnaW9uIG9yICdib2R5J1xuICAgIEBzaG93VmlldyBsYXlvdXRcblxuICBvblN0YXJ0OiAtPlxuICAgIGlmIEBnZXRTdGF0ZSAnc3RhcnRIaXN0b3J5J1xuICAgICAgIyBGSVhNRSB3ZSBuZWVkIHNvbWV0aGluZyBiZXR0ZXJcbiAgICAgICMgd2Ugc2VlbSB0byBiZSByZXF1aXJlZCB0bywgYXQgbWluaW11bSwgbG9hZFxuICAgICAgIyB0aGUgZnJvbnRkb29yIGFuZCBoYW5kbGUgdGhlIFwiZW1wdHlcIiByb3V0ZVxuICAgICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICAgIGMubG9hZEZyb250RG9vcigpXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IFRvcEFwcFxuXG5cbiJdfQ==
