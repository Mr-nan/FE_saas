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
var Pixel = new PixelUtil();
import {request} from '../../utils/RequestUtil';
import SeeEmployeeInfoScene from '../employeeManage/SeeEmployeeInfoScene';
import AddEmployeeScene from '../employeeManage/AddEmployeeScene';
import EditEmployeeScene from '../employeeManage/EditEmployeeScene';

import BaseComponent from "../../component/BaseComponent";
import NavigationBar from "../../component/NavigationBar";
import * as AppUrls from '../../constant/appUrls';
// let Car = require('./Car.json');
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');

export default class EmployeeManageScene extends BaseComponent {
    initFinish = () => {
        this.getData();
    }
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank',
        };

    }

    getData = () => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        request(AppUrls.USER_EMPLOYE, 'Post', {})
            .then((response) => {
                    this.setState({
                        dataSource: ds.cloneWithRows(response.mjson.data)
                    });
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    addEmployee() {
        this.toNextPage({
            name: 'AddEmployeeScene',
            component: AddEmployeeScene,
            params: {
                show: true
            },
        })
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.container}>
                    <NavigationBar
                        centerText={'员工管理'}
                        rightTextShow={false}
                        rightImageShow={true}
                        rightImage={require('../../../images/employee_manage.png')}
                    />
                    {this.loadView()}
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    centerText={'员工管理'}
                    rightTextShow={false}
                    rightImageShow={true}
                    rightImage={require('../../../images/employee_manage.png')}
                    rightImageCallBack={()=>{this.addEmployee()}}
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
                        <View
                            style={[styles.employeeStyle, selectionID==='1'&& {borderColor: fontAndClolr.COLORB3},selectionID==='2'&& {borderColor: fontAndClolr.COLORB1}]}>
                            <Text
                                style={[styles.employeeText, selectionID==='1'&& {color: fontAndClolr.COLORB3},selectionID==='2'&& {color: fontAndClolr.COLORB1}]}>管理员</Text>
                        </View>
                    </View>
                    <Text style={styles.rowLeftTitle1}>第一车贷二手公司</Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.toNextPage({
                            name: 'EditEmployeeScene',
                            component: EditEmployeeScene,
                            params: {
                                show: true
                            },
                        })
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../../images/edit_icon.png') } style={styles.image}/>
                        <Text style={styles.rowRightTitle}>编辑</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.toNextPage({
                            name: 'SeeEmployeeInfoScene',
                            component: SeeEmployeeInfoScene,
                            params: {
                                show: true
                            },
                        })
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../../images/check_iocn.png') } style={styles.image}/>
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
        height: Pixel.getPixel(83),
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
        marginRight: Pixel.getPixel(5)

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
        height: 22,
        width: 22
    },
    buttonStyle: {
        marginRight: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center'

    },
    employeeStyle: {
        borderWidth: 1,
        borderColor: fontAndClolr.COLORB4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    employeeText: {
        color: fontAndClolr.COLORB4,
        fontSize: Pixel.getPixel(12),
    }


});