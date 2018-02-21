var Backbone, MainChannel, MainPageLayout, Marionette, MessagesApp, NavbarApp, TkAppState, Toolkit, TopApp, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MessagesApp = require('./tkmessages');

NavbarApp = require('./tknavbar');

MainPageLayout = require('./tklayout');

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

TopApp = (function() {
  class TopApp extends Toolkit.App {
    onBeforeStart() {
      var appConfig, messagesApp, navbarApp, useMessages, useNavbar;
      appConfig = this.options.appConfig;
      MainChannel.reply('main:app:object', () => {
        return this;
      });
      MainChannel.reply('main:app:config', function() {
        return appConfig;
      });
      // FIXME - test for region class
      this.setRegion(new Marionette.Region({
        el: (appConfig != null ? appConfig.appRegion : void 0) || 'body'
      }));
      // setup messages
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
      // setup navbar
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
    }

    initPage() {
      var AppLayout, appConfig, layout, layoutOpts;
      appConfig = this.options.appConfig;
      AppLayout = (appConfig != null ? appConfig.layout : void 0) || MainPageLayout;
      layoutOpts = appConfig.layoutOptions;
      layout = new AppLayout(appConfig.layoutOptions);
      return this.showView(layout);
    }

    onStart() {
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

  };

  TopApp.prototype.StateModel = TkAppState;

  TopApp.prototype.options = {
    appConfig: {}
  };

  return TopApp;

}).call(this);

module.exports = TopApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxFQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsT0FBQSxDQUFRLGNBQVI7O0FBQ2QsU0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSOztBQUNaLGNBQUEsR0FBaUIsT0FBQSxDQUFRLFlBQVI7O0FBRWpCLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVI7RUFBTixNQUFBLFdBQUEsUUFBeUIsUUFBUSxDQUFDLE1BQWxDLENBQUE7O3VCQUNFLFFBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxJQUFkO0lBQ0EsU0FBQSxFQUFXLENBQUE7RUFEWDs7Ozs7O0FBR0osV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDUjtFQUFOLE1BQUEsT0FBQSxRQUFxQixPQUFPLENBQUMsSUFBN0I7SUFJRSxhQUFlLENBQUEsQ0FBQTtBQUNiLFVBQUEsU0FBQSxFQUFBLFdBQUEsRUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBO01BQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxPQUFPLENBQUM7TUFDckIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLENBQUEsQ0FBQSxHQUFBO2VBQ25DO01BRG1DLENBQXJDO01BRUEsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFFBQUEsQ0FBQSxDQUFBO2VBQ25DO01BRG1DLENBQXJDLEVBSEE7O01BTUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFmLENBQXNCO1FBQUEsRUFBQSx1QkFBSSxTQUFTLENBQUUsbUJBQVgsSUFBd0I7TUFBNUIsQ0FBdEIsQ0FBWCxFQU5BOztNQVFBLFdBQUEsR0FBYztNQUNkLElBQUcsK0JBQUEsSUFBMkIsU0FBUyxDQUFDLFdBQVYsS0FBeUIsS0FBdkQ7UUFDRSxXQUFBLEdBQWMsTUFEaEI7O01BRUEsSUFBRyxXQUFIO1FBQ0UsV0FBQSxHQUFjLElBQUMsQ0FBQSxXQUFELENBQWEsVUFBYixFQUNaO1VBQUEsUUFBQSxFQUFVLFdBQVY7VUFDQSxlQUFBLEVBQWlCLElBRGpCO1VBR0EsU0FBQSxFQUFXO1FBSFgsQ0FEWSxFQURoQjtPQVhBOztNQWtCQSxTQUFBLEdBQVk7TUFDWixJQUFHLDZCQUFBLElBQXlCLFNBQVMsQ0FBQyxTQUFWLEtBQXVCLEtBQW5EO1FBQ0UsU0FBQSxHQUFZLE1BRGQ7O01BRUEsSUFBRyxTQUFIO2VBQ0UsU0FBQSxHQUFZLElBQUMsQ0FBQSxXQUFELENBQWEsUUFBYixFQUNWO1VBQUEsUUFBQSxFQUFVLFNBQVY7VUFDQSxlQUFBLEVBQWlCLElBRGpCO1VBRUEsU0FBQSxFQUFXLFNBRlg7VUFJQSxTQUFBLEVBQVc7UUFKWCxDQURVLEVBRGQ7O0lBdEJhOztJQThCZixRQUFVLENBQUEsQ0FBQTtBQUNSLFVBQUEsU0FBQSxFQUFBLFNBQUEsRUFBQSxNQUFBLEVBQUE7TUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQztNQUNyQixTQUFBLHdCQUFZLFNBQVMsQ0FBRSxnQkFBWCxJQUFxQjtNQUNqQyxVQUFBLEdBQWEsU0FBUyxDQUFDO01BQ3ZCLE1BQUEsR0FBUyxJQUFJLFNBQUosQ0FBYyxTQUFTLENBQUMsYUFBeEI7YUFDVCxJQUFDLENBQUEsUUFBRCxDQUFVLE1BQVY7SUFMUTs7SUFPVixPQUFTLENBQUEsQ0FBQTtBQUVQLFVBQUEsQ0FBQTs7TUFBQSxJQUFDLENBQUEsUUFBRCxDQUFBO01BQ0EsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLGNBQVYsQ0FBSDs7OztRQUlFLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7ZUFDSixDQUFDLENBQUMsYUFBRixDQUFBLEVBTEY7O0lBSE87O0VBekNYOzttQkFDRSxVQUFBLEdBQVk7O21CQUNaLE9BQUEsR0FDRTtJQUFBLFNBQUEsRUFBVyxDQUFBO0VBQVg7Ozs7OztBQWdESixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuTWVzc2FnZXNBcHAgPSByZXF1aXJlICcuL3RrbWVzc2FnZXMnXG5OYXZiYXJBcHAgPSByZXF1aXJlICcuL3RrbmF2YmFyJ1xuTWFpblBhZ2VMYXlvdXQgPSByZXF1aXJlICcuL3RrbGF5b3V0J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgVGtBcHBTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHN0YXJ0SGlzdG9yeTogdHJ1ZVxuICAgIGFwcENvbmZpZzoge31cbiAgICBcbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuY2xhc3MgVG9wQXBwIGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBvcHRpb25zOlxuICAgIGFwcENvbmZpZzoge31cbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBhcHBDb25maWcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6b2JqZWN0JywgPT5cbiAgICAgIEBcbiAgICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6Y29uZmlnJywgLT5cbiAgICAgIGFwcENvbmZpZ1xuICAgICMgRklYTUUgLSB0ZXN0IGZvciByZWdpb24gY2xhc3NcbiAgICBAc2V0UmVnaW9uIG5ldyBNYXJpb25ldHRlLlJlZ2lvbiBlbDogYXBwQ29uZmlnPy5hcHBSZWdpb24gb3IgJ2JvZHknXG4gICAgIyBzZXR1cCBtZXNzYWdlc1xuICAgIHVzZU1lc3NhZ2VzID0gdHJ1ZVxuICAgIGlmIGFwcENvbmZpZy51c2VNZXNzYWdlcz8gYW5kIGFwcENvbmZpZy51c2VNZXNzYWdlcyBpcyBmYWxzZVxuICAgICAgdXNlTWVzc2FnZXMgPSBmYWxzZVxuICAgIGlmIHVzZU1lc3NhZ2VzXG4gICAgICBtZXNzYWdlc0FwcCA9IEBhZGRDaGlsZEFwcCAnbWVzc2FnZXMnLFxuICAgICAgICBBcHBDbGFzczogTWVzc2FnZXNBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgIyBzZXR1cCBuYXZiYXJcbiAgICB1c2VOYXZiYXIgPSB0cnVlXG4gICAgaWYgYXBwQ29uZmlnLnVzZU5hdmJhcj8gYW5kIGFwcENvbmZpZy51c2VOYXZiYXIgaXMgZmFsc2VcbiAgICAgIHVzZU5hdmJhciA9IGZhbHNlXG4gICAgaWYgdXNlTmF2YmFyXG4gICAgICBuYXZiYXJBcHAgPSBAYWRkQ2hpbGRBcHAgJ25hdmJhcicsXG4gICAgICAgIEFwcENsYXNzOiBOYXZiYXJBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogYXBwQ29uZmlnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBpbml0UGFnZTogLT5cbiAgICBhcHBDb25maWcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBBcHBMYXlvdXQgPSBhcHBDb25maWc/LmxheW91dCBvciBNYWluUGFnZUxheW91dFxuICAgIGxheW91dE9wdHMgPSBhcHBDb25maWcubGF5b3V0T3B0aW9uc1xuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgYXBwQ29uZmlnLmxheW91dE9wdGlvbnNcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogLT5cbiAgICAjIGJ1aWxkIG1haW4gcGFnZSBsYXlvdXRcbiAgICBAaW5pdFBhZ2UoKVxuICAgIGlmIEBnZXRTdGF0ZSAnc3RhcnRIaXN0b3J5J1xuICAgICAgIyBGSVhNRSB3ZSBuZWVkIHNvbWV0aGluZyBiZXR0ZXJcbiAgICAgICMgd2Ugc2VlbSB0byBiZSByZXF1aXJlZCB0bywgYXQgbWluaW11bSwgbG9hZFxuICAgICAgIyB0aGUgZnJvbnRkb29yIGFuZCBoYW5kbGUgdGhlIFwiZW1wdHlcIiByb3V0ZVxuICAgICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICAgIGMubG9hZEZyb250RG9vcigpXG4gICAgICBcbm1vZHVsZS5leHBvcnRzID0gVG9wQXBwXG5cblxuIl19
