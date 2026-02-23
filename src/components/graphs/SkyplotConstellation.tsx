import Plot from 'react-plotly.js'
import type { DataSkyplot } from '../../models/DataSkyplot'

interface SkyplotS4Size extends DataSkyplot{
  sizePlot: string
}

interface Props {
  data: SkyplotS4Size[],
  titles: string
}

function SkyplotConstellation({ data = [], titles }: Props) {
  return (
    <Plot
      data={[
        {
          mode: 'markers',
          type: 'scatterpolar',
          r: data.map(p => Number(p.Elevation)),
          theta: data.map(p => Number(p.Azimute)),
          //text: textSvid,
          textposition: 'middle left',
          textfont: { size: 11, color: '#000000' },
          cliponaxis: false,
          name: 'Satélites',
          hovertemplate:
          'SVID: %{text}<br>' +
          'Elev: %{r:.1f}°<br>' +
          'Azimute: %{theta:.1f}°<br>' +
          'S4: %{marker.color:.3f}<br>',
          marker: { 
            color: data.map(p => p.S4),
            opacity: data.map(p => Number(p.S4)),
            size: data.map(p => Number(p.sizePlot)),
            colorscale: 'Jet',
            cmin: 0,
            cmax: 1.2,
            colorbar: {
              title: {text:'S₄(L1)'},
              tickvals: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2],
              ticktext: ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0', '1.2'],
              x: 1
            }
            //line: { width: 1, color: '#ffffff' }
          }
        },
      ]}
      layout={{ 
        title: { text: titles }, 
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
        showlegend: false
      }}
      config={{
        displayModeBar: true,
      }}
      useResizeHandler={true}
      className="w-full h-full"
    />
  )
}

export default SkyplotConstellation