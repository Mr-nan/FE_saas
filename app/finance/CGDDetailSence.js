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


import {LendDatePike,LendInputItem,adapeSize,width,height,FEColor,CommenButton} from './ComponentBlob'

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
                <View style={styles.bottomView}></View>

            </View>

        )
    }
}

const styles=StyleSheet.create({

    container:{

        flex:1,
        backgroundColor:'yellow'

    },
    listView:{

        marginTop:64,
        marginBottom:60


    },
    bottomView:{
        top:height-60,
        width:width,
        height:60,
        position:'absolute',
        backgroundColor:'blue'

    }



})