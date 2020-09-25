var NavbarEntry;

import {
  Model
} from 'backbone';

NavbarEntry = (function() {
  class NavbarEntry extends Model {};

  NavbarEntry.prototype.defaults = {
    label: 'App Label',
    url: '#app',
    single_applet: false,
    applets: [],
    urls: []
  };

  return NavbarEntry;

}).call(this);

export default NavbarEntry;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXIvZW50cnktbW9kZWwuanMiLCJzb3VyY2VzIjpbInRrbmF2YmFyL2VudHJ5LW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFFTTtFQUFOLE1BQUEsWUFBQSxRQUEwQixNQUExQixDQUFBOzt3QkFDRSxRQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU8sV0FBUDtJQUNBLEdBQUEsRUFBSyxNQURMO0lBRUEsYUFBQSxFQUFlLEtBRmY7SUFHQSxPQUFBLEVBQVMsRUFIVDtJQUlBLElBQUEsRUFBTTtFQUpOOzs7Ozs7QUFNSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJ2JhY2tib25lJ1xuXG5jbGFzcyBOYXZiYXJFbnRyeSBleHRlbmRzIE1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIGxhYmVsOiAnQXBwIExhYmVsJ1xuICAgIHVybDogJyNhcHAnXG4gICAgc2luZ2xlX2FwcGxldDogZmFsc2VcbiAgICBhcHBsZXRzOiBbXVxuICAgIHVybHM6IFtdXG4gICAgXG5leHBvcnQgZGVmYXVsdCBOYXZiYXJFbnRyeVxuIl19
