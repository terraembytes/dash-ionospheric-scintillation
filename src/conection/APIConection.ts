import axios from "axios"
import type { DataParams } from "../models/DataParams"
import type { DataParamsFilter } from "../models/DataParamsFilter"
import { type QueryFunctionContext } from "@tanstack/react-query"


type DataQueryKey = ['data', DataParams]
type DataQueryKeyCount = ['dataCount', DataParamsFilter]

const apiClient = axios.create({ baseURL: 'http://127.0.0.1:8000/api', })

//Função para buscar os dados gerais da API
export async function getData(context: QueryFunctionContext<DataQueryKey>) {
    const [_key, params] = context.queryKey
    console.log(_key)
    const { dateStart, dateEnd, station } = params;
    const response = await apiClient.get('/data/', {
        params: {
            start: dateStart,
            end: dateEnd,
            station: station
        }
    })

    return response.data.data;
}

//função que busca os dados do gráfico de countS4
export async function getDataCount(context: QueryFunctionContext<DataQueryKeyCount>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, params] = context.queryKey
    const { elev, elevType, constellation, time, dateStart, dateEnd, station } = params;
    const response = await apiClient.get('/data/filters/contGraphs/', {
        params: {
            elev: elev,
            elevType: elevType,
            constellation: constellation,
            time: time,
            start: dateStart,
            end: dateEnd,
            station: station
        }
    })
    return response.data.data;
}

