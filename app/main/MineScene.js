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

import * as fontAndClolr from '../constant/fontAndColor';
import MycarScene from '../carSource/CarMySourceScene';
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();

import repayDetailsScene from '../mine/accountManage/repayDetailsScene'
import ContractManageScene from '../mine/contractManage/ContractManageScene';

import AccountManageScene from '../mine/accountManage/AccountManageScene'
import EmployeeManageScene from '../mine/employeeManage/EmployeeManageScene'
import CouponAllScene from '../mine/couponManage/CouponAllScene'
import Setting from './../mine/setting/Setting'
import  CarCollectSourceScene from '../carSource/CarCollectSourceScene';
import  BrowsingHistoryScene from '../carSource/BrowsingHistoryScene';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import EditEmployeeScene  from '../mine/employeeManage/EditEmployeeScene'
import ImageSource from '../publish/component/ImageSource';

var Platform = require('Platform');
import ImagePicker from "react-native-image-picker";

const cellJianTou = require('../../images/mainImage/celljiantou.png');
let Car = [
    {
        "cars": [
            {
                "icon": require('../../images/mainImage/zhanghuguanli.png'),
                "name": "账户管理"
            },
            {
                "icon": require('../../images/mainImage/yuangongguanli.png'),
                "name": "员工管理"
            },
        ],
        "title": "section0"
    },
    {
        "cars": [
            // {
            //     "icon": require('../../images/mainImage/youhuiquanguanli.png'),
            //     "name": "优惠券管理"
            // },
            {
                "icon": require('../../images/mainImage/hetongguanli.png'),
                "name": "合同管理"
            },
        ],
        "title": "section1"
    },
    {
        "cars": [
            {
                "icon": require('../../images/mainImage/myCarSource.png'),
                "name": "我的车源"
            },
            {
                "icon": require('../../images/mainImage/shoucangjilu.png'),
                "name": "收藏记录"
            },
            {
                "icon": require('../../images/mainImage/liulanlishi.png'),
                "name": "浏览历史"
            },

        ],
        "title": "section2"
    },
    {
        "cars": [
            {
                "icon": require('../../images/mainImage/shezhi.png'),
                "name": "设置"
            },
        ],
        "title": "section3"
    },
    {
        "cars": [
            {
                "icon": require('../../images/mainImage/shezhi.png'),
                "name": "blank"
            },
        ],
        "title": "section3"
    },
]


/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
const options = {
    //弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    quality: 1.0,
    maxWidth: 480,
    maxHeight: 800,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}
import BaseComponent from '../component/BaseComponent';

export default class MineSectionListView extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        //    拿到所有的json数据
         Car = [
            {
                "cars": [
                    {
                        "icon": require('../../images/mainImage/zhanghuguanli.png'),
                        "name": "账户管理"
                    },
                    {
                        "icon": require('../../images/mainImage/yuangongguanli.png'),
                        "name": "员工管理"
                    },
                ],
                "title": "section0"
            },
            {
                "cars": [
                    // {
                    //     "icon": require('../../images/mainImage/youhuiquanguanli.png'),
                    //     "name": "优惠券管理"
                    // },
                    {
                        "icon": require('../../images/mainImage/hetongguanli.png'),
                        "name": "合同管理"
                    },
                ],
                "title": "section1"
            },
            {
                "cars": [
                    {
                        "icon": require('../../images/mainImage/myCarSource.png'),
                        "name": "我的车源"
                    },
                    {
                        "icon": require('../../images/mainImage/shoucangjilu.png'),
                        "name": "收藏记录"
                    },
                    {
                        "icon": require('../../images/mainImage/liulanlishi.png'),
                        "name": "浏览历史"
                    },

                ],
                "title": "section2"
            },
            {
                "cars": [
                    {
                        "icon": require('../../images/mainImage/shezhi.png'),
                        "name": "设置"
                    },
                ],
                "title": "section3"
            },
            {
                "cars": [
                    {
                        "icon": require('../../images/mainImage/shezhi.png'),
                        "name": "blank"
                    },
                ],
                "title": "section3"
            },
        ]
        this.state = {
            renderPlaceholderOnly: 'blank'
        };
    }

    initFinish = () => {
        StorageUtil.mGetItem(StorageKeyNames.USER_INFO, (data) => {
            if (data.code == 1) {
                let user_list = [];
                let datas = JSON.parse(data.result);
                if (datas.user_level == 2) {
                    if (datas.enterprise_list[0].role_type == '1'||datas.enterprise_list[0].role_type == '6') {
                        user_list.push(...Car);
                    } else if (datas.enterprise_list[0].role_type == '2') {
                        Car[0].cars.splice(1,1);
                        user_list.push( Car[0],Car[1], Car[3], Car[4]);
                    } else {
                        user_list.push( Car[2], Car[3], Car[4]);
                    }
                } else if (datas.user_level == 1) {
                    if (datas.enterprise_list[0] == '1'||datas.enterprise_list[0] == '6') {
                        user_list.push( Car[0], Car[2], Car[3], Car[4]);
                    } else {
                        Car[0].cars.splice(1,1);
                        user_list.push( Car[0],Car[2], Car[3], Car[4]);

                    }
                } else {
                    if(datas.audit_status=='2'){
                        user_list.push( Car[2], Car[3], Car[4]);
                    }else{
                        user_list.push( Car[3], Car[4]);
                    }

                }
                let jsonData = user_list;

                //    定义变量
                let dataBlob = {},
                    sectionIDs = [],
                    rowIDs = [];
                for (let i = 0; i < jsonData.length; i++) {
                    //    1.拿到所有的sectionId
                    sectionIDs.push(i);

                    //    2.把组中的内容放入dataBlob内容中
                    dataBlob[i] = jsonData[i].title;

                    //    3.设置改组中每条数据的结构
                    rowIDs[i] = [];

                    //    4.取出改组中所有的数据
                    let cars = jsonData[i].cars;

                    //    5.便利cars,设置每组的列表数据
                    for (let j = 0; j < cars.length; j++) {
                        //    改组中的每条对应的rowId
                        rowIDs[i].push(j);

                        // 把每一行中的内容放入dataBlob对象中
                        dataBlob[i + ':' + j] = cars[j];
                    }
                }
                let getSectionData = (dataBlob, sectionID) => {
                    return dataBlob[sectionID];
                };

                let getRowData = (dataBlob, sectionID, rowID) => {
                    return dataBlob[sectionID + ":" + rowID];
                };
                let ds = new ListView.DataSource({
                        getSectionData: getSectionData,
                        getRowData: getRowData,
                        rowHasChanged: (r1, r2) => r1 !== r2,
                        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                    }
                );
                this.setState({
                    source: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                    name: datas.real_name,
                    phone: datas.phone,
                    headUrl: datas.head_portrait_url,
                    renderPlaceholderOnly: 'success'
                });
            } else {
                this.setState({
                    renderPlaceholderOnly: 'error'
                });
            }
        });
    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (

                <View style={styles.container}>

                    {this.loadView()}

                </View>
            )
        }
        return (

            <View style={styles.container}>
                <ImageSource galleryClick={this._galleryClick}
                             cameraClick={this._cameraClick}
                             ref={(modal) => {
                                 this.imageSource = modal
                             }}/>
                <ListView
                    contentContainerStyle={styles.listStyle}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSectionHeader={this._renderSectionHeader}
                    renderHeader={this._renderHeader}
                />

            </View>
        )
    }

    navigatorParams = {

        name: 'AccountManageScene',
        component: AccountManageScene,
        params: {}
    }

    _navigator(rowData) {
        switch (rowData.name) {
            case '账户管理':
                this.navigatorParams.name = 'AccountManageScene'
                this.navigatorParams.component = AccountManageScene
                break;
            case '优惠券管理':
                this.navigatorParams.name = 'CouponAllScene'
                this.navigatorParams.component = CouponAllScene
                break;
            case '积分管理':
                break;
            case '合同管理':
                this.navigatorParams.name = 'ContractManageScene'
                this.navigatorParams.component = ContractManageScene
                break;
            case '员工管理':
                this.navigatorParams.name = 'EmployeeManageScene'
                this.navigatorParams.component = EmployeeManageScene
                break;
            case '我的车源':
                this.navigatorParams.name = 'MycarScene'
                this.navigatorParams.component = MycarScene
                break;
            case '收藏记录':
                this.navigatorParams.name = 'CarCollectSourceScene'
                this.navigatorParams.component = CarCollectSourceScene
                break;
            case '浏览历史':
                this.navigatorParams.name = 'BrowsingHistoryScene'
                this.navigatorParams.component = BrowsingHistoryScene
                break;
            case '设置':
                this.navigatorParams.name = 'Setting'
                this.navigatorParams.component = Setting
                break;

        }
        this.props.callBack(this.navigatorParams);
    }

    // 每一行中的数据
    _renderRow = (rowData) => {
        if (rowData.name == 'blank') {
            return (
                <View style={{width: width, height: Pixel.getPixel(2), backgroundColor: fontAndClolr.COLORA3}}></View>
            );
        } else {
            return (
                <TouchableOpacity style={styles.rowView} onPress={() => {
                    this._navigator(rowData)
                }}>

                    <Image source={rowData.icon} style={styles.rowLeftImage}/>

                    <Text style={styles.rowTitle}>{rowData.name}</Text>

                    <Image source={cellJianTou} style={styles.rowjiantouImage}/>


                </TouchableOpacity>
            );
        }

    }

    // 每一组对应的数据
    _renderSectionHeader(sectionData, sectionId) {
        return (
            <View style={styles.sectionView}>
            </View>
        );
    }

    _renderHeader = () => {
        return (
            <View style={styles.headerViewStyle}>
                <TouchableOpacity style={[styles.headerImageStyle]} onPress={() => this.selectPhotoTapped()}>
                    <Image
                        source={this.state.headUrl == '' ? require('../../images/mainImage/whiteHead.png') : this.state.headUrl}
                        style={{
                            width: Pixel.getPixel(65),
                            height: Pixel.getPixel(65), resizeMode: 'stretch'
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerNameStyle}>
                    {this.state.name}
                </Text>
                <Text style={styles.headerPhoneStyle}>
                    {this.state.phone}
                </Text>
            </View>
        )
    }

    selectPhotoTapped = () => {
        if (Platform.OS == 'android') {
            this._rePhoto();
        } else {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                } else {
                    let source = {uri: response.uri};
                    this.setState({
                        headUrl: source,
                    });
                }
            });
        }
    }

    _labelPress = () => {
        this.imageSource.openModal();
    };

    _rePhoto = () => {
        this.imageSource.openModal();
    };

    _cameraClick = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                let source = {uri: response.uri};
                this.setState({
                    headUrl: source,
                });
            }
        });
    }

    _galleryClick = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                let source = {uri: response.uri};
                this.setState({
                    headUrl: source,
                });
            }
        });
    }

}


const styles = StyleSheet.create({


    headerViewStyle: {

        height: Pixel.getPixel(210),
        width: width,
        backgroundColor: fontAndClolr.COLORB0,
        alignItems: 'center',

    },
    headerImageStyle: {

        width: Pixel.getPixel(65),
        height: Pixel.getPixel(65),
        marginTop: Pixel.getPixel(55),
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerNameStyle: {

        color: 'white',
        fontSize: Pixel.getFontPixel(15),
        marginTop: Pixel.getPixel(15),
        marginBottom: Pixel.getPixel(10),
        fontWeight: 'bold'
    },
    headerPhoneStyle: {
        color: 'white',
        fontSize: Pixel.getFontPixel(12)
    },
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndClolr.COLORA3,
    },
    listStyle: {},
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndClolr.COLORA3,
        justifyContent: "center"
    },
    sectionTitle: {
        marginLeft: 16,
    },
    rowView: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: fontAndClolr.COLORA4,
        borderBottomWidth: 1
    },
    rowLeftImage: {
        width: Pixel.getPixel(26),
        height: Pixel.getPixel(26),
        marginLeft: Pixel.getPixel(15),
    },
    rowjiantouImage: {
        width: Pixel.getPixel(15),
        height: Pixel.getPixel(15),
        marginRight: Pixel.getPixel(15),

    },
    rowTitle: {
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndClolr.LITTLEFONT28),
        marginLeft: Pixel.getPixel(20),
        color: fontAndClolr.COLORA1,

    }


});