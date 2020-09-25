import { Behavior } from 'backbone.marionette'

class HasHeader extends Behavior
  onSetHeader: (text) ->
    @ui.header.text text

export default HasHeader
