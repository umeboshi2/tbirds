import { Radio } from 'backbone'
import tc from 'teacup'
import ms from 'ms'

import { MainController } from 'tbirds/controllers'
import { ToolbarAppletLayout } from 'tbirds/views/layout'

MainChannel = Radio.channel 'global'
MessageChannel = Radio.channel 'messages'
AppChannel = Radio.channel 'testapplet'

class Controller extends MainController
  channelName: 'testapplet'
  layoutClass: ToolbarAppletLayout
  viewIndex: ->
    @setupLayoutIfNeeded()
    require.ensure [], () =>
      View = require('./views/index-view').default
      view = new View
        channelName: 'testapplet'
      @layout.showChildView 'content', view
    # name the chunk
    , 'testapplet-view-index'
      
export default Controller

