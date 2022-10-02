const addMovieModal = document.getElementById('add-modal');

const startAddMovieButton = document.querySelector('header button');

const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.getElementsByTagName('input');
const moviesList = document.getElementById('movie-list');
const entryText = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const cancelDeleteMovieButton = deleteMovieModal.querySelector('.btn--passive');
const confirmDeleteMovieButton = deleteMovieModal.querySelector('.btn--danger');

const [title, imageUrl, rating] = userInputs;
const movies = new Map();

const updateUI = () => {
    if (movies.size > 0) {
        entryText.style.display = 'none'
    } else {
        entryText.style.display = 'block'
    }
}

const clearInputs = () => {
	for (const input of userInputs) {
		input.value = '';
	}
};

const toggleBackdrop = (modal) => {
    backdrop.onclick = () => toggleMovieModal(modal);
	backdrop.classList.toggle('visible');
    clearInputs();
};

const toggleMovieModal = (modal) => {
	toggleBackdrop(modal);
	modal.classList.toggle('visible');
};

const deleteMovie = (movieId, movieNode) => {
    movies.delete(movieId);
    movieNode.remove();
}


const deleteMovieHandler = (movieId, movieNode) => {
    toggleMovieModal(deleteMovieModal);
    
    confirmDeleteMovieButton.onclick = function deleteClickEvents() {
        deleteMovie(movieId, movieNode);
        updateUI();
        toggleMovieModal(deleteMovieModal)
    
}
}

const createMovieListElement = (id, movie) => {
    const newMovieElement = document.createElement('li');
		newMovieElement.className = 'movie-element';
		newMovieElement.innerHTML = `
            <div class="movie-element__image">
                <img src=${movie.imageUrl} alt=${movie.title}>
            </div>
            <div class="movie-element__info">
                <h2>${movie.title}</h2>
                <p>${movie.rating}/5 stars</p>
            </div>
        `;
		newMovieElement.addEventListener(
			'click',
			() => deleteMovieHandler(id, newMovieElement)
		);
    return newMovieElement
}

const addNewMovieToList = (movieEl) => {
    moviesList.appendChild(movieEl);
}
    

const confirmAddMovieHandler = () => {
    const enteredTitle = title.value;
    const enteredImageUrl = imageUrl.value;
    const enteredRating = rating.value;
	if (
		enteredTitle.trim() === '' ||
		enteredImageUrl.trim() === '' ||
		enteredRating.trim() === '' ||
		+enteredRating < 0 ||
		+enteredRating > 5
	) { alert('Please add valid values! (rating 0-5)')
	} else {
        const movieId = new Date();
        const movie = {
					title: enteredTitle,
					imageUrl: enteredImageUrl,
					rating: enteredRating,
				};
        movies.set(movieId, movie);
        const newMovieEl = createMovieListElement(movieId, movie)
        addNewMovieToList(newMovieEl);
        updateUI();
    }
    toggleMovieModal(addMovieModal);

};



startAddMovieButton.addEventListener('click', () => toggleMovieModal(addMovieModal));

cancelAddMovieButton.addEventListener('click', () => toggleMovieModal(addMovieModal));

confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler);

cancelDeleteMovieButton.addEventListener('click',() => toggleMovieModal(deleteMovieModal));

