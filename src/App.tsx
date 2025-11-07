import './App.css'
import imglogo from './assets/img/logo.png'
import React, { useState } from 'react'
import ScatterGeral from './components/graphs/ScatterGeral.tsx'
import CountS4Interval from './components/graphs/CountS4Interval.tsx'
import { queryData, queryDataCount } from './conection/APIConection.ts'
import { verifyString } from './utils/basicFunctions.ts'

function App() {
  //states temporarios para fins de teste
  const [dateStart, setDateStart] = useState('2025-01-01');
  const [dateEnd, setDateEnd] = useState('2025-01-2');
  const [station, setStation] = useState('CTAS');
  const [elev] = useState(0)
  const [elevType] = useState(1)
  const [constellation] = useState('ALL')
  const [time] = useState('1 minuto')

  //recebendo os dados da API, bem como status de load e error
  // const { data, isLoading, isError, status } = queryData(dateStart, dateEnd, station)
  // const dataCount = queryDataCount(elev, elevType, constellation, time, dateStart, dateEnd, station)

  // if (isLoading) return <h2>Carregando...</h2>
  // if (isError) return <h2>Ocorreu um erro ao realizar a requisição! Erro: {status}</h2>
  // if (!data || data.length === 0) {
  //   return <h2>Nenhum dado encontrado para os filtros selecionados.</h2>;
  // }

  // if (dataCount.isLoading) return <h2>Carregando grafico 2...</h2>
  // if (dataCount.isError) return <h2>Ocorreu um erro ao realizar a requisição do grafico 2</h2>
  // if (!dataCount.data || dataCount.data.length === 0) return <h2>Nenhum dado encontrado no grafico 2</h2>

  //cada alteração feita nos inputs é atualizado nos states
  const stationChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStation(e.target.value)
  const dateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateStart(e.target.value)
  const dateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateEnd(e.target.value)

  //função para realizar a pesquisa dos dados brutos
  function pesquisarDados() {
    if(verifyString(dateStart)) {
      alert("Campo data inicial incorreto!")
      return
    }

    if(verifyString(dateEnd)) {
      alert("Campo data final incorreto!")
      return
    }

    if(verifyString(station)) {
      alert("Estação não informada!")
      return
    }

    //queryData(dateStart, dateEnd, station)
  }

  return (
    <div className='overflow-hidden'>
      {/*DIV DO HEADER*/}
      <div className='flex justify-between items-center p-2 titles-css text-amber-50 rounded-2xl shadow-lg'>
        <div><img src={imglogo} alt="logo do projeto" width={110} height={100} /></div>
        <div>Análise do Índice S4</div>
        <div>Hello World</div>
      </div>
      {/*DIV DOS FILTROS INICIAIS*/}
      <div className='titles-css p-2 rounded-2xl shadow-lg mt-6 text-amber-50'>
        <span className='font-bold'>Filtros básicos</span>
        {/*FILTROS BÁSICOS*/}
        <form onSubmit={pesquisarDados}>
        <div className='p-2 flex flex-row gap-5'>
          {/*INPUT DA DATA INICIAL*/}
          <div className='border-2 p-1 rounded-md'>
            <label htmlFor="inputDateStart" className='font-bold'>Data inicial: </label>
            <input type='date' id='inputDateStart' value={dateStart} onChange={dateStartChange}/>
          </div>
          {/*INPUT DA DATA FINAL*/}
          <div className='border-2 p-1 rounded-md'>
            <label htmlFor="inputDateEnd" className='font-bold'>Data Final: </label>
            <input type="date" id='inputDateEnd' value={dateEnd} onChange={dateEndChange}/>
          </div>
          {/*DROPDOWN COM AS ESTAÇÕES*/}
          <div className='border-2 p-1 rounded-md'>
            <label htmlFor="dropdownStation" className='font-bold'>Estação: </label>
            <select name="dropdownStation" id="dropdownStation" value={station} onChange={stationChange}>
              <option value="CTAS">CTAS</option>
              <option value="CTAS">Teste 1</option>
              <option value="CTAS">Teste 2</option>
            </select>
          </div>
          {/*BOTÃO PARA EXECUTAR OS FILTROS BÁSICOS*/}
          <button 
          className='rounded-lg border border-amber-50 p-1 bg-[#e9d4ba] text-[#847c74] font-bold cursor-pointer hover:bg-[#a09489] hover:text-[#e9d4ba]'
            type='submit'
          >
            PESQUISAR
          </button>
        </div>
        </form>
      </div>
      {/*DIV DA AREA DOS DASHBOARDS*/}
      <div className='bg-gray-100 w-full h-full mt-6 rounded-2xl p-4 shadow-lg grid grid-cols-2 gap-4'>
        <div className='border shadow-md p-1 w-full h-fit'>
          {/*Gráfico geral do índice S4*/}
          {/*}<ScatterGeral data={data} title='Índice S4 de Todas Constelações - 2025-01-01 a 2025-01-02' />{*/}
        </div>
        <div className='border shadow-md p-1 w-full h-fit'>
          {/*Gráfico com a contagem de satélites com determinando intervalo do índice S4*/}
          {/*}<CountS4Interval data={dataCount.data} title='Quantidade de satélites com S4 entre 0.3 e 0.6 - 2025-01-01 a 2025-01-02' />{*/}
        </div>
        <div className='border shadow-md p-1'>Gráfico 3</div>
        <div className='border shadow-md p-1'>Gráfico 4</div>
      </div>
    </div>
  )
}

export default App
