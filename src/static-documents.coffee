import { extend } from 'lodash'
import { Model } from 'backbone'

createModelClass = (options) ->
  options = options or {}
  urlRoot = options.urlRoot or '/assets/documents'
  ext = options.extension or 'md'
  class DocModel extends Model
    url: ->
      return "#{urlRoot}/#{@id}.#{ext}"

    fetch: (options) ->
      options = extend options || {},
        dataType: 'text'
      super options

    parse: (response) ->
      return content: response
  return DocModel
  
export default createModelClass
