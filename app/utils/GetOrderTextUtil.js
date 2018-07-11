import React, {Component} from 'react';
import {} from 'react-native';
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
import MyOrderInfoYiDingJiaItem from "../mine/newOrder/component/MyOrderInfoYiDingJiaItem";
import MyOrderPaySelectItem from "../mine/newOrder/component/MyOrderPaySelectItem";
import MyOrderInfoZhiFuZhongItem from "../mine/newOrder/component/MyOrderInfoZhiFuZhongItem";
import MyOrderInfoCarChangeItem from "../mine/newOrder/component/MyOrderInfoCarChangeItem";

export default class GetOrderTextUtil {

    static getStatus(status, from) {
        if (from == 1) {
            if (status == 0) {
                return  1
            } else if (status == 1) {
                return  1
            } else if (status == 2) {
                return  2
            } else if (status == 4) {
                return  2
            } else if (status == 3) {
                return  3
            } else if (status == 5) {
                return  4
            }
        }else{
            if (status == 0) {
                return  21
            } else if (status == 1) {
                return  21
            }else if (status == 2) {
                return  22
            }else if (status == 3) {
                return  22
            }else if (status == 4) {
                return  22
            }
        }
    }

    static getList(type,from) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return [1,2,3,4];
        } else if (type == 2){
            return [1,2,3,4,6];
        } else if (type == 3) {
            return [1,2,3,4];
        } else if (type == 4) {
            return [1,2,3,4];
        }else if (type == 21) {
            return [1,2,3,4,5];
        }

    }


    static getTitle(type,from) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <MyOrderInfoTitleLeftItem/>
        } else if (type == 2){
            return <MyOrderInfoYiDingJiaItem/>
        } else if (type == 3){
            return <MyOrderInfoYiDingJiaItem/>
        }else if (type == 4) {
            return <MyOrderQueRenLeftItem/>
        } else if (type == 5) {
            return <MyOrderDingJinLeftItem/>
        }else if (type == 21) {
            return <MyOrderQueRenLeftItem/>
        }

    }

    static getTitleBottom(type,from) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <View/>
        } else if (type == 2) {
            return <View/>
        } else if (type == 3) {
            return <View/>
        }else if (type == 4) {
            return <MyOrderTitleBottomItem/>
        } else if (type == 21) {
            return <View/>
        }

    }

    static getScend(type,from,data) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <MyOrderInfoTimeItem data={data}/>
        } else if (type == 2) {
            return <MyOrderInfoTimeItem data={data}/>
        } else if (type == 3) {
            return <MyOrderInfoZhiFuZhongItem/>
        }else if (type == 4) {
            return <MyOrderInfoWuLiuItem/>
        }else if (type == 21) {
            return <MyOrderInfoWuLiuItem/>
        }

    }

    static getCar(type, from,carData,callBack,showToast,showModal) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <MyOrderInfoCarItem data={carData} type={type} name={"合计"}/>
        } else if (type == 2) {
            return <MyOrderInfoCarItem data={carData} type={type} name={"合计"}/>
        }  else if (type == 3) {
            return <MyOrderInfoCarItem data={carData} type={type} name={"合计"}/>
        }else if (type == 4) {
            return <MyOrderInfoCarMarginItem data={carData} type={type} name={"成交价合计"} callBack={() => {
                callBack()
            }}/>
        }else if (type == 21) {
            return <MyOrderInfoCarItem data={carData} type={type} name={"成交价合计"} callBack={(topMoney,bottomMoney,model_id) => {
                callBack(topMoney,bottomMoney,model_id,1);
            }} changeNumber={(index) => {
                callBack(index,1,1,2);
            }} showToast={(content)=>{showToast(content);}} showModal={(show)=>{showModal(show);}}/>
        }

    }

    static getPay(type,from,data) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <View></View>
        }else if (type == 2) {
            return <MyOrderPaySelectItem data={data}/>
        } else if (type == 3) {
            return <View></View>
        }else if (type == 4) {
            return <MyOrderPayItem data={data}/>
        } else if (type == 5) {
            return <MyOrderPayDingJinItem/>
        } else if (type == 21) {
            return <View></View>
        }

    }

    static getBottom(type,from) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <MyOrderInfoBottomItem></MyOrderInfoBottomItem>
        } else if (type == 2) {
            return <MyOrderInfoBottomItem/>
        } else if (type == 3) {
            return <MyOrderInfoBottomItem/>
        }else if (type == 4) {
            return <MyOrderInfoBottomMariginItem/>
        } else if (type == 21) {
            return <MyOrderInfoBottomItem/>
        }

    }

}
