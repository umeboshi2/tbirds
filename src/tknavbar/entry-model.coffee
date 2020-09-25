import { Model } from 'backbone'

class NavbarEntry extends Model
  defaults:
    label: 'App Label'
    url: '#app'
    single_applet: false
    applets: []
    urls: []
    
export default NavbarEntry
