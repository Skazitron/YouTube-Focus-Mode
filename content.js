function isHomePage() {
  return window.location.pathname === '/' || window.location.pathname === '/index';
}

function createCard(title, IconPath, link) {
    const card = document.createElement('a');
    card.href = link;
    card.className = 'yt-focus-card';
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'yt-focus-card-icon';
    iconContainer.innerHTML = IconPath; // SVG string
    
    const label = document.createElement('div');
    label.className = 'yt-focus-card-label';
    label.innerText = title;
    
    card.appendChild(iconContainer);
    card.appendChild(label);
    
    return card;
}

function handleSearch(query) {
    if (query.trim()) {
        window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    }
}

function injectFocusMode() {
    // Check if overlay already exists
    if (document.querySelector('.yt-focus-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'yt-focus-overlay';

    // Title
    const title = document.createElement('div');
    title.className = 'yt-focus-title';
    title.innerText = 'Getting distracted again?';
    overlay.appendChild(title);

    // Search Bar
    const searchContainer = document.createElement('div');
    searchContainer.className = 'yt-focus-search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'yt-focus-search-input';
    searchInput.placeholder = 'Search';
    
    const searchBtn = document.createElement('button');
    searchBtn.className = 'yt-focus-search-btn';
    searchBtn.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 24px; height: 24px;"><g><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path></g></svg>';
    
    searchBtn.addEventListener('click', () => handleSearch(searchInput.value));
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSearch(searchInput.value);
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);
    overlay.appendChild(searchContainer);

    // Cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'yt-focus-cards';

    // SVG Icons (Simplified paths)
    const historyIcon = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"></path></g></svg>';
    const playlistIcon = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"></path></g></svg>';
    const watchLaterIcon = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g></svg>';

    cardsContainer.appendChild(createCard('History', historyIcon, 'https://www.youtube.com/feed/history'));
    cardsContainer.appendChild(createCard('Playlists', playlistIcon, 'https://www.youtube.com/feed/playlists'));
    cardsContainer.appendChild(createCard('Watch Later', watchLaterIcon, 'https://www.youtube.com/playlist?list=WL'));

    overlay.appendChild(cardsContainer);
    document.body.appendChild(overlay);
    
    // Disable scrolling on the main page
    document.body.style.overflow = 'hidden';
}

function removeFocusMode() {
    const overlay = document.querySelector('.yt-focus-overlay');
    if (overlay) overlay.remove();
    
    // Re-enable scrolling
    document.body.style.overflow = '';
}

function checkAndInject() {
    if (isHomePage()) {
        injectFocusMode();
        // Try to hide the main feed container if possible to prevent flash, 
        // though the overlay z-index covers it.
        // Common selectors for the primary feed
        const primaryPage = document.querySelector('ytd-browse[page-subtype="home"]');
        if (primaryPage) primaryPage.style.display = 'none';
        
        // Also ensure the miniplayer didn't pop up over our overlay or something
        // (Though z-index should handle it)
    } else {
        removeFocusMode();
        // Ensure the primary page content is visible on non-home pages (like History)
        // We select broadly to catch history, subscriptions, etc.
        const pageManager = document.querySelector('ytd-page-manager');
        if (pageManager) pageManager.style.display = '';
        
        const primaryPage = document.querySelector('ytd-browse[page-subtype="home"]');
        if (primaryPage) primaryPage.style.display = '';
    }
}

// Initial check
checkAndInject();

// Observer for SPA navigation (YouTube is a Single Page App)
const observer = new MutationObserver(() => {
    // We only need to check occasionally or when specific things change, 
    // but lightweight check is okay.
    checkAndInject();
});

observer.observe(document.body, { childList: true, subtree: true });

// YouTube specific navigation event
window.addEventListener('yt-navigate-finish', () => {
    checkAndInject();
});
