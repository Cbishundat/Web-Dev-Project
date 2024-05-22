import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

let app = express();
let port = 3000;

// Arrays to store liked cat URLs and breed information
let likedCats = []; 
let breeds = []; 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Function to fetch breeds list from TheCatAPI on server start
async function fetchBreeds() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
            headers: { 'x-api-key': 'live_v1SXmUGoNmPIqrd2MQK4PoirfzCNIdcEuKXHCmtsXD1hlCrMhujtN9f51AHkpwh1' } // API Key
        });
        breeds = response.data; // Store breeds data
    } catch (error) {
        console.error('Failed to fetch breeds:', error);
    }
}
fetchBreeds();

// Fetch and display a random cat image or by selected breed
app.get('/', async (req, res) => {

    let catImageUrl = '/images/default.jpg'; // Default image URL
    let selectedBreed = req.query.breed_id || ''; // Keep track of the selected breed ID
    try {
        let apiUrl = 'https://api.thecatapi.com/v1/images/search';
        if (req.query.breed_id) {
            apiUrl += '?breed_ids=' + req.query.breed_id;
        }
        const response = await axios.get(apiUrl, {
            headers: { 'x-api-key': 'live_v1SXmUGoNmPIqrd2MQK4PoirfzCNIdcEuKXHCmtsXD1hlCrMhujtN9f51AHkpwh1' } //API Key
        });
        if (response.data.length > 0) {
            catImageUrl = response.data[0].url; // Update cat image URL if response is valid
        }
    } catch (error) {
        console.error('Error fetching cat image:', error);
    }
    res.render('index', { catImageUrl, likedCats, breeds, selectedBreed });
});

// Route to handle posting of cat likes
app.post('/like-cat', (req, res) => {
    const { catUrl, like, breed_id } = req.body; // Include breed_id in the POST data
    if (like === "yes") {
        if (!likedCats.includes(catUrl)) {
            likedCats.push(catUrl); // Add cat URL to liked list if 'yes' and not already liked
        }
    }
    // Redirect to home with breed filter active if set
    res.redirect('/?breed_id=' + breed_id);
});

// Route to display next liked cat, keeping breed filter in mind
app.get('/favorites', (req, res) => {
    const breed_id = req.query.breed_id; // Capture the breed_id from query
    if (likedCats.length > 0) {
        const catImageUrl = likedCats.shift(); // Rotate liked cats
        likedCats.push(catImageUrl); // Push it back to the end, rotating the array
        res.render('index', { catImageUrl, likedCats, breeds, selectedBreed: breed_id });
    } else {
        res.send("You have no liked cats!"); // Send message if no liked cats
    }
});

// Reset the liked cats
app.post('/reset-likes', (req, res) => {
    likedCats = []; // Clear the array of liked cats
    res.redirect('/'); // Redirect to home 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});