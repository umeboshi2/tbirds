$ = require 'jquery'
_ = require 'underscore'
tc = require 'teacup'


# Main Templates must use teacup.
# The template must be a teacup.renderable, 
# and accept a layout model as an argument.

########################################
# Templates
########################################
_MainLayoutTemplate = tc.renderable (container) ->
  tc.div '#navbar-view-container'
  #tc.div '#editor-bar-container'
  tc.div ".#{container}", ->
    tc.div '.row', ->
      tc.div '.col-md-10', ->
        tc.div '#messages'
    tc.div '.row', ->
      tc.div '#main-content.col-md-9'
      tc.div '#sidebar.col-md-3.right-column'
  tc.div '#footer'
  tc.div '#modal'

MainLayoutTemplate = ->
  _MainLayoutTemplate 'container'

MainFluidLayoutTemplate = ->
  _MainLayoutTemplate 'container-fluid'
  

MainContentTemplate = tc.renderable (doc) ->
  atts = doc.data.attributes
  tc.article '.document-view.content', ->
    tc.h1 atts.title
    tc.p '.lead', atts.description
    tc.div '.body', ->
      tc.raw atts.body

########################################
module.exports =
  MainLayoutTemplate: MainLayoutTemplate
  MainFluidLayoutTemplate: MainFluidLayoutTemplate
  MainContentTemplate: MainContentTemplate

