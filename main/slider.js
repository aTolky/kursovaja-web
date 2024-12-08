document.addEventListener('DOMContentLoaded', function () {
    const workCards = document.querySelectorAll('.work-cards .work-card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pagination = document.querySelector('.pagination');
    const itemsPerPage = 2;
    let currentIndex = 0;

    function displayWorks() {
        workCards.forEach((card, index) => {
            card.style.display = 'none';
            if (index >= currentIndex * itemsPerPage && index < (currentIndex + 1) * itemsPerPage) {
                card.style.display = 'block';
            }
        });
    }

    function createPagination() {
        const totalPages = Math.ceil(workCards.length / itemsPerPage);
        pagination.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const page = document.createElement('div');
            page.className = 'page';
            if (i === currentIndex) {
                page.classList.add('active');
            }
            page.addEventListener('click', () => {
                currentIndex = i;
                displayWorks();
                updatePagination();
            });
            pagination.appendChild(page);
        }
    }

    function updatePagination() {
        const pages = document.querySelectorAll('.pagination .page');
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.ceil(workCards.length / itemsPerPage) - 1;
        }
        displayWorks();
        updatePagination();
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < Math.ceil(workCards.length / itemsPerPage) - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        displayWorks();
        updatePagination();
    });

    displayWorks();
    createPagination();
    updatePagination();
});
