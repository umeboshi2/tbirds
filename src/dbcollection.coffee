import Backbone from 'backbone'
import { MnObject } from 'backbone.marionette'

class DbCollection extends MnObject
  initialize: (options) ->
    collectionClass = options.collectionClass or Backbone.Collection
    @collection = new collectionClass
    @channelName = options.channelName or 'global'
  radioRequests: ->
    obj = {}
    name = @getOption 'modelName'
    name = name or 'model'
    prefix = "db:#{name}"
    obj["#{prefix}:collection"] = 'getCollection'
    obj["#{prefix}:new"] = 'newModel'
    obj["#{prefix}:add"] = 'addModel'
    obj["#{prefix}:update"] = 'updateModel'
    obj["#{prefix}:updatePassed"] = 'updatePassedModel'
    obj["#{prefix}:get"] = 'getModel'
    obj["#{prefix}:modelClass"] = 'getModelClass'
    obj["#{prefix}:collectionClass"] = 'getCollectionClass'
    return obj
  getCollection: ->
    return @collection
  newModel: (attributes) ->
    attributes = attributes or {}
    modelClass = @getOption 'modelClass'
    return new modelClass attributes
  addModel: (attributes) ->
    attributes = attributes or {}
    channel = @getChannel()
    name = @getOption 'modelName'
    model = @collection.create attributes
    model.once 'sync', ->
      channel.trigger "db:#{name}:inserted"
    @collection.add model
    return
  updatePassedModel: (model, newAttributes) ->
    channel = @getChannel()
    name = @getOption 'modelName'
    model.once 'sync', ->
      channel.trigger "db:#{name}:updated"
    model.set newAttributes
    model.save()
    return
  getModel: (id) ->
    model = @collection.get id
    if model is undefined
      return new @collection.model
        id: id
    else
      return model
  getModelClass: ->
    return @getOption 'modelClass'
  getCollectionClass: ->
    return @getOption 'collectionClass'

export default DbCollection
