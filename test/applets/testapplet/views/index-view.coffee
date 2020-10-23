import { Radio } from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

class MainView extends View
  template: tc.renderable (model) ->
    tc.div '.row.listview-list-entry', ->
      tc.h1 "#{model.appName} started."
  templateContext:
    appName: 'testapplet'

export default MainView
