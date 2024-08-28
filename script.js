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
        create_table(alim_receita);
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
    create_table(alim_receita);

    // Atualiza quantidade e unidade ao alterar os campos
    inputField.addEventListener('input', function() {
        const item = alim_receita.find(item => item.ID === ID);
        item.quantidade = parseFloat(this.value);
        create_table(alim_receita);
    });

    dropdown.addEventListener('change', function() {
        const item = alim_receita.find(item => item.ID === ID);
        item.unidade = this.value;
        create_table(alim_receita);
    });
}

function calcRatio100g(ing)
{
    let quant_min = ing.quantidade;
    let quant_max = quant_min;

    switch(ing.unidade)
    {
        case "mililitros (ml)":
            quant_min = quant_min*1;
            quant_max = quant_min;
            break;
        case "litros(l)":
            quant_min = quant_min*1000;
            quant_max = quant_min;
            break;
        case "xícaras":
            quant_min = quant_min*120
            quant_max = quant_max*240;
            break;
        case "gramas (g)":
            quant_min = quant_min*1;
            quant_max = quant_min;
            break;
        case "quilos (kg)":
            quant_min = quant_min*1000;
            quant_max = quant_min;
            break;
        case "miligramas (mg)":
            quant_min = quant_min*0.001;
            quant_max = quant_min;
            break;

        //A partir daqui, pode haver máximo e mínimo
        case "pitadas":
            quant_min = quant_min*0,3;
            quant_max = quant_max*1.5;
            break;
        case "colheres de sopa":
            quant_min = quant_min*10;
            quant_max = quant_max*15;
            break;
        case "colheres de chá": 
            quant_min = quant_min*2;
            quant_max = quant_max*7;
            break;
        case "colheres de sobremesa":
            quant_min = quant_min*5;
            quant_max = quant_max*14;
            break;
    }

    return [quant_min/100.0, quant_max/100.0];
}

function create_table(alim_receita)
{
    const nutrients = {
        energia: [0, 0],
        proteinas: [0, 0],
        lipidios: [0, 0],
        colesterol: [0, 0],
        carboidrato: [0, 0],
        fibra: [0, 0],
        calcio: [0, 0],
        magnesio: [0, 0],
        manganes: [0, 0],
        fosforo: [0, 0],
        ferro: [0, 0],
        sodio: [0, 0],
        potassio: [0, 0],
        cobre: [0, 0],
        zinco: [0, 0],
        saturadas: [0, 0],
        monoinsaturados: [0, 0], 
        polinsaturados: [0, 0]
    };
    

    for(let i=0; i<alim_receita.length; i++)
    {
        const query = alim_receita[i].ID;
        
        const r100 = calcRatio100g(alim_receita[i]);
        
        //Levanta todos os itens compatíveis com a busca
        const alim = alimentos.filter(alimento => alimento.ID === query)
        
        if (alim) {
            for(let i =0;i<2;i++)
            {
                nutrients.energia[i] += parseFloat(alim[0]["kcal"])*r100[i] || 0;
                nutrients.proteinas[i] += parseFloat(alim[0]["proteina"])*r100[i]  || 0;
                nutrients.lipidios[i] += parseFloat(alim[0]["lipideos"])*r100[i]  || 0;
                nutrients.colesterol[i] += parseFloat(alim[0]["colesterol"]) *r100[i] || 0;
                nutrients.carboidrato[i] += parseFloat(alim[0]["carboidrato"])*r100[i]  || 0;
                nutrients.fibra[i] += parseFloat(alim[0]["fibra"])*r100[i]|| 0;
                nutrients.calcio[i] += parseFloat(alim[0]["calcio"]) *r100[i] || 0;
                nutrients.magnesio[i] += parseFloat(alim[0]["magnesio"]) *r100[i] || 0;
                nutrients.manganes[i] += parseFloat(alim[0]["manganes"]) *r100[i] || 0;
                nutrients.fosforo[i] += parseFloat(alim[0]["fosforo"]) *r100[i] || 0;
                nutrients.ferro[i] += parseFloat(alim[0]["ferro"]) *r100[i] || 0;
                nutrients.sodio[i] += parseFloat(alim[0]["sodio"]) *r100[i] || 0;
                nutrients.potassio[i] += parseFloat(alim[0]["potassio"])*r100[i] || 0 ;
                nutrients.cobre[i] += parseFloat(alim[0]["Cobre"]) *r100[i]|| 0;
                nutrients.zinco[i] += parseFloat(alim[0]["Zinco"]) *r100[i]|| 0;
                nutrients.saturadas[i] += parseFloat(alim[0]["Saturados"])*r100[i] || 0 ;
                nutrients.monoinsaturados[i] += parseFloat(alim[0]["Monoinsaturados"])*r100[i] || 0;
                nutrients.polinsaturados[i] += parseFloat(alim[0]["Poliinsaturados"])*r100[i] || 0;
            }
        } else {
            console.error(`Alimento com ID ${query} não encontrado.`);
        }

    }

    createNutrientsTable(nutrients)
    
}

function createNutrientsTable(nutrients) {
    // Verifica se o objeto 'nutrients' está vazio ou todos os valores são zero
    if (!nutrients || Object.values(nutrients).every(value => value[0] === 0)) {
        // Remove a tabela existente se todos os valores forem zero
        const existingTable = document.getElementById('nutrients-table');
        if (existingTable) {
            existingTable.remove();
        }
        return; // Não cria a tabela
    }

    let table = document.getElementById('nutrients-table');
    
    // Se a tabela não existir, crie uma nova
    if (!table) {
        table = document.createElement('table');
        table.id = 'nutrients-table';
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        // Cria o cabeçalho da tabela
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headerName = document.createElement('th');
        headerName.textContent = 'Nutriente';
        headerRow.appendChild(headerName);

        const unid = document.createElement('th');
        unid.textContent = 'Un. Medida';
        headerRow.appendChild(unid);

        const headerValue = document.createElement('th');
        headerValue.textContent = 'Valor (min)';
        headerRow.appendChild(headerValue);

        const headerValueMax = document.createElement('th');
        headerValueMax.textContent = 'Valor (max)';
        headerRow.appendChild(headerValueMax);

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Cria o corpo da tabela
        const tbody = document.createElement('tbody');
        tbody.id = 'nutrients-tbody';
        table.appendChild(tbody);

        // Insere a tabela no contêiner
        const container = document.getElementById('nutrients-table-container');
        container.appendChild(table);
    }

    // Atualiza o corpo da tabela
    const tbody = document.getElementById('nutrients-tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo anterior
    const umedidas = ["kcal", "g", "g", "mg", "g", "g", "mg", "mg", "mg", "mg", "mg", "mg", "mg", "mg", "mg", "g", "g", "g"]
    let i = 0;
    
    // Adiciona uma linha para cada nutriente
    for (const [key, value] of Object.entries(nutrients)) {
        const row = document.createElement('tr');

        const cellName = document.createElement('td');
        // Capitaliza a primeira letra do nome do nutriente
        cellName.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        row.appendChild(cellName);

        const cellUMedida = document.createElement('td');
        cellUMedida.textContent = umedidas[i];
        row.appendChild(cellUMedida);
        i++;

        const cellValue = document.createElement('td');
        // Formata o valor para duas casas decimais
        cellValue.textContent = parseFloat(value[0]).toFixed(2);
        row.appendChild(cellValue);

        const cellValueMax = document.createElement('td');
        // Formata o valor para duas casas decimais
        cellValueMax.textContent = parseFloat(value[1]).toFixed(2);
        row.appendChild(cellValueMax);

        tbody.appendChild(row);
    }

}
