var main_sidebar, user_menu;

import tc from 'teacup';

//#######################################
// Menu Templates
//#######################################
user_menu = tc.renderable(function(user) {
  var name;
  name = user.name;
  return tc.ul('#user-menu.ctx-menu.nav.navbar-nav', function() {
    return tc.li('.dropdown', function() {
      tc.a('.dropdown-toggle', {
        'data-toggle': 'dropdown'
      }, function() {
        if (name === void 0) {
          tc.text("Guest");
        } else {
          tc.text(name);
        }
        return tc.b('.caret');
      });
      return tc.ul('.dropdown-menu', function() {
        var admin, g, groups, i, len;
        if (name === void 0) {
          return tc.li(function() {
            return tc.a({
              href: '#login'
            }, 'login');
          });
        } else {
          tc.li(function() {
            return tc.a({
              href: '#profile'
            }, 'Profile Page');
          });
          // we need a "get user info" from server
          // to populate this menu with 'admin' link
          // FIXME use "?." to help here
          admin = false;
          if (name !== void 0) {
            groups = user.groups;
            if (groups !== void 0) {
              for (i = 0, len = groups.length; i < len; i++) {
                g = groups[i];
                if (g.name === 'admin') {
                  admin = true;
                }
              }
            }
          }
          // FIXME I don't like using username
          if (user.name === 'admin') {
            admin = true;
          }
          if (admin) {
            tc.li(function() {
              var href, pathname;
              href = '/admin';
              pathname = window.location.pathname;
              if (pathname.split(href)[0] === '') {
                href = '#';
              }
              return tc.a({
                href: href
              }, 'Administer Site');
            });
          }
          return tc.li(function() {
            return tc.a({
              href: '/logout'
            }, 'Logout');
          });
        }
      });
    });
  });
});

main_sidebar = tc.renderable(function(model) {
  return tc.div('.btn-group-vertical', function() {
    var entry, entryBtnClass, i, len, ref, results;
    entryBtnClass = '.btn.btn-secondary.sidebar-entry-button';
    ref = model.entries;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entry = ref[i];
      results.push(tc.div(entryBtnClass, {
        'button-url': entry.url
      }, function() {
        return tc.text(entry.name);
      }));
    }
    return results;
  });
});

export {
  //#######################################
  user_menu,
  main_sidebar
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL21lbnVzLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvbWVudXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsWUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBLFNBQUE7Ozs7O0FBS0EsU0FBQSxHQUFZLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtBQUN4QixNQUFBO0VBQUEsSUFBQSxHQUFPLElBQUksQ0FBQztTQUNaLEVBQUUsQ0FBQyxFQUFILENBQU0sb0NBQU4sRUFBNEMsUUFBQSxDQUFBLENBQUE7V0FDMUMsRUFBRSxDQUFDLEVBQUgsQ0FBTSxXQUFOLEVBQW1CLFFBQUEsQ0FBQSxDQUFBO01BQ2pCLEVBQUUsQ0FBQyxDQUFILENBQUssa0JBQUwsRUFBeUI7UUFBQSxhQUFBLEVBQWM7TUFBZCxDQUF6QixFQUFtRCxRQUFBLENBQUEsQ0FBQTtRQUNqRCxJQUFHLElBQUEsS0FBUSxNQUFYO1VBQ0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFSLEVBREY7U0FBQSxNQUFBO1VBR0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxJQUFSLEVBSEY7O2VBSUEsRUFBRSxDQUFDLENBQUgsQ0FBSyxRQUFMO01BTGlELENBQW5EO2FBTUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxnQkFBTixFQUF3QixRQUFBLENBQUEsQ0FBQTtBQUN0QixZQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQTtRQUFBLElBQUcsSUFBQSxLQUFRLE1BQVg7aUJBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLO2NBQUEsSUFBQSxFQUFLO1lBQUwsQ0FBTCxFQUFvQixPQUFwQjtVQURJLENBQU4sRUFERjtTQUFBLE1BQUE7VUFJRSxFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO21CQUNKLEVBQUUsQ0FBQyxDQUFILENBQUs7Y0FBQSxJQUFBLEVBQUs7WUFBTCxDQUFMLEVBQXNCLGNBQXRCO1VBREksQ0FBTixFQUFBOzs7O1VBS0EsS0FBQSxHQUFRO1VBQ1IsSUFBTyxJQUFBLEtBQVEsTUFBZjtZQUNFLE1BQUEsR0FBUyxJQUFJLENBQUM7WUFDZCxJQUFHLE1BQUEsS0FBVSxNQUFiO2NBQ0UsS0FBQSx3Q0FBQTs7Z0JBQ0UsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLE9BQWI7a0JBQ0UsS0FBQSxHQUFRLEtBRFY7O2NBREYsQ0FERjthQUZGO1dBTkE7O1VBYUEsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLE9BQWhCO1lBQ0UsS0FBQSxHQUFRLEtBRFY7O1VBRUEsSUFBRyxLQUFIO1lBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTtBQUNKLGtCQUFBLElBQUEsRUFBQTtjQUFBLElBQUEsR0FBTztjQUNQLFFBQUEsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDO2NBQzNCLElBQUcsUUFBUSxDQUFDLEtBQVQsQ0FBZSxJQUFmLENBQXFCLENBQUEsQ0FBQSxDQUFyQixLQUEyQixFQUE5QjtnQkFDRSxJQUFBLEdBQU8sSUFEVDs7cUJBRUEsRUFBRSxDQUFDLENBQUgsQ0FBSztnQkFBQSxJQUFBLEVBQUs7Y0FBTCxDQUFMLEVBQWdCLGlCQUFoQjtZQUxJLENBQU4sRUFERjs7aUJBT0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLO2NBQUEsSUFBQSxFQUFLO1lBQUwsQ0FBTCxFQUFxQixRQUFyQjtVQURJLENBQU4sRUExQkY7O01BRHNCLENBQXhCO0lBUGlCLENBQW5CO0VBRDBDLENBQTVDO0FBRndCLENBQWQ7O0FBd0NaLFlBQUEsR0FBZSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDM0IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxQkFBUCxFQUE4QixRQUFBLENBQUEsQ0FBQTtBQUM1QixRQUFBLEtBQUEsRUFBQSxhQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7SUFBQSxhQUFBLEdBQWdCO0FBQ2hCO0FBQUE7SUFBQSxLQUFBLHFDQUFBOzttQkFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0I7UUFBQSxZQUFBLEVBQWEsS0FBSyxDQUFDO01BQW5CLENBQXRCLEVBQThDLFFBQUEsQ0FBQSxDQUFBO2VBQzVDLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLElBQWQ7TUFENEMsQ0FBOUM7SUFERixDQUFBOztFQUY0QixDQUE5QjtBQUQyQixDQUFkOztBQVNmLE9BQUE7O0VBQ0UsU0FERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIE1lbnUgVGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG51c2VyX21lbnUgPSB0Yy5yZW5kZXJhYmxlICh1c2VyKSAtPlxuICBuYW1lID0gdXNlci5uYW1lXG4gIHRjLnVsICcjdXNlci1tZW51LmN0eC1tZW51Lm5hdi5uYXZiYXItbmF2JywgLT5cbiAgICB0Yy5saSAnLmRyb3Bkb3duJywgLT5cbiAgICAgIHRjLmEgJy5kcm9wZG93bi10b2dnbGUnLCAnZGF0YS10b2dnbGUnOidkcm9wZG93bicsIC0+XG4gICAgICAgIGlmIG5hbWUgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgdGMudGV4dCBcIkd1ZXN0XCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRjLnRleHQgbmFtZVxuICAgICAgICB0Yy5iICcuY2FyZXQnXG4gICAgICB0Yy51bCAnLmRyb3Bkb3duLW1lbnUnLCAtPlxuICAgICAgICBpZiBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgIHRjLmxpIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6JyNsb2dpbicsICdsb2dpbidcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRjLmxpIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6JyNwcm9maWxlJywgJ1Byb2ZpbGUgUGFnZSdcbiAgICAgICAgICAjIHdlIG5lZWQgYSBcImdldCB1c2VyIGluZm9cIiBmcm9tIHNlcnZlclxuICAgICAgICAgICMgdG8gcG9wdWxhdGUgdGhpcyBtZW51IHdpdGggJ2FkbWluJyBsaW5rXG4gICAgICAgICAgIyBGSVhNRSB1c2UgXCI/LlwiIHRvIGhlbHAgaGVyZVxuICAgICAgICAgIGFkbWluID0gZmFsc2VcbiAgICAgICAgICB1bmxlc3MgbmFtZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgIGdyb3VwcyA9IHVzZXIuZ3JvdXBzXG4gICAgICAgICAgICBpZiBncm91cHMgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIGZvciBnIGluIGdyb3Vwc1xuICAgICAgICAgICAgICAgIGlmIGcubmFtZSA9PSAnYWRtaW4nXG4gICAgICAgICAgICAgICAgICBhZG1pbiA9IHRydWVcbiAgICAgICAgICAjIEZJWE1FIEkgZG9uJ3QgbGlrZSB1c2luZyB1c2VybmFtZVxuICAgICAgICAgIGlmIHVzZXIubmFtZSBpcyAnYWRtaW4nXG4gICAgICAgICAgICBhZG1pbiA9IHRydWVcbiAgICAgICAgICBpZiBhZG1pblxuICAgICAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICAgICAgaHJlZiA9ICcvYWRtaW4nXG4gICAgICAgICAgICAgIHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICAgIGlmIHBhdGhuYW1lLnNwbGl0KGhyZWYpWzBdID09ICcnXG4gICAgICAgICAgICAgICAgaHJlZiA9ICcjJ1xuICAgICAgICAgICAgICB0Yy5hIGhyZWY6aHJlZiwgJ0FkbWluaXN0ZXIgU2l0ZSdcbiAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOicvbG9nb3V0JywgJ0xvZ291dCdcblxubWFpbl9zaWRlYmFyID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLmJ0bi1ncm91cC12ZXJ0aWNhbCcsIC0+XG4gICAgZW50cnlCdG5DbGFzcyA9ICcuYnRuLmJ0bi1zZWNvbmRhcnkuc2lkZWJhci1lbnRyeS1idXR0b24nXG4gICAgZm9yIGVudHJ5IGluIG1vZGVsLmVudHJpZXNcbiAgICAgIHRjLmRpdiBlbnRyeUJ0bkNsYXNzLCAnYnV0dG9uLXVybCc6ZW50cnkudXJsLCAtPlxuICAgICAgICB0Yy50ZXh0IGVudHJ5Lm5hbWVcblxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5leHBvcnQge1xuICB1c2VyX21lbnVcbiAgbWFpbl9zaWRlYmFyXG4gIH1cbiJdfQ==
