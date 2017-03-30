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

        isCarinvoice = 1;
        isOBD = 1;
        this.loadData();

    }

    loadData=()=>{

        this.props.showModal(true);
        this.setState({

            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            renderPlaceholderOnly:'success',

        });
        request(AppUrls.FINANCE,'post',{

            obd_status:isOBD,
            invoice_status:isCarinvoice,
            api:'api/v3/account/apply_pattern_list',

        }).then((response) => {

            this.props.showModal(false);
            console.log(response.mjson);
            if(response.mjson.code == 1){

               this.setState({
                   dataSource:this.state.dataSource.cloneWithRows(response.mjson.data),
               });

           }else {
                this.props.showToast(response.mjson.msg);
           }

        }, (error) => {

            this.props.showModal(false);
            this.setState({
                renderPlaceholderOnly:'error',

            });

        });
    };

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state = {
            dataSource:ds,
            renderPlaceholderOnly:'success',
        };
      }



    render() {
        if (this.state.renderPlaceholderOnly!=='success') {
            return (
                <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                    {this.loadView()}
                    <NavigatorView title='选择模式' backIconClick={() => {
                        this.backPage()
                    }}/>
                </View>)
        }

        return (
            <View style={styles.rootContainer}>
                <View style={styles.headViewHintView}>
                    <Image style={{width:20,height:20}} source={require('../../../images/financeImages/hintImage.png')}/>
                    <Text style={styles.headViewHintText}>模式一旦选择将不可变更</Text>
                </View>
                {
                      this.renderHeadView()
                }
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}

                />
                <TouchableOpacity style={styles.footButton} onPress={()=>{alert('确定'+isCarinvoice +':'+isOBD)}}>
                        <Text style={styles.footButtonText}>确定</Text>
                </TouchableOpacity>
                <NavigatorView title='选择模式' backIconClick={() => {
                    this.backPage()
                }}/>
            </View>
        )
    }

    renderRow =(rowData)=> {

        return(
            <CGDSelectPatternCell cellData={rowData}/>
        )
    };

    renderHeadView =()=> {
        return(
            <View style={styles.headViewContainer}>
                <CGDSelectView title="二手车交易发票" selectClick={(btnType)=>{
                    isCarinvoice = btnType;
                    this.loadData();
                }}/>
                <CGDSelectView title="OBD设备" selectClick={(btnType)=>{
                    isOBD = btnType;
                    this.loadData();
                }}/>
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
            isConfirm:true,
            currentIndex:1,
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
        const {loan_upper,loan_lower,obd_fee,service_fee} = this.props.cellData;

        return(
            <View style={styles.cellContainer}>
                <View style={styles.cellContentView}>
                    <View style={styles.cellContentLeftView}>
                        <Text style={styles.cellTitleText}>{loan_lower>0?(loan_upper/10000+'-'+loan_lower/10000+'万(含)'):(loan_upper/10000+'万以下')}</Text>
                    </View>
                    <View style={styles.cellContentRightView}>
                        <View style={styles.cellContentItemView}>
                            <Text style={styles.cellContentItemTitle}>采购贷服务费</Text>
                            <Text style={styles.cellContentItemText}>{this.carMoneyChange(service_fee)}元</Text>
                        </View>
                        <View style={styles.cellContentItemView}>
                            <Text style={styles.cellContentItemTitle}>OBD服务费</Text>
                            <Text style={styles.cellContentItemText}>{this.carMoneyChange(obd_fee)}元</Text>
                        </View>
                    </View>
                </View>
               <View style={styles.cellBottomLine}/>
            </View>
        )
    }
    carMoneyChange=(carMoney)=>{

        let newCarMoney = parseFloat(carMoney);
        let carMoneyStr = newCarMoney.toFixed(2);
        let moneyArray = carMoneyStr.split(".");

        console.log(carMoney+'/'+newCarMoney +'/' + carMoneyStr +'/' +moneyArray);

        if(moneyArray.length>1)
        {
            if(moneyArray[1]>0){

                return moneyArray[0]+'.'+moneyArray[1];

            }else {

                return moneyArray[0];
            }

        }else {
            return carMoneyStr;
        }


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