var MapView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

MapView = (function() {
  class MapView extends Marionette.View {
    constructor() {
      super(...arguments);
      this.getCenter = this.getCenter.bind(this);
      this.onLocationError = this.onLocationError.bind(this);
      this.onLocationFound = this.onLocationFound.bind(this);
    }

    onDomRefresh() {
      var layer, zoom_level;
      this.Map = Leaflet.map('map-view');
      zoom_level = 13;
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

    getCenter(event) {
      boundMethodCheck(this, MapView);
      return console.log(this.Map.getCenter());
    }

    onLocationError(event) {
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

    onLocationFound(event) {
      boundMethodCheck(this, MapView);
      this.ui.statusMsg.text('location found');
      if (__DEV__) {
        return console.log("location found", event);
      }
    }

  };

  MapView.prototype.template = tc.renderable(function(model) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWFwdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvbWFwdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxPQUFBO0VBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBRUEsT0FBQTs7QUFFTTtFQUFOLE1BQUEsUUFBQSxRQUFzQixVQUFVLENBQUMsS0FBakM7OztVQXVCRSxDQUFBLGdCQUFBLENBQUE7VUFHQSxDQUFBLHNCQUFBLENBQUE7VUFTQSxDQUFBLHNCQUFBLENBQUE7OztJQXpCQSxZQUFjLENBQUEsQ0FBQTtBQUNaLFVBQUEsS0FBQSxFQUFBO01BQUEsSUFBQyxDQUFBLEdBQUQsR0FBTyxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVo7TUFDUCxVQUFBLEdBQWE7TUFDYixLQUFBLEdBQVEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IseUNBQWxCO01BQ1IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUEsR0FBYjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsRUFBTCxDQUFRLFNBQVIsRUFBbUIsSUFBQyxDQUFBLFNBQXBCO01BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxFQUFMLENBQVEsZUFBUixFQUF5QixJQUFDLENBQUEsZUFBMUI7TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEVBQUwsQ0FBUSxlQUFSLEVBQXlCLElBQUMsQ0FBQSxlQUExQjthQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUNFO1FBQUEsT0FBQSxFQUFTLElBQVQ7UUFDQSxLQUFBLEVBQU8sS0FEUDtRQUVBLE9BQUEsRUFBUztNQUZULENBREY7SUFSWTs7SUFhZCxTQUFXLENBQUMsS0FBRCxDQUFBOzZCQXZCUDthQXdCRixPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxDQUFBLENBQVo7SUFEUzs7SUFHWCxlQUFpQixDQUFDLEtBQUQsQ0FBQTtBQUNmLFVBQUEsTUFBQSxFQUFBOzZCQTNCRTtNQTJCRixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLHdCQUFuQjtNQUNBLElBQUcsT0FBSDtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFERjs7TUFFQSxRQUFBLEdBQVcsQ0FBQyxLQUFELEVBQVEsQ0FBQyxLQUFUO01BQ1gsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWEsUUFBYixFQUF1QixFQUF2QjtNQUNBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLFFBQWYsRUFBeUIsR0FBekI7YUFDVCxNQUFNLENBQUMsS0FBUCxDQUFhLElBQUMsQ0FBQSxHQUFkO0lBUGU7O0lBU2pCLGVBQWlCLENBQUMsS0FBRCxDQUFBOzZCQW5DYjtNQW9DRixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLGdCQUFuQjtNQUNBLElBQUcsT0FBSDtlQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsS0FBOUIsRUFERjs7SUFGZTs7RUFuQ25COztvQkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2FBQ2IsRUFBRSxDQUFDLEVBQUgsQ0FBTSxVQUFOO0lBRGEsQ0FBZjtJQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2FBQ2IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxQkFBUDtJQURhLENBQWY7V0FFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0I7TUFBQSxLQUFBLEVBQU07SUFBTixDQUF4QjtFQUxzQixDQUFkOztvQkFNVixFQUFBLEdBQ0U7SUFBQSxHQUFBLEVBQUssV0FBTDtJQUNBLFNBQUEsRUFBVztFQURYOzs7Ozs7QUFnQ0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgTGVhZmxldCBmcm9tICdsZWFmbGV0J1xuXG5pbXBvcnQgJ2xlYWZsZXQvZGlzdC9sZWFmbGV0LmNzcydcblxuY2xhc3MgTWFwVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgIHRjLmgyIFwiTWFwIFZpZXdcIlxuICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICB0Yy5kaXYgJy5jb2wuc3RhdHVzLW1lc3NhZ2UnXG4gICAgdGMuZGl2IFwiI21hcC12aWV3LnJvd1wiLCBzdHlsZTonaGVpZ2h0OjIwZW07J1xuICB1aTpcbiAgICBtYXA6ICcjbWFwLXZpZXcnXG4gICAgc3RhdHVzTXNnOiAnLnN0YXR1cy1tZXNzYWdlJ1xuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQE1hcCA9IExlYWZsZXQubWFwICdtYXAtdmlldydcbiAgICB6b29tX2xldmVsID0gMTNcbiAgICBsYXllciA9IExlYWZsZXQudGlsZUxheWVyICdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnXG4gICAgbGF5ZXIuYWRkVG8gQE1hcFxuICAgIEBNYXAub24gJ21vdmVlbmQnLCBAZ2V0Q2VudGVyXG4gICAgQE1hcC5vbiAnbG9jYXRpb25lcnJvcicsIEBvbkxvY2F0aW9uRXJyb3JcbiAgICBATWFwLm9uICdsb2NhdGlvbmZvdW5kJywgQG9uTG9jYXRpb25Gb3VuZFxuICAgIEBNYXAubG9jYXRlXG4gICAgICBzZXRWaWV3OiB0cnVlXG4gICAgICB3YXRjaDogZmFsc2VcbiAgICAgIHRpbWVvdXQ6IDEwMDBcbiAgICAgIFxuICBnZXRDZW50ZXI6IChldmVudCkgPT5cbiAgICBjb25zb2xlLmxvZyBATWFwLmdldENlbnRlcigpXG5cbiAgb25Mb2NhdGlvbkVycm9yOiAoZXZlbnQpID0+XG4gICAgQHVpLnN0YXR1c01zZy50ZXh0ICd1bmFibGUgdG8gZ2V0IGxvY2F0aW9uJ1xuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwidW5hYmxlIHRvIGdldCBsb2NhdGlvblwiXG4gICAgbG9jYXRpb24gPSBbMzEuMzMsIC04OS4yOF1cbiAgICBATWFwLnNldFZpZXcgbG9jYXRpb24sIDEzXG4gICAgY2lyY2xlID0gTGVhZmxldC5jaXJjbGUgbG9jYXRpb24sIDIwMFxuICAgIGNpcmNsZS5hZGRUbyBATWFwXG4gICAgICBcbiAgb25Mb2NhdGlvbkZvdW5kOiAoZXZlbnQpID0+XG4gICAgQHVpLnN0YXR1c01zZy50ZXh0ICdsb2NhdGlvbiBmb3VuZCdcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcImxvY2F0aW9uIGZvdW5kXCIsIGV2ZW50XG5cbmV4cG9ydCBkZWZhdWx0IE1hcFZpZXdcblxuIl19
