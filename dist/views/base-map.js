var MapView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

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
      var layer, zoom_level;
      this.Map = Leaflet.map('map-view');
      zoom_level = 13;
      layer = Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
      return layer.addTo(this.Map);
    }

  };

  MapView.prototype.id = 'map-view';

  MapView.prototype.template = false;

  return MapView;

}).call(this);

export default MapView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYmFzZS1tYXAuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Jhc2UtbWFwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFDQSxPQUFPLE9BQVAsTUFBQTs7QUFFQSxPQUFBOztBQUVNO0VBQU4sTUFBQSxRQUFBLFFBQXNCLEtBQXRCO0lBR0UsVUFBWSxDQUFBLENBQUE7QUFDVixVQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUE7TUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxVQUFYLENBQUEsSUFBMEI7TUFDbEMsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQUFBLElBQTJCO01BQ3BDLEtBQUEsR0FBUSxDQUFBLE9BQUEsQ0FBQSxDQUFVLEtBQVYsQ0FBZ0IsVUFBaEIsQ0FBQSxDQUE0QixNQUE1QixFQUFBO0FBQ1IsYUFBTztRQUFBLEtBQUEsRUFBTztNQUFQO0lBSkc7O0lBS1osWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBLEtBQUEsRUFBQTtNQUFBLElBQUMsQ0FBQSxHQUFELEdBQU8sT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaO01BQ1AsVUFBQSxHQUFhO01BQ2IsS0FBQSxHQUFRLE9BQU8sQ0FBQyxTQUFSLENBQWtCLHlDQUFsQjthQUNSLEtBQUssQ0FBQyxLQUFOLENBQVksSUFBQyxDQUFBLEdBQWI7SUFKWTs7RUFSaEI7O29CQUNFLEVBQUEsR0FBSTs7b0JBQ0osUUFBQSxHQUFVOzs7Ozs7QUFZWixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgTGVhZmxldCBmcm9tICdsZWFmbGV0J1xuXG5pbXBvcnQgJ2xlYWZsZXQvZGlzdC9sZWFmbGV0LmNzcydcblxuY2xhc3MgTWFwVmlldyBleHRlbmRzIFZpZXdcbiAgaWQ6ICdtYXAtdmlldydcbiAgdGVtcGxhdGU6IGZhbHNlXG4gIGF0dHJpYnV0ZXM6IC0+XG4gICAgd2lkdGggPSBAZ2V0T3B0aW9uKCdtYXBXaWR0aCcpIG9yICcxMHJlbSdcbiAgICBoZWlnaHQgPSBAZ2V0T3B0aW9uKCdtYXBIZWlnaHQnKSBvciAnMTByZW0nXG4gICAgc3R5bGUgPSBcIndpZHRoOiAje3dpZHRofTsgaGVpZ2h0OiAje2hlaWdodH07XCJcbiAgICByZXR1cm4gc3R5bGU6IHN0eWxlXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBATWFwID0gTGVhZmxldC5tYXAgJ21hcC12aWV3J1xuICAgIHpvb21fbGV2ZWwgPSAxM1xuICAgIGxheWVyID0gTGVhZmxldC50aWxlTGF5ZXIgJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZydcbiAgICBsYXllci5hZGRUbyBATWFwXG5cbmV4cG9ydCBkZWZhdWx0IE1hcFZpZXdcblxuIl19
