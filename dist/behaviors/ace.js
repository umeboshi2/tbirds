var HasAceEditor, MainChannel;

import Backbone from 'backbone';

import {
  Behavior
} from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

import ace from 'brace';

import html_mode from 'brace/mode/html';

import twilight_theme from 'brace/theme/twilight';

import markdown_mode from 'brace/mode/markdown';

({
  ACEDEFAULTS: {
    editorTheme: 'ace/theme/twilight',
    editorMode: 'ace/mode/html'
  }
});

HasAceEditor = (function() {
  
  // view must have editorTheme and editorMode set
  // or should?
  class HasAceEditor extends Behavior {
    setEditorMode(mode) {
      var session;
      session = this.view.editor.getSession();
      return session.setMode(`ace/mode/${mode}`);
    }

    onDomRefresh() {
      var defaults, doctype, ref;
      this.view.editor = ace.edit(this.view.ui.editor.attr('id'));
      // disable warning:
      // Automatically scrolling cursor into view after selection change
      // this will be disabled in the next version
      // set editor.$blockScrolling = Infinity to disable this message
      defaults = this.getOption('defaults');
      this.view.editor.$blockScrolling = 2e308;
      this.view.editor.setTheme(defaults.editorTheme);
      if (this.view.model.has('doctype')) {
        doctype = this.view.model.get('doctype');
        if (__DEV__) {
          console.log("doctype is", doctype);
        }
        this.setEditorMode(doctype);
      }
      if ((ref = this.view) != null ? ref.afterDomRefresh : void 0) {
        return this.view.afterDomRefresh();
      }
    }

  };

  HasAceEditor.prototype.ui = {
    editor: '#ace-editor'
  };

  HasAceEditor.prototype.defaults = {
    editorTheme: 'ace/theme/twilight',
    editorMode: 'markdown'
  };

  return HasAceEditor;

}).call(this);

export default HasAceEditor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2FjZS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2FjZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRWQsT0FBTyxHQUFQLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBQ0EsT0FBTyxjQUFQLE1BQUE7O0FBQ0EsT0FBTyxhQUFQLE1BQUE7O0FBRUEsQ0FBQTtFQUFBLFdBQUEsRUFDRTtJQUFBLFdBQUEsRUFBYSxvQkFBYjtJQUNBLFVBQUEsRUFBWTtFQURaO0FBREYsQ0FBQTs7QUFNTTs7OztFQUFOLE1BQUEsYUFBQSxRQUEyQixTQUEzQjtJQU9FLGFBQWUsQ0FBQyxJQUFELENBQUE7QUFDYixVQUFBO01BQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQWIsQ0FBQTthQUNWLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUEsU0FBQSxDQUFBLENBQVksSUFBWixDQUFBLENBQWhCO0lBRmE7O0lBSWYsWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUE7TUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sR0FBZSxHQUFHLENBQUMsSUFBSixDQUFTLElBQUMsQ0FBQSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFoQixDQUFxQixJQUFyQixDQUFULEVBQWY7Ozs7O01BS0EsUUFBQSxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsVUFBWDtNQUNYLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWIsR0FBK0I7TUFDL0IsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBYixDQUFzQixRQUFRLENBQUMsV0FBL0I7TUFDQSxJQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBSDtRQUNFLE9BQUEsR0FBVSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFaLENBQWdCLFNBQWhCO1FBQ1YsSUFBRyxPQUFIO1VBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLE9BQTFCLEVBREY7O1FBRUEsSUFBQyxDQUFBLGFBQUQsQ0FBZSxPQUFmLEVBSkY7O01BS0EsbUNBQVEsQ0FBRSx3QkFBVjtlQUNFLElBQUMsQ0FBQSxJQUFJLENBQUMsZUFBTixDQUFBLEVBREY7O0lBZFk7O0VBWGhCOzt5QkFDRSxFQUFBLEdBQ0U7SUFBQSxNQUFBLEVBQVE7RUFBUjs7eUJBQ0YsUUFBQSxHQUNFO0lBQUEsV0FBQSxFQUFhLG9CQUFiO0lBQ0EsVUFBQSxFQUFZO0VBRFo7Ozs7OztBQTBCSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuaW1wb3J0IGFjZSBmcm9tICdicmFjZSdcbmltcG9ydCBodG1sX21vZGUgZnJvbSAnYnJhY2UvbW9kZS9odG1sJ1xuaW1wb3J0IHR3aWxpZ2h0X3RoZW1lIGZyb20gJ2JyYWNlL3RoZW1lL3R3aWxpZ2h0J1xuaW1wb3J0IG1hcmtkb3duX21vZGUgZnJvbSAnYnJhY2UvbW9kZS9tYXJrZG93bidcblxuQUNFREVGQVVMVFM6XG4gIGVkaXRvclRoZW1lOiAnYWNlL3RoZW1lL3R3aWxpZ2h0J1xuICBlZGl0b3JNb2RlOiAnYWNlL21vZGUvaHRtbCdcbiAgXG4jIHZpZXcgbXVzdCBoYXZlIGVkaXRvclRoZW1lIGFuZCBlZGl0b3JNb2RlIHNldFxuIyBvciBzaG91bGQ/XG5jbGFzcyBIYXNBY2VFZGl0b3IgZXh0ZW5kcyBCZWhhdmlvclxuICB1aTpcbiAgICBlZGl0b3I6ICcjYWNlLWVkaXRvcidcbiAgZGVmYXVsdHM6XG4gICAgZWRpdG9yVGhlbWU6ICdhY2UvdGhlbWUvdHdpbGlnaHQnXG4gICAgZWRpdG9yTW9kZTogJ21hcmtkb3duJ1xuXG4gIHNldEVkaXRvck1vZGU6IChtb2RlKSAtPlxuICAgIHNlc3Npb24gPSBAdmlldy5lZGl0b3IuZ2V0U2Vzc2lvbigpXG4gICAgc2Vzc2lvbi5zZXRNb2RlIFwiYWNlL21vZGUvI3ttb2RlfVwiXG4gICAgXG4gIG9uRG9tUmVmcmVzaDogKCkgLT5cbiAgICBAdmlldy5lZGl0b3IgPSBhY2UuZWRpdCBAdmlldy51aS5lZGl0b3IuYXR0ciAnaWQnXG4gICAgIyBkaXNhYmxlIHdhcm5pbmc6XG4gICAgIyBBdXRvbWF0aWNhbGx5IHNjcm9sbGluZyBjdXJzb3IgaW50byB2aWV3IGFmdGVyIHNlbGVjdGlvbiBjaGFuZ2VcbiAgICAjIHRoaXMgd2lsbCBiZSBkaXNhYmxlZCBpbiB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgIyBzZXQgZWRpdG9yLiRibG9ja1Njcm9sbGluZyA9IEluZmluaXR5IHRvIGRpc2FibGUgdGhpcyBtZXNzYWdlXG4gICAgZGVmYXVsdHMgPSBAZ2V0T3B0aW9uICdkZWZhdWx0cydcbiAgICBAdmlldy5lZGl0b3IuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHlcbiAgICBAdmlldy5lZGl0b3Iuc2V0VGhlbWUgZGVmYXVsdHMuZWRpdG9yVGhlbWVcbiAgICBpZiBAdmlldy5tb2RlbC5oYXMgJ2RvY3R5cGUnXG4gICAgICBkb2N0eXBlID0gQHZpZXcubW9kZWwuZ2V0ICdkb2N0eXBlJ1xuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcImRvY3R5cGUgaXNcIiwgZG9jdHlwZVxuICAgICAgQHNldEVkaXRvck1vZGUgZG9jdHlwZVxuICAgIGlmIEB2aWV3Py5hZnRlckRvbVJlZnJlc2hcbiAgICAgIEB2aWV3LmFmdGVyRG9tUmVmcmVzaCgpXG4gICAgXG4gIFxuICBcbmV4cG9ydCBkZWZhdWx0IEhhc0FjZUVkaXRvclxuIl19
