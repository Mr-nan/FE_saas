
import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Easing,
    Dimensions,
    Image,
    TouchableWithoutFeedback
} from 'react-native';


import ViewPager from 'react-native-viewpager';
const {width, height} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
var IMGS = [
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024'
];
export default class ViewPagers extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        const dataSource = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithPages(IMGS),
            numberss:0
        };
    }

    setPageNumber=(pageNumber)=>{
        console.log(pageNumber);
        let number = 0;
        if(pageNumber=="首页"){
             number = 0;
        }else if(pageNumber=="车源"){
             number = 1;
        }else{
             number = 2;
        }
        this.setState({ numberss: number });
        console.log(number);
    }

    render() {
        return (

            <ViewPager
                dataSource={this.state.dataSource}    //数据源（必须）
                renderPage={this._renderPage}         //page页面渲染方法（必须）
                isLoop={false}                        //是否可以循环
                autoPlay={true}                      //是否自动
                initialPage={this.state.numberss}       //指定初始页面的index
                locked={false}                        //为true时禁止滑动翻页
            />


        )
    }

    _renderPage = (data, pageID) => {

        return (
            <Image style={styles.postPosition}
                source={{uri: data}}
            />
        );

    }
}
const styles = StyleSheet.create({
    postPosition:{
        width:width,
        height: Pixel.getPixel(225),
    },
});