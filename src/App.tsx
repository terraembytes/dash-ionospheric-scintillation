import './App.css'
import imglogo from './assets/img/logo.png'
import React, { useEffect, useState } from 'react'
import ScatterGeral from './components/graphs/ScatterGeral.tsx'
import CountS4Interval from './components/graphs/CountS4Interval.tsx'
import { verifyString } from './utils/basicFunctions.ts'
import { useQuery } from '@tanstack/react-query'
import SkyplotConstellation from './components/graphs/SkyplotConstellation.tsx'
import { getData, getDataCount, getDataSkyplot } from './conection/APIConection.ts'

function App() {
  //states temporarios para fins de teste
  const [dateStart, setDateStart] = useState('2024-11-11');
  const [dateEnd, setDateEnd] = useState('2024-11-12');
  const [station, setStation] = useState('CTAS');
  const [elev] = useState(0)
  const [elevType] = useState(1)
  const [constellation] = useState('GPS')
  const [time] = useState('1 minuto')
  const [hourRange] = useState(1)
  const [dateChoosed] = useState('2024-11-11 23:30:00')

  //constantes com os dados retornados de cada gráfico
  const graphGeral = useQuery({ //grafico geral
    queryKey: ['data', { elev, elevType, constellation, time, dateStart, dateEnd, station, hourRange: null, dateChoosed: null }],
    queryFn: getData,
    refetchOnWindowFocus: false,
    enabled: false //impede que ele execute de primeira
  })

  const graphCountS4 = useQuery({ //grafico da quantidade de satelites com indice S4 entre até 0.3 e até 0.6
    queryKey: ['dataCount', { elev, elevType, constellation, time, dateStart, dateEnd, station }],
    queryFn: getDataCount,
    refetchOnWindowFocus: false,
    enabled: false
  })

  const graphSkyplot = useQuery({
    queryKey: ['data', { elev, elevType, constellation, time, dateStart, dateEnd, station, hourRange, dateChoosed }],
    queryFn: getDataSkyplot,
    refetchOnWindowFocus: false,
    enabled: false //impede que ele execute de primeira
  })

  //chama o useQuery de cada grafico na renderização inicial da página
  useEffect(() => {
    graphGeral.refetch()
    graphCountS4.refetch()
    graphSkyplot.refetch()
  }, [graphGeral.refetch, graphCountS4.refetch, graphSkyplot.refetch])

  //cada alteração feita nos inputs é atualizado nos states
  const stationChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStation(e.target.value)
  const dateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateStart(e.target.value)
  const dateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => setDateEnd(e.target.value)

  //função para realizar a pesquisa dos dados brutos
  function pesquisarDados(e: React.FormEvent<HTMLFormElement>) {
    //impede que a pagina recarregue, barrando a funcionalidade padrão do form submit
    e.preventDefault()

    if (verifyString(dateStart)) {
      alert("Campo data inicial incorreto!")
      console.log("Campo data inicial incorreto")
      return
    }

    if (verifyString(dateEnd)) {
      alert("Campo data final incorreto!")
      console.log("campo data final incorreto!")
      return
    }

    if (verifyString(station)) {
      alert("Estação não informada!")
      console.log("Estação não informada!")
      return
    }

    graphGeral.refetch()
    graphCountS4.refetch()
    graphSkyplot.refetch()
  }

  return (
    <div className='overflow-hidden'>
      {/*DIV DO HEADER*/}
      <div className='flex justify-between items-center p-2 titles-css text-amber-50 rounded-2xl shadow-lg'>
        <div><img src={imglogo} alt="logo do projeto" width={110} height={100} /></div>
        <div>Análise do Índice S4</div>
        <div>Hello World</div>
      </div>

      <div className='grid grid-flow-col grid-rows-2 gap-4'>
        {/*DIV DOS FILTROS INICIAIS*/}
        <div className='titles-css p-2 rounded-2xl shadow-lg mt-5 text-amber-50 row-span-15'>
          <span className='font-bold'>Filtros básicos</span>
          {/*FILTROS BÁSICOS*/}
          <form onSubmit={pesquisarDados} id='form-basic-filters'>
            <div className='p-2 grid grid-flow-col grid-rows-4 gap-4'>
              {/*INPUT DA DATA INICIAL*/}
              <div className='border-2 p-1 rounded-md'>
                <label htmlFor="inputDateStart" className='font-bold'>Data inicial: </label>
                <input type='date' id='inputDateStart' value={dateStart} onChange={dateStartChange} />
              </div>
              {/*INPUT DA DATA FINAL*/}
              <div className='border-2 p-1 rounded-md'>
                <label htmlFor="inputDateEnd" className='font-bold'>Data Final: </label>
                <input type="date" id='inputDateEnd' value={dateEnd} onChange={dateEndChange} />
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
                type='submit'>
                PESQUISAR
              </button>
            </div>
          </form>
        </div>
        <div className='col-span-12 mt-5 grid grid-cols-3 gap-2 h-60'>
          <div className='flex justify-center items-center rounded-2xl shadow-2xl bg-amber-100 border-2 border-amber-100'>
            <div className='grid grid-rows-2 text-center gap-5 text-4xl'>
              <span>Satélites com forte cintilação</span>
              <span className='mt-6'>25</span>
            </div>
          </div>
          <div className='flex justify-center items-center rounded-2xl border-amber-100 border-2 shadow-2xl bg-amber-100'>
            Hello World
          </div>
          <div className='flex justify-center items-center rounded-2xl border-amber-100 border-2 shadow-2xl bg-amber-100'>
            Hello World
          </div>
        </div>
        <div className='col-span-12 row-span-14'>
          <div className='bg-[#847c74] shadow-2xl h-full w-full overflow-hidden flex justify-center items-center rounded-2xl border-[#847c74]'>
            {/*Gráfico geral do índice S4*/}
            {graphGeral.data != null ? (<ScatterGeral data={graphGeral.data} title={`Índice S4 de Todas Constelações - ${dateStart} a ${dateEnd}`} />)
              : (<p>Carregando gráfico ...</p>)
            }
          </div>
        </div>
      </div>

      {/*DIV DA AREA DOS DASHBOARDS*/}
      <div className='w-full h-full mt-3 rounded-2xl shadow-lg grid grid-cols-2 gap-4'>
        {/*Gráfico com a contagem de satélites com determinando intervalo do índice S4*/}
        <div className='shadow-md p-1 w-full h-full'>
          {/*Filtros do grafico countS4 */}
          <div className='pb-3 flex justify-center gap-3 bg-amber-100 p-2 rounded-t-2xl'>
            <div className='p-1 rounded-md flex justify-center gap-3 titles-css text-amber-50 shadow-2xl'>
              {/*Dropdown para a escala de tempo do grafico countS4 */}
              <label htmlFor="dropdownTimeScale" className='font-bold'>Escala de Tempo: </label>
              <select name="dropdownTimeScale" className='text-amber-200 appearance-none cursor-pointer hover:text-amber-400'>
                <option value="1 minuto">1 minuto</option>
                <option value="5 minutos">5 minutos</option>
                <option value="10 minutos">10 minutos</option>
                <option value="30 minutos">30 minutos</option>
                <option value="1 hora">1 hora</option>
                <option value="2 horas">2 horas</option>
                <option value="3 horas">3 horas</option>
                <option value="4 horas">4 horas</option>
              </select>
            </div>
            {/*conjunto de filtros para a elevacao */}
            <div className='border-2 p-1 rounded-md flex justify-center gap-3 titles-css text-amber-50'>
              <label htmlFor="" className='font-bold'>Elevação </label>
              <select name="dropdownElevationType" id="" className='text-amber-200 appearance-none cursor-pointer hover:text-amber-400'>
                <option value=""> maior que </option>
                <option value=""> menor que </option>
                <option value=""> igual a </option>
                <option value=""> maior ou igual a </option>
                <option value=""> menor ou igual a </option>
              </select>
              <input type="number" name="" id="" min={0} max={2} step={0.1} className='w-15 ' />
            </div>
            {/*Filtro da constelacao do grafico countS4 */}
            <div className='border-2 p-1 rounded-md flex justify-center gap-3 titles-css text-amber-50'>
              <label htmlFor="" className='font-bold'>Constelação: </label>
              <select name="dropdownElevationType" id="" className='text-amber-200 appearance-none cursor-pointer hover:text-amber-400'>
                <option value="">Todas</option>
                <option value="">GPS</option>
                <option value="">GLONASS</option>
                <option value="">GALILEO</option>
                <option value="">BEIDOU</option>
              </select>
            </div>
            <button type='submit' className='rounded-lg border border-amber-50 p-1 bg-[#e9d4ba] text-[#847c74] font-bold cursor-pointer hover:bg-[#a09489] hover:text-[#e9d4ba]'>
              FILTRAR
            </button>
          </div>
          <hr />
          <div className='rounded-b-2xl flex justify-center items-center overflow-hidden'>
            {graphCountS4.data != null ? (<CountS4Interval data={graphCountS4.data} title={`Quantidade de satélites com S4 entre 0.3 e 0.6 - ${dateStart} a ${dateEnd}`} />)
              : (<p>Carregando gráfico ...</p>)
            }
          </div>
        </div>
        <div className='border shadow-md p-1 w-full h-fit'>
          {/*Gráfico Skyplot teste*/}
          {graphSkyplot.data != null ? (<SkyplotConstellation data={graphSkyplot.data} titles={`Skyplot S4 - Date ${dateChoosed} - ${constellation}`} />)
            : (<p>Carregando gráfico ...</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
