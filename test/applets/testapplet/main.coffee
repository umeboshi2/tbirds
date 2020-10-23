import { Radio } from 'backbone'
import Marionette from 'backbone.marionette'
import AppRouter from 'tbirds/routers/approuter'
import TkApplet from 'tbirds/tkapplet'
import capitalize from 'tbirds/util/capitalize'

import Controller from './controller'

appName = 'testapplet'

MainChannel = Radio.channel 'global'
AppChannel = Radio.channel appName


appletMenu = [
  {
    label: 'Main'
    url: '#testapplet'
    icon: '.fa.fa-star'
  }
  ]

class Router extends AppRouter
  channelName: appName
  appRoutes:
    'testapplet': 'viewIndex'
    
class Applet extends TkApplet
  Controller: Controller
  Router: Router
  appletEntries: [
    {
      label: "#{capitalize appName} Menu"
      menu: appletMenu
    }
  ]

export default Applet
