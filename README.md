# tbirds
JS and coffeescript modules

##  Introduction

Tbirds is a collection of helper modules to more easily create 
a frontend single page app using [marionette](http://marionettejs.com/), 
[bootstrap v3](http://getbootstrap.com/).  Tbirds makes use of 
[marionette.toolkit](http://roundingwellos.github.io/marionette.toolkit/) 
to help manage the app components.  These modules are meant to be 
used with [webpack](https://webpack.js.org/).  In theory, many of 
these modules can be also used with [browserify](http://browserify.org/), 
however the (optional) 
[main-router](https://github.com/umeboshi2/tbirds/blob/master/src/main-router.coffee) 
depends on webpack's dynamic import, to help with code splitting.

**The concept is still being designed and modified.  Please consider 
this mostly alpha quality code.**

## Purpose

Tbirds consists of a simple set of modules to help build different 
frontends with differing requirements and concerns.  The goal of the 
project is to provide separable modules in a "pick and choose" manner 
to help build a frontend.  With this in mind, effort has been made to 
create an environment where many components are optional and can be 
specified in an "AppConfig" object.

For example, many apps use a "navbar", usually at the top of the 
page.  However, if you are creating an app to be run in another 
site's ```<iframe>```, you probably won't need a navbar.  Hence, 
the navbar is made optional in the "AppConfig."  If the app has 
a backend that requires, or makes use of, an authenticated user, 
this can also be specified in the "AppConfig". (Currently, the 
user menu view is tied to the navbar, so at the moment, the 
optional user requires the navbar to be present.  This probably 
won't be changed until the need arises, but feel free to make 
this happen if you need such functionality.)

## Applets and Child apps

A distinction is made between these similar terms.  The world is 
still young and the word "applet" is not very clearly 
[defined](https://en.wikipedia.org/wiki/Applet).  In tbirds, a 
child app correspons to a 
[Toolkit Child App](https://github.com/RoundingWellOS/marionette.toolkit/blob/master/docs/mixins/child-apps.md), which merely means it belongs to 
a [parent app](https://github.com/RoundingWellOS/marionette.toolkit/blob/master/docs/app.md).  An **applet** is also a **child app**, that uses 
a marionette [AppRouter](http://marionettejs.com/docs/master/marionette.approuter.html).  The applet concept is to help organize the frontend into 
a collection of components, each in charge of a specific set of 
functionality.

When using the [main-router](https://github.com/umeboshi2/tbirds/blob/master/src/main-router.coffee), the applets are geared to be loaded upon demand 
by matching the route and loading the corresponding applet.  The purpose 
of this feature is to eventually provide that certain applets the ability 
to be maintained separately in their own code repositories.  The longterm 
goal is to be able to include an applet in the 
project by a simple ``` npm install --save-dev applet-foobar```, allowing 
the same applet to be reused in a variety of frontend apps.


## Default AppConfig

```coffee
MainPageLayout = require './tklayout'

module.exports =
  # This is the html element to attach
  # the app.  This is to be marionette Region
  appRegion: 'body'
  # This is a marionette view with regions
  layout: MainPageLayout
  # here you can set options to be passed
  # to the layout
  layoutOptions: {}
  # set this to false if you don't need
  # messages
  useMessages: true
  # set useNavbar to false to skip
  # using a navbar in the app
  useNavbar: true
  # this is the brand entry for the navbar
  brand:
    label: 'Tk-Test'
    url: '#'
  # applet to be used for frontdoor
  # 
  frontdoorApplet: 'frontdoor'

  # Does the application have a user?
  # If this is true, a userMenuApp must be set
  # to a toolkit App
  hasUser: false

  # If there is a user, provide a user menu app
  userMenuApp: undefined
  
  # if needLogin is true, frontdoorApplet should
  # provide a #frontdoor/login route which will
  # be displayed by default
  needLogin: false

  # the url for login
  loginUrl: '/#frontdoor/login'
  guestUserName: 'Guest'
  
  # navbar entries is an array of objects
  navbarEntries: []
  # appletRoutes lets you place
  # the applet name as a property
  # with the applet directory name
  # as a value.  The AppRouter should
  # respond to property prefixes urls.
  appletRoutes:
    pages: 'frontdoor'
    
```

## Presumptions

Tbirds presumes that the project is using both bootstrap and 
font-awesome for the page style and icons.  The builtin templates 
use bootstrap heavily for grid layout, dropdowns, and other 
bootstrap components.

## Application Structure

The main application object is the [TopApp](https://github.com/umeboshi2/tbirds/blob/master/src/top-app.coffee), which is the main container for 
all the child apps and applets.  Currently, the "TopApp" contains two 
optional child apps, "messages", and "navbar".

### Backbone.Radio

The 'global' channel is used to help manage the app.

- requests (The first must be requested by the 
  developer in the entry file before calling ```app.start()```)

	- ```'main:app:route'``` -> registers the "main-router".  *This must be 
	  requested by the developer in the entry file after creating 
	  the app.* (This should be renamed.)
	  
	- ```'main:app:object'``` -> returns the "TopApp" object.

	- ```'main:app:config'``` -> returns the "AppConfig" object.
	
	- ```'main-router'``` -> returns the main dispatch router.
	
	- ```'main-controller'``` -> returns the RequireController used by the 
	  "main-router".
	  
	- ```'main:applet:register'``` (appname) -> registers the applet with 
	the application.  This tells the dispatcher that the routes for 
	the AppRouter have already been registered, so it will refrain 
	from attempting to load the applet.  This is called upon the 
	loading of the applet by the **RequireController**.
	
	- ```'main:applet:unregister'``` (applet) -> this is a placeholder 
	to remove an applet from the application.  This is not being 
	used currently, but is reserved in anticipation of the 
	potential to unload an applet to conserve memory in a large 
	application.
	
### Main Regions

- messages: '#messages'
  
- navbar: '#navbar-view-container'

- modal: '#modal'
    
- applet: '#applet-content'
    
- footer: '#footer' **(Not currently used)**


### Example

```coffee
Backbone = require 'backbone'
require 'bootstrap'

require 'tbirds/applet-router'
TopApp = require 'tbirds/top-app'
config = require 'tbirds/app-config'
config.brand.label = 'Example'

MainChannel = Backbone.Radio.channel 'global'

app = new TopApp
  appConfig: config
  
# register the main router
MainChannel.request 'main:app:route'

# start the app
app.start()
```

## Applets

The applets are the actual heart of the single page application.  Each 
applet handles separate features of core functionality.  The main 
layout is nothing more than a vehicle for arranging the applications 
on the page by using the navbar, providing a central container for 
the applet, and also providing a container for "alert" messages.

Each applet must have a ```Marionette.AppRouter``` and a corresponding 
controller object.  Each applet must have a route that corresponds to 
the name of the applet.

### Example AppRouter

```coffee
class Router extends Marionette.AppRouter
  appRoutes:
    'dbdocs': 'list_pages'
    'dbdocs/documents': 'list_pages'
    'dbdocs/documents/new': 'new_page'
    'dbdocs/documents/view/:id': 'view_page'
    'dbdocs/documents/edit/:id': 'edit_page'
```

