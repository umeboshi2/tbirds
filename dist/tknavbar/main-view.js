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
      var app, aview, currentUser, entry, eview, hview, i, len, navbarEntries, ref, vview;
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
    tc.div('.view-entries');
    return tc.div('.user-entries.ml-auto');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvbWFpbi12aWV3LmpzIiwic291cmNlcyI6WyJ0a25hdmJhci9tYWluLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sZ0JBQVAsTUFBQTs7QUFDQSxPQUFPLGlCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFDakIsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVY7RUFBTixNQUFBLG9CQUFBLFFBQWtDLFVBQVUsQ0FBQyxLQUE3QztJQXlCRSxRQUFVLENBQUEsQ0FBQTtBQUNSLFVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxXQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUg7UUFDRSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO1FBQ04sV0FBQSxHQUFjLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtBQUNkO1FBQUEsS0FBQSxxQ0FBQTs7VUFDRSxxQkFBRyxLQUFLLENBQUUsa0JBQVAsSUFBb0IsQ0FBSSxXQUEzQjtBQUNFLHFCQURGOztVQUVBLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFdBQXRCLEVBQW1DLEtBQW5DLEVBQTBDLE1BQTFD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ZSxtQkFGZjtJQUdBLFdBQUEsRUFBYSxpQkFIYjtJQUlBLFdBQUEsRUFBYTtFQUpiOzs7Ozs7QUE2Q0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJIZWFkZXJWaWV3IGZyb20gJy4vbmF2YmFyLWhlYWRlcidcbmltcG9ydCBOYXZiYXJFbnRyaWVzVmlldyBmcm9tICcuL2VudHJpZXMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcbk5hdmJhckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICduYXZiYXInXG4gICAgXG5jbGFzcyBCb290c3RyYXBOYXZCYXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRhZ05hbWU6ICduYXYnXG4gIGlkOiAnbmF2YmFyLXZpZXcnXG4gIGF0dHJpYnV0ZXM6XG4gICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJ1xuICAgICd4bWw6bGFuZyc6ICdlbidcbiAgICByb2xlOiAnbmF2aWdhdGlvbidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInXG4gICAgdGMuZGl2ICcuc2l0ZS1lbnRyaWVzJ1xuICAgIHRjLmRpdiAnLmFwcGxldC1lbnRyaWVzJ1xuICAgIHRjLmRpdiAnLnZpZXctZW50cmllcydcbiAgICB0Yy5kaXYgJy51c2VyLWVudHJpZXMubWwtYXV0bydcbiAgdWk6XG4gICAgaGVhZGVyOiAnLm5hdmJhci1oZWFkZXInXG4gICAgc2l0ZUVudHJpZXM6ICcuc2l0ZS1lbnRyaWVzJ1xuICAgIGFwcGxldEVudHJpZXM6ICcuYXBwbGV0LWVudHJpZXMnXG4gICAgdmlld0VudHJpZXM6ICcudmlldy1lbnRyaWVzJ1xuICAgIHVzZXJFbnRyaWVzOiAnLnVzZXItZW50cmllcydcbiAgcmVnaW9uczpcbiAgICBoZWFkZXI6ICdAdWkuaGVhZGVyJ1xuICAgIHNpdGVFbnRyaWVzOiAnQHVpLnNpdGVFbnRyaWVzJ1xuICAgIGFwcGxldEVudHJpZXM6ICdAdWkuYXBwbGV0RW50cmllcydcbiAgICB2aWV3RW50cmllczogJ0B1aS52aWV3RW50cmllcydcbiAgICB1c2VyRW50cmllczogJ0B1aS51c2VyRW50cmllcydcbiAgb25SZW5kZXI6IC0+XG4gICAgaWYgQG1vZGVsLmdldCAnaGFzVXNlcidcbiAgICAgIGFwcCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgICAgIGN1cnJlbnRVc2VyID0gYXBwLmdldFN0YXRlICdjdXJyZW50VXNlcidcbiAgICAgIGZvciBlbnRyeSBpbiBAbW9kZWwuZ2V0ICduYXZiYXJFbnRyaWVzJ1xuICAgICAgICBpZiBlbnRyeT8ubmVlZFVzZXIgYW5kIG5vdCBjdXJyZW50VXNlclxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIE5hdmJhckNoYW5uZWwucmVxdWVzdCAnYWRkLWVudHJ5JywgZW50cnksICdzaXRlJ1xuICAgIGVsc2VcbiAgICAgIG5hdmJhckVudHJpZXMgPSBAbW9kZWwuZ2V0ICduYXZiYXJFbnRyaWVzJ1xuICAgICAgTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdhZGQtZW50cmllcycsIG5hdmJhckVudHJpZXMsICdzaXRlJ1xuICAgIGV2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ3NpdGUnXG4gICAgQHNob3dDaGlsZFZpZXcgJ3NpdGVFbnRyaWVzJywgZXZpZXdcbiAgICBhdmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdhcHBsZXQnXG4gICAgQHNob3dDaGlsZFZpZXcgJ2FwcGxldEVudHJpZXMnLCBhdmlld1xuICAgIHZ2aWV3ID0gbmV3IE5hdmJhckVudHJpZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ3ZpZXcnXG4gICAgQHNob3dDaGlsZFZpZXcgJ3ZpZXdFbnRyaWVzJywgdnZpZXdcbiAgICBodmlldyA9IG5ldyBOYXZiYXJIZWFkZXJWaWV3XG4gICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsIEBtb2RlbC5nZXQgJ2JyYW5kJ1xuICAgIEBzaG93Q2hpbGRWaWV3ICdoZWFkZXInLCBodmlld1xuICAgIFxuICBvbkNoaWxkdmlld0NsaWNrQnJhbmQ6ICh2aWV3LCBldmVudCkgLT5cbiAgICBldmlldyA9IEBnZXRDaGlsZFZpZXcgJ3NpdGVFbnRyaWVzJ1xuICAgIGV2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICBAbmF2aWdhdGVPbkNsaWNrRW50cnkgdmlldywgZXZlbnRcbiAgICBcbiAgbmF2aWdhdGVPbkNsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgIyBsb29rIGF0IGhyZWYgYW5kIGdvIHRoZXJlIG1heWJlP1xuICAgIGhyZWYgPSAkKHRhcmdldCkuYXR0ciAnaHJlZidcbiAgICBpZiBocmVmLnNwbGl0KCcvJylbMF0gPT0gJydcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWZcbiAgICBlbHNlXG4gICAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLXJvdXRlcidcbiAgICAgIHJvdXRlci5uYXZpZ2F0ZSBocmVmLCB0cmlnZ2VyOiB0cnVlXG4gICAgICBcblxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwTmF2QmFyVmlld1xuXG5cbiJdfQ==
