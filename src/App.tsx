import './App.css'
import { useQuery, type QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios'
import imglogo from './assets/img/logo.png'
import { useState } from 'react'
import ScatterGeral from './components/graphs/ScatterGeral.tsx'
import CountS4Interval from './components/graphs/CountS4Interval.tsx'

interface dataParams {
  dateStart: string,
  dateEnd: string,
  station: string
}

interface dataParamsFilter {
  elev: number,
  elevType: number,
  constellation: string,
  time: string,
  dateStart: string,
  dateEnd: string,
  station: string
}

type DataQueryKey = ['data', dataParams]
type DataQueryKeyCount = ['dataCount', dataParamsFilter]

const apiClient = axios.create({ baseURL: 'http://127.0.0.1:8000/api', })

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

function App() {
  //states temporarios para fins de teste
  const [dateStart] = useState('2025-01-01');
  const [dateEnd] = useState('2025-01-2');
  const [station] = useState('CTAS');
  const [elev] = useState(0)
  const [elevType] = useState(1)
  const [constellation] = useState('ALL')
  const [time] = useState('1 minuto')
  //recebendo os dados da API, bem como status de load e error
  //usando queryKey para colocar um identificador na função getData
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ['data', { dateStart, dateEnd, station }],
    queryFn: getData,
    refetchOnWindowFocus: false
    //staleTime: 1000 * 60 * 5, // Considera os dados "frescos" por 5 minutos, evitando refetchs desnecessários.
    //enabled: !!(dateStart && dateEnd && station) //garantir que todos os parametros estão preenchidos
  })

  const dataCount = useQuery({
    queryKey: ['dataCount', { elev, elevType, constellation, time, dateStart, dateEnd, station }],
    queryFn: getDataCount,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <h2>Carregando...</h2>
  if (isError) return <h2>Ocorreu um erro ao realizar a requisição! Erro: {status}</h2>
  if (!data || data.length === 0) {
    return <h2>Nenhum dado encontrado para os filtros selecionados.</h2>;
  }

  if (dataCount.isLoading) return <h2>Carregando grafico 2...</h2>
  if (dataCount.isError) return <h2>Ocorreu um erro ao realizar a requisição do grafico 2</h2>
  if (!dataCount.data || dataCount.data.length === 0) return <h2>Nenhum dado encontrado no grafico 2</h2>

  return (
    <div className='overflow-hidden'>
      {/*DIV DO HEADER*/}
      <div className='flex justify-between items-center p-2 titles-css text-amber-50 rounded-2xl shadow-lg'>
        <div><img src={imglogo} alt="logo do projeto" width={110} height={100} /></div>
        <div>Análise do Índice S4</div>
        <div>Hello World</div>
      </div>

      {/*DIV DA AREA DOS DASHBOARDS*/}
      <div className='bg-gray-100 w-full h-full mt-6 rounded-2xl p-4 shadow-lg grid grid-cols-2 gap-4'>
        <div className='border shadow-md p-1 w-full h-fit'>
          {/*Gráfico geral do índice S4*/}
          <ScatterGeral data={data} title='Índice S4 de Todas Constelações - 2025-01-01 a 2025-01-02' />
        </div>
        <div className='border shadow-md p-1 w-full h-fit'>
          {/*Gráfico com a contagem de satélites com determinando intervalo do índice S4*/}
          <CountS4Interval data={dataCount.data} title='Quantidade de satélites com S4 entre 0.3 e 0.6 - 2025-01-01 a 2025-01-02' />
        </div>
        <div className='border shadow-md p-1'>Gráfico 3</div>
        <div className='border shadow-md p-1'>Gráfico 4</div>
      </div>
    </div>
  )
}

export default App
