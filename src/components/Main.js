require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

//get the datas of picture
//let imageDatas=require('../data/imageData.json');
let imageDatas=require('../data/imageData.json');//返回的是个obj，不是array of obj！！！！！！！！！！
//console.log("imageDatas::: " + imageDatas);
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
})(imageDatas);

//console.log(imageDatas);

//imageDatas=genImageURL(imageDatas);

/*
*获取区间内的一个随机值
*/
function getRangeRandom(low,high){
	return Math.ceil(Math.random()*(high-low)+low);
}

/*
*获取0到30度之间的任意正负值
*/
function get30DegRandom(){
	return (Math.random() > 0.5 ? '' : '-' + Math.ceil(Math.random()*30));
}

class ImgFigure extends React.Component{
	render(){

		let styleObj = {};

		//如果props属性中制订了这张图片的位置，则使用
		if(this.props.arrange.pos){
			styleObj=this.props.arrange.pos;
		}

		//如果图片的旋转角度有值，并且不为零，添加旋转角度
		if(this.props.arrange.rotate){
			(['MozTransform','msTransform','WebkitTransform','transform']).forEach(function(value){
				styleObj[value]='rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));
			
		}

		return (
			<figure className="img-figure" style={styleObj} ref ="figure">
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
					},
					rotate:0 //旋转角度
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

			imgsArrangeTopArr = [], //上侧区域图片的状态信息

			topImgNum = Math.ceil(Math.random() * 2), //取一个，或者不取

			topImgSpliceIndex = 0, //布局于上部的图片是从数组对象中的哪个拿出来的

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1); //居中图像的状态信息

			//首先居中centerIdex的图片
			imgsArrangeCenterArr[0].pos=centerPos;

			//居中的centerDindex的图片不需要旋转
			imgsArrangeCenterArr[0].rotate=0;

			//取出要布局上侧的图片的状态信息
			topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

			//console.log("vPosRange.topY::: "+vPosRange.topY);

			//布局位于上册的图片
			imgsArrangeTopArr.forEach(function(value, index){

				//console.log("vPosRangeTopY[0]::: "+vPosRangeTopY[0]);
				//console.log("vPosRangeTopY[1]::: "+vPosRangeTopY[1]);
				//console.log("vPosRangeX[0]::: "+vPosRangeX[0]);
				//console.log("vPosRangeX[1]::: "+vPosRangeX[1]);

				let valueOfLeft=getRangeRandom(vPosRangeX[0], vPosRangeX[1]);

				imgsArrangeTopArr[index] = {
					pos:{
						top:getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
						left:valueOfLeft
					},
					rotate:get30DegRandom
				};


				//console.log("valueOfLeft::: "+valueOfLeft);
				
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

				imgsArrangeArr[i]={
					pos:{
						top:getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
						left:getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
					},
					rotate: get30DegRandom()
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

		//console.log("stageDOM.scrollWidth,::: "+stageDOM.scrollWidth);


		//拿到一个imageFigure的大小!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!( imgFigureDOM 有问题！！！！！！！！)
		let imgFigureDOM = this.refs.imgFigure0.refs.figure; //必须ref到原生的html标签，不然会人做[obj Obj]

		//console.log("this.imgFigure0.refs.figure::: "+this.refs.imgFigure0.refs.figure);

		let	imgW=imgFigureDOM.scrollWidth,
			imgH=imgFigureDOM.scrollHeight,
			halfImgW=Math.ceil(imgW/2),
			halfImgH=Math.ceil(imgH/2);

		

		//计算中间部分，图片位置取值范围
		
		this.Constant.centerPos={
			left:halfStageW-halfImgW,
			top:halfStageH-halfImgH
		}

		//计算左右两侧，图片位置取值范围
		this.Constant.hPosRange.leftSecX[0]=-halfImgW;
		this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;
		this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
		this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
		this.Constant.hPosRange.y[0]=-halfImgH;
		this.Constant.hPosRange.y[1]=stageH-halfImgH;

		//计算上部图片位置取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;

		//console.log("this.Constant.vPosRange.topY::: "+this.Constant.vPosRange.topY);

		this.Constant.vPosRange.x[0] = halfStageW-imgW;
		this.Constant.vPosRange.x[1] = halfStageW;

		//console.log("this.Constant.vPosRange.x::: "+this.Constant.vPosRange.x);

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
				},
				rotate:0
			}
		}

		//console.log("index::: "+index);

		imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]}/>);
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
