var BaseEntryView, DropdownEntryView, MainChannel, MessageChannel, NavbarEntriesView, NavbarEntryCollectionView, SingleEntryView;

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import NavbarEntry from './entry-model';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

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
      return this.$el.removeClass('active');
    }

  };

  BaseEntryView.prototype.model = NavbarEntry;

  BaseEntryView.prototype.tagName = 'li';

  BaseEntryView.prototype.className = 'nav-item';

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
    return tc.a('.navbar-entry.nav-link', {
      href: entry.url
    }, function() {
      if (entry.icon) {
        tc.i(entry.icon);
        tc.text(" ");
      }
      return tc.text(entry.label);
    });
  });

  return SingleEntryView;

}).call(this);

DropdownEntryView = (function() {
  class DropdownEntryView extends BaseEntryView {};

  DropdownEntryView.prototype.className = 'nav-item dropdown';

  DropdownEntryView.prototype.template = tc.renderable(function(entry) {
    tc.a('.nav-link.dropdown-toggle', {
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
          return tc.a('.navbar-entry.nav-link.dropdown-item', {
            href: link.url
          }, function() {
            if (link.icon) {
              tc.i(link.icon);
              tc.text(" ");
            }
            return tc.text(link.label);
          });
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
      var anchor, href, router, target;
      // FIXME triggering click:entry
      // seems to leave dropdown open
      // this closes the navbar menu
      event.stopPropagation();
      if (cview.$el.hasClass("show")) {
        cview.$el.dropdown('toggle');
      }
      target = event.target;
      if (target.tagName === "I") {
        console.warn("clicked icon");
        anchor = $(target).parent();
      } else {
        anchor = $(target);
      }
      // look at href and go there maybe?
      href = anchor.attr('href');
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

  NavbarEntryCollectionView.prototype.className = 'navbar-nav';

  return NavbarEntryCollectionView;

}).call(this);

NavbarEntriesView = (function() {
  //cview.closeDropDown()
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

  NavbarEntriesView.prototype.ui = {
    list: '.navbar-entries'
  };

  NavbarEntriesView.prototype.regions = {
    list: '@ui.list',
    userMenu: '#user-menu',
    search: '#form-search-container'
  };

  NavbarEntriesView.prototype.template = tc.renderable(function(model) {
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.div('.navbar-entries.mr-auto');
      //tc.div '#user-menu.nav.navbar-nav.navbar-right.ml-auto'
      return tc.div('#form-search-container');
    });
  });

  return NavbarEntriesView;

}).call(this);

export default NavbarEntriesView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cmllcy5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvZW50cmllcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGlCQUFBLEVBQUEseUJBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFVBQVUsQ0FBQyxLQUF2QztJQUlFLGVBQWlCLENBQUEsQ0FBQTtBQUNmLFVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtNQUNOLE9BQUEsR0FDRTtRQUFBLEdBQUEsRUFBSyxHQUFMO1FBQ0EsV0FBQSxFQUFhLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtNQURiO0FBRUYsYUFBTztJQUxROztJQVVqQixVQUFZLENBQUEsQ0FBQTthQUNWLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQ7SUFEVTs7SUFFWixZQUFjLENBQUEsQ0FBQTthQUNaLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtJQURZOztFQWhCaEI7OzBCQUNFLEtBQUEsR0FBTzs7MEJBQ1AsT0FBQSxHQUFTOzswQkFDVCxTQUFBLEdBQVc7OzBCQU9YLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzswQkFDRixRQUFBLEdBQ0U7SUFBQSxpQkFBQSxFQUFtQjtFQUFuQjs7Ozs7O0FBTUU7RUFBTixNQUFB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RTtJQUFBLElBQUEsRUFBTSxVQUFOO0lBQ0EsUUFBQSxFQUFVLFlBRFY7SUFFQSxNQUFBLEVBQVE7RUFGUjs7OEJBT0YsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdEQUFQLEVBQXlELFFBQUEsQ0FBQSxDQUFBO01BQ3ZELEVBQUUsQ0FBQyxHQUFILENBQU8seUJBQVAsRUFBQTs7YUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBSHVELENBQXpEO0VBRHNCLENBQWQ7Ozs7OztBQVVaLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTmF2YmFyRW50cnkgZnJvbSAnLi9lbnRyeS1tb2RlbCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBCYXNlRW50cnlWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIG1vZGVsOiBOYXZiYXJFbnRyeVxuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ25hdi1pdGVtJ1xuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICAgIGNvbnRleHQgPVxuICAgICAgYXBwOiBhcHBcbiAgICAgIGN1cnJlbnRVc2VyOiBhcHAuZ2V0U3RhdGUgJ2N1cnJlbnRVc2VyJ1xuICAgIHJldHVybiBjb250ZXh0XG4gIHVpOlxuICAgIGVudHJ5OiAnLm5hdmJhci1lbnRyeSdcbiAgdHJpZ2dlcnM6XG4gICAgJ2NsaWNrIEB1aS5lbnRyeSc6ICdjbGljazplbnRyeSdcbiAgc2V0X2FjdGl2ZTogLT5cbiAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnXG4gIHVuc2V0X2FjdGl2ZTogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgXG5jbGFzcyBTaW5nbGVFbnRyeVZpZXcgZXh0ZW5kcyBCYXNlRW50cnlWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChlbnRyeSkgLT5cbiAgICB0Yy5hICcubmF2YmFyLWVudHJ5Lm5hdi1saW5rJywgaHJlZjplbnRyeS51cmwsIC0+XG4gICAgICBpZiBlbnRyeS5pY29uXG4gICAgICAgIHRjLmkgZW50cnkuaWNvblxuICAgICAgICB0Yy50ZXh0IFwiIFwiXG4gICAgICB0Yy50ZXh0IGVudHJ5LmxhYmVsXG5cbmNsYXNzIERyb3Bkb3duRW50cnlWaWV3IGV4dGVuZHMgQmFzZUVudHJ5Vmlld1xuICBjbGFzc05hbWU6ICduYXYtaXRlbSBkcm9wZG93bidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICAgIHRjLmEgJy5uYXYtbGluay5kcm9wZG93bi10b2dnbGUnLFxuICAgIHJvbGU6J2J1dHRvbicsICdkYXRhLXRvZ2dsZSc6J2Ryb3Bkb3duJywgLT5cbiAgICAgIHRjLnRleHQgZW50cnkubGFiZWxcbiAgICAgIHRjLmIgJy5jYXJldCdcbiAgICB0Yy51bCAnLmRyb3Bkb3duLW1lbnUnLCAtPlxuICAgICAgZm9yIGxpbmsgaW4gZW50cnkubWVudVxuICAgICAgICBpZiBsaW5rPy5uZWVkVXNlciBhbmQgbm90IGVudHJ5LmN1cnJlbnRVc2VyXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICB0Yy5hICcubmF2YmFyLWVudHJ5Lm5hdi1saW5rLmRyb3Bkb3duLWl0ZW0nLCBocmVmOmxpbmsudXJsLCAtPlxuICAgICAgICAgICAgaWYgbGluay5pY29uXG4gICAgICAgICAgICAgIHRjLmkgbGluay5pY29uXG4gICAgICAgICAgICAgIHRjLnRleHQgXCIgXCJcbiAgICAgICAgICAgIHRjLnRleHQgbGluay5sYWJlbFxuXG5jbGFzcyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ25hdmJhci1uYXYnXG4gIFxuICBjaGlsZFZpZXc6IChpdGVtKSAtPlxuICAgIGlmIGl0ZW0uaGFzKCdtZW51JykgYW5kIGl0ZW0uZ2V0KCdtZW51JylcbiAgICAgIERyb3Bkb3duRW50cnlWaWV3XG4gICAgZWxzZVxuICAgICAgU2luZ2xlRW50cnlWaWV3XG4gICAgICBcbiAgc2V0QWxsSW5hY3RpdmU6IC0+XG4gICAgQGNoaWxkcmVuLmVhY2ggKHZpZXcpIC0+XG4gICAgICB2aWV3LnVuc2V0X2FjdGl2ZSgpXG4gICAgICBcbiAgb25DaGlsZHZpZXdDbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIEBzZXRBbGxJbmFjdGl2ZSgpXG4gICAgY3ZpZXcuc2V0X2FjdGl2ZSgpXG4gICAgQG5hdmlnYXRlT25DbGlja0VudHJ5IGN2aWV3LCBldmVudFxuICAgIFxuICBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgaWYgY3ZpZXcuJGVsLmhhc0NsYXNzIFwic2hvd1wiXG4gICAgICBjdmlldy4kZWwuZHJvcGRvd24oJ3RvZ2dsZScpXG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgaWYgdGFyZ2V0LnRhZ05hbWUgaXMgXCJJXCJcbiAgICAgIGNvbnNvbGUud2FybiBcImNsaWNrZWQgaWNvblwiXG4gICAgICBhbmNob3IgPSAkKHRhcmdldCkucGFyZW50KClcbiAgICBlbHNlXG4gICAgICBhbmNob3IgPSAkKHRhcmdldClcbiAgICAjIGxvb2sgYXQgaHJlZiBhbmQgZ28gdGhlcmUgbWF5YmU/XG4gICAgaHJlZiA9IGFuY2hvci5hdHRyICdocmVmJ1xuICAgIGlmIGhyZWYuc3BsaXQoJy8nKVswXSA9PSAnJ1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZlxuICAgIGVsc2VcbiAgICAgIHJvdXRlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tcm91dGVyJ1xuICAgICAgcm91dGVyLm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICAjY3ZpZXcuY2xvc2VEcm9wRG93bigpXG4gICAgXG5jbGFzcyBOYXZiYXJFbnRyaWVzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB1aTpcbiAgICBsaXN0OiAnLm5hdmJhci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGxpc3Q6ICdAdWkubGlzdCdcbiAgICB1c2VyTWVudTogJyN1c2VyLW1lbnUnXG4gICAgc2VhcmNoOiAnI2Zvcm0tc2VhcmNoLWNvbnRhaW5lcidcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93Q2hpbGRWaWV3ICdsaXN0Jywgdmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLmRpdiAnLm5hdmJhci1lbnRyaWVzLm1yLWF1dG8nXG4gICAgICAjdGMuZGl2ICcjdXNlci1tZW51Lm5hdi5uYXZiYXItbmF2Lm5hdmJhci1yaWdodC5tbC1hdXRvJ1xuICAgICAgdGMuZGl2ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICB2aWV3ID0gQGdldENoaWxkVmlldyAnbGlzdCdcbiAgICB2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICBcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE5hdmJhckVudHJpZXNWaWV3XG5cblxuXG4iXX0=
