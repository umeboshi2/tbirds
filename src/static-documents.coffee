import _ from 'underscore'
import Backbone from 'backbone'

createModelClass = (options) ->
  options = options or {}
  urlRoot = options.urlRoot or '/assets/documents'
  ext = options.extension or 'md'
  class DocModel extends Backbone.Model
    url: ->
      return "#{urlRoot}/#{@id}.#{ext}"

    fetch: (options) ->
      options = _.extend options || {},
        dataType: 'text'
      super options

    parse: (response) ->
      return content: response
  return DocModel
  
export default createModelClass
