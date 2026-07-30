// 🍕 Função que calcula o preço da Pizza
// t = tamanho, b = borda, cp = cupom
function c(t, b, cp) {
    let p = 0; // Preço começa em zero

    // Lógica base (Tamanhos)
    if (t === 'P') {
        p = 25;
    } else if (t === 'M') {
        p = 35;
    } else if (t === 'G') {
        p = 50;
    } else {
        return -1; // Erro: tamanho inválido
    }

    // Adicional (Borda Recheada)
    if (b === true) {
        p = p + 5; 
    }

    // Desconto (Cupom)
    if (cp === 'QUEROPIZZA') {
        p = p * 0.90; // Aplica 10% de desconto
    }

    return p; // Retorna o valor final
}

// --- TESTE E EXPLICAÇÃO ---

// 🗣️ O console.log é como se fosse a BOCA do computador! 
// Sem ele, o computador faz a conta de cabeça e fica calado, guardando segredo. 🤫
// Quando usamos o console.log, o computador "GRITA" a resposta na tela para a gente conseguir ver!
console.log(c('G', true, 'QUEROPIZZA'));