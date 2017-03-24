/**
 * Created by zhengnan on 2017/3/23.
 */

import React, {Component} from 'react';
import {

    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    Dimensions,
    Image

} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import NavigatorView from  '../../component/AllNavigationView';
import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import {request} from "../../utils/RequestUtil";
import * as AppUrls from "../../constant/appUrls";

var ScreenWidth = Dimensions.get('window').width;
let isCarinvoice = 0;
let isOBD = 0;

export  default  class CGDSelectPatternScene  extends  BaseComponent{


    initFinish = () => {

        isCarinvoice = 0;
        isOBD = 0;

    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态


          let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds.cloneWithRows(['row1','row2','row3']),
        };
      }



    render() {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.headViewHintView}>
                    <Image style={{width:20,height:20}} source={require('../../../images/financeImages/hintImage.png')}/>
                    <Text style={styles.headViewHintText}>模式一旦选择将不可变更</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeadView}
                />
                <TouchableOpacity onPress={()=>{alert('确定'+isCarinvoice +':'+isOBD)}}>
                    <View style={styles.footButton}>
                        <Text style={styles.footButtonText}>确定</Text>
                    </View>
                </TouchableOpacity>
                <NavigatorView title='选择模式' backIconClick={() => {
                    this.backPage()
                }}/>
            </View>
        )
    }

    renderRow =(rowData)=> {

        return(
            <CGDSelectPatternCell/>
        )
    };

    renderHeadView =()=> {
        return(
            <View style={styles.headViewContainer}>
                <CGDSelectView title="二手车交易发票" selectClick={(btnType)=>{isCarinvoice = btnType}}/>
                <CGDSelectView title="OBD设备" selectClick={(btnType)=>{isOBD = btnType}}/>
                <View style={styles.headViewTitleView}>
                    <Text style={styles.headViewTitleText}>该模式收费标准</Text>
                    <Text style={styles.headViewTitleSubText}>（放款时按每台车融资额砍头收取）</Text>
                </View>
                <View style={styles.headViewBottomLine}/>
            </View>
        )
    }

}

class CGDSelectView extends  Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isConfirm:false,
            currentIndex:0,
        };
      }

    render(){
        return(
            <View style={styles.headViewSelectView}>
                <View style={styles.headViewSelectLeftView}>
                    <Text style={styles.headViewSelectTitle}>{this.props.title}</Text>
                </View>
                <View style={styles.headViewSelectRightView}>
                    <TouchableOpacity onPress={()=>{this.selectBtnCilck(1)}}>
                        <View style={[styles.headViewSelectBtn,{marginRight:10},this.state.isConfirm && {borderColor:fontAndColor.COLORB0}]}>
                            <Text style={[styles.headViewSelectBtnText,this.state.isConfirm && {color:fontAndColor.COLORB0}]}>有</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.selectBtnCilck(0)}}>
                        <View style={[styles.headViewSelectBtn ,!this.state.isConfirm && {borderColor:fontAndColor.COLORB0}]}>
                            <Text style={[styles.headViewSelectBtnText,!this.state.isConfirm && {color:fontAndColor.COLORB0}]}>无</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    selectBtnCilck=(btnType)=> {

        if (this.state.currentIndex == btnType) return;
        this.props.selectClick(btnType);
        this.setState({
            currentIndex:btnType,
            isConfirm:!this.state.isConfirm,
        });

    };
}

class CGDSelectPatternCell extends Component{

    render(){
        return(
            <View style={styles.cellContainer}>
                <View style={styles.cellContentView}>
                    <View style={styles.cellContentLeftView}>
                        <Text style={styles.cellTitleText}>10万（含）及以下</Text>
                    </View>
                    <View style={styles.cellContentRightView}>
                        <View style={styles.cellContentItemView}>
                            <Text style={styles.cellContentItemTitle}>采购贷服务费</Text>
                            <Text style={styles.cellContentItemText}>1000元</Text>
                        </View>
                        <View style={styles.cellContentItemView}>
                            <Text style={styles.cellContentItemTitle}>OBD服务费</Text>
                            <Text style={styles.cellContentItemText}>10元</Text>
                        </View>
                    </View>
                </View>
               <View style={styles.cellBottomLine}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    rootContainer:{

        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),

    },
    headViewHintView:{
        flexDirection:'row',
        height:35,
        alignItems:'center',
        paddingLeft:15,
        backgroundColor:fontAndColor.COLORB6,
    },
    headViewHintText:{
        color:fontAndColor.COLORB2,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft:10
    },
    headViewContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
    },
    headViewBottomLine:{
        left:0,
        right:0,
        bottom:0,
        height:StyleSheet.hairlineWidth,
        backgroundColor:fontAndColor.COLORA4,
        position: 'absolute',
    },
    headViewTitleView:{
        flex:1,
        flexDirection:'row',
        paddingLeft:15,
        alignItems:'center',
        height:Pixel.getPixel(50),
        backgroundColor:'white',
        marginTop:10
    },
    headViewTitleText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
    },
    headViewTitleSubText:{
        color:fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    headViewSelectView:{
        flex:1,
        height:50,
        backgroundColor:'white',
        flexDirection:'row',
        marginTop:10,
    },
    headViewSelectLeftView:{
        flex:1,
        width:ScreenWidth/2,
        justifyContent:'center',
        paddingLeft:Pixel.getPixel(15),
    },
    headViewSelectRightView:{
        flex:1,
        width:ScreenWidth/2,
        justifyContent:'flex-end',
        paddingRight:Pixel.getPixel(15),
        flexDirection:'row',
        alignItems:'center',
    },
    headViewSelectTitle:{
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        fontWeight:'bold'
    },
    headViewSelectBtn:{
        borderWidth:StyleSheet.hairlineWidth,
        borderRadius:2,
        borderColor:fontAndColor.COLORA2,
        width:Pixel.getPixel(57),
        height:Pixel.getPixel(27),
        justifyContent:'center',
        alignItems:'center',
    },
    headViewSelectBtnText:{
        color:fontAndColor.COLORA2,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },
    cellContainer:{

        flex:1,
        height:Pixel.getPixel(66),
        backgroundColor:'yellow',
        backgroundColor:'white',

    },
    cellBottomLine:{
        left:15,
        right:15,
        bottom:0,
        height:StyleSheet.hairlineWidth,
        backgroundColor:fontAndColor.COLORA4,
        position: 'absolute',

    },
    cellContentView:{

        flex:1,
        height:Pixel.getPixel(65),
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    cellTitleText:{
        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.BUTTONFONT30,
    },
    cellContentLeftView:{
        justifyContent:'center',
        paddingLeft:15,
        width:ScreenWidth/2
    },
    cellContentRightView:{

        justifyContent:'center',
        justifyContent:'space-between',
        width:ScreenWidth/2,
        paddingRight:15,
    },

    cellContentItemView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:2.5,
        marginTop:2.5,

    },
    cellContentItemTitle:{

        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color:fontAndColor.COLORA1,

    },
    cellContentItemText:{
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color:fontAndColor.COLORA0,
    },
    footButton:{

        left:0,
        right:0,
        bottom:0,
        height:44,
        backgroundColor:fontAndColor.COLORB0,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
    },
    footButtonText:{

        color:'white',
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
    },

});