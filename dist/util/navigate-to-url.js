import Backbone from 'backbone';

export default function(url) {
  var r;
  if (url.split('/')[0] === '') {
    return window.location = url;
  } else {
    r = new Backbone.Router;
    return r.navigate(url, {
      trigger: true
    });
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC9uYXZpZ2F0ZS10by11cmwuanMiLCJzb3VyY2VzIjpbInV0aWwvbmF2aWdhdGUtdG8tdXJsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBLFFBQWUsUUFBQSxDQUFDLEdBQUQsQ0FBQTtBQUNiLE1BQUE7RUFBQSxJQUFHLEdBQUcsQ0FBQyxLQUFKLENBQVUsR0FBVixDQUFlLENBQUEsQ0FBQSxDQUFmLEtBQXFCLEVBQXhCO1dBQ0UsTUFBTSxDQUFDLFFBQVAsR0FBa0IsSUFEcEI7R0FBQSxNQUFBO0lBR0UsQ0FBQSxHQUFJLElBQUksUUFBUSxDQUFDO1dBQ2pCLENBQUMsQ0FBQyxRQUFGLENBQVcsR0FBWCxFQUFnQjtNQUFBLE9BQUEsRUFBUTtJQUFSLENBQWhCLEVBSkY7O0FBRGEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5leHBvcnQgZGVmYXVsdCAodXJsKSAtPlxuICBpZiB1cmwuc3BsaXQoJy8nKVswXSA9PSAnJ1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybFxuICBlbHNlXG4gICAgciA9IG5ldyBCYWNrYm9uZS5Sb3V0ZXJcbiAgICByLm5hdmlnYXRlIHVybCwgdHJpZ2dlcjp0cnVlXG5cbiJdfQ==
