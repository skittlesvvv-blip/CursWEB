/* 
 * products.js — Адаптировано под JSON Server + обработка ошибок
 */

const Products = {
    config: {
        itemsPerPage: 12
    },

    state: {
        allProducts: [],
        filteredProducts: [],
        currentPage: 1,
        filters: {
            search: '',
            category: 'all',
            sort: 'default'
        }
    },

    async _fetchProducts() {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер товаров недоступен. Показываем кэшированные данные.', 'warning');
            return [];
        }

        try {
            const res = await fetch(`${API_BASE}/products`);
            if (!res.ok) return [];
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error('[Products] _fetchProducts error:', e);
            return [];
        }
    },

    _applyFilters() {
        let result = [...this.state.allProducts];
        const { search, category, sort } = this.state.filters;

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(p =>
                p.name?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        }

        if (category !== 'all') {
            result = result.filter(p => p.category === category);
        }

        if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (sort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));

        this.state.filteredProducts = result;
        this.state.currentPage = 1;
    },

    _getPaginatedProducts() {
        const start = (this.state.currentPage - 1) * this.config.itemsPerPage;
        return this.state.filteredProducts.slice(start, start + this.config.itemsPerPage);
    },

    _getTotalPages() {
        return Math.ceil(this.state.filteredProducts.length / this.config.itemsPerPage) || 1;
    },

    async load(containerId = 'products-grid') {
        const container = document.getElementById(containerId);
        if (!container) return false;

        container.innerHTML = '<div class="loading">Загрузка товаров...</div>';

        this.state.allProducts = await this._fetchProducts();
        this._applyFilters();
        await this.render(containerId);
        this._renderPagination();

        return true;
    },

    async render(containerId = 'products-grid') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const products = this._getPaginatedProducts();

        if (products.length === 0) {
            container.innerHTML = `<p>Товары не найдены</p>`;
            return;
        }

        container.innerHTML = products.map(p => this._renderProductCard(p)).join('');
        this._bindProductCards();
    },

    _renderProductCard(product) {
        const { id, name, price, image, category } = product;

        return `
            <article class="product-card" data-id="${id}">
                <a href="product-${id}.html">
                    <div class="product-card__image">
                        <img src="${image}" alt="${name}" loading="lazy">
                    </div>
                    <div class="product-card__info">
                        <h3>${name}</h3>
                        <p class="category">${category}</p>
                        <div class="price">${price} BYN</div>
                    </div>
                </a>
                <div class="product-card__actions">
                    <button class="btn-buy" data-buy-btn="${id}">КУПИТЬ</button>
                    <button class="btn-favorite" data-favorite-btn="${id}">♡</button>
                </div>
            </article>
        `;
    },

    _renderPagination() {
        const container = document.getElementById('pagination');
        if (!container) return;

        const totalPages = this._getTotalPages();
        if (totalPages <= 1) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';
        container.innerHTML = `
            <button onclick="Products.goToPage(${this.state.currentPage - 1})" 
                    ${this.state.currentPage === 1 ? 'disabled' : ''}>←</button>
            <span>${this.state.currentPage} / ${totalPages}</span>
            <button onclick="Products.goToPage(${this.state.currentPage + 1})"
                    ${this.state.currentPage === totalPages ? 'disabled' : ''}>→</button>
        `;
    },

    async goToPage(page) {
        const total = this._getTotalPages();
        if (page < 1 || page > total) return;

        this.state.currentPage = page;
        await this.render();
        this._renderPagination();
    },

    async setSearch(query) {
        this.state.filters.search = query;
        this._applyFilters();
        await this.render();
        this._renderPagination();
    },

    async setCategory(category) {
        this.state.filters.category = category;
        this._applyFilters();
        await this.render();
        this._renderPagination();
    },

    async setSort(sort) {
        this.state.filters.sort = sort;
        this._applyFilters();
        await this.render();
        this._renderPagination();
    },

    async resetFilters() {
        this.state.filters = { search: '', category: 'all', sort: 'default' };
        this._applyFilters();
        await this.render();
        this._renderPagination();
    },

    _bindProductCards() {
        // Купить
        document.querySelectorAll('[data-buy-btn]').forEach(btn => {
            btn.onclick = async (e) => {
                e.preventDefault();
                const id = btn.dataset.buyBtn;
                const card = btn.closest('.product-card');
                const name = card.querySelector('h3')?.textContent || '';
                const price = parseFloat(card.querySelector('.price')?.textContent) || 0;
                const image = card.querySelector('img')?.src || '';

                const result = await Cart.addItem(id, name, price, image);
                showNotification?.(result.message, result.success ? 'success' : 'error');
            };
        });

        // Избранное
        document.querySelectorAll('[data-favorite-btn]').forEach(btn => {
            btn.onclick = async (e) => {
                e.preventDefault();
                const id = btn.dataset.favoriteBtn;
                const card = btn.closest('.product-card');
                const name = card.querySelector('h3')?.textContent || '';
                const price = parseFloat(card.querySelector('.price')?.textContent) || 0;
                const image = card.querySelector('img')?.src || '';

                await Favorites.toggle(id, name, price, image);
            };
        });
    },

    async init() {
        if (!Storage.isAvailable()) {
            showNotification?.('Сервер товаров недоступен. Каталог может быть неполным.', 'warning');
        }

        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (searchInput) searchInput.oninput = (e) => this.setSearch(e.target.value);
        if (categoryFilter) categoryFilter.onchange = (e) => this.setCategory(e.target.value);
        if (sortFilter) sortFilter.onchange = (e) => this.setSort(e.target.value);

        if (document.getElementById('products-grid')) {
            await this.load();
        }
    }
};

// Глобальные функции
function loadProducts() { Products.load(); }
function resetProductFilters() { Products.resetFilters(); }

document.addEventListener('DOMContentLoaded', () => Products.init());