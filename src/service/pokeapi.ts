import axiosInstance from "../axiosInstance"
import { urls } from "../config"

export const  getPokemons = async (limite:number,inicio:number) => {    
	const url = urls.pokemons.replace("${}",String(limite)).replace("${}",String(inicio))
	const pokemons = await axiosInstance.get(url)
	return pokemons
}