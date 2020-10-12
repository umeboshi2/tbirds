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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL21lbnVzLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvbWVudXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsWUFBQSxFQUFBOztBQUFBLE9BQU8sRUFBUCxNQUFBLFNBQUE7Ozs7O0FBS0EsU0FBQSxHQUFZLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLElBQUQsQ0FBQTtBQUMxQixNQUFBO0VBQUUsSUFBQSxHQUFPLElBQUksQ0FBQztTQUNaLEVBQUUsQ0FBQyxFQUFILENBQU0sb0NBQU4sRUFBNEMsUUFBQSxDQUFBLENBQUE7V0FDMUMsRUFBRSxDQUFDLEVBQUgsQ0FBTSxXQUFOLEVBQW1CLFFBQUEsQ0FBQSxDQUFBO01BQ2pCLEVBQUUsQ0FBQyxDQUFILENBQUssa0JBQUwsRUFBeUI7UUFBQSxhQUFBLEVBQWM7TUFBZCxDQUF6QixFQUFtRCxRQUFBLENBQUEsQ0FBQTtRQUNqRCxJQUFHLElBQUEsS0FBUSxNQUFYO1VBQ0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFSLEVBREY7U0FBQSxNQUFBO1VBR0UsRUFBRSxDQUFDLElBQUgsQ0FBUSxJQUFSLEVBSEY7O2VBSUEsRUFBRSxDQUFDLENBQUgsQ0FBSyxRQUFMO01BTGlELENBQW5EO2FBTUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxnQkFBTixFQUF3QixRQUFBLENBQUEsQ0FBQTtBQUM5QixZQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQTtRQUFRLElBQUcsSUFBQSxLQUFRLE1BQVg7aUJBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLO2NBQUEsSUFBQSxFQUFLO1lBQUwsQ0FBTCxFQUFvQixPQUFwQjtVQURJLENBQU4sRUFERjtTQUFBLE1BQUE7VUFJRSxFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO21CQUNKLEVBQUUsQ0FBQyxDQUFILENBQUs7Y0FBQSxJQUFBLEVBQUs7WUFBTCxDQUFMLEVBQXNCLGNBQXRCO1VBREksQ0FBTixFQUFWOzs7O1VBS1UsS0FBQSxHQUFRO1VBQ1IsSUFBTyxJQUFBLEtBQVEsTUFBZjtZQUNFLE1BQUEsR0FBUyxJQUFJLENBQUM7WUFDZCxJQUFHLE1BQUEsS0FBVSxNQUFiO2NBQ0UsS0FBQSx3Q0FBQTs7Z0JBQ0UsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLE9BQWI7a0JBQ0UsS0FBQSxHQUFRLEtBRFY7O2NBREYsQ0FERjthQUZGO1dBTlY7O1VBYVUsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLE9BQWhCO1lBQ0UsS0FBQSxHQUFRLEtBRFY7O1VBRUEsSUFBRyxLQUFIO1lBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTtBQUNsQixrQkFBQSxJQUFBLEVBQUE7Y0FBYyxJQUFBLEdBQU87Y0FDUCxRQUFBLEdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQztjQUMzQixJQUFHLFFBQVEsQ0FBQyxLQUFULENBQWUsSUFBZixDQUFvQixDQUFDLENBQUQsQ0FBcEIsS0FBMkIsRUFBOUI7Z0JBQ0UsSUFBQSxHQUFPLElBRFQ7O3FCQUVBLEVBQUUsQ0FBQyxDQUFILENBQUs7Z0JBQUEsSUFBQSxFQUFLO2NBQUwsQ0FBTCxFQUFnQixpQkFBaEI7WUFMSSxDQUFOLEVBREY7O2lCQU9BLEVBQUUsQ0FBQyxFQUFILENBQU0sUUFBQSxDQUFBLENBQUE7bUJBQ0osRUFBRSxDQUFDLENBQUgsQ0FBSztjQUFBLElBQUEsRUFBSztZQUFMLENBQUwsRUFBcUIsUUFBckI7VUFESSxDQUFOLEVBMUJGOztNQURzQixDQUF4QjtJQVBpQixDQUFuQjtFQUQwQyxDQUE1QztBQUZ3QixDQUFkOztBQXdDWixZQUFBLEdBQWUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQzNCLEVBQUUsQ0FBQyxHQUFILENBQU8scUJBQVAsRUFBOEIsUUFBQSxDQUFBLENBQUE7QUFDaEMsUUFBQSxLQUFBLEVBQUEsYUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0lBQUksYUFBQSxHQUFnQjtBQUNoQjtBQUFBO0lBQUEsS0FBQSxxQ0FBQTs7bUJBQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCO1FBQUEsWUFBQSxFQUFhLEtBQUssQ0FBQztNQUFuQixDQUF0QixFQUE4QyxRQUFBLENBQUEsQ0FBQTtlQUM1QyxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxJQUFkO01BRDRDLENBQTlDO0lBREYsQ0FBQTs7RUFGNEIsQ0FBOUI7QUFEMkIsQ0FBZDs7QUFTZixPQUFBOztFQUNFLFNBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBNZW51IFRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xudXNlcl9tZW51ID0gdGMucmVuZGVyYWJsZSAodXNlcikgLT5cbiAgbmFtZSA9IHVzZXIubmFtZVxuICB0Yy51bCAnI3VzZXItbWVudS5jdHgtbWVudS5uYXYubmF2YmFyLW5hdicsIC0+XG4gICAgdGMubGkgJy5kcm9wZG93bicsIC0+XG4gICAgICB0Yy5hICcuZHJvcGRvd24tdG9nZ2xlJywgJ2RhdGEtdG9nZ2xlJzonZHJvcGRvd24nLCAtPlxuICAgICAgICBpZiBuYW1lID09IHVuZGVmaW5lZFxuICAgICAgICAgIHRjLnRleHQgXCJHdWVzdFwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy50ZXh0IG5hbWVcbiAgICAgICAgdGMuYiAnLmNhcmV0J1xuICAgICAgdGMudWwgJy5kcm9wZG93bi1tZW51JywgLT5cbiAgICAgICAgaWYgbmFtZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOicjbG9naW4nLCAnbG9naW4nXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0Yy5saSAtPlxuICAgICAgICAgICAgdGMuYSBocmVmOicjcHJvZmlsZScsICdQcm9maWxlIFBhZ2UnXG4gICAgICAgICAgIyB3ZSBuZWVkIGEgXCJnZXQgdXNlciBpbmZvXCIgZnJvbSBzZXJ2ZXJcbiAgICAgICAgICAjIHRvIHBvcHVsYXRlIHRoaXMgbWVudSB3aXRoICdhZG1pbicgbGlua1xuICAgICAgICAgICMgRklYTUUgdXNlIFwiPy5cIiB0byBoZWxwIGhlcmVcbiAgICAgICAgICBhZG1pbiA9IGZhbHNlXG4gICAgICAgICAgdW5sZXNzIG5hbWUgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICBncm91cHMgPSB1c2VyLmdyb3Vwc1xuICAgICAgICAgICAgaWYgZ3JvdXBzICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBmb3IgZyBpbiBncm91cHNcbiAgICAgICAgICAgICAgICBpZiBnLm5hbWUgPT0gJ2FkbWluJ1xuICAgICAgICAgICAgICAgICAgYWRtaW4gPSB0cnVlXG4gICAgICAgICAgIyBGSVhNRSBJIGRvbid0IGxpa2UgdXNpbmcgdXNlcm5hbWVcbiAgICAgICAgICBpZiB1c2VyLm5hbWUgaXMgJ2FkbWluJ1xuICAgICAgICAgICAgYWRtaW4gPSB0cnVlXG4gICAgICAgICAgaWYgYWRtaW5cbiAgICAgICAgICAgIHRjLmxpIC0+XG4gICAgICAgICAgICAgIGhyZWYgPSAnL2FkbWluJ1xuICAgICAgICAgICAgICBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICAgICAgICBpZiBwYXRobmFtZS5zcGxpdChocmVmKVswXSA9PSAnJ1xuICAgICAgICAgICAgICAgIGhyZWYgPSAnIydcbiAgICAgICAgICAgICAgdGMuYSBocmVmOmhyZWYsICdBZG1pbmlzdGVyIFNpdGUnXG4gICAgICAgICAgdGMubGkgLT5cbiAgICAgICAgICAgIHRjLmEgaHJlZjonL2xvZ291dCcsICdMb2dvdXQnXG5cbm1haW5fc2lkZWJhciA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5kaXYgJy5idG4tZ3JvdXAtdmVydGljYWwnLCAtPlxuICAgIGVudHJ5QnRuQ2xhc3MgPSAnLmJ0bi5idG4tc2Vjb25kYXJ5LnNpZGViYXItZW50cnktYnV0dG9uJ1xuICAgIGZvciBlbnRyeSBpbiBtb2RlbC5lbnRyaWVzXG4gICAgICB0Yy5kaXYgZW50cnlCdG5DbGFzcywgJ2J1dHRvbi11cmwnOmVudHJ5LnVybCwgLT5cbiAgICAgICAgdGMudGV4dCBlbnRyeS5uYW1lXG5cblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuZXhwb3J0IHtcbiAgdXNlcl9tZW51XG4gIG1haW5fc2lkZWJhclxuICB9XG4iXX0=
