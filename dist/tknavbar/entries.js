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

  NavbarEntriesView.prototype.template = tc.renderable(function(model) {
    return tc.div('.navbar-entries.mr-auto');
  });

  return NavbarEntriesView;

}).call(this);

export default NavbarEntriesView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cmllcy5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXIvZW50cmllcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsaUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLGlCQUFBLEVBQUEseUJBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtFQUFlLGNBQWY7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRVg7RUFBTixNQUFBLGNBQUEsUUFBNEIsS0FBNUI7SUFJRSxlQUFpQixDQUFBLENBQUE7YUFDZjtRQUFBLEdBQUEsRUFBSyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEIsQ0FBTDtRQUNBLFdBQUEsRUFBYSxXQUFXLENBQUMsT0FBWixDQUFvQixzQkFBcEI7TUFEYjtJQURlOztJQU9qQixVQUFZLENBQUEsQ0FBQTtNQUNWLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQ7SUFEVTs7SUFHWixZQUFjLENBQUEsQ0FBQTtNQUNaLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtJQURZOztFQWRoQjs7MEJBQ0UsS0FBQSxHQUFPOzswQkFDUCxPQUFBLEdBQVM7OzBCQUNULFNBQUEsR0FBVzs7MEJBSVgsRUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPO0VBQVA7OzBCQUNGLFFBQUEsR0FDRTtJQUFBLGlCQUFBLEVBQW1CO0VBQW5COzs7Ozs7QUFRRTtFQUFOLE1BQUEsZ0JBQUEsUUFBOEIsY0FBOUIsQ0FBQTs7NEJBQ0UsUUFBQSxHQUFVLEVB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LE1BQWQ7TUFDUCxJQUFJLENBQUMsY0FBTCxDQUFBO0lBRmM7O0VBZGxCOzs4QkFDRSxFQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU07RUFBTjs7OEJBQ0YsT0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFVBQU47SUFDQSxRQUFBLEVBQVUsWUFEVjtJQUVBLE1BQUEsRUFBUTtFQUZSOzs4QkFRRixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8seUJBQVA7RUFEc0IsQ0FBZDs7Ozs7O0FBUVosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldywgQ29sbGVjdGlvblZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE5hdmJhckVudHJ5IGZyb20gJy4vZW50cnktbW9kZWwnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuY2xhc3MgQmFzZUVudHJ5VmlldyBleHRlbmRzIFZpZXdcbiAgbW9kZWw6IE5hdmJhckVudHJ5XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0nXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBhcHA6IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgICBjdXJyZW50VXNlcjogTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Y3VycmVudFVzZXInXG4gIHVpOlxuICAgIGVudHJ5OiAnLm5hdmJhci1lbnRyeSdcbiAgdHJpZ2dlcnM6XG4gICAgJ2NsaWNrIEB1aS5lbnRyeSc6ICdjbGljazplbnRyeSdcbiAgc2V0X2FjdGl2ZTogLT5cbiAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnXG4gICAgcmV0dXJuXG4gIHVuc2V0X2FjdGl2ZTogLT5cbiAgICBAJGVsLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgcmV0dXJuXG4gICAgXG5jbGFzcyBTaW5nbGVFbnRyeVZpZXcgZXh0ZW5kcyBCYXNlRW50cnlWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChlbnRyeSkgLT5cbiAgICB0Yy5hICcubmF2YmFyLWVudHJ5Lm5hdi1saW5rJywgaHJlZjplbnRyeS51cmwsIC0+XG4gICAgICBpZiBlbnRyeS5pY29uXG4gICAgICAgIHRjLmkgZW50cnkuaWNvblxuICAgICAgICB0Yy50ZXh0IFwiIFwiXG4gICAgICB0Yy50ZXh0IGVudHJ5LmxhYmVsXG5cbmNsYXNzIERyb3Bkb3duRW50cnlWaWV3IGV4dGVuZHMgQmFzZUVudHJ5Vmlld1xuICBjbGFzc05hbWU6ICduYXYtaXRlbSBkcm9wZG93bidcbiAgdWk6IC0+XG4gICAgdG9nZ2xlQnV0dG9uOiAnLmRyb3Bkb3duLXRvZ2dsZSdcbiAgICBlbnRyeTogJy5uYXZiYXItZW50cnknXG4gIG1vZGVsRXZlbnRzOlxuICAgIGNoYW5nZTogJ3JlbmRlcidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICAgIHRjLmEgJy5uYXYtbGluay5kcm9wZG93bi10b2dnbGUnLFxuICAgIHJvbGU6J2J1dHRvbicsICdkYXRhLXRvZ2dsZSc6J2Ryb3Bkb3duJywgLT5cbiAgICAgIHRjLnRleHQgZW50cnkubGFiZWxcbiAgICAgIHRjLmIgJy5jYXJldCdcbiAgICB0Yy51bCAnLmRyb3Bkb3duLW1lbnUnLCAtPlxuICAgICAgZm9yIGxpbmsgaW4gZW50cnkubWVudVxuICAgICAgICBpZiBsaW5rPy5uZWVkVXNlciBhbmQgZW50cnkuY3VycmVudFVzZXIuZ2V0KCdpc0d1ZXN0JylcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgIHRjLmEgJy5uYXZiYXItZW50cnkubmF2LWxpbmsuZHJvcGRvd24taXRlbScsIGhyZWY6bGluay51cmwsIC0+XG4gICAgICAgICAgICBpZiBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMuaSBsaW5rLmljb25cbiAgICAgICAgICAgICAgdGMudGV4dCBcIiBcIlxuICAgICAgICAgICAgdGMudGV4dCBsaW5rLmxhYmVsXG5cbmNsYXNzIE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXcgZXh0ZW5kcyBDb2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ25hdmJhci1uYXYnXG4gIFxuICBjaGlsZFZpZXc6IChpdGVtKSAtPlxuICAgIGlmIGl0ZW0uaGFzKCdtZW51JykgYW5kIGl0ZW0uZ2V0KCdtZW51JylcbiAgICAgIERyb3Bkb3duRW50cnlWaWV3XG4gICAgZWxzZVxuICAgICAgU2luZ2xlRW50cnlWaWV3XG4gICAgICBcbiAgc2V0QWxsSW5hY3RpdmU6IC0+XG4gICAgQGNoaWxkcmVuLmVhY2ggKHZpZXcpIC0+XG4gICAgICB2aWV3LnVuc2V0X2FjdGl2ZSgpXG4gICAgcmV0dXJuXG5cbiAgY2hpbGRWaWV3RXZlbnRzOlxuICAgICdjbGljazplbnRyeSc6ICdvbkNoaWxkdmlld0NsaWNrRW50cnknXG5cbiAgIyBvbkNoaWxkdmlld0NsaWNrRW50cnkgd2lsbCBub3QgYmUgY2FsbGVkXG4gICMgd2l0aG91dCBzZXR0aW5nIEBjaGlsZFZpZXdFdmVudHNcbiAgb25DaGlsZHZpZXdDbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIEBzZXRBbGxJbmFjdGl2ZSgpXG4gICAgY3ZpZXcuc2V0X2FjdGl2ZSgpXG4gICAgQG5hdmlnYXRlT25DbGlja0VudHJ5IGN2aWV3LCBldmVudFxuICAgIHJldHVyblxuICAgIFxuICBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgaWYgY3ZpZXcuJGVsLmhhc0NsYXNzIFwic2hvd1wiXG4gICAgICAjY3ZpZXcuJGVsLmRyb3Bkb3duKCd0b2dnbGUnKVxuICAgICAgY3ZpZXcudWkudG9nZ2xlQnV0dG9uLmNsaWNrKClcbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICAjIGNoZWNrIGlmIGljb24gaXMgY2xpY2tlZFxuICAgIGlmIHRhcmdldC50YWdOYW1lIGlzIFwiSVwiXG4gICAgICAjY29uc29sZS53YXJuIFwiY2xpY2tlZCBpY29uXCJcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KS5wYXJlbnQoKVxuICAgIGVsc2VcbiAgICAgIGFuY2hvciA9ICQodGFyZ2V0KVxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gYW5jaG9yLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgcm91dGVyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1yb3V0ZXInXG4gICAgICByb3V0ZXIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgIHJldHVyblxuICAgIFxuY2xhc3MgTmF2YmFyRW50cmllc1ZpZXcgZXh0ZW5kcyBWaWV3XG4gIHVpOlxuICAgIGxpc3Q6ICcubmF2YmFyLWVudHJpZXMnXG4gIHJlZ2lvbnM6XG4gICAgbGlzdDogJ0B1aS5saXN0J1xuICAgIHVzZXJNZW51OiAnI3VzZXItbWVudSdcbiAgICBzZWFyY2g6ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE5hdmJhckVudHJ5Q29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dDaGlsZFZpZXcgJ2xpc3QnLCB2aWV3XG4gICAgcmV0dXJuXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5uYXZiYXItZW50cmllcy5tci1hdXRvJ1xuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICB2aWV3ID0gQGdldENoaWxkVmlldyAnbGlzdCdcbiAgICB2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICByZXR1cm5cbiAgIFxuICAgIFxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyRW50cmllc1ZpZXdcblxuXG5cbiJdfQ==
