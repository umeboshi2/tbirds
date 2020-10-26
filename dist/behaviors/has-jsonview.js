var HasJsonView;

import {
  Behavior
} from 'backbone.marionette';

import JView from 'json-view';

HasJsonView = class HasJsonView extends Behavior {
  options() {
    return {
      jviewSelector: '.jsonview'
    };
  }

  ui() {
    return {
      jsonView: this.getOption('jviewSelector')
    };
  }

  onDomRefresh() {
    var obj;
    obj = this.view.model.toJSON();
    this.view.jsonView = new JView(obj);
    return this.ui.jsonView.prepend(this.view.jsonView.dom);
  }

};

export default HasJsonView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2hhcy1qc29udmlldy5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2hhcy1qc29udmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxLQUFQLE1BQUE7O0FBRU0sY0FBTixNQUFBLFlBQUEsUUFBMEIsU0FBMUI7RUFDRSxPQUFTLENBQUEsQ0FBQTtXQUNQO01BQUEsYUFBQSxFQUFlO0lBQWY7RUFETzs7RUFFVCxFQUFJLENBQUEsQ0FBQTtXQUNGO01BQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxTQUFELENBQVcsZUFBWDtJQUFWO0VBREU7O0VBRUosWUFBYyxDQUFBLENBQUE7QUFDaEIsUUFBQTtJQUFJLEdBQUEsR0FBTSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFaLENBQUE7SUFDTixJQUFDLENBQUEsSUFBSSxDQUFDLFFBQU4sR0FBaUIsSUFBSSxLQUFKLENBQVUsR0FBVjtXQUNqQixJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFiLENBQXFCLElBQUMsQ0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQXBDO0VBSFk7O0FBTGhCOztBQVVBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBKVmlldyBmcm9tICdqc29uLXZpZXcnXG5cbmNsYXNzIEhhc0pzb25WaWV3IGV4dGVuZHMgQmVoYXZpb3JcbiAgb3B0aW9uczogLT5cbiAgICBqdmlld1NlbGVjdG9yOiAnLmpzb252aWV3J1xuICB1aTogLT5cbiAgICBqc29uVmlldzogQGdldE9wdGlvbiAnanZpZXdTZWxlY3RvcidcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIG9iaiA9IEB2aWV3Lm1vZGVsLnRvSlNPTigpXG4gICAgQHZpZXcuanNvblZpZXcgPSBuZXcgSlZpZXcgb2JqXG4gICAgQHVpLmpzb25WaWV3LnByZXBlbmQgQHZpZXcuanNvblZpZXcuZG9tXG5cbmV4cG9ydCBkZWZhdWx0IEhhc0pzb25WaWV3XG4iXX0=
