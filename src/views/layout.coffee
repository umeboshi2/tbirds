import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import tc from 'teacup'
import ms from 'ms'

import ShowInitialEmptyContent from '../behaviors/show-initial-empty'

import SlideDownRegion from '../regions/slidedown'

if __useCssModules__
  require "../../sass/applet-layout.scss"

NavbarChannel = Backbone.Radio.channel 'navbar'

make_sidebar_template = (columns=3, size='sm', position='left') ->
  tc.renderable () ->
    if position is 'left'
      tc.div "#sidebar.col-#{size}-#{columns}.left-column"
    tc.div "#main-content.col-#{size}-#{12 - columns}"
    if position is 'right'
      tc.div "#sidebar.col-#{size}-#{columns}.right-column"


class BaseAppletLayout extends Marionette.View
  className: 'applet-container'
  onBeforeDestroy: ->
    entries = NavbarChannel.request 'get-entries', 'applet'
    entries.reset()
  behaviors:
    ShowInitialEmptyContent:
      behaviorClass: ShowInitialEmptyContent
  
class SidebarAppletLayout extends BaseAppletLayout
  template: make_sidebar_template()
  regions:
    sidebar: '#sidebar'
    content: '#main-content'

class ToolbarAppletLayout extends BaseAppletLayout
  #el: '#applet-content'
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
    
export {
  BaseAppletLayout
  SidebarAppletLayout
  ToolbarAppletLayout
  }
