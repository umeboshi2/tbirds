var BootstrapNavBarView, MainChannel, NavbarChannel;

import $ from 'jquery';

import {
  Model,
  Radio
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
      var router;
      if (href.startsWith('/')) {
        window.open(href);
      }
      router = MainChannel.request('main-router');
      router.navigate(href, {
        trigger: true
      });
    }

    
    // onChildviewClickBrand will not be called
    // without setting @childViewEvents
    onChildviewClickBrand(view) {
      var eview, url;
      eview = this.getChildView('siteEntries');
      eview.setAllInactive();
      url = view.model.get('url');
      url = url || "#";
      this._routeToURl(url);
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

export default BootstrapNavBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7RUFBZ0IsS0FBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLGdCQUFQLE1BQUE7O0FBQ0EsT0FBTyxpQkFBUCxNQUFBLFlBTkE7OztBQVNBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBQ2QsYUFBQSxHQUFnQixLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBRVY7RUFBTixNQUFBLG9CQUFBLFFBQWtDLEtBQWxDO0lBMkJFLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUg7UUFDRSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1FBQ04sV0FBQSxHQUFjLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtBQUNkO1FBQUEsS0FBQSxxQ0FBQTs7VUFDRSxxQkFBRyxLQUFLLENBQUUsa0JBQVAsSUFBb0IsQ0FBSSxXQUEzQjtBQUNFLHFCQURGOztVQUVBLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFdBQXRCLEVBQW1DLEtBQW5DLEVBQTBDLE1BQTFDO1FBSEYsQ0FIRjtPQUFBLE1BQUE7UUFRRSxhQUFBLEdBQWdCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGVBQVg7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LFlBQVI7SUFDQSxXQUFBLEVBQWEsaUJBRGI7SUFFQSxhQUFBLEVBQWUsbUJBRmY7SUFHQSxXQUFBLEVBQWEsaUJBSGI7SUFJQSxXQUFBLEVBQWE7RUFKYjs7Z0NBdUNGLGVBQUEsR0FDRTtJQUFBLGFBQUEsRUFBZTtFQUFmOzs7Ozs7QUFZSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgeyBNb2RlbCwgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhckhlYWRlclZpZXcgZnJvbSAnLi9uYXZiYXItaGVhZGVyJ1xuaW1wb3J0IE5hdmJhckVudHJpZXNWaWV3IGZyb20gJy4vZW50cmllcydcbiNpbXBvcnQgTmF2YmFyVG9nZ2xlQnV0dG9uIGZyb20gJy4vdG9nZ2xlLWJ1dHRvbidcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5OYXZiYXJDaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnbmF2YmFyJ1xuICAgIFxuY2xhc3MgQm9vdHN0cmFwTmF2QmFyVmlldyBleHRlbmRzIFZpZXdcbiAgdGFnTmFtZTogJ25hdidcbiAgaWQ6ICduYXZiYXItdmlldydcbiAgY2xhc3NOYW1lOiAnbmF2YmFyIG5hdmJhci1leHBhbmQtbWQnXG4gIGF0dHJpYnV0ZXM6XG4gICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJ1xuICAgICd4bWw6bGFuZyc6ICdlbidcbiAgICByb2xlOiAnbmF2aWdhdGlvbidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJ1xuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbGxhcHNlLmNvbGxhcHNlLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICB0Yy5kaXYgJy5zaXRlLWVudHJpZXMnXG4gICAgICB0Yy5kaXYgJy5hcHBsZXQtZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnZpZXctZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnVzZXItZW50cmllcy5tbC1hdXRvJ1xuICB1aTpcbiAgICBoZWFkZXI6ICcubmF2YmFyLWhlYWRlcidcbiAgICBzaXRlRW50cmllczogJy5zaXRlLWVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJy5hcHBsZXQtZW50cmllcydcbiAgICB2aWV3RW50cmllczogJy52aWV3LWVudHJpZXMnXG4gICAgdXNlckVudHJpZXM6ICcudXNlci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGhlYWRlcjogJ0B1aS5oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICdAdWkuc2l0ZUVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJ0B1aS5hcHBsZXRFbnRyaWVzJ1xuICAgIHZpZXdFbnRyaWVzOiAnQHVpLnZpZXdFbnRyaWVzJ1xuICAgIHVzZXJFbnRyaWVzOiAnQHVpLnVzZXJFbnRyaWVzJ1xuICBvblJlbmRlcjogLT5cbiAgICBpZiBAbW9kZWwuZ2V0ICdoYXNVc2VyJ1xuICAgICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgICAgY3VycmVudFVzZXIgPSBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgICAgZm9yIGVudHJ5IGluIEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICAgIGlmIGVudHJ5Py5uZWVkVXNlciBhbmQgbm90IGN1cnJlbnRVc2VyXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdhZGQtZW50cnknLCBlbnRyeSwgJ3NpdGUnXG4gICAgZWxzZVxuICAgICAgbmF2YmFyRW50cmllcyA9IEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyaWVzJywgbmF2YmFyRW50cmllcywgJ3NpdGUnXG4gICAgZXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnc2l0ZSdcbiAgICBAc2hvd0NoaWxkVmlldyAnc2l0ZUVudHJpZXMnLCBldmlld1xuICAgIGF2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBAc2hvd0NoaWxkVmlldyAnYXBwbGV0RW50cmllcycsIGF2aWV3XG4gICAgdnZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAndmlldydcbiAgICBAc2hvd0NoaWxkVmlldyAndmlld0VudHJpZXMnLCB2dmlld1xuICAgIGhlYWRlck9wdHMgPVxuICAgICAgbW9kZWw6IG5ldyBNb2RlbCBAbW9kZWwuZ2V0ICdicmFuZCdcbiAgICBpZiBAbW9kZWwuZ2V0ICduYXZiYXJCcmFuZFRlbXBsYXRlJ1xuICAgICAgaGVhZGVyT3B0cy50ZW1wbGF0ZSA9IEBtb2RlbC5nZXQgJ25hdmJhckJyYW5kVGVtcGxhdGUnXG4gICAgaHZpZXcgPSBuZXcgTmF2YmFySGVhZGVyVmlldyBoZWFkZXJPcHRzXG4gICAgQHNob3dDaGlsZFZpZXcgJ2hlYWRlcicsIGh2aWV3XG4gICAgXG4gIF9yb3V0ZVRvVVJsOiAoaHJlZikgLT5cbiAgICBpZiBocmVmLnN0YXJ0c1dpdGggJy8nXG4gICAgICB3aW5kb3cub3BlbiBocmVmXG4gICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgcm91dGVyLm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICByZXR1cm5cblxuICBjaGlsZFZpZXdFdmVudHM6XG4gICAgJ2NsaWNrOmJyYW5kJzogJ29uQ2hpbGR2aWV3Q2xpY2tCcmFuZCdcbiAgICBcbiAgIyBvbkNoaWxkdmlld0NsaWNrQnJhbmQgd2lsbCBub3QgYmUgY2FsbGVkXG4gICMgd2l0aG91dCBzZXR0aW5nIEBjaGlsZFZpZXdFdmVudHNcbiAgb25DaGlsZHZpZXdDbGlja0JyYW5kOiAodmlldykgLT5cbiAgICBldmlldyA9IEBnZXRDaGlsZFZpZXcgJ3NpdGVFbnRyaWVzJ1xuICAgIGV2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICB1cmwgPSB2aWV3Lm1vZGVsLmdldCAndXJsJ1xuICAgIHVybCA9IHVybCBvciBcIiNcIlxuICAgIEBfcm91dGVUb1VSbCB1cmxcbiAgICByZXR1cm5cbiAgICBcbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE5hdkJhclZpZXdcblxuXG4iXX0=
