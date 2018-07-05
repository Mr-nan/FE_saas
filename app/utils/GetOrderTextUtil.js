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
import MyOrderTitleBottomItem from "../mine/newOrder/component/MyOrderTitleBottomItem";
import MyOrderDingJinLeftItem from "../mine/newOrder/component/MyOrderDingJinLeftItem";
import MyOrderInfoCarMarginItem from "../mine/newOrder/component/MyOrderInfoCarMarginItem";
import MyOrderInfoBottomItem from "../mine/newOrder/component/MyOrderInfoBottomItem";
import MyOrderInfoBottomMariginItem from "../mine/newOrder/component/MyOrderInfoBottomMariginItem";
import MyOrderPayDingJinItem from "../mine/newOrder/component/MyOrderPayDingJinItem";

export default class GetOrderTextUtil {

    static getTitle (type) {

      if(type==1){
         return <MyOrderInfoTitleLeftItem/>
      }else if(type==2){
          return <MyOrderQueRenLeftItem/>
      }else if(type==3){
          return <MyOrderDingJinLeftItem/>
      }

    }
    static getTitleBottom (type) {

        if(type==1){
            return <View/>
        }else if(type==2){
            return <View/>
        }else if(type==3){
            return <MyOrderTitleBottomItem/>
        }

    }

    static getScend (type) {

        if(type==1){
            return <MyOrderInfoTimeItem />
        }else if(type==2){
            return <MyOrderInfoWuLiuItem/>
        }else if(type==3){
            return <View/>
        }

    }

    static getCar (type,callBack) {

        if(type==1){
            return  <MyOrderInfoCarItem type={type} name={"合计"}/>
        }else if(type==2){
            return <MyOrderInfoCarItem type={type} name={"成交价合计"} callBack={()=>{
                console.log(11111);
                callBack()}}/>
        }else if(type==3){
            return <MyOrderInfoCarMarginItem type={type} name={"成交价合计"} callBack={()=>{
                console.log(11111);
                callBack()}}/>
        }

    }

    static getPay (type) {

        if(type==1){
            return <View></View>
        }else if(type==2){
            return <MyOrderPayItem/>
        }else if(type==3){
            return <MyOrderPayDingJinItem/>
        }

    }

    static getBottom (type) {

        if(type==1){
            return <MyOrderInfoBottomItem></MyOrderInfoBottomItem>
        }else if(type==2){
            return <MyOrderInfoBottomItem/>
        }else if(type==3){
            return <MyOrderInfoBottomMariginItem/>
        }

    }

}
