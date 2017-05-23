/**
 * Created by zhengnan on 2017/5/20.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    Dimensions,
    TouchableOpacity

} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import NavigationView from '../component/AllNavigationView';
import *as fontAndColor from '../constant/fontAndColor';
import *as appUrls from '../constant/appUrls';
import *as RequestUtil from '../utils/RequestUtil';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;

export  default class CarbreakRulesScene extends  BaseComponent{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});

        this.state = {

            dataSource:ds,
            renderPlaceholderOnly: 'success',
        }
    }
    initFinish = () => {

        this.loadData();
    }
    render(){
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={{flex:1,backgroundColor:'white'}}>
                    {this.loadView()}
                    <NavigationView title="违章记录" backIconClick={()=>{this.backPage();}}/>
                </View>);
        }
        return(
            <View style={styles.rootContainer}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>
                <NavigationView title="违章记录" backIconClick={()=>{this.backPage();}}/>
            </View>
        )
    }

    renderRow =(rowData)=>{
        return(
            <CarbreakRulesCell cellData={rowData}/>
        )
    }

    loadData=()=>{
        let carData = this.props.carData;
        RequestUtil.request(appUrls.CAR_GET_ILLEGAL,'post',
            {
                'vin':carData.vin,
                'carNo':carData.plate_number,
                'engineNo':carData.engine_number,
                'zone':carData.city_id,

        }).then((response)=>{

            console.log(response);
            if(response.mjson.data.lengte>0){

                this.setState({
                    dataSource:this.state.dataSource(response.mjson.data),
                    renderPlaceholderOnly: 'success',

                });

            }else {
                this.setState({
                    renderPlaceholderOnly: 'null',
                });
            }

        },(error)=>{
            this.setState({
                renderPlaceholderOnly: 'null',
            });
        });
    }

}

class CarbreakRulesCell extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isUnfold:false
        };
      }

      render(){

          let cellData = this.props.cellData;

          return(
              <View style={styles.cellView}>
                  <TouchableOpacity style={styles.cellTitleView} onPress={()=>{this.setState({isUnfold:!this.state.isUnfold})}}>
                      <View>
                          <Text style={styles.cellTitleViewTitle}>{cellData.status==0?'未':'已'}经处理违章</Text>
                          <Text style={styles.cellTitleViewDate}>{cellData.time}</Text>
                      </View>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Text style={{color:fontAndColor.COLORA2, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>展开</Text>
                          <Image style={{width:20,height:20,backgroundColor:fontAndColor.COLORA4,marginLeft:Pixel.getPixel(5)}}/>
                      </View>
                  </TouchableOpacity>
                  {
                      this.state.isUnfold &&(
                          <View style={styles.cellContentView}>
                              <Text style={styles.cellTitle}>违章地点</Text>
                              <Text style={styles.cellValue}>{cellData.address}</Text>

                              <Text style={styles.cellTitle}>违章原因</Text>
                              <Text style={styles.cellValue}>{cellData.reason}</Text>

                              <Text style={styles.cellTitle}>违章采集机关</Text>
                              <Text style={styles.cellValue}>{cellData.department}</Text>

                              <Text style={styles.cellTitle}>违章扣分</Text>
                              <Text style={styles.cellValue}>{cellData.score}</Text>

                              <Text style={styles.cellTitle}>违章代码</Text>
                              <Text style={styles.cellValue}>{cellData.code}</Text>

                              <Text style={styles.cellTitle}>违章项文件编号</Text>
                              <Text style={styles.cellValue}>{cellData.archive_no}</Text>

                              {
                                  cellData.tel && (
                                      <View>
                                          <Text style={styles.cellTitle}>联系电话</Text>
                                          <Text style={styles.cellValue}>{cellData.tel}</Text>
                                      </View>
                                  )
                              }

                              <Text style={styles.cellTitle}>违章归属地</Text>
                              <Text style={styles.cellValue}>{cellData.address_name}</Text>
                          </View>
                      )
                  }

              </View>
          )
      }
}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
        backgroundColor:fontAndColor.COLORA3,
    },
    cellView:{
        backgroundColor:'white',
        width:ScreenWidth,
        marginTop:Pixel.getPixel(10)
    },
    cellTitleView:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:fontAndColor.COLORA4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:Pixel.getPixel(10),
        height:Pixel.getPixel(65),
        paddingHorizontal:Pixel.getPixel(15),

    },
    cellTitleViewTitle:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
    },
    cellTitleViewDate:{
        color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        marginTop:Pixel.getPixel(6),
    },

    cellContentView:{
        paddingHorizontal:Pixel.getPixel(15),
        paddingTop:Pixel.getPixel(10),
        paddingBottom:Pixel.getPixel(20),
        backgroundColor:'white',
        width:ScreenWidth,
    },
    cellTitle:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginTop:Pixel.getPixel(10),
    },
    cellValue:{
        color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
    },

});