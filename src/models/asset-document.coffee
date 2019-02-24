import Backbone from 'backbone'

class TextAssetDocument extends Backbone.Model
  fetch: (options) ->
    options = options or {}
    options.dataType = 'text'
    super options
  parse: (response) ->
    content: response

export default TextAssetDocument
