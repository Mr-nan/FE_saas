/**
 * Created by lhc on 2017/2/21.
 */
//车辆展期


import React, {Component,PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';


import {CommenButton} from './component/ComponentBlob'
import {adapeSize,fontadapeSize,width} from './component/MethodComponent'

class CarOverdueCell extends PureComponent{


    render(){
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.containerTop}>
                    <View style={styles.carInfoWarp}>
                        <Text  numberOfLines={2} style={styles.carType}>奥迪A7(进口) 2014款 35 FSI 技术形 </Text>
                        <Text style={styles.carFramNum}>车牌号:京2321312312312</Text>
                    </View>
                    <Image style={styles.orderState} source={require('../../../images/financeImages/dateIcon.png')}/>

                </View>
                <View style={styles.containerBottom}>
                    <Text style={styles.orderNum}>20123123213~21312312312</Text>
                    <Text style={styles.price}> 按时打算打算打打</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


export  default class CarOverdue extends Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          //
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
          this.state = {
              dataSource: ds.cloneWithRows(['1','2','3','4','5']),
          }
      }



      renderRow=(rowData)=>{


          return(<CarOverdueCell/>)


      }

    renderHeader = ()=>{

        return (
            <View style={{backgroundColor:'rgba(255,198,47,0.1)',height:adapeSize(24),flex:1,flexDirection:'row',alignItems:'center'} }>

               <Text style={{marginLeft:adapeSize(15),fontSize:fontadapeSize(12),color:'#fa5741',}}>*请选择需要展期的还款</Text>
            </View>
        )

    }
    renderSeparator =(sectionID,rowId,adjacentRowHighlighted)=>{

        return (
            <View key={`${sectionID}-${rowId}`} style={{
                height:adjacentRowHighlighted?adapeSize(10):adapeSize(10),
                backgroundColor:adjacentRowHighlighted?'#f0eff5' : '#CCCCCC'
            }}>
            </View>
        )
    }

      render(){

          return(
              <View style={{backgroundColor:'white',marginTop:44}}>
              <ListView
                  style={{marginBottom:70}}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  renderHeader={this.renderHeader}
                  renderSeparator={this.renderSeparator}
              />

               <View style={styles.handelWarper}>

                  <CommenButton textStyle={{color:'white'}} buttonStyle={styles.buttonStyleLeft} onPress={()=>{

                  }} title="申请展期"/>
                   <CommenButton textStyle={{color:'white'}} buttonStyle={styles.buttonStyleRight} onPress={()=>{

                   }} title="取消"/>
               </View>

              </View>
          )

      }
}


const styles=StyleSheet.create({

    handelWarper:{
        height: adapeSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(16),
        width: width,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },

    container:{

       height:adapeSize(120),
       marginTop:adapeSize(10),

       backgroundColor:'white'
    },
    containerTop:{

        flexDirection:'row',
        height:adapeSize(76),
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomColor:'#f0eff5',
        borderBottomWidth:0.5,
        marginLeft:adapeSize(15),
        marginRight:adapeSize(15)
    },

    containerBottom:{

        flexDirection:'row',
        height:adapeSize(44),
        justifyContent:'space-between',
        alignItems:'center',

    },

    carInfoWarp:{

        flex:0.8,


    },
    orderState:{
        width:adapeSize(25),
        height:adapeSize(25),
        marginLeft:adapeSize(10),
    },

    carType:{

        alignItems:'flex-start',

    },
    carFramNum:{
        marginTop:adapeSize(10),
    },

    orderNum:{

        marginLeft:adapeSize(15),

    },

    price:{

        marginRight:adapeSize(15),
    },

    buttonStyleRight:{

        height: adapeSize(44),
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        marginRight:5,
        borderRadius:5,
        backgroundColor:'#90a1b5'

    },
    buttonStyleLeft:{

        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginRight: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        marginLeft:5,
        borderRadius:5,
    },
})
