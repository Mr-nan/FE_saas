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
    Dimensions,
    InteractionManager,
    RefreshControl,
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
import  StringTransformUtil from  "../utils/StringTransformUtil";
import CarNewInfoScene from "./CarNewInfoScene";
import CarUserInfoScene from "./CarInfoScene";
import AccountModal from '../component/AccountModal';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import AccountManageScene from '../mine/accountManage/AccountTypeSelectScene'
import BindCardScene from '../mine/accountManage/BindCardScene'
import WaitActivationAccountScene from '../mine/accountManage/WaitActivationAccountScene'


let stringTransform = new StringTransformUtil();
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;


@observer
export  default  class CarShoppingScene extends BaseComponent{

     constructor(props) {
          super(props);

          const dataSource = new  ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2,});
          this.state = {
              dataSource:dataSource,
              renderPlaceholderOnly:'blank',
              isRefreshing:false,
          };

         CarShoppingData.isEdit = false;

      }


    initFinish=()=>{
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.loadData();
        });
    }



    allRefresh=()=>{
        this.initFinish();
    }

    loadData=()=>{

        request(AppUrls.CAR_ORDER_LISTS, 'post', {

            company_id:global.companyBaseID,

        }).then((response) => {
            console.log(response);
            this.setData(response.mjson.data.cart);

        }, (error) => {
            this.setState({renderPlaceholderOnly: 'error'});

        });
    }
    refreshingData=()=>{
        this.setState({isRefreshing: true});
        this.loadData();
    }

    setData=(data)=>{

        let isSHowContHint = false;
        for (let shopData of data){
            for (let cityData of shopData.new_cars){
                cityData.select=false;
                cityData.delectSelect=false;
                for (let carData of cityData.cars){

                    if(carData.car_count>carData.stock-carData.reserve_num){
                        if(carData.stock-carData.reserve_num==0){
                            carData.contHint = '已被订购';

                        }else {
                            carData.contHint = `仅剩${carData.stock-carData.reserve_num}台`;
                            carData.car_count = carData.stock-carData.reserve_num;
                        }

                        this._carEditNumberAction(carData.id,carData.stock-carData.reserve_num);

                        if(!isSHowContHint){
                            isSHowContHint = true;
                        }
                    }



                    carData.select = false;
                    carData.delectSelect = false;
                }
            }
        }

        data = data.filter(e=>(e.new_cars.length>0));


        CarShoppingData.setShoppingData(data);
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(CarShoppingData.shoppingData),
            renderPlaceholderOnly:'success',
            isRefreshing:false,

        })

        if(isSHowContHint){
            this.props.showToast('部分商品可售数量不足');
        }

    }

    render(){

        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {this.loadView()}
                    <NavigationView title="购物车" backIconClick={this.backPage} />
                </View>);
        }

         if(CarShoppingData.shoppingData.length<=0){
             return(
                 <View style={{flex:1, backgroundColor:fontAndColor.COLORA3,paddingTop:Pixel.getPixel(158)}}>
                     <NullDataView click={()=>{this.backToTop()}}/>
                     <NavigationView title="购物车" backIconClick={this.backPage} />
                 </View>
             )
         }
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
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this.refreshingData}
                                  tintColor={[fontAndColor.COLORB0]}
                                  colors={[fontAndColor.COLORB0]}
                              />
                          }
                          />
                {
                    !CarShoppingData.isEdit &&  (
                        <FootView allSelectActin={this.allSelectActin} financialAtion={this.financialAtion} allPriceAtion={this.allPriceAtion}/>
                    )
                }
                <AccountModal ref="accountmodal"/>
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
                                     CarShoppingData.selectCity(shopIndex,cityIndex,hintAction=()=>{
                                         this.props.showToast('购买总数量不得超过30台');
                                     });
                                 }
                             }}
                             carSelectClick={(shopIndex,cityIndex,carIndex)=>{

                                 if(CarShoppingData.isEdit){
                                     CarShoppingData.delectSelectCar(shopIndex,cityIndex,carIndex);
                                 }else {
                                     CarShoppingData.selectCar(shopIndex,cityIndex,carIndex,hintAction=()=>{
                                         this.props.showToast('购买总数量不得超过30台');
                                     });
                                 }
                             }}
                             carEditNumberClick={(carID,type,shopIndex,cityIndex,carIndex)=>{

                                 this._carEditNumberClick(carID,type,shopIndex,cityIndex,carIndex);

                             }}
                             carDelectClick={(carID,shopIndex,cityIndex,carIndex)=>{

                                 this._carDelectClick(carID,shopIndex,cityIndex,carIndex);

                             }}
                             carInfoScreenClick={(carData)=>{
                                 this._carInfoScreenClick(carData);
                             }}
            />
        )
    }

    renderSeparator =(sectionID,rowID)=>{
        return(<View key={`${sectionID}-${rowID}`} style={{height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>)
    }

    navigationBtnClick=()=>{

        CarShoppingData.isEdit=!CarShoppingData.isEdit;

    }

    headViewSelectClick=()=>{

        CarShoppingData.allDelectSelect();

    }

    headViewDelectClick=()=>{

        this.props.showModal(true);
        if(CarShoppingData.delectAllSelect.get()==true){

            request(AppUrls.CAR_ORDER_DELETE, 'post', {

                company_id:global.companyBaseID,
                del_all:1,

            }).then((response) => {

                this.props.showModal(false);

                CarShoppingData.delectAction(()=>{
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(CarShoppingData.shoppingData),
                    });
                });
            }, (error) => {
                this.props.showToast(error.mjson.msg);
            });

        }else {

            let ids = [];
            for(let shopData of CarShoppingData.shoppingData){
                for (let cityData of shopData.new_cars){
                  for (let carData of cityData.cars){
                      if(carData.delectSelect==true){
                          ids.push(carData.id);
                      }
                  }
                }
            }
            request(AppUrls.CAR_ORDER_DELETE, 'post', {

                company_id:global.companyBaseID,
                ids:ids.toString(),

            }).then((response) => {

                this.props.showModal(false);
                CarShoppingData.delectAction(()=>{
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(CarShoppingData.shoppingData),
                    });
                });
            }, (error) => {
               this.props.showToast(error.mjson.msg);
            });


        }


    }

    //编辑库存
    _carEditNumberClick=(carID,type,shopIndex,cityIndex,carIndex)=>{

        let carNumber = 0;

        if(type==1){
            carNumber =  CarShoppingData.minus(shopIndex,cityIndex,carIndex);
        }else {
            carNumber = CarShoppingData.plus(shopIndex,cityIndex,carIndex);
        }

        this._carEditNumberAction(carID,carNumber);

    }

    _carEditNumberAction=(carID,carNumber)=>{
        request(AppUrls.CAR_ORDER_SET_COUNT, 'post', {

            company_id:global.companyBaseID,
            car_id:carID,
            car_count: carNumber,

        }).then((response) => {


        }, (error) => {

        });
    }

    // 删除车辆
    _carDelectClick=(carID,shopIndex,cityIndex,carIndex)=>{

        this.props.showModal(true);

        request(AppUrls.CAR_ORDER_DELETE, 'post', {

            company_id:global.companyBaseID,
            ids:carID

        }).then((response) => {
            this.props.showModal(false);

            CarShoppingData.delectCar(shopIndex,cityIndex,carIndex,()=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(CarShoppingData.shoppingData),
                });
            });

        }, (error) => {
            this.props.showModal(false);

            this.props.showToast(error.mjson.msg);
        });

    }

    _carInfoScreenClick=(carData)=>{
        if(carData.stock==0){
            this.props.showToast('商品已下架');
        }else {
            let navigatorParams = {
                name: "CarNewInfoScene",
                component: CarNewInfoScene,
                params: {
                    carID: carData.id,
                }
            };

            if(carData.v_type == 1){
                navigatorParams = {
                    name: "CarUserInfoScene",
                    component: CarUserInfoScene,
                    params: {
                        carID: carData.id,
                    }
                }
            }
            this.toNextPage(navigatorParams);
        }
    }



    allSelectActin=(type)=>{
        alert('全选')
    }
    financialAtion=()=>{


        if(CarShoppingData.sumNumber.get()>30){
            this.props.showToast('购买总数量不得超过30台');
            return;
        }
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                    child_type: '1'
                };
                this.props.showModal(true);
                request(AppUrls.USER_ACCOUNT_INFO, 'Post', maps)
                    .then((response) => {
                            this.props.showModal(false);
                            if (response.mjson.data.account.length == 0) {
                                this.props.showToast('请您先开通平台账户');
                            } else {
                                lastType = response.mjson.data.account.status;
                                let navigatorParams = {
                                    name: '',
                                    component: '',
                                    params: {
                                        callBack: () => {
                                        }
                                    }
                                };
                                if (lastType == '0') {

                                    navigatorParams.name = 'AccountManageScene';
                                    navigatorParams.component = AccountManageScene;
                                    this.refs.accountmodal.changeShowType(true,
                                        '您还未开通资金账户，为方便您使用金融产品及购物车，' +
                                        '请尽快开通！', '去开户', '看看再说', () => {
                                            this.toNextPage(navigatorParams);
                                        });

                                } else if (lastType == '1') {
                                    navigatorParams.name = 'BindCardScene';
                                    navigatorParams.component = BindCardScene;
                                    this.refs.accountmodal.changeShowType(true,
                                        '您的资金账户还未绑定银行卡，为方便您使用金融产品及购物车，请尽快绑定。'
                                        , '去绑卡', '看看再说', () => {
                                            this.toNextPage(navigatorParams);
                                        });

                                } else if (lastType == '2') {
                                    navigatorParams.name = 'WaitActivationAccountScene';
                                    navigatorParams.component = WaitActivationAccountScene;
                                    this.refs.accountmodal.changeShowType(true,
                                        '您的账户还未激活，为方便您使用金融产品及购物车，请尽快激活。'
                                        , '去激活', '看看再说', () => {
                                            this.toNextPage(navigatorParams);
                                        });

                                } else {
                                    this.carBuyAction();
                                }
                            }
                        },
                        (error) => {
                            this.props.showToast('用户信息查询失败');
                        });
            } else {
                this.props.showToast('用户信息查询失败');
            }
        });


    }


    carBuyAction=()=>{
        let carsArray = [];
        for(let shopData of CarShoppingData.shoppingData){
            for (let cityData of shopData.new_cars){
                for (let carData of cityData.cars){

                    if(carData.select==true){

                        carsArray.push({car_id:carData.id,
                            car_count:carData.car_count,})
                    }
                }
            }
        }

        this.props.showModal(true);

        request(AppUrls.CREATE_ORDER_HOME, 'post', {

            cars:JSON.stringify(carsArray),
            company_id:global.companyBaseID,

        }).then((response) => {
            this.props.showModal(false);
            this.props.showToast('下单成功');

        }, (error) => {
            this.props.showModal(false);
            this.props.showToast(error.mjson.msg);
        });
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
                         <Text style={[styles.selectPrice,{fontWeight:'bold'}]}>{stringTransform.carMoneyChange(CarShoppingData.sumPrice.get())}</Text>
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

class NullDataView extends Component{

    render(){
        return(
            <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../images/carSourceImages/kongkong.png')}/>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(24)}}>购物车空空如也</Text>
                    <TouchableOpacity onPress={this.props.click}>
                        <View style={{
                            backgroundColor:fontAndColor.COLORB0,
                            alignItems:'center',justifyContent:'center',
                            borderRadius:Pixel.getPixel(2),
                            width:Pixel.getPixel(100),
                            height:Pixel.getPixel(33), marginTop:Pixel.getPixel(34)
                        }}>
                            <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>返回首页</Text>
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