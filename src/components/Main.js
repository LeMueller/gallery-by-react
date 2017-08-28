require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

//get the datas of picture
let imageDatas=require('../data/imageData.json');
//transform the fileName to imageURL with the self-run function
imageDatas=(function genImageURL(imageDatasArr){
	for(let i=0, j= imageDatasArr.length; i<j; i++){
		var singleImageData = imageDatasArr[i];
		//alert(singleImageData);
		singleImageData.imageURL=require('../images/'+singleImageData.fileName);
		//console.log(singleImageData);
		imageDatasArr[i]=singleImageData;

	}
	//console.log(imageDatasArr)
	return imageDatasArr;
})(imageDatas);

//imageDatas=genImageURL(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
    /**
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <span>Hello</span>
      </div>
     **/
     <section className="stage">
     	<section className="img-sec">

     	</section>

     	<nav className="controller-nav">

     	</nav>
     </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
