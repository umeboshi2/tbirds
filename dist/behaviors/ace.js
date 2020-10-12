var HasAceEditor;

import {
  Behavior
} from 'backbone.marionette';

import ace from 'brace';

import html_mode from 'brace/mode/html';

import twilight_theme from 'brace/theme/twilight';

import markdown_mode from 'brace/mode/markdown';

if (__DEV__ && DEBUG) {
  console.log(html_mode, twilight_theme, markdown_mode);
}

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2FjZS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2FjZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBR0EsT0FBTyxHQUFQLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBQ0EsT0FBTyxjQUFQLE1BQUE7O0FBQ0EsT0FBTyxhQUFQLE1BQUE7O0FBRUEsSUFBRyxPQUFBLElBQVksS0FBZjtFQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWixFQUF1QixjQUF2QixFQUF1QyxhQUF2QyxFQURGOzs7QUFHQSxDQUFBO0VBQUEsV0FBQSxFQUNFO0lBQUEsV0FBQSxFQUFhLG9CQUFiO0lBQ0EsVUFBQSxFQUFZO0VBRFo7QUFERixDQUFBOztBQU1NOzs7O0VBQU4sTUFBQSxhQUFBLFFBQTJCLFNBQTNCO0lBT0UsYUFBZSxDQUFDLElBQUQsQ0FBQTtBQUNqQixVQUFBO01BQUksT0FBQSxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQWIsQ0FBQTthQUNWLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUEsU0FBQSxDQUFBLENBQVksSUFBWixDQUFBLENBQWhCO0lBRmE7O0lBSWYsWUFBYyxDQUFBLENBQUE7QUFDaEIsVUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBO01BQUksSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWUsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFDLENBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBVCxFQUFuQjs7Ozs7TUFLSSxRQUFBLEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxVQUFYO01BQ1gsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBYixHQUErQjtNQUMvQixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFiLENBQXNCLFFBQVEsQ0FBQyxXQUEvQjtNQUNBLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixTQUFoQixDQUFIO1FBQ0UsT0FBQSxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQVosQ0FBZ0IsU0FBaEI7UUFDVixJQUFHLE9BQUg7VUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLFlBQVosRUFBMEIsT0FBMUIsRUFERjs7UUFFQSxJQUFDLENBQUEsYUFBRCxDQUFlLE9BQWYsRUFKRjs7TUFLQSxtQ0FBUSxDQUFFLHdCQUFWO2VBQ0UsSUFBQyxDQUFBLElBQUksQ0FBQyxlQUFOLENBQUEsRUFERjs7SUFkWTs7RUFYaEI7O3lCQUNFLEVBQUEsR0FDRTtJQUFBLE1BQUEsRUFBUTtFQUFSOzt5QkFDRixRQUFBLEdBQ0U7SUFBQSxXQUFBLEVBQWEsb0JBQWI7SUFDQSxVQUFBLEVBQVk7RUFEWjs7Ozs7O0FBMEJKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuXG5pbXBvcnQgYWNlIGZyb20gJ2JyYWNlJ1xuaW1wb3J0IGh0bWxfbW9kZSBmcm9tICdicmFjZS9tb2RlL2h0bWwnXG5pbXBvcnQgdHdpbGlnaHRfdGhlbWUgZnJvbSAnYnJhY2UvdGhlbWUvdHdpbGlnaHQnXG5pbXBvcnQgbWFya2Rvd25fbW9kZSBmcm9tICdicmFjZS9tb2RlL21hcmtkb3duJ1xuXG5pZiBfX0RFVl9fIGFuZCBERUJVR1xuICBjb25zb2xlLmxvZyBodG1sX21vZGUsIHR3aWxpZ2h0X3RoZW1lLCBtYXJrZG93bl9tb2RlXG4gIFxuQUNFREVGQVVMVFM6XG4gIGVkaXRvclRoZW1lOiAnYWNlL3RoZW1lL3R3aWxpZ2h0J1xuICBlZGl0b3JNb2RlOiAnYWNlL21vZGUvaHRtbCdcbiAgXG4jIHZpZXcgbXVzdCBoYXZlIGVkaXRvclRoZW1lIGFuZCBlZGl0b3JNb2RlIHNldFxuIyBvciBzaG91bGQ/XG5jbGFzcyBIYXNBY2VFZGl0b3IgZXh0ZW5kcyBCZWhhdmlvclxuICB1aTpcbiAgICBlZGl0b3I6ICcjYWNlLWVkaXRvcidcbiAgZGVmYXVsdHM6XG4gICAgZWRpdG9yVGhlbWU6ICdhY2UvdGhlbWUvdHdpbGlnaHQnXG4gICAgZWRpdG9yTW9kZTogJ21hcmtkb3duJ1xuXG4gIHNldEVkaXRvck1vZGU6IChtb2RlKSAtPlxuICAgIHNlc3Npb24gPSBAdmlldy5lZGl0b3IuZ2V0U2Vzc2lvbigpXG4gICAgc2Vzc2lvbi5zZXRNb2RlIFwiYWNlL21vZGUvI3ttb2RlfVwiXG4gICAgXG4gIG9uRG9tUmVmcmVzaDogKCkgLT5cbiAgICBAdmlldy5lZGl0b3IgPSBhY2UuZWRpdCBAdmlldy51aS5lZGl0b3IuYXR0ciAnaWQnXG4gICAgIyBkaXNhYmxlIHdhcm5pbmc6XG4gICAgIyBBdXRvbWF0aWNhbGx5IHNjcm9sbGluZyBjdXJzb3IgaW50byB2aWV3IGFmdGVyIHNlbGVjdGlvbiBjaGFuZ2VcbiAgICAjIHRoaXMgd2lsbCBiZSBkaXNhYmxlZCBpbiB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgIyBzZXQgZWRpdG9yLiRibG9ja1Njcm9sbGluZyA9IEluZmluaXR5IHRvIGRpc2FibGUgdGhpcyBtZXNzYWdlXG4gICAgZGVmYXVsdHMgPSBAZ2V0T3B0aW9uICdkZWZhdWx0cydcbiAgICBAdmlldy5lZGl0b3IuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHlcbiAgICBAdmlldy5lZGl0b3Iuc2V0VGhlbWUgZGVmYXVsdHMuZWRpdG9yVGhlbWVcbiAgICBpZiBAdmlldy5tb2RlbC5oYXMgJ2RvY3R5cGUnXG4gICAgICBkb2N0eXBlID0gQHZpZXcubW9kZWwuZ2V0ICdkb2N0eXBlJ1xuICAgICAgaWYgX19ERVZfX1xuICAgICAgICBjb25zb2xlLmxvZyBcImRvY3R5cGUgaXNcIiwgZG9jdHlwZVxuICAgICAgQHNldEVkaXRvck1vZGUgZG9jdHlwZVxuICAgIGlmIEB2aWV3Py5hZnRlckRvbVJlZnJlc2hcbiAgICAgIEB2aWV3LmFmdGVyRG9tUmVmcmVzaCgpXG4gICAgXG4gIFxuICBcbmV4cG9ydCBkZWZhdWx0IEhhc0FjZUVkaXRvclxuIl19
