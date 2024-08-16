# Modular project
#### Video Demo:  <URL https://www.youtube.com/watch?v=sOuBXAnu758>
#### Description: 

My original idea with this project was to make a web page where the user would be able to play a block building style game, and then upload their models to the server. The user would also be able to view and then edit their model; view others users models edit them and upload them to their own profile. 

There is a plan to develop this further as the web page relates to a personal project I have been working on, but as I was working on it I started getting concerned with scope keep especially for my first project. So made a decision to present the a basic concept of the page: A basic version of the game; using cube instead of my own models, upload an image of final model, a way to recreate that model if another user wants to edit it, along with related information of model, Then displaying models and related information on profile page where users can view own models and explore page to view all users model. When edit is selected recreate that model in the game page in the game.  


## Index page: 
	Index page is the home page where you can play the game; Upload model using form. Main contents  is the canvas where multiple JavaScript files are used to create the game.

	Js main:
		The page is made response using the main.js file where the game is also applied to the canvas. Using js to control the size some of the divs that overlap the canvas to show instruction as during resize event they would extend past the end of the canvas. 
			A function was also used to re-organise the page which is called inside the resize event and outside so the page would present the right way if loading up for the first time or the size of the window change. One issue with this is that the game is unavailable on mobile devises so if the window is made to small the game is removed. Preferably the game would only be remove if on mobile or touch screen device.   
		This file is where the game class is instantiated , taking two augments the container the canvas is in and the canvas.
		 
	Js THREE game:
		This file imports all the files you need for the game and creates a signletons instance all other files are then instanced after this to get access to all other files in by importing game into them. I did this as a lot of the other classes require information on previous classes; however to do think I over used this in some place and had to find work around when e.g. created  a ray caster class imported the camera to get positions of the camera but then I tried to import the ray caster to update its position in the cameras update. I found the order the other classes where initiated into the game class can prevent you from importing later classes into earlier classes in the singletons class. To fix create an update function in the ray caster file and call it in the tick function to animate. 
		
# Imports folder
	EventEmitter.js
		This is a class I got from a git hub repo. This class can be extended upon to allow you to communicate with other files. It works like an event listener however you trigger the event then listen for that trigger in another file and then apply a function to it.  This was really helpful as it allowed me to separate my animation and window resize event/ functions but have them in to game file giving access to them to all other classes.
		
	Three.module.js
		Three js is a java script library that helps you work with webGL. I did this course to learn more about it as I was set on this idea: Three.js Journey — Learn WebGL with Three.js (threejs-journey.com); this is also where I found out about the event emitters. This library allows you to render 3D and "d objects in the web browser. 
		
	Pointer Lock Controls js
			This is a class for THREE.js that helps you apply controls to you scene, these controls work like a first person shooter controls; where the mouse controls where you are looking and then you can code in the inputs to control the movement of you camera. This class handles everything for the mouse controls all you have to do is to lock the pointer. Moving the camera however minimal or a lot of inputs; which will be covered later. 
			
# Utilities folder
	Sizes.js
		This class keeps track and sets the canvas size. Listens to the window resize event listener and will reset the canvas size, it also trigger and event emitter to allow me to change variable on the renderer and camera so they match the canvas size.
		
	Time.js
			this class creates the fames for the animation. At first I was using Date.now however the delta time value from this was causing some issues with payer movement, where I had to times the final values by 1000 to get the correct effect; this was due to the value being in milliseconds. Using the three.js Clock returned a float of time past in seconds since start which was more accurate and meant I didn’t have to mess with the value of delta time to get correct value. This would also be earlier to work with if I wanted to do any time related stuff later; for example total time spent playing.  
			
# World folder
	This folder contains the files responsible to putting 3d geometry and textures in the page
	
		World.js
			In the constructor I imported every think I would need: scene because I needed to add meshes to scene, canvas because I needed to add an event lister to that, ray caster so I could get what the camera was looking at so I knew where to place the next cube and camera; this was to check if the controls had been triggered as I was getting a bug that was adding cube if payer clicked on canvas but hadn't started the game and would add a cube when player clicked canvas to start game.
			
			Intersects is set to null and used later to get the return of what the ray caster is intersecting with, I did this at the time because if I set it to the ray caster return in the constructor it would update but thinking now it doesn’t have to be part of the class could just be a var that is set when needed
			
			Object array is an array of all the object in the scene this is used with the intersect so it can check what the ray caster is hitting.
			V3 array is an array of vector threes that will be sent to back end to the model can be reloaded. These vector threes already exist in the object array. My plan at the time was to prevent a loop from running to collect all the vector threes to send but this came at the cost of nearly doubling the memory. I also wouldn’t of had to implement an algorithm to keep the two arrays correct when object was deleted from the scene. I could of also reduce the memory by creating a custom vector three with just X, y and z properties and avoided saving all the extra methods to memory.   
				
			Place box function, places box in the scene depending on what face the camera is looking at; this is managed by the create box function that I import from building which I will go into after this. Create a new mesh applies the vector three returned from the create box function. Add name to mesh which is its index in the object and vector three array, add mesh and vector three to object array and vector 3 array and add mesh to scene. Final increments the name to be applied to next object.  
			
			Remove box function, removes object from scene when backspace is pressed and ray caster is intersecting object. If objects name is original it will not delete it because if there is no box in the scene you can't use game. It then takes the intersects object name and uses the to index the object at the right spot take the last object in the array and swaps the position change the name to the correct index of the swapped item and applies the same method to the v3 array and pops both off the end then removes object from scene and -1 from object name. 
			
			Edit Model if a function that is only call is data exist in meta data. The data is a JSON array of vector threes. If it exists edit model is called in the constructor and JSON is parsed turning it into an object array. It is then looped through applying vector three to new meshes and adding them to the scene, incrementing object name and applying it as it goes.
			
			It is worth noting that only one geometry and material is created they are just applied to the mesh to save memory. Later I want to add my own models which there will be about 8 different geometry's but the same technique will be applied.  
			
		Building.js
			Exports a function that returns a new vector three based on what face of the cube you clicked. Each face of the cube has 2 faces to to get the correct face index to use in a switch statement I Math.floor the and divide the face index by two. Then it trial and error what vector to add or minus 1 to, to get the new cube in the right position. Code a Minecraft Clone with JavaScript, React, Three.js – Tutorial
			Found this technique here. Original I created a switch statement for every face.
			
		
# Camera.js
		In constructor getting every think we need. Direction and velocity is some think we will need in the updated function, this could be used as a let and a var but wanted to avoid setting new variable every time the tick function ran; I know function have a garbage collection on them, but due to the tick function be called so often I thought it better to reset the value rather than create new variable every time.
		
		Then get the game singleton, get sizes for the camera, scene to add camera to scene, canvas to put in as a parameter for pointer lock controls. 
		And controls is a switch case for key down and key up event so pointer lock controls has input.   
		
		Set instance creates the camera and applies it to the scene using sizes as parameters.
		
		Resize is called in the game file if resize event has happened applying ne parameters to camera.
		
		Update function applies movement to the camera it is call in the tick function the game file.
		I got this from an example after implementing a which times camera position by delta time, which worked but would stop emedeatly when you lifted your finger. three.js examples (threejs.org). A lot of the movement controls are handled by pointer lock Controls. Which does get the cameras direction and applies movement to camera based on directional quotation of camera. I only have a rough idea of what is going on here, but will do my best.
			Velocity x and y are taking away from speed slowing the camera down if no input is applied however if input is applied number balance out at a greater value. 
			Velocity.y I am setting at pointer lock controls had no up or down function assigning it a velocity that felt right through trial and error then latter on if input either taking away or adding value times delta time to camera position.
			
			For the section that is using pointer lock controls turning Boolean to either 1 or -1 to get direction applying that to velocity to get either positive or negative number with a value to speed up movement and times by delta time. Then applying that to the pointer lock function to use as distance I want it to travel per tick.
			
			I have found tutorial that teach you the math from payer controls and animation I am going to visit these to get a better grasp of what is going on.   
		
		
# Ray Caster
		First import every think I need from game which is camera to get camera position and camera direction. 
		Set instance instantiates the ray caster update, updates the ray cater in the tick function with camera position for origin and camera direction for point. 
		
	
# Renderer
		Import every think I need for the renderer set the renderer up in set instance controlling the size with sizes file with resize function resetting the size when called in game file. Update creating new frames  when call in game file tick function, this is called last in game function to make sure everything else is updating before calling next frame.  
		
# Screen shot
		 In this class I call the function which then adds an event listener to the page in the constructor the event listener has an arrow function I did it the way so that it wouldn’t lose scope. As I needed to set image = to the most recent blob so it could be used in a fetch request later.  The rest of the function converts canvas to blob calling the renderer refresh first or you don’t get nothing from canvas. Then adds image to page create  object URL with blob for image source, on load remove url, so that you don’t get overwhelmed with URL if user want to try multiple angles. Then if there is already an image on the page replaces it with the new one. By removing the old one and adding a new image element; might have just been able to change the source, just thought of that now. 
		
	
# Send.js
		Send class import what we need; screenshot class to get the blob, world to get the vector 3 array. Call send data function in constructor and then add event listener to function again this is so we don’t lose scope. First thing we do is check all the form part are filled in if not return alert. Create new form data, this allowed me to send the text data the v3 array and the blob in one send.  Send fetch vie post check response is to 200 if not bad message if is good message.
		 
		
## Profile page / Explore page:
	These pages present the same using a fetch request at the start and on scroll to load the page, turning blob into image with text information next to it presented in bootstrap row and col dives. Both of these pages present the same and use the same JavaScript files  
	
	Js scripts for above to pages:
		Import function from page set up file. Create new form data set num to the amount of models you want to receive from fetch, I did 8 so that the page would be big enough a scroll bare to appear. Then use get page info function to get model data, (will get more into that later). We then have an if statement that check page width if small one column of photo/ data if big two columns. 
		Then I used a for loop to loop until I == num and inside that I set up the page by creating and adding element I also use get blob for info function more on that later). Creating and revoking url for blob so they can be on page. 
		
		Next I add an event listener to listen to scroll function. I get the scroll on the page as a percentage and if percentage is greater than 90 I load more following the same method as above. I was getting a problem where the rest of the function was being triggered due to scroll being greater than 90 before page could load. I fixed this by also checking if the Boolean was true but marking it false strait after and changing it back to true at the end of the code.  
		
	Function from another page
		First in this page there is a switch case to set routes for the fetch request if window.location.pathname == x. so That I could use the same file for both pages. Get page info is an async function that take to argument amount to get and amount to skip creates a form with these to arguments and sends fetch request. The idea being if you wanted 6 more bits of info but already had 6 on the page you would get 6 and skip 6. it then check that response is 200 if not putting up an alert. The fetch is assigned to a variable, outside of the fetch I have a new variable that awaits for the fetch variable and return that. I was getting issues of it returning before fetch; I just changed it didn’t need that extra variable could just return await text response. Function also has await in the higher file. 
		
	Function load on scroll
		This add divs to the page along with other element and style changes along with hidden form data. 
		
 ## Views:
	Import app from app this is to package the the file in the __init__ file later. Then set up the config for the sqlite3 database and turn track modifications off.  Set data base. Create all table in database with app context. Set secrete key for app, so I can store the user unique id in the sessions object. 
# route("/sign_up"):
		Check that all parts of the form were filled in if not returns page telling you what you didn’t fill in. Hash's the password check hashed password matches confirmed password. Query data base see if username or email already exist if they do tell user they do with return. If it doesn't commit user name, email and hashed password to data base then get user id from data and save it in session.  
	
# route("/login"):
		Get email and password from user query data base where email is = to email in password. If hash password doesn’t match tell user with return if email or password not provided tell user they need to input one; that bit comes first. Save user ID to sessions. 
	
	
# route("/profile"):
		If request is = to POST, get id from form query data base from models table to match id and return positions array in the render template of index page, else query data base to get users name and display at the top of  the page. 
	
	
# route("/explore"):
		Do same as above exept in if else not Post just return render template. 
		
	
	route("/about")
		Contains no content as of yet. 
	
## Tables:
	Import sql alchemy, initiate database and create first table. Create a class with id = to data base columns. Init function to allow you to access them like object e.g. tableName.columnName. Do same for models table. 

## Fetch://todo
	
# route("/create-entry")
		Takes all information from form data from fetch request. Read blob file to store in database then commit all information from form into the data base models table. I need to return some think here I was returning blob but forgot to change it will quicky adjust. Made a response but don’t think it is right. 
		
	 
	
# route("/profile_model")
		Get, get variable and skip variable from fetch request. Query database to where sessions id == users id on models table. Where limit to query is set to get variable, and offset amount is set to skip variable. Create dict because returns from queries are immutable. Then make array of dicts where id is == mod._id, and name and description ect. Append dict to dict array; the reason I am doing this because an array of dicts is easier to work with instead of the value of the dicts being an array. Make a response with dict array and return that.   
	
	
# route("/profile_images")
		Get Json from request this is because it wouldn’t let use an int so I strigifyed it and then cast it as an int in the query. This is the offest what is already on the page. Make response from blob and return that 
	
	
# route("/explore_model")
		This is the same as route("/profile_model") but without the ID in the query.
	
	
# route("/explore_images")
		This is the same as 
		This is the same as route("/profile_image") but without the ID in the query.
	
		 but without the ID in the query.
	
		
	
# Addmin_views:
	This is to add later so that admin can look at the data base and choose which models they want to three d print. Only plan here would be to allow the admin to see the model with the calculate time to print. Addresses for postage and figuring out how much to charge.  
	
## Init:
	So that the flask directory is treated as a package. And avoid cycler import, I wanted my project to be set up to be expanded upon   
	

## Run:
Import the package and run that. 