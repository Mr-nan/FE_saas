/**
 * from @liusai
 *
 **/
import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity
}from 'react-native';

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const scan = require('../../../images/publish/scan.png');
const arrow = require('../../../images/publish/date-select.png');

export default class ModelSelect extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    _scanPress = ()=>{

    };

    _modelPress = ()=>{

    };
    render(){
        return(
            <View style={styles.container}>
                <Image source={background} style={[styles.container,{height:height-this.props.barHeight}]}>
                    <View style={[styles.circleContainer,styles.vinCircle]}>
                        <Text style={[styles.fontMain,styles.leftText]}>车架号</Text>
                        <TextInput style={[styles.fontMain,styles.fillSpace]} underlineColorAndroid='transparent'/>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._scanPress()}}>
                            <View style ={styles.center}>
                                <Text style={[styles.fontMain,styles.rightText]}>扫描</Text>
                                <Image style={styles.imgContainer} source={scan}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.fontHint}>建议您扫描登记证或行驶证上的车架号</Text>
                    <TouchableOpacity
                        style={[styles.circleContainer,styles.modelCircle]}
                        activeOpacity={0.6}
                        onPress={()=>{this._modelPress()}}>
                        <View style={styles.rowCenter}>
                            <Text style={[styles.fontMain,styles.leftText]}>请选择车型</Text>
                            <Text style={[styles.fontMain,styles.fillSpace]} />
                            <Image style={styles.imgContainer} source={arrow}/>
                        </View>
                    </TouchableOpacity>
                </Image>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'transparent'
    },
    vinCircle:{
        marginTop:209
    },
    modelCircle:{
        marginTop:45
    },
    circleContainer:{
        height:44,
        flexDirection:'row',
        marginHorizontal:35,
        borderColor:'#FFFFFF',
        borderWidth:1,
        borderRadius:22,
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.2)',
    },
    leftText:{
        marginLeft:20,
    },
    rightText:{
        marginRight:7
    },
    fontMain:{
        color:'#FFFFFF',
        fontSize:14
    },
    fontHint:{
        marginTop:10,
        marginLeft:55,
        color:'#FFFFFF',
        fontSize:12,
        opacity:0.6,
    },
    imgContainer:{
        width:18,
        height:18,
        marginRight:20
    },
    fillSpace:{
        flex:1,
    },
    center:{
        flexDirection:'row'
    },
    rowCenter:{
        flexDirection:'row',
        alignItems:'center'
    }
});

