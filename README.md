
# react-heat-map  
  
[![NPM](https://img.shields.io/npm/v/react-light-heatmap.svg)](https://www.npmjs.com/package/react-light-heatmap) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
  
A React component for heatmap in grid layout using `div`.  
  
![alt tag](https://github.com/elv1n/react-light-heatmap/raw/master/example/public/screenshot.png)  
  
## Installation  
  
```  
yarn add react-light-heatmap  
```  
  
or   
  
```  
npm install react-light-heatmap --save  
```  
  
  
## Usage  
  
**Mandatory fields**   

|Name |Type|Sample|
|---|---|---|
|`xLabels`|Array of string|`['1am', '2am', '3am']`|
|`yLabels`|Array of string|`['Sun', 'Mon']`|
|`data`|2D Array of numbers having `yLabels.length` rows and `xLabels.length` rows|`[[2,3,5][5,6,9]]`|
  
```javascript  
const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);  
const yLabels = ['Sun', 'Mon', 'Tue'];  
const data = new Array(yLabels.length)  
  .fill(0)  
  .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));  
  
ReactDOM.render(  
  <HeatMap  
    xLabels={xLabels}  
    yLabels={yLabels}  
    data={data}  
  />,  
  document.getElementById('app')  
);  
```  
  
  
**Configuration**  
  
|Name |Type|Description|Default Value|  
|---|---|---|---|  
|components|object|Replace default component|[default components](#replacing-components)
|background|string|The base color for the heatmap|`"#239a3b"`|  
|height|number|Height of each cell of the heatmap in px|`30`|  
|onClick|function|Adds an handler to cell click|`undefined`|  
|squares|boolean|If set to `true` will render cells as square|`false`|  
|xLabelWidth|number|Width of the x label area in pixel|`60`|    
|xLabelsLocation|string|Location of y labels. It can be top or bottom|`"top"`|  
|unit|string|Unit to display next to the value on hover||  
|cellStyle|function|To set custom cell style. It is useful for using own colour scheme||  
  
[Example](https://github.com/elv1n/react-light-heatmap/tree/master/example/src/App.js)
```javascript  
  
const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);  
  
const yLabels = ["Sun", "Mon", "Tue"];  
const data = new Array(yLabels.length)  
  .fill(0)  
  .map(() =>  
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))  
  );  
  
ReactDOM.render(  
  <HeatMap  
    xLabels={xLabels}  
    yLabels={yLabels}  
    xLabelWidth={50}  
    data={data}  
    squares  
    onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}  
    cellStyle={(background, value, min, max, data, x, y) => ({  
      background: `rgb(66, 86, 244, ${1 - (max - value) / (max - min)})`,  
      fontSize: "11px",  
    })}  
    cellRender={value => value && `${value}%`}  
  />,  
  document.getElementById("app")  
);  
```  

 ## Replacing components
 
 **Cell**
 Component responsible for displaing a cell in grid.
 Props:
 ```flow
 type = {
	 value: number,
	 x: number,
	 y: number,
	 height: number
 }
 ```
All other props will be passed to the div component

 **CellContent**
 Component responsible for displaing a content inside cell component.
 Props:
 ```flow
 type = {
	 value: number
 }
 ```
By default display nothing

 **XLabel**
 Component responsible for displaing X label
 Props:
 ```flow
 type = {
	 value: string|number,
	 squares: boolean,
	 index: number,
	 height: number
 }
 ```

Default render
```javascript
<div  
  style={{  
	  flex: squares ? 'none' : 1,  
	  textAlign: 'center',  
	  width: squares ? `${height + 1}px` : 'undefined',  
	  ...style  
  }}  
>  
 {value}  
</div>
```

 **YLabel**
 Component responsible for displaing Y label
 Props:
 ```flow
 type = {
	 value: string|number,
	 squares: boolean,
	 index: number,
	 height: number
 }
 ```

Default render
```javascript
<div  
  style={{  
	  textAlign: 'center',  
	  paddingRight: '5px',  
	  paddingTop: `${height / 3.7}px`,  
	  ...style  
  }} 
>  
 {value}  
</div>
```
## For developers  
  
**New build**  
```  
yarn build  
```  
  
**Run dev server**  
```  
yarn start
```  
  
**Run test**  
```  
npm run test  
```
