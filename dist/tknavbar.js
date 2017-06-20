var $, Backbone, BaseEntryView, BootstrapNavBarView, DropdownEntryView, MainChannel, Marionette, MessageChannel, NavbarApp, NavbarEntriesView, NavbarEntry, NavbarEntryCollection, NavbarEntryCollectionView, NavbarHeaderView, SingleEntryView, Toolkit, navbar_collapse_button, navbar_entry_collection, tc,
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

BaseEntryView = (function(superClass) {
  extend(BaseEntryView, superClass);

  function BaseEntryView() {
    return BaseEntryView.__super__.constructor.apply(this, arguments);
  }

  BaseEntryView.prototype.model = NavbarEntry;

  BaseEntryView.prototype.tagName = 'li';

  BaseEntryView.prototype.templateContext = function() {
    var app, context;
    app = MainChannel.request('main:app:object');
    context = {
      app: app,
      currentUser: app.getState('currentUser')
    };
    return context;
  };

  BaseEntryView.prototype.ui = {
    entry: '.navbar-entry'
  };

  BaseEntryView.prototype.triggers = {
    'click @ui.entry': 'click:entry'
  };

  BaseEntryView.prototype.set_active = function() {
    return this.$el.addClass('active');
  };

  BaseEntryView.prototype.unset_active = function() {
    this.$el.removeClass('active');
    return this.$el.removeClass('open');
  };

  return BaseEntryView;

})(Marionette.View);

SingleEntryView = (function(superClass) {
  extend(SingleEntryView, superClass);

  function SingleEntryView() {
    return SingleEntryView.__super__.constructor.apply(this, arguments);
  }

  SingleEntryView.prototype.template = tc.renderable(function(entry) {
    return tc.a('.navbar-entry', {
      href: entry.url
    }, entry.label);
  });

  return SingleEntryView;

})(BaseEntryView);

DropdownEntryView = (function(superClass) {
  extend(DropdownEntryView, superClass);

  function DropdownEntryView() {
    return DropdownEntryView.__super__.constructor.apply(this, arguments);
  }

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

})(BaseEntryView);

NavbarEntryCollectionView = (function(superClass) {
  extend(NavbarEntryCollectionView, superClass);

  function NavbarEntryCollectionView() {
    return NavbarEntryCollectionView.__super__.constructor.apply(this, arguments);
  }

  NavbarEntryCollectionView.prototype.tagName = 'ul';

  NavbarEntryCollectionView.prototype.className = 'nav navbar-nav nav-pills';

  NavbarEntryCollectionView.prototype.childView = function(item) {
    if (item.has('menu') && item.get('menu')) {
      return DropdownEntryView;
    } else {
      return SingleEntryView;
    }
  };

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
  };

  BootstrapNavBarView.prototype.onChildviewClickBrand = function(view, event) {
    var eview;
    eview = this.getChildView('entries');
    eview.setAllInactive();
    return this.navigateOnClickEntry(view, event);
  };

  BootstrapNavBarView.prototype.navigateOnClickEntry = function(cview, event) {
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

  return BootstrapNavBarView;

})(Marionette.View);

NavbarApp = (function(superClass) {
  extend(NavbarApp, superClass);

  function NavbarApp() {
    return NavbarApp.__super__.constructor.apply(this, arguments);
  }

  NavbarApp.prototype.onBeforeStart = function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIuanMiLCJzb3VyY2VzIjpbInRrbmF2YmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHlTQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYOzs7Ozs7O3dCQUNKLFFBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxXQUFQO0lBQ0EsR0FBQSxFQUFLLE1BREw7SUFFQSxhQUFBLEVBQWUsS0FGZjtJQUdBLE9BQUEsRUFBUyxFQUhUO0lBSUEsSUFBQSxFQUFNLEVBSk47Ozs7O0dBRnNCLFFBQVEsQ0FBQzs7QUFRN0I7Ozs7Ozs7a0NBQ0osS0FBQSxHQUFPOzs7O0dBRDJCLFFBQVEsQ0FBQzs7QUFHN0MsdUJBQUEsR0FBMEIsSUFBSTs7QUFDOUIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsZ0JBQWxCLEVBQW9DLFNBQUE7U0FDbEM7QUFEa0MsQ0FBcEM7O0FBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0Isa0JBQWxCLEVBQXNDLFNBQUE7U0FDcEMsSUFBSTtBQURnQyxDQUF0Qzs7QUFHQSxXQUFXLENBQUMsS0FBWixDQUFrQixrQkFBbEIsRUFBc0MsU0FBQyxJQUFEO1NBQ3BDLHVCQUF1QixDQUFDLEdBQXhCLENBQTRCLElBQTVCO0FBRG9DLENBQXRDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLG9CQUFsQixFQUF3QyxTQUFDLEtBQUQ7U0FDdEMsdUJBQXVCLENBQUMsR0FBeEIsQ0FBNEIsS0FBNUI7QUFEc0MsQ0FBeEM7O0FBUUEsc0JBQUEsR0FBMEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLE1BQUQ7U0FDdEMsRUFBRSxDQUFDLE1BQUgsQ0FBVSxnQkFBVixFQUE0QjtJQUFBLElBQUEsRUFBSyxRQUFMO0lBQWUsYUFBQSxFQUFjLFVBQTdCO0lBQzVCLGFBQUEsRUFBZSxHQUFBLEdBQUksTUFEUztHQUE1QixFQUM2QixTQUFBO0lBQzNCLEVBQUUsQ0FBQyxJQUFILENBQVEsVUFBUixFQUFvQixtQkFBcEI7SUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7SUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7V0FDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7RUFKMkIsQ0FEN0I7QUFEc0MsQ0FBZDs7QUFRcEI7Ozs7Ozs7MEJBQ0osS0FBQSxHQUFPOzswQkFDUCxPQUFBLEdBQVM7OzBCQUNULGVBQUEsR0FBaUIsU0FBQTtBQUNmLFFBQUE7SUFBQSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0lBQ04sT0FBQSxHQUNFO01BQUEsR0FBQSxFQUFLLEdBQUw7TUFDQSxXQUFBLEVBQWEsR0FBRyxDQUFDLFFBQUosQ0FBYSxhQUFiLENBRGI7O0FBRUYsV0FBTztFQUxROzswQkFNakIsRUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPLGVBQVA7OzswQkFDRixRQUFBLEdBQ0U7SUFBQSxpQkFBQSxFQUFtQixhQUFuQjs7OzBCQUNGLFVBQUEsR0FBWSxTQUFBO1dBQ1YsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsUUFBZDtFQURVOzswQkFFWixZQUFBLEdBQWMsU0FBQTtJQUNaLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtXQUlBLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixNQUFqQjtFQUxZOzs7O0dBZlksVUFBVSxDQUFDOztBQXNCakM7Ozs7Ozs7NEJBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1dBQ3RCLEVBQUUsQ0FBQyxDQUFILENBQUssZUFBTCxFQUFzQjtNQUFBLElBQUEsRUFBSyxLQUFLLENBQUMsR0FBWDtLQUF0QixFQUFzQyxLQUFLLENBQUMsS0FBNUM7RUFEc0IsQ0FBZDs7OztHQURrQjs7QUFJeEI7Ozs7Ozs7OEJBQ0osU0FBQSxHQUFXOzs4QkFDWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7SUFDdEIsRUFBRSxDQUFDLENBQUgsQ0FBSyxrQkFBTCxFQUF5QjtNQUFBLElBQUEsRUFBSyxRQUFMO01BQWUsYUFBQSxFQUFjLFVBQTdCO0tBQXpCLEVBQWtFLFNBQUE7TUFDaEUsRUFBRSxDQUFDLElBQUgsQ0FBUSxLQUFLLENBQUMsS0FBZDthQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssUUFBTDtJQUZnRSxDQUFsRTtXQUdBLEVBQUUsQ0FBQyxFQUFILENBQU0sZ0JBQU4sRUFBd0IsU0FBQTtBQUN0QixVQUFBO0FBQUE7QUFBQTtXQUFBLHFDQUFBOztRQUNFLG9CQUFHLElBQUksQ0FBRSxrQkFBTixJQUFtQixDQUFJLEtBQUssQ0FBQyxXQUFoQztBQUNFLG1CQURGOztxQkFFQSxFQUFFLENBQUMsRUFBSCxDQUFNLFNBQUE7aUJBQ0osRUFBRSxDQUFDLENBQUgsQ0FBSyxlQUFMLEVBQXNCO1lBQUEsSUFBQSxFQUFLLElBQUksQ0FBQyxHQUFWO1dBQXRCLEVBQXFDLElBQUksQ0FBQyxLQUExQztRQURJLENBQU47QUFIRjs7SUFEc0IsQ0FBeEI7RUFKc0IsQ0FBZDs7OztHQUZvQjs7QUFhMUI7Ozs7Ozs7c0NBQ0osT0FBQSxHQUFTOztzQ0FDVCxTQUFBLEdBQVc7O3NDQUVYLFNBQUEsR0FBVyxTQUFDLElBQUQ7SUFDVCxJQUFHLElBQUksQ0FBQyxHQUFMLENBQVMsTUFBVCxDQUFBLElBQXFCLElBQUksQ0FBQyxHQUFMLENBQVMsTUFBVCxDQUF4QjthQUNFLGtCQURGO0tBQUEsTUFBQTthQUdFLGdCQUhGOztFQURTOztzQ0FNWCxjQUFBLEdBQWdCLFNBQUE7V0FDZCxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBZSxTQUFDLElBQUQ7YUFDYixJQUFJLENBQUMsWUFBTCxDQUFBO0lBRGEsQ0FBZjtFQURjOztzQ0FJaEIscUJBQUEsR0FBdUIsU0FBQyxLQUFELEVBQVEsS0FBUjtJQUNyQixJQUFDLENBQUEsY0FBRCxDQUFBO0lBQ0EsS0FBSyxDQUFDLFVBQU4sQ0FBQTtXQUNBLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixLQUF0QixFQUE2QixLQUE3QjtFQUhxQjs7c0NBS3ZCLG9CQUFBLEdBQXNCLFNBQUMsS0FBRCxFQUFRLEtBQVI7QUFDcEIsUUFBQTtJQUFBLE1BQUEsR0FBUyxLQUFLLENBQUM7SUFFZixJQUFBLEdBQU8sQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxNQUFmO0lBQ1AsSUFBRyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZ0IsQ0FBQSxDQUFBLENBQWhCLEtBQXNCLEVBQXpCO2FBQ0UsTUFBTSxDQUFDLFFBQVAsR0FBa0IsS0FEcEI7S0FBQSxNQUFBO01BR0UsTUFBQSxHQUFTLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGFBQXBCO2FBQ1QsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsSUFBaEIsRUFBc0I7UUFBQSxPQUFBLEVBQVMsSUFBVDtPQUF0QixFQUpGOztFQUpvQjs7OztHQW5CZ0IsVUFBVSxDQUFDOztBQThCN0M7Ozs7Ozs7OEJBQ0osT0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLGlCQUFOO0lBQ0EsUUFBQSxFQUFVLFlBRFY7SUFFQSxNQUFBLEVBQVEsd0JBRlI7Ozs4QkFHRixRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBSSx5QkFBSixDQUNMO01BQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO0tBREs7V0FFUCxJQUFDLENBQUEsYUFBRCxDQUFlLE1BQWYsRUFBdUIsSUFBdkI7RUFIUTs7OEJBSVYsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0RBQVAsRUFBeUQsU0FBQTtNQUN2RCxFQUFFLENBQUMsR0FBSCxDQUFPLGlCQUFQO01BQ0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSx3Q0FBTjthQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sd0JBQVA7SUFIdUQsQ0FBekQ7RUFEc0IsQ0FBZDs7OEJBS1YsY0FBQSxHQUFnQixTQUFBO0FBQ2QsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFDLENBQUEsWUFBRCxDQUFjLE1BQWQ7V0FDUCxJQUFJLENBQUMsY0FBTCxDQUFBO0VBRmM7Ozs7R0FkYyxVQUFVLENBQUM7O0FBbUJyQzs7Ozs7Ozs2QkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7SUFDdEIsc0JBQUEsQ0FBdUIsc0JBQXZCO1dBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxlQUFMLEVBQXNCO01BQUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxHQUFYO0tBQXRCLEVBQXNDLEtBQUssQ0FBQyxLQUE1QztFQUZzQixDQUFkOzs2QkFHVixFQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU8sZUFBUDs7OzZCQUNGLFFBQUEsR0FDRTtJQUFBLGlCQUFBLEVBQW1CLGFBQW5COzs7OztHQVAyQixVQUFVLENBQUM7O0FBVXBDOzs7Ozs7O2dDQUNKLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLHNEQUFQLEVBQ0E7TUFBQSxLQUFBLEVBQU0sOEJBQU47TUFBc0MsVUFBQSxFQUFXLElBQWpEO01BQ0EsSUFBQSxFQUFLLFlBREw7S0FEQSxFQUVtQixTQUFBO2FBQ2pCLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixTQUFBO1FBQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVA7ZUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGlCQUFQO01BRm1CLENBQXJCO0lBRGlCLENBRm5CO0VBRHNCLENBQWQ7O2dDQU9WLE9BQUEsR0FDRTtJQUFBLE1BQUEsRUFBUSxnQkFBUjtJQUNBLFFBQUEsRUFBVSxZQURWO0lBRUEsUUFBQSxFQUFVLFlBRlY7SUFHQSxPQUFBLEVBQVMsaUJBSFQ7OztnQ0FJRixRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFNBQVgsQ0FBSDtNQUNFLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7TUFDTixXQUFBLEdBQWMsR0FBRyxDQUFDLFFBQUosQ0FBYSxhQUFiO01BQ2QsYUFBQSxHQUFnQjtBQUNoQjtBQUFBLFdBQUEscUNBQUE7O1FBQ0UscUJBQUcsS0FBSyxDQUFFLGtCQUFQLElBQW9CLENBQUksV0FBM0I7QUFDRSxtQkFERjs7UUFFQSxhQUFhLENBQUMsSUFBZCxDQUFtQixLQUFuQjtBQUhGLE9BSkY7S0FBQSxNQUFBO01BU0UsYUFBQSxHQUFnQixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxlQUFYLEVBVGxCOztJQVVBLEtBQUEsR0FBUSxJQUFJLGlCQUFKLENBQ047TUFBQSxVQUFBLEVBQVksSUFBSSxRQUFRLENBQUMsVUFBYixDQUF3QixhQUF4QixDQUFaO0tBRE07SUFFUixJQUFDLENBQUEsYUFBRCxDQUFlLFNBQWYsRUFBMEIsS0FBMUI7SUFDQSxLQUFBLEdBQVEsSUFBSSxnQkFBSixDQUNOO01BQUEsS0FBQSxFQUFPLElBQUksUUFBUSxDQUFDLEtBQWIsQ0FBbUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsT0FBWCxDQUFuQixDQUFQO0tBRE07V0FFUixJQUFDLENBQUEsYUFBRCxDQUFlLFFBQWYsRUFBeUIsS0FBekI7RUFoQlE7O2dDQWtCVixxQkFBQSxHQUF1QixTQUFDLElBQUQsRUFBTyxLQUFQO0FBQ3JCLFFBQUE7SUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxTQUFkO0lBQ1IsS0FBSyxDQUFDLGNBQU4sQ0FBQTtXQUNBLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixJQUF0QixFQUE0QixLQUE1QjtFQUhxQjs7Z0NBS3ZCLG9CQUFBLEdBQXNCLFNBQUMsS0FBRCxFQUFRLEtBQVI7QUFDcEIsUUFBQTtJQUFBLE1BQUEsR0FBUyxLQUFLLENBQUM7SUFFZixJQUFBLEdBQU8sQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxNQUFmO0lBQ1AsSUFBRyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZ0IsQ0FBQSxDQUFBLENBQWhCLEtBQXNCLEVBQXpCO2FBQ0UsTUFBTSxDQUFDLFFBQVAsR0FBa0IsS0FEcEI7S0FBQSxNQUFBO01BR0UsTUFBQSxHQUFTLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGFBQXBCO2FBQ1QsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsSUFBaEIsRUFBc0I7UUFBQSxPQUFBLEVBQVMsSUFBVDtPQUF0QixFQUpGOztFQUpvQjs7OztHQXBDVSxVQUFVLENBQUM7O0FBK0N2Qzs7Ozs7OztzQkFDSixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNyQixNQUFBLEdBQVMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBbkIsQ0FBQSxDQUE0QixDQUFDLFNBQTdCLENBQXVDLFFBQXZDO0lBQ1QsSUFBQyxDQUFBLFNBQUQsQ0FBVyxNQUFYO0lBQ0EsSUFBRyxTQUFTLENBQUMsT0FBYjthQUNFLFdBQUEsR0FBYyxJQUFDLENBQUEsV0FBRCxDQUFhLFdBQWIsRUFDWjtRQUFBLFFBQUEsRUFBVSxTQUFTLENBQUMsV0FBcEI7UUFDQSxlQUFBLEVBQWlCLElBRGpCO1FBRUEsU0FBQSxFQUFXLFNBRlg7UUFJQSxTQUFBLEVBQVcsSUFKWDtPQURZLEVBRGhCOztFQUphOztzQkFZZixPQUFBLEdBQVMsU0FBQTtXQUVQLElBQUMsQ0FBQSxRQUFELENBQUE7RUFGTzs7c0JBSVQsUUFBQSxHQUFVLFNBQUE7QUFDUixRQUFBO0lBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUN2QyxNQUFBLEdBQVMsSUFBSSxtQkFBSixDQUNQO01BQUEsS0FBQSxFQUFPLElBQUksUUFBUSxDQUFDLEtBQWIsQ0FBbUIsU0FBbkIsQ0FBUDtLQURPO1dBRVQsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0VBSlE7Ozs7R0FqQlksT0FBTyxDQUFDOztBQXVCaEMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuVG9vbGtpdCA9IHJlcXVpcmUgJ21hcmlvbmV0dGUudG9vbGtpdCdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIE5hdmJhckVudHJ5IGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgbGFiZWw6ICdBcHAgTGFiZWwnXG4gICAgdXJsOiAnI2FwcCdcbiAgICBzaW5nbGVfYXBwbGV0OiBmYWxzZVxuICAgIGFwcGxldHM6IFtdXG4gICAgdXJsczogW11cbiAgICBcbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IE5hdmJhckVudHJ5XG5cbm5hdmJhcl9lbnRyeV9jb2xsZWN0aW9uID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblxuTWFpbkNoYW5uZWwucmVwbHkgJ25hdmJhci1lbnRyaWVzJywgLT5cbiAgbmF2YmFyX2VudHJ5X2NvbGxlY3Rpb25cblxuTWFpbkNoYW5uZWwucmVwbHkgJ25ldy1uYXZiYXItZW50cnknLCAtPlxuICBuZXcgTmF2YmFyRW50cnlcblxuTWFpbkNoYW5uZWwucmVwbHkgJ2FkZC1uYXZiYXItZW50cnknLCAoYXR0cykgLT5cbiAgbmF2YmFyX2VudHJ5X2NvbGxlY3Rpb24uYWRkIGF0dHNcbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnYWRkLW5hdmJhci1lbnRyaWVzJywgKG9saXN0KSAtPlxuICBuYXZiYXJfZW50cnlfY29sbGVjdGlvbi5hZGQgb2xpc3RcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgd2UgbWF5IHJlbW92ZSB0aGUgY2hhbm5lbCBzdHVmZiBsYXRlciwgb3IgdXNlIGl0XG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIFxubmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAgPSB0Yy5yZW5kZXJhYmxlICh0YXJnZXQpIC0+XG4gIHRjLmJ1dHRvbiAnLm5hdmJhci10b2dnbGUnLCB0eXBlOididXR0b24nLCAnZGF0YS10b2dnbGUnOidjb2xsYXBzZScsXG4gICdkYXRhLXRhcmdldCc6IFwiIyN7dGFyZ2V0fVwiLCAtPlxuICAgIHRjLnNwYW4gJy5zci1vbmx5JywgJ1RvZ2dsZSBOYXZpZ2F0aW9uJ1xuICAgIHRjLnNwYW4gJy5pY29uLWJhcidcbiAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgdGMuc3BhbiAnLmljb24tYmFyJ1xuICAgICAgXG5jbGFzcyBCYXNlRW50cnlWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIG1vZGVsOiBOYXZiYXJFbnRyeVxuICB0YWdOYW1lOiAnbGknXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgY29udGV4dCA9XG4gICAgICBhcHA6IGFwcFxuICAgICAgY3VycmVudFVzZXI6IGFwcC5nZXRTdGF0ZSAnY3VycmVudFVzZXInXG4gICAgcmV0dXJuIGNvbnRleHRcbiAgdWk6XG4gICAgZW50cnk6ICcubmF2YmFyLWVudHJ5J1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmVudHJ5JzogJ2NsaWNrOmVudHJ5J1xuICBzZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgdW5zZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ29wZW4nXG4gIFxuY2xhc3MgU2luZ2xlRW50cnlWaWV3IGV4dGVuZHMgQmFzZUVudHJ5Vmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gICAgdGMuYSAnLm5hdmJhci1lbnRyeScsIGhyZWY6ZW50cnkudXJsLCBlbnRyeS5sYWJlbFxuXG5jbGFzcyBEcm9wZG93bkVudHJ5VmlldyBleHRlbmRzIEJhc2VFbnRyeVZpZXdcbiAgY2xhc3NOYW1lOiAnZHJvcGRvd24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChlbnRyeSkgLT5cbiAgICB0Yy5hICcuZHJvcGRvd24tdG9nZ2xlJywgcm9sZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgdGMudGV4dCBlbnRyeS5sYWJlbFxuICAgICAgdGMuYiAnLmNhcmV0J1xuICAgIHRjLnVsICcuZHJvcGRvd24tbWVudScsIC0+XG4gICAgICBmb3IgbGluayBpbiBlbnRyeS5tZW51XG4gICAgICAgIGlmIGxpbms/Lm5lZWRVc2VyIGFuZCBub3QgZW50cnkuY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgIHRjLmEgJy5uYXZiYXItZW50cnknLCBocmVmOmxpbmsudXJsLCBsaW5rLmxhYmVsXG5cbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbmF2IG5hdmJhci1uYXYgbmF2LXBpbGxzJ1xuICBcbiAgY2hpbGRWaWV3OiAoaXRlbSkgLT5cbiAgICBpZiBpdGVtLmhhcygnbWVudScpIGFuZCBpdGVtLmdldCgnbWVudScpXG4gICAgICBEcm9wZG93bkVudHJ5Vmlld1xuICAgIGVsc2VcbiAgICAgIFNpbmdsZUVudHJ5Vmlld1xuICAgICAgXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIEBjaGlsZHJlbi5lYWNoICh2aWV3KSAtPlxuICAgICAgdmlldy51bnNldF9hY3RpdmUoKVxuICAgICAgXG4gIG9uQ2hpbGR2aWV3Q2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICBAc2V0QWxsSW5hY3RpdmUoKVxuICAgIGN2aWV3LnNldF9hY3RpdmUoKVxuICAgIEBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeSBjdmlldywgZXZlbnRcbiAgICBcbiAgbmF2aWdhdGVPbkNsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgIyBsb29rIGF0IGhyZWYgYW5kIGdvIHRoZXJlIG1heWJlP1xuICAgIGhyZWYgPSAkKHRhcmdldCkuYXR0ciAnaHJlZidcbiAgICBpZiBocmVmLnNwbGl0KCcvJylbMF0gPT0gJydcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhyZWZcbiAgICBlbHNlXG4gICAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluLXJvdXRlcidcbiAgICAgIHJvdXRlci5uYXZpZ2F0ZSBocmVmLCB0cmlnZ2VyOiB0cnVlXG4gICAgICBcblxuY2xhc3MgTmF2YmFyRW50cmllc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgcmVnaW9uczpcbiAgICBsaXN0OiAnI25hdmJhci1lbnRyaWVzJ1xuICAgIHVzZXJNZW51OiAnI3VzZXItbWVudSdcbiAgICBzZWFyY2g6ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ2xpc3QnLCB2aWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJyNuYXZiYXItdmlldy1jb2xsYXBzZS5jb2xsYXBzZS5uYXZiYXItY29sbGFwc2UnLCAtPlxuICAgICAgdGMuZGl2ICcjbmF2YmFyLWVudHJpZXMnXG4gICAgICB0Yy51bCAnI3VzZXItbWVudS5uYXYubmF2YmFyLW5hdi5uYXZiYXItcmlnaHQnXG4gICAgICB0Yy5kaXYgJyNmb3JtLXNlYXJjaC1jb250YWluZXInXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIHZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdsaXN0J1xuICAgIHZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIFxuICAgIFxuY2xhc3MgTmF2YmFySGVhZGVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgbmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAnbmF2YmFyLXZpZXctY29sbGFwc2UnXG4gICAgdGMuYSAnLm5hdmJhci1icmFuZCcsIGhyZWY6bW9kZWwudXJsLCBtb2RlbC5sYWJlbFxuICB1aTpcbiAgICBicmFuZDogJy5uYXZiYXItYnJhbmQnXG4gIHRyaWdnZXJzOlxuICAgICdjbGljayBAdWkuYnJhbmQnOiAnY2xpY2s6YnJhbmQnXG4gICAgXG4gICAgXG5jbGFzcyBCb290c3RyYXBOYXZCYXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5uYXYgJyNuYXZiYXItdmlldy5uYXZiYXIubmF2YmFyLXN0YXRpYy10b3AubmF2YmFyLWRlZmF1bHQnLFxuICAgIHhtbG5zOidodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ3htbDpsYW5nJzonZW4nLFxuICAgIHJvbGU6J25hdmlnYXRpb24nLCAtPlxuICAgICAgdGMuZGl2ICcuY29udGFpbmVyJywgLT5cbiAgICAgICAgdGMuZGl2ICcubmF2YmFyLWhlYWRlcidcbiAgICAgICAgdGMuZGl2ICcjbmF2YmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAnLm5hdmJhci1oZWFkZXInXG4gICAgdXNlcm1lbnU6ICcjdXNlci1tZW51J1xuICAgIG1haW5tZW51OiAnI21haW4tbWVudSdcbiAgICBlbnRyaWVzOiAnI25hdmJhci1lbnRyaWVzJ1xuICBvblJlbmRlcjogLT5cbiAgICBpZiBAbW9kZWwuZ2V0ICdoYXNVc2VyJ1xuICAgICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgICAgY3VycmVudFVzZXIgPSBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgICAgbmF2YmFyRW50cmllcyA9IFtdXG4gICAgICBmb3IgZW50cnkgaW4gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICAgICAgaWYgZW50cnk/Lm5lZWRVc2VyIGFuZCBub3QgY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICBuYXZiYXJFbnRyaWVzLnB1c2ggZW50cnlcbiAgICBlbHNlXG4gICAgICBuYXZiYXJFbnRyaWVzID0gQG1vZGVsLmdldCAnbmF2YmFyRW50cmllcydcbiAgICBldmlldyA9IG5ldyBOYXZiYXJFbnRyaWVzVmlld1xuICAgICAgY29sbGVjdGlvbjogbmV3IEJhY2tib25lLkNvbGxlY3Rpb24gbmF2YmFyRW50cmllc1xuICAgIEBzaG93Q2hpbGRWaWV3ICdlbnRyaWVzJywgZXZpZXdcbiAgICBodmlldyA9IG5ldyBOYXZiYXJIZWFkZXJWaWV3XG4gICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsIEBtb2RlbC5nZXQgJ2JyYW5kJ1xuICAgIEBzaG93Q2hpbGRWaWV3ICdoZWFkZXInLCBodmlld1xuICAgIFxuICBvbkNoaWxkdmlld0NsaWNrQnJhbmQ6ICh2aWV3LCBldmVudCkgLT5cbiAgICBldmlldyA9IEBnZXRDaGlsZFZpZXcgJ2VudHJpZXMnXG4gICAgZXZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIEBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeSB2aWV3LCBldmVudFxuICAgIFxuICBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICAjIGxvb2sgYXQgaHJlZiBhbmQgZ28gdGhlcmUgbWF5YmU/XG4gICAgaHJlZiA9ICQodGFyZ2V0KS5hdHRyICdocmVmJ1xuICAgIGlmIGhyZWYuc3BsaXQoJy8nKVswXSA9PSAnJ1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZlxuICAgIGVsc2VcbiAgICAgIHJvdXRlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tcm91dGVyJ1xuICAgICAgcm91dGVyLm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICAgIFxuXG5jbGFzcyBOYXZiYXJBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIGFwcENvbmZpZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgIHJlZ2lvbiA9IEBvcHRpb25zLnBhcmVudEFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICduYXZiYXInXG4gICAgQHNldFJlZ2lvbiByZWdpb25cbiAgICBpZiBhcHBDb25maWcuaGFzVXNlclxuICAgICAgdXNlck1lbnVBcHAgPSBAYWRkQ2hpbGRBcHAgJ3VzZXItbWVudScsXG4gICAgICAgIEFwcENsYXNzOiBhcHBDb25maWcudXNlck1lbnVBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgIGFwcENvbmZpZzogYXBwQ29uZmlnXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBvblN0YXJ0OiAtPlxuICAgICMgYnVpbGQgbWFpbiBwYWdlIGxheW91dFxuICAgIEBpbml0UGFnZSgpXG5cbiAgaW5pdFBhZ2U6IC0+XG4gICAgYXBwQ29uZmlnID0gQG9wdGlvbnMucGFyZW50QXBwLm9wdGlvbnMuYXBwQ29uZmlnXG4gICAgbGF5b3V0ID0gbmV3IEJvb3RzdHJhcE5hdkJhclZpZXdcbiAgICAgIG1vZGVsOiBuZXcgQmFja2JvbmUuTW9kZWwgYXBwQ29uZmlnXG4gICAgQHNob3dWaWV3IGxheW91dFxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmJhckFwcFxuXG5cbiJdfQ==
