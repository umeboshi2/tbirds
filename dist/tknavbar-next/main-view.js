var BootstrapNavBarView, MainChannel, NavbarChannel;

import $ from 'jquery';

import {
  Model,
  Radio,
  history as BBhistory
} from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import NavbarHeaderView from './navbar-header';

import NavbarEntriesView from './entries';

//import NavbarToggleButton from './toggle-button'
MainChannel = Radio.channel('global');

NavbarChannel = Radio.channel('navbar');

BootstrapNavBarView = (function() {
  class BootstrapNavBarView extends View {
    onRender() {
      var app, aview, currentUser, entry, eview, headerOpts, hview, i, len, navbarEntries, ref, vview;
      if (this.model.get('hasUser')) {
        app = MainChannel.request('main:app:object');
        currentUser = app.getState('currentUser');
        ref = this.model.get('navbarEntries');
        for (i = 0, len = ref.length; i < len; i++) {
          entry = ref[i];
          if ((entry != null ? entry.needUser : void 0) && !currentUser) {
            continue;
          }
          NavbarChannel.request('add-entry', entry, 'site');
        }
      } else {
        navbarEntries = this.model.get('navbarEntries');
        NavbarChannel.request('add-entries', navbarEntries, 'site');
      }
      eview = new NavbarEntriesView({
        collection: NavbarChannel.request('get-entries', 'site')
      });
      this.showChildView('siteEntries', eview);
      aview = new NavbarEntriesView({
        collection: NavbarChannel.request('get-entries', 'applet')
      });
      this.showChildView('appletEntries', aview);
      vview = new NavbarEntriesView({
        collection: NavbarChannel.request('get-entries', 'view')
      });
      this.showChildView('viewEntries', vview);
      headerOpts = {
        model: new Model(this.model.get('brand'))
      };
      if (this.model.get('navbarBrandTemplate')) {
        headerOpts.template = this.model.get('navbarBrandTemplate');
      }
      hview = new NavbarHeaderView(headerOpts);
      return this.showChildView('header', hview);
    }

    _routeToURl(href) {
      if (href.startsWith('/')) {
        window.open(href);
      }
      BBhistory.navigate(href, {
        trigger: true
      });
    }

    
      // onChildviewClickBrand will not be called
    // without setting @childViewEvents
    onChildviewClickBrand(view) {
      var eview, router, url;
      eview = this.getChildView('siteEntries');
      eview.setAllInactive();
      url = view.model.get('url');
      router = MainChannel.request('main:app:router');
      url = "application";
      router.transitionTo(url);
    }

  };

  BootstrapNavBarView.prototype.tagName = 'nav';

  BootstrapNavBarView.prototype.id = 'navbar-view';

  BootstrapNavBarView.prototype.className = 'navbar navbar-expand-md';

  BootstrapNavBarView.prototype.attributes = {
    xmlns: 'http://www.w3.org/1999/xhtml',
    'xml:lang': 'en',
    role: 'navigation'
  };

  BootstrapNavBarView.prototype.template = tc.renderable(function() {
    tc.div('.navbar-header');
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.div('.site-entries');
      tc.div('.applet-entries');
      tc.div('.view-entries');
      return tc.div('.user-entries.ml-auto');
    });
  });

  BootstrapNavBarView.prototype.ui = {
    header: '.navbar-header',
    siteEntries: '.site-entries',
    appletEntries: '.applet-entries',
    viewEntries: '.view-entries',
    userEntries: '.user-entries'
  };

  BootstrapNavBarView.prototype.regions = {
    header: '@ui.header',
    siteEntries: '@ui.siteEntries',
    appletEntries: '@ui.appletEntries',
    viewEntries: '@ui.viewEntries',
    userEntries: '@ui.userEntries'
  };

  BootstrapNavBarView.prototype.childViewEvents = {
    'click:brand': 'onChildviewClickBrand'
  };

  return BootstrapNavBarView;

}).call(this);

//@_routeToURl url
export default BootstrapNavBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXItbmV4dC9tYWluLXZpZXcuanMiLCJzb3VyY2VzIjpbInRrbmF2YmFyLW5leHQvbWFpbi12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG1CQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0VBQXVCLE9BQUEsYUFBdkI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLGdCQUFQLE1BQUE7O0FBQ0EsT0FBTyxpQkFBUCxNQUFBLFlBTkE7OztBQVNBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBQ2QsYUFBQSxHQUFnQixLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBRVY7RUFBTixNQUFBLG9CQUFBLFFBQWtDLEtBQWxDO0lBMkJFLFFBQVUsQ0FBQSxDQUFBO0FBQ1osVUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsR0FBQSxFQUFBO01BQUksSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUg7UUFDRSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1FBQ04sV0FBQSxHQUFjLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtBQUNkO1FBQUEsS0FBQSxxQ0FBQTs7VUFDRSxxQkFBRyxLQUFLLENBQUUsa0JBQVAsSUFBb0IsQ0FBSSxXQUEzQjtBQUNFLHFCQURGOztVQUVBLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFdBQXRCLEVBQW1DLEtBQW5DLEVBQTBDLE1BQTFDO1FBSEYsQ0FIRjtPQUFBLE1BQUE7UUFRRSxhQUFBLEdBQWdCLElBQUMsQ0FB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LEdBQ0U7SUFBQSxNQUFBLEVBQVEsWUFBUjtJQUNBLFdBQUEsRUFBYSxpQkFEYjtJQUVBLGFBQUEsRUFBZSxtQkFGZjtJQUdBLFdBQUEsRUFBYSxpQkFIYjtJQUlBLFdBQUEsRUFBYTtFQUpiOztnQ0FzQ0YsZUFBQSxHQUNFO0lBQUEsYUFBQSxFQUFlO0VBQWY7Ozs7Y0F6RUo7OztBQXVGQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgeyBNb2RlbCwgUmFkaW8sIGhpc3RvcnkgYXMgQkJoaXN0b3J5IH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJIZWFkZXJWaWV3IGZyb20gJy4vbmF2YmFyLWhlYWRlcidcbmltcG9ydCBOYXZiYXJFbnRyaWVzVmlldyBmcm9tICcuL2VudHJpZXMnXG4jaW1wb3J0IE5hdmJhclRvZ2dsZUJ1dHRvbiBmcm9tICcuL3RvZ2dsZS1idXR0b24nXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTmF2YmFyQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ25hdmJhcidcbiAgICBcbmNsYXNzIEJvb3RzdHJhcE5hdkJhclZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRhZ05hbWU6ICduYXYnXG4gIGlkOiAnbmF2YmFyLXZpZXcnXG4gIGNsYXNzTmFtZTogJ25hdmJhciBuYXZiYXItZXhwYW5kLW1kJ1xuICBhdHRyaWJ1dGVzOlxuICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcbiAgICAneG1sOmxhbmcnOiAnZW4nXG4gICAgcm9sZTogJ25hdmlnYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuZGl2ICcubmF2YmFyLWhlYWRlcidcbiAgICB0Yy5kaXYgJyNuYXZiYXItdmlldy1jb2xsYXBzZS5jb2xsYXBzZS5uYXZiYXItY29sbGFwc2UnLCAtPlxuICAgICAgdGMuZGl2ICcuc2l0ZS1lbnRyaWVzJ1xuICAgICAgdGMuZGl2ICcuYXBwbGV0LWVudHJpZXMnXG4gICAgICB0Yy5kaXYgJy52aWV3LWVudHJpZXMnXG4gICAgICB0Yy5kaXYgJy51c2VyLWVudHJpZXMubWwtYXV0bydcbiAgdWk6XG4gICAgaGVhZGVyOiAnLm5hdmJhci1oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICcuc2l0ZS1lbnRyaWVzJ1xuICAgIGFwcGxldEVudHJpZXM6ICcuYXBwbGV0LWVudHJpZXMnXG4gICAgdmlld0VudHJpZXM6ICcudmlldy1lbnRyaWVzJ1xuICAgIHVzZXJFbnRyaWVzOiAnLnVzZXItZW50cmllcydcbiAgcmVnaW9uczpcbiAgICBoZWFkZXI6ICdAdWkuaGVhZGVyJ1xuICAgIHNpdGVFbnRyaWVzOiAnQHVpLnNpdGVFbnRyaWVzJ1xuICAgIGFwcGxldEVudHJpZXM6ICdAdWkuYXBwbGV0RW50cmllcydcbiAgICB2aWV3RW50cmllczogJ0B1aS52aWV3RW50cmllcydcbiAgICB1c2VyRW50cmllczogJ0B1aS51c2VyRW50cmllcydcbiAgb25SZW5kZXI6IC0+XG4gICAgaWYgQG1vZGVsLmdldCAnaGFzVXNlcidcbiAgICAgIGFwcCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgICAgIGN1cnJlbnRVc2VyID0gYXBwLmdldFN0YXRlICdjdXJyZW50VXNlcidcbiAgICAgIGZvciBlbnRyeSBpbiBAbW9kZWwuZ2V0ICduYXZiYXJFbnRyaWVzJ1xuICAgICAgICBpZiBlbnRyeT8ubmVlZFVzZXIgYW5kIG5vdCBjdXJyZW50VXNlclxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIE5hdmJhckNoYW5uZWwucmVxdWVzdCAnYWRkLWVudHJ5JywgZW50cnksICdzaXRlJ1xuICAgIGVsc2VcbiAgICAgIG5hdmJhckVudHJpZXMgPSBAbW9kZWwuZ2V0ICduYXZiYXJFbnRyaWVzJ1xuICAgICAgTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdhZGQtZW50cmllcycsIG5hdmJhckVudHJpZXMsICdzaXRlJ1xuICAgIGV2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ3NpdGUnXG4gICAgQHNob3dDaGlsZFZpZXcgJ3NpdGVFbnRyaWVzJywgZXZpZXdcbiAgICBhdmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdhcHBsZXQnXG4gICAgQHNob3dDaGlsZFZpZXcgJ2FwcGxldEVudHJpZXMnLCBhdmlld1xuICAgIHZ2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ3ZpZXcnXG4gICAgQHNob3dDaGlsZFZpZXcgJ3ZpZXdFbnRyaWVzJywgdnZpZXdcbiAgICBoZWFkZXJPcHRzID1cbiAgICAgIG1vZGVsOiBuZXcgTW9kZWwgQG1vZGVsLmdldCAnYnJhbmQnXG4gICAgaWYgQG1vZGVsLmdldCAnbmF2YmFyQnJhbmRUZW1wbGF0ZSdcbiAgICAgIGhlYWRlck9wdHMudGVtcGxhdGUgPSBAbW9kZWwuZ2V0ICduYXZiYXJCcmFuZFRlbXBsYXRlJ1xuICAgIGh2aWV3ID0gbmV3IE5hdmJhckhlYWRlclZpZXcgaGVhZGVyT3B0c1xuICAgIEBzaG93Q2hpbGRWaWV3ICdoZWFkZXInLCBodmlld1xuICAgIFxuICBfcm91dGVUb1VSbDogKGhyZWYpIC0+XG4gICAgaWYgaHJlZi5zdGFydHNXaXRoICcvJ1xuICAgICAgd2luZG93Lm9wZW4gaHJlZlxuICAgIEJCaGlzdG9yeS5uYXZpZ2F0ZSBocmVmLCB0cmlnZ2VyOiB0cnVlXG4gICAgcmV0dXJuXG5cbiAgY2hpbGRWaWV3RXZlbnRzOlxuICAgICdjbGljazpicmFuZCc6ICdvbkNoaWxkdmlld0NsaWNrQnJhbmQnXG4gICAgXG4gICMgb25DaGlsZHZpZXdDbGlja0JyYW5kIHdpbGwgbm90IGJlIGNhbGxlZFxuICAjIHdpdGhvdXQgc2V0dGluZyBAY2hpbGRWaWV3RXZlbnRzXG4gIG9uQ2hpbGR2aWV3Q2xpY2tCcmFuZDogKHZpZXcpIC0+XG4gICAgZXZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdzaXRlRW50cmllcydcbiAgICBldmlldy5zZXRBbGxJbmFjdGl2ZSgpXG4gICAgdXJsID0gdmlldy5tb2RlbC5nZXQgJ3VybCdcbiAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpyb3V0ZXInXG4gICAgdXJsID0gXCJhcHBsaWNhdGlvblwiXG4gICAgcm91dGVyLnRyYW5zaXRpb25Ubyh1cmwpXG4gICAgI0Bfcm91dGVUb1VSbCB1cmxcbiAgICByZXR1cm5cbiAgICBcbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE5hdkJhclZpZXdcblxuXG4iXX0=
