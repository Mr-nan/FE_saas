import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
var Pixel = new PixelUtil();
export default class HomeJobButton extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            source:[]
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={{width:width,backgroundColor:fontAndColor.COLORA3}}>
                <View style={{width:width,backgroundColor:'#fff',
                marginBottom:Pixel.getPixel(10),alignItems: 'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(15),
                        fontWeight: 'bold',marginTop:Pixel.getPixel(16)}}>推荐车源</Text>

                    <ListView
                        removeClippedSubviews={false}
                        dataSource={this.state.source}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeparator}
                    />
                </View>
            </View>

        );
    }

    _renderRow = (movie) => {

        return (
            <TouchableOpacity onPress={()=>{
                this.props.callBack(movie.loan_id,movie.loan_number,movie.type);
            }} activeOpacity={0.8} style={[styles.allBack]}>

            </TouchableOpacity>

        )
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }
}