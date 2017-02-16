/**
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    AppRegistry
} from 'react-native';
import LabelSelect from './LabelSelect/LabelSelect';
import NavigationBar from "../component/NavigationBar";

export default class CollectionIntent extends Component {
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
            }],
            arr1: [{
                name: '1年以内',
                isSelected: false,
                value: 1
            }, {
                name: '1-3年',
                isSelected: true,
                value: 2
            }, {
                name: '3-5年',
                isSelected: true,
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
                isSelected: true,
                value: 2
            }, {
                name: '3-5万公里',
                isSelected: true,
                value: 3
            }, {
                name: '5-10万公里以内',
                isSelected: false,
                value: 4
            }, {
                name: '10万公里以上',
                isSelected: true,
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

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    centerText={'收车意向'}
                    rightText={'提交'}
                    leftImageCallBack={this.backPage}
                    rightTextCallBack={() => {
                        alert("提交")
                    }}
                />
                <View style={ [styles.container, {marginHorizontal: 10}]}>
                    <View style={{flexDirection:'row', marginTop: 15}}>
                        <Text style={styles.carSelect}>
                            *品牌、车系
                        </Text>
                        <Text style={{fontSize: 17}} onPress={()=>{this.select.setModalVisible(true)}}>
                            请选择>
                        </Text>
                    </View>
                    <LabelSelect
                        title="Checkbox"
                        ref={(select)=>{this.select = select}}
                        style={styles.labelSelect}
                        readOnly= {false}
                        onConfirm={this.selectConfirm}
                    >
                        {this.state.arr.filter(item => item.isSelected).map((item, index) =>
                            <LabelSelect.Label
                                key={'label-' + index}
                                data={item}
                                onCancel={() => {this.deleteItem(item);}}
                            >{item.name}</LabelSelect.Label>
                        )}
                        {this.state.arr.filter(item => !item.isSelected).map((item, index) =>
                            <LabelSelect.ModalItem
                                key={'modal-item-' + index}
                                data={item}
                            >{item.name}</LabelSelect.ModalItem>
                        )}
                    </LabelSelect>
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
                            >{item.name}</LabelSelect.Label>
                        )}
                    </LabelSelect>
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
                            >{item.name}</LabelSelect.Label>
                        )}
                    </LabelSelect>
                </View>
                <Text style={styles.bottomText}>根据您提报的收车意向，我们会给您相关车源。请关注首页意向车源。</Text>
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
        marginTop: 5,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: 'rgb(13, 131, 144)'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    headerStyle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#9e9e9e',
        alignItems: 'center'
    },
    headerText: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center'
    },
    headerR: {
        fontSize: 17,
        color: 'blue',
        marginRight: 10
    },
    carSelect: {
        flex: 1,
        fontSize: 17
    },
    carType: {
        fontSize: 17,
        marginTop: 10
    },
    bottomText: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 20
    }
});


