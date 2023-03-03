fetchAllButton.addEventListener('click', () => {
  console.log(window.location);
  fetch('/api/quotes/')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      renderField(response.quote);
    });
});

const renderField = (data) => {
  const quote = document.getElementById('quote');
  const person = document.getElementById('person');
};
