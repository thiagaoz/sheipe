import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Exercicio, Treino } from '../models/models'
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
            action.payload.index = state.treinosArr.length  // set o novo treino com index na última posição
            state.treinosArr.push(action.payload)
        },
        editarTreino: (state, action:PayloadAction<Treino>) => {
          Object.assign(state.atual, action.payload)
          Object.assign(state.treinosArr[state.atual.index], state.atual);
        },
        adicionarExercicio: (state, action:PayloadAction<Exercicio>) => {
          state.atual.exercicios.push(action.payload)
          Object.assign(state.treinosArr[state.atual.index], state.atual);
        },
        setTreinoAtual: (state, action:PayloadAction<Treino>) => {
          Object.assign(state.atual, action.payload)
        },
        resetTreino: () => initialTreinoState,
        
    }
})

export const {adicionarTreino, adicionarExercicio, resetTreino, setTreinoAtual, editarTreino} = treinoSlice.actions

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
