var HasAceEditor, MainChannel;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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
  class HasAceEditor extends Backbone.Marionette.Behavior {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2FjZS5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2FjZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxZQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFZCxPQUFPLEdBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFDQSxPQUFPLGNBQVAsTUFBQTs7QUFDQSxPQUFPLGFBQVAsTUFBQTs7QUFFQSxDQUFBO0VBQUEsV0FBQSxFQUNFO0lBQUEsV0FBQSxFQUFhLG9CQUFiO0lBQ0EsVUFBQSxFQUFZO0VBRFo7QUFERixDQUFBOztBQU1NOzs7O0VBQU4sTUFBQSxhQUFBLFFBQTJCLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBL0M7SUFPRSxhQUFlLENBQUMsSUFBRCxDQUFBO0FBQ2IsVUFBQTtNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFiLENBQUE7YUFDVixPQUFPLENBQUMsT0FBUixDQUFnQixDQUFBLFNBQUEsQ0FBQSxDQUFZLElBQVosQ0FBQSxDQUFoQjtJQUZhOztJQUlmLFlBQWMsQ0FBQSxDQUFBO0FBQ1osVUFBQTtNQUFBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixHQUFlLEdBQUcsQ0FBQyxJQUFKLENBQVMsSUFBQyxDQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQWhCLENBQXFCLElBQXJCLENBQVQsRUFBZjs7Ozs7TUFLQSxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFiLEdBQStCO01BQy9CLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQWIsQ0FBc0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUEvQjtNQUNBLElBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBWixDQUFnQixTQUFoQixDQUFIO1FBQ0UsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFaLENBQWdCLFNBQWhCLENBQWYsRUFERjs7TUFFQSxtQ0FBUSxDQUFFLHdCQUFWO2VBQ0UsSUFBQyxDQUFBLElBQUksQ0FBQyxlQUFOLENBQUEsRUFERjs7SUFWWTs7RUFYaEI7O3lCQUNFLEVBQUEsR0FDRTtJQUFBLE1BQUEsRUFBUTtFQUFSOzt5QkFDRixRQUFBLEdBQ0U7SUFBQSxXQUFBLEVBQWEsb0JBQWI7SUFDQSxVQUFBLEVBQVk7RUFEWjs7Ozs7O0FBc0JKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5pbXBvcnQgYWNlIGZyb20gJ2JyYWNlJ1xuaW1wb3J0IGh0bWxfbW9kZSBmcm9tICdicmFjZS9tb2RlL2h0bWwnXG5pbXBvcnQgdHdpbGlnaHRfdGhlbWUgZnJvbSAnYnJhY2UvdGhlbWUvdHdpbGlnaHQnXG5pbXBvcnQgbWFya2Rvd25fbW9kZSBmcm9tICdicmFjZS9tb2RlL21hcmtkb3duJ1xuXG5BQ0VERUZBVUxUUzpcbiAgZWRpdG9yVGhlbWU6ICdhY2UvdGhlbWUvdHdpbGlnaHQnXG4gIGVkaXRvck1vZGU6ICdhY2UvbW9kZS9odG1sJ1xuICBcbiMgdmlldyBtdXN0IGhhdmUgZWRpdG9yVGhlbWUgYW5kIGVkaXRvck1vZGUgc2V0XG4jIG9yIHNob3VsZD9cbmNsYXNzIEhhc0FjZUVkaXRvciBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQmVoYXZpb3JcbiAgdWk6XG4gICAgZWRpdG9yOiAnI2FjZS1lZGl0b3InXG4gIGRlZmF1bHRzOlxuICAgIGVkaXRvclRoZW1lOiAnYWNlL3RoZW1lL3R3aWxpZ2h0J1xuICAgIGVkaXRvck1vZGU6ICdtYXJrZG93bidcblxuICBzZXRFZGl0b3JNb2RlOiAobW9kZSkgLT5cbiAgICBzZXNzaW9uID0gQHZpZXcuZWRpdG9yLmdldFNlc3Npb24oKVxuICAgIHNlc3Npb24uc2V0TW9kZSBcImFjZS9tb2RlLyN7bW9kZX1cIlxuICAgIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgQHZpZXcuZWRpdG9yID0gYWNlLmVkaXQgQHZpZXcudWkuZWRpdG9yLmF0dHIgJ2lkJ1xuICAgICMgZGlzYWJsZSB3YXJuaW5nOlxuICAgICMgQXV0b21hdGljYWxseSBzY3JvbGxpbmcgY3Vyc29yIGludG8gdmlldyBhZnRlciBzZWxlY3Rpb24gY2hhbmdlXG4gICAgIyB0aGlzIHdpbGwgYmUgZGlzYWJsZWQgaW4gdGhlIG5leHQgdmVyc2lvblxuICAgICMgc2V0IGVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eSB0byBkaXNhYmxlIHRoaXMgbWVzc2FnZVxuICAgIEB2aWV3LmVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eVxuICAgIEB2aWV3LmVkaXRvci5zZXRUaGVtZSBAb3B0aW9ucy5lZGl0b3JUaGVtZVxuICAgIGlmIEB2aWV3Lm1vZGVsLmhhcyAnZG9jdHlwZSdcbiAgICAgIEBzZXRFZGl0b3JNb2RlIEB2aWV3Lm1vZGVsLmdldCAnZG9jdHlwZSdcbiAgICBpZiBAdmlldz8uYWZ0ZXJEb21SZWZyZXNoXG4gICAgICBAdmlldy5hZnRlckRvbVJlZnJlc2goKVxuICAgIFxuICBcbiAgXG5leHBvcnQgZGVmYXVsdCBIYXNBY2VFZGl0b3JcbiJdfQ==
