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

//console.log(imageDatas);

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

	constructor(props){
		super(props);

		this.Constant={
			centerPos:{
				left:0,
				right:0
			},
			hPosRange:{ //水平方向的取值范围
				leftSecX:[0,0],
				rightSecX: [0.0],
				y:[0,0]
			},
			vPosRange:{//垂直方向的取值范围
				x:[0,0],
				topY:[0,0]
			}
		}
	}

	/*
	*重新布局所有图片
	*@param centerIndex 指定中心图片
	*/

	rearrange(centerIndex){

	}

	//组件加载以后，为每张图片计算器位置的范围
	componentDidMount(){
		//首先拿到舞台的大小
		//console.log("this.refs.stage::: "+this.refs.stage);
		let stageDOM = this.refs.stage,
		//console.log("stageDOM::: "+stageDOM);
			stageW=stageDOM.scrollWidth,
			stageH=stageDOM.scrollHeight,
			halfStageW=Math.ceil(stageW/2),
			halfStageH=Math.ceil(stageH/2);
		//拿到一个imageFigure的大小
		let imgFigureDOM = this.refs.imgFigure0,
			imgW=imgFigureDOM.scrollWidth,
			imgH=imgFigureDOM.scrollHeight,
			halfImgW=Math.ceil(imgW/2),
			halfImgH=Math.ceil(imgH/2);

		//计算中间部分，图片位置取值范围
		
		this.Constant.centerPos={
			left:halfStageW-halfImgW,
			top:halfStageH-halfImgH,
		}

		//计算左右两侧，图片位置取值范围
		this.Constant.hPosRange.leftSecX[0]=-halfImgW;
		this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;
		this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
		this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
		this.Constant.hPosRange.y[0]=-halfImgH;
		this.Constant.hPosRange.y[1]=stageH-halfImgH;

		//计算上部，图片位置取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
		this.Constant.vPosRange.x[0] = halfStageW-imgW;
		this.Constant.vPosRange.x[1] = halfImgW;



	}

  render() {
	
	let controllerUnits=[], imgFigures=[];

	
	imageDatas.forEach(function(value,index){
		imgFigures.push(<ImgFigure key={value.fileName.toString()} data={value} ref={'imgFigure'+index}/>);
	});
	


    return (
     <section className="stage" ref="stage">
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
