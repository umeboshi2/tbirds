import tc from 'teacup'

########################################
# Menu Templates
########################################
user_menu = tc.renderable (user) ->
  name = user.name
  tc.ul '#user-menu.ctx-menu.nav.navbar-nav', ->
    tc.li '.dropdown', ->
      tc.a '.dropdown-toggle', 'data-toggle':'dropdown', ->
        if name == undefined
          tc.text "Guest"
        else
          tc.text name
        tc.b '.caret'
      tc.ul '.dropdown-menu', ->
        if name == undefined
          tc.li ->
            tc.a href:'#frontdoor/login', 'login'
        else
          tc.li ->
            tc.a href:'#profile', 'Profile Page'
          # we need a "get user info" from server
          # to populate this menu with 'admin' link
          # FIXME use "?." to help here
          admin = false
          unless name == undefined
            groups = user.groups
            if groups != undefined
              for g in groups
                if g.name == 'admin'
                  admin = true
          # FIXME I don't like using username
          if user.name is 'admin'
            admin = true
          if admin
            tc.li ->
              href = '/admin'
              pathname = window.location.pathname
              if pathname.split(href)[0] == ''
                href = '#'
              tc.a href:href, 'Administer Site'
          tc.li ->
            tc.a href:'/logout', 'Logout'

main_sidebar = tc.renderable (model) ->
  tc.div '.btn-group-vertical', ->
    for entry in model.entries
      tc.div '.btn.btn-secondary.sidebar-entry-button', 'button-url':entry.url, ->
        tc.text entry.name


########################################
export {
  user_menu
  main_sidebar
  }
