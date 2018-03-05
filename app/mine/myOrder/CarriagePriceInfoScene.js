/**
 * Created by zhengnan on 2018/3/5.
 */

import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native'

const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import NavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';

let priceData=[{title:'运价',value:'300'},{title:'保险费',value:'300'},{title:'运价',value:'300'},{title:'运价',value:'300'},{title:'运价',value:'300'},{title:'总价',value:'300'}];

export  default class CarriagePriceInfoScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态

    }
    render() {
        return(
            <View style={styles.root}>
                <ScrollView onScroll={this.onScroll}>
                    <Image style={styles.headImage}>
                        <Text style={styles.headTitle}>2013款 帝豪EC7 1.5L 手动型</Text>
                        <View style={styles.headContentView}>
                            <View style={styles.headSubView}>
                                <Text style={styles.headSubTitleText}>单价:</Text>
                                <Text style={styles.headSubNumberText}>20万</Text>
                            </View>
                            <Image style={{width:Pixel.getPixel(1)}} source={require('../../../images/carriagePriceImage/line.png')}/>
                            <View style={styles.headSubView}>
                                <Text style={styles.headSubTitleText}>台数:</Text>
                                <Text style={styles.headSubNumberText}>2台</Text>
                            </View>
                        </View>
                    </Image>
                    <CarriagePriceInfoItemView type={1} select={1} text1={'始发地'} text2="山西省太原市和平区" value1="一车上门取车" value2="自己送车到店"/>
                    <CarriagePriceInfoItemView type={2} select={2} text1={'到达地'} text2="河南省焦作市宁远区" value1="自己到网店提车" value2="一车送车到户"/>
                    <CarriagePriceInfoListView data={priceData}/>
                </ScrollView>
                <NavigationView ref={(ref)=>this.navigationView=ref} title='运价查询' backIconClick={this.backPage} wrapStyle={{backgroundColor:'transparent'}}/>
            </View>
        )
    }

    onScroll =(event)=> {

        console.log(event.nativeEvent.contentOffset.y)
        if (event.nativeEvent.contentOffset.y > 0) {

            this.navigationView.setNavigationBackgroindColor(fontAndColor.COLORB0);

        } else {
            this.navigationView.setNavigationBackgroindColor('transparent');
        }
    }

}


class CarriagePriceInfoItemView extends Component{
    render(){
        const {type,select,text1,text2,value1,value2} = this.props;
        return(
            <View style={styles.carriagePriceInfoItemView}>
                <View style={styles.carriagePriceInfoLeftItem}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={type==1?require('../../../images/carriagePriceImage/startLocation.png') : require('../../../images/carriagePriceImage/stopLocation.png')} style={{marginRight:Pixel.getPixel(5.5)}}/>
                        <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),color:fontAndColor.COLORA0}}>{text1}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center',marginTop:Pixel.getPixel(12.5)}}>
                        <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA0}}>{text2}</Text>
                    </View>
                </View>
                <View style={styles.carriagePriceInfoRightItem}>
                    <View style={{flexDirection:'row', alignItems:'center',marginBottom:Pixel.getPixel(20.5)}}>
                        <Image style={{marginRight:Pixel.getPixel(17)}} source={select==1? require('../../../images/carriagePriceImage/select@2x.png'):require('../../../images/carriagePriceImage/noSelect.png')}/>
                        <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:select==1? fontAndColor.COLORA0:fontAndColor.COLORA1}}>{value1}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center',marginTop:Pixel.getPixel(5)}}>
                        <Image style={{marginRight:Pixel.getPixel(17)}} source={select==2? require('../../../images/carriagePriceImage/select@2x.png'):require('../../../images/carriagePriceImage/noSelect.png')}/>
                        <Text style={{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),color:select==2? fontAndColor.COLORA0:fontAndColor.COLORA1}}>{value2}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class CarriagePriceInfoListView extends Component{
    render(){
        return(
            <View style={styles.carriagePriceInfoListView}>
                <View style={{flex:1,borderBottomColor:fontAndColor.COLORA3,borderBottomWidth:Pixel.getPixel(1),paddingBottom:Pixel.getPixel(11),marginBottom:Pixel.getPixel(7)}}>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)}}>运费详单</Text>
                </View>
                {
                    this.props.data.map((data, index) => {
                        return (
                            <View style={{marginTop:Pixel.getPixel(14.5), flexDirection:'row', alignItems:'center',justifyContent:'space-between'}} key={index}>
                                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),color:data.title=='总价'? fontAndColor.COLORA0:fontAndColor.COLORA1}}>{data.title}</Text>
                                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),color:data.title=='总价'? fontAndColor.COLORB2:fontAndColor.COLORA1}}>{data.value}元</Text>
                            </View>)
                    })
                }
            </View>
        )
    }
}



const styles = StyleSheet.create({

    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3
    },
    headImage:{
        paddingTop:Pixel.getTitlePixel(64),
        width:width,
        height:Pixel.getPixel(149),
        backgroundColor:fontAndColor.COLORB2,
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:Pixel.getPixel(8.5),
        marginBottom:Pixel.getPixel(6.5)
    },
    headTitle:{
        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        marginTop:Pixel.getPixel(10)
    },
    headContentView:{
        flexDirection:'row',
        width:width,
        height:Pixel.getPixel(30),
        alignItems:'center',
        justifyContent:'space-between',
        // backgroundColor:'yellow'
    },
    headSubView:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        height:Pixel.getPixel(40),
        width:width/2-Pixel.getPixel(1),
    },
    headSubTitleText:{
        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    headSubNumberText:{
        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        fontWeight:'bold'
    },
    carriagePriceInfoItemView:{
        width:width,
        height:Pixel.getPixel(99),
        backgroundColor:'white',
        padding:Pixel.getPixel(15),
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:Pixel.getPixel(8),
    },
    carriagePriceInfoLeftItem:{
        justifyContent:'center',
        width:width *0.55
    },
    carriagePriceInfoRightItem:{
        justifyContent:'center',
        width:width *0.45
    },
    carriagePriceInfoListView:{
        backgroundColor:'white',
        paddingHorizontal:Pixel.getPixel(15),
        paddingTop:Pixel.getPixel(15.5),
        paddingBottom:Pixel.getPixel(12.5)
    }

})