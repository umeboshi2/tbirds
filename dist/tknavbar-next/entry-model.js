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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtuYXZiYXItbmV4dC9lbnRyeS1tb2RlbC5qcyIsInNvdXJjZXMiOlsidGtuYXZiYXItbmV4dC9lbnRyeS1tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBRU07RUFBTixNQUFBLFlBQUEsUUFBMEIsTUFBMUIsQ0FBQTs7d0JBQ0UsUUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPLFdBQVA7SUFDQSxHQUFBLEVBQUssTUFETDtJQUVBLGFBQUEsRUFBZSxLQUZmO0lBR0EsT0FBQSxFQUFTLEVBSFQ7SUFJQSxJQUFBLEVBQU07RUFKTjs7Ozs7O0FBTUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdiYWNrYm9uZSdcblxuY2xhc3MgTmF2YmFyRW50cnkgZXh0ZW5kcyBNb2RlbFxuICBkZWZhdWx0czpcbiAgICBsYWJlbDogJ0FwcCBMYWJlbCdcbiAgICB1cmw6ICcjYXBwJ1xuICAgIHNpbmdsZV9hcHBsZXQ6IGZhbHNlXG4gICAgYXBwbGV0czogW11cbiAgICB1cmxzOiBbXVxuICAgIFxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyRW50cnlcbiJdfQ==
