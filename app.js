let listaDeNumerosSorteados = [];
let tentativas =1;
let quantidadeMaxima = 0;
let numeroSecreto;
let nomeJogador = '';



function exibirTextoNaTela (tag, Texto) {
    let campo = document. querySelector(tag);
    campo.innerHTML = Texto;
    responsiveVoice.speak(Texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function solicitarNomeJogador() {
    exibirTextoNaTela('h1', 'Jogo do número secreto do Galds');
    exibirTextoNaTela('p', 'Por favor, insira seu nome:');
    const input = document.querySelector('input');
    input.setAttribute('type', 'text');
    document.querySelector('input').value = '';  
    const botao = document.getElementById('ChuteOuInicie');
    botao.innerHTML = 'Continuar'; 
    botao.setAttribute('onclick', 'capturarNomeJogador()');
}

function capturarNomeJogador() {
    nomeJogador = document.querySelector('input').value.trim(); 


    if (nomeJogador === '' || !isNaN(nomeJogador)) {
        exibirTextoNaTela('p', 'Por favor, insira um nome válido. Não pode ser apenas números.');
    } else {
        solicitarQuantidadeMaxima();  
    }
}


function solicitarQuantidadeMaxima() {
    
    exibirTextoNaTela('p', 'Escolha a quantidade máxima');
    const input = document.querySelector('input');
    input.setAttribute('type', 'number'); 
    input.value = ''; 

    const botao = document.getElementById('ChuteOuInicie');
    botao.innerHTML = 'Inicie o Jogo'; 
    botao.setAttribute('onclick', 'iniciarJogo()');
}

function iniciarJogo() {
    quantidadeMaxima = parseInt(document.querySelector('input').value);
    if (!isNaN(quantidadeMaxima) && quantidadeMaxima > 0) {
        numeroSecreto = gerarNumeroAleatorio();
        exibirMensagemInicial();
    } else {
        exibirTextoNaTela('p', 'Por favor, insira um número válido.');
    }
}

function exibirMensagemInicial (){
    exibirTextoNaTela ('h1', `Vamos jogar, ${nomeJogador}!`);
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${quantidadeMaxima}`);
    document.querySelector('input').value = '';
    document.getElementById('ChuteOuInicie').innerHTML = 'Chute';
    document.querySelector('button').setAttribute('onclick', 'verificarChute()'); 
}



function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let pluralTentativas = tentativas > 1 ? ` Parabéns ${nomeJogador}! Você descobriu o número ${numeroSecreto} com ${tentativas} tentativas` : `wouuuuuu.... ${nomeJogador}, você acertou o número secreto ${numeroSecreto} na primeira tentativa.... Impressionante!!!` ;
        exibirTextoNaTela('p',pluralTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');   
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
    
}

function gerarNumeroAleatorio (){
   let numeroEscolhido = parseInt(Math.random() *quantidadeMaxima + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
   
   if (quantidadeDeElementosNaLista == quantidadeMaxima) {
        listaDeNumerosSorteados = [];   
   }
   
   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value ='';
}

function reiniciarJogo(){
    limparCampo();
    tentativas = 1;  
    quantidadeMaxima = 0;  
    document.getElementById('reiniciar').setAttribute('disabled', true);  
    solicitarQuantidadeMaxima();
}

solicitarNomeJogador();