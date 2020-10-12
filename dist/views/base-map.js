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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYmFzZS1tYXAuanMiLCJzb3VyY2VzIjpbInZpZXdzL2Jhc2UtbWFwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLE9BQVAsTUFBQTs7QUFFQSxPQUFBOztBQUVNO0VBQU4sTUFBQSxRQUFBLFFBQXNCLEtBQXRCO0lBR0UsVUFBWSxDQUFBLENBQUE7QUFDZCxVQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUE7TUFBSSxLQUFBLEdBQVEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxVQUFYLENBQUEsSUFBMEI7TUFDbEMsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQUFBLElBQTJCO01BQ3BDLEtBQUEsR0FBUSxDQUFBLE9BQUEsQ0FBQSxDQUFVLEtBQVYsQ0FBQSxVQUFBLENBQUEsQ0FBNEIsTUFBNUIsRUFBQTtBQUNSLGFBQU87UUFBQSxLQUFBLEVBQU87TUFBUDtJQUpHOztJQUtaLFlBQWMsQ0FBQSxDQUFBO0FBQ2hCLFVBQUE7TUFBSSxJQUFDLENBQUEsR0FBRCxHQUFPLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUFYOztNQUVJLEtBQUEsR0FBUSxPQUFPLENBQUMsU0FBUixDQUFrQix5Q0FBbEI7YUFDUixLQUFLLENBQUMsS0FBTixDQUFZLElBQUMsQ0FBQSxHQUFiO0lBSlk7O0VBUmhCOztvQkFDRSxFQUFBLEdBQUk7O29CQUNKLFFBQUEsR0FBVTs7Ozs7O0FBWVosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgTGVhZmxldCBmcm9tICdsZWFmbGV0J1xuXG5pbXBvcnQgJ2xlYWZsZXQvZGlzdC9sZWFmbGV0LmNzcydcblxuY2xhc3MgTWFwVmlldyBleHRlbmRzIFZpZXdcbiAgaWQ6ICdtYXAtdmlldydcbiAgdGVtcGxhdGU6IGZhbHNlXG4gIGF0dHJpYnV0ZXM6IC0+XG4gICAgd2lkdGggPSBAZ2V0T3B0aW9uKCdtYXBXaWR0aCcpIG9yICcxMHJlbSdcbiAgICBoZWlnaHQgPSBAZ2V0T3B0aW9uKCdtYXBIZWlnaHQnKSBvciAnMTByZW0nXG4gICAgc3R5bGUgPSBcIndpZHRoOiAje3dpZHRofTsgaGVpZ2h0OiAje2hlaWdodH07XCJcbiAgICByZXR1cm4gc3R5bGU6IHN0eWxlXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBATWFwID0gTGVhZmxldC5tYXAgJ21hcC12aWV3J1xuICAgICN6b29tX2xldmVsID0gMTNcbiAgICBsYXllciA9IExlYWZsZXQudGlsZUxheWVyICdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnXG4gICAgbGF5ZXIuYWRkVG8gQE1hcFxuXG5leHBvcnQgZGVmYXVsdCBNYXBWaWV3XG5cbiJdfQ==
