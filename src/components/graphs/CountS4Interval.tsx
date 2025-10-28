import Plot from 'react-plotly.js'
import type { DataCount } from '../../models/DataCount'

interface Props {
    data: [],
    title: string
}

function CountS4Interval({data, title}: Props) {
    return (
        <Plot
            data={[
                {
                    x: data.map((dados: DataCount) => { return dados.Date }),
                    y: data.map((dados: DataCount) => { return dados.Quantidade }),
                    mode: 'markers',
                    type: 'scatter',
                    marker: { color: data.map((dados: DataCount) => { return dados.Quantidade }) }
                }
            ]}
            layout={{ title: { text: title }, autosize: true }}
            useResizeHandler={true}
            className="w-full h-full"
        />
    )
}

export default CountS4Interval