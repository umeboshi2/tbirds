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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7RUFBZ0IsS0FBaEI7RUFBdUIsT0FBQSxhQUF2QjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sZ0JBQVAsTUFBQTs7QUFDQSxPQUFPLGlCQUFQLE1BQUEsWUFOQTs7O0FBU0EsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFDZCxhQUFBLEdBQWdCLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFVjtFQUFOLE1BQUEsb0JBQUEsUUFBa0MsS0FBbEM7SUEyQkUsUUFBVSxDQUFBLENBQUE7QUFDWixVQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLGFBQUEsRUFBQSxHQUFBLEVBQUE7TUFBSSxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFNBQVgsQ0FBSDtRQUNFLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7UUFDTixXQUFBLEdBQWMsR0FBRyxDQUFDLFFBQUosQ0FBYSxhQUFiO0FBQ2Q7UUFBQSxLQUFBLHFDQUFBOztVQUNFLHFCQUFHLEtBQUssQ0FBRSxrQkFBUCxJQUFvQixDQUFJLFdBQTNCO0FBQ0UscUJBREY7O1VBRUEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsV0FBdEIsRUFBbUMsS0FBbkMsRUFBMEMsTUFBMUM7UUFIRixDQUhGO09BQUEsTUFBQTtRQVFFLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLEtBQUssQ0FB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QSxFQUFlLG1CQUZmO0lBR0EsV0FBQSxFQUFhLGlCQUhiO0lBSUEsV0FBQSxFQUFhO0VBSmI7O2dDQXNDRixlQUFBLEdBQ0U7SUFBQSxhQUFBLEVBQWU7RUFBZjs7Ozs7O0FBWUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgTW9kZWwsIFJhZGlvLCBoaXN0b3J5IGFzIEJCaGlzdG9yeSB9IGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTmF2YmFySGVhZGVyVmlldyBmcm9tICcuL25hdmJhci1oZWFkZXInXG5pbXBvcnQgTmF2YmFyRW50cmllc1ZpZXcgZnJvbSAnLi9lbnRyaWVzJ1xuI2ltcG9ydCBOYXZiYXJUb2dnbGVCdXR0b24gZnJvbSAnLi90b2dnbGUtYnV0dG9uJ1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk5hdmJhckNoYW5uZWwgPSBSYWRpby5jaGFubmVsICduYXZiYXInXG4gICAgXG5jbGFzcyBCb290c3RyYXBOYXZCYXJWaWV3IGV4dGVuZHMgVmlld1xuICB0YWdOYW1lOiAnbmF2J1xuICBpZDogJ25hdmJhci12aWV3J1xuICBjbGFzc05hbWU6ICduYXZiYXIgbmF2YmFyLWV4cGFuZC1tZCdcbiAgYXR0cmlidXRlczpcbiAgICB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnXG4gICAgJ3htbDpsYW5nJzogJ2VuJ1xuICAgIHJvbGU6ICduYXZpZ2F0aW9uJ1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInXG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLmRpdiAnLnNpdGUtZW50cmllcydcbiAgICAgIHRjLmRpdiAnLmFwcGxldC1lbnRyaWVzJ1xuICAgICAgdGMuZGl2ICcudmlldy1lbnRyaWVzJ1xuICAgICAgdGMuZGl2ICcudXNlci1lbnRyaWVzLm1sLWF1dG8nXG4gIHVpOlxuICAgIGhlYWRlcjogJy5uYXZiYXItaGVhZGVyJ1xuICAgIHNpdGVFbnRyaWVzOiAnLnNpdGUtZW50cmllcydcbiAgICBhcHBsZXRFbnRyaWVzOiAnLmFwcGxldC1lbnRyaWVzJ1xuICAgIHZpZXdFbnRyaWVzOiAnLnZpZXctZW50cmllcydcbiAgICB1c2VyRW50cmllczogJy51c2VyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAnQHVpLmhlYWRlcidcbiAgICBzaXRlRW50cmllczogJ0B1aS5zaXRlRW50cmllcydcbiAgICBhcHBsZXRFbnRyaWVzOiAnQHVpLmFwcGxldEVudHJpZXMnXG4gICAgdmlld0VudHJpZXM6ICdAdWkudmlld0VudHJpZXMnXG4gICAgdXNlckVudHJpZXM6ICdAdWkudXNlckVudHJpZXMnXG4gIG9uUmVuZGVyOiAtPlxuICAgIGlmIEBtb2RlbC5nZXQgJ2hhc1VzZXInXG4gICAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgICBjdXJyZW50VXNlciA9IGFwcC5nZXRTdGF0ZSAnY3VycmVudFVzZXInXG4gICAgICBmb3IgZW50cnkgaW4gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgICAgaWYgZW50cnk/Lm5lZWRVc2VyIGFuZCBub3QgY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyeScsIGVudHJ5LCAnc2l0ZSdcbiAgICBlbHNlXG4gICAgICBuYXZiYXJFbnRyaWVzID0gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgIE5hdmJhckNoYW5uZWwucmVxdWVzdCAnYWRkLWVudHJpZXMnLCBuYXZiYXJFbnRyaWVzLCAnc2l0ZSdcbiAgICBldmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdzaXRlJ1xuICAgIEBzaG93Q2hpbGRWaWV3ICdzaXRlRW50cmllcycsIGV2aWV3XG4gICAgYXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnYXBwbGV0J1xuICAgIEBzaG93Q2hpbGRWaWV3ICdhcHBsZXRFbnRyaWVzJywgYXZpZXdcbiAgICB2dmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICd2aWV3J1xuICAgIEBzaG93Q2hpbGRWaWV3ICd2aWV3RW50cmllcycsIHZ2aWV3XG4gICAgaGVhZGVyT3B0cyA9XG4gICAgICBtb2RlbDogbmV3IE1vZGVsIEBtb2RlbC5nZXQgJ2JyYW5kJ1xuICAgIGlmIEBtb2RlbC5nZXQgJ25hdmJhckJyYW5kVGVtcGxhdGUnXG4gICAgICBoZWFkZXJPcHRzLnRlbXBsYXRlID0gQG1vZGVsLmdldCAnbmF2YmFyQnJhbmRUZW1wbGF0ZSdcbiAgICBodmlldyA9IG5ldyBOYXZiYXJIZWFkZXJWaWV3IGhlYWRlck9wdHNcbiAgICBAc2hvd0NoaWxkVmlldyAnaGVhZGVyJywgaHZpZXdcbiAgICBcbiAgX3JvdXRlVG9VUmw6IChocmVmKSAtPlxuICAgIGlmIGhyZWYuc3RhcnRzV2l0aCAnLydcbiAgICAgIHdpbmRvdy5vcGVuIGhyZWZcbiAgICBCQmhpc3RvcnkubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgIHJldHVyblxuXG4gIGNoaWxkVmlld0V2ZW50czpcbiAgICAnY2xpY2s6YnJhbmQnOiAnb25DaGlsZHZpZXdDbGlja0JyYW5kJ1xuICAgIFxuICAjIG9uQ2hpbGR2aWV3Q2xpY2tCcmFuZCB3aWxsIG5vdCBiZSBjYWxsZWRcbiAgIyB3aXRob3V0IHNldHRpbmcgQGNoaWxkVmlld0V2ZW50c1xuICBvbkNoaWxkdmlld0NsaWNrQnJhbmQ6ICh2aWV3KSAtPlxuICAgIGV2aWV3ID0gQGdldENoaWxkVmlldyAnc2l0ZUVudHJpZXMnXG4gICAgZXZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIHVybCA9IHZpZXcubW9kZWwuZ2V0ICd1cmwnXG4gICAgdXJsID0gdXJsIG9yIFwiI1wiXG4gICAgQF9yb3V0ZVRvVVJsIHVybFxuICAgIHJldHVyblxuICAgIFxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwTmF2QmFyVmlld1xuXG5cbiJdfQ==
