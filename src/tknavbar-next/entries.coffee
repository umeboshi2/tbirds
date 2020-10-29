import $ from 'jquery'
import { Radio, history as BBhistory } from 'backbone'
import { View, CollectionView } from 'backbone.marionette'
import { RouterLink } from 'marionette.routing'
import tc from 'teacup'

import NavbarEntry from './entry-model'

MainChannel = Radio.channel 'global'

class BaseEntryView extends View
  model: NavbarEntry
  tagName: 'li'
  className: 'nav-item'
  templateContext: ->
    app: MainChannel.request 'main:app:object'
    currentUser: MainChannel.request 'main:app:currentUser'
  ui:
    entry: '.navbar-entry'
  triggers:
    'click @ui.entry': 'click:entry'
  events:
    'click @ui.entry': 'entryClicked'
  set_active: ->
    @$el.addClass 'active'
    return
  unset_active: ->
    @$el.removeClass 'active'
    return
  entryClicked: (event) ->
    console.log "model", @model
    
    
class SingleEntryView extends BaseEntryView
  template: tc.renderable (entry) ->
    tc.a '.navbar-entry.nav-link', href:entry.url, ->
      if entry.icon
        tc.i entry.icon
        tc.text " "
      tc.text entry.label

class DropdownEntryView extends BaseEntryView
  behaviors: [RouterLink]
  className: 'nav-item dropdown'
  ui: ->
    toggleButton: '.dropdown-toggle'
    entry: '.navbar-entry'
  modelEvents:
    change: 'render'
  template: tc.renderable (entry) ->
    tc.a '.nav-link.dropdown-toggle',
    role:'button', 'data-toggle':'dropdown', ->
      tc.text entry.label
      tc.b '.caret'
    tc.ul '.dropdown-menu', ->
      for link in entry.menu
        if link?.needUser and entry.currentUser.get('isGuest')
          continue
        tc.li ->
          aclass = '.navbar-entry.nav-link.dropdown-item'
          options = route:link.url, data:route:link.url
          tc.a aclass, options, ->
            if link.icon
              tc.i link.icon
              tc.text " "
            tc.text link.label

class NavbarEntryCollectionView extends CollectionView
  tagName: 'ul'
  className: 'navbar-nav'
  
  childView: (item) ->
    if item.has('menu') and item.get('menu')
      DropdownEntryView
    else
      SingleEntryView
      
  setAllInactive: ->
    @children.each (view) ->
      view.unset_active()
    return

  childViewEvents:
    'click:entry': 'onChildviewClickEntry'

  # onChildviewClickEntry will not be called
  # without setting @childViewEvents
  onChildviewClickEntry: (cview, event) ->
    @setAllInactive()
    cview.set_active()
    route = $(event.target).attr('data-route')
    router = MainChannel.request 'main:app:router'
    router.transitionTo(route)
    return

class NavbarEntriesView extends View
  ui:
    list: '.navbar-entries'
  regions:
    list: '@ui.list'
    userMenu: '#user-menu'
    search: '#form-search-container'
  onRender: ->
    view = new NavbarEntryCollectionView
      collection: @collection
    @showChildView 'list', view
    return
  template: tc.renderable ->
    tc.div '.navbar-entries.mr-auto'
  setAllInactive: ->
    view = @getChildView 'list'
    view.setAllInactive()
    return
   
    
export default NavbarEntriesView



