// use polyfill for String.endsWith if needed
//if not String.prototype?.endsWith
//  String.prototype.endsWith = string_endswith
export default function(searchString, position) {
  var lastIndex, subjectString;
  subjectString = this.toString();
  if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) { // noqa
    position = subjectString.length;
  }
  position -= searchString.length;
  lastIndex = subjectString.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9wb2x5ZmlsbHMvc3RyLWVuZHN3aXRoLmpzIiwic291cmNlcyI6WyJ1dGlsL3BvbHlmaWxscy9zdHItZW5kc3dpdGguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxPQUFBLFFBQWUsUUFBQSxDQUFDLFlBQUQsRUFBZSxRQUFmLENBQUE7QUFDYixNQUFBLFNBQUEsRUFBQTtFQUFBLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLFFBQUQsQ0FBQTtFQUNoQixJQUFHLE9BQU8sUUFBUCxLQUFtQixRQUFuQixJQUErQixDQUFDLFFBQUEsQ0FBUyxRQUFULENBQWhDLElBQXNELElBQUksQ0FBQyxLQUFMLENBQVcsUUFBWCxDQUFBLEtBQXdCLFFBQTlFLElBQTBGLFFBQUEsR0FBVyxhQUFhLENBQUMsTUFBdEg7SUFDRSxRQUFBLEdBQVcsYUFBYSxDQUFDLE9BRDNCOztFQUVBLFFBQUEsSUFBWSxZQUFZLENBQUM7RUFDekIsU0FBQSxHQUFZLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFlBQXRCLEVBQW9DLFFBQXBDO1NBQ1osU0FBQSxLQUFhLENBQUMsQ0FBZCxJQUFvQixTQUFBLEtBQWE7QUFOcEIiLCJzb3VyY2VzQ29udGVudCI6WyIjIHVzZSBwb2x5ZmlsbCBmb3IgU3RyaW5nLmVuZHNXaXRoIGlmIG5lZWRlZFxuI2lmIG5vdCBTdHJpbmcucHJvdG90eXBlPy5lbmRzV2l0aFxuIyAgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IHN0cmluZ19lbmRzd2l0aFxuZXhwb3J0IGRlZmF1bHQgKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIC0+XG4gIHN1YmplY3RTdHJpbmcgPSBAdG9TdHJpbmcoKVxuICBpZiB0eXBlb2YgcG9zaXRpb24gIT0gJ251bWJlcicgb3IgIWlzRmluaXRlKHBvc2l0aW9uKSBvciBNYXRoLmZsb29yKHBvc2l0aW9uKSAhPSBwb3NpdGlvbiBvciBwb3NpdGlvbiA+IHN1YmplY3RTdHJpbmcubGVuZ3RoICMgbm9xYVxuICAgIHBvc2l0aW9uID0gc3ViamVjdFN0cmluZy5sZW5ndGhcbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aFxuICBsYXN0SW5kZXggPSBzdWJqZWN0U3RyaW5nLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbilcbiAgbGFzdEluZGV4ICE9IC0xIGFuZCBsYXN0SW5kZXggPT0gcG9zaXRpb25cbiJdfQ==