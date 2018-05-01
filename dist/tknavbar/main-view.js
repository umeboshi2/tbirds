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
      var app, aview, currentUser, entry, eview, headerOpts, hview, i, len, navbarEntries, ref, view, vview;
      console.log("@ui.toggleBtn", this.ui.toggleBtn);
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
      this.showChildView('header', hview);
      view = new NavbarToggleButton;
      return this.showChildView('toggleBtn', view);
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

    toggleCollapse(event) {
      return console.log("Togglecollapse", event);
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
    tc.div('.toggle-button');
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
    userEntries: '.user-entries',
    toggleBtn: '.toggle-button'
  };

  BootstrapNavBarView.prototype.regions = {
    toggleBtn: '@ui.toggleBtn',
    header: '@ui.header',
    siteEntries: '@ui.siteEntries',
    appletEntries: '@ui.appletEntries',
    viewEntries: '@ui.viewEntries',
    userEntries: '@ui.userEntries'
  };

  BootstrapNavBarView.prototype.events = {
    'click @ui.toggleBtn': 'toggleCollapse'
  };

  return BootstrapNavBarView;

}).call(this);

export default BootstrapNavBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxnQkFBUCxNQUFBOztBQUNBLE9BQU8saUJBQVAsTUFBQTs7QUFDQSxPQUFPLGtCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxhQUFBLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFVjtFQUFOLE1BQUEsb0JBQUEsUUFBa0MsVUFBVSxDQUFDLEtBQTdDO0lBZ0NFLFFBQVUsQ0FBQSxDQUFBO0FBQ1IsVUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWixFQUE2QixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQWpDO01BQ0EsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUg7UUFDRSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1FBQ04sV0FBQSxHQUFjLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtBQUNkO1FBQUEsS0FBQSxxQ0FBQTs7VUFDRSxxQkFBRyxLQUFLLENBQUUsa0JBQVAsSUFBb0IsQ0FBSSxXQUEzQjtBQUNFLHFCQURGOztVQUVBLGFBQWEsQ0FBQyxP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QUFPLDhCQUFQO0lBQ0EsVUFBQSxFQUFZLElBRFo7SUFFQSxJQUFBLEVBQU07RUFGTjs7Z0NBR0YsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdCQUFQO0lBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnQkFBUDtXQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0RBQVAsRUFBeUQsUUFBQSxDQUFBLENBQUE7TUFDdkQsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQO01BQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxpQkFBUDtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUDthQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sdUJBQVA7SUFKdUQsQ0FBekQ7RUFIc0IsQ0FBZDs7Z0NBUVYsRUFBQSxHQUNFO0lBQUEsTUFBQSxFQUFRLGdCQUFSO0lBQ0EsV0FBQSxFQUFhLGVBRGI7SUFFQSxhQUFBLEVBQWUsaUJBRmY7SUFHQSxXQUFBLEVBQWEsZUFIYjtJQUlBLFdBQUEsRUFBYSxlQUpiO0lBS0EsU0FBQSxFQUFXO0VBTFg7O2dDQU1GLE9BQUEsR0FDRTtJQUFBLFNBQUEsRUFBVyxlQUFYO0lBQ0EsTUFBQSxFQUFRLFlBRFI7SUFFQSxXQUFBLEVBQWEsaUJBRmI7SUFHQSxhQUFBLEVBQWUsbUJBSGY7SUFJQSxXQUFBLEVBQWEsaUJBSmI7SUFLQSxXQUFBLEVBQWE7RUFMYjs7Z0NBTUYsTUFBQSxHQUNFO0lBQUEscUJBQUEsRUFBdUI7RUFBdkI7Ozs7OztBQTRESixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhckhlYWRlclZpZXcgZnJvbSAnLi9uYXZiYXItaGVhZGVyJ1xuaW1wb3J0IE5hdmJhckVudHJpZXNWaWV3IGZyb20gJy4vZW50cmllcydcbmltcG9ydCBOYXZiYXJUb2dnbGVCdXR0b24gZnJvbSAnLi90b2dnbGUtYnV0dG9uJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk5hdmJhckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICduYXZiYXInXG4gICAgXG5jbGFzcyBCb290c3RyYXBOYXZCYXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRhZ05hbWU6ICduYXYnXG4gIGlkOiAnbmF2YmFyLXZpZXcnXG4gIGNsYXNzTmFtZTogJ25hdmJhciBuYXZiYXItZXhwYW5kLW1kJ1xuICBhdHRyaWJ1dGVzOlxuICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcbiAgICAneG1sOmxhbmcnOiAnZW4nXG4gICAgcm9sZTogJ25hdmlnYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJ1xuICAgIHRjLmRpdiAnLnRvZ2dsZS1idXR0b24nXG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLmRpdiAnLnNpdGUtZW50cmllcydcbiAgICAgIHRjLmRpdiAnLmFwcGxldC1lbnRyaWVzJ1xuICAgICAgdGMuZGl2ICcudmlldy1lbnRyaWVzJ1xuICAgICAgdGMuZGl2ICcudXNlci1lbnRyaWVzLm1sLWF1dG8nXG4gIHVpOlxuICAgIGhlYWRlcjogJy5uYXZiYXItaGVhZGVyJ1xuICAgIHNpdGVFbnRyaWVzOiAnLnNpdGUtZW50cmllcydcbiAgICBhcHBsZXRFbnRyaWVzOiAnLmFwcGxldC1lbnRyaWVzJ1xuICAgIHZpZXdFbnRyaWVzOiAnLnZpZXctZW50cmllcydcbiAgICB1c2VyRW50cmllczogJy51c2VyLWVudHJpZXMnXG4gICAgdG9nZ2xlQnRuOiAnLnRvZ2dsZS1idXR0b24nXG4gIHJlZ2lvbnM6XG4gICAgdG9nZ2xlQnRuOiAnQHVpLnRvZ2dsZUJ0bidcbiAgICBoZWFkZXI6ICdAdWkuaGVhZGVyJ1xuICAgIHNpdGVFbnRyaWVzOiAnQHVpLnNpdGVFbnRyaWVzJ1xuICAgIGFwcGxldEVudHJpZXM6ICdAdWkuYXBwbGV0RW50cmllcydcbiAgICB2aWV3RW50cmllczogJ0B1aS52aWV3RW50cmllcydcbiAgICB1c2VyRW50cmllczogJ0B1aS51c2VyRW50cmllcydcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkudG9nZ2xlQnRuJzogJ3RvZ2dsZUNvbGxhcHNlJ1xuICBvblJlbmRlcjogLT5cbiAgICBjb25zb2xlLmxvZyBcIkB1aS50b2dnbGVCdG5cIiwgQHVpLnRvZ2dsZUJ0blxuICAgIGlmIEBtb2RlbC5nZXQgJ2hhc1VzZXInXG4gICAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgICBjdXJyZW50VXNlciA9IGFwcC5nZXRTdGF0ZSAnY3VycmVudFVzZXInXG4gICAgICBmb3IgZW50cnkgaW4gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgICAgaWYgZW50cnk/Lm5lZWRVc2VyIGFuZCBub3QgY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyeScsIGVudHJ5LCAnc2l0ZSdcbiAgICBlbHNlXG4gICAgICBuYXZiYXJFbnRyaWVzID0gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgIE5hdmJhckNoYW5uZWwucmVxdWVzdCAnYWRkLWVudHJpZXMnLCBuYXZiYXJFbnRyaWVzLCAnc2l0ZSdcbiAgICBldmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdzaXRlJ1xuICAgIEBzaG93Q2hpbGRWaWV3ICdzaXRlRW50cmllcycsIGV2aWV3XG4gICAgYXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnYXBwbGV0J1xuICAgIEBzaG93Q2hpbGRWaWV3ICdhcHBsZXRFbnRyaWVzJywgYXZpZXdcbiAgICB2dmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICd2aWV3J1xuICAgIEBzaG93Q2hpbGRWaWV3ICd2aWV3RW50cmllcycsIHZ2aWV3XG4gICAgaGVhZGVyT3B0cyA9XG4gICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsIEBtb2RlbC5nZXQgJ2JyYW5kJ1xuICAgIGlmIEBtb2RlbC5nZXQgJ25hdmJhckJyYW5kVGVtcGxhdGUnXG4gICAgICBoZWFkZXJPcHRzLnRlbXBsYXRlID0gQG1vZGVsLmdldCAnbmF2YmFyQnJhbmRUZW1wbGF0ZSdcbiAgICBodmlldyA9IG5ldyBOYXZiYXJIZWFkZXJWaWV3IGhlYWRlck9wdHNcbiAgICBAc2hvd0NoaWxkVmlldyAnaGVhZGVyJywgaHZpZXdcbiAgICB2aWV3ID0gbmV3IE5hdmJhclRvZ2dsZUJ1dHRvblxuICAgIEBzaG93Q2hpbGRWaWV3ICd0b2dnbGVCdG4nLCB2aWV3XG4gICAgXG4gIF9yb3V0ZVRvVVJsOiAoaHJlZikgLT5cbiAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLXJvdXRlcidcbiAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgIHJldHVyblxuICAgIFxuICBvbkNoaWxkdmlld0NsaWNrQnJhbmQ6ICh2aWV3LCBldmVudCkgLT5cbiAgICBldmlldyA9IEBnZXRDaGlsZFZpZXcgJ3NpdGVFbnRyaWVzJ1xuICAgIGV2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICB1cmwgPSB2aWV3Lm1vZGVsLmdldCAndXJsJ1xuICAgIHVybCA9IHVybCBvciBcIiNcIlxuICAgIEBfcm91dGVUb1VSbCB1cmxcbiAgICByZXR1cm5cbiAgICBcblxuICBcbiAgbmF2aWdhdGVPbkNsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgIyBsb29rIGF0IGhyZWYgYW5kIGdvIHRoZXJlIG1heWJlP1xuICAgIGhyZWYgPSAkKHRhcmdldCkuYXR0ciAnaHJlZidcbiAgICBpZiBocmVmLnNwbGl0KCcvJylbMF0gPT0gJydcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWZcbiAgICBlbHNlXG4gICAgICBAX3JvdXRlVG9VUmwgaHJlZlxuXG4gIHRvZ2dsZUNvbGxhcHNlOiAoZXZlbnQpIC0+XG4gICAgY29uc29sZS5sb2cgXCJUb2dnbGVjb2xsYXBzZVwiLCBldmVudFxuICAgIFxuICAgICAgXG5cbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE5hdkJhclZpZXdcblxuXG4iXX0=
