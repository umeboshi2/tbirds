import Backbone from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

export default class EmptyView extends View
  template: tc.renderable ->
    tc.div '.jumbotron', ->
      tc.h1 ->
        tc.text 'Loading ...'
        tc.i '.fa.fa-spinner.fa-spin'
    
  
