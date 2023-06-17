import React from "react"
import SvgPlot from "@components/atoms/SvgPlot.jsx"
const GeneratedDocument = ({userData})=>{
	function format(date){
		const dateobj = new Date(date)
		return (
			(dateobj.getDate()<10?"0"+dateobj.getDate():dateobj.getDate())
			+"/"+
			(dateobj.getMonth()+1<10?"0"+(dateobj.getMonth()+1):dateobj.getMonth()+1)
			+"/"+
			dateobj.getFullYear()
		)+" "+dateobj.toTimeString()
	}
	return (
		<html>
		<head>
			<title></title>
		</head>
		<style type="text/css">{`
			body{
				font-family: sans-serif;
			}
			td,th{
				min-width:30vw;
				min-height: 10vh;
				text-align: center;
				padding: 0.2em;
			}
			th {
				font-size:1.3em;
			}
			tr{
				border-radius:0.3em;
			}
			thead {
				background-color:#8b8;
			}
			tr.even{
				background-color:#8e8;
			}
			tr.odd{
				background-color:#8a8;
			}
		`}</style>
		<body>
		<h1>Pathologies suivies</h1>
		{
			userData.pathologies.map(patho=>{
				return (<div>
					<h3>{patho.name}</h3>
				</div>)
			})
		}
		
		<h1>Symptomes suivis</h1>
		{
			userData.symptoms.map((spt,i)=>{
				return(
					<h3>{spt.name}</h3>
				)
			})
		}
		{
			userData.symptoms.map(spt=>{
				return (
					<div align="center">
						<h2>{spt.name}</h2>
						<h3>Evaluations du symptome</h3>
						<table>
							<thead>
								<th>Date</th>
								<th>Valeur</th>
							</thead>
							<tbody>{
							spt.data.map(el=>el).sort((a,b)=>{
								return a.date-b.date
							}).map((data,i)=>{
								return(
									<tr class={i%2?"odd":"even"}>
									<td>{format(data.date)}</td>
									<td>{data.value}</td>
									</tr>
								)
							})
							}</tbody>
						</table>
						<h3>Evolution dans le temps</h3>
						{SvgPlot({
							data:spt.data
						})}
					</div>
				)
			})
		}
		</body>
		</html>
	)
}

export default GeneratedDocument