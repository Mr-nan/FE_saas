/**
 * Created by zhengnan on 2018/1/26.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    Dimensions
} from 'react-native';
import *as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil';
import * as AppUrls         from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import BaseComponent from "../component/BaseComponent";
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;

export  default  class CarShoppingScene extends BaseComponent{

    render(){
        return(
            <View style={styles.rootView}>
                <FootView allSelectActin={this.allSelectActin} financialAtion={this.financialAtion} allPriceAtion={this.allPriceAtion}/>
                <NavigationView title="购物车" backIconClick={this.backPage} renderRihtFootView={this.renderNavigationBtn}/>
            </View>
        )
    }

    renderNavigationBtn=()=>{
        return(
            <TouchableOpacity style={styles.navigationRightBtn} activeOpacity={1}>
                <Text style={styles.navigationRightText}>编辑</Text>
            </TouchableOpacity>
        )
    }

    allSelectActin=(type)=>{
        alert('全选')
    }
    financialAtion=()=>{
        alert('金融购')
    }
    allPriceAtion=()=>{
        alert('全款');
    }


}

class FootView extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            allSelectType:false,
        };
      }

     render(){
          const {allSelectActin,financialAtion,allPriceAtion} = this.props;
         return(
             <View style={styles.footView}>
                 <TouchableOpacity activeOpacity={1} onPress={()=>{
                     allSelectActin(!this.state.allSelectType);
                     this.setState({
                         allSelectType:!this.state.allSelectType
                     })
                 }}>
                     <View style={styles.selectView}>
                         <View style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20),
                             borderRadius:Pixel.getPixel(10),
                             borderColor:this.state.allSelectType?fontAndColor.COLORB0 : fontAndColor.COLORA3,
                             borderWidth:Pixel.getPixel(1),backgroundColor:this.state.allSelectType?fontAndColor.COLORB0:'white'}}/>
                         <Text style={styles.selectTitle}>全选</Text>
                         <Text style={[styles.selectPrice,{fontWeight:'bold'}]}>0.00</Text>
                         <Text style={[styles.selectPrice,{fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}]}>万元</Text>
                     </View>
                 </TouchableOpacity>
                 <TouchableOpacity activeOpacity={1} onPress={financialAtion}>
                     <View style={styles.financialBtn}>
                         <Text style={styles.financialBtnTitle}>{`金融购结算(${0})`}</Text>
                     </View>
                 </TouchableOpacity>
                 <TouchableOpacity activeOpacity={1} onPress={allPriceAtion}>
                     <View style={styles.allPriceBtn}>
                         <Text style={styles.allPriceBtnTitle}>{`全款购结算(${0})`}</Text>
                     </View>
                 </TouchableOpacity>
             </View>
         )
     }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        paddingBottom:Pixel.getBottomPixel(44),
        backgroundColor:fontAndColor.COLORA3,
    },
    navigationRightBtn:{
        width:Pixel.getPixel(100),
        height:Pixel.getPixel(40),
        justifyContent:'center'
    },
    navigationRightText:{
        color:'white',
        textAlign:'right',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    footView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: Pixel.getPixel(44),
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopColor: fontAndColor.COLORA4,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    selectView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:Pixel.getPixel(44),
        width:ScreenWidth * 0.4,
        borderRightWidth:Pixel.getPixel(0.5),
        borderRightColor:fontAndColor.COLORA3,
    },
    selectTitle:{
        color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginHorizontal:Pixel.getPixel(5),
    },
    selectPrice:{
        color:fontAndColor.COLORB2,
        fontSize:Pixel.getPixel(fontAndColor.TITLEFONT40),
    },
    financialBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:Pixel.getPixel(44),
        width:ScreenWidth * 0.3,
    },
    financialBtnTitle:{
        color:fontAndColor.COLORB0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    allPriceBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:Pixel.getPixel(44),
        width:ScreenWidth * 0.3,
        backgroundColor:fontAndColor.COLORB0,
    },
    allPriceBtnTitle:{
        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    }

})