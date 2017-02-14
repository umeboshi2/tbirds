Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

NavTemplates = require '../templates/navbar'

class BootstrapNavBarView extends Backbone.Marionette.View
  template: NavTemplates.nav_pt
  regions:
    usermenu: '#user-menu'
    mainmenu: '#main-menu'
    

class MainSearchFormView extends Backbone.Marionette.View
  template: NavTemplates.nav_pt_search

  
module.exports =
  MainSearchFormView: MainSearchFormView
  BootstrapNavBarView: BootstrapNavBarView
  

