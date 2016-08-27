$ = require 'jquery'
jQuery = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'


class BaseAppModel extends Backbone.Model
  defaults:
    apiRoot: '/api/dev'
    brand:
      name: 'Brand'
      url: '/'
    container: 'container'
    # FIXME frontdoor_app has to be statically required in
    # application.coffee
    frontdoor_app: 'frontdoor'
    hasUser: false
    needUser: false
    frontdoor_sidebar:
      [
        {
          name: 'Home'
          url: '/'
        }
      ]
    applets: []
    # applet_menus is a property that provides the ability
    # to organize the applets in dropdown menus on the
    # navbar.
    applet_menus: []
    regions: {}
    routes: []


example_applet_menu_entry =
  label: 'Applets'
  # The applets array is a list of appnames
  # described in the applets array of the
  # app model.
  applets: [ 'foo', 'bar', 'another']
  # If applets is empty, then check if
  # the nav entry is a single applet.
  # Set this to the name of an applet
  # for a single applet entry.
  single_applet: false
  # if single_applet is false, then use
  # a simple navbar link.
  url: '/this/is/used/if/applets/is/empty/for/plain/link'

appregions = 
  root: 'body'
  navbar: '#navbar-view-container'
  messages: '#messages'
  footer: '#footer'
  modal: '#modal'
  applet: '#applet-content'
  # this region is on navbar-view
  # depends on #navbar-view-container
  usermenu: '#user-menu'
  search: '#form-search-container'

class DefaultAppModel extends BaseAppModel
  regions: appregions
  

module.exports =
  BaseAppModel: BaseAppModel
  DefaultAppModel: DefaultAppModel
  appregions: appregions
  
