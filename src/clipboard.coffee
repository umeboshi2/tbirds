$ = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'


class AppClipboard extends Backbone.Collection
  # initialize copy_status with "copy"
  copy_status: 'copy'

  _add_models: (models, command) ->
    @reset()
    @add models
    @copy_status = command
    
  copy: (models) ->
    @_add_models models, 'copy'

  cut: (models) ->
    @_add_models models, 'cut'

  paste: () ->
    # copy models
    models = @.models.slice()
    # empty collection
    @reset()
    # return models
    models

app_clipboard = new AppClipboard
MainChannel.reply 'main:app:app-clipboard', ->
  app_clipboard

module.exports =
  AppClipboard: AppClipboard
