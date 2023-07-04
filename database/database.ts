import AsyncStorage from '@react-native-async-storage/async-storage';
import { Treino, Exercicio, setIndexInTreinos } from '../models/models';
import { useDispatch } from 'react-redux'

export const salvarNovoTreino = async (treino: Treino) => {
    try{
        const jsonTreino = JSON.stringify(treino)
        await AsyncStorage.setItem(treino.key, jsonTreino)
        return treino
    } catch (e) {
        console.log('Falha ao adicionar ' +treino.nome+ ' aos Treinos')
    }
}

export const salvarTreino  = async  (treino:Treino) => {
    try{
        const jsonTreino = JSON.stringify(treino)
        await AsyncStorage.setItem(treino.key, jsonTreino)

    } catch(e){
        console.log('Função salvarExercicio em database.ts não conseguiu salvar o novo exercício')
        console.log('Erro ===> ' + e)
    }
}

export const getAllTreinos = async (): Promise<Treino[]>=> { 
    try{
        const allKeys = await AsyncStorage.getAllKeys();
        const treinoItems = await AsyncStorage.multiGet(allKeys);
        const treinos:Treino[] = treinoItems.map(([key, value]) => {
            if(value){
                return JSON.parse(value)
            }else{
                return []
            }
            }
        );
        treinos.filter((treino) => treino !== null);    
        return setIndexInTreinos(treinos);
        
    } catch(e){
        console.log('ERRO ao localizar TREINOS')
        return [];
    }
}

export const getTreino = async(key:string): Promise<Treino|null>  => {
    try{
        const treinoJson = await AsyncStorage.getItem(key)
        const treino = treinoJson? JSON.parse(treinoJson) : null
        return treino
    }catch(e){
        console.log('ERRO ao localizar o Treino')
        return null
    }
}

export const deleteTreinoDB = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log('Erro ao remover treino')
    }
  
    console.log('Done.')
  }

export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  }