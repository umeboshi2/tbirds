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

import {
  RouterLink
} from 'marionette.routing';

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

    entryClicked(event) {
      return console.log("model", this.model);
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

  BaseEntryView.prototype.events = {
    'click @ui.entry': 'entryClicked'
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

  DropdownEntryView.prototype.behaviors = [RouterLink];

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
          var aclass, options;
          aclass = '.navbar-entry.nav-link.dropdown-item';
          options = {
            route: link.url,
            data: {
              route: link.url
            }
          };
          return tc.a(aclass, options, function() {
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
      var route, router;
      this.setAllInactive();
      cview.set_active();
      route = $(event.target).attr('data-route');
      router = MainChannel.request('main:app:router');
      router.transitionTo(route);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXItbmV4dC9lbnRyaWVzLmpzIiwic291cmNlcyI6WyJ0a25hdmJhci1uZXh0L2VudHJpZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsYUFBQSxFQUFBLGlCQUFBLEVBQUEsV0FBQSxFQUFBLGlCQUFBLEVBQUEseUJBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixPQUFBLGFBQWhCO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtFQUFlLGNBQWY7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkOztBQUVSO0VBQU4sTUFBQSxjQUFBLFFBQTRCLEtBQTVCO0lBSUUsZUFBaUIsQ0FBQSxDQUFBO2FBQ2Y7UUFBQSxHQUFBLEVBQUssV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCLENBQUw7UUFDQSxXQUFBLEVBQWEsV0FBVyxDQUFDLE9BQVosQ0FBb0Isc0JBQXBCO01BRGI7SUFEZTs7SUFTakIsVUFBWSxDQUFBLENBQUE7TUFDVixJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxRQUFkO0lBRFU7O0lBR1osWUFBYyxDQUFBLENBQUE7TUFDWixJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsUUFBakI7SUFEWTs7SUFHZCxZQUFjLENBQUMsS0FBRCxDQUFBO2FBQ1osT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLElBQUMsQ0FBQSxLQUF0QjtJQURZOztFQW5CaEI7OzBCQUNFLEtBQUEsR0FBTzs7MEJBQ1AsT0FBQSxHQUFTOzswQkFDVCxTQUFBLEdBQVc7OzBCQUlYLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzswQkFDRixRQUFBLEdBQ0U7SUFBQSxpQkFB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b20gJ2pxdWVyeSdcbmltcG9ydCB7IFJhZGlvLCBoaXN0b3J5IGFzIEJCaGlzdG9yeSB9IGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldywgQ29sbGVjdGlvblZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHsgUm91dGVyTGluayB9IGZyb20gJ21hcmlvbmV0dGUucm91dGluZydcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBOYXZiYXJFbnRyeSBmcm9tICcuL2VudHJ5LW1vZGVsJ1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgQmFzZUVudHJ5VmlldyBleHRlbmRzIFZpZXdcbiAgbW9kZWw6IE5hdmJhckVudHJ5XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0nXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBhcHA6IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgICBjdXJyZW50VXNlcjogTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y3VycmVudFVzZXInXG4gIHVpOlxuICAgIGVudHJ5OiAnLm5hdmJhci1lbnRyeSdcbiAgdHJpZ2dlcnM6XG4gICAgJ2NsaWNrIEB1aS5lbnRyeSc6ICdjbGljazplbnRyeSdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuZW50cnknOiAnZW50cnlDbGlja2VkJ1xuICBzZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICByZXR1cm5cbiAgdW5zZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICByZXR1cm5cbiAgZW50cnlDbGlja2VkOiAoZXZlbnQpIC0+XG4gICAgY29uc29sZS5sb2cgXCJtb2RlbFwiLCBAbW9kZWxcbiAgICBcbiAgICBcbmNsYXNzIFNpbmdsZUVudHJ5VmlldyBleHRlbmRzIEJhc2VFbnRyeVZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICAgIHRjLmEgJy5uYXZiYXItZW50cnkubmF2LWxpbmsnLCBocmVmOmVudHJ5LnVybCwgLT5cbiAgICAgIGlmIGVudHJ5Lmljb25cbiAgICAgICAgdGMuaSBlbnRyeS5pY29uXG4gICAgICAgIHRjLnRleHQgXCIgXCJcbiAgICAgIHRjLnRleHQgZW50cnkubGFiZWxcblxuY2xhc3MgRHJvcGRvd25FbnRyeVZpZXcgZXh0ZW5kcyBCYXNlRW50cnlWaWV3XG4gIGJlaGF2aW9yczogW1JvdXRlckxpbmtdXG4gIGNsYXNzTmFtZTogJ25hdi1pdGVtIGRyb3Bkb3duJ1xuICB1aTogLT5cbiAgICB0b2dnbGVCdXR0b246ICcuZHJvcGRvd24tdG9nZ2xlJ1xuICAgIGVudHJ5OiAnLm5hdmJhci1lbnRyeSdcbiAgbW9kZWxFdmVudHM6XG4gICAgY2hhbmdlOiAncmVuZGVyJ1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gICAgdGMuYSAnLm5hdi1saW5rLmRyb3Bkb3duLXRvZ2dsZScsXG4gICAgcm9sZTonYnV0dG9uJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgdGMudGV4dCBlbnRyeS5sYWJlbFxuICAgICAgdGMuYiAnLmNhcmV0J1xuICAgIHRjLnVsICcuZHJvcGRvd24tbWVudScsIC0+XG4gICAgICBmb3IgbGluayBpbiBlbnRyeS5tZW51XG4gICAgICAgIGlmIGxpbms/Lm5lZWRVc2VyIGFuZCBlbnRyeS5jdXJyZW50VXNlci5nZXQoJ2lzR3Vlc3QnKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIHRjLmxpIC0+XG4gICAgICAgICAgYWNsYXNzID0gJy5uYXZiYXItZW50cnkubmF2LWxpbmsuZHJvcGRvd24taXRlbSdcbiAgICAgICAgICBvcHRpb25zID0gcm91dGU6bGluay51cmwsIGRhdGE6cm91dGU6bGluay51cmxcbiAgICAgICAgICB0Yy5hIGFjbGFzcywgb3B0aW9ucywgLT5cbiAgICAgICAgICAgIGlmIGxpbmsuaWNvblxuICAgICAgICAgICAgICB0Yy5pIGxpbmsuaWNvblxuICAgICAgICAgICAgICB0Yy50ZXh0IFwiIFwiXG4gICAgICAgICAgICB0Yy50ZXh0IGxpbmsubGFiZWxcblxuY2xhc3MgTmF2YmFyRW50cnlDb2xsZWN0aW9uVmlldyBleHRlbmRzIENvbGxlY3Rpb25WaWV3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAnbmF2YmFyLW5hdidcbiAgXG4gIGNoaWxkVmlldzogKGl0ZW0pIC0+XG4gICAgaWYgaXRlbS5oYXMoJ21lbnUnKSBhbmQgaXRlbS5nZXQoJ21lbnUnKVxuICAgICAgRHJvcGRvd25FbnRyeVZpZXdcbiAgICBlbHNlXG4gICAgICBTaW5nbGVFbnRyeVZpZXdcbiAgICAgIFxuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICBAY2hpbGRyZW4uZWFjaCAodmlldykgLT5cbiAgICAgIHZpZXcudW5zZXRfYWN0aXZlKClcbiAgICByZXR1cm5cblxuICBjaGlsZFZpZXdFdmVudHM6XG4gICAgJ2NsaWNrOmVudHJ5JzogJ29uQ2hpbGR2aWV3Q2xpY2tFbnRyeSdcblxuICAjIG9uQ2hpbGR2aWV3Q2xpY2tFbnRyeSB3aWxsIG5vdCBiZSBjYWxsZWRcbiAgIyB3aXRob3V0IHNldHRpbmcgQGNoaWxkVmlld0V2ZW50c1xuICBvbkNoaWxkdmlld0NsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgQHNldEFsbEluYWN0aXZlKClcbiAgICBjdmlldy5zZXRfYWN0aXZlKClcbiAgICByb3V0ZSA9ICQoZXZlbnQudGFyZ2V0KS5hdHRyKCdkYXRhLXJvdXRlJylcbiAgICByb3V0ZXIgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpyb3V0ZXInXG4gICAgcm91dGVyLnRyYW5zaXRpb25Ubyhyb3V0ZSlcbiAgICByZXR1cm5cblxuY2xhc3MgTmF2YmFyRW50cmllc1ZpZXcgZXh0ZW5kcyBWaWV3XG4gIHVpOlxuICAgIGxpc3Q6ICcubmF2YmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgbGlzdDogJ0B1aS5saXN0J1xuICAgIHVzZXJNZW51OiAnI3VzZXItbWVudSdcbiAgICBzZWFyY2g6ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ2xpc3QnLCB2aWV3XG4gICAgcmV0dXJuXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuZGl2ICcubmF2YmFyLWVudHJpZXMubXItYXV0bydcbiAgc2V0QWxsSW5hY3RpdmU6IC0+XG4gICAgdmlldyA9IEBnZXRDaGlsZFZpZXcgJ2xpc3QnXG4gICAgdmlldy5zZXRBbGxJbmFjdGl2ZSgpXG4gICAgcmV0dXJuXG4gICBcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE5hdmJhckVudHJpZXNWaWV3XG5cblxuXG4iXX0=
