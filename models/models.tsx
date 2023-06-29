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

export const setIndexInTreinos = (treinos:Treino[]) => { 
  for(let i = 0; i < treinos.length ; i++){
    treinos[i].index = i;
  }
  return treinos
}

export class Exercicio {
    nome: string;
    musculo: string;
    sets: number;
    reps: number;
    carga: number;
    key: string;
    status: string;
  
    constructor(nome:string, musculo:string, sets:string, reps:string, carga:string) {
      this.nome = nome
      this.musculo = musculo;
      this.sets = parseInt(sets)
      this.reps = parseInt(reps)
      this.carga = parseInt(carga)
      this.status = STATUS[0];
      this.key = uuid.v4().toString();
    }
  }
    
export const STATUS = ['🤔','😔','😐','😀']
export const GRUPOS_MUSCULARES: string[] = ['PEITO','OMBRO','TRÍCEPS','COSTAS','BICEPS','ANTEBRAÇO','QUADRÍCEPS','POSTERIOS','GLÚTEOS',
'CORE', 'PANTURRILHA','PESCOÇO']


