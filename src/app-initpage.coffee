Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
require 'radio-shim'
  
require 'bootstrap'

#Models = require './models'
require './messages'

Views = require './views'



MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

initialize_page = (app) ->
  regions = MainChannel.request 'main:app:regions'
  appmodel = MainChannel.request 'main:app:appmodel'
  # create layout view
  layout_opts = {}
  if appmodel.has 'layout_template'
    layout_opts.template = appmodel.get 'layout_template'
  layout = new Views.MainPageLayout layout_opts
  # set the main layout view to create and show
  # the navbar when it is shown.  This assures us
  # that the $el is present in the DOM. 
  layout.on 'show', =>
    if appmodel.has 'navbar_viewclass'
      if __DEV__
        console.log "using custom navbar_viewclass"
      nbclass = appmodel.get 'navbar_viewclass'
    else
      nbclass = Views.BootstrapNavBarView
    navbar = new nbclass
      model: appmodel
    navbar_region = regions.get 'navbar'
    navbar_region.show navbar
    messages = new Views.MessagesView
      collection: MessageChannel.request 'messages'
    messages_region = regions.get 'messages'
    messages_region.show messages
  if __DEV__
    app.layout = layout
  # Show the main layout
  root = regions.get 'root'
  root.show layout

module.exports = initialize_page
