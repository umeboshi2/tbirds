var MapView;

import {
  View
} from 'backbone.marionette';

import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

MapView = (function() {
  class MapView extends View {
    attributes() {
      var height, style, width;
      width = this.getOption('mapWidth') || '10rem';
      height = this.getOption('mapHeight') || '10rem';
      style = `width: ${width}; height: ${height};`;
      return {
        style: style
      };
    }

    onDomRefresh() {
      var layer;
      this.Map = Leaflet.map('map-view');
      //zoom_level = 13
      layer = Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
      return layer.addTo(this.Map);
    }

  };

  MapView.prototype.id = 'map-view';

  MapView.prototype.template = false;

  return MapView;

}).call(this);

export default MapView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYmFzZS1tYXAuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Jhc2UtbWFwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLE9BQVAsTUFBQTs7QUFFQSxPQUFBOztBQUVNO0VBQU4sTUFBQSxRQUFBLFFBQXNCLEtBQXRCO0lBR0UsVUFBWSxDQUFBLENBQUE7QUFDVixVQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUE7TUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxVQUFYLENBQUEsSUFBMEI7TUFDbEMsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQUFBLElBQTJCO01BQ3BDLEtBQUEsR0FBUSxDQUFBLE9BQUEsQ0FBQSxDQUFVLEtBQVYsQ0FBZ0IsVUFBaEIsQ0FBQSxDQUE0QixNQUE1QixFQUFBO0FBQ1IsYUFBTztRQUFBLEtBQUEsRUFBTztNQUFQO0lBSkc7O0lBS1osWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBO01BQUEsSUFBQyxDQUFBLEdBQUQsR0FBTyxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosRUFBUDs7TUFFQSxLQUFBLEdBQVEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IseUNBQWxCO2FBQ1IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUEsR0FBYjtJQUpZOztFQVJoQjs7b0JBQ0UsRUFBQSxHQUFJOztvQkFDSixRQUFBLEdBQVU7Ozs7OztBQVlaLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IExlYWZsZXQgZnJvbSAnbGVhZmxldCdcblxuaW1wb3J0ICdsZWFmbGV0L2Rpc3QvbGVhZmxldC5jc3MnXG5cbmNsYXNzIE1hcFZpZXcgZXh0ZW5kcyBWaWV3XG4gIGlkOiAnbWFwLXZpZXcnXG4gIHRlbXBsYXRlOiBmYWxzZVxuICBhdHRyaWJ1dGVzOiAtPlxuICAgIHdpZHRoID0gQGdldE9wdGlvbignbWFwV2lkdGgnKSBvciAnMTByZW0nXG4gICAgaGVpZ2h0ID0gQGdldE9wdGlvbignbWFwSGVpZ2h0Jykgb3IgJzEwcmVtJ1xuICAgIHN0eWxlID0gXCJ3aWR0aDogI3t3aWR0aH07IGhlaWdodDogI3toZWlnaHR9O1wiXG4gICAgcmV0dXJuIHN0eWxlOiBzdHlsZVxuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQE1hcCA9IExlYWZsZXQubWFwICdtYXAtdmlldydcbiAgICAjem9vbV9sZXZlbCA9IDEzXG4gICAgbGF5ZXIgPSBMZWFmbGV0LnRpbGVMYXllciAnaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJ1xuICAgIGxheWVyLmFkZFRvIEBNYXBcblxuZXhwb3J0IGRlZmF1bHQgTWFwVmlld1xuXG4iXX0=
