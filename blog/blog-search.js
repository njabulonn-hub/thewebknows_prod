/**
 * Blog Search and Filtering Functionality
 * The Web Knows - Privacy Insights Blog
 */

(function() {
    'use strict';

    // Wait for DOM and articles data to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlog);
    } else {
        initBlog();
    }

    function initBlog() {
        // Check if we're on the blog index page
        const blogArticlesContainer = document.getElementById('blog-articles');
        if (!blogArticlesContainer) {
            return;
        }
        
        // Check if ARTICLES_DATA is available
        if (typeof ARTICLES_DATA === 'undefined') {
            console.error('ARTICLES_DATA is not loaded. Make sure articles-data.js is loaded before blog-search.js');
            blogArticlesContainer.innerHTML = '<div class="blog-loading">Error: Article data failed to load. Please refresh the page.</div>';
            return;
        }

        const searchInput = document.getElementById('blog-search-input');
        const searchClearButton = document.querySelector('.search-clear-button[data-target="blog-search-input"]');
        const categoriesContainer = document.getElementById('blog-categories');
        const resultsCount = document.getElementById('search-results-count');
        const noResults = document.getElementById('blog-no-results');
        const noResultsMessage = noResults
            ? (noResults.dataset.emptyMessage || 'No articles found matching your search.')
            : '';
        const noResultsResetLabel = noResults
            ? (noResults.dataset.resetLabel || 'Clear Search')
            : '';
        const noResultsState = {
            rendered: false
        };

        let currentCategory = 'all';
        let currentSearchQuery = '';

        // Populate categories
        function renderCategories() {
            if (!categoriesContainer) return;

            categoriesContainer.innerHTML = '';

            const allButton = document.createElement('button');
            allButton.className = 'blog-category-btn';
            allButton.type = 'button';
            allButton.dataset.category = 'all';
            allButton.textContent = 'All Articles';
            allButton.addEventListener('click', () => filterByCategory('all'));
            categoriesContainer.appendChild(allButton);

            const categories = getBlogCategories();
            categories.forEach(category => {
                const btn = document.createElement('button');
                btn.className = 'blog-category-btn';
                btn.type = 'button';
                btn.textContent = category;
                btn.dataset.category = category;
                btn.addEventListener('click', () => filterByCategory(category));
                categoriesContainer.appendChild(btn);
            });
        }

        function showNoResults() {
            if (!noResults) return;

            if (!noResultsState.rendered) {
                const message = document.createElement('p');
                message.className = 'blog-no-results__message';
                message.textContent = noResultsMessage;
                noResults.appendChild(message);

                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-secondary';
                button.textContent = noResultsResetLabel;
                button.addEventListener('click', () => {
                    if (searchInput) {
                        searchInput.value = '';
                        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                        searchInput.focus();
                    }
                });
                noResults.appendChild(button);
                noResultsState.rendered = true;
            }

            noResults.hidden = false;
            noResults.setAttribute('aria-hidden', 'false');
        }

        function hideNoResults() {
            if (!noResults) return;

            if (noResultsState.rendered) {
                noResults.textContent = '';
                noResultsState.rendered = false;
            }
            noResults.hidden = true;
            noResults.setAttribute('aria-hidden', 'true');
        }

        // Render articles
        function renderArticles(articles) {
            if (!blogArticlesContainer) return;

            blogArticlesContainer.innerHTML = '';

            if (articles.length === 0) {
                showNoResults();
                if (resultsCount) {
                    resultsCount.textContent = 'No articles found';
                }
                return;
            }

            hideNoResults();

            const fragment = document.createDocumentFragment();

            articles.forEach(article => {
                const card = document.createElement('article');
                card.className = 'blog-article-card';
                const articleHref = `/privacy-insights/${article.slug}/`;
                card.innerHTML = `
                    <div class="blog-article-card__category">${article.category}</div>
                    <h2 class="blog-article-card__title">
                        <a href="${articleHref}">${article.title}</a>
                    </h2>
                    <p class="blog-article-card__excerpt">${article.excerpt}</p>
                    <div class="blog-article-card__meta">
                        <time datetime="${article.lastUpdated}">${formatDate(article.lastUpdated)}</time>
                        <span class="blog-article-card__reading-time">${article.readingTime} min read</span>
                    </div>
                `;
                fragment.appendChild(card);
            });

            blogArticlesContainer.appendChild(fragment);

            // Update results count
            if (resultsCount) {
                if (currentSearchQuery) {
                    resultsCount.textContent = `Found ${articles.length} article${articles.length !== 1 ? 's' : ''}`;
                } else {
                    resultsCount.textContent = `Showing ${articles.length} article${articles.length !== 1 ? 's' : ''}`;
                }
            }
        }

        // Filter by category
        function filterByCategory(category) {
            currentCategory = category;

            if (categoriesContainer) {
                const buttons = categoriesContainer.querySelectorAll('.blog-category-btn');
                buttons.forEach(btn => {
                    if (btn.dataset.category === category) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }

            applyFilters();
        }

        // Search articles
        function searchArticles(query) {
            currentSearchQuery = query.trim().toLowerCase();
            applyFilters();
        }

        // Apply both filters
        function applyFilters() {
            const hasSSRContent = blogArticlesContainer && blogArticlesContainer.dataset && blogArticlesContainer.dataset.ssr === 'true';

            if (blogArticlesContainer && !hasSSRContent) {
                blogArticlesContainer.classList.add('is-loading');
            }

            requestAnimationFrame(() => {
                let filtered = ARTICLES_DATA;

                // Filter by category
                if (currentCategory !== 'all') {
                    filtered = filtered.filter(article => article.category === currentCategory);
                }

                // Filter by search query
                if (currentSearchQuery) {
                    filtered = filtered.filter(article => 
                        article.title.toLowerCase().includes(currentSearchQuery) ||
                        article.excerpt.toLowerCase().includes(currentSearchQuery) ||
                        article.category.toLowerCase().includes(currentSearchQuery)
                    );
                }

                renderArticles(filtered);

                if (blogArticlesContainer) {
                    blogArticlesContainer.classList.remove('is-loading');
                    if (hasSSRContent) {
                        blogArticlesContainer.dataset.ssr = 'hydrated';
                    }
                }
            });
        }

        // Format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-GB', options);
        }

        // Event listeners
        function syncSearchClearButton() {
            if (!searchInput || !searchClearButton) return;
            const wrapper = searchClearButton.closest('.search-input-wrapper');
            if (wrapper) {
                wrapper.dataset.hasValue = searchInput.value.trim() !== '' ? 'true' : 'false';
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchArticles(e.target.value);
                syncSearchClearButton();
            });
            searchInput.addEventListener('change', syncSearchClearButton);
        }

        if (searchClearButton && searchInput) {
            searchClearButton.addEventListener('click', () => {
                searchInput.value = '';
                syncSearchClearButton();
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                searchInput.focus();
            });
            syncSearchClearButton();
        }

        // Initial render
        renderCategories();
        filterByCategory(currentCategory);
    }
})();

