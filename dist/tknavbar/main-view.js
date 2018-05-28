var BootstrapNavBarView, MainChannel, NavbarChannel;

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import NavbarHeaderView from './navbar-header';

import NavbarEntriesView from './entries';

import NavbarToggleButton from './toggle-button';

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
      if (href.startsWith('/')) {
        window.open(href);
      }
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

  BootstrapNavBarView.prototype.className = 'navbar navbar-expand-md';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxnQkFBUCxNQUFBOztBQUNBLE9BQU8saUJBQVAsTUFBQTs7QUFDQSxPQUFPLGtCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxhQUFBLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFVjtFQUFOLE1BQUEsb0JBQUEsUUFBa0MsVUFBVSxDQUFDLEtBQTdDO0lBMkJFLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUg7UUFDRSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1FBQ04sV0FBQSxHQUFjLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtBQUNkO1FBQUEsS0FBQSxxQ0FBQTs7VUFDRSxxQkFBRyxLQUFLLENBQUUsa0JBQVAsSUFBb0IsQ0FBSSxXQUEzQjtBQUNFLHFCQURGOztVQUVBLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFdBQXRCLEVBQW1DLEtBQW5DLEVBQTBDLE1BQTFDO1FBSEYsQ0FIRjtPQUFBLE1BQUE7UUFRRSxhQUFBLEdB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LGdCQUFQO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnREFBUCxFQUF5RCxRQUFBLENBQUEsQ0FBQTtNQUN2RCxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVA7TUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGlCQUFQO01BQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQO2FBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyx1QkFBUDtJQUp1RCxDQUF6RDtFQUZzQixDQUFkOztnQ0FPVixFQUFBLEdBQ0U7SUFBQSxNQUFBLEVBQVEsZ0JBQVI7SUFDQSxXQUFBLEVBQWEsZUFEYjtJQUVBLGFBQUEsRUFBZSxpQkFGZjtJQUdBLFdBQUEsRUFBYSxlQUhiO0lBSUEsV0FBQSxFQUFhO0VBSmI7O2dDQUtGLE9BQUEsR0FDRTtJQUFBLE1BQUEsRUFBUSxZQUFSO0lBQ0EsV0FBQSxFQUFhLGlCQURiO0lBRUEsYUFBQSxFQUFlLG1CQUZmO0lBR0EsV0FBQSxFQUFhLGlCQUhiO0lBSUEsV0FBQSxFQUFhO0VBSmI7Ozs7OztBQXdESixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhckhlYWRlclZpZXcgZnJvbSAnLi9uYXZiYXItaGVhZGVyJ1xuaW1wb3J0IE5hdmJhckVudHJpZXNWaWV3IGZyb20gJy4vZW50cmllcydcbmltcG9ydCBOYXZiYXJUb2dnbGVCdXR0b24gZnJvbSAnLi90b2dnbGUtYnV0dG9uJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk5hdmJhckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICduYXZiYXInXG4gICAgXG5jbGFzcyBCb290c3RyYXBOYXZCYXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRhZ05hbWU6ICduYXYnXG4gIGlkOiAnbmF2YmFyLXZpZXcnXG4gIGNsYXNzTmFtZTogJ25hdmJhciBuYXZiYXItZXhwYW5kLW1kJ1xuICBhdHRyaWJ1dGVzOlxuICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcbiAgICAneG1sOmxhbmcnOiAnZW4nXG4gICAgcm9sZTogJ25hdmlnYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJ1xuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbGxhcHNlLmNvbGxhcHNlLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICB0Yy5kaXYgJy5zaXRlLWVudHJpZXMnXG4gICAgICB0Yy5kaXYgJy5hcHBsZXQtZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnZpZXctZW50cmllcydcbiAgICAgIHRjLmRpdiAnLnVzZXItZW50cmllcy5tbC1hdXRvJ1xuICB1aTpcbiAgICBoZWFkZXI6ICcubmF2YmFyLWhlYWRlcidcbiAgICBzaXRlRW50cmllczogJy5zaXRlLWVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJy5hcHBsZXQtZW50cmllcydcbiAgICB2aWV3RW50cmllczogJy52aWV3LWVudHJpZXMnXG4gICAgdXNlckVudHJpZXM6ICcudXNlci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGhlYWRlcjogJ0B1aS5oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICdAdWkuc2l0ZUVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJ0B1aS5hcHBsZXRFbnRyaWVzJ1xuICAgIHZpZXdFbnRyaWVzOiAnQHVpLnZpZXdFbnRyaWVzJ1xuICAgIHVzZXJFbnRyaWVzOiAnQHVpLnVzZXJFbnRyaWVzJ1xuICBvblJlbmRlcjogLT5cbiAgICBpZiBAbW9kZWwuZ2V0ICdoYXNVc2VyJ1xuICAgICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgICAgY3VycmVudFVzZXIgPSBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgICAgZm9yIGVudHJ5IGluIEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICAgIGlmIGVudHJ5Py5uZWVkVXNlciBhbmQgbm90IGN1cnJlbnRVc2VyXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdhZGQtZW50cnknLCBlbnRyeSwgJ3NpdGUnXG4gICAgZWxzZVxuICAgICAgbmF2YmFyRW50cmllcyA9IEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyaWVzJywgbmF2YmFyRW50cmllcywgJ3NpdGUnXG4gICAgZXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnc2l0ZSdcbiAgICBAc2hvd0NoaWxkVmlldyAnc2l0ZUVudHJpZXMnLCBldmlld1xuICAgIGF2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBAc2hvd0NoaWxkVmlldyAnYXBwbGV0RW50cmllcycsIGF2aWV3XG4gICAgdnZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAndmlldydcbiAgICBAc2hvd0NoaWxkVmlldyAndmlld0VudHJpZXMnLCB2dmlld1xuICAgIGhlYWRlck9wdHMgPVxuICAgICAgbW9kZWw6IG5ldyBCYWNrYm9uZS5Nb2RlbCBAbW9kZWwuZ2V0ICdicmFuZCdcbiAgICBpZiBAbW9kZWwuZ2V0ICduYXZiYXJCcmFuZFRlbXBsYXRlJ1xuICAgICAgaGVhZGVyT3B0cy50ZW1wbGF0ZSA9IEBtb2RlbC5nZXQgJ25hdmJhckJyYW5kVGVtcGxhdGUnXG4gICAgaHZpZXcgPSBuZXcgTmF2YmFySGVhZGVyVmlldyBoZWFkZXJPcHRzXG4gICAgQHNob3dDaGlsZFZpZXcgJ2hlYWRlcicsIGh2aWV3XG4gICAgXG4gIF9yb3V0ZVRvVVJsOiAoaHJlZikgLT5cbiAgICBpZiBocmVmLnN0YXJ0c1dpdGggJy8nXG4gICAgICB3aW5kb3cub3BlbiBocmVmXG4gICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgcm91dGVyLm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICByZXR1cm5cbiAgICBcbiAgb25DaGlsZHZpZXdDbGlja0JyYW5kOiAodmlldywgZXZlbnQpIC0+XG4gICAgZXZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdzaXRlRW50cmllcydcbiAgICBldmlldy5zZXRBbGxJbmFjdGl2ZSgpXG4gICAgdXJsID0gdmlldy5tb2RlbC5nZXQgJ3VybCdcbiAgICB1cmwgPSB1cmwgb3IgXCIjXCJcbiAgICBAX3JvdXRlVG9VUmwgdXJsXG4gICAgcmV0dXJuXG4gICAgXG4gIG5hdmlnYXRlT25DbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gJCh0YXJnZXQpLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgQF9yb3V0ZVRvVVJsIGhyZWZcblxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwTmF2QmFyVmlld1xuXG5cbiJdfQ==
