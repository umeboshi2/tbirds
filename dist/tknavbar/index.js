var MainChannel, MessageChannel, NavbarApp;

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import './dbchannel';

import NavbarHeaderView from './navbar-header';

import NavbarEntriesView from './entries';

import BootstrapNavBarView from './main-view';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarApp = class NavbarApp extends Toolkit.App {
  onBeforeStart() {
    var appConfig, region, userMenuApp;
    appConfig = this.options.appConfig;
    region = this.options.parentApp.getView().getRegion('navbar');
    this.setRegion(region);
    if (appConfig.hasUser) {
      return userMenuApp = this.addChildApp('user-menu', {
        AppClass: appConfig.userMenuApp,
        startWithParent: true,
        appConfig: appConfig,
        parentApp: this
      });
    }
  }

  onStart() {
    // build main page layout
    return this.initPage();
  }

  initPage() {
    var appConfig, layout;
    appConfig = this.options.parentApp.options.appConfig;
    layout = new BootstrapNavBarView({
      model: new Backbone.Model(appConfig)
    });
    return this.showView(layout);
  }

};

export default NavbarApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvaW5kZXguanMiLCJzb3VyY2VzIjpbInRrbmF2YmFyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBQTs7QUFDQSxPQUFPLGdCQUFQLE1BQUE7O0FBQ0EsT0FBTyxpQkFBUCxNQUFBOztBQUNBLE9BQU8sbUJBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYLFlBQU4sTUFBQSxVQUFBLFFBQXdCLE9BQU8sQ0FBQyxJQUFoQztFQUNFLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsUUFBQSxTQUFBLEVBQUEsTUFBQSxFQUFBO0lBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDckIsTUFBQSxHQUFTLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQW5CLENBQUEsQ0FBNEIsQ0FBQyxTQUE3QixDQUF1QyxRQUF2QztJQUNULElBQUMsQ0FBQSxTQUFELENBQVcsTUFBWDtJQUNBLElBQUcsU0FBUyxDQUFDLE9BQWI7YUFDRSxXQUFBLEdBQWMsSUFBQyxDQUFBLFdBQUQsQ0FBYSxXQUFiLEVBQ1o7UUFBQSxRQUFBLEVBQVUsU0FBUyxDQUFDLFdBQXBCO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUVBLFNBQUEsRUFBVyxTQUZYO1FBSUEsU0FBQSxFQUFXO01BSlgsQ0FEWSxFQURoQjs7RUFKYTs7RUFZZixPQUFTLENBQUEsQ0FBQSxFQUFBOztXQUVQLElBQUMsQ0FBQSxRQUFELENBQUE7RUFGTzs7RUFJVCxRQUFVLENBQUEsQ0FBQTtBQUNSLFFBQUEsU0FBQSxFQUFBO0lBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUN2QyxNQUFBLEdBQVMsSUFBSSxtQkFBSixDQUNQO01BQUEsS0FBQSxFQUFPLElBQUksUUFBUSxDQUFDLEtBQWIsQ0FBbUIsU0FBbkI7SUFBUCxDQURPO1dBRVQsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0VBSlE7O0FBakJaOztBQXVCQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0ICcuL2RiY2hhbm5lbCdcbmltcG9ydCBOYXZiYXJIZWFkZXJWaWV3IGZyb20gJy4vbmF2YmFyLWhlYWRlcidcbmltcG9ydCBOYXZiYXJFbnRyaWVzVmlldyBmcm9tICcuL2VudHJpZXMnXG5pbXBvcnQgQm9vdHN0cmFwTmF2QmFyVmlldyBmcm9tICcuL21haW4tdmlldydcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBOYXZiYXJBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIGFwcENvbmZpZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgIHJlZ2lvbiA9IEBvcHRpb25zLnBhcmVudEFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICduYXZiYXInXG4gICAgQHNldFJlZ2lvbiByZWdpb25cbiAgICBpZiBhcHBDb25maWcuaGFzVXNlclxuICAgICAgdXNlck1lbnVBcHAgPSBAYWRkQ2hpbGRBcHAgJ3VzZXItbWVudScsXG4gICAgICAgIEFwcENsYXNzOiBhcHBDb25maWcudXNlck1lbnVBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogYXBwQ29uZmlnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBvblN0YXJ0OiAtPlxuICAgICMgYnVpbGQgbWFpbiBwYWdlIGxheW91dFxuICAgIEBpbml0UGFnZSgpXG5cbiAgaW5pdFBhZ2U6IC0+XG4gICAgYXBwQ29uZmlnID0gQG9wdGlvbnMucGFyZW50QXBwLm9wdGlvbnMuYXBwQ29uZmlnXG4gICAgbGF5b3V0ID0gbmV3IEJvb3RzdHJhcE5hdkJhclZpZXdcbiAgICAgIG1vZGVsOiBuZXcgQmFja2JvbmUuTW9kZWwgYXBwQ29uZmlnXG4gICAgQHNob3dWaWV3IGxheW91dFxuXG5leHBvcnQgZGVmYXVsdCBOYXZiYXJBcHBcblxuXG4iXX0=
