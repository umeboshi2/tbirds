import Backbone from 'backbone'

import NavbarEntry from './entry-model'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'
NavbarChannel = Backbone.Radio.channel 'navbar'

class NavbarEntryCollection extends Backbone.Collection
  model: NavbarEntry


siteEntryCollection = new NavbarEntryCollection
userEntryCollection = new NavbarEntryCollection
appletEntryCollection = new NavbarEntryCollection

collections =
  site: siteEntryCollection
  user: userEntryCollection
  applet: appletEntryCollection

NavbarChannel.reply 'get-entries', (collection) ->
  return collections[collection]

  
NavbarChannel.reply 'new-navbar-entry', ->
  new NavbarEntry

NavbarChannel.reply 'add-entry', (atts, collection) ->
  collections[collection].add atts

NavbarChannel.reply 'add-entries', (olist, collection) ->
  collections[collection].add olist
