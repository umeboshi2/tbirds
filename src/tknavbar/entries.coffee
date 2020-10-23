import $ from 'jquery'
import { Radio, history as BBhistory } from 'backbone'
import { View, CollectionView } from 'backbone.marionette'
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
  set_active: ->
    @$el.addClass 'active'
    return
  unset_active: ->
    @$el.removeClass 'active'
    return
    
class SingleEntryView extends BaseEntryView
  template: tc.renderable (entry) ->
    tc.a '.navbar-entry.nav-link', href:entry.url, ->
      if entry.icon
        tc.i entry.icon
        tc.text " "
      tc.text entry.label

class DropdownEntryView extends BaseEntryView
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
          tc.a '.navbar-entry.nav-link.dropdown-item', href:link.url, ->
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
    @navigateOnClickEntry cview, event
    return
    
  navigateOnClickEntry: (cview, event) ->
    # FIXME triggering click:entry
    # seems to leave dropdown open
    # this closes the navbar menu
    event.stopPropagation()
    if cview.$el.hasClass "show"
      #cview.$el.dropdown('toggle')
      cview.ui.toggleButton.click()
    target = event.target
    # check if icon is clicked
    if target.tagName is "I"
      #console.warn "clicked icon"
      anchor = $(target).parent()
    else
      anchor = $(target)
    # look at href and go there maybe?
    href = anchor.attr 'href'
    if href.split('/')[0] == ''
      window.location = href
    else
      BBhistory.navigate href, trigger: true
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



