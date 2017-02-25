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
var carYearArr =new Map();
var mileageArr =new Map();
import BaseComponent from '../component/BaseComponent';
export default class CollectionIntent extends BaseComponent {

    initFinish = () => {

    }

    constructor(props) {
        super(props);
        this.state = {
            arr: [{
                name: 'A6L',
                isSelected: false,
                value: 1
            }, {
                name: '大众',
                isSelected: true,
                value: 2
            }, {
                name: '思域',
                isSelected: true,
                value: 3
            }, {
                name: '高尔夫',
                isSelected: false,
                value: 4
            },{
                name: '帕萨特',
                isSelected: false,
                value: 4
            }],
            arr1: [{
                name: '1年以内',
                isSelected: false,
                value: 1
            }, {
                name: '1-3年',
                isSelected: false,
                value: 2
            }, {
                name: '3-5年',
                isSelected: false,
                value: 3
            }, {
                name: '5-8年',
                isSelected: false,
                value: 4
            }, {
                name: '8-10年',
                isSelected: true,
                value: 5
            }, {
                name: '10年以上',
                isSelected: false,
                value: 6
            }],
            arr2: [{
                name: '1万公里以内',
                isSelected: false,
                value: 1
            }, {
                name: '1-3万公里',
                isSelected: false,
                value: 2
            }, {
                name: '3-5万公里',
                isSelected: false,
                value: 3
            }, {
                name: '5-8万公里',
                isSelected: false,
                value: 4
            }, {
                    name: '8-10万公里',
                    isSelected: false,
                    value: 4
                }, {
                    name: '10万公里以上',
                    isSelected: false,
                    value: 5
                }]
        };
        this.selectConfirm = this.selectConfirm.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

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
    }
    countItem(item, array) {//获取车龄区间或里程区间选中的个数
        let index = array.findIndex(a => a === item);
        if(array===this.state.arr1){
            if (array[index].isSelected){
                if (carYearArr.has(index)){
                    carYearArr.delete(index)
                }
            }else{
                carYearArr.set(index , array[index].name);
            }
            for (let key of carYearArr.keys()) {
                console.log(key +'--'+  carYearArr.get(key));
            }
        }else if(array===this.state.arr2){
            if (array[index].isSelected){
                if (mileageArr.has(index)){
                    mileageArr.delete(index)
                }
            }else{
                mileageArr.set(index , array[index].name);
            }
            for (let key of mileageArr.keys()) {
                console.log(key +'--'+ mileageArr.get(key));
            }
        }
        array[index].isSelected = !array[index].isSelected;
    }

    render() {
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
                                *品牌、车系
                            </Text>
                            <Text style={{fontSize: 15, marginRight: 10, color: FontAndColor.COLORA2}} onPress={() => {
                                this.select.setModalVisible(true)
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
                            onConfirm={this.selectConfirm}
                        >
                            {this.state.arr.filter(item => item.isSelected).map((item, index) =>
                                <LabelSelect.Label
                                    key={'label-' + index}
                                    data={item}
                                    onCancel={() => {
                                        this.deleteItem(item);
                                    }}
                                >{item.name}</LabelSelect.Label>
                            )}
                            {this.state.arr.filter(item => !item.isSelected).map((item, index) =>
                                <LabelSelect.ModalItem
                                    key={'modal-item-' + index}
                                    data={item}
                                >{item.name}</LabelSelect.ModalItem>
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
                                    onCancel={() => {
                                        this.countItem(item, this.state.arr1);
                                    }}
                                >{item.name}</LabelSelect.Label>
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
                                    onCancel={() => {
                                        this.countItem(item, this.state.arr2);
                                    }}
                                >{item.name}</LabelSelect.Label>
                            )}
                        </LabelSelect>
                    </View>
                    <Text style={styles.bottomText}>根据您提报的收车意向，我们会给您相关车源。请关注首页意向车源。</Text>
                    <TouchableOpacity style={styles.btnStyle}
                                      >
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


