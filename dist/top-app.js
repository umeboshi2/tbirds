var Backbone, MainChannel, MainPageLayout, Marionette, MessagesApp, NavbarApp, TkAppState, Toolkit, TopApp, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MessagesApp = require('./tkmessages');

NavbarApp = require('./tknavbar');

MainPageLayout = require('./tklayout');

MainChannel = Backbone.Radio.channel('global');

TkAppState = (function(superClass) {
  extend(TkAppState, superClass);

  function TkAppState() {
    return TkAppState.__super__.constructor.apply(this, arguments);
  }

  TkAppState.prototype.defaults = {
    startHistory: true,
    appConfig: {}
  };

  return TkAppState;

})(Backbone.Model);

MainChannel = Backbone.Radio.channel('global');

TopApp = (function(superClass) {
  extend(TopApp, superClass);

  function TopApp() {
    return TopApp.__super__.constructor.apply(this, arguments);
  }

  TopApp.prototype.StateModel = TkAppState;

  TopApp.prototype.options = {
    appConfig: {}
  };

  TopApp.prototype.onBeforeStart = function() {
    var appConfig, messagesApp, navbarApp, useMessages, useNavbar;
    appConfig = this.options.appConfig;
    MainChannel.reply('main:app:object', (function(_this) {
      return function() {
        return _this;
      };
    })(this));
    MainChannel.reply('main:app:config', function() {
      return appConfig;
    });
    this.setRegion(new Marionette.Region({
      el: (appConfig != null ? appConfig.appRegion : void 0) || 'body'
    }));
    useMessages = true;
    if ((appConfig.useMessages != null) && appConfig.useMessages === false) {
      useMessages = false;
    }
    if (useMessages) {
      messagesApp = this.addChildApp('messages', {
        AppClass: MessagesApp,
        startWithParent: true,
        parentApp: this
      });
    }
    useNavbar = true;
    if ((appConfig.useNavbar != null) && appConfig.useNavbar === false) {
      useNavbar = false;
    }
    if (useNavbar) {
      return navbarApp = this.addChildApp('navbar', {
        AppClass: NavbarApp,
        startWithParent: true,
        appConfig: appConfig,
        parentApp: this
      });
    }
  };

  TopApp.prototype.initPage = function() {
    var AppLayout, appConfig, layout, layoutOpts;
    appConfig = this.options.appConfig;
    AppLayout = (appConfig != null ? appConfig.layout : void 0) || MainPageLayout;
    layoutOpts = appConfig.layoutOptions;
    layout = new AppLayout(appConfig.layoutOptions);
    return this.showView(layout);
  };

  TopApp.prototype.onStart = function() {
    var c;
    this.initPage();
    if (this.getState('startHistory')) {
      c = MainChannel.request('main-controller');
      return c.loadFrontDoor();
    }
  };

  return TopApp;

})(Toolkit.App);

module.exports = TopApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwwR0FBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsT0FBQSxDQUFRLGNBQVI7O0FBQ2QsU0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSOztBQUNaLGNBQUEsR0FBaUIsT0FBQSxDQUFRLFlBQVI7O0FBRWpCLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVI7Ozs7Ozs7dUJBQ0osUUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLElBQWQ7SUFDQSxTQUFBLEVBQVcsRUFEWDs7Ozs7R0FGcUIsUUFBUSxDQUFDOztBQUtsQyxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNSOzs7Ozs7O21CQUNKLFVBQUEsR0FBWTs7bUJBQ1osT0FBQSxHQUNFO0lBQUEsU0FBQSxFQUFXLEVBQVg7OzttQkFDRixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNyQixXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ25DO01BRG1DO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyQztJQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxTQUFBO2FBQ25DO0lBRG1DLENBQXJDO0lBR0EsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFmLENBQXNCO01BQUEsRUFBQSx1QkFBSSxTQUFTLENBQUUsbUJBQVgsSUFBd0IsTUFBNUI7S0FBdEIsQ0FBWDtJQUVBLFdBQUEsR0FBYztJQUNkLElBQUcsK0JBQUEsSUFBMkIsU0FBUyxDQUFDLFdBQVYsS0FBeUIsS0FBdkQ7TUFDRSxXQUFBLEdBQWMsTUFEaEI7O0lBRUEsSUFBRyxXQUFIO01BQ0UsV0FBQSxHQUFjLElBQUMsQ0FBQSxXQUFELENBQWEsVUFBYixFQUNaO1FBQUEsUUFBQSxFQUFVLFdBQVY7UUFDQSxlQUFBLEVBQWlCLElBRGpCO1FBR0EsU0FBQSxFQUFXLElBSFg7T0FEWSxFQURoQjs7SUFPQSxTQUFBLEdBQVk7SUFDWixJQUFHLDZCQUFBLElBQXlCLFNBQVMsQ0FBQyxTQUFWLEtBQXVCLEtBQW5EO01BQ0UsU0FBQSxHQUFZLE1BRGQ7O0lBRUEsSUFBRyxTQUFIO2FBQ0UsU0FBQSxHQUFZLElBQUMsQ0FBQSxXQUFELENBQWEsUUFBYixFQUNWO1FBQUEsUUFBQSxFQUFVLFNBQVY7UUFDQSxlQUFBLEVBQWlCLElBRGpCO1FBRUEsU0FBQSxFQUFXLFNBRlg7UUFJQSxTQUFBLEVBQVcsSUFKWDtPQURVLEVBRGQ7O0VBdEJhOzttQkE4QmYsUUFBQSxHQUFVLFNBQUE7QUFDUixRQUFBO0lBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDckIsU0FBQSx3QkFBWSxTQUFTLENBQUUsZ0JBQVgsSUFBcUI7SUFDakMsVUFBQSxHQUFhLFNBQVMsQ0FBQztJQUN2QixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsU0FBUyxDQUFDLGFBQXhCO1dBQ1QsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0VBTFE7O21CQU9WLE9BQUEsR0FBUyxTQUFBO0FBRVAsUUFBQTtJQUFBLElBQUMsQ0FBQSxRQUFELENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVixDQUFIO01BSUUsQ0FBQSxHQUFJLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjthQUNKLENBQUMsQ0FBQyxhQUFGLENBQUEsRUFMRjs7RUFITzs7OztHQXpDVSxPQUFPLENBQUM7O0FBbUQ3QixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuTWVzc2FnZXNBcHAgPSByZXF1aXJlICcuL3RrbWVzc2FnZXMnXG5OYXZiYXJBcHAgPSByZXF1aXJlICcuL3RrbmF2YmFyJ1xuTWFpblBhZ2VMYXlvdXQgPSByZXF1aXJlICcuL3RrbGF5b3V0J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgVGtBcHBTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHN0YXJ0SGlzdG9yeTogdHJ1ZVxuICAgIGFwcENvbmZpZzoge31cbiAgICBcbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuY2xhc3MgVG9wQXBwIGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBvcHRpb25zOlxuICAgIGFwcENvbmZpZzoge31cbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBhcHBDb25maWcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6b2JqZWN0JywgPT5cbiAgICAgIEBcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y29uZmlnJywgLT5cbiAgICAgIGFwcENvbmZpZ1xuICAgICMgRklYTUUgLSB0ZXN0IGZvciByZWdpb24gY2xhc3NcbiAgICBAc2V0UmVnaW9uIG5ldyBNYXJpb25ldHRlLlJlZ2lvbiBlbDogYXBwQ29uZmlnPy5hcHBSZWdpb24gb3IgJ2JvZHknXG4gICAgIyBzZXR1cCBtZXNzYWdlc1xuICAgIHVzZU1lc3NhZ2VzID0gdHJ1ZVxuICAgIGlmIGFwcENvbmZpZy51c2VNZXNzYWdlcz8gYW5kIGFwcENvbmZpZy51c2VNZXNzYWdlcyBpcyBmYWxzZVxuICAgICAgdXNlTWVzc2FnZXMgPSBmYWxzZVxuICAgIGlmIHVzZU1lc3NhZ2VzXG4gICAgICBtZXNzYWdlc0FwcCA9IEBhZGRDaGlsZEFwcCAnbWVzc2FnZXMnLFxuICAgICAgICBBcHBDbGFzczogTWVzc2FnZXNBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgIyBzZXR1cCBuYXZiYXJcbiAgICB1c2VOYXZiYXIgPSB0cnVlXG4gICAgaWYgYXBwQ29uZmlnLnVzZU5hdmJhcj8gYW5kIGFwcENvbmZpZy51c2VOYXZiYXIgaXMgZmFsc2VcbiAgICAgIHVzZU5hdmJhciA9IGZhbHNlXG4gICAgaWYgdXNlTmF2YmFyXG4gICAgICBuYXZiYXJBcHAgPSBAYWRkQ2hpbGRBcHAgJ25hdmJhcicsXG4gICAgICAgIEFwcENsYXNzOiBOYXZiYXJBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogYXBwQ29uZmlnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBpbml0UGFnZTogLT5cbiAgICBhcHBDb25maWcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBBcHBMYXlvdXQgPSBhcHBDb25maWc/LmxheW91dCBvciBNYWluUGFnZUxheW91dFxuICAgIGxheW91dE9wdHMgPSBhcHBDb25maWcubGF5b3V0T3B0aW9uc1xuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgYXBwQ29uZmlnLmxheW91dE9wdGlvbnNcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogLT5cbiAgICAjIGJ1aWxkIG1haW4gcGFnZSBsYXlvdXRcbiAgICBAaW5pdFBhZ2UoKVxuICAgIGlmIEBnZXRTdGF0ZSAnc3RhcnRIaXN0b3J5J1xuICAgICAgIyBGSVhNRSB3ZSBuZWVkIHNvbWV0aGluZyBiZXR0ZXJcbiAgICAgICMgd2Ugc2VlbSB0byBiZSByZXF1aXJlZCB0bywgYXQgbWluaW11bSwgbG9hZFxuICAgICAgIyB0aGUgZnJvbnRkb29yIGFuZCBoYW5kbGUgdGhlIFwiZW1wdHlcIiByb3V0ZVxuICAgICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICAgIGMubG9hZEZyb250RG9vcigpXG4gICAgICBcbm1vZHVsZS5leHBvcnRzID0gVG9wQXBwXG5cblxuIl19
