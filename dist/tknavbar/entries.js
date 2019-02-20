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
      this.$el.addClass('active');
    }

    unset_active() {
      this.$el.removeClass('active');
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
  class DropdownEntryView extends BaseEntryView {
    ui() {
      return {
        toggleButton: '.dropdown-toggle',
        entry: '.navbar-entry'
      };
    }

  };

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
      this.children.each(function(view) {
        return view.unset_active();
      });
    }

    // onChildviewClickEntry will not be called
    // without setting @childViewEvents
    onChildviewClickEntry(cview, event) {
      this.setAllInactive();
      cview.set_active();
      this.navigateOnClickEntry(cview, event);
    }

    navigateOnClickEntry(cview, event) {
      var anchor, href, router, target;
      // FIXME triggering click:entry
      // seems to leave dropdown open
      // this closes the navbar menu
      event.stopPropagation();
      if (cview.$el.hasClass("show")) {
        //cview.$el.dropdown('toggle')
        cview.ui.toggleButton.click();
      }
      target = event.target;
      // check if icon is clicked
      if (target.tagName === "I") {
        //console.warn "clicked icon"
        anchor = $(target).parent();
      } else {
        anchor = $(target);
      }
      // look at href and go there maybe?
      href = anchor.attr('href');
      if (href.split('/')[0] === '') {
        window.location = href;
      } else {
        router = MainChannel.request('main-router');
        router.navigate(href, {
          trigger: true
        });
      }
    }

  };

  NavbarEntryCollectionView.prototype.tagName = 'ul';

  NavbarEntryCollectionView.prototype.className = 'navbar-nav';

  NavbarEntryCollectionView.prototype.childViewEvents = {
    'click:entry': 'onChildviewClickEntry'
  };

  return NavbarEntryCollectionView;

}).call(this);

NavbarEntriesView = (function() {
  class NavbarEntriesView extends Marionette.View {
    onRender() {
      var view;
      view = new NavbarEntryCollectionView({
        collection: this.collection
      });
      this.showChildView('list', view);
    }

    setAllInactive() {
      var view;
      view = this.getChildView('list');
      view.setAllInactive();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cmllcy5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvZW50cmllcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGlCQUFBLEVBQUEseUJBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFVBQVUsQ0FBQyxLQUF2QztJQUlFLGVBQWlCLENBQUEsQ0FBQTtBQUNmLFVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtNQUNOLE9BQUEsR0FDRTtRQUFBLEdBQUEsRUFBSyxHQUFMO1FBQ0EsV0FBQSxFQUFhLEdBQUcsQ0FBQyxRQUFKLENBQWEsYUFBYjtNQURiO0FBRUYsYUFBTztJQUxROztJQVVqQixVQUFZLENBQUEsQ0FBQTtNQUNWLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQ7SUFEVTs7SUFHWixZQUFjLENBQUEsQ0FBQTtNQUNaLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtJQURZOztFQWpCaEI7OzBCQUNFLEtBQUEsR0FBTzs7MEJBQ1AsT0FBQSxHQUFTOzswQkFDVCxTQUFBLEdBQVc7OzBCQU9YLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzswQkFDRixRQUFBLEdBQ0U7SUFBQSxpQkFBQSxFQUFtQjtFQUFuQjs7Ozs7O0FBUUU7RUFBTixNQUFB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QUFjLE1BQWQ7TUFDUCxJQUFJLENBQUMsY0FBTCxDQUFBO0lBRmM7O0VBZGxCOzs4QkFDRSxFQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU07RUFBTjs7OEJBQ0YsT0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFVBQU47SUFDQSxRQUFBLEVBQVUsWUFEVjtJQUVBLE1BQUEsRUFBUTtFQUZSOzs4QkFRRixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8seUJBQVA7RUFEc0IsQ0FBZDs7Ozs7O0FBUVosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJFbnRyeSBmcm9tICcuL2VudHJ5LW1vZGVsJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIEJhc2VFbnRyeVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgbW9kZWw6IE5hdmJhckVudHJ5XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0nXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgY29udGV4dCA9XG4gICAgICBhcHA6IGFwcFxuICAgICAgY3VycmVudFVzZXI6IGFwcC5nZXRTdGF0ZSAnY3VycmVudFVzZXInXG4gICAgcmV0dXJuIGNvbnRleHRcbiAgdWk6XG4gICAgZW50cnk6ICcubmF2YmFyLWVudHJ5J1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmVudHJ5JzogJ2NsaWNrOmVudHJ5J1xuICBzZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICByZXR1cm5cbiAgdW5zZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICByZXR1cm5cbiAgICBcbmNsYXNzIFNpbmdsZUVudHJ5VmlldyBleHRlbmRzIEJhc2VFbnRyeVZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICAgIHRjLmEgJy5uYXZiYXItZW50cnkubmF2LWxpbmsnLCBocmVmOmVudHJ5LnVybCwgLT5cbiAgICAgIGlmIGVudHJ5Lmljb25cbiAgICAgICAgdGMuaSBlbnRyeS5pY29uXG4gICAgICAgIHRjLnRleHQgXCIgXCJcbiAgICAgIHRjLnRleHQgZW50cnkubGFiZWxcblxuY2xhc3MgRHJvcGRvd25FbnRyeVZpZXcgZXh0ZW5kcyBCYXNlRW50cnlWaWV3XG4gIGNsYXNzTmFtZTogJ25hdi1pdGVtIGRyb3Bkb3duJ1xuICB1aTogLT5cbiAgICB0b2dnbGVCdXR0b246ICcuZHJvcGRvd24tdG9nZ2xlJ1xuICAgIGVudHJ5OiAnLm5hdmJhci1lbnRyeSdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICAgIHRjLmEgJy5uYXYtbGluay5kcm9wZG93bi10b2dnbGUnLFxuICAgIHJvbGU6J2J1dHRvbicsICdkYXRhLXRvZ2dsZSc6J2Ryb3Bkb3duJywgLT5cbiAgICAgIHRjLnRleHQgZW50cnkubGFiZWxcbiAgICAgIHRjLmIgJy5jYXJldCdcbiAgICB0Yy51bCAnLmRyb3Bkb3duLW1lbnUnLCAtPlxuICAgICAgZm9yIGxpbmsgaW4gZW50cnkubWVudVxuICAgICAgICBpZiBsaW5rPy5uZWVkVXNlciBhbmQgbm90IGVudHJ5LmN1cnJlbnRVc2VyXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICB0Yy5hICcubmF2YmFyLWVudHJ5Lm5hdi1saW5rLmRyb3Bkb3duLWl0ZW0nLCBocmVmOmxpbmsudXJsLCAtPlxuICAgICAgICAgICAgaWYgbGluay5pY29uXG4gICAgICAgICAgICAgIHRjLmkgbGluay5pY29uXG4gICAgICAgICAgICAgIHRjLnRleHQgXCIgXCJcbiAgICAgICAgICAgIHRjLnRleHQgbGluay5sYWJlbFxuXG5jbGFzcyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ25hdmJhci1uYXYnXG4gIFxuICBjaGlsZFZpZXc6IChpdGVtKSAtPlxuICAgIGlmIGl0ZW0uaGFzKCdtZW51JykgYW5kIGl0ZW0uZ2V0KCdtZW51JylcbiAgICAgIERyb3Bkb3duRW50cnlWaWV3XG4gICAgZWxzZVxuICAgICAgU2luZ2xlRW50cnlWaWV3XG4gICAgICBcbiAgc2V0QWxsSW5hY3RpdmU6IC0+XG4gICAgQGNoaWxkcmVuLmVhY2ggKHZpZXcpIC0+XG4gICAgICB2aWV3LnVuc2V0X2FjdGl2ZSgpXG4gICAgcmV0dXJuXG5cbiAgY2hpbGRWaWV3RXZlbnRzOlxuICAgICdjbGljazplbnRyeSc6ICdvbkNoaWxkdmlld0NsaWNrRW50cnknXG5cbiAgIyBvbkNoaWxkdmlld0NsaWNrRW50cnkgd2lsbCBub3QgYmUgY2FsbGVkXG4gICMgd2l0aG91dCBzZXR0aW5nIEBjaGlsZFZpZXdFdmVudHNcbiAgb25DaGlsZHZpZXdDbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIEBzZXRBbGxJbmFjdGl2ZSgpXG4gICAgY3ZpZXcuc2V0X2FjdGl2ZSgpXG4gICAgQG5hdmlnYXRlT25DbGlja0VudHJ5IGN2aWV3LCBldmVudFxuICAgIHJldHVyblxuICAgIFxuICBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgaWYgY3ZpZXcuJGVsLmhhc0NsYXNzIFwic2hvd1wiXG4gICAgICAjY3ZpZXcuJGVsLmRyb3Bkb3duKCd0b2dnbGUnKVxuICAgICAgY3ZpZXcudWkudG9nZ2xlQnV0dG9uLmNsaWNrKClcbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICAjIGNoZWNrIGlmIGljb24gaXMgY2xpY2tlZFxuICAgIGlmIHRhcmdldC50YWdOYW1lIGlzIFwiSVwiXG4gICAgICAjY29uc29sZS53YXJuIFwiY2xpY2tlZCBpY29uXCJcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KS5wYXJlbnQoKVxuICAgIGVsc2VcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KVxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gYW5jaG9yLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgIHJldHVyblxuICAgIFxuY2xhc3MgTmF2YmFyRW50cmllc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdWk6XG4gICAgbGlzdDogJy5uYXZiYXItZW50cmllcydcbiAgcmVnaW9uczpcbiAgICBsaXN0OiAnQHVpLmxpc3QnXG4gICAgdXNlck1lbnU6ICcjdXNlci1tZW51J1xuICAgIHNlYXJjaDogJyNmb3JtLXNlYXJjaC1jb250YWluZXInXG4gIG9uUmVuZGVyOiAtPlxuICAgIHZpZXcgPSBuZXcgTmF2YmFyRW50cnlDb2xsZWN0aW9uVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICBAc2hvd0NoaWxkVmlldyAnbGlzdCcsIHZpZXdcbiAgICByZXR1cm5cbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1lbnRyaWVzLm1yLWF1dG8nXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIHZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdsaXN0J1xuICAgIHZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIHJldHVyblxuICAgXG4gICAgXG5leHBvcnQgZGVmYXVsdCBOYXZiYXJFbnRyaWVzVmlld1xuXG5cblxuIl19
