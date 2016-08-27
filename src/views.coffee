Backbone = require 'backbone'
Marionette = require 'backbone.marionette'


NavTemplates = require './templates/navbar'
LayoutTemplates = require './templates/layout'
MiscTemplates = require './templates/misc'
MenuTemplates = require './templates/menus'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

class MainPageLayout extends Backbone.Marionette.LayoutView
  template: LayoutTemplates.MainFluidLayoutTemplate

class DefaultAppletLayout extends Backbone.Marionette.LayoutView
  template: LayoutTemplates.make_sidebar_template()
  regions:
    sidebar: '#sidebar'
    content: '#main-content'
  
class BootstrapNavBarView extends Backbone.Marionette.LayoutView
  template: NavTemplates.nav_pt
  regions:
    #navbarview: '#navbar-view'
    usermenu: '#user-menu'
    mainmenu: '#main-menu'

class MainSearchFormView extends Backbone.Marionette.ItemView
  template: NavTemplates.nav_pt_search

class UserMenuView extends Backbone.Marionette.ItemView
  template: MenuTemplates.user_menu

class MessageView extends Backbone.Marionette.ItemView
  template:MiscTemplates.message_box
  ui:
    close_button: 'button.close'

  events:
    'click @ui.close_button': 'destroy_message'

  destroy_message: ->
    #console.log "Destroy message", @model.get("content")
    MessageChannel.request 'delete-message', @model
    

class MessagesView extends Backbone.Marionette.CollectionView
  childView: MessageView
  
  
module.exports =
  MainPageLayout: MainPageLayout
  DefaultAppletLayout: DefaultAppletLayout
  MainSearchFormView: MainSearchFormView
  BootstrapNavBarView: BootstrapNavBarView
  UserMenuView: UserMenuView
  MessagesView: MessagesView
  

