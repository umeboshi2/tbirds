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
    return tc.div('.navbar-entries.mr-auto');
  });

  return NavbarEntriesView;

}).call(this);

export default NavbarEntriesView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cmllcy5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvZW50cmllcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGlCQUFBLEVBQUEseUJBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFVBQVUsQ0FBQyxLQUF2QztJQUlFLGVBQWlCLENBQUEsQ0FBQTtBQUNmLFVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtNQUNOLE9BQUEsR0FDRTtRQUFBLEdBQUEsRUFBSyxHQUFMO1FBQ0EsV0FBQSxFQUFhLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtNQURiO0FBRUYsYUFBTztJQUxROztJQVVqQixVQUFZLENBQUEsQ0FBQTthQUNWLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQ7SUFEVTs7SUFFWixZQUFjLENBQUEsQ0FBQTthQUNaLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtJQURZOztFQWhCaEI7OzBCQUNFLEtBQUEsR0FBTzs7MEJBQ1AsT0FBQSxHQUFTOzswQkFDVCxTQUFBLEdBQVc7OzBCQU9YLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzswQkFDRixRQUFBLEdBQ0U7SUFBQSxpQkFBQSxFQUFtQjtFQUFuQjs7Ozs7O0FBTUU7RUFBTixNQUFB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O0lBQUEsSUFBQSxFQUFNLFVBQU47SUFDQSxRQUFBLEVBQVUsWUFEVjtJQUVBLE1BQUEsRUFBUTtFQUZSOzs4QkFPRixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8seUJBQVA7RUFEc0IsQ0FBZDs7Ozs7O0FBT1osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJFbnRyeSBmcm9tICcuL2VudHJ5LW1vZGVsJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIEJhc2VFbnRyeVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgbW9kZWw6IE5hdmJhckVudHJ5XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0nXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgY29udGV4dCA9XG4gICAgICBhcHA6IGFwcFxuICAgICAgY3VycmVudFVzZXI6IGFwcC5nZXRTdGF0ZSAnY3VycmVudFVzZXInXG4gICAgcmV0dXJuIGNvbnRleHRcbiAgdWk6XG4gICAgZW50cnk6ICcubmF2YmFyLWVudHJ5J1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmVudHJ5JzogJ2NsaWNrOmVudHJ5J1xuICBzZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgdW5zZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBcbmNsYXNzIFNpbmdsZUVudHJ5VmlldyBleHRlbmRzIEJhc2VFbnRyeVZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICAgIHRjLmEgJy5uYXZiYXItZW50cnkubmF2LWxpbmsnLCBocmVmOmVudHJ5LnVybCwgLT5cbiAgICAgIGlmIGVudHJ5Lmljb25cbiAgICAgICAgdGMuaSBlbnRyeS5pY29uXG4gICAgICAgIHRjLnRleHQgXCIgXCJcbiAgICAgIHRjLnRleHQgZW50cnkubGFiZWxcblxuY2xhc3MgRHJvcGRvd25FbnRyeVZpZXcgZXh0ZW5kcyBCYXNlRW50cnlWaWV3XG4gIGNsYXNzTmFtZTogJ25hdi1pdGVtIGRyb3Bkb3duJ1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gICAgdGMuYSAnLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZScsXG4gICAgcm9sZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgdGMudGV4dCBlbnRyeS5sYWJlbFxuICAgICAgdGMuYiAnLmNhcmV0J1xuICAgIHRjLnVsICcuZHJvcGRvd24tbWVudScsIC0+XG4gICAgICBmb3IgbGluayBpbiBlbnRyeS5tZW51XG4gICAgICAgIGlmIGxpbms/Lm5lZWRVc2VyIGFuZCBub3QgZW50cnkuY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgIHRjLmEgJy5uYXZiYXItZW50cnkubmF2LWxpbmsuZHJvcGRvd24taXRlbScsIGhyZWY6bGluay51cmwsIC0+XG4gICAgICAgICAgICBpZiBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMuaSBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMudGV4dCBcIiBcIlxuICAgICAgICAgICAgdGMudGV4dCBsaW5rLmxhYmVsXG5cbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbmF2YmFyLW5hdidcbiAgXG4gIGNoaWxkVmlldzogKGl0ZW0pIC0+XG4gICAgaWYgaXRlbS5oYXMoJ21lbnUnKSBhbmQgaXRlbS5nZXQoJ21lbnUnKVxuICAgICAgRHJvcGRvd25FbnRyeVZpZXdcbiAgICBlbHNlXG4gICAgICBTaW5nbGVFbnRyeVZpZXdcbiAgICAgIFxuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICBAY2hpbGRyZW4uZWFjaCAodmlldykgLT5cbiAgICAgIHZpZXcudW5zZXRfYWN0aXZlKClcbiAgICAgIFxuICBvbkNoaWxkdmlld0NsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgQHNldEFsbEluYWN0aXZlKClcbiAgICBjdmlldy5zZXRfYWN0aXZlKClcbiAgICBAbmF2aWdhdGVPbkNsaWNrRW50cnkgY3ZpZXcsIGV2ZW50XG4gICAgXG4gIG5hdmlnYXRlT25DbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgICMgRklYTUUgdHJpZ2dlcmluZyBjbGljazplbnRyeVxuICAgICMgc2VlbXMgdG8gbGVhdmUgZHJvcGRvd24gb3BlblxuICAgICMgdGhpcyBjbG9zZXMgdGhlIG5hdmJhciBtZW51XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBpZiBjdmlldy4kZWwuaGFzQ2xhc3MgXCJzaG93XCJcbiAgICAgIGN2aWV3LiRlbC5kcm9wZG93bigndG9nZ2xlJylcbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICBpZiB0YXJnZXQudGFnTmFtZSBpcyBcIklcIlxuICAgICAgY29uc29sZS53YXJuIFwiY2xpY2tlZCBpY29uXCJcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KS5wYXJlbnQoKVxuICAgIGVsc2VcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KVxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gYW5jaG9yLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgICNjdmlldy5jbG9zZURyb3BEb3duKClcbiAgICBcbmNsYXNzIE5hdmJhckVudHJpZXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHVpOlxuICAgIGxpc3Q6ICcubmF2YmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgbGlzdDogJ0B1aS5saXN0J1xuICAgIHVzZXJNZW51OiAnI3VzZXItbWVudSdcbiAgICBzZWFyY2g6ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ2xpc3QnLCB2aWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItZW50cmllcy5tci1hdXRvJ1xuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICB2aWV3ID0gQGdldENoaWxkVmlldyAnbGlzdCdcbiAgICB2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICBcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE5hdmJhckVudHJpZXNWaWV3XG5cblxuXG4iXX0=
