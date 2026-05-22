const express = require('express');
const router = express.Router();

// Comprehensive sports equipment images mapping
const SPORTS_IMAGES = {
    // Balls
    football: [
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f2f?w=400",
        "https://images.unsplash.com/photo-1510925758645-545f7cfc7088?w=400"
    ],
    soccer: [
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f2f?w=400",
        "https://images.unsplash.com/photo-1510925758645-545f7cfc7088?w=400"
    ],
    cricket: [
        "https://images.unsplash.com/photo-1530288330548-f5c3b5b1a68a?w=400"
    ],
    basketball: [
        "https://images.unsplash.com/photo-1519861538823-248b89f2e33d?w=400",
        "https://images.unsplash.com/photo-1515703408703-3d3c0f30e3b7?w=400"
    ],
    tennis: [
        "https://images.unsplash.com/photo-1595435934249-5fb7e203e45f?w=400"
    ],
    volleyball: [
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d3?w=400"
    ],
    baseball: [
        "https://images.unsplash.com/photo-1599810397626-0bc4c4b9d32d?w=400"
    ],
    hockey: [
        "https://images.unsplash.com/photo-1580748831319-0a2d5b3a86c8?w=400"
    ],
    golf: [
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034e?w=400"
    ],
    
    // Equipment
    bat: [
        "https://images.unsplash.com/photo-1530288330548-f5c3b5b1a68a?w=400"
    ],
    racket: [
        "https://images.unsplash.com/photo-1595435934249-5fb7e203e45f?w=400"
    ],
    racquet: [
        "https://images.unsplash.com/photo-1595435934249-5fb7e203e45f?w=400"
    ],
    ball: [
        "https://images.unsplash.com/photo-1519861538823-248b89f2e33d?w=400"
    ],
    
    // Gym & Fitness
    gym: [
        "https://images.unsplash.com/photo-1534438327276-14e5900c3e2e?w=400"
    ],
    dumbbell: [
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe36?w=400"
    ],
    weights: [
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe36?w=400"
    ],
    kettlebell: [
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe36?w=400"
    ],
    treadmill: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400"
    ],
    exercise: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400"
    ],
    fitness: [
        "https://images.unsplash.com/photo-1534438327276-14e5900c3e2e?w=400"
    ],
    
    // Swimming
    swimming: [
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400"
    ],
    swim: [
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400"
    ],
    
    // Running
    running: [
        "https://images.unsplash.com/photo-1552674605-db6ffd4efb63?w=400"
    ],
    shoes: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    ],
    sportsshoes: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    ],
    sneakers: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    ],
    
    // Cricket specific
    cricketbat: [
        "https://images.unsplash.com/photo-1530288330548-f5c3b5b1a68a?w=400"
    ],
    cricketball: [
        "https://images.unsplash.com/photo-1530288330548-f5c3b5b1a68a?w=400"
    ],
    pads: [
        "https://images.unsplash.com/photo-1530288330548-f5c3b5b1a68a?w=400"
    ],
    helmet: [
        "https://images.unsplash.com/photo-1530288330548-f5c3b5b1a68a?w=400"
    ],
    gloves: [
        "https://images.unsplash.com/photo-1530288330548-f5c3b5b1a68a?w=400"
    ],
    
    // Badminton
    badminton: [
        "https://images.unsplash.com/photo-1609183480237-ccf21ec13f9e?w=400"
    ],
    shuttlecock: [
        "https://images.unsplash.com/photo-1609183480237-ccf21ec13f9e?w=400"
    ],
    
    // Football/Soccer
    shoes: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    ],
    jersey: [
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f2f?w=400"
    ],
    
    // Sports wear
    wear: [
        "https://images.unsplash.com/photo-1517927113937-b8e7f5e9a65e?w=400"
    ],
    shorts: [
        "https://images.unsplash.com/photo-1517927113937-b8e7f5e9a65e?w=400"
    ],
    tshirt: [
        "https://images.unsplash.com/photo-1517927113937-b8e7f5e9a65e?w=400"
    ],
    
    // Default
    default: [
        "https://images.unsplash.com/photo-1517927113937-b8e7f5e9a65e?w=400",
        "https://images.unsplash.com/photo-1551956531-48d4f89d31d6?w=400",
        "https://images.unsplash.com/photo-1461896836934- voices-bt3c0f30e3b7?w=400"
    ]
};

// Smart search - find matching keyword
function findImages(query) {
    query = query.toLowerCase();
    
    // Direct match
    if (SPORTS_IMAGES[query]) {
        return SPORTS_IMAGES[query];
    }
    
    // Check each key if it's contained in query
    for (const [key, images] of Object.entries(SPORTS_IMAGES)) {
        if (query.includes(key) || key.includes(query)) {
            return images;
        }
    }
    
    // Default
    return SPORTS_IMAGES.default;
}

router.get('/search/:query', async (req, res) => {
    try {
        const query = (req.params.query || '').toLowerCase();
        
        // Get images based on query
        const images = findImages(query);
        
        // Create response format
        const result = images.map((url, index) => ({
            id: index,
            thumb: url,
            full: url.replace('w=400', 'w=800'),
            alt: query
        }));

        console.log("Returning images for:", query);
        res.json(result);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Failed to fetch images" });
    }
});

module.exports = router;