require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

//get the datas of picture
//let imageDatas=require('../data/imageData.json');
let imageDatas=require('../data/imageData.json');//返回的是个obj，不是array of obj！！！！！！！！！！
//**console.log("imageDatas:::::: " + imageDatas[0]);
//transform the fileName to imageURL with the self-run function
imageDatas=(function genImageURL(imageDatasArr){
	//**console.log("imageDatasArr:::::: "+imageDatasArr);
	for(let i=0, j = imageDatasArr.length; i<j; i++){
		var singleImageData = imageDatasArr[i];
		//**console.log("singleImageData:::::: " + singleImageData);
		singleImageData.imageURL=require('../images/'+singleImageData.fileName);
		//**console.log(singleImageData);
		imageDatasArr[i]=singleImageData;

	}
	
	return imageDatasArr;
})([
	{
		"fileName":"1.png",
		"title":"gj",
		"desc":"good job"
	},

	{
		"fileName":"2.png",
		"title":"smile",
		"desc":"hahaha"
	},

	{
		"fileName":"3.png",
		"title":"questionmark",
		"desc":"what are you doing?"
	}
]);

console.log(imageDatas);

//imageDatas=genImageURL(imageDatas);

class ImgFigure extends React.Component{
	render(){
		return (
			<figure className="img-figure">
				<img src={this.props.data.imageURL}
					alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

class AppComponent extends React.Component {
  render() {
	
	let controllerUnits=[], imgFigures=[];

	
	imageDatas.forEach(function(value){
		imgFigures.push(<ImgFigure key={value.fileName.toString()} data={value}/>);
	});
	


    return (
     <section className="stage">
     	<section className="img-sec">
     		{imgFigures}
     	</section>
	
     	<nav className="controller-nav">
			{controllerUnits}
     	</nav>
     </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
