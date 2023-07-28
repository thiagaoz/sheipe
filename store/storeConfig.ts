import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Exercicio, Treino, setIndexInExercicios } from '../models/models'
import * as db from '../database/database'

export interface TreinosState {
  treinosArr: Treino[];
  atual: Treino;
}

const treinoInicial = new Treino ('')
const initialTreinoState: TreinosState = {
    treinosArr: [],
    atual: {...treinoInicial}
};

const treinoSlice = createSlice({
    name: 'treino',
    initialState: initialTreinoState,
    reducers: {
        adicionarTreino: (state, action:PayloadAction<Treino>) => {
            state.treinosArr.push(action.payload)
        },
        editarTreino: (state, action:PayloadAction<Treino>) => {
          state.atual = {...action.payload}
          state.treinosArr[action.payload.index] = {...action.payload}
        },
        adicionarExercicio: (state, action:PayloadAction<Exercicio>) => {
          state.atual.exercicios.push(action.payload)
          state.treinosArr[state.atual.index] = {...state.atual} ;
        },
        setTreinoAtual: (state, action:PayloadAction<Treino>) => {
          state.atual = {...action.payload}
        },
        carregaTreinos: (state, action:PayloadAction<Treino[]>) => {
          state.treinosArr = [...action.payload]
        },
        exercicioIndexMinus: (state, action:PayloadAction<number>) => {
          let oldIndex = action.payload
          const exerciciosArr = state.atual.exercicios
          const exerciciosArrNew: Exercicio[] = []
          for (let i=0; i<exerciciosArr.length; i++){
            if (oldIndex-1 === i){
              exerciciosArrNew.push(exerciciosArr[oldIndex])
              exerciciosArrNew.push(exerciciosArr[i])
              i++
            }
            else{
              exerciciosArrNew.push(exerciciosArr[i])
            }
          }
          state.atual.exercicios = setIndexInExercicios(exerciciosArrNew)
          state.treinosArr[state.atual.index] = {...state.atual}
        },
        exercicioIndexPlus: (state, action:PayloadAction<number>) => {
          let oldIndex = action.payload
          const exerciciosArr = state.atual.exercicios
          const exerciciosArrNew: Exercicio[] = []
          for (let i=0; i<exerciciosArr.length; i++){
            if (oldIndex === i){
              exerciciosArrNew.push(exerciciosArr[i+1])
              exerciciosArrNew.push(exerciciosArr[oldIndex])
              i++
            }
            else{
              exerciciosArrNew.push(exerciciosArr[i])
            }
          }
          state.atual.exercicios = setIndexInExercicios(exerciciosArrNew)
          state.treinosArr[state.atual.index] = {...state.atual}
        },
        resetTreino: (state) => {
          state.atual = {...treinoInicial}
        },
        
    }
})

export const {adicionarTreino, adicionarExercicio, resetTreino, setTreinoAtual, editarTreino, 
  carregaTreinos, exercicioIndexMinus, exercicioIndexPlus} = treinoSlice.actions

export interface ExercicioState {
  atual: Exercicio | null
}

const exercicioInitialState: ExercicioState = {
  //atual: new Exercicio('','','','','',)
  atual: null
}

const exercicioSlice = createSlice({
  name: 'exercicio',
  initialState: exercicioInitialState,
  reducers: {
    setExercicioAtual: (state, action:PayloadAction<Exercicio>) => {
      state.atual = {...action.payload}
    },
    resetExercicio: () => exercicioInitialState,
  }
})

export const {setExercicioAtual, resetExercicio } = exercicioSlice.actions
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
      treino: treinoSlice.reducer,
      exercicio: exercicioSlice.reducer
    }
  });
