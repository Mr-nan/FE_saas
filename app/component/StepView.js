/**
 * Created by hanmeng on 2017/5/9.
 */

import React, {Component, PureComponent} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager,
    TouchableWithoutFeedback
} from 'react-native';

const {width, height} = Dimensions.get('window');
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../constant/fontAndColor';

export default class StepView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            nodeQuantity: 3
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let select = [true, false, false];
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(select),
            });
        });
    }

    render() {
        return (<View style={styles.container}>
            <ListView style={{backgroundColor: fontAndColor.COLORA3}}
                      dataSource={this.state.dataSource}
                      renderRow={this._renderRow}
                      enableEmptySections={true}/>
        </View>);
    }

    _renderRow = (rowData, selectionID, rowID) => {
        if (rowData) {
            return (
                <View style={[{
                    width: Pixel.getPixel(15),
                    height: Pixel.getPixel(15),
                    backgroundColor: '#B3EDED',
                    borderRadius: 10,
                    marginTop: Pixel.getPixel(20)
                }]}/>
            );
        } else {
            return (
                <View style={[{
                    width: Pixel.getPixel(10),
                    height: Pixel.getPixel(10),
                    backgroundColor: '#05C5C2',
                    borderRadius: 10,
                    marginTop: Pixel.getPixel(2.5),
                    marginLeft: Pixel.getPixel(2.5)
                }]}/>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    listStyle: {
        marginTop: Pixel.getPixel(15)
    },
    sectionView: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORA3,
    },
    rowView: {
        height: 44,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: fontAndColor.COLORA4,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    rowLeftTitle: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA0,

    },
    rowRightTitle: {
        marginRight: Pixel.getPixel(10),
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),

    },
    image: {
        marginRight: Pixel.getPixel(15),
    }


});