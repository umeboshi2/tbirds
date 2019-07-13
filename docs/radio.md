
## Main Channel (global)

### General


- **main:app:object**

	The main appliation object.

- **main:app:config**

	The application config object
	

### Applet Handling

- **main:applet:register**

  (appname, applet) -> registers an applet with a name
  
- **main:applet:unregister**

  (appname) -> removes an applet from registered applets

- **main:applet:get-applet**

  (appname) -> retuns the applet object from registered applets

- **main-controller**

	This is the main controller that performs the magic of 
	loading the applets dynamically.
	
- **main-router**

	This is the top level router that attaches to the main
	controller and provides the route pattern for loading 
	applets.
	


### Auth Token

- **main:app:authBeforeSend**
  
  Attaches "Authorization" header to jquery xhr request.
  
- Backbone models/collections that send auth header

	- **main:app:AuthModel**

	- **main:app:AuthCollection**

	- **main:app:AuthUnPaginated**

- **main:app:AuthRefresh**
  
  Backbone model for refreshing auth token.
  
- **main:app:currentUser**
  
  A Backbone model to be used as a singleton for 
  referencing the current user

- **main:app:set-guest-user**
  
  Clears the user and sets the model to be a guest.
  
- **main:app:set-auth-token**
  
  Saves the token to localStorage.
  
- **main:app:decode-auth-token**
  
  Decodes current token and updates current user.  Use this
  request to get the logged in user.
  
- **main:app:refresh-token**
  
  Called to refresh auth token.  This should be called 
  periodically from another function.
  
- **main:app:destroy-auth-token**
  
  Deletes token from localStorage and sets user to guest.
  

### Misc

- **main:app:show-modal**
  
  Shows a modal view
  
  
## Message Channel (messages)

- **messages**

	Returns the single Backbone collection holding the messages.
	
- **display-message**

	(msg, lvl='info', icon=false) -> Displays a message
	
- **${LEVEL}**

	(msg, icon=false) ->  Displays a message at the specified "level."
	
	Levels:
	
	- primary
	
	- secondary
	
	- success
	
	- info
	
	- warning
	
	- danger
	
	- light
	
	- dark
	
- **delete-message**
	
	(model) -> removes the model from the message collection
	
## Navbar Channel (navbar)

- **get-entries**
  
  (collectionName) -> Gets an entry collection by name.

- **new-navbar-entry**
  
  returns new entry model
  
- **add-entry**
  
  (attributes, collectionName) -> adds a model to the collection
  
- **add-entries**
  
  (array, collectionName) -> adds an array of entries to collection
  
- **clear-entries**
  
  (collectionName) -> removes entries from the named collection
  
