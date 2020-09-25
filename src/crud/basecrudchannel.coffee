import { Model } from 'backbone'

create_model = (collection, options) ->
  model = collection.create()
  for key, value of options
    model.set key, value
  collection.add model
  collection.save()

get_model = (collection, id) ->
  model = collection.get id
  if model is undefined
    new collection.model
      id: id
  else
    model

make_dbclasses = (objname, url) ->
  modelClass = class DbModel extends Model
    urlRoot: url
  collectionClass = class DbCollection extends Model
    model: modelClass
    url: url
  if __DEV__ and DEBUG
    console.log "DbModel, DbCollection", DbModel, DbCollection
  obj =
    modelClass: modelClass
    collectionClass: collectionClass
  return obj
make_dbchannel = (channel, objname, modelClass, collectionClass) ->
  collection = new collectionClass
  channel.reply "#{objname}-collection", ->
    collection
  channel.reply "new-#{objname}", ->
    new modelClass
  channel.reply "add-#{objname}", (options) ->
    create_model collection options
  channel.reply "get-#{objname}", (id) ->
    get_model collection, id
  channel.reply "#{objname}-modelClass", ->
    modelClass
  channel.reply "#{objname}-collectionClass", ->
    collectionClass
    

export {
  make_dbclasses
  make_dbchannel
  }
