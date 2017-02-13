/**
 * Created by zhengnan on 17/2/9.
 */

import React,{Component} from 'react';

import {
    StyleSheet,
    ListView,
    View,

} from 'react-native';

import HeadView     from './carSourceSelectHeadView';
import SGListView   from 'react-native-sglistview';
import CarCell      from './carCell';


export  default  class  carSourceListScene extends  Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id });
        this.state = {
            dataSource:ds.cloneWithRows(['h1','h2','h3','h4','h5','h6','h6'])

        };
    }
    render(){

        return(

        <View style={styles.contaier}>

            <View style={{height:50}}>
                <HeadView/>

            </View>
                <SGListView
                    dataSource={this.state.dataSource}
                    ref={'listview'}
                    initialListSize={1}
                    stickyHeaderIndices={[]}
                    onEndReachedThreshold={1}
                    scrollRenderAheadDistance={1}
                    pageSize={1}
                    renderRow={(item) =>
                        <View style={styles.cell}>

                            <CarCell carMainText={item} carSubText="1111111" />

                        </View>
                    }

                />
                </View>

        )

    }

}




const styles = StyleSheet.create({

 contaier:{

     flex:1,
     marginTop:64,

 },
    cell:{

        height :110,
    }

});