import $ from 'jquery'
export default ()  ->
  $('html, body').animate {scrollTop: 0}, 'fast'
