$ = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'



#https://github.com/goodeggs/teacup-camel-to-kebab
camel_to_kebab = (str) ->
  str.replace(/([A-Z])/g, ($1) -> "-#{$1.toLowerCase()}")

capitalize = (str) ->
  str.charAt(0).toUpperCase() + str.slice(1)

create_model = (collection, options) ->
  model = collection.create()
  for key, value of options
    model.set key, value
  collection.add model
  collection.save()

create_new_approuter = (channel, Router, Controller) ->
  controller = new Controller
  channel.reply 'main-controller', ->
    controller
  router = new Router
    controller: controller
  router
  
get_model = (collection, id) ->
  model = collection.get id
  if model is undefined
    new collection.model
      id: id
  else
    model
  
handle_newlines = (str) ->
  console.warn "handle_newlines being replaced by newline_2_br"
  str.replace(/(?:\r\n|\r|\n)/g, '<br />')

make_field_input_ui = (fieldlist) ->
  uiobject = {}
  for field in fieldlist
    uiobject[field] = "input[name=\"#{field}\"]"
  return uiobject

make_json_post_settings = (url, data, type='POST') ->
  settings =
    type: type
    url: url
    data: JSON.stringify data
    accepts: 'application/json'
    contentType: 'application/json'
  return settings

make_json_post = (url, data, type='POST') ->
  settings = make_json_post_settings url, data, type
  $.ajax settings

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

navigate_to_url = (url) ->
  if url.split('/')[0] == ''
    window.location = url
  else
    r = new Backbone.Router
    r.navigate url, trigger:true

newline_2_br = (str) ->
  str.replace(/(?:\r\n|\r|\n)/g, '<br />')

random_choice = (myArray) ->
  index = Math.floor(Math.random() * myArray.length)
  myArray[index]

remove_trailing_slashes = (path) ->
  path.replace /\/$/, ""

# FIXME: we really need the equivalent of pressing "home"
# http://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript-jquery
scroll_top_fast = ()  ->
  #$('html, body').animate {scrollTop: 0}, 'fast'
  window.scrollTo 0,0
  
scroll_top_fast_jquery = ()  ->
  $('html, body').animate {scrollTop: 0}, 'fast'

# use polyfill for String.endsWith if needed
#if not String.prototype?.endsWith
#  String.prototype.endsWith = string_endswith
string_endswith = (searchString, position) ->
  subjectString = @toString()
  if typeof position != 'number' or !isFinite(position) or Math.floor(position) != position or position > subjectString.length
    position = subjectString.length
  position -= searchString.length
  lastIndex = subjectString.indexOf(searchString, position)
  lastIndex != -1 and lastIndex == position

string_startswith = (searchString, position) ->
  position = position or 0
  return @substr(position, searchString, position) == searchString
  
#if !String::startsWith
#  String::startsWith = (searchString, position) ->
#    position = position or 0
#    @substr(position, searchString.length) == searchString

module.exports =
  camel_to_kebab: camel_to_kebab
  capitalize: capitalize
  create_model: create_model
  create_new_approuter: create_new_approuter
  get_model: get_model
  handle_newlines: handle_newlines
  make_field_input_ui: make_field_input_ui
  make_json_post_settings: make_json_post_settings
  make_json_post: make_json_post
  navbar_color_handlers: navbar_color_handlers
  navbar_set_active: navbar_set_active
  navigate_to_url: navigate_to_url
  random_choice: random_choice
  remove_trailing_slashes: remove_trailing_slashes
  scroll_top_fast: scroll_top_fast
  scroll_top_fast_jquery: scroll_top_fast_jquery
  string_endswith: string_endswith
  string_startswith: string_startswith
  





