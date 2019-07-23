import Backbone from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'

class MapView extends View
  template: tc.renderable (model) ->
    tc.div '.row', ->
      tc.h2 "Map View"
    tc.div '.row', ->
      tc.div '.col.status-message'
    tc.div "#map-view.row", style:'height:20em;'
  ui:
    map: '#map-view'
    statusMsg: '.status-message'
  onDomRefresh: ->
    @Map = Leaflet.map 'map-view'
    zoom_level = 13
    layer = Leaflet.tileLayer 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    layer.addTo @Map
    @Map.on 'moveend', @getCenter
    @Map.on 'locationerror', @onLocationError
    @Map.on 'locationfound', @onLocationFound
    @Map.locate
      setView: true
      watch: false
      timeout: 1000
      
  getCenter: (event) =>
    console.log @Map.getCenter()

  onLocationError: (event) =>
    @ui.statusMsg.text 'unable to get location'
    if __DEV__
      console.log "unable to get location"
    location = [31.33, -89.28]
    @Map.setView location, 13
    circle = Leaflet.circle location, 200
    circle.addTo @Map
      
  onLocationFound: (event) =>
    @ui.statusMsg.text 'location found'
    if __DEV__
      console.log "location found", event

export default MapView

