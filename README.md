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
goal is to be able to include an applet in the project by a simple 
```npm install --save-dev applet-foobar```, allowing the same applet to 
be reused in a variety of frontend apps.


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
font-awesome for the page style and icons.

## Application Structure (current)

The main application object is the [TopApp](https://github.com/umeboshi2/tbirds/blob/master/src/top-app.coffee), which is the main container for 
all the child apps and applets.  Currently, the "TopApp" contains two 
optional child apps, "messages", and "navbar".



## Backbone.Radio

The 'global' channel is used to help manage the app.

- requests (The first three must be set or requested by the 
  developer in the entry file before calling ```app.start()```)

	- ```'main:app:object'``` -> returns the "TopApp" object. *This must be 
	  set by the developer in the entry file creating the app.*

	- ```'main:app:config'``` -> returns the "AppConfig" object. *This must be 
	  set by the developer in the entry file creating the app.*
	
	- ```'main:app:route'``` -> registers the "main-router".  *This must be 
	  requested by the developer in the entry file after creating 
	  the app.*
	  
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
	


## Application Structure (outdated)



The structure is to run a multi page website as a collection 
of single page applications.  The webserver will provide an empty 
page, with only *font-awesome* and *bootstrap* css resources loaded 
in the head of the page.  The body is expected to be empty, or filled
with content expressing that the app is loading.

Backbone.Radio is being used to provide an "api"(I hope to flesh it out
more in the future) for communication between the child applets and the 
application, as well as between the children.  The main application has 
two channels, the main "global" channel and a "messages" channel.  Each 
applet should also provide it's own channel.  **An applet that depends 
on another applet's channel should be "required" after that other 
applet in the main app file.** 


### Global Radio Channel

#### Replies

- **main:app:object**

	- returns the marionette app object
	
	- set in agate when creating app
  
- **mainpage:init** 

	- signature (appmodel) ->
	
	- renders main page layout and child views
	
	- triggers **mainpage:displayed** event
	
	- set handler in application
	
- **applet:{*appname*}:route**

	- initializes approute and controller for applet
	
- **main:app:get-region**

	- retrieve a region from the root layout
	
	- this will be either removed or renamed to make it known 
	  that only root layout regions can be retrived through this
	  request

- **main:app:appmodel**

	- returns the appmodel
	
	- set handler in application

#### Events

- **mainpage:displayed** 

	- use this to render child views
	
	- set handler in application

### The Entry File

I keep the app for each page in an "entries" directory in the client source 
tree.  This lets me "require" a "base" or "startup" module that is common to 
each page, holding much of the boilerplate.  In the base entry file, the 
initial requirements are performed, such as importing the bootstrap 
javascript , as well as the modules that define handlers for the application 
and message radio channels.

#### App Model

After that an Appmodel should be defined, based on the BaseAppModel in agate.  
The appmodel contains basic structure of your application:

- **apiRoot:** this is new, but it will be the prefix to api calls

- **brand:**

	- name: the name of the brand at the top left corner
	- url: the link

- **container:** either "container" or "container-fluid"

- **layout_template:** if this is defined, it will be used
  instead of the default layout template.

- **frontdoor_app:**  This is the name of the applet 
  that will be used for the initial entry to the page.  **No** 
  backbone routing is setup in the main application space, and 
  responding to routing requests is the responsibility of the 
  applet.  Even though requiring the applets is still necessary in 
  the main application file, the application itself is just the 
  shell to run applets, and this requires an applet for initial 
  entry.
  
- **hasUser:** Are we running from a web server and expecting a login, or
  are we on a static site like github pages.  This being true, by default, 
  expects a "userprofile" app **(FIXME: which should be named in the 
  appmodel)** to be required and ready.
  
- **needUser:**  This isn't used yet, but can be used to force 
  a user to a login view.
  
- **frontdoor_sidebar:**  This isn't being used now, and may not 
  be supported anymore.
  
- **applets:**  This is a list (an array) of objects representing the applets
  being used with the application.  The "frontdoor" and "userprofile" 
  applets don't need to be listed here.  **Even though these are being 
  listed here, they need to be required separately and expressly in the 
  application file, due to how the webpack configuration works.**
  
  - Each applet should have a set of properties:
  
	  - **name:**  This is the label displayed on the navbar.
	  
	  - **url**  This is the url for the applet (#appname).
	  
	  - **appname:**  This is the name of the app and every route
	  it desribes should begin with "appname," e.g. "/#appname/viewstatus."
	  
  - An "applet" in the array that has no name will be treated as a 
  simple link, using the name and url properties.
  
- **regions:**  This is a list of regions for the region manager and should
  correspond to the layout template.  The named regions that are used most 
  are "content, sidebar, messages, and modal."

- **routes:**  This is not being used.


#### Prepare the App

*This procedure needs to be modularized.*

The "prepare_app" function takes a Marionette.Application object and 
an App Model as paramaters, and uses the app model to prepare the 
application to display views and handle events.

The function is responsible for creating the region manager and 
using the appregion property of the app model to initialize the 
different regions and add them to the manager.  By default, he region 
named "modal" uses a special region to handle the special requirements 
of a modal view.  Also, the *navbar* and *content* regions use a 
special region class providing for a jquery slide-down effect on
showing the view.

Once the region manager is setup, the *navbar* region is set to 
listen to the show event and trigger an event on the global 
channel named *"appregion:navbar:displayed"*

The function also registers handlers on the global channel 
providing access to the app object, the region manager, and 
a request for each region by name.

The function then creates a handler for the 'start' event on 
the marionette application.  This handler starts everything when
app.start() is called.  The handler uses the appmodel to get the 
appnames of the applets, then requests "applet:#{appname}:route" 
on the global channel to register the routes for each applet.  
The handler also call the *route* request for the frontdoor applet, 
and if the *hasUser* property of the app model is true, the *route* 
request for the user profile applet is called as well.  

The app.start handler then uses the global radio channel to call the 
init page function passing the app model as an argument.  Then finally, 
it invokes Backbone.history.start(), if necessary.

#### Start the App

After being prepared, the app is started with app.start().  Currently,
work is being done to load the authenticated user before starting the 
app, if needed by the app model, which will provide a simple startup 
procedure that can be dictated almost wholly by the app model.


#### Init Page

The init page function initializes the main layout view using the default 
layout template, which can be overridden in the app model.

A handler is defined to listen for the *show* event on the layout view.  
When the view is shown, the *navbar* and *messages* views are then 
shown.

The *mainview* region, which is attached to the *<body>* tag is then 
told to *show* the layout view, starting the entire page view sequence.


### Applets


