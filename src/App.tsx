import './App.css'
import { useQuery, type QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios'
import Plot from 'react-plotly.js'
import imglogo from './assets/img/logo.png'
import { useState } from 'react'

interface dataParams {
  dateStart: string,
  dateEnd: string,
  station: string
}

interface DataGeral {
      Date: string,
      Svid: number,
      S4: string,
      Elevation: number
}

type DataQueryKey = ['data', dataParams]

const apiClient = axios.create({baseURL: 'http://127.0.0.1:8000/api',})

//Função para buscar os dados gerais da API
async function getData(context: QueryFunctionContext<DataQueryKey>) {
  const [_key ,params] = context.queryKey
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

function App() {
  //states temporarios para fins de teste
  const [dateStart] = useState('2025-01-01');
  const [dateEnd] = useState('2025-01-2');
  const [station] = useState('CTAS');
  //recebendo os dados da API, bem como status de load e error
  //usando queryKey para colocar um identificador na função getData
  const { data, isLoading, isError, status } = useQuery({ 
      queryKey: ['data', {dateStart, dateEnd, station}], 
      queryFn: getData,
      refetchOnWindowFocus: false
      //staleTime: 1000 * 60 * 5, // Considera os dados "frescos" por 5 minutos, evitando refetchs desnecessários.
      //enabled: !!(dateStart && dateEnd && station) //garantir que todos os parametros estão preenchidos
    })

  if(isLoading) return <h2>Carregando...</h2>
  if(isError) return <h2>Ocorreu um erro ao realizar a requisição! Erro: {status}</h2>
  if (!data || data.length === 0) {
    return <h2>Nenhum dado encontrado para os filtros selecionados.</h2>;
  }

  //const dados: DataGeral = data
  /*const graph1 = {
    x: data.map((dados: DataGeral) => {return dados.Date}),
    y: data.map((dados: DataGeral) => {return dados.S4}),
    mode: 'markers',
    type: 'scatter',
    marker: {color: data.map((dados: DataGeral) => {return dados.Svid})}
  }*/
  return (
    <div className='overflow-hidden'>
      {/*DIV DO HEADER*/}
      <div className='flex justify-between items-center p-2 titles-css text-amber-50 rounded-2xl shadow-lg'>
        <div><img src={imglogo} alt="logo do projeto" width={110} height={100}/></div>
        <div>Análise do Índice S4</div>
        <div>Hello World</div>
      </div>

      {/*DIV DA AREA DOS DASHBOARDS*/}
      <div className='bg-gray-100 w-full h-full mt-6 rounded-2xl p-4 shadow-lg grid grid-cols-2 gap-4'>
       <div className='border shadow-md p-1 w-full h-fit'>
        <Plot
          data={[
            {
              x: data.map((dados: DataGeral) => {return dados.Date}),
              y: data.map((dados: DataGeral) => {return dados.S4}),
              mode: 'markers',
              type: 'scatter',
              marker: {color: data.map((dados: DataGeral) => {return dados.Svid})}
            }
          ]}
          layout={ {title: {text: 'Índice S4 de Todas Constelações - 2025-01-01 a 2025-01-02'}, autosize: true} }
          useResizeHandler={true}
          className="w-full h-full"
        />
       </div>
       <div className='border shadow-md p-1'>Gráfico 2</div>
       <div className='border shadow-md p-1'>Gráfico 3</div>
       <div className='border shadow-md p-1'>Gráfico 4</div>
      </div>
    </div>
  )
}

export default App
