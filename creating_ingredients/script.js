document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const balloonContainer = document.getElementById('balloonContainer');

    // Evento para capturar a tecla Enter
    inputText.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && inputText.value.trim() !== '') {
            criarBalao(inputText.value);
            inputText.value = ''; // Limpa o campo de entrada
        }
    });
    
    // Função para criar o balão
    function criarBalao(texto) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.textContent = texto;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = 'x';

        // Adiciona o botão de deletar ao balão
        balloon.appendChild(deleteButton);

        // Adiciona o balão ao contêiner
        balloonContainer.appendChild(balloon);

        // Evento para remover o balão quando o botão de deletar for clicado
        deleteButton.addEventListener('click', function() {
            balloonContainer.removeChild(balloon);
        });
    }
});
