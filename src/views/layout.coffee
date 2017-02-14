Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

LayoutTemplates = require '../templates/layout'

{ BootstrapModalRegion } = require '../regions'

class MainPageLayout extends Backbone.Marionette.View
  template: LayoutTemplates.MainFluidLayoutTemplate
  regions:
    messages: '#messages'
    navbar: '#navbar-view-container'
    #modal: '#modal'
    modal: BootstrapModalRegion
    applet: '#applet-content'
    footer: '#footer'
    
    
    
class DefaultAppletLayout extends Backbone.Marionette.View
  template: LayoutTemplates.make_sidebar_template()
  regions:
    sidebar: '#sidebar'
    content: '#main-content'
  
module.exports =
  MainPageLayout: MainPageLayout
  DefaultAppletLayout: DefaultAppletLayout
