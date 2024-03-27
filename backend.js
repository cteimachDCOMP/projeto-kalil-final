/* O Código de leitura do arquivo .CSV e conversão foi fornecido pelo professor Kalil Araújo Bispo.
Modificado parcialmente pelo GPT 3.5 e pelo aluno Cauan Teixeira Machado.*/

const fs = require('fs');
const csv = require('csv-parser');

// Função para ler o arquivo CSV e retornar uma promessa com os dados processados
const lerCSV = (caminhoArquivo) => {
    return new Promise((resolve, reject) => {
        const dados = [];
        fs.createReadStream(caminhoArquivo)
            .pipe(csv())
            .on('data', (linha) => {
                dados.push(linha);
            })
            .on('end', () => {
                resolve(dados);
            })
            .on('error', (error) => {
                console.error('Erro ao ler o arquivo CSV:', error);
                reject(error);
            });
    });
};

// Exemplo de uso da função
(async () => {
    try {   //Dentro do try estarão as funções responsáveis por manipular os dadosCSV de acordo com as perguntas elaboradas pela equipe.
        const indef = (x) => typeof x === 'undefined'
        const dadosCSV = await lerCSV('athlete_events.csv');
        const soLondres = dadosCSV.filter((x) => x.Year == '2012'); // Filtra o registro para armazenar apenas os atletas que participaram da olimpíada de Londres 2012
        const soMedalhistas = soLondres.filter((x) => x.Medal != 'NA');
        const eliminaRepeticoes = (registro) => {
            const op = (tratada, x) =>  tratada.includes(x) ? tratada : [...tratada, x];
            const semrepeticao = registro.reduce(op,[]);
            return semrepeticao;
        }
        const somatorio = (registro) => {
            const soma = (x,y) => x + y;
            const somatotal = registro.reduce(soma, 0);
            return somatotal;
        }

        const maisNovoMedalhista = (soMedalhistas) => {

        const menor = (x,y) => x < y ? x : y;
        const maisNovoMedalhistaAUX = (soMedalhistas.map((x) => parseInt(x.Age))).reduce(menor,100);
        const maisNovo = soMedalhistas.find((x) => maisNovoMedalhistaAUX === parseInt(x.Age));
        console.log(`Nome : ${maisNovo.Name}\nIdade: ${maisNovo.Age}`); // VOLTAR AQUI DEPOIS E REVER COMO APLICAR A FUNÇÃO
       }
       
        const esportesPaisMedalha = (pais) => {

        const listaesportes = (soMedalhistas.filter((x) => x.Team == pais)).map((x) => x.Sport);
        const registroFormatado = eliminaRepeticoes(listaesportes);
        console.log(registroFormatado);
       }
       
        const brasilEsporteMedalhas = (esporte) => {
        const brasilEsporteMedalhasAUX = ((soMedalhistas.filter(((x) => x.Sport == esporte))).filter((x) => x.Team == 'Brazil')).map((x) => 1);
        console.log(somatorio(brasilEsporteMedalhasAUX))
       }
        brasilEsporteMedalhas('Football');
        

    } catch (error) {
        console.error('Erro ao ler o arquivo CSV:', error);
    }
})();