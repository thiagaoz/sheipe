import uuid from 'react-native-uuid';

export class Treino {
    key: string;
    index: number;
    nome: string;
    exercicios: Exercicio[];

    constructor(nome: string) {
      this.nome = nome;
      this.index = -1;
      this.key = uuid.v4().toString();
      this.exercicios = [];
    }

}

export const setIndexInTreinos = (arr: Treino[]) => { 
  for(let i = 0; i < arr.length ; i++){
    arr[i].index = i;
  }
  return arr 
}

export const setIndexInExercicios = (arr: Exercicio[]) => { 
  for(let i = 0; i < arr.length ; i++){
    arr[i].index = i;
  }
  return arr 
}

export class Exercicio {
    nome: string;
    musculo: string;
    sets: number;
    reps: number;
    carga: number;
    equip: string;
    key: string;
    status: string;
    index: number;
  
    constructor(nome:string, musculo:string, sets:string, reps:string, carga:string, equip:string) {
      this.nome = nome
      this.musculo = musculo;
      this.sets = parseInt(sets)
      this.reps = parseInt(reps)
      this.carga = parseInt(carga)
      this.equip = equip
      this.status = STATUS[0];
      this.key = uuid.v4().toString();
      this.index = -1
    }
  }
    
export const STATUS = ['🤔','😔','😐','😀']
export const EQUIPAMENTO: string[] = ['HALTER', 'BARRA','SMITH','MÁQUINA','POLIA','BARRA FIXA','PESO CORPORAL','OUTRO']
export const GRUPOS_MUSCULARES: string[] = ['PEITO','OMBRO','COSTAS','BÍCEPS','TRÍCEPS','ANTEBRAÇO','QUADRÍCEPS','POSTERIOR',
'GLÚTEOS','ABDÔMEN','OBLÍQUO','PESCOÇO', 'PANTURRILHA', 'OUTRO']

export const push: Treino = new Treino('Push')
export const pull: Treino = new Treino('Pull')
export const legs: Treino = new Treino('Legs')

const supino = new Exercicio('Supino','PEITO','4','8','60','BARRA')
supino.index = 0
const fly = new Exercicio('Voador','PEITO','3','15','25','POLIA')
fly.index = 1
const elevacao = new Exercicio('Elevação lateral','OMBRO','3','12','10','HALTER')
elevacao.index = 2
const press = new Exercicio('Desenvolvimento','OMBRO','3','15','20','BARRA')
press.index = 3
const flexao = new Exercicio('Flexão','TRÍCEPS','3','20','0','PESO CORPORAL')
flexao.index = 4
const barra = new Exercicio('Barra Neutra','COSTAS','4','5','0','BARRA FIXA')
barra.index = 0
const remada = new Exercicio('Remada inclinada','COSTAS','3','15','0','BARRA')
remada.index = 1
const rosca = new Exercicio('Rosca Direta','BÍCEPS','3','15','18','HALTER')
rosca.index = 2
const squat = new Exercicio('Agachamento Smith','QUADRÍCEPS','3','10','42','SMITH')
squat.index = 0
const dead = new Exercicio('Deadlift','POSTERIOR','4','8','60','BARRA')
dead.index = 1
const panturrilha = new Exercicio('Elevação de Panturrilha','PANTURRILHA','3','15','70','SMITH')
panturrilha.index = 2

//push.index = 0
//pull.index = 1
//legs.index = 2

push.exercicios.push(supino, fly, elevacao, press, flexao)
pull.exercicios.push(barra, remada, rosca)
legs.exercicios.push(squat,dead,panturrilha)



