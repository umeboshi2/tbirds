Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'
ms = require 'ms'

LayoutTemplates = require '../templates/layout'
ShowInitialEmptyContent = require '../behaviors/show-initial-empty'

Regions = require '../regions'

class MainPageLayout extends Backbone.Marionette.View
  template: LayoutTemplates.MainFluidLayoutTemplate
  regions:
    messages: '#messages'
    navbar: '#navbar-view-container'
    #modal: '#modal'
    modal: Regions.BootstrapModalRegion
    applet: '#applet-content'
    footer: '#footer'
    
    
    
class SidebarAppletLayout extends Backbone.Marionette.View
  template: LayoutTemplates.make_sidebar_template()
  regions:
    sidebar: '#sidebar'
    content: '#main-content'


class ToolbarAppletLayout extends Backbone.Marionette.View
  behaviors:
    ShowInitialEmptyContent:
      behaviorClass: ShowInitialEmptyContent
  template: tc.renderable () ->
    tc.div '.row', ->
      tc.div  '#main-toolbar.col-sm-6.col-sm-offset-3'
    tc.div '.row', ->
      tc.div '#main-content.col-sm-10.col-sm-offset-1'
  regions: ->
    region = new Regions.SlideDownRegion
      el: '#main-content'
    region.slide_speed = ms '.01s'
    content: region
    toolbar: '#main-toolbar'

DefaultAppletLayout = SidebarAppletLayout    
module.exports =
  DefaultAppletLayout: DefaultAppletLayout
  MainPageLayout: MainPageLayout
  SidebarAppletLayout: SidebarAppletLayout
  ToolbarAppletLayout: ToolbarAppletLayout
  
