import { View } from 'backbone.marionette'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'

class MapView extends View
  id: 'map-view'
  template: false
  attributes: ->
    width = @getOption('mapWidth') or '10rem'
    height = @getOption('mapHeight') or '10rem'
    style = "width: #{width}; height: #{height};"
    return style: style
  onDomRefresh: ->
    @Map = Leaflet.map 'map-view'
    #zoom_level = 13
    layer = Leaflet.tileLayer 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    layer.addTo @Map

export default MapView

