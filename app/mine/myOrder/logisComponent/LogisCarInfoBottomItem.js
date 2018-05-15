/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import TransportNode from './TransportNode';
export  default class LogisCarInfoBottomItem extends PureComponent {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.offY = 0;
        this.state={
            dataSource:ds.cloneWithRows(this.props.data.reverse()),
            scrollEnabled:false
        }
    }

    componentWillReceiveProps(props) {
        if(props.offy==286){
            this.setState({scrollEnabled:true});
        }
    }

    render() {
        let bottomHeight = height-Pixel.getPixel(160);
        if(this.props.data.length<7){
            bottomHeight = Pixel.getPixel(69)*this.props.data.length+Pixel.getPixel(27);
        }
        return (
            <View style={{width:width,marginTop:Pixel.getPixel(10)
            ,backgroundColor:fontAndColor.COLORA3,alignItems:'center'}}>
                <Image source={require('../../../../images/mapbk.png')}
                       style={{width:width,height:Pixel.getPixel(132),position: 'absolute',alignItems:'center'}}>
                    <Image source={require('../../../../images/dwyd.png')}
                           style={{width:Pixel.getPixel(26),height:Pixel.getPixel(30),
                           marginTop:Pixel.getPixel(15)}}>

                    </Image>
                    <Text style={{marginTop:Pixel.getPixel(7),color: '#000',fontSize: Pixel.getPixel(15),
                        width:Pixel.getPixel(178),backgroundColor:'#00000000',textAlign: 'center'}}
                          numberOfLines={2}>
                        山西省太原市红居街朗琴园 28号楼808室
                    </Text>
                </Image>
                <ListView style={{width:Pixel.getPixel(335),marginTop:Pixel.getPixel(100),
                backgroundColor:'#fff',elevation:10,shadowColor:'black',
                shadowOffset:{h:0,w:0},shadowRadius:4,shadowOpacity:0.1,height:bottomHeight}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          scrollEnabled={this.state.scrollEnabled}
                          enableEmptySections={true}
                          onScroll={(event)=>{
                                this.offY = Pixel.getPixel(event.nativeEvent.contentOffset.y);
                                if(this.offY<=0){
                                    this.setState({scrollEnabled:false});
                                    this.props.callBack(true);
                                }else{
                                     this.props.callBack(false);
                                }
                            }}
                          showsVerticalScrollIndicator={false}
                >

                </ListView>
            </View>
        );
    }
    _renderRow=(rowData, selectionID, rowID)=>{
        return(
            <TransportNode data={rowData} rowId={rowID} length ={this.props.data.length-1}>
            </TransportNode>
        );
    }


}
