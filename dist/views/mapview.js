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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWFwdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvbWFwdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxPQUFBO0VBQUE7O0FBQUEsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLE9BQUE7O0FBRU07RUFBTixNQUFBLFFBQUEsUUFBc0IsS0FBdEI7OztVQXVCRSxDQUFBLGdCQUFBLENBQUE7VUFHQSxDQUFBLHNCQUFBLENBQUE7VUFTQSxDQUFBLHNCQUFBLENBQUE7OztJQXpCQSxZQUFjLENBQUEsQ0FBQTtBQUNaLFVBQUE7TUFBQSxJQUFDLENBQUEsR0FBRCxHQUFPLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUFQOztNQUVBLEtBQUEsR0FBUSxPQUFPLENBQUMsU0FBUixDQUFrQix5Q0FBbEI7TUFDUixLQUFLLENBQUMsS0FBTixDQUFZLElBQUMsQ0FBQSxHQUFiO01BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxFQUFMLENBQVEsU0FBUixFQUFtQixJQUFDLENBQUEsU0FBcEI7TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEVBQUwsQ0FBUSxlQUFSLEVBQXlCLElBQUMsQ0FBQSxlQUExQjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsRUFBTCxDQUFRLGVBQVIsRUFBeUIsSUFBQyxDQUFBLGVBQTFCO2FBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQ0U7UUFBQSxPQUFBLEVBQVMsSUFBVDtRQUNBLEtBQUEsRUFBTyxLQURQO1FBRUEsT0FBQSxFQUFTO01BRlQsQ0FERjtJQVJZOztJQWFkLFNBQVcsQ0FBQSxDQUFBOzZCQXZCUDthQXdCRixPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxDQUFBLENBQVo7SUFEUzs7SUFHWCxlQUFpQixDQUFBLENBQUE7QUFDZixVQUFBLE1BQUEsRUFBQTs2QkEzQkU7TUEyQkYsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBZCxDQUFtQix3QkFBbkI7TUFDQSxJQUFHLE9BQUg7UUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLHdCQUFaLEVBREY7O01BRUEsUUFBQSxHQUFXLENBQUMsS0FBRCxFQUFRLENBQUMsS0FBVDtNQUNYLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxDQUFhLFFBQWIsRUFBdUIsRUFBdkI7TUFDQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCO2FBQ1QsTUFBTSxDQUFDLEtBQVAsQ0FBYSxJQUFDLENBQUEsR0FBZDtJQVBlOztJQVNqQixlQUFpQixDQUFBLENBQUE7NkJBbkNiO01Bb0NGLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQWQsQ0FBbUIsZ0JBQW5CO01BQ0EsSUFBRyxPQUFIO2VBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixLQUE5QixFQURGOztJQUZlOztFQW5DbkI7O29CQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2FBQ2IsRUFBRSxDQUFDLEVBQUgsQ0FBTSxVQUFOO0lBRGEsQ0FBZjtJQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2FBQ2IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxQkFBUDtJQURhLENBQWY7V0FFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0I7TUFBQSxLQUFBLEVBQU07SUFBTixDQUF4QjtFQUxzQixDQUFkOztvQkFNVixFQUFBLEdBQ0U7SUFBQSxHQUFBLEVBQUssV0FBTDtJQUNBLFNBQUEsRUFBVztFQURYOzs7Ozs7QUFnQ0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IExlYWZsZXQgZnJvbSAnbGVhZmxldCdcblxuaW1wb3J0ICdsZWFmbGV0L2Rpc3QvbGVhZmxldC5jc3MnXG5cbmNsYXNzIE1hcFZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgIHRjLmgyIFwiTWFwIFZpZXdcIlxuICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICB0Yy5kaXYgJy5jb2wuc3RhdHVzLW1lc3NhZ2UnXG4gICAgdGMuZGl2IFwiI21hcC12aWV3LnJvd1wiLCBzdHlsZTonaGVpZ2h0OjIwZW07J1xuICB1aTpcbiAgICBtYXA6ICcjbWFwLXZpZXcnXG4gICAgc3RhdHVzTXNnOiAnLnN0YXR1cy1tZXNzYWdlJ1xuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQE1hcCA9IExlYWZsZXQubWFwICdtYXAtdmlldydcbiAgICAjem9vbV9sZXZlbCA9IDEzXG4gICAgbGF5ZXIgPSBMZWFmbGV0LnRpbGVMYXllciAnaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJ1xuICAgIGxheWVyLmFkZFRvIEBNYXBcbiAgICBATWFwLm9uICdtb3ZlZW5kJywgQGdldENlbnRlclxuICAgIEBNYXAub24gJ2xvY2F0aW9uZXJyb3InLCBAb25Mb2NhdGlvbkVycm9yXG4gICAgQE1hcC5vbiAnbG9jYXRpb25mb3VuZCcsIEBvbkxvY2F0aW9uRm91bmRcbiAgICBATWFwLmxvY2F0ZVxuICAgICAgc2V0VmlldzogdHJ1ZVxuICAgICAgd2F0Y2g6IGZhbHNlXG4gICAgICB0aW1lb3V0OiAxMDAwXG4gICAgICBcbiAgZ2V0Q2VudGVyOiA9PlxuICAgIGNvbnNvbGUubG9nIEBNYXAuZ2V0Q2VudGVyKClcblxuICBvbkxvY2F0aW9uRXJyb3I6ID0+XG4gICAgQHVpLnN0YXR1c01zZy50ZXh0ICd1bmFibGUgdG8gZ2V0IGxvY2F0aW9uJ1xuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwidW5hYmxlIHRvIGdldCBsb2NhdGlvblwiXG4gICAgbG9jYXRpb24gPSBbMzEuMzMsIC04OS4yOF1cbiAgICBATWFwLnNldFZpZXcgbG9jYXRpb24sIDEzXG4gICAgY2lyY2xlID0gTGVhZmxldC5jaXJjbGUgbG9jYXRpb24sIDIwMFxuICAgIGNpcmNsZS5hZGRUbyBATWFwXG4gICAgICBcbiAgb25Mb2NhdGlvbkZvdW5kOiA9PlxuICAgIEB1aS5zdGF0dXNNc2cudGV4dCAnbG9jYXRpb24gZm91bmQnXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJsb2NhdGlvbiBmb3VuZFwiLCBldmVudFxuXG5leHBvcnQgZGVmYXVsdCBNYXBWaWV3XG5cbiJdfQ==
