var RouterApp;

import RequireController from './require-controller';

import {
  AppletRouter
} from './applet-router-only';

import {
  App
} from 'marionette.toolkit';

RouterApp = class RouterApp extends App {
  initialize() {
    var appConfig, controller, router;
    appConfig = this.getOption('appConfig');
    controller = new RequireController();
    router = new AppletRouter({
      controller: controller
    });
    return this.router = router;
  }

  getRouter() {
    return this.router;
  }

  getController() {
    return this.router.controller;
  }

  onStart() {
    return this.router.controller.loadFrontDoor();
  }

};

export default RouterApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtyb3V0ZXIuanMiLCJzb3VyY2VzIjpbInRrcm91dGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8saUJBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsWUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEdBQVQ7Q0FBQSxNQUFBOztBQUVNLFlBQU4sTUFBQSxVQUFBLFFBQXdCLElBQXhCO0VBQ0UsVUFBWSxDQUFBLENBQUE7QUFDZCxRQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUE7SUFBSSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO0lBQ1osVUFBQSxHQUFhLElBQUksaUJBQUosQ0FBQTtJQUNiLE1BQUEsR0FBUyxJQUFJLFlBQUosQ0FDUDtNQUFBLFVBQUEsRUFBWTtJQUFaLENBRE87V0FFVCxJQUFDLENBQUEsTUFBRCxHQUFVO0VBTEE7O0VBT1osU0FBVyxDQUFBLENBQUE7QUFDVCxXQUFPLElBQUMsQ0FBQTtFQURDOztFQUVYLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsV0FBTyxJQUFDLENBQUEsTUFBTSxDQUFDO0VBREY7O0VBRWYsT0FBUyxDQUFBLENBQUE7V0FDUCxJQUFDLENBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFuQixDQUFBO0VBRE87O0FBWlg7O0FBZUEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlcXVpcmVDb250cm9sbGVyIGZyb20gJy4vcmVxdWlyZS1jb250cm9sbGVyJ1xuaW1wb3J0IHsgQXBwbGV0Um91dGVyIH0gZnJvbSAnLi9hcHBsZXQtcm91dGVyLW9ubHknXG5pbXBvcnQgeyBBcHAgfSBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbmNsYXNzIFJvdXRlckFwcCBleHRlbmRzIEFwcFxuICBpbml0aWFsaXplOiAtPlxuICAgIGFwcENvbmZpZyA9IEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICBjb250cm9sbGVyID0gbmV3IFJlcXVpcmVDb250cm9sbGVyXG4gICAgcm91dGVyID0gbmV3IEFwcGxldFJvdXRlclxuICAgICAgY29udHJvbGxlcjogY29udHJvbGxlclxuICAgIEByb3V0ZXIgPSByb3V0ZXJcblxuICBnZXRSb3V0ZXI6IC0+XG4gICAgcmV0dXJuIEByb3V0ZXJcbiAgZ2V0Q29udHJvbGxlcjogLT5cbiAgICByZXR1cm4gQHJvdXRlci5jb250cm9sbGVyXG4gIG9uU3RhcnQ6IC0+XG4gICAgQHJvdXRlci5jb250cm9sbGVyLmxvYWRGcm9udERvb3IoKVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXJBcHBcbiJdfQ==
