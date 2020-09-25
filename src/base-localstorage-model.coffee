import _ from 'underscore'
import $ from 'jquery'
import { Model } from 'backbone'

console.warn "Use a better model"

class BaseLocalStorageModel extends Model
  initialize: ->
    @fetch()
    @on 'change', @save, @
  fetch: () ->
    @set JSON.parse localStorage.getItem @id
  save: (attributes, options) ->
    localStorage.setItem(@id, JSON.stringify(@toJSON()))
    return $.ajax
      success: options.success
      error: options.error
  destroy:  ->
    return localStorage.removeItem @id
  isEmpty: () ->
    return _.size @attributes <= 1

export default BaseLocalStorageModel
    
