import React from "react"
const SvgPlot = (object)=>{
	const {
		data
	}=object
	const Xmin = 33
	const Ymin = 277
	const Xmax = 601
	const Ymax = 53
	function fromString(s) {
		if(s.includes("T"))return new Date(s);
		const [jour,mois,annee] = s.split(" ")[0].split("/")
		const [heure,minute] = s.split(" ")[1].split(":")
		return new Date(annee,mois-1,jour,heure,minute)
	}
	function toString(date){
		const dateobj = new Date(date)
		return (
			(dateobj.getDate()<10?"0"+dateobj.getDate():dateobj.getDate())
			+"/"+
			(dateobj.getMonth()+1<10?"0"+(dateobj.getMonth()+1):dateobj.getMonth()+1)
			+"/"+
			dateobj.getFullYear()
			+" "+
			(dateobj.getHours()<10?"0"+dateobj.getHours():dateobj.getHours())
			+"h"+
			(dateobj.getMinutes()<10?"0"+dateobj.getMinutes():dateobj.getMinutes())
		)
	}
	const datalist = data.map(el=>({
		value: parseFloat(el.valeur),
		date: fromString(el.date).getTime(),
	})).sort((a,b)=>{
		return a.date-b.date
	})
	const valMin = datalist.length?(
		datalist.map(el=>el.value).sort((a,b)=>a-b)[0]
	):(0)
	const valMax = datalist.length>1?(
		datalist.map(el=>el.value).sort((a,b)=>b-a)[0]
	):(valMin+11)
	const dateMin = datalist.length?(
		datalist[0].date
	):(Date.now()-2*24*3600*1000)
	const dateMax = datalist.length>1?(
		datalist[datalist.length-1].date
	):(dateMin+24*3600*1000)

	const labelsX = new Array(6).fill()
	labelsX.forEach((el,i)=>{
		const totaltime = dateMax-dateMin
		const date = dateMin+totaltime*i/6
		labelsX[i] = toString(new Date(date)).split(" ")[0]
	})
	const labelsY = new Array(6).fill()
	labelsY.forEach((el,i)=>{
		const total = valMax-valMin
		const value = valMin+(i/6)*total
		labelsY[i] = (Math.round(1000*value)/1000).toPrecision(4)
	})

	const dots = datalist.map(el=>{
		return [
			(Xmin)+(Xmax-Xmin)*(el.date-dateMin)/(dateMax-dateMin),
			(Ymax)-(Ymax-Ymin)*(el.value-valMin)/(valMax-valMin)
		]
	})
	return (
	<svg version="1.1" class="highcharts-root" style="font-family: sans-serif; font-size: 12px;" xmlns="http://www.w3.org/2000/svg" width="650" height="400" viewBox="0 0 650 400" aria-label="Interactive chart" aria-hidden="false">
	<desc aria-hidden="true">Created with Highcharts 10.3.1</desc>
	<defs aria-hidden="true">
		<clipPath id="highcharts-u5zur8b-20-">
			<rect x="0" y="0" width="596" height="279" fill="none"></rect>
		</clipPath>
		<clipPath id="highcharts-u5zur8b-27-">
			<rect x="0" y="0" width="596" height="279" fill="none"></rect>
		</clipPath>
	</defs>
	<rect fill="#ffffff" class="highcharts-background" x="0" y="0" width="650" height="400" rx="0" ry="0" aria-hidden="true"></rect>
	<rect fill="none" class="highcharts-plot-background" x="44" y="47" width="596" height="279" aria-hidden="true"></rect>
	<g class="highcharts-grid highcharts-xaxis-grid" data-z-index="1" aria-hidden="true">
		<path fill="none" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 142.5 47 L 142.5 326" opacity="1"></path>
		<path fill="none" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 242.5 47 L 242.5 326" opacity="1"></path>
		<path fill="none" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 341.5 47 L 341.5 326" opacity="1"></path>
		<path fill="none" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 440.5 47 L 440.5 326" opacity="1"></path>
		<path fill="none" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 540.5 47 L 540.5 326" opacity="1"></path>
		<path fill="none" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 639.5 47 L 639.5 326" opacity="1"></path>
		<path fill="none" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 43.5 47 L 43.5 326" opacity="1"></path>
	</g>
	<g class="highcharts-grid highcharts-yaxis-grid" data-z-index="1" aria-hidden="true">
		<path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 44 326.5 L 640 326.5" opacity="1"></path>
		<path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 44 270.5 L 640 270.5" opacity="1"></path>
		<path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 44 214.5 L 640 214.5" opacity="1"></path>
		<path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 44 159.5 L 640 159.5" opacity="1"></path>
		<path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 44 103.5 L 640 103.5" opacity="1"></path>
		<path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" class="highcharts-grid-line" d="M 44 46.5 L 640 46.5" opacity="1"></path>
	</g>
	<rect fill="none" class="highcharts-plot-border" data-z-index="1" x="44" y="47" width="596" height="279" aria-hidden="true"></rect>
	<g class="highcharts-axis highcharts-xaxis" data-z-index="2" aria-hidden="true">
		<path fill="none" class="highcharts-axis-line" stroke="#ccd6eb" stroke-width="1" data-z-index="7" d="M 44 326.5 L 640 326.5"></path>
	</g>
	<g class="highcharts-markers highcharts-series-0 highcharts-spline-series" data-z-index="0.1" opacity="1" transform="translate(44,47) scale(1 1)" clip-path="none" aria-hidden="false" role="region" tabindex="-1" style="outline: none;" aria-label="Item 1, line 1 of 2 with 6 data points.">
	{dots.map(dot=>{
		return <circle
			fill="#6f58e9"
			cx={dot[0]}
			cy={dot[1]}
			r="3">
			</circle>
	})}
	</g>
<text x="325" text-anchor="middle" class="highcharts-title" data-z-index="4" style="color: rgb(51, 51, 51); font-size: 18px; fill: rgb(51, 51, 51);" y="24" aria-hidden="true"></text>
<text x="325" text-anchor="middle" class="highcharts-subtitle" data-z-index="4" style="color: rgb(102, 102, 102); fill: rgb(102, 102, 102);" y="46" aria-hidden="true"></text><text x="10" text-anchor="start" class="highcharts-caption" data-z-index="4" style="color: rgb(102, 102, 102); fill: rgb(102, 102, 102);" y="397" aria-hidden="true"></text><g class="highcharts-legend highcharts-no-tooltip" data-z-index="7" transform="translate(250,359)" aria-hidden="true"><rect fill="none" class="highcharts-legend-box" rx="0" ry="0" x="0" y="0" width="150" height="26"></rect>
</g><g class="highcharts-axis-labels highcharts-xaxis-labels" data-z-index="7" aria-hidden="true">
<text x="93.66666666666333" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="middle" transform="translate(0,0)" y="345"
opacity="1">{labelsX[0]}</text>
<text x="193.00000000000335" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="middle" transform="translate(0,0)" y="345"
opacity="1">{labelsX[1]}</text>
<text x="292.3333333333333" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="middle" transform="translate(0,0)" y="345"
opacity="1">{labelsX[2]}</text>
<text x="391.66666666667334" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="middle" transform="translate(0,0)" y="345"
opacity="1">{labelsX[3]}</text>
<text x="491.00000000000335" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="middle" transform="translate(0,0)" y="345"
opacity="1">{labelsX[4]}</text>
<text x="590.3333333333334" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="middle" transform="translate(0,0)" y="345"
opacity="1">{labelsX[5]}</text></g><g class="highcharts-axis-labels highcharts-yaxis-labels" data-z-index="7" aria-hidden="true">
<text x="33" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="end" transform="translate(0,0)" y="331"
opacity="1">{labelsY[0]}</text>
<text x="33" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="end" transform="translate(0,0)" y="275"
opacity="1">{labelsY[1]}</text>
<text x="33" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="end" transform="translate(0,0)" y="219"
opacity="1">{labelsY[2]}</text>
<text x="33" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="end" transform="translate(0,0)" y="163"
opacity="1">{labelsY[3]}</text>
<text x="33" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="end" transform="translate(0,0)" y="107"
opacity="1">{labelsY[4]}</text>
<text x="33" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" text-anchor="end" transform="translate(0,0)" y="52"
opacity="1">{labelsY[5]}</text></g>
<text x="640" class="highcharts-credits" text-anchor="end" data-z-index="8" style="cursor: pointer; color: rgb(153, 153, 153); font-size: 9px; fill: rgb(153, 153, 153);" y="395" aria-label="Chart credits: Highcharts.com" aria-hidden="false">Highcharts.com</text>
</svg>
)}

export default SvgPlot