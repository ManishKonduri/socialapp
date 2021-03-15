# socialapp

![Sign Up](https://user-images.githubusercontent.com/34981544/111102006-12e92500-8571-11eb-9ac1-3e7ae8b87de1.png?raw=true "Sign Up")

![Log In](https://user-images.githubusercontent.com/34981544/111102015-18466f80-8571-11eb-9572-fc223af4b11c.png?raw=true "Log In")

![Home](https://user-images.githubusercontent.com/34981544/111102017-18df0600-8571-11eb-84d4-bb433c8846dc.png?raw=true "Home")

![Profile](https://user-images.githubusercontent.com/34981544/111102018-1a103300-8571-11eb-9b11-3bd6dd7dc03a.png?raw=true "Profile")

![Settings](https://user-images.githubusercontent.com/34981544/111102020-1aa8c980-8571-11eb-9bf8-82a7648e3d52.png?raw=true "Settings")

![Add Image](https://user-images.githubusercontent.com/34981544/111102437-17faa400-8572-11eb-8097-bd32d0f885f2.png?raw=true "Add Image")


This project is built by using React JS, Express, Mongo DB.

While deploying you can take a build of Client (npm run build) and paste the build folder from client to Server at root level. Then you need to make changes in package.json (change start). Now you can deploy it.

Other way is to deploy client seperately and Server Seperately, Use Server Deployment URL in place of localhost (localhost:4000 in this project) at client API calls.

My deployment URLs are: -

Client :- https://social-media-front-end.herokuapp.com/
Server :- https://social-media-backend-node.herokuapp.com/

For database I used MongoDB Atlas and took the Connection URL and used it in my Server (mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false) -> Localhost url

MongoDB URL :- mongodb+srv://*****:******@reactdb.6tf2j.mongodb.net/test?authSource=admin&replicaSet=atlas-lgt352-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true


