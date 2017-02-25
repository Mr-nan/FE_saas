/**
 * Created by ZN on 17/2/25.
 */

import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,

} from 'react-native';

import BaceComponent from '../component/BaseComponent';
import NavigatorView from '../component/AllNavigationView';
import MyCarCell     from './znComponent/MyCarCell';
import * as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

var screenWidth = Dimensions.get('window').width;


let carData1 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
    },

];

let carData2 = [
    {
        title:'[北京]奔驰S400L(进口)AMG版',
        subTitle:'2016年7月/3万公里',
        imagType:1,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:2,
    },
    {
        title:'[北京]奔驰C200L(国产)',
        subTitle:'2016年7月/3万公里',
        imagType:3,
    },
    {
        title:'[北京]宝马X5',
        subTitle:'2016年7月/3万公里',
        imagType:2,
    },
    {
        title:'[保定]奔驰S600L(进口)曼巴赫版',
        subTitle:'2016年12月/2万公里',
        imagType:1,
    },

];

export default class CarMySourceScene extends BaceComponent{

    initFinish=()=>{

    };

    // 构造
      constructor(props) {
        super(props);
        // 初始状态

          const carData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id == r2.id });
        this.state = {

            carData:carData.cloneWithRows(carData1),

        };
      }

    checkedClick=(index)=>{

        if(index==1){

            this.setState({carData:this.state.carData.cloneWithRows(carData1)})

        }else {
            this.setState({carData:this.state.carData.cloneWithRows(carData2)})
        }
    }

    carCell=(index)=>{

        alert(index);
    }


    render(){
        return( <View style={styles.rootContainer}>
            <MyCarSourceCheckedView checkedClick={this.checkedClick}/>
            <ListView style={{backgroundColor:fontAndColor.COLORA3}}
                dataSource={this.state.carData}
                renderRow={(rowData) => <MyCarCell carMainText={rowData.title} carSubText={rowData.subTitle} type={rowData.imagType}/>}
                />
            <NavigatorView title='我的车源' backIconClick={this.backPage}/>
        </View>)

    }

}

class MyCarSourceCheckedView extends Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            bottomLineHide : true,

        };
      }

      setBottonLineHide=()=>{

          this.setState({
              bottomLineHide : !this.state.bottomLineHide,

          })
      }
    render(){

        const {checkedClick}=this.props;
        return(
            <View style={styles.checkedContainer}>
                <TouchableOpacity onPress={()=>{
                    this.setBottonLineHide();
                    checkedClick(1);
                }}>
                    <View style={[styles.checkedView,this.state.bottomLineHide&&{borderBottomColor:fontAndColor.COLORB0}]}>
                        <Text style={[styles.checkedText,this.state.bottomLineHide&&{color:fontAndColor.COLORB0}]}>已上架 (4)</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.centerLineView}>
                    <View style={styles.centerLine}/>
                </View>
                <TouchableOpacity onPress={()=>{
                    this.setBottonLineHide();
                    checkedClick(2);
                }}>
                    <View style={[styles.checkedView,!this.state.bottomLineHide&&{borderBottomColor:fontAndColor.COLORB0}]}>
                        <Text style={[styles.checkedText,!this.state.bottomLineHide&&{color:fontAndColor.COLORB0}]}>未上架 (5)</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}


const styles = StyleSheet.create({

    rootContainer:{

        flex:1,
        backgroundColor:'white',

    },

    checkedContainer:{

        height:44,
        marginTop:Pixel.getTitlePixel(64),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:4,
        borderBottomColor:fontAndColor.COLORA4,
    },

    checkedView:{

        borderBottomWidth:2,
        borderBottomColor:'white',
        width:screenWidth/2-1,
        backgroundColor:'white',
        height:40,
        justifyContent:'center',
        alignItems:'center',

    },

    centerLineView:{
        justifyContent:'center',
        alignItems:'center',
    },
    centerLine:{

        width:1,
        height:15,
        backgroundColor:fontAndColor.COLORA4,

    },
    checkedText:{

        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),

    },

    carCell:{

        height:110,
        backgroundColor:'red',
        width:100,
    }
})