import './App.css'
import imglogo from './assets/img/logo.png'

function App() {

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
