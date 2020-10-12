var MapView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

MapView = (function() {
  class MapView extends View {
    constructor() {
      super(...arguments);
      this.getCenter = this.getCenter.bind(this);
      this.onLocationError = this.onLocationError.bind(this);
      this.onLocationFound = this.onLocationFound.bind(this);
    }

    onDomRefresh() {
      var layer;
      this.Map = Leaflet.map('map-view');
      //zoom_level = 13
      layer = Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
      layer.addTo(this.Map);
      this.Map.on('moveend', this.getCenter);
      this.Map.on('locationerror', this.onLocationError);
      this.Map.on('locationfound', this.onLocationFound);
      return this.Map.locate({
        setView: true,
        watch: false,
        timeout: 1000
      });
    }

    getCenter() {
      boundMethodCheck(this, MapView);
      return console.log(this.Map.getCenter());
    }

    onLocationError() {
      var circle, location;
      boundMethodCheck(this, MapView);
      this.ui.statusMsg.text('unable to get location');
      if (__DEV__) {
        console.log("unable to get location");
      }
      location = [31.33, -89.28];
      this.Map.setView(location, 13);
      circle = Leaflet.circle(location, 200);
      return circle.addTo(this.Map);
    }

    onLocationFound() {
      boundMethodCheck(this, MapView);
      this.ui.statusMsg.text('location found');
      if (__DEV__) {
        return console.log("location found", event);
      }
    }

  };

  MapView.prototype.template = tc.renderable(function() {
    tc.div('.row', function() {
      return tc.h2("Map View");
    });
    tc.div('.row', function() {
      return tc.div('.col.status-message');
    });
    return tc.div("#map-view.row", {
      style: 'height:20em;'
    });
  });

  MapView.prototype.ui = {
    map: '#map-view',
    statusMsg: '.status-message'
  };

  return MapView;

}).call(this);

export default MapView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWFwdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvbWFwdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxPQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLE9BQUE7O0FBRU07RUFBTixNQUFBLFFBQUEsUUFBc0IsS0FBdEI7OztVQXVCRSxDQUFBLGdCQUFBLENBQUE7VUFHQSxDQUFBLHNCQUFBLENBQUE7VUFTQSxDQUFBLHNCQUFBLENBQUE7OztJQXpCQSxZQUFjLENBQUEsQ0FBQTtBQUNoQixVQUFBO01BQUksSUFBQyxDQUFBLEdBQUQsR0FBTyxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosRUFBWDs7TUFFSSxLQUFBLEdBQVEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IseUNBQWxCO01BQ1IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUEsR0FBYjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsRUFBTCxDQUFRLFNBQVIsRUFBbUIsSUFBQyxDQUFBLFNBQXBCO01BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxFQUFMLENBQVEsZUFBUixFQUF5QixJQUFDLENBQUEsZUFBMUI7TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEVBQUwsQ0FBUSxlQUFSLEVBQXlCLElBQUMsQ0FBQSxlQUExQjthQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUNFO1FBQUEsT0FBQSxFQUFTLElBQVQ7UUFDQSxLQUFBLEVBQU8sS0FEUDtRQUVBLE9BQUEsRUFBUztNQUZULENBREY7SUFSWTs7SUFhZCxTQUFXLENBQUEsQ0FBQTs2QkF2QlA7YUF3QkYsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsQ0FBQSxDQUFaO0lBRFM7O0lBR1gsZUFBaUIsQ0FBQSxDQUFBO0FBQ25CLFVBQUEsTUFBQSxFQUFBOzZCQTNCTTtNQTJCRixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLHdCQUFuQjtNQUNBLElBQUcsT0FBSDtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFERjs7TUFFQSxRQUFBLEdBQVcsQ0FBQyxLQUFELEVBQVEsQ0FBQyxLQUFUO01BQ1gsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWEsUUFBYixFQUF1QixFQUF2QjtNQUNBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLFFBQWYsRUFBeUIsR0FBekI7YUFDVCxNQUFNLENBQUMsS0FBUCxDQUFhLElBQUMsQ0FBQSxHQUFkO0lBUGU7O0lBU2pCLGVBQWlCLENBQUEsQ0FBQTs2QkFuQ2I7TUFvQ0YsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBZCxDQUFtQixnQkFBbkI7TUFDQSxJQUFHLE9BQUg7ZUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaLEVBQThCLEtBQTlCLEVBREY7O0lBRmU7O0VBbkNuQjs7b0JBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7SUFDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQLEVBQWUsUUFBQSxDQUFBLENBQUE7YUFDYixFQUFFLENBQUMsRUFBSCxDQUFNLFVBQU47SUFEYSxDQUFmO0lBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQLEVBQWUsUUFBQSxDQUFBLENBQUE7YUFDYixFQUFFLENBQUMsR0FBSCxDQUFPLHFCQUFQO0lBRGEsQ0FBZjtXQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QjtNQUFBLEtBQUEsRUFBTTtJQUFOLENBQXhCO0VBTHNCLENBQWQ7O29CQU1WLEVBQUEsR0FDRTtJQUFBLEdBQUEsRUFBSyxXQUFMO0lBQ0EsU0FBQSxFQUFXO0VBRFg7Ozs7OztBQWdDSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgTGVhZmxldCBmcm9tICdsZWFmbGV0J1xuXG5pbXBvcnQgJ2xlYWZsZXQvZGlzdC9sZWFmbGV0LmNzcydcblxuY2xhc3MgTWFwVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgdGMuaDIgXCJNYXAgVmlld1wiXG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgIHRjLmRpdiAnLmNvbC5zdGF0dXMtbWVzc2FnZSdcbiAgICB0Yy5kaXYgXCIjbWFwLXZpZXcucm93XCIsIHN0eWxlOidoZWlnaHQ6MjBlbTsnXG4gIHVpOlxuICAgIG1hcDogJyNtYXAtdmlldydcbiAgICBzdGF0dXNNc2c6ICcuc3RhdHVzLW1lc3NhZ2UnXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBATWFwID0gTGVhZmxldC5tYXAgJ21hcC12aWV3J1xuICAgICN6b29tX2xldmVsID0gMTNcbiAgICBsYXllciA9IExlYWZsZXQudGlsZUxheWVyICdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnXG4gICAgbGF5ZXIuYWRkVG8gQE1hcFxuICAgIEBNYXAub24gJ21vdmVlbmQnLCBAZ2V0Q2VudGVyXG4gICAgQE1hcC5vbiAnbG9jYXRpb25lcnJvcicsIEBvbkxvY2F0aW9uRXJyb3JcbiAgICBATWFwLm9uICdsb2NhdGlvbmZvdW5kJywgQG9uTG9jYXRpb25Gb3VuZFxuICAgIEBNYXAubG9jYXRlXG4gICAgICBzZXRWaWV3OiB0cnVlXG4gICAgICB3YXRjaDogZmFsc2VcbiAgICAgIHRpbWVvdXQ6IDEwMDBcbiAgICAgIFxuICBnZXRDZW50ZXI6ID0+XG4gICAgY29uc29sZS5sb2cgQE1hcC5nZXRDZW50ZXIoKVxuXG4gIG9uTG9jYXRpb25FcnJvcjogPT5cbiAgICBAdWkuc3RhdHVzTXNnLnRleHQgJ3VuYWJsZSB0byBnZXQgbG9jYXRpb24nXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJ1bmFibGUgdG8gZ2V0IGxvY2F0aW9uXCJcbiAgICBsb2NhdGlvbiA9IFszMS4zMywgLTg5LjI4XVxuICAgIEBNYXAuc2V0VmlldyBsb2NhdGlvbiwgMTNcbiAgICBjaXJjbGUgPSBMZWFmbGV0LmNpcmNsZSBsb2NhdGlvbiwgMjAwXG4gICAgY2lyY2xlLmFkZFRvIEBNYXBcbiAgICAgIFxuICBvbkxvY2F0aW9uRm91bmQ6ID0+XG4gICAgQHVpLnN0YXR1c01zZy50ZXh0ICdsb2NhdGlvbiBmb3VuZCdcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcImxvY2F0aW9uIGZvdW5kXCIsIGV2ZW50XG5cbmV4cG9ydCBkZWZhdWx0IE1hcFZpZXdcblxuIl19
