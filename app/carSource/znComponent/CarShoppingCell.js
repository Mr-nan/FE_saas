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
    Dimensions,
    Animated,
    PanResponder,
} from 'react-native';

import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;

export default class CarShoppingCell extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            select:false,
            list:this.props.data.list
        };
      }

    render(){
        return(
            <View style={styles.cellView}>
                <ShopView ref={(ref)=>{this.shopView = ref}} shopTitle={this.props.data.shopTitle} select={this.state.select} shopSelectClick={(type)=>{this.shopSelectClick(type)}}/>
                {
                    this.state.list.map((data,index)=>{
                        return(
                            <CarCell key={index} isShowLine={index<this.state.list.length?true:false} data={data}
                                     carSelectClick={(type)=>{this.carSelectClick(type,index)}}
                                     carDelectClick={()=>{this.props.carDelectClick(index)}}/>
                        )
                    })
                }
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {

        this.state.select = nextProps.select;
        this.state.list = nextProps.data.list;
        this.isAllSelectType();

        this.setState({
            select:this.state.select,
            list:this.state.list,
        })
    }

    shopSelectClick=(type)=>{

        this.props.shopSelectClick(type);

        for(let item of this.state.list){
            item.select = type;
        }
        this.setState({
            list:this.state.list
        })
    }

    carSelectClick=(type,index)=>{

        this.props.carSelectClick(type,index);
        this.state.list[index].select = type;
        this.isAllSelectType();

    }


    isAllSelectType=()=>{
        let isAllSelect = true;
        for (let item of this.state.list){
            if(item.select==false){
                isAllSelect = false;
                break;
            }
        }
        this.state.select = isAllSelect;
        this.shopView.setSelectType(isAllSelect);
    }

}

 class ShopView extends Component{
     // 构造
     constructor(props) {
         super(props);
         // 初始状态
         this.state={
             select:this.props.select
         }

     }

     componentWillReceiveProps(nextProps) {
         this.state.select = nextProps.select;
     }
    render(){
        return(
            <View style={styles.shopView}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{
                    this.props.shopSelectClick(!this.state.select);
                    this.setState({
                        select:!this.state.select
                    })
                }}>
                    <Image source={this.state.select? require('../../../images/carSourceImages/shopSelect.png'):require('../../../images/carSourceImages/shopNoSelect.png')}/>
                    <Text style={styles.shopTitle}>{this.props.shopTitle}</Text>
                </TouchableOpacity>
            </View>)
    }

    setSelectType=(type)=>{
        this.setState({
            select:type
        })
    }
}

 class CarCell extends Component{
     // 构造
     constructor(props) {
         super(props);

         this.animationType = false;
         this.state = {
             leftGap: new Animated.Value(0),
         };


     }

     startAnimation =()=>{
         this.animationType = true;
         Animated.timing(
             this.state.leftGap,
             {
                 toValue:-Pixel.getPixel(85),
                 duration:300,


             }
         ).start();
     }

     stopAnimation =()=>{
         this.animationType = false;
         Animated.timing(
             this.state.leftGap,
             {
                 toValue:0,
                 duration:300,

             }
         ).start();
     }

     componentWillMount() {
         this.panResponder = PanResponder.create({
             onStartShouldSetPanResponder: (evt, gestureState) => false,
             onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
             onMoveShouldSetPanResponder: (evt, gestureState) => true,
             onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
             onPanResponderMove: (evt, gestureState) => {
                 if(gestureState.dx<-10 && !this.animationType){
                     this.openDelectBtn();
                 }else if(gestureState.dx>0 && this.animationType){
                     this.closeDelectBtn();
                 }
             },
             onPanResponderTerminationRequest: (evt, gestureState) => true,
             onShouldBlockNativeResponder: (evt, gestureState) => {
                 return true;
             },
         })
     }

     componentWillReceiveProps(nextProps) {
         this.state.select = nextProps.data.select;
     }


    render(){
        return(
            <View style={{paddingHorizontal:Pixel.getPixel(15),backgroundColor:'white',width:ScreenWidth,height:Pixel.getPixel(110)}} {...this.panResponder.panHandlers}>
                <View  style={{flexDirection:'row', flex:1,borderBottomColor:fontAndColor.COLORA3, borderBottomWidth:this.props.isShowLine ?Pixel.getPixel(1):0}}>
                    <Animated.View style={[styles.carCell,{left:this.state.leftGap}]}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{
                            if(this.animationType){
                                this.closeDelectBtn();
                            }
                        }}>
                            <View style={{flexDirection:'row', flex:1,alignItems:'center',backgroundColor:'white',width:ScreenWidth-Pixel.getPixel(30)}}>
                                <TouchableOpacity style={{justifyContent:'center', alignItems:'center',width:Pixel.getPixel(18),height:Pixel.getPixel(80)}} onPress={()=>{
                                    this.props.carSelectClick(!this.state.select);
                                    this.setState({
                                        select:!this.state.select
                                    })

                                }}>
                                    <Image style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18)}} source={this.state.select? require('../../../images/carSourceImages/shopSelect.png'):require('../../../images/carSourceImages/shopNoSelect.png')}/>
                                </TouchableOpacity>
                                <Image style={styles.carImage} source={require('../../../images/carSourceImages/car_null_img.png')} resizeMode={'contain'}>
                                    <Image style={{top:0,left:0,bottom:0,right:0,position: 'absolute'}} source={this.props.data.carData.type==1? require('../../../images/carSourceImages/userCarTypeIcon.png'):require('../../../images/carSourceImages/newCarTypeIcon.png')}/>
                                </Image>
                                <View style={styles.carTextView}>
                                    <View>
                                        <Text style={{
                                            color:fontAndColor.COLORA0,
                                            fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                        }}>{this.props.data.carData.title}</Text>
                                        <Text style={{
                                            color:fontAndColor.COLORA1,
                                            fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        }}>2018年08月/1万公里</Text>
                                    </View>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{
                                            color:fontAndColor.COLORB2,
                                            fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                            fontWeight:'bold'
                                        }}>{54}</Text>
                                        <Text style={{
                                            color:fontAndColor.COLORB2,
                                            fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                        }}>万元</Text>
                                    </View>
                                </View>
                                <CarNumberEditView number={this.props.data.carData.number} maxNumber={this.props.data.carData.maxNumber}/>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <DelectButton ref={(ref)=>{this.delectButton = ref}} delectClick={()=>{this.closeDelectBtn();this.props.carDelectClick();}}/>
            </View>)

    }

     openDelectBtn=()=>{
         this.startAnimation();
         this.delectButton && this.delectButton.startAnimation();
     }

     closeDelectBtn=()=>{
         this.stopAnimation();
         this.delectButton && this.delectButton.stopAnimation();
     }

}

class DelectButton extends Component{

    // 构造
      constructor(props) {
        super(props);

        this.defaultGap = -Pixel.getPixel(80);
        this.state = {
            rightGap: new Animated.Value(this.defaultGap)
        };
      }

      startAnimation = ()=>{
          Animated.timing(
              this.state.rightGap,
              {
                  toValue:0,
                  duration:300,
              }
          ).start();
      }

      stopAnimation =()=>{
          Animated.timing(
              this.state.rightGap,
              {
                  toValue:this.defaultGap,
                  duration:300,

              }
          ).start();
      }

    render(){
        return(
                <Animated.View style={[styles.delectBtn, {right:this.state.rightGap}]}>
                    <TouchableOpacity style={{flex:1, alignItems:'center',justifyContent:'center',width:Pixel.getPixel(80)}} onPress={this.props.delectClick}>
                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>删除</Text>
                    </TouchableOpacity>
                </Animated.View>
        )
    }
}

class CarNumberEditView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            carNumber:this.props.number
        };
      }
    render(){
        return(
            <View style={styles.carNumberEditView}>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(25),height:Pixel.getPixel(28)}} activeOpacity={1}
                                  onPress={()=>{this.carNumberClick(1)}}>
                    <Image source={this.state.carNumber==1? require('../../../images/carSourceImages/noMinusCarNumber.png'):require('../../../images/carSourceImages/minusCarNumber.png')}/>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(43),height:Pixel.getPixel(28),borderLeftColor:fontAndColor.COLORA3,borderLeftWidth:Pixel.getPixel(1),borderRightColor:fontAndColor.COLORA3,borderRightWidth:Pixel.getPixel(1)}}>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>{this.state.carNumber}</Text>
                </View>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(25),height:Pixel.getPixel(28)}} activeOpacity={1}
                                  onPress={()=>{this.carNumberClick(2)}}>
                    <Image source={(this.props.maxNumber>this.state.carNumber)?require('../../../images/carSourceImages/addCarNumber.png'):require('../../../images/carSourceImages/noAddCarNumber.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    carNumberClick=(type)=>{
        let carNumber = this.state.carNumber;
        if(type==1){

            if(carNumber==1){return;}
            carNumber-=1;
            this.setState({
                carNumber:carNumber,
            })

        }else {

           if(this.props.maxNumber && this.props.maxNumber<=carNumber){return;}
           carNumber+=1;
            this.setState({
                carNumber:carNumber,
            })
        }


    }
}

const styles = StyleSheet.create({
    cellView:{
        width:ScreenWidth,
        backgroundColor:'white',
    },
    shopView:{
        alignItems:'center',
        height:Pixel.getPixel(40),
        width:ScreenWidth,
        borderBottomWidth:Pixel.getPixel(1),
        borderBottomColor:fontAndColor.COLORA3,
        paddingLeft:Pixel.getPixel(15),
        flexDirection:'row',
        backgroundColor:'white'
    },
    shopTitle:{
        marginLeft:Pixel.getPixel(10),
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color:fontAndColor.COLORA1,
    },
    circleView:{
        width:Pixel.getPixel(20),
        height:Pixel.getPixel(20),
        borderRadius:Pixel.getPixel(10),
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORA3,
    },
    carCell:{
        flexDirection:'row',
        paddingVertical:Pixel.getPixel(10),
        alignItems:'center',
        top:0,
        left:-Pixel.getPixel(85),
        bottom:0,
        position: 'absolute',
        width:ScreenWidth-Pixel.getPixel(30),
    },
    carImage:{
        marginLeft:Pixel.getPixel(10),
        width:Pixel.getPixel(110),
        height:Pixel.getPixel(80),
        backgroundColor:fontAndColor.COLORA3
    },
    carTextView:{
        marginLeft:Pixel.getPixel(10),
        height:Pixel.getPixel(80),
        flex:1,
        backgroundColor:'white',
        justifyContent:'space-between'
    },
    delectBtn:{
        top:0,
        right:0,
        bottom:Pixel.getPixel(1),
        position: 'absolute',
        backgroundColor:fontAndColor.COLORB2,
        alignItems:'center',
        justifyContent:'center',
        width:Pixel.getPixel(80),
    },
    carNumberEditView:{
        width:Pixel.getPixel(93),
        height:Pixel.getPixel(28),
        right:0,
        bottom:0,
        position: 'absolute',
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORA3,
        flexDirection:'row'

    }
})