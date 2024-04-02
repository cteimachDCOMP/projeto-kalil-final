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
        const dadosCSV = await lerCSV('athlete_events.csv');
        const soLondres = dadosCSV.filter((x) => x.Year == '2012'); // Filtra o registro para armazenar apenas os atletas que participaram da olimpíada de Londres 2012
        const soMedalhistas = soLondres.filter((x) => x.Medal != 'NA');
        const eliminaRepeticoes = (registro) => { // função criada para tornar listas com elementos unicos, já que os atletas estão repetidos no .cvs de acordo com a quantidade de modalidades concorridas
            const op = (tratada, x) =>  tratada.includes(x) ? tratada : [...tratada, x];
            const semrepeticao = registro.reduce(op,[]);
            return semrepeticao;
        }
        const somatorio = (registro) => {
            const soma = (x,y) => x + y;
            const somatotal = registro.reduce(soma, 0);
            return somatotal;
        }

        const maisNovoMedalhista = (soMedalhistas) => { // retorna o atleta do registro com a menor idade que possui no mínimo 1 medalha.
        const menor = (x,y) => x < y ? x : y;
        const maisNovoMedalhistaAUX = (soMedalhistas.map((x) => parseInt(x.Age))).reduce(menor,100);// encontra a menor idade registrada dentre os medalhistas.
        const maisNovo = soMedalhistas.find((x) => maisNovoMedalhistaAUX === parseInt(x.Age)); // encontra o atleta que possui a idade encontrada anteriormente.
        const resposta = (`Nome : ${maisNovo.Name}\nIdade: ${maisNovo.Age}`); // exibe o primeiro atleta do registro que possui as características acima.
        console.log(resposta);
       }
       
       maisNovoMedalhista(soMedalhistas);
       console.log('---------------------------------------------------');

        const esportesPaisMedalha = (pais) => {

        const listaesportes = (soMedalhistas.filter((x) => x.Team == pais)).map((x) => x.Sport); // filtra os esportes em que o determinado pais ganhou medalhas.
        const registroFormatado = eliminaRepeticoes(listaesportes);
        const exibeEsportes = registroFormatado.sort().join('\n'); // retira os elementos da lista e organiza em ordem alfabetica.
        console.log(exibeEsportes);
       }

       
       esportesPaisMedalha('Brazil');
       console.log('---------------------------------------------------');
       
        const brasilEsporteMedalhistas = (esporte) => {
        const brasilEsporteMedalhistasAUX = ((soMedalhistas.filter(((x) => x.Sport == esporte))).filter((x) => x.Team == 'Brazil')).map((x) => 1); // encontra quantas medalhas o Brasil ganhou em determinado esporte
        console.log(somatorio(brasilEsporteMedalhistasAUX))
       }

       brasilEsporteMedalhistas('Football');
       console.log('---------------------------------------------------');
    
       const calcularRanking = (registro) => { // função gerada em gpt-3.5 e modificada para o paradigma funcional por Cauan T. Machado
        const medalhasPorPais = registro.reduce((acc, atleta) => { // calcula quantas medalhas (com distinção entre ouro, prata e bronze) cada país obteve 
          const pais = atleta.Team;
          const medalha = atleta.Medal;
      
          if (!acc[pais]) {
            acc[pais] = { ouro: 0, prata: 0, bronze: 0, pais };
          }
      
          if (medalha === 'Gold') {
            acc[pais].ouro++;
          } else if (medalha === 'Silver') {
            acc[pais].prata++;
          } else if (medalha === 'Bronze') {
            acc[pais].bronze++;
          }
      
          return acc;
        }, {});
      
        const ranking = Object.values(medalhasPorPais) // organiza o ranking de medalhas com base nos critérios de desempate estabelecidos nos ifs.
          .sort((a, b) => {
            if (a.ouro !== b.ouro) {
              return b.ouro - a.ouro;
            }
            if (a.prata !== b.prata) {
              return b.prata - a.prata;
            }
            if (a.bronze !== b.bronze) {
              return b.bronze - a.bronze;
            }
            return a.pais.localeCompare(b.pais);
          })
          .slice(0, 10)// pega apenas os 10 primeiros elementos desse ranking.
          .map(pais => pais.pais);
      
        return ranking;
      }
      
      const top10Paises = calcularRanking(soLondres);
      const primeiro = top10Paises[0];
      const segundo = top10Paises[1];
      const terceiro = top10Paises[2];
      const quarto = top10Paises[3];
      const quinto = top10Paises[4];
      const sexto = top10Paises[5];
      const setimo = top10Paises[6];
      const oitavo = top10Paises[7];
      const nono = top10Paises[8];
      const decimo = top10Paises[9];

      const rankingformatado = () => console.log(`1º: ${primeiro}\n2º: ${segundo}\n3º: ${terceiro}\n4º: ${quarto}\n5º: ${quinto}\n6º: ${sexto}\n7º: ${setimo}\n8º: ${oitavo}\n9º: ${nono}\n10º: ${decimo}\n`);    
      
      rankingformatado();
      console.log('---------------------------------------------------');
      

    infoSobreAtleta = (nome) =>{
        const registroAtleta = soLondres.filter((atleta) => atleta.Name == nome); // armazena apenas o atleta que se deseja obter os dados.
        const soAtleta = registroAtleta[0]; // elimina outros possiveis registros
        const atletaSexo = soAtleta.Sex == 'M' ? 'Masculino' : 'Feminino'
        console.log(`Nome: ${soAtleta.Name}\nIdade: ${soAtleta.Age}\nSexo: ${atletaSexo}\nAltura: ${soAtleta.Height} Cm\nMassa: ${soAtleta.Weight} Kg\nEsporte: ${soAtleta.Sport}\n`);
    }

    infoSobreAtleta('Taylor Phinney');

    } catch (error) {
        console.error('Erro ao ler o arquivo CSV:', error);
    }
})();