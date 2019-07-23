import Backbone from 'backbone'
import { CollectionView } from 'backbone.marionette'

class ListGroupView extends CollectionView
  tagName: 'ul'
  className: 'list-group'

export default ListGroupView
