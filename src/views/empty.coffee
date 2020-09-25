import { View } from 'backbone.marionette'
import tc from 'teacup'

class EmptyView extends View
  template: tc.renderable ->
    tc.div '.jumbotron', ->
      tc.h1 ->
        tc.text 'Loading ...'
        tc.i '.fa.fa-spinner.fa-spin'

export default EmptyView
