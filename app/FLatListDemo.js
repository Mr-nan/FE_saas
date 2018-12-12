import React,{Component} from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableHighlight,
    Platform,
    StyleSheet,
} from 'react-native'

export default class FLatListDemo extends Component {

    constructor(prpos)
    {
        super(prpos);
        this.state={
            listDataSource:[
                {t:"yang创建任务"},
                {t:'tt'},
                {t: '如何动态控制item的高度高度高度高度高度高度高度高度高度高度高度高度'}]
        }
    }

    ListHeaderView=()=>{
        return(
            <View style={{backgroundColor:'white'}}>
                <Text style={[styles.headerTitle,{marginTo:15}]}>指派人:</Text>
                <Text style={[styles.headerText,{marginTo:15}]}>yang:</Text>
                <Text style={[styles.headerTitle,{marginTo:40}]}>审核人:</Text>
                <Text style={[styles.headerText,{marginTo:40}]}>yang:</Text>
                <Text style={[styles.headerTitle,{marginTo:65}]}>任务标题:</Text>
                <Text style={[styles.headerText,{marginTo:65}]}>我的任务</Text>
                <Text style={[styles.headerTitle,{marginTo:90}]}>任务描述</Text>
                <Text style={[styles.headerText,{marginTo:90}]}>任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述.......</Text>
            </View>
        )
    }

    ListCell=(itemData)=> {
        /*style={styles.cellText}*/
        return(
            <View >
                <Text style={styles.cellText}>
                    任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述......
                </Text>
            </View>
        )
    }

    render(){
        return(
            <FlatList style={{flex:1,backgroundColor:'#d2d2d2',top:50}}
                      ListHeaderComponent={this.ListHeaderView}
                      data={this.state.listDataSource}
                      renderItem={this.ListCell}/>
        )
    }
}

let styles = StyleSheet.create({
    headerTitle:{
        position:'absolute',
        top:15,
        color:"#d2d2d2",
        width:100,
    },

    headerText:{
        position:'absolute',
        left:100,
    },
    cellText:{
        left:15,
        top:15,
        width:400,
    }
});

