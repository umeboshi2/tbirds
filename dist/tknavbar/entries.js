var BaseEntryView, DropdownEntryView, MainChannel, NavbarEntriesView, NavbarEntryCollectionView, SingleEntryView;

import $ from 'jquery';

import {
  Radio,
  history as BBhistory
} from 'backbone';

import {
  View,
  CollectionView
} from 'backbone.marionette';

import tc from 'teacup';

import NavbarEntry from './entry-model';

MainChannel = Radio.channel('global');

BaseEntryView = (function() {
  class BaseEntryView extends View {
    templateContext() {
      return {
        app: MainChannel.request('main:app:object'),
        currentUser: MainChannel.request('main:app:currentUser')
      };
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

  DropdownEntryView.prototype.modelEvents = {
    change: 'render'
  };

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
        if ((link != null ? link.needUser : void 0) && entry.currentUser.get('isGuest')) {
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
  class NavbarEntryCollectionView extends CollectionView {
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
      var anchor, href, target;
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
        BBhistory.navigate(href, {
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
  class NavbarEntriesView extends View {
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

  NavbarEntriesView.prototype.template = tc.renderable(function() {
    return tc.div('.navbar-entries.mr-auto');
  });

  return NavbarEntriesView;

}).call(this);

export default NavbarEntriesView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cmllcy5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvZW50cmllcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsaUJBQUEsRUFBQSx5QkFBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLE9BQUEsYUFBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0VBQWUsY0FBZjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxXQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFUjtFQUFOLE1BQUEsY0FBQSxRQUE0QixLQUE1QjtJQUlFLGVBQWlCLENBQUEsQ0FBQTthQUNmO1FBQUEsR0FBQSxFQUFLLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQixDQUFMO1FBQ0EsV0FBQSxFQUFhLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHNCQUFwQjtNQURiO0lBRGU7O0lBT2pCLFVBQVksQ0FBQSxDQUFBO01BQ1YsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsUUFBZDtJQURVOztJQUdaLFlBQWMsQ0FBQSxDQUFBO01BQ1osSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLENBQWlCLFFBQWpCO0lBRFk7O0VBZGhCOzswQkFDRSxLQUFBLEdBQU87OzBCQUNQLE9BQUEsR0FBUzs7MEJBQ1QsU0FBQSxHQUFXOzswQkFJWCxFQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7MEJBQ0YsUUFBQSxHQUNFO0lBQUEsaUJBQUEsRUFBbUI7RUFBbkI7Ozs7OztBQVFFO0VBQU4sTUFBQSxnQkFBQSxRQUE4QixjQUE5QixDQUFBOzs0QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ3RCLEVBQUUs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LElBQUEsRUFBTSxVQUFOO0lBQ0EsUUFBQSxFQUFVLFlBRFY7SUFFQSxNQUFBLEVBQVE7RUFGUjs7OEJBUUYsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyx5QkFBUDtFQURzQixDQUFkOzs7Ozs7QUFRWixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgeyBSYWRpbywgaGlzdG9yeSBhcyBCQmhpc3RvcnkgfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcsIENvbGxlY3Rpb25WaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJFbnRyeSBmcm9tICcuL2VudHJ5LW1vZGVsJ1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgQmFzZUVudHJ5VmlldyBleHRlbmRzIFZpZXdcbiAgbW9kZWw6IE5hdmJhckVudHJ5XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0nXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBhcHA6IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgICBjdXJyZW50VXNlcjogTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y3VycmVudFVzZXInXG4gIHVpOlxuICAgIGVudHJ5OiAnLm5hdmJhci1lbnRyeSdcbiAgdHJpZ2dlcnM6XG4gICAgJ2NsaWNrIEB1aS5lbnRyeSc6ICdjbGljazplbnRyeSdcbiAgc2V0X2FjdGl2ZTogLT5cbiAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnXG4gICAgcmV0dXJuXG4gIHVuc2V0X2FjdGl2ZTogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgcmV0dXJuXG4gICAgXG5jbGFzcyBTaW5nbGVFbnRyeVZpZXcgZXh0ZW5kcyBCYXNlRW50cnlWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChlbnRyeSkgLT5cbiAgICB0Yy5hICcubmF2YmFyLWVudHJ5Lm5hdi1saW5rJywgaHJlZjplbnRyeS51cmwsIC0+XG4gICAgICBpZiBlbnRyeS5pY29uXG4gICAgICAgIHRjLmkgZW50cnkuaWNvblxuICAgICAgICB0Yy50ZXh0IFwiIFwiXG4gICAgICB0Yy50ZXh0IGVudHJ5LmxhYmVsXG5cbmNsYXNzIERyb3Bkb3duRW50cnlWaWV3IGV4dGVuZHMgQmFzZUVudHJ5Vmlld1xuICBjbGFzc05hbWU6ICduYXYtaXRlbSBkcm9wZG93bidcbiAgdWk6IC0+XG4gICAgdG9nZ2xlQnV0dG9uOiAnLmRyb3Bkb3duLXRvZ2dsZSdcbiAgICBlbnRyeTogJy5uYXZiYXItZW50cnknXG4gIG1vZGVsRXZlbnRzOlxuICAgIGNoYW5nZTogJ3JlbmRlcidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICAgIHRjLmEgJy5uYXYtbGluay5kcm9wZG93bi10b2dnbGUnLFxuICAgIHJvbGU6J2J1dHRvbicsICdkYXRhLXRvZ2dsZSc6J2Ryb3Bkb3duJywgLT5cbiAgICAgIHRjLnRleHQgZW50cnkubGFiZWxcbiAgICAgIHRjLmIgJy5jYXJldCdcbiAgICB0Yy51bCAnLmRyb3Bkb3duLW1lbnUnLCAtPlxuICAgICAgZm9yIGxpbmsgaW4gZW50cnkubWVudVxuICAgICAgICBpZiBsaW5rPy5uZWVkVXNlciBhbmQgZW50cnkuY3VycmVudFVzZXIuZ2V0KCdpc0d1ZXN0JylcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgIHRjLmEgJy5uYXZiYXItZW50cnkubmF2LWxpbmsuZHJvcGRvd24taXRlbScsIGhyZWY6bGluay51cmwsIC0+XG4gICAgICAgICAgICBpZiBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMuaSBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMudGV4dCBcIiBcIlxuICAgICAgICAgICAgdGMudGV4dCBsaW5rLmxhYmVsXG5cbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBDb2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ25hdmJhci1uYXYnXG4gIFxuICBjaGlsZFZpZXc6IChpdGVtKSAtPlxuICAgIGlmIGl0ZW0uaGFzKCdtZW51JykgYW5kIGl0ZW0uZ2V0KCdtZW51JylcbiAgICAgIERyb3Bkb3duRW50cnlWaWV3XG4gICAgZWxzZVxuICAgICAgU2luZ2xlRW50cnlWaWV3XG4gICAgICBcbiAgc2V0QWxsSW5hY3RpdmU6IC0+XG4gICAgQGNoaWxkcmVuLmVhY2ggKHZpZXcpIC0+XG4gICAgICB2aWV3LnVuc2V0X2FjdGl2ZSgpXG4gICAgcmV0dXJuXG5cbiAgY2hpbGRWaWV3RXZlbnRzOlxuICAgICdjbGljazplbnRyeSc6ICdvbkNoaWxkdmlld0NsaWNrRW50cnknXG5cbiAgIyBvbkNoaWxkdmlld0NsaWNrRW50cnkgd2lsbCBub3QgYmUgY2FsbGVkXG4gICMgd2l0aG91dCBzZXR0aW5nIEBjaGlsZFZpZXdFdmVudHNcbiAgb25DaGlsZHZpZXdDbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIEBzZXRBbGxJbmFjdGl2ZSgpXG4gICAgY3ZpZXcuc2V0X2FjdGl2ZSgpXG4gICAgQG5hdmlnYXRlT25DbGlja0VudHJ5IGN2aWV3LCBldmVudFxuICAgIHJldHVyblxuICAgIFxuICBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgaWYgY3ZpZXcuJGVsLmhhc0NsYXNzIFwic2hvd1wiXG4gICAgICAjY3ZpZXcuJGVsLmRyb3Bkb3duKCd0b2dnbGUnKVxuICAgICAgY3ZpZXcudWkudG9nZ2xlQnV0dG9uLmNsaWNrKClcbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICAjIGNoZWNrIGlmIGljb24gaXMgY2xpY2tlZFxuICAgIGlmIHRhcmdldC50YWdOYW1lIGlzIFwiSVwiXG4gICAgICAjY29uc29sZS53YXJuIFwiY2xpY2tlZCBpY29uXCJcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KS5wYXJlbnQoKVxuICAgIGVsc2VcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KVxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gYW5jaG9yLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgQkJoaXN0b3J5Lm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICByZXR1cm5cbiAgICBcbmNsYXNzIE5hdmJhckVudHJpZXNWaWV3IGV4dGVuZHMgVmlld1xuICB1aTpcbiAgICBsaXN0OiAnLm5hdmJhci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGxpc3Q6ICdAdWkubGlzdCdcbiAgICB1c2VyTWVudTogJyN1c2VyLW1lbnUnXG4gICAgc2VhcmNoOiAnI2Zvcm0tc2VhcmNoLWNvbnRhaW5lcidcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93Q2hpbGRWaWV3ICdsaXN0Jywgdmlld1xuICAgIHJldHVyblxuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1lbnRyaWVzLm1yLWF1dG8nXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIHZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdsaXN0J1xuICAgIHZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIHJldHVyblxuICAgXG4gICAgXG5leHBvcnQgZGVmYXVsdCBOYXZiYXJFbnRyaWVzVmlld1xuXG5cblxuIl19
