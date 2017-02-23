/**
 * Created by Administrator on 2017/2/10.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
}from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');


export default class AutoOperation extends Component{

    constructor(props){
        super(props);
        this.state = {
            operate:false,
            renderPlaceholderOnly: true
        }
    }

    componentWillMount(){

    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    componentWillUnmount(){

    }

    _labelPress = ()=>{
        this.setState((preState,pros)=>({
            operate:!preState.operate
        }));
    };
    _renderPlaceholderView = ()=>{
        return(<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background} />);
    };

    _onBack = ()=>{
        this.props.onBack();
    };

    _renderRihtFootView = ()=>{
        return(
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{}}>
                <Text style={styles.rightTitleText}>完成</Text>
            </TouchableOpacity>
        );
    };

    render(){
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return(
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='选择营运方式'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView} />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[ !this.state.operate ? styles.selectContainer:styles.circleContainer,styles.contentTop]}
                        onPress={()=>{this._labelPress()}}>
                        <View style={styles.center}>
                            <Text style={!this.state.operate ? styles.selectText :styles.unselectText}>非营运</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[this.state.operate ? styles.selectContainer:styles.circleContainer,styles.contentAlign]}
                        onPress={()=>{this._labelPress()}}>
                        <View style={styles.center}>
                            <Text style={this.state.operate ? styles.selectText :styles.unselectText}>营运</Text>
                        </View>
                    </TouchableOpacity>
                </Image>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'transparent'
    },
    imgContainer:{
        width:width,
        backgroundColor:'transparent',
        alignItems:'center'
    },
    contentTop:{
        marginTop:Pixel.getPixel(166)
    },
    contentAlign:{
        marginTop:Pixel.getPixel(40)
    },
    circleContainer:{
        width:Pixel.getPixel(210),
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#FFFFFF',
        borderRadius:Pixel.getPixel(22),
        backgroundColor:'rgba(255,255,255,0.2)'
    },
    selectContainer:{
        width:Pixel.getPixel(210),
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:Pixel.getPixel(22),
        backgroundColor:'#FFFFFF'
    },
    unselectText:{
        fontSize:Pixel.getFontPixel(15),
        color:'#FFFFFF'
    },
    selectText:{
        fontSize:Pixel.getFontPixel(15),
        color:fontAndColor.COLORB0
    },
    center:{
        alignItems:'center',
        justifyContent:'center'
    },
    wrapStyle:{
        backgroundColor:'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }
});
