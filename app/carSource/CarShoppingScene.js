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
import CarShoppingCell from  './znComponent/CarShoppingCell';
import PixelUtil from '../utils/PixelUtil';
import { observer } from 'mobx-react/native';

import * as AppUrls         from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import BaseComponent from "../component/BaseComponent";
import CarShoppingData from './carData/CarShoppingData';
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;


@observer
export  default  class CarShoppingScene extends BaseComponent{

     constructor(props) {
          super(props);

          const dataSource = new  ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2,});
          this.shoppingData = [
              {
                  shopTitle:'商户1',
                  list:[
                      {
                          cityName:'广西壮族自治区南宁市',
                          select:false,
                          delectSelect:false,
                          carList:[
                              {select:false,delectSelect:false,title:'车辆1',type:1,number:1,maxNumber:5,price:10}]
                      },
                      {
                          cityName:'广西壮族自治区北海市',
                          select:false,
                          carList:[
                              {select:false,delectSelect:false,title:'车辆1',type:1,number:1,maxNumber:5,price:10},
                              {select:false,delectSelect:false,title:'车辆2',type:1,number:1,maxNumber:5,price:10},
                          ]
                      }
                  ]
              },
              {
                  shopTitle:'商户2',
                  list:[
                      {
                          cityName:'河北省邯郸市',
                          select:false,
                          carList:[
                              {select:false,delectSelect:false,title:'车辆1',type:2,number:1,maxNumber:5,price:10},
                              {select:false,delectSelect:false,title:'车辆2',type:2,number:1,maxNumber:5,price:10},

                          ]
                      },
                  ]
              },
              {
                  shopTitle:'商户3',
                  list:[
                      {
                          cityName:'北京市',
                          select:false,
                          carList:[
                              {select:false,delectSelect:false,title:'车辆1',type:2,number:1,maxNumber:5,price:15},
                          ]
                      },
                  ]
              },

          ];

          this.state = {
              dataSource:dataSource,
          };
      }

    componentWillMount() {

        CarShoppingData.setShoppingData(this.shoppingData);
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(CarShoppingData.shoppingData),
        })
    }

    render(){
        return(
            <View style={styles.rootView}>
                {
                  CarShoppingData.isEdit && (
                        <HeadView
                                  headViewSelectClick={this.headViewSelectClick}
                                  headViewDelectClick={this.headViewDelectClick}/>
                    )
                }
                <ListView style={{marginBottom:CarShoppingData.isEdit?Pixel.getPixel(0):Pixel.getPixel(44)}}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          renderSeparator={this.renderSeparator}
                          enableEmptySections={true}
                          />
                {
                    !CarShoppingData.isEdit &&  (
                        <FootView allSelectActin={this.allSelectActin} financialAtion={this.financialAtion} allPriceAtion={this.allPriceAtion}/>
                    )
                }
                <NavigationView title="购物车" backIconClick={this.backPage} renderRihtFootView={this.renderNavigationBtn}/>
            </View>
        )
    }



    renderNavigationBtn=()=>{
        return(
            <TouchableOpacity style={styles.navigationRightBtn}
                              activeOpacity={1}
                              onPress={this.navigationBtnClick}>
                <Text style={styles.navigationRightText}>{CarShoppingData.isEdit?'完成':'编辑'}</Text>
            </TouchableOpacity>
        )
    }

    renderRow =(data,sectionID,rowID)=> {
        return(
            <CarShoppingCell data={data}
                             shopIndex={rowID}
                             CarShoppingData={CarShoppingData}
                             citySelectClick={(shopIndex,cityIndex)=>{

                                 if(CarShoppingData.isEdit){
                                     CarShoppingData.delectSelectCity(shopIndex,cityIndex);
                                 }else {
                                     CarShoppingData.selectCity(shopIndex,cityIndex);
                                 }
                                 
                             }}
                             carSelectClick={(shopIndex,cityIndex,carIndex)=>{

                                 if(CarShoppingData.isEdit){
                                     CarShoppingData.delectSelectCar(shopIndex,cityIndex,carIndex);
                                 }else {
                                     CarShoppingData.selectCar(shopIndex,cityIndex,carIndex);
                                 }
                             }}
                             carEditNumberClick={(type,shopIndex,cityIndex,carIndex)=>{
                                 if(type==1){
                                     CarShoppingData.minus(shopIndex,cityIndex,carIndex);
                                 }else {
                                     CarShoppingData.plus(shopIndex,cityIndex,carIndex);
                                 }
                             }}
                             carDelectClick={(shopIndex,cityIndex,carIndex)=>{
                                 CarShoppingData.delectCar(shopIndex,cityIndex,carIndex,()=>{
                                     this.setState({
                                         dataSource:this.state.dataSource.cloneWithRows(CarShoppingData.shoppingData),
                                     });
                                 });

                             }}/>
        )
    }

    renderSeparator =(sectionID,rowID)=>{
        return(<View key={`${sectionID}-${rowID}`} style={{height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>)
    }

    navigationBtnClick=()=>{

        console.log('navigationBtnClick');
        CarShoppingData.isEdit=!CarShoppingData.isEdit;

    }

    headViewSelectClick=()=>{

        CarShoppingData.allDelectSelect();

    }

    headViewDelectClick=()=>{


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

@observer
class HeadView extends Component{

    render(){
        return(
            <View style={styles.headView}>
                <TouchableOpacity
                                  onPress={this.props.headViewSelectClick}
                                  style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={CarShoppingData.delectAllSelect.get()? require('../../images/carSourceImages/shopSelect.png'):require('../../images/carSourceImages/shopNoSelect.png')}/>
                    <Text style={styles.selectTitle}>全选</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={{width:Pixel.getPixel(100),height:Pixel.getPixel(33),
                    alignItems:'center',justifyContent:'center',backgroundColor:fontAndColor.COLORB0
                }} onPress={this.props.headViewDelectClick}>
                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    }


}

@observer
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
          const {financialAtion,allPriceAtion} = this.props;
         return(
             <View style={styles.footView}>
                     <View style={styles.selectView}>
                         <Text style={styles.sumTitle}>合计：</Text>
                         <Text style={[styles.selectPrice,{fontWeight:'bold'}]}>{CarShoppingData.sumPrice.get()}</Text>
                         <Text style={[styles.selectPrice,{fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}]}>万元</Text>
                     </View>
                 <TouchableOpacity activeOpacity={1} onPress={financialAtion}>
                     <View style={styles.financialBtn}>
                         <Text style={styles.financialBtnTitle}>订购({CarShoppingData.sumNumber.get()})</Text>
                     </View>
                 </TouchableOpacity>
                 {/*<TouchableOpacity activeOpacity={1} onPress={allPriceAtion}>*/}
                     {/*<View style={styles.allPriceBtn}>*/}
                         {/*<Text style={styles.allPriceBtnTitle}>全款购结算({CarShoppingData.sumNumber+''})</Text>*/}
                     {/*</View>*/}
                 {/*</TouchableOpacity>*/}
             </View>
         )
     }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
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
    headView:{
        flexDirection:'row',
        paddingHorizontal:Pixel.getPixel(15),
        paddingVertical:Pixel.getPixel(10),
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'space-between',
        width:ScreenWidth,
        height:Pixel.getPixel(50),
        marginBottom:Pixel.getPixel(10)

    },
    footView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        // borderRightWidth:Pixel.getPixel(0.5),
        // borderRightColor:fontAndColor.COLORA3,
        marginLeft:Pixel.getPixel(15)
    },
    selectTitle:{
        color:fontAndColor.COLORB11,
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        marginLeft:Pixel.getPixel(13),
    },
    sumTitle:{
        color:fontAndColor.COLORB11,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
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
        paddingHorizontal:Pixel.getPixel(32),
        backgroundColor:fontAndColor.COLORB0,
    },
    financialBtnTitle:{
        color:'white',
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