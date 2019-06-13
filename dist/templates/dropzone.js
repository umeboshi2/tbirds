var dropzone_template;

import tc from 'teacup';

// exampleOpts =
//   dropHeader: 'drop a file'
//   uploadLabel: 'upload dropped file'
//   parseMsg: 'parse dropped file'
dropzone_template = tc.renderable(function(options) {
  return tc.div('.dropzone.card', function() {
    tc.div('.card-header', function() {
      return tc.text(options.dropHeader);
    });
    return tc.div('.card-body', function() {
      tc.div('.parse-btn.btn.btn-primary', {
        style: 'display:none'
      }, function() {
        return tc.text(options.uploadLabel);
      });
      tc.input('.file-input.input', {
        type: 'file'
      });
      return tc.span('.parse-chosen-btn.btn.btn-primary', {
        style: 'display:none'
      }, function() {
        return tc.text(options.parseMsg);
      });
    });
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Ryb3B6b25lLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZHJvcHpvbmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxFQUFQLE1BQUEsU0FBQTs7Ozs7O0FBUUEsaUJBQUEsR0FBb0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsT0FBRCxDQUFBO1NBQ2hDLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7SUFDdkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxjQUFQLEVBQXVCLFFBQUEsQ0FBQSxDQUFBO2FBQ3JCLEVBQUUsQ0FBQyxJQUFILENBQVEsT0FBTyxDQUFDLFVBQWhCO0lBRHFCLENBQXZCO1dBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxZQUFQLEVBQXFCLFFBQUEsQ0FBQSxDQUFBO01BQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sNEJBQVAsRUFBcUM7UUFBQSxLQUFBLEVBQU07TUFBTixDQUFyQyxFQUEyRCxRQUFBLENBQUEsQ0FBQTtlQUN6RCxFQUFFLENBQUMsSUFBSCxDQUFRLE9BQU8sQ0FBQyxXQUFoQjtNQUR5RCxDQUEzRDtNQUVBLEVBQUUsQ0FBQyxLQUFILENBQVMsbUJBQVQsRUFBOEI7UUFBQSxJQUFBLEVBQUs7TUFBTCxDQUE5QjthQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsbUNBQVIsRUFDQTtRQUFBLEtBQUEsRUFBTTtNQUFOLENBREEsRUFDc0IsUUFBQSxDQUFBLENBQUE7ZUFDcEIsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFPLENBQUMsUUFBaEI7TUFEb0IsQ0FEdEI7SUFKbUIsQ0FBckI7RUFIdUIsQ0FBekI7QUFEZ0MsQ0FBZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbiMgZXhhbXBsZU9wdHMgPVxuIyAgIGRyb3BIZWFkZXI6ICdkcm9wIGEgZmlsZSdcbiMgICB1cGxvYWRMYWJlbDogJ3VwbG9hZCBkcm9wcGVkIGZpbGUnXG4jICAgcGFyc2VNc2c6ICdwYXJzZSBkcm9wcGVkIGZpbGUnXG5cblxuZHJvcHpvbmVfdGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChvcHRpb25zKSAtPlxuICB0Yy5kaXYgJy5kcm9wem9uZS5jYXJkJywgLT5cbiAgICB0Yy5kaXYgJy5jYXJkLWhlYWRlcicsIC0+XG4gICAgICB0Yy50ZXh0IG9wdGlvbnMuZHJvcEhlYWRlclxuICAgIHRjLmRpdiAnLmNhcmQtYm9keScsIC0+XG4gICAgICB0Yy5kaXYgJy5wYXJzZS1idG4uYnRuLmJ0bi1wcmltYXJ5Jywgc3R5bGU6J2Rpc3BsYXk6bm9uZScsIC0+XG4gICAgICAgIHRjLnRleHQgb3B0aW9ucy51cGxvYWRMYWJlbFxuICAgICAgdGMuaW5wdXQgJy5maWxlLWlucHV0LmlucHV0JywgdHlwZTonZmlsZSdcbiAgICAgIHRjLnNwYW4gJy5wYXJzZS1jaG9zZW4tYnRuLmJ0bi5idG4tcHJpbWFyeScsXG4gICAgICBzdHlsZTonZGlzcGxheTpub25lJywgLT5cbiAgICAgICAgdGMudGV4dCBvcHRpb25zLnBhcnNlTXNnXG4gICAgICAgIFxuIl19
