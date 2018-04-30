var BootstrapNavBarView, MainChannel, NavbarChannel;

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import NavbarHeaderView from './navbar-header';

import NavbarEntriesView from './entries';

MainChannel = Backbone.Radio.channel('global');

NavbarChannel = Backbone.Radio.channel('navbar');

BootstrapNavBarView = (function() {
  class BootstrapNavBarView extends Marionette.View {
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
        model: new Backbone.Model(this.model.get('brand'))
      };
      if (this.model.get('navbarBrandTemplate')) {
        headerOpts.template = this.model.get('navbarBrandTemplate');
      }
      hview = new NavbarHeaderView(headerOpts);
      return this.showChildView('header', hview);
    }

    _routeToURl(href) {
      var router;
      router = MainChannel.request('main-router');
      router.navigate(href, {
        trigger: true
      });
    }

    onChildviewClickBrand(view, event) {
      var eview, url;
      eview = this.getChildView('siteEntries');
      eview.setAllInactive();
      url = view.model.get('url');
      url = url || "#";
      this._routeToURl(url);
    }

    navigateOnClickEntry(cview, event) {
      var href, target;
      target = event.target;
      // look at href and go there maybe?
      href = $(target).attr('href');
      if (href.split('/')[0] === '') {
        return window.location = href;
      } else {
        return this._routeToURl(href);
      }
    }

  };

  BootstrapNavBarView.prototype.tagName = 'nav';

  BootstrapNavBarView.prototype.id = 'navbar-view';

  BootstrapNavBarView.prototype.attributes = {
    xmlns: 'http://www.w3.org/1999/xhtml',
    'xml:lang': 'en',
    role: 'navigation'
  };

  BootstrapNavBarView.prototype.template = tc.renderable(function(model) {
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

  return BootstrapNavBarView;

}).call(this);

export default BootstrapNavBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxnQkFBUCxNQUFBOztBQUNBLE9BQU8saUJBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVWO0VBQU4sTUFBQSxvQkFBQSxRQUFrQyxVQUFVLENBQUMsS0FBN0M7SUEwQkUsUUFBVSxDQUFBLENBQUE7QUFDUixVQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLGFBQUEsRUFBQSxHQUFBLEVBQUE7TUFBQSxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFNBQVgsQ0FBSDtRQUNFLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7UUFDTixXQUFBLEdBQWMsR0FBRyxDQUFDLFFBQUosQ0FBYSxhQUFiO0FBQ2Q7UUFBQSxLQUFBLHFDQUFBOztVQUNFLHFCQUFHLEtBQUssQ0FBRSxrQkFBUCxJQUFvQixDQUFJLFdBQTNCO0FBQ0UscUJBREY7O1VBRUEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsV0FBdEIsRUFBbUMsS0FBbkMsRUFBMEMsTUFBMUM7UUFIRixDQUhGO09BQUEsTUFBQTtRQVFFLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLEtBQUssQ0FB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QUFQO01BQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQO2FBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyx1QkFBUDtJQUp1RCxDQUF6RDtFQUZzQixDQUFkOztnQ0FPVixFQUFBLEdBQ0U7SUFBQSxNQUFBLEVBQVEsZ0JBQVI7SUFDQSxXQUFBLEVBQWEsZUFEYjtJQUVBLGFBQUEsRUFBZSxpQkFGZjtJQUdBLFdBQUEsRUFBYSxlQUhiO0lBSUEsV0FBQSxFQUFhO0VBSmI7O2dDQUtGLE9BQUEsR0FDRTtJQUFBLE1BQUEsRUFBUSxZQUFSO0lBQ0EsV0FBQSxFQUFhLGlCQURiO0lBRUEsYUFBQSxFQUFlLG1CQUZmO0lBR0EsV0FBQSxFQUFhLGlCQUhiO0lBSUEsV0FBQSxFQUFhO0VBSmI7Ozs7OztBQTBESixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhckhlYWRlclZpZXcgZnJvbSAnLi9uYXZiYXItaGVhZGVyJ1xuaW1wb3J0IE5hdmJhckVudHJpZXNWaWV3IGZyb20gJy4vZW50cmllcydcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5OYXZiYXJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbmF2YmFyJ1xuICAgIFxuY2xhc3MgQm9vdHN0cmFwTmF2QmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0YWdOYW1lOiAnbmF2J1xuICBpZDogJ25hdmJhci12aWV3J1xuICBhdHRyaWJ1dGVzOlxuICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcbiAgICAneG1sOmxhbmcnOiAnZW4nXG4gICAgcm9sZTogJ25hdmlnYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJ1xuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbGxhcHNlLmNvbGxhcHNlLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICB0Yy5kaXYgJy5zaXRlLWVudHJpZXMnXG4gICAgICB0Yy5kaXYgJy5hcHBsZXQtZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnZpZXctZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnVzZXItZW50cmllcy5tbC1hdXRvJ1xuICB1aTpcbiAgICBoZWFkZXI6ICcubmF2YmFyLWhlYWRlcidcbiAgICBzaXRlRW50cmllczogJy5zaXRlLWVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJy5hcHBsZXQtZW50cmllcydcbiAgICB2aWV3RW50cmllczogJy52aWV3LWVudHJpZXMnXG4gICAgdXNlckVudHJpZXM6ICcudXNlci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGhlYWRlcjogJ0B1aS5oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICdAdWkuc2l0ZUVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJ0B1aS5hcHBsZXRFbnRyaWVzJ1xuICAgIHZpZXdFbnRyaWVzOiAnQHVpLnZpZXdFbnRyaWVzJ1xuICAgIHVzZXJFbnRyaWVzOiAnQHVpLnVzZXJFbnRyaWVzJ1xuICBvblJlbmRlcjogLT5cbiAgICBpZiBAbW9kZWwuZ2V0ICdoYXNVc2VyJ1xuICAgICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgICAgY3VycmVudFVzZXIgPSBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgICAgZm9yIGVudHJ5IGluIEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICAgIGlmIGVudHJ5Py5uZWVkVXNlciBhbmQgbm90IGN1cnJlbnRVc2VyXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdhZGQtZW50cnknLCBlbnRyeSwgJ3NpdGUnXG4gICAgZWxzZVxuICAgICAgbmF2YmFyRW50cmllcyA9IEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyaWVzJywgbmF2YmFyRW50cmllcywgJ3NpdGUnXG4gICAgZXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnc2l0ZSdcbiAgICBAc2hvd0NoaWxkVmlldyAnc2l0ZUVudHJpZXMnLCBldmlld1xuICAgIGF2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBAc2hvd0NoaWxkVmlldyAnYXBwbGV0RW50cmllcycsIGF2aWV3XG4gICAgdnZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAndmlldydcbiAgICBAc2hvd0NoaWxkVmlldyAndmlld0VudHJpZXMnLCB2dmlld1xuICAgIGhlYWRlck9wdHMgPVxuICAgICAgbW9kZWw6IG5ldyBCYWNrYm9uZS5Nb2RlbCBAbW9kZWwuZ2V0ICdicmFuZCdcbiAgICBpZiBAbW9kZWwuZ2V0ICduYXZiYXJCcmFuZFRlbXBsYXRlJ1xuICAgICAgaGVhZGVyT3B0cy50ZW1wbGF0ZSA9IEBtb2RlbC5nZXQgJ25hdmJhckJyYW5kVGVtcGxhdGUnXG4gICAgaHZpZXcgPSBuZXcgTmF2YmFySGVhZGVyVmlldyBoZWFkZXJPcHRzXG4gICAgQHNob3dDaGlsZFZpZXcgJ2hlYWRlcicsIGh2aWV3XG5cbiAgX3JvdXRlVG9VUmw6IChocmVmKSAtPlxuICAgIHJvdXRlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tcm91dGVyJ1xuICAgIHJvdXRlci5uYXZpZ2F0ZSBocmVmLCB0cmlnZ2VyOiB0cnVlXG4gICAgcmV0dXJuXG4gICAgXG4gIG9uQ2hpbGR2aWV3Q2xpY2tCcmFuZDogKHZpZXcsIGV2ZW50KSAtPlxuICAgIGV2aWV3ID0gQGdldENoaWxkVmlldyAnc2l0ZUVudHJpZXMnXG4gICAgZXZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIHVybCA9IHZpZXcubW9kZWwuZ2V0ICd1cmwnXG4gICAgdXJsID0gdXJsIG9yIFwiI1wiXG4gICAgQF9yb3V0ZVRvVVJsIHVybFxuICAgIHJldHVyblxuICAgIFxuXG4gICAgXG4gIG5hdmlnYXRlT25DbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gJCh0YXJnZXQpLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgQF9yb3V0ZVRvVVJsIGhyZWZcblxuICAgICAgXG5cbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE5hdkJhclZpZXdcblxuXG4iXX0=
