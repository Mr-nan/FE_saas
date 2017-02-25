import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    InteractionManager
} from  'react-native'

import * as fontAndClolr from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
import SignContractScene from '../contractManage/SignContractScene'
var Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
import NavigationBar from "../../component/NavigationBar";
import AccountInfoScene from '../accountManage/AccountInfoScene';
import BaseComponent from "../../component/BaseComponent";
// let Car = require('./Car.json');
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');

export default class AccountManageScene extends BaseComponent {

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
            renderPlaceholderOnly: 'blank',
        };

    }
    allRefresh = () => {
        this.setState({renderPlaceholderOnly: 'loading'});
    }

    getData=()=>{
        if('success'){
            this.setState({renderPlaceholderOnly: 'success'});
        }else{
            this.setState({renderPlaceholderOnly: 'error'});
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly!=='loading') {
            return ( <View style={styles.container}>
                <NavigationBar
                    centerText={'用户管理'}
                    rightText={''}
                    leftImageCallBack={this.backPage}
                />
                {this.loadView()}
            </View>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    centerText={'用户管理'}
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
                style={{marginTop:15}}
                onPress={() => {
                    console.log(rowID + "--" + selectionID)
                    this.toNextPage({
                        name: 'AccountInfoScene',
                        component: AccountInfoScene,
                        params: {show: false},
                    })
                }}>
                <View style={styles.rowView}>
                    <Image source={require('../../../images/edit_icon.png')} style={styles.leftImage}/>
                    <View style={styles.rowLeft}>
                        <Text style={styles.rowLeftTitle}>第一车贷二手车公司</Text>
                        <Text style={styles.rowLeftTitle1}>20161111</Text>
                    </View>
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
        marginTop: Pixel.getPixel(0)
    },
    rowView: {
        height: Pixel.getPixel(77),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    rowLeftTitle: {
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        color: fontAndClolr.COLORA0,

    },
    rowLeftTitle1: {
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        color: fontAndClolr.COLORA2,

    },
    rowLeft: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        flexDirection: 'column',
    },
    rowRightTitle: {
        marginRight: Pixel.getPixel(10),
        color: fontAndClolr.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),

    },
    image: {
        marginRight: Pixel.getPixel(15),
    },
    leftImage: {
        width: Pixel.getPixel(38),
        height: Pixel.getPixel(38),
        marginLeft: Pixel.getPixel(15)
    }


});