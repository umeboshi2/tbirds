import Backbone from 'backbone'
import 'backbone.routefilter'
import 'backbone.marionette'
import AppRouter from 'marionette.approuter'

import navigate_to_url from './util/navigate-to-url'
import isObjectEmpty from './util/object-empty'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

class GroupAccessRouter extends AppRouter
  # Backbone.Router prototype overridden by
  # backbone.routefilter which provides "before" method
  before: (route, params) ->
    user = MainChannel.request 'main:app:decode-auth-token'
    hasAccess = false
    permittedGroups = @getOption('permittedGroups') or ['admin']
    if not isObjectEmpty user
      for gname in user.groups
        if gname in permittedGroups
          hasAccess = true
    if not hasAccess
      MessageChannel.request 'warning', 'Restricted access only!'
      navigate_to_url '/#frontdoor/login'

export default GroupAccessRouter


