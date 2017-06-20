var main_sidebar, tc, user_menu;

tc = require('teacup');

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

module.exports = {
  user_menu: user_menu,
  main_sidebar: main_sidebar
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL21lbnVzLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvbWVudXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUtMLFNBQUEsR0FBWSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsSUFBRDtBQUN4QixNQUFBO0VBQUEsSUFBQSxHQUFPLElBQUksQ0FBQztTQUNaLEVBQUUsQ0FBQyxFQUFILENBQU0sb0NBQU4sRUFBNEMsU0FBQTtXQUMxQyxFQUFFLENBQUMsRUFBSCxDQUFNLFdBQU4sRUFBbUIsU0FBQTtNQUNqQixFQUFFLENBQUMsQ0FBSCxDQUFLLGtCQUFMLEVBQXlCO1FBQUEsYUFBQSxFQUFjLFVBQWQ7T0FBekIsRUFBbUQsU0FBQTtRQUNqRCxJQUFHLElBQUEsS0FBUSxNQUFYO1VBQ0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFSLEVBREY7U0FBQSxNQUFBO1VBR0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxJQUFSLEVBSEY7O2VBSUEsRUFBRSxDQUFDLENBQUgsQ0FBSyxRQUFMO01BTGlELENBQW5EO2FBTUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxnQkFBTixFQUF3QixTQUFBO0FBQ3RCLFlBQUE7UUFBQSxJQUFHLElBQUEsS0FBUSxNQUFYO2lCQUNFLEVBQUUsQ0FBQyxFQUFILENBQU0sU0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLO2NBQUEsSUFBQSxFQUFLLGtCQUFMO2FBQUwsRUFBOEIsT0FBOUI7VUFESSxDQUFOLEVBREY7U0FBQSxNQUFBO1VBSUUsRUFBRSxDQUFDLEVBQUgsQ0FBTSxTQUFBO21CQUNKLEVBQUUsQ0FBQyxDQUFILENBQUs7Y0FBQSxJQUFBLEVBQUssVUFBTDthQUFMLEVBQXNCLGNBQXRCO1VBREksQ0FBTjtVQUtBLEtBQUEsR0FBUTtVQUNSLElBQU8sSUFBQSxLQUFRLE1BQWY7WUFDRSxNQUFBLEdBQVMsSUFBSSxDQUFDO1lBQ2QsSUFBRyxNQUFBLEtBQVUsTUFBYjtBQUNFLG1CQUFBLHdDQUFBOztnQkFDRSxJQUFHLENBQUMsQ0FBQyxJQUFGLEtBQVUsT0FBYjtrQkFDRSxLQUFBLEdBQVEsS0FEVjs7QUFERixlQURGO2FBRkY7O1VBT0EsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLE9BQWhCO1lBQ0UsS0FBQSxHQUFRLEtBRFY7O1VBRUEsSUFBRyxLQUFIO1lBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxTQUFBO0FBQ0osa0JBQUE7Y0FBQSxJQUFBLEdBQU87Y0FDUCxRQUFBLEdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQztjQUMzQixJQUFHLFFBQVEsQ0FBQyxLQUFULENBQWUsSUFBZixDQUFxQixDQUFBLENBQUEsQ0FBckIsS0FBMkIsRUFBOUI7Z0JBQ0UsSUFBQSxHQUFPLElBRFQ7O3FCQUVBLEVBQUUsQ0FBQyxDQUFILENBQUs7Z0JBQUEsSUFBQSxFQUFLLElBQUw7ZUFBTCxFQUFnQixpQkFBaEI7WUFMSSxDQUFOLEVBREY7O2lCQU9BLEVBQUUsQ0FBQyxFQUFILENBQU0sU0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLO2NBQUEsSUFBQSxFQUFLLFNBQUw7YUFBTCxFQUFxQixRQUFyQjtVQURJLENBQU4sRUExQkY7O01BRHNCLENBQXhCO0lBUGlCLENBQW5CO0VBRDBDLENBQTVDO0FBRndCLENBQWQ7O0FBd0NaLFlBQUEsR0FBZSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtTQUMzQixFQUFFLENBQUMsR0FBSCxDQUFPLHFCQUFQLEVBQThCLFNBQUE7QUFDNUIsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7bUJBQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyx1Q0FBUCxFQUFnRDtRQUFBLFlBQUEsRUFBYSxLQUFLLENBQUMsR0FBbkI7T0FBaEQsRUFBd0UsU0FBQTtlQUN0RSxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxJQUFkO01BRHNFLENBQXhFO0FBREY7O0VBRDRCLENBQTlCO0FBRDJCLENBQWQ7O0FBUWYsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLFNBQUEsRUFBVyxTQUFYO0VBQ0EsWUFBQSxFQUFjLFlBRGQiLCJzb3VyY2VzQ29udGVudCI6WyJ0YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBNZW51IFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xudXNlcl9tZW51ID0gdGMucmVuZGVyYWJsZSAodXNlcikgLT5cbiAgbmFtZSA9IHVzZXIubmFtZVxuICB0Yy51bCAnI3VzZXItbWVudS5jdHgtbWVudS5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgdGMubGkgJy5kcm9wZG93bicsIC0+XG4gICAgICB0Yy5hICcuZHJvcGRvd24tdG9nZ2xlJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgICBpZiBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgIHRjLnRleHQgXCJHdWVzdFwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy50ZXh0IG5hbWVcbiAgICAgICAgdGMuYiAnLmNhcmV0J1xuICAgICAgdGMudWwgJy5kcm9wZG93bi1tZW51JywgLT5cbiAgICAgICAgaWYgbmFtZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOicjZnJvbnRkb29yL2xvZ2luJywgJ2xvZ2luJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICAgIHRjLmEgaHJlZjonI3Byb2ZpbGUnLCAnUHJvZmlsZSBQYWdlJ1xuICAgICAgICAgICMgd2UgbmVlZCBhIFwiZ2V0IHVzZXIgaW5mb1wiIGZyb20gc2VydmVyXG4gICAgICAgICAgIyB0byBwb3B1bGF0ZSB0aGlzIG1lbnUgd2l0aCAnYWRtaW4nIGxpbmtcbiAgICAgICAgICAjIEZJWE1FIHVzZSBcIj8uXCIgdG8gaGVscCBoZXJlXG4gICAgICAgICAgYWRtaW4gPSBmYWxzZVxuICAgICAgICAgIHVubGVzcyBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgZ3JvdXBzID0gdXNlci5ncm91cHNcbiAgICAgICAgICAgIGlmIGdyb3VwcyAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgZm9yIGcgaW4gZ3JvdXBzXG4gICAgICAgICAgICAgICAgaWYgZy5uYW1lID09ICdhZG1pbidcbiAgICAgICAgICAgICAgICAgIGFkbWluID0gdHJ1ZVxuICAgICAgICAgICMgRklYTUUgSSBkb24ndCBsaWtlIHVzaW5nIHVzZXJuYW1lXG4gICAgICAgICAgaWYgdXNlci5uYW1lIGlzICdhZG1pbidcbiAgICAgICAgICAgIGFkbWluID0gdHJ1ZVxuICAgICAgICAgIGlmIGFkbWluXG4gICAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgICBocmVmID0gJy9hZG1pbidcbiAgICAgICAgICAgICAgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICAgICAgaWYgcGF0aG5hbWUuc3BsaXQoaHJlZilbMF0gPT0gJydcbiAgICAgICAgICAgICAgICBocmVmID0gJyMnXG4gICAgICAgICAgICAgIHRjLmEgaHJlZjpocmVmLCAnQWRtaW5pc3RlciBTaXRlJ1xuICAgICAgICAgIHRjLmxpIC0+XG4gICAgICAgICAgICB0Yy5hIGhyZWY6Jy9sb2dvdXQnLCAnTG9nb3V0J1xuXG5tYWluX3NpZGViYXIgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuZGl2ICcuYnRuLWdyb3VwLXZlcnRpY2FsJywgLT5cbiAgICBmb3IgZW50cnkgaW4gbW9kZWwuZW50cmllc1xuICAgICAgdGMuZGl2ICcuYnRuLmJ0bi1kZWZhdWx0LnNpZGViYXItZW50cnktYnV0dG9uJywgJ2J1dHRvbi11cmwnOmVudHJ5LnVybCwgLT5cbiAgICAgICAgdGMudGV4dCBlbnRyeS5uYW1lXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubW9kdWxlLmV4cG9ydHMgPVxuICB1c2VyX21lbnU6IHVzZXJfbWVudVxuICBtYWluX3NpZGViYXI6IG1haW5fc2lkZWJhclxuIl19
