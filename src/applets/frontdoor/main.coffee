import Backbone from 'backbone'
import 'backbone.marionette'
import AppRouter from 'marionette.approuter'
import TkApplet from '../../tkapplet'
import Controller from './controller'


MainChannel = Backbone.Radio.channel 'global'


class Router extends AppRouter
  appRoutes:
    '': 'frontdoor'
    'frontdoor': 'frontdoor'
    'frontdoor/view': 'frontdoor'
    'frontdoor/view/*name': 'viewPage'
    'frontdoor/login': 'showLogin'
    'frontdoor/logout': 'showLogout'
    'login': 'showLogin'
    'logout': 'showLogout'
    #FIXME
    'pages/:name': 'viewPage'
    
class Applet extends TkApplet
  Controller: Controller
  Router: Router

  onStop: ->
    console.log "(Child) Stopping frontdoor", @.isRunning()
    super()
  appletEntries: [
    {
      label: 'Main Menu'
      menu: appletEntries
    }
  ]

export default Applet
