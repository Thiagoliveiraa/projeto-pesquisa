let escolhas = document.querySelectorAll('.answer input');
let perguntaEscondida = document.querySelector('.pergunta');
let filmes = document.querySelectorAll('#filmes');

function saveData() {
  let name = document.querySelector('#name');
  let story = document.querySelector('#story');
  if (name) {
    localStorage.setItem('name', name.value);
  }
  if (story) {
    localStorage.setItem('story', story.value);
  }
}

function setInputValues() {
  const likeMovie = localStorage.getItem("resposta");
  const movie = localStorage.getItem("filme");
  const name = localStorage.getItem("name");
  const story = localStorage.getItem("story");

  const inputName = document.querySelector('#name');
  const inputStory = document.querySelector('#story');
  const selectedFilmes = document.querySelector('#filmes');

  if (inputName) {
    inputName.value = name
  }

  if (inputStory) {
    inputStory.value = story
  }

  if (selectedFilmes) {
    var id = 0;
    for (var i = 0; i < selectedFilmes.children.length; i++) {
      if (selectedFilmes.children[i].value === movie) {
        id = i;
      }
    }
    //console.log(id)
    selectedFilmes.selectedIndex = id;
  }

  // Atualiza o valor das checkboxes da página 2 através do valor do localStorage
  escolhas.forEach(item => {
    item.checked = item.id === likeMovie
  });

  if (likeMovie) {
    // Seleciona a opção que tiver valor igual ao likeMovie
    opcaoEscolhida({ target: { value: likeMovie } });
  }
}

function filmeSelecinado(event) {
  let filme = event.target.value;
  localStorage.setItem('filme', filme);
}

function opcaoEscolhida(event) {
  let resposta = event.target.value;
  localStorage.setItem('resposta', resposta);

  if (perguntaEscondida) {
    if (event.target.value === 'sim') {
      perguntaEscondida.classList.remove('naomostrar');
      perguntaEscondida.classList.add('mostrar');
    } else if (this.value === 'nao') {
      perguntaEscondida.classList.remove('mostrar');
      perguntaEscondida.classList.add('naomostrar');
    }
  }
}

setInputValues();

filmes.forEach((filme) => {
  filme.addEventListener('change', filmeSelecinado);
});

if (filmes) {
  filmes.value = localStorage.getItem('filme');
}

if (localStorage.getItem('resposta')) {
  let results = document.querySelectorAll('.answer input');
  results.forEach((result) => {
    if (result.value === localStorage.getItem('resposta')) {
      result.checked = true;
    }
  });
}

escolhas.forEach((escolhido) => {
  escolhido.addEventListener('change', opcaoEscolhida);
});


if (document.querySelector('#name')) {
  document.querySelector('#name').value = localStorage.getItem('name');
}

if (document.querySelector('#story')) {
  document.querySelector('#story').value = localStorage.getItem('story');
}



document.addEventListener('change', saveData);
