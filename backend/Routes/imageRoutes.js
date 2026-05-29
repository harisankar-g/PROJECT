// backend/Routes/imageRoutes.js
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/search/:query', async (req, res) => {
    try {
        const query = (req.params.query || '').toLowerCase().trim();
        
        if (!query) {
            return res.status(400).json({ message: "Query required" });
        }

        const accessKey = process.env.UNSPLASH_ACCESS_KEY;
        
        if (!accessKey || accessKey === 'your_actual_access_key_here') {
            return res.status(500).json({ message: "Unsplash API key not configured" });
        }

        console.log("Searching Unsplash for:", query);

        // Call Unsplash API
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=30`,
            {
                headers: {
                    'Authorization': `Client-ID ${accessKey}`
                }
            }
        );

        const data = await response.json();

        if (data.errors) {
            console.error("Unsplash Error:", data.errors);
            return res.status(400).json({ message: data.errors[0] });
        }

        const result = data.results?.map(photo => ({
            id: photo.id,
            thumb: photo.urls?.thumb,
            small: photo.urls?.small,
            full: photo.urls?.regular,
            alt: photo.alt_description || photo.description || query,
            description: photo.description || photo.alt_description,
            photographer: photo.user?.name,
            likes: photo.likes
        })) || [];

        console.log(`Found ${result.length} Unsplash images for: ${query}`);
        res.json(result);

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Failed to fetch images: " + error.message });
    }
});

module.exports = router;