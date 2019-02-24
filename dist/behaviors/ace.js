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
      var ref;
      this.view.editor = ace.edit(this.view.ui.editor.attr('id'));
      // disable warning:
      // Automatically scrolling cursor into view after selection change
      // this will be disabled in the next version
      // set editor.$blockScrolling = Infinity to disable this message
      this.view.editor.$blockScrolling = 2e308;
      this.view.editor.setTheme(this.options.editorTheme);
      if (this.view.model.has('doctype')) {
        this.setEditorMode(this.view.model.get('doctype'));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2FjZS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2FjZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRWQsT0FBTyxHQUFQLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBQ0EsT0FBTyxjQUFQLE1BQUE7O0FBQ0EsT0FBTyxhQUFQLE1BQUE7O0FBRUEsQ0FBQTtFQUFBLFdBQUEsRUFDRTtJQUFBLFdBQUEsRUFBYSxvQkFBYjtJQUNBLFVBQUEsRUFBWTtFQURaO0FBREYsQ0FBQTs7QUFNTTs7OztFQUFOLE1BQUEsYUFBQSxRQUEyQixTQUEzQjtJQU9FLGFBQWUsQ0FBQyxJQUFELENBQUE7QUFDYixVQUFBO01BQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQWIsQ0FBQTthQUNWLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUEsU0FBQSxDQUFBLENBQVksSUFBWixDQUFBLENBQWhCO0lBRmE7O0lBSWYsWUFBYyxDQUFBLENBQUE7QUFDWixVQUFBO01BQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWUsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFDLENBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBVCxFQUFmOzs7OztNQUtBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWIsR0FBK0I7TUFDL0IsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBYixDQUFzQixJQUFDLENBQUEsT0FBTyxDQUFDLFdBQS9CO01BQ0EsSUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQUg7UUFDRSxJQUFDLENBQUEsYUFBRCxDQUFlLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBZixFQURGOztNQUVBLG1DQUFRLENBQUUsd0JBQVY7ZUFDRSxJQUFDLENBQUEsSUFBSSxDQUFDLGVBQU4sQ0FBQSxFQURGOztJQVZZOztFQVhoQjs7eUJBQ0UsRUFBQSxHQUNFO0lBQUEsTUFBQSxFQUFRO0VBQVI7O3lCQUNGLFFBQUEsR0FDRTtJQUFBLFdBQUEsRUFBYSxvQkFBYjtJQUNBLFVBQUEsRUFBWTtFQURaOzs7Ozs7QUFzQkosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmltcG9ydCBhY2UgZnJvbSAnYnJhY2UnXG5pbXBvcnQgaHRtbF9tb2RlIGZyb20gJ2JyYWNlL21vZGUvaHRtbCdcbmltcG9ydCB0d2lsaWdodF90aGVtZSBmcm9tICdicmFjZS90aGVtZS90d2lsaWdodCdcbmltcG9ydCBtYXJrZG93bl9tb2RlIGZyb20gJ2JyYWNlL21vZGUvbWFya2Rvd24nXG5cbkFDRURFRkFVTFRTOlxuICBlZGl0b3JUaGVtZTogJ2FjZS90aGVtZS90d2lsaWdodCdcbiAgZWRpdG9yTW9kZTogJ2FjZS9tb2RlL2h0bWwnXG4gIFxuIyB2aWV3IG11c3QgaGF2ZSBlZGl0b3JUaGVtZSBhbmQgZWRpdG9yTW9kZSBzZXRcbiMgb3Igc2hvdWxkP1xuY2xhc3MgSGFzQWNlRWRpdG9yIGV4dGVuZHMgQmVoYXZpb3JcbiAgdWk6XG4gICAgZWRpdG9yOiAnI2FjZS1lZGl0b3InXG4gIGRlZmF1bHRzOlxuICAgIGVkaXRvclRoZW1lOiAnYWNlL3RoZW1lL3R3aWxpZ2h0J1xuICAgIGVkaXRvck1vZGU6ICdtYXJrZG93bidcblxuICBzZXRFZGl0b3JNb2RlOiAobW9kZSkgLT5cbiAgICBzZXNzaW9uID0gQHZpZXcuZWRpdG9yLmdldFNlc3Npb24oKVxuICAgIHNlc3Npb24uc2V0TW9kZSBcImFjZS9tb2RlLyN7bW9kZX1cIlxuICAgIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgQHZpZXcuZWRpdG9yID0gYWNlLmVkaXQgQHZpZXcudWkuZWRpdG9yLmF0dHIgJ2lkJ1xuICAgICMgZGlzYWJsZSB3YXJuaW5nOlxuICAgICMgQXV0b21hdGljYWxseSBzY3JvbGxpbmcgY3Vyc29yIGludG8gdmlldyBhZnRlciBzZWxlY3Rpb24gY2hhbmdlXG4gICAgIyB0aGlzIHdpbGwgYmUgZGlzYWJsZWQgaW4gdGhlIG5leHQgdmVyc2lvblxuICAgICMgc2V0IGVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eSB0byBkaXNhYmxlIHRoaXMgbWVzc2FnZVxuICAgIEB2aWV3LmVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eVxuICAgIEB2aWV3LmVkaXRvci5zZXRUaGVtZSBAb3B0aW9ucy5lZGl0b3JUaGVtZVxuICAgIGlmIEB2aWV3Lm1vZGVsLmhhcyAnZG9jdHlwZSdcbiAgICAgIEBzZXRFZGl0b3JNb2RlIEB2aWV3Lm1vZGVsLmdldCAnZG9jdHlwZSdcbiAgICBpZiBAdmlldz8uYWZ0ZXJEb21SZWZyZXNoXG4gICAgICBAdmlldy5hZnRlckRvbVJlZnJlc2goKVxuICAgIFxuICBcbiAgXG5leHBvcnQgZGVmYXVsdCBIYXNBY2VFZGl0b3JcbiJdfQ==
