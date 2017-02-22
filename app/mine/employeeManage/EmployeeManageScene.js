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
var Pixel = new PixelUtil();
import ContractSign from '../contractManage/ContractSign';
import BaseComponent from "../../component/BaseComponent";
import NavigationBar from "../../component/NavigationBar";
// let Car = require('./Car.json');
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');

export default class EmployeeManageScene extends BaseComponent {
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
        };

    }

    addEmployee(){
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    centerText={'员工管理'}
                    rightTextShow={false}
                    rightImageShow={true}
                    rightImage={require('../../../images/employee_manage@3x.png')}
                    rightImageCallBack={this.addEmployee()}
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
            <View style={styles.rowView}>
                <View style={styles.rowLeft}>
                    <View style={{flexDirection: 'row'}}>
                    <Text style={styles.rowLeftTitle}>王先生</Text>
                        <View style={[styles.employeeStyle, selectionID==='1'&& {borderColor: fontAndClolr.COLORB3},selectionID==='2'&& {borderColor: fontAndClolr.COLORB1}]}>
                            <Text style={[styles.employeeText, selectionID==='1'&& {color: fontAndClolr.COLORB3},selectionID==='2'&& {color: fontAndClolr.COLORB1}]}>管理员</Text>
                        </View>
                    </View>
                    <Text style={styles.rowLeftTitle1}>第一车贷二手公司</Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.toNextPage({
                            name: 'ContractSign',
                            component: ContractSign,
                            params: {
                                show: true
                            },
                        })
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../../images/edit_icon@3x.png') } style={styles.image}/>
                        <Text style={styles.rowRightTitle}>编辑</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.toNextPage({
                            name: 'ContractSign',
                            component: ContractSign,
                            params: {
                                show: true
                            },
                        })
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../../images/check_iocn@3x.png') } style={styles.image}/>
                        <Text style={styles.rowRightTitle}>查看</Text>
                    </View>

                </TouchableOpacity>
            </View>

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
        height:Pixel.getPixel(83),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: fontAndClolr.COLORA4,
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    rowLeftTitle: {
        fontSize: Pixel.getFontPixel(15),
        color: fontAndClolr.COLORA0,
        marginRight:Pixel.getPixel(5)

    },
    rowLeftTitle1: {
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT24),
        color: fontAndClolr.COLORA1,
        marginTop: Pixel.getPixel(5)

    },
    rowLeft: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        flexDirection: 'column',
    },
    rowRightTitle: {
        color: fontAndClolr.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),

    },
    image: {
        marginRight: Pixel.getPixel(5),
        height:22,
        width:22
    },
    buttonStyle:{
        marginRight: Pixel.getPixel(15),
        justifyContent:'center',
        alignItems:'center'

    },
    employeeStyle:{
        borderWidth: 1,
        borderColor: fontAndClolr.COLORB4,
    },
    employeeText:{
        color: fontAndClolr.COLORB4,
        fontSize: Pixel.getPixel(12)
    }


});