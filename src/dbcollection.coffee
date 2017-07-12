Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

class DbCollection extends Marionette.Object
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
    @collection
  newModel: (attributes) ->
    attributes = attributes or {}
    new @modelClass attributes
  addModel: (attributes) ->
    attributes = attributes or {}
    channel = @getChannel()
    name = @getOption 'modelName'
    model = @collection.create attributes
    model.once 'sync', ->
      channel.trigger "db:#{name}:inserted"
    @collection.add model
  updatePassedModel: (model, newAttributes) ->
    channel = @getChannel()
    model.once 'sync', ->
      channel.trigger 'db:#{name}:updated'
    model.set newAttributes
    model.save()
  getModel: (id) ->
    model = @collection.get id
    if model is undefined
      return new @collection.model
        id: id
    else
      return model
  getModelClass: ->
    @getOption 'modelClass'
  getCollectionClass: ->
    @getOption 'collectionClass'

module.exports = DbCollection
