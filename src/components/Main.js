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
	},
	{
		"fileName":"4.png",
		"title":"gj",
		"desc":"good job"
	},

	{
		"fileName":"5.png",
		"title":"smile",
		"desc":"hahaha"
	},

	{
		"fileName":"6.png",
		"title":"questionmark",
		"desc":"what are you doing?"
	},
	{
		"fileName":"7.png",
		"title":"gj",
		"desc":"good job"
	},

	{
		"fileName":"8.png",
		"title":"smile",
		"desc":"hahaha"
	},

	{
		"fileName":"9.png",
		"title":"questionmark",
		"desc":"what are you doing?"
	},

]);

//console.log(imageDatas);

//imageDatas=genImageURL(imageDatas);

/*
*获取区间内的一个随机值
*/
function getRangeRandom(low,high){
	return Math.ceil(Math.random()*(high-low)+low);
}

class ImgFigure extends React.Component{
	render(){

		let styleObj = {};

		//如果props属性中制订了这张图片的位置，则使用
		if(this.props.arrange.pos){
			styleObj=this.props.arrange.pos;
		}

		return (
			<figure className="img-figure" style={styleObj}>
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

		this.state={
			imgsArrangeArr:[
				/*{
					pos:{
						left:'0',
						top:'0'
					}
				}*/
			]
		};

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
		let imgsArrangeArr=this.state.imgsArrangeArr,
			Constant=this.Constant,
			centerPos=Constant.centerPos,
			hPosRange=Constant.hPosRange,
			vPosRange=Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hposRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY=vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [], //上册区域图片的状态信息

			topImgNum = Math.ceil(Math.random() * 2), //取一个，或者不取

			topImgSpliceIndex = 0, //布局于上部的图片是从数组对象中的哪个拿出来的

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1); //居中图像的状态信息

			//首先居中centerIdex的图片
			imgsArrangeCenterArr[0].pos=centerPos;

			//取出要布局上侧的图片的状态信息
			topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

			//布局位于上册的图片
			imgsArrangeTopArr.forEach(function(value, index){
				
				imgsArrangeTopArr[index].pos={
					top:getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]), 
					left:getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				}
				
			});

			//布局左右两侧的图片
			for(let i=0, j=imgsArrangeArr.length, k=j/2; i<j; i++){
				let hPosRangeLORX=null;
				//前半部分布局在左边，右半部分布局右边
				if(i<k){
					hPosRangeLORX=hPosRangeLeftSecX;
				}else{
					hPosRangeLORX=hposRangeRightSecX;
				}

				imgsArrangeArr[i].pos={
					top:getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left:getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])

				}
			}

			//填充回上部区域图片的新信息
			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
			}

			imgsArrangeArr.splice(centerIndex,0, imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});

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
		this.Constant.vPosRange.x[1] = halfStageW;

		this.rearrange(0);

	}

  render() {
	
	let controllerUnits=[], imgFigures=[];

	
	imageDatas.forEach(function(value,index){

		if(!this.state.imgsArrangeArr[index]){
			this.state.imgsArrangeArr[index]={
				pos:{
					left:0,
					top:0
				}
			}
		}

		imgFigures.push(<ImgFigure key={value.fileName.toString()} data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]}/>);
	}.bind(this));
	


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
