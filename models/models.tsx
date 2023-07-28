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
    key: string;
    status: string;
    index: number;
  
    constructor(nome:string, musculo:string, sets:string, reps:string, carga:string) {
      this.nome = nome
      this.musculo = musculo;
      this.sets = parseInt(sets)
      this.reps = parseInt(reps)
      this.carga = parseInt(carga)
      this.status = STATUS[0];
      this.key = uuid.v4().toString();
      this.index = -1
    }
  }
    
export const STATUS = ['🤔','😔','😐','😀']
export const GRUPOS_MUSCULARES: string[] = ['PEITO','OMBRO','TRÍCEPS','COSTAS','BICEPS','ANTEBRAÇO','QUADRÍCEPS','POSTERIOS','GLÚTEOS',
'CORE', 'PANTURRILHA','PESCOÇO']


