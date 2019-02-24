var BaseEntryView, DropdownEntryView, MainChannel, MessageChannel, NavbarEntriesView, NavbarEntryCollectionView, SingleEntryView;

import $ from 'jquery';

import Backbone from 'backbone';

import {
  View,
  CollectionView
} from 'backbone.marionette';

import tc from 'teacup';

import NavbarEntry from './entry-model';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

BaseEntryView = (function() {
  class BaseEntryView extends View {
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

  NavbarEntriesView.prototype.template = tc.renderable(function(model) {
    return tc.div('.navbar-entries.mr-auto');
  });

  return NavbarEntriesView;

}).call(this);

export default NavbarEntriesView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cmllcy5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvZW50cmllcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGlCQUFBLEVBQUEseUJBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtFQUFlLGNBQWY7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRVg7RUFBTixNQUFBLGNBQUEsUUFBNEIsS0FBNUI7SUFJRSxlQUFpQixDQUFBLENBQUE7QUFDZixVQUFBLEdBQUEsRUFBQTtNQUFBLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7TUFDTixPQUFBLEdBQ0U7UUFBQSxHQUFBLEVBQUssR0FBTDtRQUNBLFdBQUEsRUFBYSxHQUFHLENBQUMsUUFBSixDQUFhLGFBQWI7TUFEYjtBQUVGLGFBQU87SUFMUTs7SUFVakIsVUFBWSxDQUFBLENBQUE7TUFDVixJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxRQUFkO0lBRFU7O0lBR1osWUFBYyxDQUFBLENBQUE7TUFDWixJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsUUFBakI7SUFEWTs7RUFqQmhCOzswQkFDRSxLQUFBLEdBQU87OzBCQUNQLE9BQUEsR0FBUzs7MEJBQ1QsU0FBQSxHQUFXOzswQkFPWCxFQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7MEJBQ0YsUUFBQSxHQUNFO0lBQUEsaUJBQUEsRUFBbUI7RUFBbkI7Ozs7OztBQVFF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QUNQLElBQUksQ0FBQyxjQUFMLENBQUE7SUFGYzs7RUFkbEI7OzhCQUNFLEVBQUEsR0FDRTtJQUFBLElBQUEsRUFBTTtFQUFOOzs4QkFDRixPQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sVUFBTjtJQUNBLFFBQUEsRUFBVSxZQURWO0lBRUEsTUFBQSxFQUFRO0VBRlI7OzhCQVFGLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyx5QkFBUDtFQURzQixDQUFkOzs7Ozs7QUFRWixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3LCBDb2xsZWN0aW9uVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTmF2YmFyRW50cnkgZnJvbSAnLi9lbnRyeS1tb2RlbCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBCYXNlRW50cnlWaWV3IGV4dGVuZHMgVmlld1xuICBtb2RlbDogTmF2YmFyRW50cnlcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICduYXYtaXRlbSdcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIGFwcCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgICBjb250ZXh0ID1cbiAgICAgIGFwcDogYXBwXG4gICAgICBjdXJyZW50VXNlcjogYXBwLmdldFN0YXRlICdjdXJyZW50VXNlcidcbiAgICByZXR1cm4gY29udGV4dFxuICB1aTpcbiAgICBlbnRyeTogJy5uYXZiYXItZW50cnknXG4gIHRyaWdnZXJzOlxuICAgICdjbGljayBAdWkuZW50cnknOiAnY2xpY2s6ZW50cnknXG4gIHNldF9hY3RpdmU6IC0+XG4gICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgIHJldHVyblxuICB1bnNldF9hY3RpdmU6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIHJldHVyblxuICAgIFxuY2xhc3MgU2luZ2xlRW50cnlWaWV3IGV4dGVuZHMgQmFzZUVudHJ5Vmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gICAgdGMuYSAnLm5hdmJhci1lbnRyeS5uYXYtbGluaycsIGhyZWY6ZW50cnkudXJsLCAtPlxuICAgICAgaWYgZW50cnkuaWNvblxuICAgICAgICB0Yy5pIGVudHJ5Lmljb25cbiAgICAgICAgdGMudGV4dCBcIiBcIlxuICAgICAgdGMudGV4dCBlbnRyeS5sYWJlbFxuXG5jbGFzcyBEcm9wZG93bkVudHJ5VmlldyBleHRlbmRzIEJhc2VFbnRyeVZpZXdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0gZHJvcGRvd24nXG4gIHVpOiAtPlxuICAgIHRvZ2dsZUJ1dHRvbjogJy5kcm9wZG93bi10b2dnbGUnXG4gICAgZW50cnk6ICcubmF2YmFyLWVudHJ5J1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gICAgdGMuYSAnLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZScsXG4gICAgcm9sZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgdGMudGV4dCBlbnRyeS5sYWJlbFxuICAgICAgdGMuYiAnLmNhcmV0J1xuICAgIHRjLnVsICcuZHJvcGRvd24tbWVudScsIC0+XG4gICAgICBmb3IgbGluayBpbiBlbnRyeS5tZW51XG4gICAgICAgIGlmIGxpbms/Lm5lZWRVc2VyIGFuZCBub3QgZW50cnkuY3VycmVudFVzZXJcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgIHRjLmEgJy5uYXZiYXItZW50cnkubmF2LWxpbmsuZHJvcGRvd24taXRlbScsIGhyZWY6bGluay51cmwsIC0+XG4gICAgICAgICAgICBpZiBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMuaSBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMudGV4dCBcIiBcIlxuICAgICAgICAgICAgdGMudGV4dCBsaW5rLmxhYmVsXG5cbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBDb2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ25hdmJhci1uYXYnXG4gIFxuICBjaGlsZFZpZXc6IChpdGVtKSAtPlxuICAgIGlmIGl0ZW0uaGFzKCdtZW51JykgYW5kIGl0ZW0uZ2V0KCdtZW51JylcbiAgICAgIERyb3Bkb3duRW50cnlWaWV3XG4gICAgZWxzZVxuICAgICAgU2luZ2xlRW50cnlWaWV3XG4gICAgICBcbiAgc2V0QWxsSW5hY3RpdmU6IC0+XG4gICAgQGNoaWxkcmVuLmVhY2ggKHZpZXcpIC0+XG4gICAgICB2aWV3LnVuc2V0X2FjdGl2ZSgpXG4gICAgcmV0dXJuXG5cbiAgY2hpbGRWaWV3RXZlbnRzOlxuICAgICdjbGljazplbnRyeSc6ICdvbkNoaWxkdmlld0NsaWNrRW50cnknXG5cbiAgIyBvbkNoaWxkdmlld0NsaWNrRW50cnkgd2lsbCBub3QgYmUgY2FsbGVkXG4gICMgd2l0aG91dCBzZXR0aW5nIEBjaGlsZFZpZXdFdmVudHNcbiAgb25DaGlsZHZpZXdDbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIEBzZXRBbGxJbmFjdGl2ZSgpXG4gICAgY3ZpZXcuc2V0X2FjdGl2ZSgpXG4gICAgQG5hdmlnYXRlT25DbGlja0VudHJ5IGN2aWV3LCBldmVudFxuICAgIHJldHVyblxuICAgIFxuICBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgaWYgY3ZpZXcuJGVsLmhhc0NsYXNzIFwic2hvd1wiXG4gICAgICAjY3ZpZXcuJGVsLmRyb3Bkb3duKCd0b2dnbGUnKVxuICAgICAgY3ZpZXcudWkudG9nZ2xlQnV0dG9uLmNsaWNrKClcbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICAjIGNoZWNrIGlmIGljb24gaXMgY2xpY2tlZFxuICAgIGlmIHRhcmdldC50YWdOYW1lIGlzIFwiSVwiXG4gICAgICAjY29uc29sZS53YXJuIFwiY2xpY2tlZCBpY29uXCJcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KS5wYXJlbnQoKVxuICAgIGVsc2VcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KVxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gYW5jaG9yLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgIHJldHVyblxuICAgIFxuY2xhc3MgTmF2YmFyRW50cmllc1ZpZXcgZXh0ZW5kcyBWaWV3XG4gIHVpOlxuICAgIGxpc3Q6ICcubmF2YmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgbGlzdDogJ0B1aS5saXN0J1xuICAgIHVzZXJNZW51OiAnI3VzZXItbWVudSdcbiAgICBzZWFyY2g6ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ2xpc3QnLCB2aWV3XG4gICAgcmV0dXJuXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItZW50cmllcy5tci1hdXRvJ1xuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICB2aWV3ID0gQGdldENoaWxkVmlldyAnbGlzdCdcbiAgICB2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICByZXR1cm5cbiAgIFxuICAgIFxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyRW50cmllc1ZpZXdcblxuXG5cbiJdfQ==
