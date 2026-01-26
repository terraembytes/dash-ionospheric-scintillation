import Plot from 'react-plotly.js'
import type { DataGeral } from '../../models/DataGeral'
import { useMemo } from 'react'

interface Props {
  data: DataGeralSkyplot[],
  titles: string
}

interface DataGeralSkyplot extends DataGeral {
  Azimute: string
  Intensity: string
}

function SkyplotConstellation({ data = [], titles }: Props) {
  const textSvid = data.map(p => p.Svid.toString());

  // criando a trace segundaria para o grafico
  const secondTrace = useMemo(() => {
    // filtrando os pontos com valor S4 maior ou igual a 0.6
    const highS4Points = data.filter(d => Number(d.S4) >= 0.60)

    //converter para o cartesiano
    //Centro = 0 de raio visual (90 elevação)
    //Borda = 90 de raio visual (0 elevação)
    const cartesianPoints = highS4Points.map(p => {
      const r_visual = 90 - p.Elevation //quao longe o ponto esta do centro
      const theta_rad = (Number(p.Azimute) - 90) * (Math.PI /  180) //padrão 0 é leste

      return {
        ...p,
        x: r_visual * Math.cos(theta_rad),
        y: r_visual * Math.sin(theta_rad)
      }
    })

    // Threshold: Distância visual (em graus de elevação)
    const DISTANCE_THRESHOLD = 15

    const size = cartesianPoints.map((p1, _, arr) => {
      //conta quantos pontos p2 estão perto de p1
      const neighbors = arr.reduce((count, p2) => {
        const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + (Math.pow(p1.y - p2.y, 2)))
        return dist <= DISTANCE_THRESHOLD ? count + 1 : count
      }, 0)

      // Fórmula de tamanho: Base + (Fator * Vizinhos)
      return 15 + (neighbors * 5)
    })

    return {
      type: 'scatterpolar',
      mode: 'markers',
      r: highS4Points.map(d => d.Elevation), // Plotly usa a elevação original se o eixo estiver configurado corretamente
      theta: highS4Points.map(d => d.Azimute),
      marker: {
        size: size,
        color: 'rgba(255, 0, 0, 0.1)', // Vermelho com transparência
        line: {
          color: 'rgba(255, 0, 0, 0.6)',
          width: 1
        }
      },
      hoverinfo: 'none', // Remove hover desse trace pra não atrapalhar
      name: 'Área de Cintilação'
    } as Plotly.Data;
  }, [data])

  return (
    <Plot
      data={[
        {
          mode: 'markers',
          type: 'scatterpolar',
          r: data.map(p => Number(p.Elevation)),
          theta: data.map(p => Number(p.Azimute)),
          text: textSvid,
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
            size: 10,
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
        secondTrace
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