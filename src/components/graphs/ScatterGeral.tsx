import Plot from 'react-plotly.js'
import type { DataGeral } from '../../models/DataGeral'

interface Props {
    data: [],
    title: string
}

function ScatterGeral({data, title} : Props) {
    return(
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
                  layout={ {title: {text: title}, autosize: true} }
                  useResizeHandler={true}
                  className="w-full h-full"
                />
    )
}

export default ScatterGeral