/**
 * Created by zhengnan on 17/2/9.
 */

import React,{Component} from 'react';

import {
    StyleSheet,
    ListView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,


} from 'react-native';

import HeadView     from './carSourceSelectHeadView';
import SGListView   from 'react-native-sglistview';
import CarCell      from './carCell';

const carAgeSource = [
    {
        title:'1年以内' ,
        checked:false,
    },
    {
        title:'3年以内' ,
        checked:false,
    },
    {
        title:'5年以内' ,
        checked:false,
    },
    {
        title:'8年以内' ,
        checked:false,
    },
    {
        title:'10年以内' ,
        checked:false,
    },

];

const carKMSource = [
    {
        title:'不限',
        checked:false,
    },
    {
        title:'1万公里以内',
        checked:false,
    },
    {
        title:'3万公里以内' ,
        checked:false,
    },
    {
        title:'5万公里以内' ,
        checked:false,
    },
    {
        title:'10万公里以内' ,
        checked:false,
    },
    {
        title:'10万公里以上',
        checked:false,
    },

];

export  default  class  carSourceListScene extends  Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const carSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id });


        this.state = {

            dataSource:carSource.cloneWithRows(['h1','h2','h3','h4','h5','h6','h6']),
            checkedSource:carAgeSource,
            isHide:true,
            currentCheckedIndex:1,

        };

    }

    //  筛选条件选择
    _headViewOnPres = (index,isHighlighted,setImgHighlighted)=> {


        if(index===1) return;
        this.refs.headView.checkSelect(this.state.currentCheckedIndex);

        let {checkedSource} = this.state;
        if(!isHighlighted)
        {

            switch(index) {
                case 1:

                    break;
                case 2:
                    checkedSource = carAgeSource;
                    break;
                case 3:
                    checkedSource = carKMSource;
                    break;
                default:
                    break;
            }
        }

        this.setState({

            checkedSource,
            isHide:isHighlighted,
            currentCheckedIndex: index,
        });

        setImgHighlighted(!isHighlighted);


    };



    _onPres = (str)=>{

        alert(str);

    };

    render(){
        return(

            <View style={styles.contaier}>
                <View style={styles.contaier}>
                    <View style={{top:0,height:64,backgroundColor:'#22C4C1'}}/>
                    <View style={{height:40}}>
                        <HeadView ref="headView" onPres={this._headViewOnPres}/>
                    </View>

                    <SGListView
                        dataSource={this.state.dataSource}
                        ref={'carListView'}
                        initialListSize={10}
                        stickyHeaderIndices={[]}
                        onEndReachedThreshold={1}
                        scrollRenderAheadDistance={1}
                        pageSize={1}
                        renderRow={(item) =>
                            <CarCell style={styles.carCell} carMainText={item} carSubText="1111111" onPress={this._onPres}/>
                        }/>
                </View>

                {
                    this.state.isHide ?(null):(
                        <View style={[styles.selectView]}>
                            <View style={{backgroundColor:'white'}}>
                                <ScrollView>
                                    {
                                        this.state.checkedSource.map((data,index)=>{

                                            return(
                                                <View style={styles.checkedCell} key={index}>
                                                    <Text   style={styles.checkedCellText} >{data.title}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>)
                }
            </View>

        )

    }


}


const styles = StyleSheet.create({

    contaier:{
        flex:1,
    },
    selectView:{
        top:104,
        backgroundColor:'rgba(0, 0, 0,0.3)',
        left:0,
        right:0,
        position:'absolute',
        bottom:0,
    },
    carCell:{
        height :110,
    },
    checkedCell:{

        backgroundColor:'white',
        height:44,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#C3C3C3',

    },
    checkedCellText:{

        fontSize:15,
        textAlign:'center'

    }

});