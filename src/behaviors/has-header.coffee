import Marionette from 'backbone.marionette'

export default class HasHeader extends Marionette.Behavior
  onSetHeader: (text) ->
    @ui.header.text text
