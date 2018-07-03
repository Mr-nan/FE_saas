import React, {Component} from 'react';
import {

} from 'react-native';
import MyOrderInfoTitleLeftItem from "../mine/newOrder/component/MyOrderInfoTitleLeftItem";
import MyOrderQueRenLeftItem from "../mine/newOrder/component/MyOrderQueRenLeftItem";
import MyOrderInfoTimeItem from "../mine/newOrder/component/MyOrderInfoTimeItem";
import MyOrderInfoCarItem from "../mine/newOrder/component/MyOrderInfoCarItem";
import MyOrderInfoWuLiuItem from "../mine/newOrder/component/MyOrderInfoWuLiuItem";
import MyOrderPayItem from "../mine/newOrder/component/MyOrderPayItem";
import {View} from "react-native";

export default class GetOrderTextUtil {

    static getTitle (type) {

      if(type==1){
         return <MyOrderInfoTitleLeftItem/>
      }else if(type==2){
          return <MyOrderQueRenLeftItem/>
      }

    }


    static getScend (type) {

        if(type==1){
            return <MyOrderInfoTimeItem />
        }else if(type==2){
            return <MyOrderInfoWuLiuItem/>
        }

    }

    static getCar (type,callBack) {

        if(type==1){
            return  <MyOrderInfoCarItem type={type} name={"合计"}/>
        }else if(type==2){
            return <MyOrderInfoCarItem type={type} name={"成交价合计"} callBack={()=>{
                console.log(11111);
                callBack()}}/>
        }

    }

    static getPay (type) {

        if(type==1){
            return <View></View>
        }else if(type==2){
            return <MyOrderPayItem/>
        }

    }

}
