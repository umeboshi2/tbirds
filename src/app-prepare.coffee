Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'


create_app = (appmodel) ->
  new Marionette.Application
    region: appmodel.get 'appRegion'
    onStart: ->
      # build routes
      # applets need to be required before app.start()
      frontdoor = appmodel.get 'frontdoor_app'
      MainChannel.request "applet:#{frontdoor}:route"
      hasUser = appmodel.get 'hasUser'
      if hasUser
        userprofile = appmodel.get 'userprofile_app'
        MainChannel.request "applet:#{userprofile}:route"
      for applet in appmodel.get 'applets'
        if applet?.appname
          signal = "applet:#{applet.appname}:route"
          #console.log "create signal #{signal}"
          MainChannel.request signal
      # build main page layout
      MainChannel.request 'mainpage:init', appmodel
      # start the approutes
      # the 'frontdoor_app' should handle the '' <blank>
      # route for the initial page.
      Backbone.history.start() unless Backbone.history.started
      
  

prepare_app = (appmodel) ->
  app = create_app appmodel
  # set more main:app handlers
  MainChannel.reply 'main:app:object', ->
    app
  return app 

module.exports = prepare_app


