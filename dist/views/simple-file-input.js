var SimpleFileInput;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

SimpleFileInput = (function() {
  class SimpleFileInput extends View {
    templateContext() {
      return {
        parseMsg: this.getOption('parseMsg') || 'Parse file',
        headerMsg: this.getOption('headerMsg') || 'Drop file',
        inputId: this.getOption('inputId') || 'customFile'
      };
    }

    
    // https://stackoverflow.com/a/12102992
    fileInputClicked(event) {
      console.log("file_input_clicked", event);
      this.ui.fileInput.val(null);
      return this.ui.chosenBtn.hide();
    }

    fileInputChanged(event) {
      console.log("file_input_changed", event);
      return this.ui.chosenBtn.show();
    }

    handleDrop(event) {
      var dt, file;
      event.preventDefault();
      this.ui.dropzone.css('border', '0px');
      dt = event.originalEvent.dataTransfer;
      file = dt.files[0];
      this.ui.statusMsg.text(`File: ${file.name}`);
      this.droppedFile = file;
      return this.ui.parseBtn.show();
    }

    handleDragOver(event) {
      event.preventDefault();
      return event.stopPropagation();
    }

    handleDragEnter(event) {
      event.stopPropagation();
      event.preventDefault();
      return this.ui.dropzone.css('border', '2px dotted');
    }

    fileReaderOnLoad(event) {
      throw {
        msg: "Notimplementederror"
      };
    }

    readFile(file) {
      var reader;
      reader = new FileReader();
      reader.onload = this.fileReaderOnLoad;
      reader.fileObject = file;
      if (this.fileType === 'binary') {
        return reader.readAsBinaryString(file);
      } else {
        return reader.readAsText(file);
      }
    }

    handleChosenFile() {
      var file, filename;
      filename = this.ui.fileInput.val();
      this.ui.statusMsg.text(`Reading chosen file...(${filename})`);
      file = this.ui.fileInput[0].files[0];
      this.ui.parseBtn.hide();
      return this.readFile(file);
    }

    handleDroppedFile() {
      this.ui.statusMsg.text(`Reading dropped file... (${this.droppedFile.name})`);
      this.ui.parseBtn.hide();
      return this.readFile(this.droppedFile);
    }

  };

  SimpleFileInput.prototype.template = tc.renderable(function(model) {
    var noDisplay;
    noDisplay = {
      style: 'display:none'
    };
    return tc.div('.dropzone.card', function() {
      tc.div('.card-header', function() {
        return tc.text(model.headerMsg);
      });
      tc.div('.card-body', function() {
        return tc.div('.parse-btn.btn.btn-primary', noDisplay, function() {
          return tc.text('upload dropped file');
        });
      });
      return tc.div('.card-footer', function() {
        tc.div('.file-input-wrapper', function() {
          tc.input(`#${model.inputId}`, {
            type: 'file'
          });
          return tc.label({
            'for': model.inputId
          }, "Choose File");
        });
        return tc.span('.parse-chosen-btn.btn.btn-primary', noDisplay, function() {
          return tc.text(model.parseMsg);
        });
      });
    });
  });

  SimpleFileInput.prototype.fileType = 'binary';

  SimpleFileInput.prototype.ui = {
    fileInput: '.file-input',
    parseBtn: '.parse-btn',
    chosenBtn: '.parse-chosen-btn',
    dropzone: '.dropzone',
    statusMsg: '.card-header'
  };

  SimpleFileInput.prototype.events = {
    'dragover @ui.dropzone': 'handleDragOver',
    'dragenter @ui.dropzone': 'handleDragEnter',
    'drop @ui.dropzone': 'handleDrop',
    'click @ui.fileInput': 'fileInputClicked',
    'change @ui.fileInput': 'fileInputChanged',
    'click @ui.parseBtn': 'handleDroppedFile',
    'click @ui.chosenBtn': 'handleChosenFile'
  };

  return SimpleFileInput;

}).call(this);

export default SimpleFileInput;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc2ltcGxlLWZpbGUtaW5wdXQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3NpbXBsZS1maWxlLWlucHV0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFTTtFQUFOLE1BQUEsZ0JBQUEsUUFBOEIsS0FBOUI7SUFlRSxlQUFpQixDQUFBLENBQUE7YUFDZjtRQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsU0FBRCxDQUFXLFVBQVgsQ0FBQSxJQUEwQixZQUFwQztRQUNBLFNBQUEsRUFBVyxJQUFDLENBQUEsU0FBRCxDQUFXLFdBQVgsQ0FBQSxJQUEyQixXQUR0QztRQUVBLE9BQUEsRUFBUyxJQUFDLENBQUEsU0FBRCxDQUFXLFNBQVgsQ0FBQSxJQUF5QjtNQUZsQztJQURlLENBZGpCOzs7O0lBbUNBLGdCQUFrQixDQUFDLEtBQUQsQ0FBQTtNQUNoQixPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLEtBQWxDO01BQ0EsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBZCxDQUFrQixJQUFsQjthQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQWQsQ0FBQTtJQUhnQjs7SUFLbEIsZ0JBQWtCLENBQUMsS0FBRCxDQUFBO01BQ2hCLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsS0FBbEM7YUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFkLENBQUE7SUFGZ0I7O0lBSWxCLFVBQVksQ0FBQyxLQUFELENBQUE7QUFDVixVQUFBLEVBQUEsRUFBQTtNQUFBLEtBQUssQ0FBQyxjQUFOLENBQUE7TUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFiLENBQWlCLFFBQWpCLEVBQTJCLEtBQTNCO01BQ0EsRUFBQSxHQUFLLEtBQUss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QUUsQ0FBQyxHQUFILENBQU8sY0FBUCxFQUF1QixRQUFBLENBQUEsQ0FBQTtRQUNyQixFQUFFLENBQUMsR0FBSCxDQUFPLHFCQUFQLEVBQThCLFFBQUEsQ0FBQSxDQUFBO1VBQzVCLEVBQUUsQ0FBQyxLQUFILENBQVMsQ0FBQSxDQUFBLENBQUEsQ0FBSSxLQUFLLENBQUMsT0FBVixDQUFBLENBQVQsRUFBOEI7WUFBQSxJQUFBLEVBQUs7VUFBTCxDQUE5QjtpQkFDQSxFQUFFLENBQUMsS0FBSCxDQUFTO1lBQUEsS0FBQSxFQUFNLEtBQUssQ0FBQztVQUFaLENBQVQsRUFBOEIsYUFBOUI7UUFGNEIsQ0FBOUI7ZUFHQSxFQUFFLENBQUMsSUFBSCxDQUFRLG1DQUFSLEVBQTZDLFNBQTdDLEVBQXdELFFBQUEsQ0FBQSxDQUFBO2lCQUN0RCxFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxRQUFkO1FBRHNELENBQXhEO01BSnFCLENBQXZCO0lBTnVCLENBQXpCO0VBRnNCLENBQWQ7OzRCQWtCVixRQUFBLEdBQVU7OzRCQUNWLEVBQUEsR0FDRTtJQUFBLFNBQUEsRUFBVyxhQUFYO0lBQ0EsUUFBQSxFQUFVLFlBRFY7SUFFQSxTQUFBLEVBQVcsbUJBRlg7SUFHQSxRQUFBLEVBQVUsV0FIVjtJQUlBLFNBQUEsRUFBVztFQUpYOzs0QkFLRixNQUFBLEdBQ0U7SUFBQSx1QkFBQSxFQUF5QixnQkFBekI7SUFDQSx3QkFBQSxFQUEwQixpQkFEMUI7SUFFQSxtQkFBQSxFQUFxQixZQUZyQjtJQUdBLHFCQUFBLEVBQXVCLGtCQUh2QjtJQUlBLHNCQUFBLEVBQXdCLGtCQUp4QjtJQUtBLG9CQUFBLEVBQXNCLG1CQUx0QjtJQU1BLHFCQUFBLEVBQXVCO0VBTnZCOzs7Ozs7QUE4REosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5jbGFzcyBTaW1wbGVGaWxlSW5wdXQgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBub0Rpc3BsYXkgPSBzdHlsZTonZGlzcGxheTpub25lJ1xuICAgIHRjLmRpdiAnLmRyb3B6b25lLmNhcmQnLCAtPlxuICAgICAgdGMuZGl2ICcuY2FyZC1oZWFkZXInLCAtPlxuICAgICAgICB0Yy50ZXh0IG1vZGVsLmhlYWRlck1zZ1xuICAgICAgdGMuZGl2ICcuY2FyZC1ib2R5JywgLT5cbiAgICAgICAgdGMuZGl2ICcucGFyc2UtYnRuLmJ0bi5idG4tcHJpbWFyeScsIG5vRGlzcGxheSwgLT5cbiAgICAgICAgICB0Yy50ZXh0ICd1cGxvYWQgZHJvcHBlZCBmaWxlJ1xuICAgICAgdGMuZGl2ICcuY2FyZC1mb290ZXInLCAtPlxuICAgICAgICB0Yy5kaXYgJy5maWxlLWlucHV0LXdyYXBwZXInLCAtPlxuICAgICAgICAgIHRjLmlucHV0IFwiIyN7bW9kZWwuaW5wdXRJZH1cIiwgdHlwZTonZmlsZSdcbiAgICAgICAgICB0Yy5sYWJlbCAnZm9yJzptb2RlbC5pbnB1dElkLCBcIkNob29zZSBGaWxlXCJcbiAgICAgICAgdGMuc3BhbiAnLnBhcnNlLWNob3Nlbi1idG4uYnRuLmJ0bi1wcmltYXJ5Jywgbm9EaXNwbGF5LCAtPlxuICAgICAgICAgIHRjLnRleHQgbW9kZWwucGFyc2VNc2dcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIHBhcnNlTXNnOiBAZ2V0T3B0aW9uKCdwYXJzZU1zZycpIG9yICdQYXJzZSBmaWxlJ1xuICAgIGhlYWRlck1zZzogQGdldE9wdGlvbignaGVhZGVyTXNnJykgb3IgJ0Ryb3AgZmlsZSdcbiAgICBpbnB1dElkOiBAZ2V0T3B0aW9uKCdpbnB1dElkJykgb3IgJ2N1c3RvbUZpbGUnXG4gIGZpbGVUeXBlOiAnYmluYXJ5J1xuICB1aTpcbiAgICBmaWxlSW5wdXQ6ICcuZmlsZS1pbnB1dCdcbiAgICBwYXJzZUJ0bjogJy5wYXJzZS1idG4nXG4gICAgY2hvc2VuQnRuOiAnLnBhcnNlLWNob3Nlbi1idG4nXG4gICAgZHJvcHpvbmU6ICcuZHJvcHpvbmUnXG4gICAgc3RhdHVzTXNnOiAnLmNhcmQtaGVhZGVyJ1xuICBldmVudHM6XG4gICAgJ2RyYWdvdmVyIEB1aS5kcm9wem9uZSc6ICdoYW5kbGVEcmFnT3ZlcidcbiAgICAnZHJhZ2VudGVyIEB1aS5kcm9wem9uZSc6ICdoYW5kbGVEcmFnRW50ZXInXG4gICAgJ2Ryb3AgQHVpLmRyb3B6b25lJzogJ2hhbmRsZURyb3AnXG4gICAgJ2NsaWNrIEB1aS5maWxlSW5wdXQnOiAnZmlsZUlucHV0Q2xpY2tlZCdcbiAgICAnY2hhbmdlIEB1aS5maWxlSW5wdXQnOiAnZmlsZUlucHV0Q2hhbmdlZCdcbiAgICAnY2xpY2sgQHVpLnBhcnNlQnRuJzogJ2hhbmRsZURyb3BwZWRGaWxlJ1xuICAgICdjbGljayBAdWkuY2hvc2VuQnRuJzogJ2hhbmRsZUNob3NlbkZpbGUnXG4gICAgXG4gICMgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEyMTAyOTkyXG4gIGZpbGVJbnB1dENsaWNrZWQ6IChldmVudCkgLT5cbiAgICBjb25zb2xlLmxvZyBcImZpbGVfaW5wdXRfY2xpY2tlZFwiLCBldmVudFxuICAgIEB1aS5maWxlSW5wdXQudmFsIG51bGxcbiAgICBAdWkuY2hvc2VuQnRuLmhpZGUoKVxuXG4gIGZpbGVJbnB1dENoYW5nZWQ6IChldmVudCkgLT5cbiAgICBjb25zb2xlLmxvZyBcImZpbGVfaW5wdXRfY2hhbmdlZFwiLCBldmVudFxuICAgIEB1aS5jaG9zZW5CdG4uc2hvdygpXG4gICAgXG4gIGhhbmRsZURyb3A6IChldmVudCkgLT5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgQHVpLmRyb3B6b25lLmNzcyAnYm9yZGVyJywgJzBweCdcbiAgICBkdCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyXG4gICAgZmlsZSA9IGR0LmZpbGVzWzBdXG4gICAgQHVpLnN0YXR1c01zZy50ZXh0IFwiRmlsZTogI3tmaWxlLm5hbWV9XCJcbiAgICBAZHJvcHBlZEZpbGUgPSBmaWxlXG4gICAgQHVpLnBhcnNlQnRuLnNob3coKVxuICAgIFxuICBoYW5kbGVEcmFnT3ZlcjogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIFxuICBoYW5kbGVEcmFnRW50ZXI6IChldmVudCkgLT5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBAdWkuZHJvcHpvbmUuY3NzICdib3JkZXInLCAnMnB4IGRvdHRlZCdcblxuICBmaWxlUmVhZGVyT25Mb2FkOiAoZXZlbnQpIC0+XG4gICAgdGhyb3cge21zZzpcIk5vdGltcGxlbWVudGVkZXJyb3JcIn1cbiAgICBcbiAgICAgIFxuICByZWFkRmlsZTogKGZpbGUpIC0+XG4gICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWQgPSBAZmlsZVJlYWRlck9uTG9hZFxuICAgIHJlYWRlci5maWxlT2JqZWN0ID0gZmlsZVxuICAgIGlmIEBmaWxlVHlwZSA9PSAnYmluYXJ5J1xuICAgICAgcmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyBmaWxlXG4gICAgZWxzZVxuICAgICAgcmVhZGVyLnJlYWRBc1RleHQgZmlsZVxuICAgICAgXG4gICAgXG4gIGhhbmRsZUNob3NlbkZpbGU6IC0+XG4gICAgZmlsZW5hbWUgPSBAdWkuZmlsZUlucHV0LnZhbCgpXG4gICAgQHVpLnN0YXR1c01zZy50ZXh0IFwiUmVhZGluZyBjaG9zZW4gZmlsZS4uLigje2ZpbGVuYW1lfSlcIlxuICAgIGZpbGUgPSBAdWkuZmlsZUlucHV0WzBdLmZpbGVzWzBdXG4gICAgQHVpLnBhcnNlQnRuLmhpZGUoKVxuICAgIEByZWFkRmlsZSBmaWxlXG4gICAgXG4gIGhhbmRsZURyb3BwZWRGaWxlOiAtPlxuICAgIEB1aS5zdGF0dXNNc2cudGV4dCBcIlJlYWRpbmcgZHJvcHBlZCBmaWxlLi4uICgje0Bkcm9wcGVkRmlsZS5uYW1lfSlcIlxuICAgIEB1aS5wYXJzZUJ0bi5oaWRlKClcbiAgICBAcmVhZEZpbGUgQGRyb3BwZWRGaWxlXG5cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZUZpbGVJbnB1dFxuXG4iXX0=
