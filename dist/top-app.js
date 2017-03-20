var Backbone, MainChannel, Marionette, MessagesApp, NavbarApp, Toolkit, TopApp, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MessagesApp = require('./tkmessages');

NavbarApp = require('./tknavbar');

MainChannel = Backbone.Radio.channel('global');

TopApp = (function(superClass) {
  extend(TopApp, superClass);

  function TopApp() {
    return TopApp.__super__.constructor.apply(this, arguments);
  }

  TopApp.prototype.onBeforeStart = function() {
    var appConfig, messagesApp, navbarApp;
    appConfig = this.options.appConfig;
    this.setRegion(new Marionette.Region({
      el: appConfig.appRegion
    }));
    if (appConfig.useMessages) {
      messagesApp = this.addChildApp('messages', {
        AppClass: MessagesApp,
        startWithParent: true,
        parentApp: this
      });
    }
    if (appConfig.useNavbar) {
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
    AppLayout = appConfig.layout;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLWFwcC5qcyIsInNvdXJjZXMiOlsidG9wLWFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw4RUFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsT0FBQSxDQUFRLGNBQVI7O0FBQ2QsU0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSOztBQUVaLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ1I7Ozs7Ozs7bUJBQ0osYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFFckIsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFmLENBQXNCO01BQUEsRUFBQSxFQUFJLFNBQVMsQ0FBQyxTQUFkO0tBQXRCLENBQVg7SUFFQSxJQUFHLFNBQVMsQ0FBQyxXQUFiO01BQ0UsV0FBQSxHQUFjLElBQUMsQ0FBQSxXQUFELENBQWEsVUFBYixFQUNaO1FBQUEsUUFBQSxFQUFVLFdBQVY7UUFDQSxlQUFBLEVBQWlCLElBRGpCO1FBR0EsU0FBQSxFQUFXLElBSFg7T0FEWSxFQURoQjs7SUFNQSxJQUFHLFNBQVMsQ0FBQyxTQUFiO2FBQ0UsU0FBQSxHQUFZLElBQUMsQ0FBQSxXQUFELENBQWEsUUFBYixFQUNWO1FBQUEsUUFBQSxFQUFVLFNBQVY7UUFDQSxlQUFBLEVBQWlCLElBRGpCO1FBRUEsU0FBQSxFQUFXLFNBRlg7UUFJQSxTQUFBLEVBQVcsSUFKWDtPQURVLEVBRGQ7O0VBWGE7O21CQW1CZixRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNyQixTQUFBLEdBQVksU0FBUyxDQUFDO0lBQ3RCLFVBQUEsR0FBYSxTQUFTLENBQUM7SUFDdkIsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLFNBQVMsQ0FBQyxhQUF4QjtXQUNULElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtFQUxROzttQkFPVixPQUFBLEdBQVMsU0FBQTtBQUVQLFFBQUE7SUFBQSxJQUFDLENBQUEsUUFBRCxDQUFBO0lBQ0EsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLGNBQVYsQ0FBSDtNQUlFLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7YUFDSixDQUFDLENBQUMsYUFBRixDQUFBLEVBTEY7O0VBSE87Ozs7R0EzQlUsT0FBTyxDQUFDOztBQXFDN0IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5Ub29sa2l0ID0gcmVxdWlyZSAnbWFyaW9uZXR0ZS50b29sa2l0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbk1lc3NhZ2VzQXBwID0gcmVxdWlyZSAnLi90a21lc3NhZ2VzJ1xuTmF2YmFyQXBwID0gcmVxdWlyZSAnLi90a25hdmJhcidcbiAgXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbmNsYXNzIFRvcEFwcCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgYXBwQ29uZmlnID0gQG9wdGlvbnMuYXBwQ29uZmlnXG4gICAgIyBGSVhNRSAtIHRlc3QgZm9yIHJlZ2lvbiBjbGFzc1xuICAgIEBzZXRSZWdpb24gbmV3IE1hcmlvbmV0dGUuUmVnaW9uIGVsOiBhcHBDb25maWcuYXBwUmVnaW9uXG4gICAgI2NvbnNvbGUubG9nIFwiVG9wQXBwIHJlZ2lvbiBzZXQgdG9cIiwgQGdldFJlZ2lvbigpXG4gICAgaWYgYXBwQ29uZmlnLnVzZU1lc3NhZ2VzXG4gICAgICBtZXNzYWdlc0FwcCA9IEBhZGRDaGlsZEFwcCAnbWVzc2FnZXMnLFxuICAgICAgICBBcHBDbGFzczogTWVzc2FnZXNBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgaWYgYXBwQ29uZmlnLnVzZU5hdmJhclxuICAgICAgbmF2YmFyQXBwID0gQGFkZENoaWxkQXBwICduYXZiYXInLFxuICAgICAgICBBcHBDbGFzczogTmF2YmFyQXBwXG4gICAgICAgIHN0YXJ0V2l0aFBhcmVudDogdHJ1ZVxuICAgICAgICBhcHBDb25maWc6IGFwcENvbmZpZ1xuICAgICAgICAsXG4gICAgICAgIHBhcmVudEFwcDogQFxuICAgICAgICBcbiAgaW5pdFBhZ2U6IC0+XG4gICAgYXBwQ29uZmlnID0gQG9wdGlvbnMuYXBwQ29uZmlnXG4gICAgQXBwTGF5b3V0ID0gYXBwQ29uZmlnLmxheW91dFxuICAgIGxheW91dE9wdHMgPSBhcHBDb25maWcubGF5b3V0T3B0aW9uc1xuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgYXBwQ29uZmlnLmxheW91dE9wdGlvbnNcbiAgICBAc2hvd1ZpZXcgbGF5b3V0ICAgIFxuXG4gIG9uU3RhcnQ6IC0+XG4gICAgIyBidWlsZCBtYWluIHBhZ2UgbGF5b3V0XG4gICAgQGluaXRQYWdlKClcbiAgICBpZiBAZ2V0U3RhdGUgJ3N0YXJ0SGlzdG9yeSdcbiAgICAgICMgRklYTUUgd2UgbmVlZCBzb21ldGhpbmcgYmV0dGVyXG4gICAgICAjIHdlIHNlZW0gdG8gYmUgcmVxdWlyZWQgdG8sIGF0IG1pbmltdW0sIGxvYWRcbiAgICAgICMgdGhlIGZyb250ZG9vciBhbmQgaGFuZGxlIHRoZSBcImVtcHR5XCIgcm91dGVcbiAgICAgIGMgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLWNvbnRyb2xsZXInXG4gICAgICBjLmxvYWRGcm9udERvb3IoKVxuICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IFRvcEFwcFxuXG5cbiJdfQ==
