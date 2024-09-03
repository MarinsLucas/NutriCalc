function addIngredient (form) {
    // Captura os valores dos campos de entrada pelo ID
    const ingredientName = form.elements['ingredient-name'].value;
    const energia = parseFloat(form.elements['energia'].value) || 0;
    const proteinas = parseFloat(form.elements['proteinas'].value) || 0;
    const lipidios = parseFloat(form.elements['lipidios'].value) || 0;
    const carboidrato = parseFloat(form.elements['carboidrato'].value) || 0;
    const colesterol = parseFloat(form.elements['colesterol'].value) || 0;
    const fibras = parseFloat(form.elements['Fibras'].value) || 0;
    const calcio = parseFloat(form.elements['calcio'].value) || 0;
    const magnesio = parseFloat(form.elements['magnesio'].value) || 0;
    const manganes = parseFloat(form.elements['manganes'].value) || 0;
    const fosforo = parseFloat(form.elements['fosforo'].value) || 0;
    const ferro = parseFloat(form.elements['ferro'].value) || 0;
    const sodio = parseFloat(form.elements['sodio'].value) || 0;
    const potassio = parseFloat(form.elements['potassio'].value) || 0;
    const cobre = parseFloat(form.elements['cobre'].value) || 0;
    const zinco = parseFloat(form.elements['zinco'].value) || 0;
    const saturadas = parseFloat(form.elements['Saturadas'].value) || 0;
    const monoInsaturadas = parseFloat(form.elements['Mono-insaturadas'].value) || 0;
    const poliinsaturadas = parseFloat(form.elements['Poliinsaturadas'].value) || 0;

    // Cria um objeto para o novo ingrediente
    const novoIngrediente = {
        nome: ingredientName,
        energia: energia,
        proteinas: proteinas,
        lipidios: lipidios,
        carboidrato: carboidrato,
        colesterol: colesterol,
        fibras: fibras,
        calcio: calcio,
        magnesio: magnesio,
        manganes: manganes,
        fosforo: fosforo,
        ferro: ferro,
        sodio: sodio,
        potassio: potassio,
        cobre: cobre,
        zinco: zinco,
        saturadas: saturadas,
        monoInsaturadas: monoInsaturadas,
        poliinsaturadas: poliinsaturadas,
    };   
    
}
