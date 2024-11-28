const button = document.querySelector('.card-button');


button.addEventListener('click', () => {
    
    if (button.textContent === 'Clique Aqui') {
        button.textContent = 'Obrigado!';
    } else {
        button.textContent = 'Clique Aqui';
    }

 
    console.log('O botão foi clicado!');
});