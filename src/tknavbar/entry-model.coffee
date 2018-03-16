import Backbone from 'backbone'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

export default class NavbarEntry extends Backbone.Model
  defaults:
    label: 'App Label'
    url: '#app'
    single_applet: false
    applets: []
    urls: []
