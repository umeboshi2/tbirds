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
      var eview, router;
      eview = this.getChildView('siteEntries');
      eview.setAllInactive();
      router = MainChannel.request('main:app:router');
      router.transitionTo("application");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXItbmV4dC9tYWluLXZpZXcuanMiLCJzb3VyY2VzIjpbInRrbmF2YmFyLW5leHQvbWFpbi12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG1CQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLEtBQWhCO0VBQXVCLE9BQUEsYUFBdkI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLGdCQUFQLE1BQUE7O0FBQ0EsT0FBTyxpQkFBUCxNQUFBLFlBTkE7OztBQVNBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBQ2QsYUFBQSxHQUFnQixLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBRVY7RUFBTixNQUFBLG9CQUFBLFFBQWtDLEtBQWxDO0lBMkJFLFFBQVUsQ0FBQSxDQUFBO0FBQ1osVUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsR0FBQSxFQUFBO01BQUksSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUg7UUFDRSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1FBQ04sV0FBQSxHQUFjLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtBQUNkO1FBQUEsS0FBQSxxQ0FBQTs7VUFDRSxxQkFBRyxLQUFLLENBQUUsa0JBQVAsSUFBb0IsQ0FBSSxXQUEzQjtBQUNFLHFCQURGOztVQUVBLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFdBQXRCLEVBQW1DLEtBQW5DLEVBQTBDLE1BQTFDO1FBSEYsQ0FIRjtPQUFBLE1BQUE7UUFRRSxhQUFBLEdBQWdCLElBQUMsQ0FB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QUEsRUFBYSxpQkFIYjtJQUlBLFdBQUEsRUFBYTtFQUpiOztnQ0FzQ0YsZUFBQSxHQUNFO0lBQUEsYUFBQSxFQUFlO0VBQWY7Ozs7OztBQVdKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCB7IE1vZGVsLCBSYWRpbywgaGlzdG9yeSBhcyBCQmhpc3RvcnkgfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhckhlYWRlclZpZXcgZnJvbSAnLi9uYXZiYXItaGVhZGVyJ1xuaW1wb3J0IE5hdmJhckVudHJpZXNWaWV3IGZyb20gJy4vZW50cmllcydcbiNpbXBvcnQgTmF2YmFyVG9nZ2xlQnV0dG9uIGZyb20gJy4vdG9nZ2xlLWJ1dHRvbidcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5OYXZiYXJDaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnbmF2YmFyJ1xuICAgIFxuY2xhc3MgQm9vdHN0cmFwTmF2QmFyVmlldyBleHRlbmRzIFZpZXdcbiAgdGFnTmFtZTogJ25hdidcbiAgaWQ6ICduYXZiYXItdmlldydcbiAgY2xhc3NOYW1lOiAnbmF2YmFyIG5hdmJhci1leHBhbmQtbWQnXG4gIGF0dHJpYnV0ZXM6XG4gICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJ1xuICAgICd4bWw6bGFuZyc6ICdlbidcbiAgICByb2xlOiAnbmF2aWdhdGlvbidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJ1xuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbGxhcHNlLmNvbGxhcHNlLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICB0Yy5kaXYgJy5zaXRlLWVudHJpZXMnXG4gICAgICB0Yy5kaXYgJy5hcHBsZXQtZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnZpZXctZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnVzZXItZW50cmllcy5tbC1hdXRvJ1xuICB1aTpcbiAgICBoZWFkZXI6ICcubmF2YmFyLWhlYWRlcidcbiAgICBzaXRlRW50cmllczogJy5zaXRlLWVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJy5hcHBsZXQtZW50cmllcydcbiAgICB2aWV3RW50cmllczogJy52aWV3LWVudHJpZXMnXG4gICAgdXNlckVudHJpZXM6ICcudXNlci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGhlYWRlcjogJ0B1aS5oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICdAdWkuc2l0ZUVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJ0B1aS5hcHBsZXRFbnRyaWVzJ1xuICAgIHZpZXdFbnRyaWVzOiAnQHVpLnZpZXdFbnRyaWVzJ1xuICAgIHVzZXJFbnRyaWVzOiAnQHVpLnVzZXJFbnRyaWVzJ1xuICBvblJlbmRlcjogLT5cbiAgICBpZiBAbW9kZWwuZ2V0ICdoYXNVc2VyJ1xuICAgICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgICAgY3VycmVudFVzZXIgPSBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgICAgZm9yIGVudHJ5IGluIEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICAgIGlmIGVudHJ5Py5uZWVkVXNlciBhbmQgbm90IGN1cnJlbnRVc2VyXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdhZGQtZW50cnknLCBlbnRyeSwgJ3NpdGUnXG4gICAgZWxzZVxuICAgICAgbmF2YmFyRW50cmllcyA9IEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyaWVzJywgbmF2YmFyRW50cmllcywgJ3NpdGUnXG4gICAgZXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnc2l0ZSdcbiAgICBAc2hvd0NoaWxkVmlldyAnc2l0ZUVudHJpZXMnLCBldmlld1xuICAgIGF2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBAc2hvd0NoaWxkVmlldyAnYXBwbGV0RW50cmllcycsIGF2aWV3XG4gICAgdnZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAndmlldydcbiAgICBAc2hvd0NoaWxkVmlldyAndmlld0VudHJpZXMnLCB2dmlld1xuICAgIGhlYWRlck9wdHMgPVxuICAgICAgbW9kZWw6IG5ldyBNb2RlbCBAbW9kZWwuZ2V0ICdicmFuZCdcbiAgICBpZiBAbW9kZWwuZ2V0ICduYXZiYXJCcmFuZFRlbXBsYXRlJ1xuICAgICAgaGVhZGVyT3B0cy50ZW1wbGF0ZSA9IEBtb2RlbC5nZXQgJ25hdmJhckJyYW5kVGVtcGxhdGUnXG4gICAgaHZpZXcgPSBuZXcgTmF2YmFySGVhZGVyVmlldyBoZWFkZXJPcHRzXG4gICAgQHNob3dDaGlsZFZpZXcgJ2hlYWRlcicsIGh2aWV3XG4gICAgXG4gIF9yb3V0ZVRvVVJsOiAoaHJlZikgLT5cbiAgICBpZiBocmVmLnN0YXJ0c1dpdGggJy8nXG4gICAgICB3aW5kb3cub3BlbiBocmVmXG4gICAgQkJoaXN0b3J5Lm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICByZXR1cm5cblxuICBjaGlsZFZpZXdFdmVudHM6XG4gICAgJ2NsaWNrOmJyYW5kJzogJ29uQ2hpbGR2aWV3Q2xpY2tCcmFuZCdcbiAgICBcbiAgIyBvbkNoaWxkdmlld0NsaWNrQnJhbmQgd2lsbCBub3QgYmUgY2FsbGVkXG4gICMgd2l0aG91dCBzZXR0aW5nIEBjaGlsZFZpZXdFdmVudHNcbiAgb25DaGlsZHZpZXdDbGlja0JyYW5kOiAodmlldykgLT5cbiAgICBldmlldyA9IEBnZXRDaGlsZFZpZXcgJ3NpdGVFbnRyaWVzJ1xuICAgIGV2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpyb3V0ZXInXG4gICAgcm91dGVyLnRyYW5zaXRpb25UbyBcImFwcGxpY2F0aW9uXCJcbiAgICByZXR1cm5cblxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwTmF2QmFyVmlld1xuXG5cbiJdfQ==
