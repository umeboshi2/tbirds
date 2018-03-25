var BootstrapNavBarView, MainChannel, MessageChannel, NavbarChannel;

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import NavbarHeaderView from './navbar-header';

import NavbarEntriesView from './entries';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarChannel = Backbone.Radio.channel('navbar');

BootstrapNavBarView = (function() {
  class BootstrapNavBarView extends Marionette.View {
    onRender() {
      var app, aview, currentUser, entry, eview, hview, i, len, navbarEntries, ref;
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
      hview = new NavbarHeaderView({
        model: new Backbone.Model(this.model.get('brand'))
      });
      return this.showChildView('header', hview);
    }

    onChildviewClickBrand(view, event) {
      var eview;
      eview = this.getChildView('siteEntries');
      eview.setAllInactive();
      return this.navigateOnClickEntry(view, event);
    }

    navigateOnClickEntry(cview, event) {
      var href, router, target;
      target = event.target;
      // look at href and go there maybe?
      href = $(target).attr('href');
      if (href.split('/')[0] === '') {
        return window.location = href;
      } else {
        router = MainChannel.request('main-router');
        return router.navigate(href, {
          trigger: true
        });
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
    tc.div('.site-entries');
    tc.div('.applet-entries');
    return tc.div('.user-entries.ml-auto');
  });

  BootstrapNavBarView.prototype.ui = {
    header: '.navbar-header',
    siteEntries: '.site-entries',
    appletEntries: '.applet-entries',
    userEntries: '.user-entries'
  };

  BootstrapNavBarView.prototype.regions = {
    header: '@ui.header',
    siteEntries: '@ui.siteEntries',
    appletEntries: '@ui.appletEntries',
    userEntries: '@ui.userEntries'
  };

  return BootstrapNavBarView;

}).call(this);

export default BootstrapNavBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sZ0JBQVAsTUFBQTs7QUFDQSxPQUFPLGlCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFDakIsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVY7RUFBTixNQUFBLG9CQUFBLFFBQWtDLFVBQVUsQ0FBQyxLQUE3QztJQXNCRSxRQUFVLENBQUEsQ0FBQTtBQUNSLFVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxXQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUE7TUFBQSxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFNBQVgsQ0FBSDtRQUNFLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7UUFDTixXQUFBLEdBQWMsR0FBRyxDQUFDLFFBQUosQ0FBYSxhQUFiO0FBQ2Q7UUFBQSxLQUFBLHFDQUFBOztVQUNFLHFCQUFHLEtBQUssQ0FBRSxrQkFBUCxJQUFvQixDQUFJLFdBQTNCO0FBQ0UscUJBREY7O1VBRUEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsV0FBdEIsRUFBbUMsS0FBbkMsRUFBMEMsTUFBMUM7UUFIRixDQUhGO09BQUEsTUFBQTtRQVFFLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsZUFBWDtRQUNoQixhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxhQUFyQyxFQUFvRCxNQUFwRCxFQVRGOztNQVVBLEtBQUEsR0FBUSxJQUFJLGlCQUFKLENBQ047UUFBQSxVQUFBLEVBQVksYUFBYSxDQUFDLE9BQWQsQ0FBc0IsYUFBdEIsRUFBcUMsTUFBckM7TUFBWixDQURNO01BRVIsSUFBQyxDQUFBLGFBQUQsQ0FBZSxhQUFmLEVBQThCLEtBQTlCO01BQ0EsS0FBQSxHQUFRLElBQUksaUJBQUosQ0FDTjtRQUFBLFVBQUEsRUFBWSxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxRQUFyQztNQUFaLENBRE07TUFFUixJQUFDLENBQUEsYUFBRCxDQUFlLGVBQWYsRUFBZ0MsS0FBaEM7TUFDQSxLQUFBLEdBQVEsSUFBSSxnQkFBSixDQUNOO1FBQUEsS0FBQSxFQUFPLElBQUksUUFBUSxDQUFDLEtBQWIsQ0FBbUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsT0FBWCxDQUFuQjtNQUFQLENBRE07YUFFUixJQUFDLENBQUEsYUFBRCxDQUFlLFFBQWYsRUFBeUIsS0FBekI7SUFuQlE7O0lBcUJWLHFCQUF1QixDQUFDLElBQUQsRUFBTyxLQUFQLENBQUE7QUFDckIsVUFBQTtNQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEsWUFBRCxDQUFjLGFBQWQ7TUFDUixLQUFLLENBQUMsY0FBTixDQUFBO2FBQ0EsSUFBQyxDQUFBLG9CQUFELENBQXNCLElBQXRCLEVBQTRCLEtBQTVCO0lBSHFCOztJQUt2QixvQkFBc0IsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUFBO0FBQ3BCLFVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQTtNQUFBLE1BQUEsR0FBUyxLQUFLLENBQUMsT0FBZjs7TUFFQSxJQUFBLEdBQU8sQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxNQUFmO01BQ1AsSUFBRyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZ0IsQ0FBQSxDQUFBLENBQWhCLEtBQXNCLEVBQXpCO2VBQ0UsTUFBTSxDQUFDLFFBQVAsR0FBa0IsS0FEcEI7T0FBQSxNQUFBO1FBR0UsTUFBQSxHQUFTLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGFBQXBCO2VBQ1QsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsSUFBaEIsRUFBc0I7VUFBQSxPQUFBLEVBQVM7UUFBVCxDQUF0QixFQUpGOztJQUpvQjs7RUFoRHhCOztnQ0FDRSxPQUFBLEdBQVM7O2dDQUNULEVBQUEsR0FBSTs7Z0NBQ0osVUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPLDhCQUFQO0lBQ0EsVUFBQSxFQUFZLElBRFo7SUFFQSxJQUFBLEVBQU07RUFGTjs7Z0NBR0YsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdCQUFQO0lBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQO0lBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxpQkFBUDtXQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sdUJBQVA7RUFKc0IsQ0FBZDs7Z0NBS1YsRUFBQSxHQUNFO0lBQUEsTUFBQSxFQUFRLGdCQUFSO0lBQ0EsV0FBQSxFQUFhLGVBRGI7SUFFQSxhQUFBLEVBQWUsaUJBRmY7SUFHQSxXQUFBLEVBQWE7RUFIYjs7Z0NBSUYsT0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRLFlBQVI7SUFDQSxXQUFBLEVBQWEsaUJBRGI7SUFFQSxhQUFBLEVBQWUsbUJBRmY7SUFHQSxXQUFBLEVBQWE7RUFIYjs7Ozs7O0FBeUNKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgVG9vbGtpdCBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTmF2YmFySGVhZGVyVmlldyBmcm9tICcuL25hdmJhci1oZWFkZXInXG5pbXBvcnQgTmF2YmFyRW50cmllc1ZpZXcgZnJvbSAnLi9lbnRyaWVzJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5OYXZiYXJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbmF2YmFyJ1xuICAgIFxuY2xhc3MgQm9vdHN0cmFwTmF2QmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0YWdOYW1lOiAnbmF2J1xuICBpZDogJ25hdmJhci12aWV3J1xuICBhdHRyaWJ1dGVzOlxuICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcbiAgICAneG1sOmxhbmcnOiAnZW4nXG4gICAgcm9sZTogJ25hdmlnYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJ1xuICAgIHRjLmRpdiAnLnNpdGUtZW50cmllcydcbiAgICB0Yy5kaXYgJy5hcHBsZXQtZW50cmllcydcbiAgICB0Yy5kaXYgJy51c2VyLWVudHJpZXMubWwtYXV0bydcbiAgdWk6XG4gICAgaGVhZGVyOiAnLm5hdmJhci1oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICcuc2l0ZS1lbnRyaWVzJ1xuICAgIGFwcGxldEVudHJpZXM6ICcuYXBwbGV0LWVudHJpZXMnXG4gICAgdXNlckVudHJpZXM6ICcudXNlci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGhlYWRlcjogJ0B1aS5oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICdAdWkuc2l0ZUVudHJpZXMnXG4gICAgYXBwbGV0RW50cmllczogJ0B1aS5hcHBsZXRFbnRyaWVzJ1xuICAgIHVzZXJFbnRyaWVzOiAnQHVpLnVzZXJFbnRyaWVzJ1xuICBvblJlbmRlcjogLT5cbiAgICBpZiBAbW9kZWwuZ2V0ICdoYXNVc2VyJ1xuICAgICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgICAgY3VycmVudFVzZXIgPSBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgICAgZm9yIGVudHJ5IGluIEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICAgIGlmIGVudHJ5Py5uZWVkVXNlciBhbmQgbm90IGN1cnJlbnRVc2VyXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdhZGQtZW50cnknLCBlbnRyeSwgJ3NpdGUnXG4gICAgZWxzZVxuICAgICAgbmF2YmFyRW50cmllcyA9IEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgICBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2FkZC1lbnRyaWVzJywgbmF2YmFyRW50cmllcywgJ3NpdGUnXG4gICAgZXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnc2l0ZSdcbiAgICBAc2hvd0NoaWxkVmlldyAnc2l0ZUVudHJpZXMnLCBldmlld1xuICAgIGF2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBAc2hvd0NoaWxkVmlldyAnYXBwbGV0RW50cmllcycsIGF2aWV3XG4gICAgaHZpZXcgPSBuZXcgTmF2YmFySGVhZGVyVmlld1xuICAgICAgbW9kZWw6IG5ldyBCYWNrYm9uZS5Nb2RlbCBAbW9kZWwuZ2V0ICdicmFuZCdcbiAgICBAc2hvd0NoaWxkVmlldyAnaGVhZGVyJywgaHZpZXdcbiAgICBcbiAgb25DaGlsZHZpZXdDbGlja0JyYW5kOiAodmlldywgZXZlbnQpIC0+XG4gICAgZXZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdzaXRlRW50cmllcydcbiAgICBldmlldy5zZXRBbGxJbmFjdGl2ZSgpXG4gICAgQG5hdmlnYXRlT25DbGlja0VudHJ5IHZpZXcsIGV2ZW50XG4gICAgXG4gIG5hdmlnYXRlT25DbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gJCh0YXJnZXQpLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgICAgXG5cbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE5hdkJhclZpZXdcblxuXG4iXX0=
