# CSCI39548 Web Development Final Project

 In this project, students are expected to build a website using the
 Express/Node.js platform, with the Axios HTTP client, that integrates a chosen
 public API from the given list: Public API Lists. The website should interact
 with the chosen API, retrieve data, and present it in a user-friendly manner.

 ## API Choice

The Cat API is an open, free, read & write API all about Cats.
The Cat API gives you access to thousands of cat images, and it allows you to:

* Upload your own images
* Favourite or Vote on images
* Get stats on your requests
* Save a custom value with each request

## Website Features

For this website, I opted to create a simple cat image generator with a variety of features.

It allows you to:

* Filter the image generation by breed. There are more than 50 different breeds to choose from. 
* Vote on whether or not you like a specific image.
* Any image that you like will be saved and stored in a gallery, by clicking the "Show me my favorites" button you can revisit all the images you have liked.
* A reset button to remove all your favorites. 
* Little easter eggs that are cat related, (hint: click the cat image)

IMPORTANT: Due to being on the basic plan of the API, some features will be restricted after a certain amount of calls and you will have to wait a minute for it to reset. Only the filter by breeding is limited for a certain amount of image generations in this website. If you hit this limit, you can still generate cat images from all breeds but to filter the breeds again you will have to wait a minute. 


## How to Run and Start the Server

1. Clone this repo
2. Navigate to its directory 
3. Install dependendies if needed:
   * `npm i express`
   * `npm i axios`
   * `npm i ejs`
5. Start server using command `node index.js`
6. Access the website in your browser at `http://localhost:3000`

