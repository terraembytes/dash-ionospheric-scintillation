import axios from "axios"
import type { DataParams } from "../models/DataParams"
import type { DataParamsFilter } from "../models/DataParamsFilter"
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query"


type DataQueryKey = ['data', DataParams]
type DataQueryKeyCount = ['dataCount', DataParamsFilter]

const apiClient = axios.create({ baseURL: 'http://127.0.0.1:8000/api', })

//usando queryKey para colocar um identificador na função getData
export function queryData(dateStart: string, dateEnd: string, station: string) {
    return useQuery({
        queryKey: ['data', { dateStart, dateEnd, station }],
        queryFn: getData,
        refetchOnWindowFocus: false
        //staleTime: 1000 * 60 * 5, // Considera os dados "frescos" por 5 minutos, evitando refetchs desnecessários.
        //enabled: !!(dateStart && dateEnd && station) //garantir que todos os parametros estão preenchidos
    })
}

export function queryDataCount(
    elev: number, elevType: number, constellation: string, time: string, dateStart: string, dateEnd: string, station: string
) {
    return useQuery({
        queryKey: ['dataCount', { elev, elevType, constellation, time, dateStart, dateEnd, station }],
        queryFn: getDataCount,
        refetchOnWindowFocus: false
      })
}

//Função para buscar os dados gerais da API
async function getData(context: QueryFunctionContext<DataQueryKey>) {
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

async function getDataCount(context: QueryFunctionContext<DataQueryKeyCount>) {
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
    console.log(response.data.data)
    return response.data.data;
}

