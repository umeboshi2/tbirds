var $, Backbone, BootstrapNavBarView, MainChannel, Marionette, MessageChannel, NavbarApp, NavbarEntriesView, NavbarEntry, NavbarEntryCollection, NavbarEntryCollectionView, NavbarEntryView, NavbarHeaderView, Toolkit, dropdown_entry, dropdown_toggle, nav_pt, nav_pt_content, navbar_collapse_button, navbar_entry_collection, single_entry, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarEntry = (function(superClass) {
  extend(NavbarEntry, superClass);

  function NavbarEntry() {
    return NavbarEntry.__super__.constructor.apply(this, arguments);
  }

  NavbarEntry.prototype.defaults = {
    label: 'App Label',
    url: '#app',
    single_applet: false,
    applets: [],
    urls: []
  };

  return NavbarEntry;

})(Backbone.Model);

NavbarEntryCollection = (function(superClass) {
  extend(NavbarEntryCollection, superClass);

  function NavbarEntryCollection() {
    return NavbarEntryCollection.__super__.constructor.apply(this, arguments);
  }

  NavbarEntryCollection.prototype.model = NavbarEntry;

  return NavbarEntryCollection;

})(Backbone.Collection);

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

navbar_collapse_button = tc.renderable(function(target) {
  return tc.button('.navbar-toggle', {
    type: 'button',
    'data-toggle': 'collapse',
    'data-target': "#" + target
  }, function() {
    tc.span('.sr-only', 'Toggle Navigation');
    tc.span('.icon-bar');
    tc.span('.icon-bar');
    return tc.span('.icon-bar');
  });
});

dropdown_toggle = tc.component(function(selector, attrs, renderContents) {
  return tc.a(selector + ".dropdown-toggle", {
    href: attrs.href,
    'data-toggle': 'dropdown'
  }, renderContents);
});

nav_pt_content = tc.renderable(function(appmodel) {
  return tc.div("." + (appmodel.container || 'container'), function() {
    tc.div('.navbar-header', function() {
      navbar_collapse_button('navbar-view-collapse');
      return tc.a('.navbar-brand', {
        href: '#'
      }, 'TKTest');
    });
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.ul('.nav.navbar-nav.nav-pills', function() {});
      tc.ul('#user-menu.nav.navbar-nav.navbar-right');
      return tc.div('#form-search-container');
    });
  });
});

nav_pt = tc.renderable(function(appmodel) {
  return tc.nav('#navbar-view.navbar.navbar-static-top.navbar-default', {
    xmlns: 'http://www.w3.org/1999/xhtml',
    'xml:lang': 'en',
    role: 'navigation'
  }, function() {
    return tc.div('.container', function() {
      tc.div('.navbar-header', function() {
        navbar_collapse_button('navbar-view-collapse');
        return tc.a('.navbar-brand', {
          href: '#'
        }, 'TkTest');
      });
      return tc.div('#navbar-view-collapse.collapse.navbar-collapse');
    });
  });
});

dropdown_entry = tc.renderable(function(entry) {
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
      results.push(tc.li(function() {
        return tc.a('.navbar-entry', {
          href: link.url
        }, link.label);
      }));
    }
    return results;
  });
});

single_entry = tc.renderable(function(entry) {
  return tc.a('.navbar-entry', {
    href: entry.url
  }, entry.label);
});

NavbarEntryView = (function(superClass) {
  extend(NavbarEntryView, superClass);

  function NavbarEntryView() {
    return NavbarEntryView.__super__.constructor.apply(this, arguments);
  }

  NavbarEntryView.prototype.model = NavbarEntry;

  NavbarEntryView.prototype.tagName = 'li';

  NavbarEntryView.prototype.className = function() {
    if (this.model.has('menu')) {
      return 'dropdown';
    } else {
      return void 0;
    }
  };

  NavbarEntryView.prototype.template = tc.renderable(function(model) {
    if (model != null ? model.menu : void 0) {
      return dropdown_entry(model);
    } else {
      return single_entry(model);
    }
  });

  NavbarEntryView.prototype.ui = {
    entry: '.navbar-entry'
  };

  NavbarEntryView.prototype.triggers = {
    'click @ui.entry': 'click:entry'
  };

  NavbarEntryView.prototype.set_active = function() {
    return this.$el.addClass('active');
  };

  NavbarEntryView.prototype.unset_active = function() {
    this.$el.removeClass('active');
    return this.$el.removeClass('open');
  };

  return NavbarEntryView;

})(Marionette.View);

NavbarEntryCollectionView = (function(superClass) {
  extend(NavbarEntryCollectionView, superClass);

  function NavbarEntryCollectionView() {
    return NavbarEntryCollectionView.__super__.constructor.apply(this, arguments);
  }

  NavbarEntryCollectionView.prototype.tagName = 'ul';

  NavbarEntryCollectionView.prototype.className = 'nav navbar-nav nav-pills';

  NavbarEntryCollectionView.prototype.childView = NavbarEntryView;

  NavbarEntryCollectionView.prototype.setAllInactive = function() {
    return this.children.each(function(view) {
      return view.unset_active();
    });
  };

  NavbarEntryCollectionView.prototype.onChildviewClickEntry = function(cview, event) {
    this.setAllInactive();
    cview.set_active();
    return this.navigateOnClickEntry(cview, event);
  };

  NavbarEntryCollectionView.prototype.navigateOnClickEntry = function(cview, event) {
    var href, router, target;
    target = event.target;
    href = $(target).attr('href');
    if (href.split('/')[0] === '') {
      return window.location = href;
    } else {
      router = MainChannel.request('main-router');
      return router.navigate(href, {
        trigger: true
      });
    }
  };

  return NavbarEntryCollectionView;

})(Marionette.CollectionView);

NavbarEntriesView = (function(superClass) {
  extend(NavbarEntriesView, superClass);

  function NavbarEntriesView() {
    return NavbarEntriesView.__super__.constructor.apply(this, arguments);
  }

  NavbarEntriesView.prototype.regions = {
    list: '#navbar-entries',
    userMenu: '#user-menu',
    search: '#form-search-container'
  };

  NavbarEntriesView.prototype.onRender = function() {
    var view;
    view = new NavbarEntryCollectionView({
      collection: this.collection
    });
    return this.showChildView('list', view);
  };

  NavbarEntriesView.prototype.template = tc.renderable(function(model) {
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.div('#navbar-entries');
      tc.ul('#user-menu.nav.navbar-nav.navbar-right');
      return tc.div('#form-search-container');
    });
  });

  NavbarEntriesView.prototype.setAllInactive = function() {
    var view;
    view = this.getChildView('list');
    return view.setAllInactive();
  };

  return NavbarEntriesView;

})(Marionette.View);

NavbarHeaderView = (function(superClass) {
  extend(NavbarHeaderView, superClass);

  function NavbarHeaderView() {
    return NavbarHeaderView.__super__.constructor.apply(this, arguments);
  }

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

})(Marionette.View);

BootstrapNavBarView = (function(superClass) {
  extend(BootstrapNavBarView, superClass);

  function BootstrapNavBarView() {
    return BootstrapNavBarView.__super__.constructor.apply(this, arguments);
  }

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

  BootstrapNavBarView.prototype.onRender = function() {
    var eview, hview;
    eview = new NavbarEntriesView({
      collection: new Backbone.Collection(this.model.get('navbarEntries'))
    });
    this.showChildView('entries', eview);
    hview = new NavbarHeaderView({
      model: new Backbone.Model(this.model.get('brand'))
    });
    return this.showChildView('header', hview);
  };

  BootstrapNavBarView.prototype.onChildviewClickBrand = function(view, event) {
    var eview;
    eview = this.getChildView('entries');
    eview.setAllInactive();
    return this.navigateOnClickEntry(view, event);
  };

  BootstrapNavBarView.prototype.navigateOnClickEntry = function(cview, event) {
    var href, router, target;
    console.log("Brand clicked");
    target = event.target;
    console.log("Target", target);
    href = $(target).attr('href');
    if (href.split('/')[0] === '') {
      return window.location = href;
    } else {
      router = MainChannel.request('main-router');
      return router.navigate(href, {
        trigger: true
      });
    }
  };

  return BootstrapNavBarView;

})(Marionette.View);

NavbarApp = (function(superClass) {
  extend(NavbarApp, superClass);

  function NavbarApp() {
    return NavbarApp.__super__.constructor.apply(this, arguments);
  }

  NavbarApp.prototype.onBeforeStart = function() {
    var appConfig, region, userMenuApp;
    console.log('NavbarApp options', this.options);
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
  };

  NavbarApp.prototype.onStart = function() {
    return this.initPage();
  };

  NavbarApp.prototype.initPage = function() {
    var appConfig, layout;
    appConfig = this.options.parentApp.options.appConfig;
    layout = new BootstrapNavBarView({
      model: new Backbone.Model(appConfig)
    });
    return this.showView(layout);
  };

  return NavbarApp;

})(Toolkit.App);

module.exports = NavbarApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIuanMiLCJzb3VyY2VzIjpbInRrbmF2YmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhVQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYOzs7Ozs7O3dCQUNKLFFBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxXQUFQO0lBQ0EsR0FBQSxFQUFLLE1BREw7SUFFQSxhQUFBLEVBQWUsS0FGZjtJQUdBLE9BQUEsRUFBUyxFQUhUO0lBSUEsSUFBQSxFQUFNLEVBSk47Ozs7O0dBRnNCLFFBQVEsQ0FBQzs7QUFRN0I7Ozs7Ozs7a0NBQ0osS0FBQSxHQUFPOzs7O0dBRDJCLFFBQVEsQ0FBQzs7QUFHN0MsdUJBQUEsR0FBMEIsSUFBSTs7QUFDOUIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsZ0JBQWxCLEVBQW9DLFNBQUE7U0FDbEM7QUFEa0MsQ0FBcEM7O0FBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0Isa0JBQWxCLEVBQXNDLFNBQUE7U0FDcEMsSUFBSTtBQURnQyxDQUF0Qzs7QUFHQSxXQUFXLENBQUMsS0FBWixDQUFrQixrQkFBbEIsRUFBc0MsU0FBQyxJQUFEO1NBQ3BDLHVCQUF1QixDQUFDLEdBQXhCLENBQTRCLElBQTVCO0FBRG9DLENBQXRDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLG9CQUFsQixFQUF3QyxTQUFDLEtBQUQ7U0FDdEMsdUJBQXVCLENBQUMsR0FBeEIsQ0FB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LE9BQU8sQ0FBQzs7QUF3QmhDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBOYXZiYXJFbnRyeSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIGxhYmVsOiAnQXBwIExhYmVsJ1xuICAgIHVybDogJyNhcHAnXG4gICAgc2luZ2xlX2FwcGxldDogZmFsc2VcbiAgICBhcHBsZXRzOiBbXVxuICAgIHVybHM6IFtdXG4gICAgXG5jbGFzcyBOYXZiYXJFbnRyeUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBOYXZiYXJFbnRyeVxuXG5uYXZiYXJfZW50cnlfY29sbGVjdGlvbiA9IG5ldyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25cbk1haW5DaGFubmVsLnJlcGx5ICduYXZiYXItZW50cmllcycsIC0+XG4gIG5hdmJhcl9lbnRyeV9jb2xsZWN0aW9uXG5cbk1haW5DaGFubmVsLnJlcGx5ICduZXctbmF2YmFyLWVudHJ5JywgLT5cbiAgbmV3IE5hdmJhckVudHJ5XG5cbk1haW5DaGFubmVsLnJlcGx5ICdhZGQtbmF2YmFyLWVudHJ5JywgKGF0dHMpIC0+XG4gIG5hdmJhcl9lbnRyeV9jb2xsZWN0aW9uLmFkZCBhdHRzXG4gIFxuTWFpbkNoYW5uZWwucmVwbHkgJ2FkZC1uYXZiYXItZW50cmllcycsIChvbGlzdCkgLT5cbiAgbmF2YmFyX2VudHJ5X2NvbGxlY3Rpb24uYWRkIG9saXN0XG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIHdlIG1heSByZW1vdmUgdGhlIGNoYW5uZWwgc3R1ZmYgbGF0ZXIsIG9yIHVzZSBpdFxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuICBcbm5hdmJhcl9jb2xsYXBzZV9idXR0b24gID0gdGMucmVuZGVyYWJsZSAodGFyZ2V0KSAtPlxuICB0Yy5idXR0b24gJy5uYXZiYXItdG9nZ2xlJywgdHlwZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonY29sbGFwc2UnLFxuICAnZGF0YS10YXJnZXQnOiBcIiMje3RhcmdldH1cIiwgLT5cbiAgICAgIHRjLnNwYW4gJy5zci1vbmx5JywgJ1RvZ2dsZSBOYXZpZ2F0aW9uJ1xuICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuXG5kcm9wZG93bl90b2dnbGUgPSB0Yy5jb21wb25lbnQgKHNlbGVjdG9yLCBhdHRycywgcmVuZGVyQ29udGVudHMpIC0+XG4gIHRjLmEgXCIje3NlbGVjdG9yfS5kcm9wZG93bi10b2dnbGVcIiwgaHJlZjphdHRycy5ocmVmLFxuICAnZGF0YS10b2dnbGUnOidkcm9wZG93bicsIHJlbmRlckNvbnRlbnRzXG5cbm5hdl9wdF9jb250ZW50ID0gdGMucmVuZGVyYWJsZSAoYXBwbW9kZWwpIC0+XG4gIHRjLmRpdiBcIi4je2FwcG1vZGVsLmNvbnRhaW5lciBvciAnY29udGFpbmVyJ31cIiwgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJywgLT5cbiAgICAgIG5hdmJhcl9jb2xsYXBzZV9idXR0b24gJ25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6JyMnLCAnVEtUZXN0J1xuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbGxhcHNlLmNvbGxhcHNlLm5hdmJhci1jb2xsYXBzZScsIC0+XG4gICAgICB0Yy51bCAnLm5hdi5uYXZiYXItbmF2Lm5hdi1waWxscycsIC0+XG4gICAgICB0Yy51bCAnI3VzZXItbWVudS5uYXYubmF2YmFyLW5hdi5uYXZiYXItcmlnaHQnXG4gICAgICB0Yy5kaXYgJyNmb3JtLXNlYXJjaC1jb250YWluZXInXG5cbm5hdl9wdCA9IHRjLnJlbmRlcmFibGUgKGFwcG1vZGVsKSAtPlxuICB0Yy5uYXYgJyNuYXZiYXItdmlldy5uYXZiYXIubmF2YmFyLXN0YXRpYy10b3AubmF2YmFyLWRlZmF1bHQnLFxuICB4bWxuczonaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICd4bWw6bGFuZyc6J2VuJyxcbiAgcm9sZTonbmF2aWdhdGlvbicsIC0+XG4gICAgdGMuZGl2ICcuY29udGFpbmVyJywgLT5cbiAgICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInLCAtPlxuICAgICAgICBuYXZiYXJfY29sbGFwc2VfYnV0dG9uICduYXZiYXItdmlldy1jb2xsYXBzZSdcbiAgICAgICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6JyMnLCAnVGtUZXN0J1xuICAgICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJ1xuXG5kcm9wZG93bl9lbnRyeSA9IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICB0Yy5hICcuZHJvcGRvd24tdG9nZ2xlJywgcm9sZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgIHRjLnRleHQgZW50cnkubGFiZWxcbiAgICB0Yy5iICcuY2FyZXQnXG4gIHRjLnVsICcuZHJvcGRvd24tbWVudScsIC0+XG4gICAgZm9yIGxpbmsgaW4gZW50cnkubWVudVxuICAgICAgdGMubGkgLT5cbiAgICAgICAgdGMuYSAnLm5hdmJhci1lbnRyeScsIGhyZWY6bGluay51cmwsIGxpbmsubGFiZWxcblxuc2luZ2xlX2VudHJ5ID0gdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gIHRjLmEgJy5uYXZiYXItZW50cnknLCBocmVmOmVudHJ5LnVybCwgZW50cnkubGFiZWxcbiAgICAgIFxuY2xhc3MgTmF2YmFyRW50cnlWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIG1vZGVsOiBOYXZiYXJFbnRyeVxuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogLT5cbiAgICBpZiBAbW9kZWwuaGFzICdtZW51JyB0aGVuICdkcm9wZG93bicgZWxzZSB1bmRlZmluZWRcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGlmIG1vZGVsPy5tZW51XG4gICAgICBkcm9wZG93bl9lbnRyeSBtb2RlbFxuICAgIGVsc2VcbiAgICAgIHNpbmdsZV9lbnRyeSBtb2RlbFxuICB1aTpcbiAgICBlbnRyeTogJy5uYXZiYXItZW50cnknXG4gIHRyaWdnZXJzOlxuICAgICdjbGljayBAdWkuZW50cnknOiAnY2xpY2s6ZW50cnknXG4gIHNldF9hY3RpdmU6IC0+XG4gICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJ1xuICB1bnNldF9hY3RpdmU6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgICMgRklYTUUgdHJpZ2dlcmluZyBjbGljazplbnRyeVxuICAgICMgc2VlbXMgdG8gbGVhdmUgZHJvcGRvd24gb3BlblxuICAgICMgdGhpcyBjbG9zZXMgdGhlIG5hdmJhciBtZW51XG4gICAgQCRlbC5yZW1vdmVDbGFzcyAnb3BlbidcbiAgICBcbiAgICBcbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbmF2IG5hdmJhci1uYXYgbmF2LXBpbGxzJ1xuICBjaGlsZFZpZXc6IE5hdmJhckVudHJ5Vmlld1xuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICBAY2hpbGRyZW4uZWFjaCAodmlldykgLT5cbiAgICAgIHZpZXcudW5zZXRfYWN0aXZlKClcbiAgICAgIFxuICBvbkNoaWxkdmlld0NsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgI2NvbnNvbGUubG9nIFwiSEVSRSBJUyBNT1JFIFNUVUZGXCIsIGV2ZW50XG4gICAgQHNldEFsbEluYWN0aXZlKClcbiAgICBjdmlldy5zZXRfYWN0aXZlKClcbiAgICBAbmF2aWdhdGVPbkNsaWNrRW50cnkgY3ZpZXcsIGV2ZW50XG4gICAgXG4gIG5hdmlnYXRlT25DbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gJCh0YXJnZXQpLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgICAgXG5cbmNsYXNzIE5hdmJhckVudHJpZXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHJlZ2lvbnM6XG4gICAgbGlzdDogJyNuYXZiYXItZW50cmllcydcbiAgICB1c2VyTWVudTogJyN1c2VyLW1lbnUnXG4gICAgc2VhcmNoOiAnI2Zvcm0tc2VhcmNoLWNvbnRhaW5lcidcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93Q2hpbGRWaWV3ICdsaXN0Jywgdmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLmRpdiAnI25hdmJhci1lbnRyaWVzJ1xuICAgICAgdGMudWwgJyN1c2VyLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0J1xuICAgICAgdGMuZGl2ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICB2aWV3ID0gQGdldENoaWxkVmlldyAnbGlzdCdcbiAgICB2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICBcbiAgICBcbmNsYXNzIE5hdmJhckhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIG5hdmJhcl9jb2xsYXBzZV9idXR0b24gJ25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgIHRjLmEgJy5uYXZiYXItYnJhbmQnLCBocmVmOm1vZGVsLnVybCwgbW9kZWwubGFiZWxcbiAgdWk6XG4gICAgYnJhbmQ6ICcubmF2YmFyLWJyYW5kJ1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmJyYW5kJzogJ2NsaWNrOmJyYW5kJ1xuICAgIFxuICAgIFxuY2xhc3MgQm9vdHN0cmFwTmF2QmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMubmF2ICcjbmF2YmFyLXZpZXcubmF2YmFyLm5hdmJhci1zdGF0aWMtdG9wLm5hdmJhci1kZWZhdWx0JyxcbiAgICB4bWxuczonaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICd4bWw6bGFuZyc6J2VuJyxcbiAgICByb2xlOiduYXZpZ2F0aW9uJywgLT5cbiAgICAgIHRjLmRpdiAnLmNvbnRhaW5lcicsIC0+XG4gICAgICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInXG4gICAgICAgIHRjLmRpdiAnI25hdmJhci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGhlYWRlcjogJy5uYXZiYXItaGVhZGVyJ1xuICAgIHVzZXJtZW51OiAnI3VzZXItbWVudSdcbiAgICBtYWlubWVudTogJyNtYWluLW1lbnUnXG4gICAgZW50cmllczogJyNuYXZiYXItZW50cmllcydcbiAgb25SZW5kZXI6IC0+XG4gICAgZXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uIEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgQHNob3dDaGlsZFZpZXcgJ2VudHJpZXMnLCBldmlld1xuICAgIGh2aWV3ID0gbmV3IE5hdmJhckhlYWRlclZpZXdcbiAgICAgIG1vZGVsOiBuZXcgQmFja2JvbmUuTW9kZWwgQG1vZGVsLmdldCAnYnJhbmQnXG4gICAgQHNob3dDaGlsZFZpZXcgJ2hlYWRlcicsIGh2aWV3XG4gICAgXG4gIG9uQ2hpbGR2aWV3Q2xpY2tCcmFuZDogKHZpZXcsIGV2ZW50KSAtPlxuICAgIGV2aWV3ID0gQGdldENoaWxkVmlldyAnZW50cmllcydcbiAgICBldmlldy5zZXRBbGxJbmFjdGl2ZSgpXG4gICAgQG5hdmlnYXRlT25DbGlja0VudHJ5IHZpZXcsIGV2ZW50XG4gICAgXG4gIG5hdmlnYXRlT25DbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIGNvbnNvbGUubG9nIFwiQnJhbmQgY2xpY2tlZFwiXG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgY29uc29sZS5sb2cgXCJUYXJnZXRcIiwgdGFyZ2V0XG4gICAgIyBsb29rIGF0IGhyZWYgYW5kIGdvIHRoZXJlIG1heWJlP1xuICAgIGhyZWYgPSAkKHRhcmdldCkuYXR0ciAnaHJlZidcbiAgICBpZiBocmVmLnNwbGl0KCcvJylbMF0gPT0gJydcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWZcbiAgICBlbHNlXG4gICAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLXJvdXRlcidcbiAgICAgIHJvdXRlci5uYXZpZ2F0ZSBocmVmLCB0cmlnZ2VyOiB0cnVlXG4gICAgICBcblxuY2xhc3MgTmF2YmFyQXBwIGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBjb25zb2xlLmxvZyAnTmF2YmFyQXBwIG9wdGlvbnMnLCBAb3B0aW9uc1xuICAgIGFwcENvbmZpZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgIHJlZ2lvbiA9IEBvcHRpb25zLnBhcmVudEFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICduYXZiYXInXG4gICAgQHNldFJlZ2lvbiByZWdpb25cbiAgICBpZiBhcHBDb25maWcuaGFzVXNlclxuICAgICAgdXNlck1lbnVBcHAgPSBAYWRkQ2hpbGRBcHAgJ3VzZXItbWVudScsXG4gICAgICAgIEFwcENsYXNzOiBhcHBDb25maWcudXNlck1lbnVBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogYXBwQ29uZmlnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBvblN0YXJ0OiAtPlxuICAgICMgYnVpbGQgbWFpbiBwYWdlIGxheW91dFxuICAgIEBpbml0UGFnZSgpXG5cbiAgaW5pdFBhZ2U6IC0+XG4gICAgYXBwQ29uZmlnID0gQG9wdGlvbnMucGFyZW50QXBwLm9wdGlvbnMuYXBwQ29uZmlnXG4gICAgbGF5b3V0ID0gbmV3IEJvb3RzdHJhcE5hdkJhclZpZXdcbiAgICAgIG1vZGVsOiBuZXcgQmFja2JvbmUuTW9kZWwgYXBwQ29uZmlnXG4gICAgQHNob3dWaWV3IGxheW91dFxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmJhckFwcFxuXG5cbiJdfQ==
