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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYmFzZS1jYWxlbmRhci5qcyIsInNvdXJjZXMiOlsidmlld3MvYmFzZS1jYWxlbmRhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBRUEsT0FBQTtFQUFTLFFBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sYUFBUCxNQUFBOztBQUNBLE9BQU8sY0FBUCxNQUFBOztBQUdBLE9BQUE7O0FBQ0EsT0FBQTs7QUFDQSxPQUFBOztBQUNBLE9BQUE7O0FBR007RUFBTixNQUFBLGlCQUFBLFFBQStCLEtBQS9CO0lBRUUsZUFBaUIsQ0FBQSxDQUFBO0FBQ2YsVUFBQTtNQUFBLEdBQUEsR0FBTSxJQUFDLENBQUEsWUFBWSxDQUFDLE9BQWQsQ0FBQTtNQUNOLElBQUcsT0FBQSxJQUFZLEtBQWY7ZUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDLEdBQWxDLEVBREY7O0lBRmU7O0lBSWpCLFlBQWMsQ0FBQSxDQUFBO0FBQ1osVUFBQTtNQUFBLGVBQUEsR0FBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxpQkFBWCxDQUFBLElBQWlDLENBQUE7TUFDbkQsSUFBRyw0QkFBSSxlQUFlLENBQUUsaUJBQXhCO1FBQ0UsZUFBZSxDQUFDLE9BQWhCLEdBQTBCLENBQ3hCLGFBRHdCLEVBRXhCLGNBRndCLEVBRDVCOztNQUtBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUksUUFBSixDQUFhLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUFTLENBQVQsQ0FBYixFQUEwQixlQUExQjthQUNoQixJQUFDLENBQUEsWUFBWSxDQUFDLE1BQWQsQ0FBQTtJQVJZOztFQU5oQjs7NkJBQ0UsUUFBQSxHQUFVOzs7Ozs7QUFlWixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuaW1wb3J0IHsgQ2FsZW5kYXIgfSBmcm9tICdAZnVsbGNhbGVuZGFyL2NvcmUnXG5pbXBvcnQgZGF5R3JpZFBsdWdpbiBmcm9tICdAZnVsbGNhbGVuZGFyL2RheWdyaWQnXG5pbXBvcnQgdGltZUdyaWRQbHVnaW4gZnJvbSAnQGZ1bGxjYWxlbmRhci90aW1lZ3JpZCdcbiNpbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJ1xuXG5pbXBvcnQgJ0BmdWxsY2FsZW5kYXIvY29yZS9tYWluLmNzcydcbmltcG9ydCAnQGZ1bGxjYWxlbmRhci9kYXlncmlkL21haW4uY3NzJ1xuaW1wb3J0ICdAZnVsbGNhbGVuZGFyL3RpbWVncmlkL21haW4uY3NzJ1xuaW1wb3J0ICdAZnVsbGNhbGVuZGFyL2xpc3QvbWFpbi5jc3MnXG5cblxuY2xhc3MgQmFzZUNhbGVuZGFyVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IGZhbHNlXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBjYWwgPSBAZnVsbENhbGVuZGFyLmRlc3Ryb3koKVxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyAnY2FsZW5kYXIgZGVzdHJveWVkJywgY2FsXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBjYWxlbmRhck9wdGlvbnMgPSBAZ2V0T3B0aW9uKCdjYWxlbmRhck9wdGlvbnMnKSBvciB7fVxuICAgIGlmIG5vdCBjYWxlbmRhck9wdGlvbnM/LnBsdWdpbnNcbiAgICAgIGNhbGVuZGFyT3B0aW9ucy5wbHVnaW5zID0gW1xuICAgICAgICBkYXlHcmlkUGx1Z2luXG4gICAgICAgIHRpbWVHcmlkUGx1Z2luXG4gICAgICAgIF1cbiAgICBAZnVsbENhbGVuZGFyID0gbmV3IENhbGVuZGFyIEAkZWwuZ2V0KDApLCBjYWxlbmRhck9wdGlvbnNcbiAgICBAZnVsbENhbGVuZGFyLnJlbmRlcigpXG4gICAgXG5leHBvcnQgZGVmYXVsdCBCYXNlQ2FsZW5kYXJWaWV3XG5cbiJdfQ==
