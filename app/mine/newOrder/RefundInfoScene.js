/**
 * Created by zhengnan on 2018/7/3.
 * 退款详情页面
 */


import  React, {Component} from  'react'
import  {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
    ScrollView,
} from  'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import CarInfoScene from "../../carSource/CarInfoScene";
import RefundCauseScene from "./RefundCauseScene";

/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class RefundInfoScene extends BaseComponent {

    render(){
        return(
            <View style={styles.root}>
                <RefundInfoHeadView/>
                <NavigatorView title={'退款详情'} backIconClick={this.backPage} renderRihtFootView={this.renderRihtFootView} wrapStyle={{backgroundColor:'transparent'}}/>
                <ScrollView>
                    <RefundInfoContentView/>
                    <RefundInfoCarView/>
                    <RefundInfoServeView/>
                </ScrollView>
                <FootButtonView refuseClick={this._refuseClick} confirmClick={this._confirmClick}/>
            </View>
        )
    }

    renderRihtFootView(){
        return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity style={{marginRight:Pixel.getPixel(15)}}>
                    <Image source={require('../../../images/neworder/dianhua.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../../images/neworder/kefu.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    _refuseClick=()=>{

    }

    _confirmClick=()=>{

        let navigatorParams = {
            name: "RefundCauseScene",
            component: RefundCauseScene,
            params: {
            }
        };
        this.toNextPage(navigatorParams);

    }

}

class FootButtonView extends Component{

    render(){
        return(
            <View style={{left:0,right:0,bottom:0,height:Pixel.getPixel(49), flexDirection:'row',position: 'absolute',}}>
                <TouchableOpacity style={{width:width*0.5,height:Pixel.getPixel(49),backgroundColor:fontAndColor.COLORA2,alignItems:'center',justifyContent:'center'}}
                                  onPress={this.props.refuseClick}>
                    <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30}}>拒绝退款</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:width*0.5,height:Pixel.getPixel(49),backgroundColor:fontAndColor.COLORB0,alignItems:'center',justifyContent:'center'}}
                                  onPress={this.props.confirmClick}>
                    <Text style={{color:'white', fontSize:fontAndColor.BUTTONFONT30}}>确定退款</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class RefundInfoHeadView extends Component{

    // 构造
      constructor(props) {
        super(props);

        this.data=[{title:'发起退款',date:'18.12.12\n11.30'},{title:'卖家拒绝',date:'18.12.14\n13.30'},{title:'平台审核',date:'18.12.14\n13.30'},{title:'平台介入',date:'18.12.20\n19.00'},{title:'退款成功',date:'18.12.21\n19.22'}]
      }
    render(){
        return(
            <View style={{position: 'absolute',left:0,right:0,top:0,height:width*0.61}}>
                <Image style={{flex:1,paddingTop:Pixel.getTitlePixel(64), alignItems:'center'}}
                       source={require('../../../images/neworder/bj.png')}>
                 <View style={{width:width,marginTop:Pixel.getPixel(20), flexDirection:'row',}}>
                     {
                        this.data.map((data,index)=>{
                            let itemWidth = (width)/Pixel.getPixel(this.data.length);
                            let lienWidth = itemWidth/2 - Pixel.getPixel(10);
                            let myOpacity = ((index+1)/(this.data.length));
                            let mySubOpacity = ((index)/(this.data.length));
                           return(
                               <View key={index}>
                               <View style={{alignItems:'center',justifyContent:'space-between',height:Pixel.getPixel(80),width:itemWidth}} >
                                       <View style={[{borderRadius:Pixel.getPixel(4),backgroundColor:'transparent',paddingHorizontal:Pixel.getPixel(5),height:Pixel.getPixel(20),
                                           justifyContent:'center'
                                       },index+1==this.data.length && {backgroundColor:'white'}]}>
                                               <Text style={[{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),backgroundColor:'transparent'},index+1==this.data.length && {color:fontAndColor.COLORB12,
                                                   fontWeight:'bold'
                                               }]}>{data.title}</Text>
                                       </View>
                                   {
                                       index+1==this.data.length?(<Image source={require('../../../images/neworder/dangqianzhuangtai.png')}/>):( <View style={{borderRadius:Pixel.getPixel(5),width:Pixel.getPixel(10),height:Pixel.getPixel(10),backgroundColor:'white'}} opacity={myOpacity}/>)
                                   }
                                       <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),textAlign:'center',backgroundColor:'transparent'}}>{data.date}</Text>
                               </View>
                                   {
                                       index!=this.data.length-1 && (<View style={{position:'absolute',height:Pixel.getPixel(2),width:lienWidth,
                                           left:itemWidth/2+ Pixel.getPixel(10),top:(Pixel.getPixel(80)/2-Pixel.getPixel(6)),backgroundColor:'white'
                                       }}  opacity={myOpacity}/>)
                                   }
                                   {
                                       index>0&& (<View style={[{position:'absolute',height:Pixel.getPixel(2),width:lienWidth,
                                           left:0,top:(Pixel.getPixel(80)/2-Pixel.getPixel(6)),backgroundColor:'white'
                                       },index+1==this.data.length && {width:lienWidth-Pixel.getPixel(5)}]} opacity={mySubOpacity}/>)
                                   }


                               </View>
                           )
                        })
                     }
                 </View>
                </Image>
            </View>

        )
    }
}
class RefundInfoContentView extends Component{
    render(){
        return(
            <View style={{width:width,backgroundColor:'white'}}>
                <View style={{height:Pixel.getPixel(44), justifyContent:'center',paddingLeft:Pixel.getPixel(15),borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:fontAndColor.COLORA4}}>
                    <Text style={styles.titleText}>退款信息</Text>
                </View>
                <View style={{marginHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(20), flexDirection:'row',justifyContent:'space-between',borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:fontAndColor.COLORA4}}>
                    <View>
                        <Text style={styles.titleText}>订金金额</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:Pixel.getPixel(10)}}>
                            <Text style={styles.priceText}>26.80</Text>
                            <Text style={styles.priceUnitText}>万元</Text>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.titleText}>尾款金额</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:Pixel.getPixel(10)}}>
                            <Text style={styles.priceText}>19.80</Text>
                            <Text style={styles.priceUnitText}>万元</Text>
                        </View>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                        <Text style={styles.titleText}>运费</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:Pixel.getPixel(10)}}>
                            <Text style={styles.priceText}>2000</Text>
                            <Text style={styles.priceUnitText}>元</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(20), flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}>
                    <Text style={[styles.titleText,{fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}]}>退款金额合计</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={[styles.priceText,{color:fontAndColor.COLORB2}]}>2000</Text>
                        <Text style={[styles.priceUnitText,{color:fontAndColor.COLORB2}]}>元</Text>
                    </View>
                </View>
            </View>
        )
    }
}
class RefundInfoCarView extends Component{

    // 构造
      constructor(props) {
        super(props);
       this.data=['',''];
      }
    render(){
        return(
            <View style={{width:width,backgroundColor:'white',marginTop:Pixel.getPixel(10)}}>
                <View style={{height:Pixel.getPixel(44), justifyContent:'center',paddingLeft:Pixel.getPixel(15),borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:fontAndColor.COLORA4}}>
                    <Text style={styles.titleText}>商品信息</Text>
                </View>
                <View style={{marginHorizontal:Pixel.getPixel(15),paddingTop:Pixel.getPixel(20),paddingBottom:Pixel.getPixel(10),justifyContent:'space-between',borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:fontAndColor.COLORA4}}>
                    {
                        this.data.map((data,index)=>{
                            return(
                                <View key={index} style={{marginBottom:Pixel.getPixel(10)}}>
                                    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                                        <Text style={styles.titleText}>2008款雅阁</Text>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <Text style={{fontSize:fontAndColor.MARKFONT9,color:fontAndColor.COLORA0}}>x</Text>
                                            <Text style={{fontSize:fontAndColor.CONTENTFONT24,color:fontAndColor.COLORA0}}>23</Text>
                                        </View>
                                    </View>
                                    <Text style={{marginTop:Pixel.getPixel(5),color:fontAndColor.COLORA1, fontSize:fontAndColor.MARKFONT22}}>黑色/北京</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={{justifyContent:'center', alignItems:'center',
                    paddingVertical:Pixel.getPixel(16),
                    borderBottomWidth:StyleSheet.hairlineWidth,
                    borderBottomColor:fontAndColor.COLORA4,
                    marginHorizontal:Pixel.getPixel(15),flexDirection:'row'}}>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT26, marginRight:Pixel.getPixel(10)}}>查看全部</Text>
                    <Image source={require('../../../images/neworder/shang.png')}/>
                </View>
                <View style={{marginHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(16),alignItems:'flex-end'}}>
                    <View style={{flexDirection:'row',marginBottom:Pixel.getPixel(10), alignItems:'center'}}>
                        <Text style={styles.titleText}>订金合计:  </Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.priceText}>2000</Text>
                            <Text style={styles.priceUnitText}>元</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.titleText}>成交价合计:  </Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.priceText}>2000</Text>
                            <Text style={styles.priceUnitText}>元</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
class RefundInfoServeView extends Component{

      constructor(props) {
        super(props);
        this.data=[{title:'服务单号', value:'2018071000012'},{title:'订单编号', value:'xx120099'},
            {title:'创建日期', value:'20180-07-10 02：00：12'},{title:'退款原因', value:'老子不想买了'}];
      }
    render(){
        return(
            <View style={{width:width,backgroundColor:'white',marginTop:Pixel.getPixel(10)}}>
                <View style={{height:Pixel.getPixel(44), justifyContent:'center',paddingLeft:Pixel.getPixel(15),
                    borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:fontAndColor.COLORA4}}>
                    <Text style={styles.titleText}>服务信息</Text>
                </View>
                <View style={{paddingHorizontal:Pixel.getPixel(15),paddingTop:Pixel.getPixel(15),paddingBottom:Pixel.getPixel(20)}}>
                    {
                        this.data.map((data,index)=>{
                            return(
                                <View key={index}>
                                    <View style={{marginTop:Pixel.getPixel(15), flexDirection:'row',alignItems:'center',
                                        justifyContent:'space-between'}}>
                                        <Text style={{color:fontAndColor.COLORA1, fontSize:fontAndColor.LITTLEFONT28}}>{data.title}</Text>
                                        <Text style={{color:fontAndColor.COLORA0, fontSize:fontAndColor.LITTLEFONT28}}>{data.value}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:width*0.61-Pixel.getPixel(20),
        paddingBottom:Pixel.getPixel(49)
    },
    titleText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)
    },
    priceText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
    },
    priceUnitText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)
    }
})