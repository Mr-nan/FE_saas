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
    TouchableOpacity
}from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');


export default class AutoOperation extends Component{

    constructor(props){
        super(props);
        this.state = {
            operate:false
        }
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    _labelPress = ()=>{
        this.setState((preState,pros)=>({
            operate:!preState.operate
        }));
    };

    render(){
        return(
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
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
        marginTop:205
    },
    contentAlign:{
        marginTop:40
    },
    circleContainer:{
        width:210,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#FFFFFF',
        borderRadius:22,
        backgroundColor:'rgba(255,255,255,0.2)'
    },
    selectContainer:{
        width:210,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:22,
        backgroundColor:'#FFFFFF'
    },
    unselectText:{
        fontSize:15,
        color:'#FFFFFF'
    },
    selectText:{
        fontSize:15,
        color:fontAndColor.COLORB0
    },
    center:{
        alignItems:'center',
        justifyContent:'center'
    }
});
