$ = require 'jquery'
_ = require 'underscore'
tc = require 'teacup'


########################################
# Layout Templates
########################################
BootstrapLayoutTemplate = tc.renderable () ->
  tc.div '#main-navbar.navbar.navbar-default.navbar-fixed-top',
  role:'navigation'
  tc.div '.container-fluid', ->
    tc.div '.row', ->
      tc.div '#sidebar.col-sm-2'
      tc.div '#main-content.col-sm-9'
  tc.div '#footer'
  tc.div '#modal'

BootstrapNoGridLayoutTemplate = tc.renderable () ->
  tc.div '#main-navbar.navbar.navbar-default.navbar-fixed-top',
  role:'navigation'
  #div '#header.listview-header'
  tc.div '.main-layout', ->
    tc.div '#sidebar'
    tc.div '#main-content'
  tc.div '#footer'
  tc.div '#modal'

########################################
module.exports =
  BootstrapLayoutTemplate: BootstrapLayoutTemplate
  BootstrapNoGridLayoutTemplate: BootstrapNoGridLayoutTemplate
