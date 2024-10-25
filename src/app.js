document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const topHeadlines = document.getElementById('topHeadlines');
    const apiKey = 'cfd41751866c483db0f7b5ea7f5f804d';

    // Function to fetch top headlines
    const fetchTopHeadlines = async () => {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayTopHeadlines(data.articles);
        } catch (error) {
            console.error('Error fetching top headlines:', error);
        }
    };

    // Function to display top headlines
    const displayTopHeadlines = (articles) => {
        topHeadlines.innerHTML = '';

        articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            const imageUrl = article.urlToImage ? article.urlToImage : '../images/News-api.png';
            const title = article.title;
            const summary = article.description ? article.description : 'No summary available';
            const articleUrl = article.url;

            newsItem.innerHTML = `
                <img src="${imageUrl}" alt="${title}">
                <h3>${title}</h3>
                <p>${summary}</p>
                <p class="full-article">Read the full article <a href="${articleUrl}" target="_blank"><i class="fas fa-arrow-right" id="arrow"></i></a></p>
            `;

            topHeadlines.appendChild(newsItem);
        });
    };

    // Function to fetch news articles based on search keyword
    const fetchNews = async (keyword) => {
        const apiUrl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}&pageSize=12`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    // Function to display searched news articles
    const displayNews = (articles) => {
        topHeadlines.innerHTML = '';

        articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            const imageUrl = article.urlToImage ? article.urlToImage : '../images/News-api.png';
            const title = article.title;
            const summary = article.description ? article.description : 'No summary available';
            const articleUrl = article.url;

            newsItem.innerHTML = `
                <img src="${imageUrl}" alt="${title}">
                <h3>${title}</h3>
                <p>${summary}</p>
                <p class="full-article">Read the full article <a href="${articleUrl}" target="_blank"><i class="fas fa-arrow-right" id="arrow"></i></a></p>
            `;

            topHeadlines.appendChild(newsItem);
        });
    };


    // Event listener for search button click
    searchBtn.addEventListener('click', () => {
        const keyword = searchInput.value.trim();
        if (keyword !== '') {
            fetchNews(keyword);
        }
    });

    // Initial load - display top headlines
    fetchTopHeadlines();
});
