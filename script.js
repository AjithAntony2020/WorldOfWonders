let worldWonders = [
    {
        "id": 1,
        "title": "Chichen Itza",
        "description": "Chichen Itza is a sprawling pre-Columbian archaeological site located in the eastern portion of Mexico's Yucatán Peninsula, roughly 120 miles from the modern resort city of Cancún.",
        "imageURL": "./assets/ChichenItza.jpg",
        "link": "#wonder1"
    },
    {
        "id": 2,
        "title": "Machu Pichu",
        "description": "Machu Picchu is a 15th-century Incan citadel situated high in the Andes Mountains of Peru, perched on a narrow ridge approximately 2,430 meters (7,970 feet) above sea level, between the peaks of Huayna Picchu and Machu Picchu Mountain.",
        "imageURL": "./assets/MachuPichu.jpg",
        "link": "#wonder2"
    },
    {
        "id": 3,
        "title": "Christ the Redeemer",
        "description": "Christ the Redeemer is an iconic statue of Jesus Christ located in Rio de Janeiro, Brazil. Standing 30 meters (98 feet) tall, excluding its 8-meter (26-foot) pedestal, the statue's arms stretch 28 meters (92 feet) wide. It is made of reinforced concrete and soapstone and is situated atop the Corcovado Mountain, offering panoramic views of the city and the surrounding landscape.",
        "imageURL": "./assets/ChristtheRedeemer.jpg",
        "link": "#wonder3"
    },
        {
        "id": 4,
        "title": "Great wall of China",
        "description": "The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe.",
        "imageURL": "./assets/GreatWallOfChina.jpg",
        "link": "#wonder4"
    },
    {
        "id": 5,
        "title": "Petra",
        "description": "Petra is an ancient archaeological city carved directly into the rose-red sandstone cliffs of southern Jordan, nestled within the rugged mountains of the Sharah range near the town of Wadi Musa.",
        "imageURL": "./assets/Petra.jpg",
        "link": "#wonder5"
    },
    {
        "id": 6,
        "title": "Roman Colosseum",
        "description": "The Roman Colosseum, also known as the Flavian Amphitheatre, is an iconic symbol of ancient Rome. It is an elliptical structure made of concrete and sand, capable of seating tens of thousands of spectators for gladiatorial contests and public spectacles. Construction began under Emperor Vespasian in AD 72 and was completed in AD 80 under his successor, Titus.",
        "imageURL": "./assets/RomanColosseum.jpg",
        "link": "#wonder6"
    },
        {
        "id": 7,
        "title": "Taj Mahal",
        "description": "The Taj Mahal is an iconic ivory-white marble mausoleum located on the southern bank of the Yamuna River in Agra, Uttar Pradesh, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, and is widely recognized as a symbol of love and architectural beauty.",
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
        <button class="view-btn" data-wonder-id="${wonder.id}" data-wonder-title="${wonder.title}">View Wonder</button>
    `;
    
    // Add event listener to the View Wonder button
    const viewBtn = card.querySelector('.view-btn');
    viewBtn.addEventListener('click', async function() {
        const wonderId = this.getAttribute('data-wonder-id');
        const wonderTitle = this.getAttribute('data-wonder-title');
        
        // Show loading state
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        try {
            // Fetch description from backend server
            const description = await fetchWonderDescription(wonderTitle);
            
            // Store in sessionStorage to pass to description page
            sessionStorage.setItem('wonderId', wonderId);
            sessionStorage.setItem('wonderTitle', wonderTitle);
            sessionStorage.setItem('wonderDescription', description);
            
            // Navigate to description page
            window.location.href = 'description.html';
        } catch (error) {
            console.error('Error fetching description:', error);
            alert('Failed to fetch description:\n\n' + error.message + '\n\nMake sure the backend server is running:\nnpm install && npm start');
            this.textContent = originalText;
            this.disabled = false;
        }
    });
    
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

/**
 * Fetches an AI-generated description from the backend server
 * @param {String} wonderTitle - The title of the wonder
 * @returns {Promise<String>} - The generated description
 */
async function fetchWonderDescription(wonderTitle) {
    const apiEndpoint = 'http://localhost:3000/api/generate-description';
    
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wonderTitle })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.description;
    } catch (error) {
        console.error('Error fetching description:', error);
        throw error;
    }
}

/**
 * Initialize the app - check if backend server is running
 */
function initializeApp() {
    // Check if the backend server is running
    fetch('http://localhost:3000/api/health')
        .then(response => {
            if (response.ok) {
                console.log('Backend server is running');
            }
        })
        .catch(error => {
            console.warn('Backend server not running. Make sure to run: npm install && npm start');
        });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeApp);

