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
import { observer } from 'mobx-react';

import * as AppUrls         from "../constant/appUrls";
import  {request}           from '../utils/RequestUtil';
import BaseComponent from "../component/BaseComponent";
import CarShoppingData from './carData/CarShoppingData';
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;


@observer
export  default  class CarShoppingScene extends BaseComponent{


    // 构造
      constructor(props) {
          super(props);


          const dataSource = new  ListView.DataSource(
              {
                  rowHasChanged:(r1,r2)=>r1==r2,
              });
          this.shoppingData = [
              {
                  shopTitle:'商户1',
                  list:[
                      {
                          cityName:'广西壮族自治区南宁市',
                          select:false,
                          carList:[
                              {select:false,title:'车辆1',type:1,number:1,maxNumber:5,price:10},
                              {select:false,title:'车辆2',type:1,number:1,maxNumber:5,price:11},
                              {select:false,title:'车辆3',type:1,number:3,maxNumber:5,price:10},
                              {select:false,title:'车辆1',type:1,number:1,maxNumber:5,price:10},
                          ]
                      },
                      {
                          cityName:'广西壮族自治区北海市',
                          select:false,
                          carList:[
                              {select:false,title:'车辆1',type:1,number:1,maxNumber:5,price:10},
                              {select:false,title:'车辆2',type:1,number:1,maxNumber:5,price:10},
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
                              {select:false,title:'车辆1',type:2,number:1,maxNumber:5,price:10},
                              {select:false,title:'车辆2',type:2,number:1,maxNumber:5,price:10},
                              {select:false,title:'车辆3',type:2,number:3,maxNumber:5,price:10},
                              {select:false,title:'车辆1',type:2,number:1,maxNumber:5,price:10},
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
                              {select:false,title:'车辆1',type:2,number:1,maxNumber:5,price:15},
                          ]
                      },
                  ]
              },

          ];

          this.state = {
              dataSource:dataSource.cloneWithRows(CarShoppingData.shoppingData),
              isEditType:false,
              isAllSelect:false,
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
                  this.state.isEditType && (
                        <HeadView ref={(ref)=>{this.headView = ref}} select={this.state.isAllSelect} headViewSelectClick={this.headViewSelectClick} headViewDelectClick={this.headViewDelectClick}/>
                    )
                }
                <ListView style={{marginBottom:this.state.isEditType?Pixel.getPixel(0):Pixel.getPixel(44)}}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          renderSeparator={this.renderSeparator}
                          enableEmptySections={true}
                          />
                {
                    !this.state.isEditType &&  (
                        <FootView allSelectActin={this.allSelectActin} financialAtion={this.financialAtion} allPriceAtion={this.allPriceAtion}/>
                    )
                }
                <NavigationView title="购物车" backIconClick={this.backPage} renderRihtFootView={this.renderNavigationBtn}/>
            </View>
        )
    }



    renderNavigationBtn=()=>{
        return(
            <TouchableOpacity style={styles.navigationRightBtn} activeOpacity={1} onPress={this.navigationBtnClick}>
                <Text style={styles.navigationRightText}>{this.state.isEditType?'完成':'编辑'}</Text>
            </TouchableOpacity>
        )
    }

    renderRow =(data,sectionID,rowID)=> {
        return(
            <CarShoppingCell data={data}
                             shopIndex={rowID}
                             CarShoppingData={CarShoppingData}
                             citySelectClick={(shopIndex,cityIndex)=>{
                                 CarShoppingData.selectCity(shopIndex,cityIndex);

                             }}
                             carSelectClick={(shopIndex,cityIndex,carIndex)=>{
                                 CarShoppingData.selectCar(shopIndex,cityIndex,carIndex);

                             }}
                             carDelectClick={(shopIndex,cityIndex,carIndex)=>{
                             }}/>
        )
    }

    renderSeparator =(sectionID,rowID)=>{
        return(<View key={`${sectionID}-${rowID}`} style={{height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>)
    }

    carDelectAction=(rowID,index)=>{
        let list = this.shoppingData[rowID].list;
        list.splice(index,1);

        if(list.length<=0){
            this.shoppingData.splice(rowID,1);
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.shoppingData),
        })
    }

    navigationBtnClick=()=>{
        this.setState({
            isEditType:!this.state.isEditType
        })
    }

    headViewSelectClick=(type)=>{

        for(let i=0;i<this.shoppingData.length;i++){
            let item = this.shoppingData[i];
            item.select = type;
            for(let j=0;j<item.list.length;j++){
                let subItem = item.list[j];
                subItem.select=type;
            }
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.shoppingData),
            isAllSelect:type
        })
    }

    headViewDelectClick=()=>{

        if(this.state.isAllSelect){
            this.shoppingData=[];
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(this.shoppingData),

            })
            return;
        }

        let isSelect = false;
        for(let i=0;i<this.shoppingData.length;i++){
            let item = this.shoppingData[i];
            if(item.select){
                this.shoppingData.splice(i,1);
                isSelect = true;
            }else {
                for(let j=0;j<item.list.length;j++){
                    let subItem = item.list[j];
                    if(subItem.select){
                        item.list.splice(j,1);
                        isSelect = true;
                    }
                }
            }
        }

        if(isSelect){
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(this.shoppingData),

            })
        }else {
            this.props.showToast('请选择要删除的车辆');
        }
    }

    isAllSelectType=()=>{
        let isAllSelect = true;
        for(let i=0;i<this.shoppingData.length;i++){
            let item = this.shoppingData[i];
            if(!item.select){
                isAllSelect = false;
                break;
            }
        }
        this.state.isAllSelect = isAllSelect;
        this.headView && this.headView.setSelectType(isAllSelect);
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

class HeadView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            select:this.props.select
        };
      }
    componentWillReceiveProps(nextProps) {
        this.state.select = nextProps.select;
    }

    render(){
        return(
            <View style={styles.headView}>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.headViewSelectClick(!this.state.select)}
                                  style={{flexDirection:'row'}}>
                    <Image source={this.state.select? require('../../images/carSourceImages/shopSelect.png'):require('../../images/carSourceImages/shopNoSelect.png')}/>
                    <Text style={styles.selectTitle}>全选</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{width:Pixel.getPixel(100),height:Pixel.getPixel(33),
                    alignItems:'center',justifyContent:'center',backgroundColor:fontAndColor.COLORB0
                }} onPress={this.props.headViewDelectClick}>
                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    }

    setSelectType=(type)=> {
        this.setState({
            select:type
        })
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
                 <TouchableOpacity activeOpacity={1} onPress={()=>{}}>
                     <View style={styles.selectView}>
                         <Text style={styles.selectText}>合计： </Text>
                         <Text style={[styles.selectPrice,{fontWeight:'bold'}]}>{CarShoppingData.sumPrice+''}</Text>
                         <Text style={[styles.selectPrice,{fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}]}>万元</Text>
                     </View>
                 </TouchableOpacity>
                 <TouchableOpacity activeOpacity={1} onPress={financialAtion}>
                     <View style={styles.financialBtn}>
                         <Text style={styles.financialBtnTitle}>金融购结算({CarShoppingData.sumNumber+''})</Text>
                     </View>
                 </TouchableOpacity>
                 <TouchableOpacity activeOpacity={1} onPress={allPriceAtion}>
                     <View style={styles.allPriceBtn}>
                         <Text style={styles.allPriceBtnTitle}>全款购结算({CarShoppingData.sumNumber+''})</Text>
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