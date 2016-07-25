Backbone = require 'backbone'

{ BaseLocalStorageCollection } = require 'lscollection'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'
ResourceChannel = Backbone.Radio.channel 'resources'

class Document extends Backbone.Model
  idAttribute: 'name'
  defaults:
    # name is pkey
    name: ''
    # doctype is either markdown or html
    doctype: 'markdown'
    title: ''
    content: ''
    description: ''
  

class DocumentCollection extends BaseLocalStorageCollection
  local_storage_key: 'ls_documents'
  model: Document
      
app_documents = new DocumentCollection
ResourceChannel.reply 'ls-documents', ->
  app_documents

if __DEV__
  window.app_documents = app_documents

ResourceChannel.reply 'get-ls-document', (name) ->
  app_documents.get name

ResourceChannel.reply 'delete-ls-document', (name, save = true) ->
  doc = app_documents.remove name
  if save
    app_documents.save()
  doc

make_new_doc = (name, title, content) ->
  new Document
    name: name
    title: title
    content: content

ResourceChannel.reply 'new-ls-document', (name, title, content) ->
  make_new_doc name, title, content
  

ResourceChannel.reply 'add-ls-document', (name, title, content) ->
  if __DEV__
    console.log "create document #{name}"
  doc = make_new_doc name, title, content
  if __DEV__
    console.log "Created doc", doc
    window.created_doc = doc
  app_documents.add doc
  app_documents.save()
  doc
  
  
module.exports =
  DocumentCollection: DocumentCollection

