import { Behavior } from 'backbone.marionette'

export default class HasHeader extends Behavior
  onSetHeader: (text) ->
    @ui.header.text text
