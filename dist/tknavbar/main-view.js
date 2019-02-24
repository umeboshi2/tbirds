var BootstrapNavBarView, MainChannel, NavbarChannel;

import $ from 'jquery';

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import NavbarHeaderView from './navbar-header';

import NavbarEntriesView from './entries';

import NavbarToggleButton from './toggle-button';

MainChannel = Backbone.Radio.channel('global');

NavbarChannel = Backbone.Radio.channel('navbar');

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

    
    // onChildviewClickBrand will not be called
    // without setting @childViewEvents
    onChildviewClickBrand(view, event) {
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

  BootstrapNavBarView.prototype.childViewEvents = {
    'click:brand': 'onChildviewClickBrand'
  };

  return BootstrapNavBarView;

}).call(this);

export default BootstrapNavBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sZ0JBQVAsTUFBQTs7QUFDQSxPQUFPLGlCQUFQLE1BQUE7O0FBQ0EsT0FBTyxrQkFBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVY7RUFBTixNQUFBLG9CQUFBLFFBQWtDLEtBQWxDO0lBMkJFLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUg7UUFDRSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1FBQ04sV0FBQSxHQUFjLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtBQUNkO1FBQUEsS0FBQSxxQ0FBQTs7VUFDRSxxQkFBRyxLQUFLLENBQUUsa0JBQVAsSUFBb0IsQ0FBSSxXQUEzQjtBQUNFLHFCQURGOztVQUVBLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFdBQXRCLEVBQW1DLEtBQW5DLEVBQTBDLE1BQTFDO1FBSEYsQ0FIRjtPQUFBLE1BQUE7UUFRRSxhQUFBLEdB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V0FBQSxFQUFhLGVBSGI7SUFJQSxXQUFBLEVBQWE7RUFKYjs7Z0NBS0YsT0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRLFlBQVI7SUFDQSxXQUFBLEVBQWEsaUJBRGI7SUFFQSxhQUFBLEVBQWUsbUJBRmY7SUFHQSxXQUFBLEVBQWEsaUJBSGI7SUFJQSxXQUFBLEVBQWE7RUFKYjs7Z0NBdUNGLGVBQUEsR0FDRTtJQUFBLGFBQUEsRUFBZTtFQUFmOzs7Ozs7QUFZSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJIZWFkZXJWaWV3IGZyb20gJy4vbmF2YmFyLWhlYWRlcidcbmltcG9ydCBOYXZiYXJFbnRyaWVzVmlldyBmcm9tICcuL2VudHJpZXMnXG5pbXBvcnQgTmF2YmFyVG9nZ2xlQnV0dG9uIGZyb20gJy4vdG9nZ2xlLWJ1dHRvbidcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5OYXZiYXJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbmF2YmFyJ1xuICAgIFxuY2xhc3MgQm9vdHN0cmFwTmF2QmFyVmlldyBleHRlbmRzIFZpZXdcbiAgdGFnTmFtZTogJ25hdidcbiAgaWQ6ICduYXZiYXItdmlldydcbiAgY2xhc3NOYW1lOiAnbmF2YmFyIG5hdmJhci1leHBhbmQtbWQnXG4gIGF0dHJpYnV0ZXM6XG4gICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJ1xuICAgICd4bWw6bGFuZyc6ICdlbidcbiAgICByb2xlOiAnbmF2aWdhdGlvbidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInXG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLmRpdiAnLnNpdGUtZW50cmllcydcbiAgICAgIHRjLmRpdiAnLmFwcGxldC1lbnRyaWVzJ1xuICAgICAgdGMuZGl2ICcudmlldy1lbnRyaWVzJ1xuICAgICAgdGMuZGl2ICcudXNlci1lbnRyaWVzLm1sLWF1dG8nXG4gIHVpOlxuICAgIGhlYWRlcjogJy5uYXZiYXItaGVhZGVyJ1xuICAgIHNpdGVFbnRyaWVzOiAnLnNpdGUtZW50cmllcydcbiAgICBhcHBsZXRFbnRyaWVzOiAnLmFwcGxldC1lbnRyaWVzJ1xuICAgIHZpZXdFbnRyaWVzOiAnLnZpZXctZW50cmllcydcbiAgICB1c2VyRW50cmllczogJy51c2VyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAnQHVpLmhlYWRlcidcbiAgICBzaXRlRW50cmllczogJ0B1aS5zaXRlRW50cmllcydcbiAgICBhcHBsZXRFbnRyaWVzOiAnQHVpLmFwcGxldEVudHJpZXMnXG4gICAgdmlld0VudHJpZXM6ICdAdWkudmlld0VudHJpZXMnXG4gICAgdXNlckVudHJpZXM6ICdAdWkudXNlckVudHJpZXMnXG4gIG9uUmVuZGVyOiAtPlxuICAgIGlmIEBtb2RlbC5nZXQgJ2hhc1VzZXInXG4gICAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgICBjdXJyZW50VXNlciA9IGFwcC5nZXRTdGF0ZSAnY3VycmVudFVzZXInXG4gICAgICBmb3IgZW50cnkgaW4gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgICAgaWYgZW50cnk/Lm5lZWRVc2VyIGFuZCBub3QgY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyeScsIGVudHJ5LCAnc2l0ZSdcbiAgICBlbHNlXG4gICAgICBuYXZiYXJFbnRyaWVzID0gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgIE5hdmJhckNoYW5uZWwucmVxdWVzdCAnYWRkLWVudHJpZXMnLCBuYXZiYXJFbnRyaWVzLCAnc2l0ZSdcbiAgICBldmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdzaXRlJ1xuICAgIEBzaG93Q2hpbGRWaWV3ICdzaXRlRW50cmllcycsIGV2aWV3XG4gICAgYXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnYXBwbGV0J1xuICAgIEBzaG93Q2hpbGRWaWV3ICdhcHBsZXRFbnRyaWVzJywgYXZpZXdcbiAgICB2dmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICd2aWV3J1xuICAgIEBzaG93Q2hpbGRWaWV3ICd2aWV3RW50cmllcycsIHZ2aWV3XG4gICAgaGVhZGVyT3B0cyA9XG4gICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsIEBtb2RlbC5nZXQgJ2JyYW5kJ1xuICAgIGlmIEBtb2RlbC5nZXQgJ25hdmJhckJyYW5kVGVtcGxhdGUnXG4gICAgICBoZWFkZXJPcHRzLnRlbXBsYXRlID0gQG1vZGVsLmdldCAnbmF2YmFyQnJhbmRUZW1wbGF0ZSdcbiAgICBodmlldyA9IG5ldyBOYXZiYXJIZWFkZXJWaWV3IGhlYWRlck9wdHNcbiAgICBAc2hvd0NoaWxkVmlldyAnaGVhZGVyJywgaHZpZXdcbiAgICBcbiAgX3JvdXRlVG9VUmw6IChocmVmKSAtPlxuICAgIGlmIGhyZWYuc3RhcnRzV2l0aCAnLydcbiAgICAgIHdpbmRvdy5vcGVuIGhyZWZcbiAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLXJvdXRlcidcbiAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgIHJldHVyblxuXG4gIGNoaWxkVmlld0V2ZW50czpcbiAgICAnY2xpY2s6YnJhbmQnOiAnb25DaGlsZHZpZXdDbGlja0JyYW5kJ1xuICAgIFxuICAjIG9uQ2hpbGR2aWV3Q2xpY2tCcmFuZCB3aWxsIG5vdCBiZSBjYWxsZWRcbiAgIyB3aXRob3V0IHNldHRpbmcgQGNoaWxkVmlld0V2ZW50c1xuICBvbkNoaWxkdmlld0NsaWNrQnJhbmQ6ICh2aWV3LCBldmVudCkgLT5cbiAgICBldmlldyA9IEBnZXRDaGlsZFZpZXcgJ3NpdGVFbnRyaWVzJ1xuICAgIGV2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICB1cmwgPSB2aWV3Lm1vZGVsLmdldCAndXJsJ1xuICAgIHVybCA9IHVybCBvciBcIiNcIlxuICAgIEBfcm91dGVUb1VSbCB1cmxcbiAgICByZXR1cm5cbiAgICBcbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE5hdkJhclZpZXdcblxuXG4iXX0=
