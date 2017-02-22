import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from  'react-native'

import * as fontAndClolr from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
import SignContractScene from '../contractManage/SignContractScene'
var Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou@2x.png');
import NavigationBar from "../../component/NavigationBar";
import CountInfoScene from '../CountInfoScene';
import BaseComponent from "../../component/BaseComponent";
// let Car = require('./Car.json');
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');

export default class ContractManageScene extends BaseComponent {
    initFinish = () => {
    }
    // 构造
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy'
            ]),
            show: true,
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    centerText={'合同管理'}
                    rightText={''}
                    leftImageCallBack={this.backPage}

                />


                <ListView
                    contentContainerStyle={styles.listStyle}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />

            </View>
        );
    }

    // 每一行中的数据
    _renderRow = (rowData, rowID, selectionID) => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    console.log(rowID+"--"+selectionID)
                    this.toNextPage({
                name: 'SignContractScene',
                component: SignContractScene,
                params: {rowID},
            })}}>
                <View style={styles.rowView} >
                    <Text style={styles.rowLeftTitle}>第一车贷是个公司</Text>
                    <Text style={styles.rowRightTitle} >7份合同</Text>
                    <Image source={cellJianTou} style={styles.image}></Image>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndClolr.COLORA3,
    },
    listStyle: {
        marginTop: Pixel.getPixel(15)
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndClolr.COLORA3,
    },
    rowView: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: fontAndClolr.COLORA4,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    rowLeftTitle: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        color: fontAndClolr.COLORA0,

    },
    rowRightTitle: {
        marginRight: Pixel.getPixel(10),
        color: fontAndClolr.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),

    },
    image:{
        marginRight:Pixel.getPixel(15),
    }


});