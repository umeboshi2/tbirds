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

export default dropzone_template;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzL2Ryb3B6b25lLmpzIiwic291cmNlcyI6WyJ0ZW1wbGF0ZXMvZHJvcHpvbmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxFQUFQLE1BQUEsU0FBQTs7Ozs7O0FBUUEsaUJBQUEsR0FBb0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsT0FBRCxDQUFBO1NBQ2hDLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7SUFDdkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxjQUFQLEVBQXVCLFFBQUEsQ0FBQSxDQUFBO2FBQ3JCLEVBQUUsQ0FBQyxJQUFILENBQVEsT0FBTyxDQUFDLFVBQWhCO0lBRHFCLENBQXZCO1dBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxZQUFQLEVBQXFCLFFBQUEsQ0FBQSxDQUFBO01BQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sNEJBQVAsRUFBcUM7UUFBQSxLQUFBLEVBQU07TUFBTixDQUFyQyxFQUEyRCxRQUFBLENBQUEsQ0FBQTtlQUN6RCxFQUFFLENBQUMsSUFBSCxDQUFRLE9BQU8sQ0FBQyxXQUFoQjtNQUR5RCxDQUEzRDtNQUVBLEVBQUUsQ0FBQyxLQUFILENBQVMsbUJBQVQsRUFBOEI7UUFBQSxJQUFBLEVBQUs7TUFBTCxDQUE5QjthQUNBLEVBQUUsQ0FBQyxJQUFILENBQVEsbUNBQVIsRUFDQTtRQUFBLEtBQUEsRUFBTTtNQUFOLENBREEsRUFDc0IsUUFBQSxDQUFBLENBQUE7ZUFDcEIsRUFBRSxDQUFDLElBQUgsQ0FBUSxPQUFPLENBQUMsUUFBaEI7TUFEb0IsQ0FEdEI7SUFKbUIsQ0FBckI7RUFIdUIsQ0FBekI7QUFEZ0MsQ0FBZDs7QUFZcEIsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuIyBleGFtcGxlT3B0cyA9XG4jICAgZHJvcEhlYWRlcjogJ2Ryb3AgYSBmaWxlJ1xuIyAgIHVwbG9hZExhYmVsOiAndXBsb2FkIGRyb3BwZWQgZmlsZSdcbiMgICBwYXJzZU1zZzogJ3BhcnNlIGRyb3BwZWQgZmlsZSdcblxuXG5kcm9wem9uZV90ZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKG9wdGlvbnMpIC0+XG4gIHRjLmRpdiAnLmRyb3B6b25lLmNhcmQnLCAtPlxuICAgIHRjLmRpdiAnLmNhcmQtaGVhZGVyJywgLT5cbiAgICAgIHRjLnRleHQgb3B0aW9ucy5kcm9wSGVhZGVyXG4gICAgdGMuZGl2ICcuY2FyZC1ib2R5JywgLT5cbiAgICAgIHRjLmRpdiAnLnBhcnNlLWJ0bi5idG4uYnRuLXByaW1hcnknLCBzdHlsZTonZGlzcGxheTpub25lJywgLT5cbiAgICAgICAgdGMudGV4dCBvcHRpb25zLnVwbG9hZExhYmVsXG4gICAgICB0Yy5pbnB1dCAnLmZpbGUtaW5wdXQuaW5wdXQnLCB0eXBlOidmaWxlJ1xuICAgICAgdGMuc3BhbiAnLnBhcnNlLWNob3Nlbi1idG4uYnRuLmJ0bi1wcmltYXJ5JyxcbiAgICAgIHN0eWxlOidkaXNwbGF5Om5vbmUnLCAtPlxuICAgICAgICB0Yy50ZXh0IG9wdGlvbnMucGFyc2VNc2dcbiAgICAgICAgXG5leHBvcnQgZGVmYXVsdCBkcm9wem9uZV90ZW1wbGF0ZVxuIl19
