/**
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    AppRegistry,
    TouchableOpacity
} from 'react-native';
import LabelSelect from './LabelSelect/LabelSelect';
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
var Pixel = new PixelUtil();

import BaseComponent from '../component/BaseComponent';
import CarBrandSelectScene  from './../carSource/CarBrandSelectScene';
import  {request}from '../utils/RequestUtil';
import * as AppUrls from "../constant/appUrls";
let isHeadInteraction = false;
export default class CollectionIntent extends BaseComponent {

    initFinish = () => {
        this.readData();
    }

    loadData = () => {
        let yearArr = [];
        let mileArr = [];
        if (this.brandSeriesArr.length == 0 && this.carYearArr.size == 0 && this.mileageArr.size == 0) {
            this.props.showToast("请选择收车意向");
        }else if (this.carYearArr.size > 5) {
            this.props.showToast('车龄区间最多只能选五个');
        }else if (this.mileageArr.size > 5) {
            this.props.showToast('里程区间最多只能选五个');
        } else {
            if(this.carYearArr.size>0){

                for (let key of this.carYearArr.keys()) {
                    yearArr.push(this.carYearArr.get(key))
                }
            }
            if(this.mileageArr.size>0){

                for (let key of this.mileageArr.keys()) {
                    mileArr.push(this.mileageArr.get(key))
                }
            }

            console.log(yearArr.toString());
            console.log(mileArr.toString());
            let url = AppUrls.BASEURL + 'v1/receiveIntention/save';
            request(url, 'post', {

                brand_series: this.brandSeriesArr.toString(),
                cotys: yearArr.toString(),
                mileages: mileArr.toString()

            }).then((response) => {

                console.log(response);
                if (response.mjson.code == '1') {

                    this.props.showToast("提交成功");
                    this.backPage();
                }

            }, (error) => {

                console.log(error);

            });

        }
    }

    readData = () => {
        let url = AppUrls.BASEURL + 'v1/receiveIntention/index';
        request(url, 'post', {}).then((response) => {

            console.log(response);
            if (response.mjson.data == null) {
                this.setState({renderPlaceholderOnly: 'null'});
            } else {
                if (response.mjson.code == '1') {
                    this.setState({renderPlaceholderOnly: 'success'});
                    if(response.mjson.data != null){

                        this.getSelectedItems(this.state.arr1, response.mjson.data.coty, this.carYearArr);
                        this.getSelectedItems(this.state.arr, response.mjson.data.brand_series, this.brandSeriesArr);
                        this.getSelectedItems(this.state.arr2, response.mjson.data.mileage, this.mileageArr);
                    }
                } else {
                    this.props.showToast(response.mjson.msg);
                }
            }

        }, (error) => {
            this.setState({renderPlaceholderOnly: 'error'});
            console.log(error);

        });

    }

    getSelectedItems(arrs, items, params) {
        if (items.length > 0) {
            for (let item of items) {
                console.log(item);
                if (arrs == this.state.arr) {// 车系

                    params.push(item.value);
                    this.state.arr.push({
                        title: item.name,
                        isSelected: true,
                    });
                } else {
                    params.set(item.id, item.id + '|' + item.value);
                    arrs[item.id].isSelected = true;
                }
            }
            if (arrs == this.state.arr) {

                this.selectConfirm(this.state.arr);
            } else if (arrs == this.state.arr1) {
                this.setState({arr1: this.state.arr1});
            } else {
                this.setState({arr2: this.state.arr2});
            }

        }
        console.log(params);
    }

    constructor(props) {
        super(props);
        this.carYearArr = new Map();
        this.mileageArr = new Map();
        this.brandSeriesArr = [];
        this.isAdd = false;
        isHeadInteraction = this.props.isHeadInteraction;
        this.state = {
            renderPlaceholderOnly: 'blank',
            arr: [],
            arr1: [{
                title: '1年以内',
                isSelected: false,
                value: '0|1'
            }, {
                title: '1-3年',
                isSelected: false,
                value: '1|3'
            }, {
                title: '3-5年',
                isSelected: false,
                value: '3|5'
            }, {
                title: '5-8年',
                isSelected: false,
                value: '5|8'
            }, {
                title: '8-10年',
                isSelected: false,
                value: '8|10'
            }, {
                title: '10年以上',
                isSelected: false,
                value: '10|0'
            }],
            arr2: [{
                title: '1万公里以内',
                isSelected: false,
                value: '0|1'
            }, {
                title: '1-3万公里',
                isSelected: false,
                value: '1|3'
            }, {
                title: '3-5万公里',
                isSelected: false,
                value: '3|5'
            }, {
                title: '5-8万公里',
                isSelected: false,
                value: '5|8'
            }, {
                title: '8-10万公里',
                isSelected: false,
                value: '8|10'
            }, {
                title: '10万公里以上',
                isSelected: false,
                value: '10|0'
            }],
        };
        this.selectConfirm = this.selectConfirm.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }

    //  选择车型
    checkedCarClick = (carObject) => {
// {brand_id: 2, series_id: 2446, series_name: "拉共达Taraf", model_id: 29702, model_name: "2015款 拉共达Taraf 6.0L 标准型"}
        console.log(carObject);

        for (let i = 0; i < this.brandSeriesArr.length; i++) {
            if ((this.brandSeriesArr[i].split('|', 1)) == (carObject.brand_id)) {
                if ((this.brandSeriesArr[i].split('|', 2)[1]) == '0' || carObject.series_id === '0') {

                    this.props.showToast('一个品牌只能选一次');
                    return;
                } else if ((this.brandSeriesArr[i].split('|', 2)[1])==(carObject.series_id)) {
                    this.props.showToast('一个品牌的相同车型只能选一次');
                    return;
                }
            }
        }
        if (carObject.series_id == '' || carObject.series_id == '0') {
            this.brandSeriesArr.push(carObject.brand_id + '|' + 0);
            this.state.arr.push({
                title: carObject.brand_name,
                isSelected: true,
            });
        } else {
            this.brandSeriesArr.push(carObject.brand_id + '|' + carObject.series_id);
            this.state.arr.push({
                title: carObject.series_name,
                isSelected: true,
            });
        }
        this.selectConfirm(this.state.arr);
        this.isAdd = false;
    }

    navigatorParams = {
        title: "CarBrandSelectScene",
        component: CarBrandSelectScene,
        params: {
            checkedCarClick: this.checkedCarClick,
            status: 0,
            isHeadInteraction: true,
            isCheckedCarModel: true,
        }

    }

    selectConfirm(list) {
        let {arr} = this.state;
        for (let item of list) {
            let index = arr.findIndex(ele => ele === item);
            if (~index) arr[index].isSelected = true;
            else continue;
        }
        this.setState({arr: arr});
    }

    deleteItem(item) {
        let {arr} = this.state;
        let index = arr.findIndex(a => a === item);
        arr[index].isSelected = false;
        this.setState({arr: arr});
        this.brandSeriesArr.splice(index, 1);
        this.state.arr.splice(index, 1);
    }

    countItem(item, array) {//获取车龄区间或里程区间选中的个数
        let index = array.findIndex(a => a === item);
        console.log(item.isSelected + '---' + index);
        if (array === this.state.arr1) {
            if (item.isSelected) {
                if (this.carYearArr.has(index+'')) {
                    console.log('----');
                    this.carYearArr.delete(index+'')
                }
            } else {
                this.carYearArr.set(index, index + '|' + array[index].value);

            }
            console.log(this.carYearArr);
        } else if (array === this.state.arr2) {
            if (item.isSelected) {
                if (this.mileageArr.has(index+'')) {
                    this.mileageArr.delete(index+'')
                }
            } else {
                this.mileageArr.set(index, index + '|' + array[index].value);
            }
            console.log(this.mileageArr);
        }
        array[index].isSelected = !array[index].isSelected;
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return (
                <View style={styles.container}>
                    <NavigationBar
                        centerText={'收车意向'}
                        rightText={''}
                        leftImageCallBack={this.backPage}

                    />
                    {this.loadView()}
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <NavigationBar
                        centerText={'收车意向'}
                        rightText={''}
                        leftImageCallBack={this.backPage}

                    />
                    <View style={ styles.container1}>
                        <View style={styles.containerChild}>
                            <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(10)}}>
                                <Text style={styles.carSelect}>
                                    品牌、车系
                                </Text>
                                <Text style={{fontSize: 15, marginRight: 10, color: FontAndColor.COLORA2}}
                                      onPress={() => {
                                          if (this.brandSeriesArr.length >= 5) {
                                              this.props.showToast("车系最多只能选5个");
                                          } else {
                                              this.toNextPage(this.navigatorParams)
                                          }
                                      }}>
                                    请选择>
                                </Text>
                            </View>
                            <LabelSelect
                                title="Checkbox"
                                ref={(select) => {
                                    this.select = select
                                }}
                                style={styles.labelSelect}
                                readOnly={false}
                                isBigSize={true}
                                onConfirm={this.selectConfirm}
                            >
                                {this.state.arr.filter(item => item.isSelected).map((item, index) =>
                                    <LabelSelect.Label
                                        key={'label-' + index}
                                        data={item}
                                        enables={true}
                                        onCancel={() => {
                                            this.deleteItem(item);
                                        }}
                                    >{item.title}</LabelSelect.Label>
                                )}
                                {this.state.arr.filter(item => !item.isSelected).map((item, index) =>
                                    <LabelSelect.ModalItem
                                        key={'modal-item-' + index}
                                        data={item}
                                    >{item.title}</LabelSelect.ModalItem>
                                )}
                            </LabelSelect>
                        </View>
                        <View style={styles.containerChild}>
                            <Text style={styles.carType}>车龄区间（单位：年）</Text>
                            <LabelSelect
                                style={styles.labelSelect}
                                title="Checkbox"
                                readOnly={true}
                            >
                                {this.state.arr1.map((item, index) =>
                                    <LabelSelect.Label
                                        key={'label-' + index}
                                        data={item}
                                        enables={item.isSelected}
                                        onCancel={() => {
                                            this.countItem(item, this.state.arr1);
                                        }}
                                    >{item.title}</LabelSelect.Label>
                                )}
                            </LabelSelect>
                        </View>
                        <View style={styles.containerChild}>
                            <Text style={styles.carType}>里程区间（单位：万公里）</Text>
                            <LabelSelect
                                style={styles.labelSelect}
                                title="Checkbox"
                                readOnly={true}
                                isBigSize={true}
                            >
                                {this.state.arr2.map((item, index) =>
                                    <LabelSelect.Label
                                        key={'label-' + index}
                                        data={item}
                                        enables={item.isSelected}
                                        onCancel={() => {
                                            this.countItem(item, this.state.arr2);
                                        }}
                                    >{item.title}</LabelSelect.Label>
                                )}
                            </LabelSelect>
                        </View>
                        <Text style={styles.bottomText}>根据您提报的收车意向，我们会推荐相关车源，请关注首页意向车源。</Text>
                        <TouchableOpacity style={styles.btnStyle}
                                          onPress={() => this.loadData('')}>
                            <Text style={{
                                color: FontAndColor.COLORA3,
                                fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT),
                                textAlign: 'center'
                            }}>提交</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     padding: 10,
    //     alignItems: 'flex-start',
    //     backgroundColor: '#e3eeee'
    // },
    labelSelect: {
        marginTop: Pixel.getPixel(10),
    },
    text: {
        fontSize: Pixel.getPixel(16),
        color: 'rgb(13, 131, 144)'
    },
    container: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3
    },
    container1: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3,
        paddingTop: Pixel.getPixel(10),
    },
    carSelect: {
        flex: 1,
        fontSize: Pixel.getPixel(17)
    },
    carType: {
        fontSize: Pixel.getPixel(17),
        marginTop: Pixel.getPixel(10)
    },
    bottomText: {
        marginHorizontal: Pixel.getPixel(10),
    },
    containerChild: {
        backgroundColor: '#ffffff',
        height: Pixel.getPixel(125),
        paddingLeft: Pixel.getPixel(12),
        marginBottom: Pixel.getPixel(10)
    },
    btnStyle: {
        height: Pixel.getPixel(40),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(40),
        borderRadius: 3,
        marginHorizontal: Pixel.getPixel(15),
        justifyContent: 'center'
    },
});


