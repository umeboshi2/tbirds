import { View } from 'backbone.marionette'
import tc from 'teacup'
import marked from 'marked'

class MarkdownView extends View
  template: tc.renderable (model) ->
    tc.article '.document-view.content.col-sm-8.col-sm-offset-2', ->
      tc.div '.body', ->
        tc.raw marked model.content
export default MarkdownView
