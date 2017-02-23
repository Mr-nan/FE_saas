/**
 * Created by lhc on 2017/2/17.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import * as FontColor  from '../constant/fontAndColor'
import dismissKeyboard from 'dismissKeyboard';

export default class ModifyBorrowing extends Component{

    state={
     show:true
    }
    setModelVisible=()=>{

        this.setState({
            show:!this.state.show
        })
    }


    render(){

        return(

                <Modal animationType='none'
                       transparent={true}
                       visible={this.state.show}
                       onShow={() => {
                       }}
                       onRequestClose={() => {
                       }}
                >
                   <TouchableOpacity style={styles.mask} activeOpacity={1} onPress={()=>{
                       dismissKeyboard();
                   }}>
                    <View style={styles.container}>

                        <Text style={styles.title}>修改借款</Text>

                        <View style={styles.input}>
                        <TextInput style={styles.inputText} underlineColorAndroid={"#00000000"} placeholder='请输入借款金额' keyboardType='decimal-pad'></TextInput>
                        </View>
                        <View style={styles.showMessage}>

                            <Text style={styles.showMessageText}>*可借额度{3}-{360}万</Text>

                        </View>

                        <View style={styles.handelWarp}>

                            <TouchableOpacity style={[styles.button,styles.buttonLeft]} onPress={()=>{


                                this.setModelVisible();
                            }}>
                                <Text style={styles.text}>确认</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,styles.buttonRight]}onPress={()=>{
                                this.setModelVisible();

                            }}>
                                <Text style={styles.text}>取消</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                   </TouchableOpacity>
                </Modal>

        )
    }


}

const styles=StyleSheet.create({


    mask:{

        flex:1,
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor:'rgba(0,0,0,0.3)',
    },

    container:{

        backgroundColor:'white',
        alignItems:'center',
        marginLeft:40,
        marginRight:40,
        marginTop:100,
        borderRadius:5,
    },

    showMessage:{

        marginTop:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    showMessageText:{

        flex:1,
        marginLeft:20,
        fontSize:12,
        color:FontColor.COLORB4,
        paddingLeft:10,

    },


    title:{

        marginTop:20,
        fontSize:17,

    },
    input:{

        borderColor:'darkgray',
        borderWidth:0.5,
        height:44,
        marginLeft:20,
        marginTop:20,
        marginRight:20,
        borderRadius:5,
        flexDirection:'row'

    },
    inputText:{
        flex:1,
        fontSize:12,
        color:FontColor.COLORB4,
        paddingLeft:10,
    },

    handelWarp:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    button:{
        flex:1,
        alignItems:'center',
        padding:10,
        marginBottom:20,
        borderRadius:5,

    },
    buttonLeft:{
      marginLeft:20,
      marginRight:7,
      backgroundColor:FontColor.COLORB0,


    },

    buttonRight:{
        marginLeft:7,
        marginRight:20,
        backgroundColor:FontColor.COLORA2,
    },
    text:{
        textAlign:'center',
        color:'white',
}

})
