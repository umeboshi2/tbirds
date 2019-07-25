var BaseCalendarView;

import {
  View
} from 'backbone.marionette';

import {
  Calendar
} from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';

import timeGridPlugin from '@fullcalendar/timegrid';

import {
  DateTime
} from 'luxon';

import '@fullcalendar/core/main.css';

import '@fullcalendar/daygrid/main.css';

import '@fullcalendar/timegrid/main.css';

import '@fullcalendar/list/main.css';

BaseCalendarView = (function() {
  class BaseCalendarView extends View {
    onBeforeDestroy() {
      var cal;
      cal = this.fullCalendar.destroy();
      if (__DEV__) {
        return console.log('calendar destroyed');
      }
    }

    onDomRefresh() {
      var calendarOptions;
      calendarOptions = this.getOption('calendarOptions') || {};
      if (!(calendarOptions != null ? calendarOptions.plugins : void 0)) {
        calendarOptions.plugins = [dayGridPlugin, timeGridPlugin];
      }
      this.fullCalendar = new Calendar(this.$el.get(0), calendarOptions);
      return this.fullCalendar.render();
    }

  };

  BaseCalendarView.prototype.template = false;

  return BaseCalendarView;

}).call(this);

export default BaseCalendarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYmFzZS1jYWxlbmRhci5qcyIsInNvdXJjZXMiOlsidmlld3MvYmFzZS1jYWxlbmRhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sYUFBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxRQUFUO0NBQUEsTUFBQTs7QUFFQSxPQUFBOztBQUNBLE9BQUE7O0FBQ0EsT0FBQTs7QUFDQSxPQUFBOztBQUdNO0VBQU4sTUFBQSxpQkFBQSxRQUErQixLQUEvQjtJQUVFLGVBQWlCLENBQUEsQ0FBQTtBQUNmLFVBQUE7TUFBQSxHQUFBLEdBQU0sSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQUE7TUFDTixJQUFHLE9BQUg7ZUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBREY7O0lBRmU7O0lBSWpCLFlBQWMsQ0FBQSxDQUFBO0FBQ1osVUFBQTtNQUFBLGVBQUEsR0FBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxpQkFBWCxDQUFBLElBQWlDLENBQUE7TUFDbkQsSUFBRyw0QkFBSSxlQUFlLENBQUUsaUJBQXhCO1FBQ0UsZUFBZSxDQUFDLE9BQWhCLEdBQTBCLENBQ3hCLGFBRHdCLEVBRXhCLGNBRndCLEVBRDVCOztNQUtBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUksUUFBSixDQUFhLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUFTLENBQVQsQ0FBYixFQUEwQixlQUExQjthQUNoQixJQUFDLENBQUEsWUFBWSxDQUFDLE1BQWQsQ0FBQTtJQVJZOztFQU5oQjs7NkJBQ0UsUUFBQSxHQUFVOzs7Ozs7QUFlWixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuaW1wb3J0IHsgQ2FsZW5kYXIgfSBmcm9tICdAZnVsbGNhbGVuZGFyL2NvcmUnXG5pbXBvcnQgZGF5R3JpZFBsdWdpbiBmcm9tICdAZnVsbGNhbGVuZGFyL2RheWdyaWQnXG5pbXBvcnQgdGltZUdyaWRQbHVnaW4gZnJvbSAnQGZ1bGxjYWxlbmRhci90aW1lZ3JpZCdcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nXG5cbmltcG9ydCAnQGZ1bGxjYWxlbmRhci9jb3JlL21haW4uY3NzJ1xuaW1wb3J0ICdAZnVsbGNhbGVuZGFyL2RheWdyaWQvbWFpbi5jc3MnXG5pbXBvcnQgJ0BmdWxsY2FsZW5kYXIvdGltZWdyaWQvbWFpbi5jc3MnXG5pbXBvcnQgJ0BmdWxsY2FsZW5kYXIvbGlzdC9tYWluLmNzcydcblxuXG5jbGFzcyBCYXNlQ2FsZW5kYXJWaWV3IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogZmFsc2VcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIGNhbCA9IEBmdWxsQ2FsZW5kYXIuZGVzdHJveSgpXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgJ2NhbGVuZGFyIGRlc3Ryb3llZCdcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIGNhbGVuZGFyT3B0aW9ucyA9IEBnZXRPcHRpb24oJ2NhbGVuZGFyT3B0aW9ucycpIG9yIHt9XG4gICAgaWYgbm90IGNhbGVuZGFyT3B0aW9ucz8ucGx1Z2luc1xuICAgICAgY2FsZW5kYXJPcHRpb25zLnBsdWdpbnMgPSBbXG4gICAgICAgIGRheUdyaWRQbHVnaW5cbiAgICAgICAgdGltZUdyaWRQbHVnaW5cbiAgICAgICAgXVxuICAgIEBmdWxsQ2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIgQCRlbC5nZXQoMCksIGNhbGVuZGFyT3B0aW9uc1xuICAgIEBmdWxsQ2FsZW5kYXIucmVuZGVyKClcbiAgICBcbmV4cG9ydCBkZWZhdWx0IEJhc2VDYWxlbmRhclZpZXdcblxuIl19
