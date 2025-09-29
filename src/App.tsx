import './App.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import imglogo from './assets/img/logo.png'

//Função para buscar os dados gerais da API
async function getData(dateStart: string = '2025-01-01', dateEnd: string = '2025-01-01', station: string = 'CTAS') {
  const response = await axios.get(`http://127.0.0.1:8000/api/data/?start=${dateStart}&end=${dateEnd}&station=${station}`);

  return response.data;
}

function App() {
  //recebendo os dados da API, bem como status de load e error
  //usando queryKey para colocar um identificador na função getData
  const { data, isLoading, isError } = useQuery({ queryKey: ['all'], queryFn: getData })

  if(isLoading) return <h2>Carregando...</h2>
  if(isError) return <h2>Ocorreu um erro ao realizar a requisição!</h2>
  return (
    <div className='overflow-hidden'>
      {/*DIV DO HEADER*/}
      <div className='flex justify-between items-center p-2 titles-css text-amber-50 rounded-2xl shadow-lg'>
        <div><img src={imglogo} alt="logo do projeto" width={110} height={100}/></div>
        <div>Hello World</div>
        <div>Hello World</div>
      </div>

      {/*DIV DA AREA DOS DASHBOARDS*/}
      <div className='bg-gray-100 w-full h-screen mt-6 rounded-2xl p-2 shadow-lg grid grid-cols-2 gap-4'>
       <div className='border shadow-md p-1'>Gráfico 1</div>
       <div className='border shadow-md p-1'>Gráfico 2</div>
       <div className='border shadow-md p-1'>Gráfico 3</div>
       <div className='border shadow-md p-1'>Gráfico 4</div>
      </div>
    </div>
  )
}

export default App
