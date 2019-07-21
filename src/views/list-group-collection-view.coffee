import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

class ListGroupView extends Marionette.CollectionView
  tagName: 'ul'
  className: 'list-group'

export default ListGroupView
