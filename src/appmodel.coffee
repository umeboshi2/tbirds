$ = require 'jquery'
jQuery = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'


class BaseAppModel extends Backbone.Model
  defaults:
    brand:
      name: 'Brand'
      url: '/'
    # FIXME frontdoor_app has to be statically required in
    # application.coffee
    frontdoor_app: 'frontdoor'
    hasUser: false
    frontdoor_sidebar:
      [
        {
          name: 'Home'
          url: '/'
        }
      ]
    applets: []
    regions: {}
    routes: []




appregions = 
  mainview: 'body'
  navbar: '#navbar-view-container'
  editbar: '#editor-bar-container'
  sidebar: '#sidebar'
  content: '#main-content'
  messages: '#messages'
  footer: '#footer'
  modal: '#modal'
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
  
