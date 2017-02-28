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
import NavigationView from '../../component/AllNavigationView';
import * as AppUrls from '../../constant/appUrls';
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
        request('http://dev.api-gateway.dycd.com/v1/user.employee/index', 'Post', {


        })
            .then((response) => {
             if(response.mjson.data==null || response.mjson.data.length<=0){
                 this.setState({renderPlaceholderOnly: 'null'});
             }else{
                 this.setState({
                     dataSource: ds.cloneWithRows(response.mjson.data)
                 });
                 this.setState({renderPlaceholderOnly: 'success'});
             }

                },
                (error) => {
                    console.log(error);
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
        alert("dianjile添加员工")
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.container}>
                    {/**      导航栏          */}

                    {this.loadView()}
                    <NavigationView
                        backIconClick={this.backPage}
                        title="员工管理"
                        renderRihtFootView={this._navigatorRightView}
                    />
                </View>
            );
        }
        return (
            <View style={styles.container}>

                {/**      导航栏          */}
                <NavigationView
                    backIconClick={this.backPage}
                    title="员工管理"
                    renderRihtFootView={this._navigatorRightView}
                />
                <ListView
                    style={styles.listStyle}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />

            </View>
        );
    }
    /**      导航栏右侧按钮          */
    _navigatorRightView = () => {
        return (
            <TouchableOpacity
                style={{

                    width: Pixel.getPixel(53), height: Pixel.getPixel(27),
                    justifyContent: 'center', alignItems: 'flex-end',

                }}
                activeOpacity={0.8} onPress={() => {
                this.addEmployee()
            }}>
                <Image source={require('../../../images/employee_manage.png')}/>
            </TouchableOpacity>
        );
    }
    // 每一行中的数据
    _renderRow = (rowData, rowID, selectionID) => {
        return (
            <View style={styles.rowView}>
                <View style={styles.rowLeft}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.rowLeftTitle}>{rowData.username}</Text>
                        <View
                            style={[styles.employeeStyle, rowData.role==='财务'&& {borderColor: fontAndClolr.COLORB3},rowData.role==='员工'&& {borderColor: fontAndClolr.COLORB1}]}>
                            <Text
                                style={[styles.employeeText, rowData.role==='财务'&& {color: fontAndClolr.COLORB3},rowData.role==='员工'&& {color: fontAndClolr.COLORB1}]}>{rowData.role}</Text>
                        </View>
                    </View>
                    <Text style={styles.rowLeftTitle1}>{rowData.company}</Text>
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
        marginTop:  Pixel.getTitlePixel(84),
    },
    rowView: {
        height: Pixel.getPixel(83),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: fontAndClolr.COLORA4,
        borderBottomWidth: 1,
    },
    rowLeftTitle: {
        fontSize: Pixel.getFontPixel(15),
        color: fontAndClolr.COLORA0,
        marginRight: Pixel.getPixel(5),

    },
    rowLeftTitle1: {
        fontSize: Pixel.getFontPixel(fontAndClolr.CONTENTFONT24),
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
        alignItems: 'center',
        paddingHorizontal: Pixel.getPixel(3),
        height:  Pixel.getPixel(17)
    },
    employeeText: {
        color: fontAndClolr.COLORB4,
        fontSize: Pixel.getPixel(11),
    }


});