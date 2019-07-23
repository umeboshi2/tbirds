var MapView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import Backbone from 'backbone';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWFwdmlldy5qcyIsInNvdXJjZXMiOlsidmlld3MvbWFwdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxPQUFBO0VBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sT0FBUCxNQUFBOztBQUVBLE9BQUE7O0FBRU07RUFBTixNQUFBLFFBQUEsUUFBc0IsS0FBdEI7OztVQXVCRSxDQUFBLGdCQUFBLENBQUE7VUFHQSxDQUFBLHNCQUFBLENBQUE7VUFTQSxDQUFBLHNCQUFBLENBQUE7OztJQXpCQSxZQUFjLENBQUEsQ0FBQTtBQUNaLFVBQUEsS0FBQSxFQUFBO01BQUEsSUFBQyxDQUFBLEdBQUQsR0FBTyxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVo7TUFDUCxVQUFBLEdBQWE7TUFDYixLQUFBLEdBQVEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IseUNBQWxCO01BQ1IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUEsR0FBYjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsRUFBTCxDQUFRLFNBQVIsRUFBbUIsSUFBQyxDQUFBLFNBQXBCO01BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxFQUFMLENBQVEsZUFBUixFQUF5QixJQUFDLENBQUEsZUFBMUI7TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEVBQUwsQ0FBUSxlQUFSLEVBQXlCLElBQUMsQ0FBQSxlQUExQjthQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUNFO1FBQUEsT0FBQSxFQUFTLElBQVQ7UUFDQSxLQUFBLEVBQU8sS0FEUDtRQUVBLE9BQUEsRUFBUztNQUZULENBREY7SUFSWTs7SUFhZCxTQUFXLENBQUMsS0FBRCxDQUFBOzZCQXZCUDthQXdCRixPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxDQUFBLENBQVo7SUFEUzs7SUFHWCxlQUFpQixDQUFDLEtBQUQsQ0FBQTtBQUNmLFVBQUEsTUFBQSxFQUFBOzZCQTNCRTtNQTJCRixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLHdCQUFuQjtNQUNBLElBQUcsT0FBSDtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFERjs7TUFFQSxRQUFBLEdBQVcsQ0FBQyxLQUFELEVBQVEsQ0FBQyxLQUFUO01BQ1gsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWEsUUFBYixFQUF1QixFQUF2QjtNQUNBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLFFBQWYsRUFBeUIsR0FBekI7YUFDVCxNQUFNLENBQUMsS0FBUCxDQUFhLElBQUMsQ0FBQSxHQUFkO0lBUGU7O0lBU2pCLGVBQWlCLENBQUMsS0FBRCxDQUFBOzZCQW5DYjtNQW9DRixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQW1CLGdCQUFuQjtNQUNBLElBQUcsT0FBSDtlQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsS0FBOUIsRUFERjs7SUFGZTs7RUFuQ25COztvQkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2FBQ2IsRUFBRSxDQUFDLEVBQUgsQ0FBTSxVQUFOO0lBRGEsQ0FBZjtJQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2FBQ2IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxQkFBUDtJQURhLENBQWY7V0FFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0I7TUFBQSxLQUFBLEVBQU07SUFBTixDQUF4QjtFQUxzQixDQUFkOztvQkFNVixFQUFBLEdBQ0U7SUFBQSxHQUFBLEVBQUssV0FBTDtJQUNBLFNBQUEsRUFBVztFQURYOzs7Ozs7QUFnQ0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IExlYWZsZXQgZnJvbSAnbGVhZmxldCdcblxuaW1wb3J0ICdsZWFmbGV0L2Rpc3QvbGVhZmxldC5jc3MnXG5cbmNsYXNzIE1hcFZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgdGMuaDIgXCJNYXAgVmlld1wiXG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgIHRjLmRpdiAnLmNvbC5zdGF0dXMtbWVzc2FnZSdcbiAgICB0Yy5kaXYgXCIjbWFwLXZpZXcucm93XCIsIHN0eWxlOidoZWlnaHQ6MjBlbTsnXG4gIHVpOlxuICAgIG1hcDogJyNtYXAtdmlldydcbiAgICBzdGF0dXNNc2c6ICcuc3RhdHVzLW1lc3NhZ2UnXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBATWFwID0gTGVhZmxldC5tYXAgJ21hcC12aWV3J1xuICAgIHpvb21fbGV2ZWwgPSAxM1xuICAgIGxheWVyID0gTGVhZmxldC50aWxlTGF5ZXIgJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZydcbiAgICBsYXllci5hZGRUbyBATWFwXG4gICAgQE1hcC5vbiAnbW92ZWVuZCcsIEBnZXRDZW50ZXJcbiAgICBATWFwLm9uICdsb2NhdGlvbmVycm9yJywgQG9uTG9jYXRpb25FcnJvclxuICAgIEBNYXAub24gJ2xvY2F0aW9uZm91bmQnLCBAb25Mb2NhdGlvbkZvdW5kXG4gICAgQE1hcC5sb2NhdGVcbiAgICAgIHNldFZpZXc6IHRydWVcbiAgICAgIHdhdGNoOiBmYWxzZVxuICAgICAgdGltZW91dDogMTAwMFxuICAgICAgXG4gIGdldENlbnRlcjogKGV2ZW50KSA9PlxuICAgIGNvbnNvbGUubG9nIEBNYXAuZ2V0Q2VudGVyKClcblxuICBvbkxvY2F0aW9uRXJyb3I6IChldmVudCkgPT5cbiAgICBAdWkuc3RhdHVzTXNnLnRleHQgJ3VuYWJsZSB0byBnZXQgbG9jYXRpb24nXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJ1bmFibGUgdG8gZ2V0IGxvY2F0aW9uXCJcbiAgICBsb2NhdGlvbiA9IFszMS4zMywgLTg5LjI4XVxuICAgIEBNYXAuc2V0VmlldyBsb2NhdGlvbiwgMTNcbiAgICBjaXJjbGUgPSBMZWFmbGV0LmNpcmNsZSBsb2NhdGlvbiwgMjAwXG4gICAgY2lyY2xlLmFkZFRvIEBNYXBcbiAgICAgIFxuICBvbkxvY2F0aW9uRm91bmQ6IChldmVudCkgPT5cbiAgICBAdWkuc3RhdHVzTXNnLnRleHQgJ2xvY2F0aW9uIGZvdW5kJ1xuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwibG9jYXRpb24gZm91bmRcIiwgZXZlbnRcblxuZXhwb3J0IGRlZmF1bHQgTWFwVmlld1xuXG4iXX0=
