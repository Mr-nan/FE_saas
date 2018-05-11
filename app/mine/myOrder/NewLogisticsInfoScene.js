/**
 * Created by zhengnan on 2018/5/8.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    NativeModules,
    Platform,
    Linking,
    TextInput,
    Animated,
    KeyboardAvoidingView,
    ListView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationBar from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';

import * as Net from '../../utils/RequestUtil';
import * as AppUrls from '../../constant/appUrls';

export default class NewLogisticsInfoScene extends BaseComponent{
    render(){
        return(
            <View style={styles.root}>
                <ScrollableTabView
                    style={styles.ScrollableTabView}
                    initialPage={this.props.page?this.props.page:0}
                    locked={true}
                    renderTabBar={this.renderTabBarView}>
                    <LogisticsInfoView carData={['1','2','3','4','5']}
                                       tabLabel="ios-paper1"/>
                    <LogisticsInfoView carData={[]}
                                       tabLabel="ios-paper2"/>
                    <LogisticsInfoView carData={['1','2','3']}
                                       tabLabel="ios-paper3"/>
                    <LogisticsInfoView carData={['1','2','3','4']}
                                       tabLabel="ios-paper4"/>
                </ScrollableTabView>
                <NavigationBar title="物流详情" backIconClick={this.backPage}/>
            </View>
        )
    }
    renderTabBarView =()=>{
        return(
            <RepaymenyTabBar ref={(ref)=>{this.tabBarView = ref}}
                             style={{backgroundColor:'white'}}
                             tabName={['全部','待发运','在途','已到达']}
                             subName={['5','0','3','4']}/>
        )
    }
}

class LogisticsInfoView extends BaseComponent{

    // 构造
      constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
        this.state = {
            dataSource:ds.cloneWithRows(this.props.carData)
        };
      }
    render(){
        return(
            <View style={{flex:1}}>
                <ListView
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          enableEmptySections={true}
                          renderSeparator={(sectionID,rowID)=>{return(<View key={`${sectionID}+${rowID}`} style={{backgroundColor:fontAndColor.COLORA3,height:Pixel.getPixel(10)}}/>)}} />
            </View>
        )
    }

    renderRow = (data)=>{
        return(
            <View style={{flex:1,paddingHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(17),flexDirection:'row',
                alignItems:'center',backgroundColor:'white',justifyContent:'space-between'
            }}>
                <View>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>2008款 雅阁2.0L 手动基本版</Text>
                    <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginVertical:Pixel.getPixel(10)}}>车架号：20170110022511111</Text>
                    <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>所在城市：北京 2017-09-08 12:12</Text>
                </View>
                <Image source={require('../../../images/financeImages/celljiantou.png')}/>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    root:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
    },
})