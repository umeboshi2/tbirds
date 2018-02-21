var $, Backbone, BaseEntryView, BootstrapNavBarView, DropdownEntryView, MainChannel, Marionette, MessageChannel, NavbarApp, NavbarEntriesView, NavbarEntry, NavbarEntryCollection, NavbarEntryCollectionView, NavbarHeaderView, SingleEntryView, Toolkit, navbar_collapse_button, navbar_entry_collection, tc;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarEntry = (function() {
  class NavbarEntry extends Backbone.Model {};

  NavbarEntry.prototype.defaults = {
    label: 'App Label',
    url: '#app',
    single_applet: false,
    applets: [],
    urls: []
  };

  return NavbarEntry;

}).call(this);

NavbarEntryCollection = (function() {
  class NavbarEntryCollection extends Backbone.Collection {};

  NavbarEntryCollection.prototype.model = NavbarEntry;

  return NavbarEntryCollection;

}).call(this);

navbar_entry_collection = new NavbarEntryCollection;

MainChannel.reply('navbar-entries', function() {
  return navbar_entry_collection;
});

MainChannel.reply('new-navbar-entry', function() {
  return new NavbarEntry;
});

MainChannel.reply('add-navbar-entry', function(atts) {
  return navbar_entry_collection.add(atts);
});

MainChannel.reply('add-navbar-entries', function(olist) {
  return navbar_entry_collection.add(olist);
});

//#################################################
// we may remove the channel stuff later, or use it
//#################################################
navbar_collapse_button = tc.renderable(function(target) {
  return tc.button('.navbar-toggle', {
    type: 'button',
    'data-toggle': 'collapse',
    'data-target': `#${target}`
  }, function() {
    tc.span('.sr-only', 'Toggle Navigation');
    tc.span('.icon-bar');
    tc.span('.icon-bar');
    return tc.span('.icon-bar');
  });
});

BaseEntryView = (function() {
  class BaseEntryView extends Marionette.View {
    templateContext() {
      var app, context;
      app = MainChannel.request('main:app:object');
      context = {
        app: app,
        currentUser: app.getState('currentUser')
      };
      return context;
    }

    set_active() {
      return this.$el.addClass('active');
    }

    unset_active() {
      this.$el.removeClass('active');
      // FIXME triggering click:entry
      // seems to leave dropdown open
      // this closes the navbar menu
      return this.$el.removeClass('open');
    }

  };

  BaseEntryView.prototype.model = NavbarEntry;

  BaseEntryView.prototype.tagName = 'li';

  BaseEntryView.prototype.ui = {
    entry: '.navbar-entry'
  };

  BaseEntryView.prototype.triggers = {
    'click @ui.entry': 'click:entry'
  };

  return BaseEntryView;

}).call(this);

SingleEntryView = (function() {
  class SingleEntryView extends BaseEntryView {};

  SingleEntryView.prototype.template = tc.renderable(function(entry) {
    return tc.a('.navbar-entry', {
      href: entry.url
    }, entry.label);
  });

  return SingleEntryView;

}).call(this);

DropdownEntryView = (function() {
  class DropdownEntryView extends BaseEntryView {};

  DropdownEntryView.prototype.className = 'dropdown';

  DropdownEntryView.prototype.template = tc.renderable(function(entry) {
    tc.a('.dropdown-toggle', {
      role: 'button',
      'data-toggle': 'dropdown'
    }, function() {
      tc.text(entry.label);
      return tc.b('.caret');
    });
    return tc.ul('.dropdown-menu', function() {
      var i, len, link, ref, results;
      ref = entry.menu;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        link = ref[i];
        if ((link != null ? link.needUser : void 0) && !entry.currentUser) {
          continue;
        }
        results.push(tc.li(function() {
          return tc.a('.navbar-entry', {
            href: link.url
          }, link.label);
        }));
      }
      return results;
    });
  });

  return DropdownEntryView;

}).call(this);

NavbarEntryCollectionView = (function() {
  class NavbarEntryCollectionView extends Marionette.CollectionView {
    childView(item) {
      if (item.has('menu') && item.get('menu')) {
        return DropdownEntryView;
      } else {
        return SingleEntryView;
      }
    }

    setAllInactive() {
      return this.children.each(function(view) {
        return view.unset_active();
      });
    }

    onChildviewClickEntry(cview, event) {
      this.setAllInactive();
      cview.set_active();
      return this.navigateOnClickEntry(cview, event);
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

  NavbarEntryCollectionView.prototype.tagName = 'ul';

  NavbarEntryCollectionView.prototype.className = 'nav navbar-nav nav-pills';

  return NavbarEntryCollectionView;

}).call(this);

NavbarEntriesView = (function() {
  class NavbarEntriesView extends Marionette.View {
    onRender() {
      var view;
      view = new NavbarEntryCollectionView({
        collection: this.collection
      });
      return this.showChildView('list', view);
    }

    setAllInactive() {
      var view;
      view = this.getChildView('list');
      return view.setAllInactive();
    }

  };

  NavbarEntriesView.prototype.regions = {
    list: '#navbar-entries',
    userMenu: '#user-menu',
    search: '#form-search-container'
  };

  NavbarEntriesView.prototype.template = tc.renderable(function(model) {
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.div('#navbar-entries');
      tc.ul('#user-menu.nav.navbar-nav.navbar-right');
      return tc.div('#form-search-container');
    });
  });

  return NavbarEntriesView;

}).call(this);

NavbarHeaderView = (function() {
  class NavbarHeaderView extends Marionette.View {};

  NavbarHeaderView.prototype.template = tc.renderable(function(model) {
    navbar_collapse_button('navbar-view-collapse');
    return tc.a('.navbar-brand', {
      href: model.url
    }, model.label);
  });

  NavbarHeaderView.prototype.ui = {
    brand: '.navbar-brand'
  };

  NavbarHeaderView.prototype.triggers = {
    'click @ui.brand': 'click:brand'
  };

  return NavbarHeaderView;

}).call(this);

BootstrapNavBarView = (function() {
  class BootstrapNavBarView extends Marionette.View {
    onRender() {
      var app, currentUser, entry, eview, hview, i, len, navbarEntries, ref;
      if (this.model.get('hasUser')) {
        app = MainChannel.request('main:app:object');
        currentUser = app.getState('currentUser');
        navbarEntries = [];
        ref = this.model.get('navbarEntries');
        for (i = 0, len = ref.length; i < len; i++) {
          entry = ref[i];
          if ((entry != null ? entry.needUser : void 0) && !currentUser) {
            continue;
          }
          navbarEntries.push(entry);
        }
      } else {
        navbarEntries = this.model.get('navbarEntries');
      }
      eview = new NavbarEntriesView({
        collection: new Backbone.Collection(navbarEntries)
      });
      this.showChildView('entries', eview);
      hview = new NavbarHeaderView({
        model: new Backbone.Model(this.model.get('brand'))
      });
      return this.showChildView('header', hview);
    }

    onChildviewClickBrand(view, event) {
      var eview;
      eview = this.getChildView('entries');
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

  BootstrapNavBarView.prototype.template = tc.renderable(function(model) {
    return tc.nav('#navbar-view.navbar.navbar-static-top.navbar-default', {
      xmlns: 'http://www.w3.org/1999/xhtml',
      'xml:lang': 'en',
      role: 'navigation'
    }, function() {
      return tc.div('.container', function() {
        tc.div('.navbar-header');
        return tc.div('#navbar-entries');
      });
    });
  });

  BootstrapNavBarView.prototype.regions = {
    header: '.navbar-header',
    usermenu: '#user-menu',
    mainmenu: '#main-menu',
    entries: '#navbar-entries'
  };

  return BootstrapNavBarView;

}).call(this);

NavbarApp = class NavbarApp extends Toolkit.App {
  onBeforeStart() {
    var appConfig, region, userMenuApp;
    appConfig = this.options.appConfig;
    region = this.options.parentApp.getView().getRegion('navbar');
    this.setRegion(region);
    if (appConfig.hasUser) {
      return userMenuApp = this.addChildApp('user-menu', {
        AppClass: appConfig.userMenuApp,
        startWithParent: true,
        appConfig: appConfig,
        parentApp: this
      });
    }
  }

  onStart() {
    // build main page layout
    return this.initPage();
  }

  initPage() {
    var appConfig, layout;
    appConfig = this.options.parentApp.options.appConfig;
    layout = new BootstrapNavBarView({
      model: new Backbone.Model(appConfig)
    });
    return this.showView(layout);
  }

};

module.exports = NavbarApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIuanMiLCJzb3VyY2VzIjpbInRrbmF2YmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLENBQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxFQUFBLG1CQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLGNBQUEsRUFBQSxTQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEscUJBQUEsRUFBQSx5QkFBQSxFQUFBLGdCQUFBLEVBQUEsZUFBQSxFQUFBLE9BQUEsRUFBQSxzQkFBQSxFQUFBLHVCQUFBLEVBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLE9BQUEsR0FBVSxPQUFBLENBQVEsb0JBQVI7O0FBQ1YsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRVg7RUFBTixNQUFBLFlBQUEsUUFBMEIsUUFBUSxDQUFDLE1BQW5DLENBQUE7O3dCQUNFLFFBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxXQUFQO0lBQ0EsR0FBQSxFQUFLLE1BREw7SUFFQSxhQUFBLEVBQWUsS0FGZjtJQUdBLE9BQUEsRUFBUyxFQUhUO0lBSUEsSUFBQSxFQUFNO0VBSk47Ozs7OztBQU1FO0VBQU4sTUFBQSxzQkFBQSxRQUFvQyxRQUFRLENBQUMsV0FBN0MsQ0FBQTs7a0NBQ0UsS0FBQSxHQUFPOzs7Ozs7QUFFVCx1QkFBQSxHQUEwQixJQUFJOztBQUM5QixXQUFXLENBQUMsS0FBWixDQUFrQixnQkFBbEIsRUFBb0MsUUFBQSxDQUFBLENBQUE7U0FDbEM7QUFEa0MsQ0FBcEM7O0FBR0EsV0FBVyxDQUFD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QyxLQUFiLENBQW1CLFNBQW5CO0lBQVAsQ0FETztXQUVULElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtFQUpROztBQWpCWjs7QUF1QkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuVG9vbGtpdCA9IHJlcXVpcmUgJ21hcmlvbmV0dGUudG9vbGtpdCdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIE5hdmJhckVudHJ5IGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgbGFiZWw6ICdBcHAgTGFiZWwnXG4gICAgdXJsOiAnI2FwcCdcbiAgICBzaW5nbGVfYXBwbGV0OiBmYWxzZVxuICAgIGFwcGxldHM6IFtdXG4gICAgdXJsczogW11cbiAgICBcbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IE5hdmJhckVudHJ5XG5cbm5hdmJhcl9lbnRyeV9jb2xsZWN0aW9uID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblxuTWFpbkNoYW5uZWwucmVwbHkgJ25hdmJhci1lbnRyaWVzJywgLT5cbiAgbmF2YmFyX2VudHJ5X2NvbGxlY3Rpb25cblxuTWFpbkNoYW5uZWwucmVwbHkgJ25ldy1uYXZiYXItZW50cnknLCAtPlxuICBuZXcgTmF2YmFyRW50cnlcblxuTWFpbkNoYW5uZWwucmVwbHkgJ2FkZC1uYXZiYXItZW50cnknLCAoYXR0cykgLT5cbiAgbmF2YmFyX2VudHJ5X2NvbGxlY3Rpb24uYWRkIGF0dHNcbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnYWRkLW5hdmJhci1lbnRyaWVzJywgKG9saXN0KSAtPlxuICBuYXZiYXJfZW50cnlfY29sbGVjdGlvbi5hZGQgb2xpc3RcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgd2UgbWF5IHJlbW92ZSB0aGUgY2hhbm5lbCBzdHVmZiBsYXRlciwgb3IgdXNlIGl0XG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIFxubmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAgPSB0Yy5yZW5kZXJhYmxlICh0YXJnZXQpIC0+XG4gIHRjLmJ1dHRvbiAnLm5hdmJhci10b2dnbGUnLCB0eXBlOididXR0b24nLCAnZGF0YS10b2dnbGUnOidjb2xsYXBzZScsXG4gICdkYXRhLXRhcmdldCc6IFwiIyN7dGFyZ2V0fVwiLCAtPlxuICAgIHRjLnNwYW4gJy5zci1vbmx5JywgJ1RvZ2dsZSBOYXZpZ2F0aW9uJ1xuICAgIHRjLnNwYW4gJy5pY29uLWJhcidcbiAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgXG5jbGFzcyBCYXNlRW50cnlWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIG1vZGVsOiBOYXZiYXJFbnRyeVxuICB0YWdOYW1lOiAnbGknXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgY29udGV4dCA9XG4gICAgICBhcHA6IGFwcFxuICAgICAgY3VycmVudFVzZXI6IGFwcC5nZXRTdGF0ZSAnY3VycmVudFVzZXInXG4gICAgcmV0dXJuIGNvbnRleHRcbiAgdWk6XG4gICAgZW50cnk6ICcubmF2YmFyLWVudHJ5J1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmVudHJ5JzogJ2NsaWNrOmVudHJ5J1xuICBzZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgdW5zZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ29wZW4nXG4gIFxuY2xhc3MgU2luZ2xlRW50cnlWaWV3IGV4dGVuZHMgQmFzZUVudHJ5Vmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gICAgdGMuYSAnLm5hdmJhci1lbnRyeScsIGhyZWY6ZW50cnkudXJsLCBlbnRyeS5sYWJlbFxuXG5jbGFzcyBEcm9wZG93bkVudHJ5VmlldyBleHRlbmRzIEJhc2VFbnRyeVZpZXdcbiAgY2xhc3NOYW1lOiAnZHJvcGRvd24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChlbnRyeSkgLT5cbiAgICB0Yy5hICcuZHJvcGRvd24tdG9nZ2xlJywgcm9sZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgdGMudGV4dCBlbnRyeS5sYWJlbFxuICAgICAgdGMuYiAnLmNhcmV0J1xuICAgIHRjLnVsICcuZHJvcGRvd24tbWVudScsIC0+XG4gICAgICBmb3IgbGluayBpbiBlbnRyeS5tZW51XG4gICAgICAgIGlmIGxpbms/Lm5lZWRVc2VyIGFuZCBub3QgZW50cnkuY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgIHRjLmEgJy5uYXZiYXItZW50cnknLCBocmVmOmxpbmsudXJsLCBsaW5rLmxhYmVsXG5cbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbmF2IG5hdmJhci1uYXYgbmF2LXBpbGxzJ1xuICBcbiAgY2hpbGRWaWV3OiAoaXRlbSkgLT5cbiAgICBpZiBpdGVtLmhhcygnbWVudScpIGFuZCBpdGVtLmdldCgnbWVudScpXG4gICAgICBEcm9wZG93bkVudHJ5Vmlld1xuICAgIGVsc2VcbiAgICAgIFNpbmdsZUVudHJ5Vmlld1xuICAgICAgXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIEBjaGlsZHJlbi5lYWNoICh2aWV3KSAtPlxuICAgICAgdmlldy51bnNldF9hY3RpdmUoKVxuICAgICAgXG4gIG9uQ2hpbGR2aWV3Q2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICBAc2V0QWxsSW5hY3RpdmUoKVxuICAgIGN2aWV3LnNldF9hY3RpdmUoKVxuICAgIEBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeSBjdmlldywgZXZlbnRcbiAgICBcbiAgbmF2aWdhdGVPbkNsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgIyBsb29rIGF0IGhyZWYgYW5kIGdvIHRoZXJlIG1heWJlP1xuICAgIGhyZWYgPSAkKHRhcmdldCkuYXR0ciAnaHJlZidcbiAgICBpZiBocmVmLnNwbGl0KCcvJylbMF0gPT0gJydcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWZcbiAgICBlbHNlXG4gICAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLXJvdXRlcidcbiAgICAgIHJvdXRlci5uYXZpZ2F0ZSBocmVmLCB0cmlnZ2VyOiB0cnVlXG4gICAgICBcblxuY2xhc3MgTmF2YmFyRW50cmllc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgcmVnaW9uczpcbiAgICBsaXN0OiAnI25hdmJhci1lbnRyaWVzJ1xuICAgIHVzZXJNZW51OiAnI3VzZXItbWVudSdcbiAgICBzZWFyY2g6ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ2xpc3QnLCB2aWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJyNuYXZiYXItdmlldy1jb2xsYXBzZS5jb2xsYXBzZS5uYXZiYXItY29sbGFwc2UnLCAtPlxuICAgICAgdGMuZGl2ICcjbmF2YmFyLWVudHJpZXMnXG4gICAgICB0Yy51bCAnI3VzZXItbWVudS5uYXYubmF2YmFyLW5hdi5uYXZiYXItcmlnaHQnXG4gICAgICB0Yy5kaXYgJyNmb3JtLXNlYXJjaC1jb250YWluZXInXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIHZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdsaXN0J1xuICAgIHZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIFxuICAgIFxuY2xhc3MgTmF2YmFySGVhZGVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgbmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAnbmF2YmFyLXZpZXctY29sbGFwc2UnXG4gICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6bW9kZWwudXJsLCBtb2RlbC5sYWJlbFxuICB1aTpcbiAgICBicmFuZDogJy5uYXZiYXItYnJhbmQnXG4gIHRyaWdnZXJzOlxuICAgICdjbGljayBAdWkuYnJhbmQnOiAnY2xpY2s6YnJhbmQnXG4gICAgXG4gICAgXG5jbGFzcyBCb290c3RyYXBOYXZCYXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5uYXYgJyNuYXZiYXItdmlldy5uYXZiYXIubmF2YmFyLXN0YXRpYy10b3AubmF2YmFyLWRlZmF1bHQnLFxuICAgIHhtbG5zOidodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ3htbDpsYW5nJzonZW4nLFxuICAgIHJvbGU6J25hdmlnYXRpb24nLCAtPlxuICAgICAgdGMuZGl2ICcuY29udGFpbmVyJywgLT5cbiAgICAgICAgdGMuZGl2ICcubmF2YmFyLWhlYWRlcidcbiAgICAgICAgdGMuZGl2ICcjbmF2YmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAnLm5hdmJhci1oZWFkZXInXG4gICAgdXNlcm1lbnU6ICcjdXNlci1tZW51J1xuICAgIG1haW5tZW51OiAnI21haW4tbWVudSdcbiAgICBlbnRyaWVzOiAnI25hdmJhci1lbnRyaWVzJ1xuICBvblJlbmRlcjogLT5cbiAgICBpZiBAbW9kZWwuZ2V0ICdoYXNVc2VyJ1xuICAgICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgICAgY3VycmVudFVzZXIgPSBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgICAgbmF2YmFyRW50cmllcyA9IFtdXG4gICAgICBmb3IgZW50cnkgaW4gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgICAgaWYgZW50cnk/Lm5lZWRVc2VyIGFuZCBub3QgY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICBuYXZiYXJFbnRyaWVzLnB1c2ggZW50cnlcbiAgICBlbHNlXG4gICAgICBuYXZiYXJFbnRyaWVzID0gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICBldmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogbmV3IEJhY2tib25lLkNvbGxlY3Rpb24gbmF2YmFyRW50cmllc1xuICAgIEBzaG93Q2hpbGRWaWV3ICdlbnRyaWVzJywgZXZpZXdcbiAgICBodmlldyA9IG5ldyBOYXZiYXJIZWFkZXJWaWV3XG4gICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsIEBtb2RlbC5nZXQgJ2JyYW5kJ1xuICAgIEBzaG93Q2hpbGRWaWV3ICdoZWFkZXInLCBodmlld1xuICAgIFxuICBvbkNoaWxkdmlld0NsaWNrQnJhbmQ6ICh2aWV3LCBldmVudCkgLT5cbiAgICBldmlldyA9IEBnZXRDaGlsZFZpZXcgJ2VudHJpZXMnXG4gICAgZXZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIEBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeSB2aWV3LCBldmVudFxuICAgIFxuICBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICAjIGxvb2sgYXQgaHJlZiBhbmQgZ28gdGhlcmUgbWF5YmU/XG4gICAgaHJlZiA9ICQodGFyZ2V0KS5hdHRyICdocmVmJ1xuICAgIGlmIGhyZWYuc3BsaXQoJy8nKVswXSA9PSAnJ1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZlxuICAgIGVsc2VcbiAgICAgIHJvdXRlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tcm91dGVyJ1xuICAgICAgcm91dGVyLm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICAgIFxuXG5jbGFzcyBOYXZiYXJBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIGFwcENvbmZpZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgIHJlZ2lvbiA9IEBvcHRpb25zLnBhcmVudEFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICduYXZiYXInXG4gICAgQHNldFJlZ2lvbiByZWdpb25cbiAgICBpZiBhcHBDb25maWcuaGFzVXNlclxuICAgICAgdXNlck1lbnVBcHAgPSBAYWRkQ2hpbGRBcHAgJ3VzZXItbWVudScsXG4gICAgICAgIEFwcENsYXNzOiBhcHBDb25maWcudXNlck1lbnVBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogYXBwQ29uZmlnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBvblN0YXJ0OiAtPlxuICAgICMgYnVpbGQgbWFpbiBwYWdlIGxheW91dFxuICAgIEBpbml0UGFnZSgpXG5cbiAgaW5pdFBhZ2U6IC0+XG4gICAgYXBwQ29uZmlnID0gQG9wdGlvbnMucGFyZW50QXBwLm9wdGlvbnMuYXBwQ29uZmlnXG4gICAgbGF5b3V0ID0gbmV3IEJvb3RzdHJhcE5hdkJhclZpZXdcbiAgICAgIG1vZGVsOiBuZXcgQmFja2JvbmUuTW9kZWwgYXBwQ29uZmlnXG4gICAgQHNob3dWaWV3IGxheW91dFxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmJhckFwcFxuXG5cbiJdfQ==
