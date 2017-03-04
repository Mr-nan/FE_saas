/**
 * Created by lhc on 2017/2/21.
 */
//车辆展期


import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import {CommenButton} from './component/ComponentBlob';
import {adapeSize, fontadapeSize, width} from './component/MethodComponent';
import NavigationBar from '../../component/NavigationBar';
import * as FontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import PixelUtil from '../../utils/PixelUtil'

var Pixel = new PixelUtil();

let map = new Map();
let data = ['1', '2', '3'];
export  default class CarOverdue extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(data),
        }
    }

    render() {
        return (
            <View style={{backgroundColor: FontAndColor.COLORA3, flex: 1}}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"申请展期"}
                    rightText={""}
                    leftImageCallBack={this.backPage}/>

                <ListView
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                    renderSeparator={this.renderSeparator}/>

                <View style={styles.handelWarper}>
                    <CommenButton
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.buttonStyleLeft}
                        onPress={() => {

                        }} title="申请展期"/>
                    <CommenButton
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.buttonStyleRight}
                        onPress={() => {

                        }} title="取消"/>
                </View>
            </View>
        )
    }

    renderRow = (rowData, sindex, rowID) => {
        return (
            <TouchableOpacity onPress={() => {
                if (typeof(map.get(rowID)) == 'undefined') {
                    map.set(rowID, rowData);
                } else {
                    map.delete(rowID);
                }
                this.setState({
                    dataSource: this.ds.cloneWithRows(data),
                });
            }}>
                <View style={styles.container}>
                    <View style={styles.containerTop}>
                        <View style={styles.carInfoWarp}>
                            <Text numberOfLines={2} style={styles.carType}>奥迪A7(进口) 2014款 35 FSI 技术形 </Text>
                            <Text style={styles.carFramNum}>车牌号:京2321312312312</Text>
                        </View>
                        {typeof(map.get(rowID)) == 'undefined' ?
                            <Image style={styles.orderState}
                                   source={require('../../../images/financeImages/dateIcon.png')}/>
                            :
                            <Image style={styles.orderState}
                                   source={require('../../../images/financeImages/addPicker.png')}/>
                        }
                    </View>
                    <View style={styles.containerBottom}>
                        <Text style={[styles.carFramNum, {flex: 1}]}>20123123213~21312312312</Text>
                        <Text style={styles.price}> 放款额： 15万</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderHeader = () => {
        return (
            <View style={{
                backgroundColor: 'rgba(255,198,47,0.1)',
                marginBottom: Pixel.getPixel(10),
                height: Pixel.getPixel(34),
                flexDirection: 'row',
                alignItems: 'center',
                width: width,
            }}>

                <Text style={{
                    marginLeft: Pixel.getPixel(15),
                    fontSize: Pixel.getFontPixel(12),
                    color: '#fa5741',
                }}>*请选择需要展期的还款</Text>
            </View>
        )
    }

    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {
        return (
            <View key={`${sectionID}-${rowId}`} style={{
                height: Pixel.getPixel(10),
                backgroundColor: FontAndColor.COLORA3,
            }}>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    handelWarper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width - Pixel.getPixel(30),
        flexDirection: 'row',
        backgroundColor: FontAndColor.COLORA3,
        marginBottom: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
    },
    container: {
        backgroundColor: '#ffffff'
    },
    containerTop: {
        flexDirection: 'row',
        height: adapeSize(76),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#f0eff5',
        borderBottomWidth: 0.5,
        marginLeft: adapeSize(15),
        marginRight: adapeSize(15)
    },
    containerBottom: {
        flexDirection: 'row',
        height: adapeSize(44),
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),
    },
    carInfoWarp: {
        flex: 0.8,
    },
    orderState: {
        width: adapeSize(25),
        height: adapeSize(25),
    },
    carType: {
        alignItems: 'flex-start',
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
        color: FontAndColor.COLORA0,
    },
    carFramNum: {
        fontSize: Pixel.getFontPixel(12),
        color: FontAndColor.COLORA1,
        marginTop: Pixel.getPixel(10),
    },
    orderNum: {
        marginLeft: adapeSize(15),
    },
    price: {
        color: FontAndColor.COLORB2,
    },
    buttonStyleRight: {
        height: adapeSize(44),
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: '#90a1b5'
    },
    buttonStyleLeft: {
        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginRight: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
        borderRadius: 5,
    },
})
