let worldWonders = [
    {
        "id": 1,
        "title": "Chichen Itza",
        "description": "A responsive website built with HTML5 and CSS3 that adapts seamlessly to all device sizes.",
        "imageURL": "./assets/ChichenItza.jpg",
        "link": "#wonder1"
    },
    {
        "id": 2,
        "title": "Machu Pichu",
        "description": "Interactive todo list application with add, edit, and delete functionality using vanilla JavaScript.",
        "imageURL": "./assets/MachuPichu.jpg",
        "link": "#wonder2"
    },
    {
        "id": 3,
        "title": "Christ the Redeemer",
        "description": "Modern e-commerce product showcase with dynamic filtering and shopping cart functionality.",
        "imageURL": "./assets/ChristtheRedeemer.jpg",
        "link": "#wonder3"
    },
        {
        "id": 4,
        "title": "Great wall of China",
        "description": "A responsive website built with HTML5 and CSS3 that adapts seamlessly to all device sizes.",
        "imageURL": "./assets/GreatWallOfChina.jpg",
        "link": "#wonder4"
    },
    {
        "id": 5,
        "title": "Petra",
        "description": "Interactive todo list application with add, edit, and delete functionality using vanilla JavaScript.",
        "imageURL": "./assets/Petra.jpg",
        "link": "#wonder5"
    },
    {
        "id": 6,
        "title": "Roman Colosseum",
        "description": "Modern e-commerce product showcase with dynamic filtering and shopping cart functionality.",
        "imageURL": "./assets/RomanColosseum.jpg",
        "link": "#wonder6"
    },
        {
        "id": 7,
        "title": "Taj Mahal",
        "description": "Modern e-commerce product showcase with dynamic filtering and shopping cart functionality.",
        "imageURL": "./assets/TajMahal.jpg",
        "link": "#wonder7"
    },
]




// Initializes the app and fetches data, then renders wonder cards on DOM load

document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM Content Loaded - Initializing rendering engine...");
      
    // Render the fetched wonders
    renderWonderCards(worldWonders);
    setupSearchFunctionality();
});

/**
 * Renders all wonder cards by iterating through the wonders array
 * and injecting generated HTML into the container
 * @param {Array} wondersToRender - Array of wonder objects to render
 */
function renderWonderCards(wondersToRender) {
    const container = document.getElementById('wonders-container');
    
    if (!container) {
        console.error("Error: Container with ID 'wonders-container' not found!");
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Check if there are wonders to render
    if (wondersToRender.length === 0) {
        container.innerHTML = '<p class="no-results">No wonders found.</p>';
        return;
    }
    
    // Iterate through wonders and create cards
    wondersToRender.forEach(wonder => {
        const card = createWonderCard(wonder);
        container.appendChild(card);
    });
    
    console.log(`Rendered ${wondersToRender.length} wonder cards`);
}

/**
 * Creates a single wonder card element from wonder object
 * @param {Object} wonder - Wonder object with properties: id, title, description, category, imageURL, link
 * @returns {HTMLElement} - The constructed article element for the wonder card
 */
function createWonderCard(wonder) {
    // Create the article element (card container)
    const card = document.createElement('article');
    card.className = 'wonder-card';
    card.setAttribute('data-id', wonder.id);
    //card.setAttribute('data-category', wonder.category);
    
    // Build the card HTML structure using template literals
    card.innerHTML = `
        <img src="${wonder.imageURL}" alt="${wonder.title}" class="card-image">
        <h3 class="card-title">${wonder.title}</h3>
        <p class="card-description">${wonder.description}</p>
        <a href="${wonder.link}" class="view-btn">View Wonder</a>
    `;
    
    return card;
}



/**
 * Sets up real-time search functionality
 * Attaches event listener to search input for live filtering
 */
function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    
    if (!searchInput) {
        console.warn("Warning: Search input with ID 'search-input' not found!");
        return;
    }
    
    // Add event listener for real-time search as user types
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        console.log("Search term:", searchTerm);
        
        // Filter wonders based on search term
        const filteredWonders = filterWondersBySearch(worldWonders, searchTerm);
        
        // Reset category filter and render results
        //resetFilterButtons();
        renderWonderCards(filteredWonders);
    });
}

/**
 * Filters wonders based on search term
 * Searches across title, description
 * @param {Array} wonderList - Array of wonders to search through
 * @param {String} searchTerm - The search query (case-insensitive)
 * @returns {Array} - Filtered array of matching wonders
 */
function filterWondersBySearch(wonderList, searchTerm) {
    // Return all wonders if search term is empty
    if (!searchTerm.trim()) {
        return wonderList;
    }
    
    return wonderList.filter(wonder => {
        // Search in title
        const titleMatch = wonder.title.toLowerCase().includes(searchTerm);
        
        // Search in description
        const descriptionMatch = wonder.description.toLowerCase().includes(searchTerm);
        
        
        // Return true if any field matches
        return titleMatch || descriptionMatch ;
    });
}

