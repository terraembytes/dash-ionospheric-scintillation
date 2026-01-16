import Plot from 'react-plotly.js'
import type { DataGeral } from '../../models/DataGeral'

interface Props {
  data: DataGeralSkyplot[],
  title: string
}

interface DataGeralSkyplot extends DataGeral {
  Azimute: string
  Intensity: string
}

function SkyplotConstellation({ data = [], title }: Props) {
  return (
    <Plot
      data={[
        {
          mode: 'markers',
          type: 'scatterpolar',
          r: data.map(p => Number(p.Elevation)),
          theta: data.map(p => Number(p.Azimute)),
          marker: { 
            color: data.map(p => p.Intensity),
            size: 10
          }
        }
      ]}
      layout={{ 
        title: { text: title }, 
        autosize: true,
        polar: {
          domain: { y: [0, 0.9] },
          radialaxis: {
            range: [90, 0],
            tickvals: [90, 75, 60, 45, 30, 15, 0],
            ticktext: ['90°', '75°', '60°', '45°', '30°', '15°', '0°'],
            angle: 90,
            showline: true,
            dtick: 15,
            showticklabels: true,
            tickfont: { color: '#000000', size: 12 },
            gridcolor: '#e0e0e0',
            linecolor: '#000000'
          },
          angularaxis: {
            direction: "clockwise",
            rotation: 90,
            tickfont: { color: '#000000', size: 12 },
            gridcolor: '#e0e0e0',
            linecolor: '#000000'
          },
        },
      }}
      useResizeHandler={true}
      className="w-full h-full"
    />
  )
}

export default SkyplotConstellation