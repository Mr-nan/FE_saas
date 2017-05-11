/**
 * Created by zhengnan on 2017/5/9.
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated,

} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import * as fontAndColor from '../constant/fontAndColor';
import AllNavigationView   from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

const provinceData = (require('./carData/carFilterData.json')).provinceSource;
const SceneWidth = Dimensions.get('window').width;

let selectData={
    city_name:'',
    provinceID:0,
    cityID:0,

};

 export default class ProvinceListScene extends BaseComponent{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态

          this.titleArray = [];

          let  getSectionData = (dataBlob,sectionID)=>{
                return dataBlob[sectionID];
          }
          let  getRowData = (dataBlob,sectionID,rowID)=>{
              return dataBlob[sectionID+":"+rowID];
          }

          const dataSource = new  ListView.DataSource(
              {
                  getSectionData:getSectionData,
                  getRowData:getRowData,
                  sectionHeaderHasChanged:(s1,s2)=>s1!==s2,
                  rowHasChanged:(r1,r2)=>r1!==r2,
              }
          );

          let dataBlob={},sectionIDS=[],rowIDS=[],rows=[];
          console.log(provinceData);
          for (var i=0;i<provinceData.length;i++){

              sectionIDS.push(i);
              dataBlob[i]=provinceData[i].title;
              this.titleArray.push(dataBlob[i]);
              rows = provinceData[i].data;
              rowIDS[i] = [];
              for (var j=0;j<rows.length;j++){
                  rowIDS[i].push(j);
                  dataBlob[i+':'+j] = rows[j];
              }
          }

        this.state = {
            dataSource:dataSource.cloneWithRowsAndSections(dataBlob,sectionIDS,rowIDS),
            isShowCityList:false,
        };
      }
    _checkedCityClick=()=>{
          this.props.checkedCityClick(selectData);
          this.backPage();
    }

    render(){
        return(
            <View style={styles.rootContainer}>
                <ListView
                    ref="listView"
                    dataSource={this.state.dataSource}
                    renderSectionHeader={(sectionData)=>{
                        return(
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>{sectionData}</Text>
                            </View>
                        )
                    }}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    onScroll={() => {
                    if (this.state.isShowCityList) {
                        this.setState({
                            isShowCityList:false,
                        });
                    }}}/>
                <ZNListIndexView indexTitleArray={this.titleArray} indexClick={this._indexAndScrollClick}/>
                {
                    this.state.isShowCityList && (<CityList checkedCityClick={this._checkedCityClick}/>)
                }
                <AllNavigationView title="城市筛选" backIconClick={this.backPage}/>
        </View>)
    }

     // 每一行中的数据
     renderRow = (rowData) => {
         return (
             <TouchableOpacity onPress={()=>{
                 this.setState({isShowCityList:true});
                 selectData.city_name=rowData.title;
                 selectData.provinceID=rowData.ID;
             }}>
                 <View style={styles.rowCell}>
                     <Text style={styles.rowCellText}>{rowData.title}</Text>
                 </View>
             </TouchableOpacity>
         )
     };

     _indexAndScrollClick = (index) => {

         let listView = this.refs.listView;
         let scrollY = index * Pixel.getPixel(40);
         for (let i = 0; i < index; i++) {
             let rowIndex = provinceData[i].data.length;
             scrollY += +rowIndex * Pixel.getPixel(44);
         }
         listView.scrollTo({x: 0, y: scrollY, animated: true});
     };


}


class ZNListIndexView extends Component{

    render(){
        const {indexTitleArray}=this.props;
        return(
            <View style={styles.indexView}>
                {
                    indexTitleArray.map((data,index)=>{
                        return(
                            <TouchableOpacity key={index} style={styles.indexItem} onPress={()=>{

                                this.props.indexClick(index);

                            }}>
                                <Text style={styles.indexItemText}>{data}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

class CityList extends  Component{

    componentDidMount() {

        this.state.valueRight.setValue(SceneWidth);
        Animated.spring(
            this.state.valueRight,
            {
                toValue: SceneWidth * 0.3,
                friction: 5,
            }
        ).start();

    }
     // 构造
       constructor(props) {
         super(props);
         // 初始状态
           const dataSource = new ListView.DataSource({
               rowHasChanged:(r1,r2)=>r1!==r2,
           });
         this.state = {
             dataSource:dataSource.cloneWithRows(['111','2222','3333','444','555']),
             valueRight: new Animated.Value(0),
         };
       }

     render(){
         return(
             <Animated.View style={[styles.cityContainer,{left:this.state.valueRight}]}>
                 <ListView dataSource={this.state.dataSource}
                           renderRow={this.renderRow}
                           removeClippedSubviews={false}
                           renderHeader={()=>{
                               return(
                               <TouchableOpacity style={styles.sectionHeader} onPress={this.props.checkedCityClick}>
                                   <Text style={styles.sectionText}>{selectData.city_name}</Text>
                               </TouchableOpacity>
                           )}}/>
             </Animated.View>
         )
     }
    // 每一行中的数据
    renderRow = (rowData) => {
        return (

            <TouchableOpacity style={styles.rowCell} onPress={()=>{


            }}>
                <Text style={styles.rowCellText}>{rowData}</Text>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({

    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    sectionHeader: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(40),
        justifyContent: 'center'
    },
    sectionText: {
        marginLeft: Pixel.getPixel(15),
        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    rowCell: {

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    rowCellText: {
        marginLeft: Pixel.getPixel(15),
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
    },
    indexView: {
        position: 'absolute',
        bottom: 0,
        top: Pixel.getTitlePixel(113),
        backgroundColor: 'transparent',
        right: 0,
        width: Pixel.getPixel(45),
        alignItems: 'center',
        justifyContent: 'center',

    },
    indexItem: {
        marginTop: Pixel.getPixel(6),
        width: Pixel.getPixel(30),
        backgroundColor: 'transparent',
    },
    indexItemText: {
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT),
        textAlign: 'center',
    },
    cityContainer:{
        backgroundColor: 'white',
        top: Pixel.getTitlePixel(64),
        bottom: 0,
        position: 'absolute',
        width: SceneWidth * 0.7,
        borderLeftWidth: 2,
        borderLeftColor: fontAndColor.COLORA3,
    },

});