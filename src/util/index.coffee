$ = require 'jquery'
Backbone = require 'backbone'

create_new_approuter = (channel, Router, Controller) ->
  controller = new Controller
  channel.reply 'main-controller', ->
    controller
  router = new Router
    controller: controller
  router
  
# These are handlers to retrieve the colors
# from the navbars, and are used to create
# the default color for the fullcalendar
# events.
navbar_color_handlers = (channel, selector) ->
  channel.reply 'get-navbar-color', ->
    navbar = $ selector
    navbar.css 'color'
  channel.reply 'get-navbar-bg-color', ->
    navbar = $ selector
    navbar.css 'background-color'
    
navbar_set_active = (path) ->
  path_top = path.split('/')[0]
  # FIXME this should be attached to view or
  # be a behavior
  for li in $('#navbar-view li')
    liq = $ li
    liq.removeClass('active')
    if path_top == liq.attr('appname')
      liq.addClass('active')

#if !String::startsWith
#  String::startsWith = (searchString, position) ->
#    position = position or 0
#    @substr(position, searchString.length) == searchString

module.exports =
  create_new_approuter: create_new_approuter
  navbar_color_handlers: navbar_color_handlers
  navbar_set_active: navbar_set_active

