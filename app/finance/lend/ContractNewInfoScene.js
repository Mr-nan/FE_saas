/**
 * Created by zhengnan on 2018/5/4.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    Modal
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import ViewPager from 'react-native-viewpager';

export  default class ContractNewInfoScene extends BaseComponent{

    // 构造
      constructor(props) {
        super(props);
          let ds = new ViewPager.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
              dataSource:ds.cloneWithPages(this.props.data),
          };
      }

    render(){
        return(
            <View style={styles.root}>
                <ViewPager
                    dataSource={this.state.dataSource}    //数据源（必须）
                    renderPage={this.renderPage}         //page页面渲染方法（必须）
                    isLoop={false}                        //是否可以循环
                    autoPlay={false}                      //是否自动
                    initialPage={0}                       //指定初始页面的index
                    locked={false}                        //为true时禁止滑动翻页
                    renderPageIndicator={()=>{return(<View/>)}}
                />
                <NavigationView title={this.props.title} backIconClick={this.backPage}/>
            </View>
        )
    }

    renderPage =(data) => {

        let nowdate = Date.parse(new Date());

        return (
            <Image onLoadEnd={()=>{
                this.props.showModal(false);
            }} onLoadStart={()=>{
                this.props.showModal(true);
            }} style={{flex:1}} source={{uri: data+'?'+nowdate}}/>
        );

    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64)
    }
});