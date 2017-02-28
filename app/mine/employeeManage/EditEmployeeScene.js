import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from  'react-native'

import * as FontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil';
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
import MyButton from '../../component/MyButton';
import SelectMaskComponent from './SelectMaskComponent'
import NavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
let ROWID = 0;
let ds = {};
let SECTIONID = 0;
let Pixel = new PixelUtil();
const Car = [
    {
        "cars": [
            {
                "title": "姓名",
                "name": "wangyang"
            },
            {
                "title": "性别",
                "name": "nv"
            },

        ],
        "title": "section0"
    },
    {
        "cars": [
            {
                "title": "所属公司",
                "name": "北京爱法克有限责任公司"
            },
            {
                "title": "角色",
                "name": "管理员"
            },
        ],
        "title": "section1"
    },
    {
        "cars": [
            {
                "title": "账号",
                "name": "12344566675"
            },
            {
                "title": "密码",
                "name": "888888888"
            },
            {
                "title": "确认密码",
                "name": "********"
            },

        ],
        "title": "section2"
    },


]

const {width, height} = Dimensions.get('window');

export default class EditEmployeeScene extends BaseComponent {
    // 构造
    constructor(props) {

        super(props);
        // 初始状态
        //    拿到所有的json数据
        let jsonData = Car;

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
        ds = new ListView.DataSource({
                getSectionData: getSectionData,
                getRowData: getRowData,
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        );

        this.xb = ['男', '女',];
        this.gongneng = ['guanliyuan', 'caiwu', 'tuanyuan'];
        this.gongsi = ['123', '234', '3345', 'wert', 'egs'];
        this.state = {
            source: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            maskSource: this.xb,
            rowdata: null,

        };
    }


    render() {
        return (
            <View style={styles.container}>
                {/**      导航栏          */}
                <NavigationView
                    backIconClick={this.backPage}
                    title="编辑员工"
                    renderRihtFootView={this._navigatorRightView}
                />

                {/*              蒙版选择器        */}
                <SelectMaskComponent viewData={[]} onClick={(rowID)=>this._onClick(rowID)}
                                     ref={(modal)=> {
                                         this.selectModal = modal
                                     }}/>

                { /**      界面listview          */}
                <ListView
                    style={styles.listStyle}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSectionHeader={this._renderSectionHeader}
                />

                {/**      注销按钮          */}
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'注销'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this._loginOut}/>

            </View>
        );
    }

    /**      注销按钮点击事件          */
    _loginOut = () => {
        alert("点击了注销按钮");

    }
    /**      导航栏完成按钮点击事件          */
    _completedForEdit = () => {
        for (let i = 0; i < Car.length; i++) {
            let cars = Car[i].cars;
            for (let j = 0; j < cars.length; j++) {
                if (cars[j].name <= 0) {
                    this.props.showToast("请输入" + Car[i].cars[j].title);
                    return;
                }
            }
        }
        if (Car[2].cars[1].name !== Car[2].cars[2].name) {
            this.props.showToast("两次输入的密码不同");
            return;
        }


    }
    /**      导航栏右侧按钮          */
    _navigatorRightView = () => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#ffffff',
                    width: Pixel.getPixel(53), height: Pixel.getPixel(27),
                    justifyContent: 'center', alignItems: 'center', borderRadius: 5
                }}
                activeOpacity={0.8} onPress={() => {
                this._completedForEdit()
            }}>
                <Text style={{
                    color: FontAndColor.COLORB0,
                    fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT30),
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                }}>完成</Text>
            </TouchableOpacity>
        );
    }

    /**      row的点击事件          */
    _rowAndSectionClick = (rowID, sectionID) => {
        ROWID = rowID;
        SECTIONID = sectionID;
        if (sectionID === 0 && rowID === 1) {
            this._openModal(this.xb);
        } else if (sectionID === 1 && rowID === 0) {
            this._openModal(this.gongsi);
        } else if (sectionID === 1 && rowID === 1) {
            this._openModal(this.gongneng);
        }
    }

    _openModal = (dt, rowId, sectionID) => {
        this.selectModal.changeData(dt);
        this.selectModal.openModal();
        this.currentData = dt;
    }
    /**      蒙版listview  点击选择,返回点击cell的id          */
    _onClick = (rowID) => {

        Car[SECTIONID].cars[ROWID].name = this.currentData[rowID];
        let jsonData = Car;

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
        ds = new ListView.DataSource({
                getSectionData: getSectionData,
                getRowData: getRowData,
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        );

        this.setState({
            source: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        });
    }


    // 每一行中的数据
    _renderRow = (rowData, sectionID, rowID) => {
        let HIDDEN;
        let PASSWORD;
        if ((sectionID === 0 && rowID === 0) || sectionID === 2) {
            HIDDEN = false;
        }
        else {
            HIDDEN = true;
        }

        if ((sectionID === 2 && rowID === 1) || (sectionID === 2 && rowID === 2)) {
            PASSWORD = true;
        }
        else {
            PASSWORD = false;
        }

        return (
            <TouchableOpacity onPress={()=>this._rowAndSectionClick(rowID, sectionID)
            }>
                <View style={styles.rowView}>

                    <Text style={styles.rowLeftTitle}>{rowData.title}</Text>
                    {HIDDEN ? <Text
                        style={[styles.rowRightTitle,]}>{this.state.rowdata ? this.state.rowdata : rowData.name}</Text> :
                        <TextInput ref={sectionID + rowID} defaultValue={rowData.name}
                                   placeholder={"请输入" + rowData.title } style={styles.inputStyle}
                                   onChangeText={(text)=>this._textChange(sectionID, rowID, text)}
                                   password={PASSWORD}

                        />}


                    <Image source={cellJianTou} style={styles.rowjiantouImage}/>


                </View>
            </TouchableOpacity>
        );
    }
    _textChange = (sectionID, rowID, text)=> {
        ROWID = rowID;
        SECTIONID = sectionID;
        Car[SECTIONID].cars[ROWID].name = text;
    }
    // 每一组对应的数据
    _renderSectionHeader(sectionData, sectionId) {
        return (
            <View style={styles.sectionView}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: FontAndColor.COLORA3,
    },
    listStyle: {
        marginTop: Pixel.getTitlePixel(64)
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: FontAndColor.COLORA3,
    },
    rowView: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: FontAndColor.COLORA4,
        borderBottomWidth: 1,
    },
    rowLeftTitle: {
        marginLeft: Pixel.getPixel(15),
        width: 60,
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT28),
        color: FontAndColor.COLORA0,

    },
    rowRightTitle: {
        flex: 1,
        marginRight: Pixel.getPixel(5),
        color: FontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT28),
        textAlign: 'right',


    },
    inputStyle: {
        flex: 1,
        marginRight: Pixel.getPixel(5),
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT28),
        color: FontAndColor.COLORA0,


    },
    rowjiantouImage: {
        width: Pixel.getPixel(12),
        height: Pixel.getPixel(12),
        marginRight: Pixel.getPixel(15),

    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB2,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },


});