/**
 * Created by lhc on 2017/2/22.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';


import {LendDatePike,LendInputItem,CommenButton} from './component/ComponentBlob'
import {adapeSize,width,height,PAGECOLOR}from './component/MethodComponent';
export default class CGDDetailSence extends Component{

    constructor(props) {
        super(props);
        // 初始状态
        const  ds= new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});

        this.state = {

            dataSource:ds.cloneWithRows(this.genRows({})),

        }
    }
    genRows=(pressData)=>{

        let dataBlob=[];
        for (let i=0;i<31;i++){

            let pressText= pressData[i]?'(X)':'';
            dataBlob.push('cell'+i+pressText);

        }
        return dataBlob;

    }

    renderRow = (rowData,sectionId,rowID)=>{

        return(
            <TouchableOpacity onPress={()=>this.pressRow(rowID)} underlayColor='aqua'>

                <View>
                    <Text style={{padding:30}}>{rowData}</Text>

                </View>

            </TouchableOpacity>
        )

    }
    render(){

        return(
            <View style={styles.container}>

                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
                <View style={styles.bottomView}>
                    <CommenButton buttonStyle={styles.buttonStyleRight} onPress={()=>{}} title='查看合同'/>
                    <CommenButton buttonStyle={styles.buttonStyleRight} onPress={()=>{}} title='车辆监控'/>
                    <CommenButton buttonStyle={styles.buttonStyleRight} onPress={()=>{}} title='车辆监控'/>

                </View>

            </View>

        )
    }
}

const styles=StyleSheet.create({

    container:{

        flex:1,
        backgroundColor:'white'

    },
    listView:{

        marginTop:64,
        marginBottom:adapeSize(55)


    },
    bottomView:{
        bottom:0,
        width:width,
        height:adapeSize(50),
        position:'absolute',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    buttonStyleRight:{

        height: adapeSize(32),
        width:adapeSize(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#05c5c2',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'white',
        marginRight:adapeSize(15),

    },


})