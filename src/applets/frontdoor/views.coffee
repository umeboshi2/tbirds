import Backbone from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'
import marked from 'marked'

MainChannel = Backbone.Radio.channel 'global'

DefaultStaticDocumentTemplate = tc.renderable (doc) ->
  tc.article '.document-view.content', ->
    tc.div '.body', ->
      tc.raw marked doc.content


class FrontDoorMainView extends View
  template: DefaultStaticDocumentTemplate

export { FrontDoorMainView }

