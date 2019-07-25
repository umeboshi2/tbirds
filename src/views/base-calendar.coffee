import { View } from 'backbone.marionette'

import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DateTime } from 'luxon'

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'


class BaseCalendarView extends View
  template: false
  onBeforeDestroy: ->
    cal = @fullCalendar.destroy()
    if __DEV__
      console.log 'calendar destroyed'
  onDomRefresh: ->
    calendarOptions = @getOption('calendarOptions') or {}
    if not calendarOptions?.plugins
      calendarOptions.plugins = [
        dayGridPlugin
        timeGridPlugin
        ]
    @fullCalendar = new Calendar @$el.get(0), calendarOptions
    @fullCalendar.render()
    
export default BaseCalendarView

