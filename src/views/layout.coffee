Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'
ms = require 'ms'

ShowInitialEmptyContent = require '../behaviors/show-initial-empty'

SlideDownRegion = require '../regions/slidedown'

make_sidebar_template = (columns=3, size='sm', position='left') ->
  tc.renderable () ->
    if position is 'left'
      tc.div "#sidebar.col-#{size}-#{columns}.left-column"
    tc.div "#main-content.col-#{size}-#{12 - columns}"
    if position is 'right'
      tc.div "#sidebar.col-#{size}-#{columns}.right-column"

class SidebarAppletLayout extends Backbone.Marionette.View
  template: make_sidebar_template()
  regions:
    sidebar: '#sidebar'
    content: '#main-content'

class ToolbarAppletLayout extends Backbone.Marionette.View
  #el: '#applet-content'
  className: 'applet-container'
  behaviors:
    ShowInitialEmptyContent:
      behaviorClass: ShowInitialEmptyContent
  template: tc.renderable () ->
    tc.div '.row', ->
      #tc.div  '#main-toolbar.col-sm-8.col-sm-offset-2'
      tc.div  '#main-toolbar'
    tc.div '.row', ->
      #tc.div '#main-content.col-sm-10.col-sm-offset-1'
      tc.div '#main-content'
  regions: ->
    region = new SlideDownRegion
      el: '#main-content'
    region.slide_speed = ms '.01s'
    content: region
    toolbar: '#main-toolbar'

module.exports =
  SidebarAppletLayout: SidebarAppletLayout
  ToolbarAppletLayout: ToolbarAppletLayout
  
