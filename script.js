let alimentos = [];
let alim_receita = []; 
//Leitura e busca de alimento
document.addEventListener('DOMContentLoaded', function() {
    // Carrega o arquivo CSV quando a página é carregada
    Papa.parse('taco.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            alimentos = results.data; // Armazena os dados do CSV na variável alimentos
        },
        error: function(error) {
            console.error('Erro ao carregar o arquivo CSV:', error);
        }
    });

    // Adiciona evento de input para buscar as sugestões
    document.getElementById('search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        // Verifica se o campo de busca está vazio
        if (query.length < 3) {
            displaySuggestions([]); // Limpa as sugestões
            return;
        }

        //Levanta todos os itens compatíveis com a busca
        const filteredAlimentos = alimentos.filter(alimento => 
            alimento.description && alimento.description.toLowerCase().includes(query)
        );
        displaySuggestions(filteredAlimentos);
        
    });
});

// Função para exibir as sugestões na lista
 function displaySuggestions(filteredAlimentos) {
        const suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = ''; // Limpa as sugestões anteriores

        filteredAlimentos.forEach(alimento => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = alimento.description;

            // Evento para quando clicar na sugestão, adicionar o balão e preencher o input
            suggestionItem.addEventListener('click', function() {
                addSelectedItem(alimento.description, alimento.ID);
                document.getElementById('search').value = '';
                suggestionsContainer.innerHTML = ''; // Limpa as sugestões após a seleção
            });

            suggestionsContainer.appendChild(suggestionItem);
        });

}

function addSelectedItem(name, ID) {
    const selectedItemsContainer = document.getElementById('selected-items');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'selected-item';

    // Cria o span para o nome
    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;

    // Cria o campo de entrada
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = 0; // Define o valor inicial do campo de entrada
    inputField.className = 'item-input';

     // Cria o dropdown
     const dropdown = document.createElement('select');
     dropdown.className = 'item-dropdown';
     
     // Adiciona opções ao dropdown
     const unidmedidas = ["mililitros (ml)", "litros(l)", "xícaras", "colheres de sopa", "colheres de chá", "colheres de sobremesa", "gramas (g)", "quilos (kg)", "miligramas (mg)", "pitadas", "unidades", "fatias"]

     // Popula o dropdown com as opções
     unidmedidas.forEach(medida => {
         const option = document.createElement('option');
         option.value = medida;
         option.textContent = medida;
         dropdown.appendChild(option);
     });
    // Cria o botão de remoção
    const removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.addEventListener('click', function() {
        selectedItemsContainer.removeChild(itemDiv);
    
        alim_receita = alim_receita.filter(item => {
            
            const itemName = item["name"]; // Remove espaços em branco
            const itemID = item["ID"]; // Converte para string se necessário
            const isMatch = itemName.toString() === name.toString() && itemID.toString() === ID.toString();
            return !isMatch; 
        });
    });
    

    // Adiciona o nome, o campo de entrada e o botão ao item
    itemDiv.appendChild(nameSpan);
    itemDiv.appendChild(inputField);
    itemDiv.appendChild(dropdown);
    itemDiv.appendChild(removeButton);
    selectedItemsContainer.appendChild(itemDiv);

    const itemObj = {
        name: name,
        ID: ID,
        quantidade: 0,
        unidade: unidmedidas[0]
    };
    alim_receita.push(itemObj);

    // Atualiza quantidade e unidade ao alterar os campos
    inputField.addEventListener('input', function() {
        const item = alim_receita.find(item => item.ID === ID);
        item.quantidade = parseFloat(this.value);
        console.log(alim_receita);
    });

    dropdown.addEventListener('change', function() {
        const item = alim_receita.find(item => item.ID === ID);
        item.unidade = this.value;
        console.log(alim_receita);
        create_table(alim_receita);
    });
}

function create_table(alim_receita)
{
    const nutrients = {
        kcal: 0,
        kJ: 0,
        proteinas: 0,
        lipidios: 0,
        colesterol: 0,
        carboidrato: 0,
        fibra : 0,
        calcio: 0,
        magnesio: 0,
        manganes: 0,
        fosforo: 0,
        ferro: 0,
        sodio: 0,
        potassio: 0,
        cobre: 0,
        zinco: 0,
        saturadas: 0,
        monoinsaturados: 0, 
        polinsaturados:0
    }   

    for(let i=0; i<alim_receita.length; i++)
    {
        const query = alim_receita[i].ID;
        
        
        //Levanta todos os itens compatíveis com a busca
        const alim = alimentos.filter(alimento => alimento.ID === query)
        
        if (alim) {
            console.log(alim); 
            nutrients.kcal += parseFloat(alim[0]["kcal"]) || 0;
            nutrients.kJ += parseFloat(alim[0]["kJ"])  || 0;
            nutrients.proteinas += parseFloat(alim[0]["proteina"])  || 0;
            nutrients.lipidios += parseFloat(alim[0]["lipideos"])  || 0;
            nutrients.colesterol += parseFloat(alim[0]["colesterol"])  || 0;
            nutrients.carboidrato += parseFloat(alim[0]["carboidrato"])  || 0;
            nutrients.fibra += parseFloat(alim[0]["fibra"]) || 0;
            nutrients.calcio += parseFloat(alim[0]["calcio"])  || 0;
            nutrients.magnesio += parseFloat(alim[0]["magnesio"])  || 0;
            nutrients.manganes += parseFloat(alim[0]["manganes"])  || 0;
            nutrients.fosforo += parseFloat(alim[0]["fosforo"])  || 0;
            nutrients.ferro += parseFloat(alim[0]["ferro"])  || 0;
            nutrients.sodio += parseFloat(alim[0]["sodio"])  || 0;
            nutrients.potassio += parseFloat(alim[0]["potassio"]) || 0 ;
            nutrients.cobre += parseFloat(alim[0]["Cobre"])  || 0;
            nutrients.zinco += parseFloat(alim[0]["Zinco"]) || 0;
            nutrients.saturadas += parseFloat(alim[0]["Saturados"]) || 0 ;
            nutrients.monoinsaturados += parseFloat(alim[0]["Monoinsaturados"]) || 0;
            nutrients.polinsaturados += parseFloat(alim[0]["Poliinsaturados"]) || 0;
            console.log(alim[0].kcal);
        } else {
            console.error(`Alimento com ID ${query} não encontrado.`);
        }

    }

    console.log(nutrients);
    
}

function gerarTabela(dados) {
    dados.forEach(pessoa => {
        const linha = document.createElement('tr');

        const celulaNome = document.createElement('td');
        celulaNome.textContent = pessoa.nome;
        linha.appendChild(celulaNome);

        const celulaIdade = document.createElement('td');
        celulaIdade.textContent = pessoa.idade;
        linha.appendChild(celulaIdade);

        const celulaCidade = document.createElement('td');
        celulaCidade.textContent = pessoa.cidade;
        linha.appendChild(celulaCidade);

        // Adiciona a linha criada ao corpo da tabela
        corpoTabela.appendChild(linha);
    });
}