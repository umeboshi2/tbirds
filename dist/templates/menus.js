var main_sidebar, tc, user_menu;

tc = require('teacup');

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
      results.push(tc.div('.btn.btn-default.sidebar-entry-button', {
        'button-url': entry.url
      }, function() {
        return tc.text(entry.name);
      }));
    }
    return results;
  });
});

//#######################################
module.exports = {
  user_menu: user_menu,
  main_sidebar: main_sidebar
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL21lbnVzLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvbWVudXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsWUFBQSxFQUFBLEVBQUEsRUFBQTs7QUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVIsRUFBTDs7Ozs7QUFLQSxTQUFBLEdBQVksRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsSUFBRCxDQUFBO0FBQ3hCLE1BQUE7RUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDO1NBQ1osRUFBRSxDQUFDLEVBQUgsQ0FBTSxvQ0FBTixFQUE0QyxRQUFBLENBQUEsQ0FBQTtXQUMxQyxFQUFFLENBQUMsRUFBSCxDQUFNLFdBQU4sRUFBbUIsUUFBQSxDQUFBLENBQUE7TUFDakIsRUFBRSxDQUFDLENBQUgsQ0FBSyxrQkFBTCxFQUF5QjtRQUFBLGFBQUEsRUFBYztNQUFkLENBQXpCLEVBQW1ELFFBQUEsQ0FBQSxDQUFBO1FBQ2pELElBQUcsSUFBQSxLQUFRLE1BQVg7VUFDRSxFQUFFLENBQUMsSUFBSCxDQUFRLE9BQVIsRUFERjtTQUFBLE1BQUE7VUFHRSxFQUFFLENBQUMsSUFBSCxDQUFRLElBQVIsRUFIRjs7ZUFJQSxFQUFFLENBQUMsQ0FBSCxDQUFLLFFBQUw7TUFMaUQsQ0FBbkQ7YUFNQSxFQUFFLENBQUMsRUFBSCxDQUFNLGdCQUFOLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO0FBQ3RCLFlBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBO1FBQUEsSUFBRyxJQUFBLEtBQVEsTUFBWDtpQkFDRSxFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO21CQUNKLEVBQUUsQ0FBQyxDQUFILENBQUs7Y0FBQSxJQUFBLEVBQUs7WUFBTCxDQUFMLEVBQThCLE9BQTlCO1VBREksQ0FBTixFQURGO1NBQUEsTUFBQTtVQUlFLEVBQUUsQ0FBQyxFQUFILENBQU0sUUFBQSxDQUFBLENBQUE7bUJBQ0osRUFBRSxDQUFDLENBQUgsQ0FBSztjQUFBLElBQUEsRUFBSztZQUFMLENBQUwsRUFBc0IsY0FBdEI7VUFESSxDQUFOLEVBQUE7Ozs7VUFLQSxLQUFBLEdBQVE7VUFDUixJQUFPLElBQUEsS0FBUSxNQUFmO1lBQ0UsTUFBQSxHQUFTLElBQUksQ0FBQztZQUNkLElBQUcsTUFBQSxLQUFVLE1BQWI7Y0FDRSxLQUFBLHdDQUFBOztnQkFDRSxJQUFHLENBQUMsQ0FBQyxJQUFGLEtBQVUsT0FBYjtrQkFDRSxLQUFBLEdBQVEsS0FEVjs7Y0FERixDQURGO2FBRkY7V0FOQTs7VUFhQSxJQUFHLElBQUksQ0FBQyxJQUFMLEtBQWEsT0FBaEI7WUFDRSxLQUFBLEdBQVEsS0FEVjs7VUFFQSxJQUFHLEtBQUg7WUFDRSxFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO0FBQ0osa0JBQUEsSUFBQSxFQUFBO2NBQUEsSUFBQSxHQUFPO2NBQ1AsUUFBQSxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUM7Y0FDM0IsSUFBRyxRQUFRLENBQUMsS0FBVCxDQUFlLElBQWYsQ0FBcUIsQ0FBQSxDQUFBLENBQXJCLEtBQTJCLEVBQTlCO2dCQUNFLElBQUEsR0FBTyxJQURUOztxQkFFQSxFQUFFLENBQUMsQ0FBSCxDQUFLO2dCQUFBLElBQUEsRUFBSztjQUFMLENBQUwsRUFBZ0IsaUJBQWhCO1lBTEksQ0FBTixFQURGOztpQkFPQSxFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO21CQUNKLEVBQUUsQ0FBQyxDQUFILENBQUs7Y0FBQSxJQUFBLEVBQUs7WUFBTCxDQUFMLEVBQXFCLFFBQXJCO1VBREksQ0FBTixFQTFCRjs7TUFEc0IsQ0FBeEI7SUFQaUIsQ0FBbkI7RUFEMEMsQ0FBNUM7QUFGd0IsQ0FBZDs7QUF3Q1osWUFBQSxHQUFlLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtTQUMzQixFQUFFLENBQUMsR0FBSCxDQUFPLHFCQUFQLEVBQThCLFFBQUEsQ0FBQSxDQUFBO0FBQzVCLFFBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUE7QUFBQTtJQUFBLEtBQUEscUNBQUE7O21CQUNFLEVBQUUsQ0FBQyxHQUFILENBQU8sdUNBQVAsRUFBZ0Q7UUFBQSxZQUFBLEVBQWEsS0FBSyxDQUFDO01BQW5CLENBQWhELEVBQXdFLFFBQUEsQ0FBQSxDQUFBO2VBQ3RFLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLElBQWQ7TUFEc0UsQ0FBeEU7SUFERixDQUFBOztFQUQ0QixDQUE5QjtBQUQyQixDQUFkLEVBN0NmOzs7QUFxREEsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLFNBQUEsRUFBVyxTQUFYO0VBQ0EsWUFBQSxFQUFjO0FBRGQiLCJzb3VyY2VzQ29udGVudCI6WyJ0YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBNZW51IFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xudXNlcl9tZW51ID0gdGMucmVuZGVyYWJsZSAodXNlcikgLT5cbiAgbmFtZSA9IHVzZXIubmFtZVxuICB0Yy51bCAnI3VzZXItbWVudS5jdHgtbWVudS5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgdGMubGkgJy5kcm9wZG93bicsIC0+XG4gICAgICB0Yy5hICcuZHJvcGRvd24tdG9nZ2xlJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgICBpZiBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgIHRjLnRleHQgXCJHdWVzdFwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy50ZXh0IG5hbWVcbiAgICAgICAgdGMuYiAnLmNhcmV0J1xuICAgICAgdGMudWwgJy5kcm9wZG93bi1tZW51JywgLT5cbiAgICAgICAgaWYgbmFtZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOicjZnJvbnRkb29yL2xvZ2luJywgJ2xvZ2luJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICAgIHRjLmEgaHJlZjonI3Byb2ZpbGUnLCAnUHJvZmlsZSBQYWdlJ1xuICAgICAgICAgICMgd2UgbmVlZCBhIFwiZ2V0IHVzZXIgaW5mb1wiIGZyb20gc2VydmVyXG4gICAgICAgICAgIyB0byBwb3B1bGF0ZSB0aGlzIG1lbnUgd2l0aCAnYWRtaW4nIGxpbmtcbiAgICAgICAgICAjIEZJWE1FIHVzZSBcIj8uXCIgdG8gaGVscCBoZXJlXG4gICAgICAgICAgYWRtaW4gPSBmYWxzZVxuICAgICAgICAgIHVubGVzcyBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgZ3JvdXBzID0gdXNlci5ncm91cHNcbiAgICAgICAgICAgIGlmIGdyb3VwcyAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgZm9yIGcgaW4gZ3JvdXBzXG4gICAgICAgICAgICAgICAgaWYgZy5uYW1lID09ICdhZG1pbidcbiAgICAgICAgICAgICAgICAgIGFkbWluID0gdHJ1ZVxuICAgICAgICAgICMgRklYTUUgSSBkb24ndCBsaWtlIHVzaW5nIHVzZXJuYW1lXG4gICAgICAgICAgaWYgdXNlci5uYW1lIGlzICdhZG1pbidcbiAgICAgICAgICAgIGFkbWluID0gdHJ1ZVxuICAgICAgICAgIGlmIGFkbWluXG4gICAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgICBocmVmID0gJy9hZG1pbidcbiAgICAgICAgICAgICAgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICAgICAgaWYgcGF0aG5hbWUuc3BsaXQoaHJlZilbMF0gPT0gJydcbiAgICAgICAgICAgICAgICBocmVmID0gJyMnXG4gICAgICAgICAgICAgIHRjLmEgaHJlZjpocmVmLCAnQWRtaW5pc3RlciBTaXRlJ1xuICAgICAgICAgIHRjLmxpIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6Jy9sb2dvdXQnLCAnTG9nb3V0J1xuXG5tYWluX3NpZGViYXIgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuZGl2ICcuYnRuLWdyb3VwLXZlcnRpY2FsJywgLT5cbiAgICBmb3IgZW50cnkgaW4gbW9kZWwuZW50cmllc1xuICAgICAgdGMuZGl2ICcuYnRuLmJ0bi1kZWZhdWx0LnNpZGViYXItZW50cnktYnV0dG9uJywgJ2J1dHRvbi11cmwnOmVudHJ5LnVybCwgLT5cbiAgICAgICAgdGMudGV4dCBlbnRyeS5uYW1lXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMgPVxuICB1c2VyX21lbnU6IHVzZXJfbWVudVxuICBtYWluX3NpZGViYXI6IG1haW5fc2lkZWJhclxuIl19
