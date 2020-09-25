import { Collection } from 'backbone'


class BaseLocalStorageCollection extends Collection
  local_storage_key: null
  initialize: ->
    #console.log "initialize DocumentCollection"
    @fetch()
    @on 'change', @save, @
    
  fetch: ->
    #console.log 'fetching documents'
    docs = JSON.parse(localStorage.getItem(@local_storage_key)) || []
    @set docs

  # FIXME!
  save: ->
    #console.log 'saving documents'
    localStorage.setItem(@local_storage_key, JSON.stringify(@toJSON()))
    
  
  
export {
  BaseLocalStorageCollection
  }
