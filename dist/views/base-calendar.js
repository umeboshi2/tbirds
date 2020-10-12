var BaseCalendarView;

import {
  View
} from 'backbone.marionette';

import {
  Calendar
} from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';

import timeGridPlugin from '@fullcalendar/timegrid';

import '@fullcalendar/core/main.css';

import '@fullcalendar/daygrid/main.css';

import '@fullcalendar/timegrid/main.css';

import '@fullcalendar/list/main.css';

BaseCalendarView = (function() {
  class BaseCalendarView extends View {
    onBeforeDestroy() {
      var cal;
      cal = this.fullCalendar.destroy();
      if (__DEV__ && DEBUG) {
        return console.log('calendar destroyed', cal);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYmFzZS1jYWxlbmRhci5qcyIsInNvdXJjZXMiOlsidmlld3MvYmFzZS1jYWxlbmRhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sYUFBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUdBLE9BQUE7O0FBQ0EsT0FBQTs7QUFDQSxPQUFBOztBQUNBLE9BQUE7O0FBR007RUFBTixNQUFBLGlCQUFBLFFBQStCLEtBQS9CO0lBRUUsZUFBaUIsQ0FBQSxDQUFBO0FBQ25CLFVBQUE7TUFBSSxHQUFBLEdBQU0sSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQUE7TUFDTixJQUFHLE9BQUEsSUFBWSxLQUFmO2VBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQyxHQUFsQyxFQURGOztJQUZlOztJQUlqQixZQUFjLENBQUEsQ0FBQTtBQUNoQixVQUFBO01BQUksZUFBQSxHQUFrQixJQUFDLENBQUEsU0FBRCxDQUFXLGlCQUFYLENBQUEsSUFBaUMsQ0FBQTtNQUNuRCxJQUFHLDRCQUFJLGVBQWUsQ0FBRSxpQkFBeEI7UUFDRSxlQUFlLENBQUMsT0FBaEIsR0FBMEIsQ0FDeEIsYUFEd0IsRUFFeEIsY0FGd0IsRUFENUI7O01BS0EsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsSUFBSSxRQUFKLENBQWEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxHQUFMLENBQVMsQ0FBVCxDQUFiLEVBQTBCLGVBQTFCO2FBQ2hCLElBQUMsQ0FBQSxZQUFZLENBQUMsTUFBZCxDQUFBO0lBUlk7O0VBTmhCOzs2QkFDRSxRQUFBLEdBQVU7Ozs7OztBQWVaLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5pbXBvcnQgeyBDYWxlbmRhciB9IGZyb20gJ0BmdWxsY2FsZW5kYXIvY29yZSdcbmltcG9ydCBkYXlHcmlkUGx1Z2luIGZyb20gJ0BmdWxsY2FsZW5kYXIvZGF5Z3JpZCdcbmltcG9ydCB0aW1lR3JpZFBsdWdpbiBmcm9tICdAZnVsbGNhbGVuZGFyL3RpbWVncmlkJ1xuI2ltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nXG5cbmltcG9ydCAnQGZ1bGxjYWxlbmRhci9jb3JlL21haW4uY3NzJ1xuaW1wb3J0ICdAZnVsbGNhbGVuZGFyL2RheWdyaWQvbWFpbi5jc3MnXG5pbXBvcnQgJ0BmdWxsY2FsZW5kYXIvdGltZWdyaWQvbWFpbi5jc3MnXG5pbXBvcnQgJ0BmdWxsY2FsZW5kYXIvbGlzdC9tYWluLmNzcydcblxuXG5jbGFzcyBCYXNlQ2FsZW5kYXJWaWV3IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogZmFsc2VcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIGNhbCA9IEBmdWxsQ2FsZW5kYXIuZGVzdHJveSgpXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nICdjYWxlbmRhciBkZXN0cm95ZWQnLCBjYWxcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIGNhbGVuZGFyT3B0aW9ucyA9IEBnZXRPcHRpb24oJ2NhbGVuZGFyT3B0aW9ucycpIG9yIHt9XG4gICAgaWYgbm90IGNhbGVuZGFyT3B0aW9ucz8ucGx1Z2luc1xuICAgICAgY2FsZW5kYXJPcHRpb25zLnBsdWdpbnMgPSBbXG4gICAgICAgIGRheUdyaWRQbHVnaW5cbiAgICAgICAgdGltZUdyaWRQbHVnaW5cbiAgICAgICAgXVxuICAgIEBmdWxsQ2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIgQCRlbC5nZXQoMCksIGNhbGVuZGFyT3B0aW9uc1xuICAgIEBmdWxsQ2FsZW5kYXIucmVuZGVyKClcbiAgICBcbmV4cG9ydCBkZWZhdWx0IEJhc2VDYWxlbmRhclZpZXdcblxuIl19
