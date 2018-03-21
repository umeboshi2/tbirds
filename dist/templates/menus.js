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
              href: '#frontdoor/login'
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
    var entry, i, len, ref, results;
    ref = model.entries;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entry = ref[i];
      results.push(tc.div('.btn.btn-secondary.sidebar-entry-button', {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL21lbnVzLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvbWVudXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsWUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBLFNBQUE7Ozs7O0FBS0EsU0FBQSxHQUFZLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtBQUN4QixNQUFBO0VBQUEsSUFBQSxHQUFPLElBQUksQ0FBQztTQUNaLEVBQUUsQ0FBQyxFQUFILENBQU0sb0NBQU4sRUFBNEMsUUFBQSxDQUFBLENBQUE7V0FDMUMsRUFBRSxDQUFDLEVBQUgsQ0FBTSxXQUFOLEVBQW1CLFFBQUEsQ0FBQSxDQUFBO01BQ2pCLEVBQUUsQ0FBQyxDQUFILENBQUssa0JBQUwsRUFBeUI7UUFBQSxhQUFBLEVBQWM7TUFBZCxDQUF6QixFQUFtRCxRQUFBLENBQUEsQ0FBQTtRQUNqRCxJQUFHLElBQUEsS0FBUSxNQUFYO1VBQ0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFSLEVBREY7U0FBQSxNQUFBO1VBR0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxJQUFSLEVBSEY7O2VBSUEsRUFBRSxDQUFDLENBQUgsQ0FBSyxRQUFMO01BTGlELENBQW5EO2FBTUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxnQkFBTixFQUF3QixRQUFBLENBQUEsQ0FBQTtBQUN0QixZQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQTtRQUFBLElBQUcsSUFBQSxLQUFRLE1BQVg7aUJBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLO2NBQUEsSUFBQSxFQUFLO1lBQUwsQ0FBTCxFQUE4QixPQUE5QjtVQURJLENBQU4sRUFERjtTQUFBLE1BQUE7VUFJRSxFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO21CQUNKLEVBQUUsQ0FBQyxDQUFILENBQUs7Y0FBQSxJQUFBLEVBQUs7WUFBTCxDQUFMLEVBQXNCLGNBQXRCO1VBREksQ0FBTixFQUFBOzs7O1VBS0EsS0FBQSxHQUFRO1VBQ1IsSUFBTyxJQUFBLEtBQVEsTUFBZjtZQUNFLE1BQUEsR0FBUyxJQUFJLENBQUM7WUFDZCxJQUFHLE1BQUEsS0FBVSxNQUFiO2NBQ0UsS0FBQSx3Q0FBQTs7Z0JBQ0UsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLE9BQWI7a0JBQ0UsS0FBQSxHQUFRLEtBRFY7O2NBREYsQ0FERjthQUZGO1dBTkE7O1VBYUEsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLE9BQWhCO1lBQ0UsS0FBQSxHQUFRLEtBRFY7O1VBRUEsSUFBRyxLQUFIO1lBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTtBQUNKLGtCQUFBLElBQUEsRUFBQTtjQUFBLElBQUEsR0FBTztjQUNQLFFBQUEsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDO2NBQzNCLElBQUcsUUFBUSxDQUFDLEtBQVQsQ0FBZSxJQUFmLENBQXFCLENBQUEsQ0FBQSxDQUFyQixLQUEyQixFQUE5QjtnQkFDRSxJQUFBLEdBQU8sSUFEVDs7cUJBRUEsRUFBRSxDQUFDLENBQUgsQ0FBSztnQkFBQSxJQUFBLEVBQUs7Y0FBTCxDQUFMLEVBQWdCLGlCQUFoQjtZQUxJLENBQU4sRUFERjs7aUJBT0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLO2NBQUEsSUFBQSxFQUFLO1lBQUwsQ0FBTCxFQUFxQixRQUFyQjtVQURJLENBQU4sRUExQkY7O01BRHNCLENBQXhCO0lBUGlCLENBQW5CO0VBRDBDLENBQTVDO0FBRndCLENBQWQ7O0FBd0NaLFlBQUEsR0FBZSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDM0IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxQkFBUCxFQUE4QixRQUFBLENBQUEsQ0FBQTtBQUM1QixRQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtBQUFBO0FBQUE7SUFBQSxLQUFBLHFDQUFBOzttQkFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLHlDQUFQLEVBQWtEO1FBQUEsWUFBQSxFQUFhLEtBQUssQ0FBQztNQUFuQixDQUFsRCxFQUEwRSxRQUFBLENBQUEsQ0FBQTtlQUN4RSxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxJQUFkO01BRHdFLENBQTFFO0lBREYsQ0FBQTs7RUFENEIsQ0FBOUI7QUFEMkIsQ0FBZDs7QUFRZixPQUFBOztFQUNFLFNBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBNZW51IFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xudXNlcl9tZW51ID0gdGMucmVuZGVyYWJsZSAodXNlcikgLT5cbiAgbmFtZSA9IHVzZXIubmFtZVxuICB0Yy51bCAnI3VzZXItbWVudS5jdHgtbWVudS5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgdGMubGkgJy5kcm9wZG93bicsIC0+XG4gICAgICB0Yy5hICcuZHJvcGRvd24tdG9nZ2xlJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgICBpZiBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgIHRjLnRleHQgXCJHdWVzdFwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy50ZXh0IG5hbWVcbiAgICAgICAgdGMuYiAnLmNhcmV0J1xuICAgICAgdGMudWwgJy5kcm9wZG93bi1tZW51JywgLT5cbiAgICAgICAgaWYgbmFtZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOicjZnJvbnRkb29yL2xvZ2luJywgJ2xvZ2luJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICAgIHRjLmEgaHJlZjonI3Byb2ZpbGUnLCAnUHJvZmlsZSBQYWdlJ1xuICAgICAgICAgICMgd2UgbmVlZCBhIFwiZ2V0IHVzZXIgaW5mb1wiIGZyb20gc2VydmVyXG4gICAgICAgICAgIyB0byBwb3B1bGF0ZSB0aGlzIG1lbnUgd2l0aCAnYWRtaW4nIGxpbmtcbiAgICAgICAgICAjIEZJWE1FIHVzZSBcIj8uXCIgdG8gaGVscCBoZXJlXG4gICAgICAgICAgYWRtaW4gPSBmYWxzZVxuICAgICAgICAgIHVubGVzcyBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgZ3JvdXBzID0gdXNlci5ncm91cHNcbiAgICAgICAgICAgIGlmIGdyb3VwcyAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgZm9yIGcgaW4gZ3JvdXBzXG4gICAgICAgICAgICAgICAgaWYgZy5uYW1lID09ICdhZG1pbidcbiAgICAgICAgICAgICAgICAgIGFkbWluID0gdHJ1ZVxuICAgICAgICAgICMgRklYTUUgSSBkb24ndCBsaWtlIHVzaW5nIHVzZXJuYW1lXG4gICAgICAgICAgaWYgdXNlci5uYW1lIGlzICdhZG1pbidcbiAgICAgICAgICAgIGFkbWluID0gdHJ1ZVxuICAgICAgICAgIGlmIGFkbWluXG4gICAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgICBocmVmID0gJy9hZG1pbidcbiAgICAgICAgICAgICAgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICAgICAgaWYgcGF0aG5hbWUuc3BsaXQoaHJlZilbMF0gPT0gJydcbiAgICAgICAgICAgICAgICBocmVmID0gJyMnXG4gICAgICAgICAgICAgIHRjLmEgaHJlZjpocmVmLCAnQWRtaW5pc3RlciBTaXRlJ1xuICAgICAgICAgIHRjLmxpIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6Jy9sb2dvdXQnLCAnTG9nb3V0J1xuXG5tYWluX3NpZGViYXIgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuZGl2ICcuYnRuLWdyb3VwLXZlcnRpY2FsJywgLT5cbiAgICBmb3IgZW50cnkgaW4gbW9kZWwuZW50cmllc1xuICAgICAgdGMuZGl2ICcuYnRuLmJ0bi1zZWNvbmRhcnkuc2lkZWJhci1lbnRyeS1idXR0b24nLCAnYnV0dG9uLXVybCc6ZW50cnkudXJsLCAtPlxuICAgICAgICB0Yy50ZXh0IGVudHJ5Lm5hbWVcblxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5leHBvcnQge1xuICB1c2VyX21lbnVcbiAgbWFpbl9zaWRlYmFyXG4gIH1cbiJdfQ==
