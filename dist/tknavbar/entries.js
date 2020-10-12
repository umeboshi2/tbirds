var BaseEntryView, DropdownEntryView, MainChannel, NavbarEntriesView, NavbarEntryCollectionView, SingleEntryView;

import $ from 'jquery';

import {
  Radio
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

  NavbarEntriesView.prototype.template = tc.renderable(function() {
    return tc.div('.navbar-entries.mr-auto');
  });

  return NavbarEntriesView;

}).call(this);

export default NavbarEntriesView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cmllcy5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvZW50cmllcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsaUJBQUEsRUFBQSx5QkFBQSxFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtFQUFlLGNBQWY7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBRVI7RUFBTixNQUFBLGNBQUEsUUFBNEIsS0FBNUI7SUFJRSxlQUFpQixDQUFBLENBQUE7YUFDZjtRQUFBLEdBQUEsRUFBSyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEIsQ0FBTDtRQUNBLFdBQUEsRUFBYSxXQUFXLENBQUMsT0FBWixDQUFvQixzQkFBcEI7TUFEYjtJQURlOztJQU9qQixVQUFZLENBQUEsQ0FBQTtNQUNWLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQ7SUFEVTs7SUFHWixZQUFjLENBQUEsQ0FBQTtNQUNaLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtJQURZOztFQWRoQjs7MEJBQ0UsS0FBQSxHQUFPOzswQkFDUCxPQUFBLEdBQVM7OzBCQUNULFNBQUEsR0FBVzs7MEJBSVgsRUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPO0VBQVA7OzBCQUNGLFFBQUEsR0FDRTtJQUFBLGlCQUFBLEVBQW1CO0VBQW5COzs7Ozs7QUFRRTtFQUFOLE1BQUEsZ0JBQUEsUUFBOEIsY0FBOUIsQ0FBQTs7NEJBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsQ0FBSCxDQUFLLHdC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QUFBLEVBQU07RUFBTjs7OEJBQ0YsT0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFVBQU47SUFDQSxRQUFBLEVBQVUsWUFEVjtJQUVBLE1BQUEsRUFBUTtFQUZSOzs4QkFRRixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLHlCQUFQO0VBRHNCLENBQWQ7Ozs7OztBQVFaLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3LCBDb2xsZWN0aW9uVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTmF2YmFyRW50cnkgZnJvbSAnLi9lbnRyeS1tb2RlbCdcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIEJhc2VFbnRyeVZpZXcgZXh0ZW5kcyBWaWV3XG4gIG1vZGVsOiBOYXZiYXJFbnRyeVxuICB0YWdOYW1lOiAnbGknXG4gIGNsYXNzTmFtZTogJ25hdi1pdGVtJ1xuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgYXBwOiBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gICAgY3VycmVudFVzZXI6IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmN1cnJlbnRVc2VyJ1xuICB1aTpcbiAgICBlbnRyeTogJy5uYXZiYXItZW50cnknXG4gIHRyaWdnZXJzOlxuICAgICdjbGljayBAdWkuZW50cnknOiAnY2xpY2s6ZW50cnknXG4gIHNldF9hY3RpdmU6IC0+XG4gICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgIHJldHVyblxuICB1bnNldF9hY3RpdmU6IC0+XG4gICAgQCRlbC5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIHJldHVyblxuICAgIFxuY2xhc3MgU2luZ2xlRW50cnlWaWV3IGV4dGVuZHMgQmFzZUVudHJ5Vmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoZW50cnkpIC0+XG4gICAgdGMuYSAnLm5hdmJhci1lbnRyeS5uYXYtbGluaycsIGhyZWY6ZW50cnkudXJsLCAtPlxuICAgICAgaWYgZW50cnkuaWNvblxuICAgICAgICB0Yy5pIGVudHJ5Lmljb25cbiAgICAgICAgdGMudGV4dCBcIiBcIlxuICAgICAgdGMudGV4dCBlbnRyeS5sYWJlbFxuXG5jbGFzcyBEcm9wZG93bkVudHJ5VmlldyBleHRlbmRzIEJhc2VFbnRyeVZpZXdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0gZHJvcGRvd24nXG4gIHVpOiAtPlxuICAgIHRvZ2dsZUJ1dHRvbjogJy5kcm9wZG93bi10b2dnbGUnXG4gICAgZW50cnk6ICcubmF2YmFyLWVudHJ5J1xuICBtb2RlbEV2ZW50czpcbiAgICBjaGFuZ2U6ICdyZW5kZXInXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChlbnRyeSkgLT5cbiAgICB0Yy5hICcubmF2LWxpbmsuZHJvcGRvd24tdG9nZ2xlJyxcbiAgICByb2xlOididXR0b24nLCAnZGF0YS10b2dnbGUnOidkcm9wZG93bicsIC0+XG4gICAgICB0Yy50ZXh0IGVudHJ5LmxhYmVsXG4gICAgICB0Yy5iICcuY2FyZXQnXG4gICAgdGMudWwgJy5kcm9wZG93bi1tZW51JywgLT5cbiAgICAgIGZvciBsaW5rIGluIGVudHJ5Lm1lbnVcbiAgICAgICAgaWYgbGluaz8ubmVlZFVzZXIgYW5kIGVudHJ5LmN1cnJlbnRVc2VyLmdldCgnaXNHdWVzdCcpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICB0Yy5hICcubmF2YmFyLWVudHJ5Lm5hdi1saW5rLmRyb3Bkb3duLWl0ZW0nLCBocmVmOmxpbmsudXJsLCAtPlxuICAgICAgICAgICAgaWYgbGluay5pY29uXG4gICAgICAgICAgICAgIHRjLmkgbGluay5pY29uXG4gICAgICAgICAgICAgIHRjLnRleHQgXCIgXCJcbiAgICAgICAgICAgIHRjLnRleHQgbGluay5sYWJlbFxuXG5jbGFzcyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICduYXZiYXItbmF2J1xuICBcbiAgY2hpbGRWaWV3OiAoaXRlbSkgLT5cbiAgICBpZiBpdGVtLmhhcygnbWVudScpIGFuZCBpdGVtLmdldCgnbWVudScpXG4gICAgICBEcm9wZG93bkVudHJ5Vmlld1xuICAgIGVsc2VcbiAgICAgIFNpbmdsZUVudHJ5Vmlld1xuICAgICAgXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIEBjaGlsZHJlbi5lYWNoICh2aWV3KSAtPlxuICAgICAgdmlldy51bnNldF9hY3RpdmUoKVxuICAgIHJldHVyblxuXG4gIGNoaWxkVmlld0V2ZW50czpcbiAgICAnY2xpY2s6ZW50cnknOiAnb25DaGlsZHZpZXdDbGlja0VudHJ5J1xuXG4gICMgb25DaGlsZHZpZXdDbGlja0VudHJ5IHdpbGwgbm90IGJlIGNhbGxlZFxuICAjIHdpdGhvdXQgc2V0dGluZyBAY2hpbGRWaWV3RXZlbnRzXG4gIG9uQ2hpbGR2aWV3Q2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICBAc2V0QWxsSW5hY3RpdmUoKVxuICAgIGN2aWV3LnNldF9hY3RpdmUoKVxuICAgIEBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeSBjdmlldywgZXZlbnRcbiAgICByZXR1cm5cbiAgICBcbiAgbmF2aWdhdGVPbkNsaWNrRW50cnk6IChjdmlldywgZXZlbnQpIC0+XG4gICAgIyBGSVhNRSB0cmlnZ2VyaW5nIGNsaWNrOmVudHJ5XG4gICAgIyBzZWVtcyB0byBsZWF2ZSBkcm9wZG93biBvcGVuXG4gICAgIyB0aGlzIGNsb3NlcyB0aGUgbmF2YmFyIG1lbnVcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGlmIGN2aWV3LiRlbC5oYXNDbGFzcyBcInNob3dcIlxuICAgICAgI2N2aWV3LiRlbC5kcm9wZG93bigndG9nZ2xlJylcbiAgICAgIGN2aWV3LnVpLnRvZ2dsZUJ1dHRvbi5jbGljaygpXG4gICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgIyBjaGVjayBpZiBpY29uIGlzIGNsaWNrZWRcbiAgICBpZiB0YXJnZXQudGFnTmFtZSBpcyBcIklcIlxuICAgICAgI2NvbnNvbGUud2FybiBcImNsaWNrZWQgaWNvblwiXG4gICAgICBhbmNob3IgPSAkKHRhcmdldCkucGFyZW50KClcbiAgICBlbHNlXG4gICAgICBhbmNob3IgPSAkKHRhcmdldClcbiAgICAjIGxvb2sgYXQgaHJlZiBhbmQgZ28gdGhlcmUgbWF5YmU/XG4gICAgaHJlZiA9IGFuY2hvci5hdHRyICdocmVmJ1xuICAgIGlmIGhyZWYuc3BsaXQoJy8nKVswXSA9PSAnJ1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gaHJlZlxuICAgIGVsc2VcbiAgICAgIHJvdXRlciA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tcm91dGVyJ1xuICAgICAgcm91dGVyLm5hdmlnYXRlIGhyZWYsIHRyaWdnZXI6IHRydWVcbiAgICByZXR1cm5cbiAgICBcbmNsYXNzIE5hdmJhckVudHJpZXNWaWV3IGV4dGVuZHMgVmlld1xuICB1aTpcbiAgICBsaXN0OiAnLm5hdmJhci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGxpc3Q6ICdAdWkubGlzdCdcbiAgICB1c2VyTWVudTogJyN1c2VyLW1lbnUnXG4gICAgc2VhcmNoOiAnI2Zvcm0tc2VhcmNoLWNvbnRhaW5lcidcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93Q2hpbGRWaWV3ICdsaXN0Jywgdmlld1xuICAgIHJldHVyblxuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1lbnRyaWVzLm1yLWF1dG8nXG4gIHNldEFsbEluYWN0aXZlOiAtPlxuICAgIHZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdsaXN0J1xuICAgIHZpZXcuc2V0QWxsSW5hY3RpdmUoKVxuICAgIHJldHVyblxuICAgXG4gICAgXG5leHBvcnQgZGVmYXVsdCBOYXZiYXJFbnRyaWVzVmlld1xuXG5cblxuIl19
