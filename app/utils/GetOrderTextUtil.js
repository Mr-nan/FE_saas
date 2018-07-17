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
import MyOrderDaiZhiFuLeftItem from "../mine/newOrder/component/MyOrderDaiZhiFuLeftItem";
import MyOrderDingJinSuccessLeftItem from "../mine/newOrder/component/MyOrderDingJinSuccessLeftItem";
import MyOrderWeiKuanPayItem from "../mine/newOrder/component/MyOrderWeiKuanPayItem";
import MyOrderShenHeLeftItem from "../mine/newOrder/component/MyOrderShenHeLeftItem";
import MyOrderTitleNotBottomItem from "../mine/newOrder/component/MyOrderTitleNotBottomItem";

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
            }else if (status == 6) {
                return  5
            }else if (status == 7) {
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
            return [1,3,4,6];
        }else if (type == 5) {
            return [1,3,4];
        }else if (type == 21) {
            return [1,2,3,4,5];
        }else if (type == 22) {
            return [1,2,3,4];
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
            return <MyOrderDingJinSuccessLeftItem/>
        } else if (type == 5) {
            return <MyOrderShenHeLeftItem/>
        }else if (type == 21) {
            return <MyOrderQueRenLeftItem/>
        }else if (type == 22) {
            return <MyOrderDaiZhiFuLeftItem/>
        }

    }

    static getTitleBottom(type,from,wuliu,callBack) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <View/>
        } else if (type == 2) {
            return <View/>
        } else if (type == 3) {
            return <View/>
        }else if (type == 4) {
            return <MyOrderTitleBottomItem wuliu={wuliu} callBack={()=>{
                callBack();
            }}/>
        }else if (type == 5) {
            return <MyOrderTitleNotBottomItem/>
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
        }else if (type == 22) {
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
        }else if (type == 5) {
            return <MyOrderInfoCarMarginItem data={carData} type={type} name={"成交价合计"} callBack={() => {
                callBack()
            }}/>
        }else if (type == 21) {
            return <MyOrderInfoCarItem data={carData} type={type} name={"成交价合计"} callBack={(topMoney,bottomMoney,model_id) => {
                callBack(topMoney,bottomMoney,model_id,1);
            }} changeNumber={(index) => {
                callBack(index,1,1,2);
            }} showToast={(content)=>{showToast(content);}} showModal={(show)=>{showModal(show);}}/>
        } else if (type == 22) {
            return <MyOrderInfoCarItem data={carData} type={type} name={"成交价合计"}/>
        }

    }

    static getPay(type,from,data,callBack,wuliu) {
        type =  this.getStatus(type,from);
        if (type == 1) {
            return <View></View>
        }else if (type == 2) {
            return <MyOrderPaySelectItem data={data} callBack={(types)=>{
                callBack(types);
            }}/>
        } else if (type == 3) {
            return <View></View>
        }else if (type == 4) {
            if(wuliu.name==''){
                return <MyOrderPayDingJinItem/>
            }else{
                return <MyOrderWeiKuanPayItem data={data}  callBack={(types)=>{
                    callBack(types);
                }}/>
            }
        } else if (type == 5) {
            return <View></View>
        } else if (type == 21) {
            let show = true;
            for (let i = 0;i<data.models.length;i++){
                if(data.models[i].car_items[0].v_type!=1){
                    for (let j = 0;j<data.models[i].car_items.length;j++){
                        if(data.models[i].car_items[i].car_vin_status==1||data.models[i].car_items[i].car_vin_status==0){
                            show = false;
                            return;
                        }
                    }
                }
            }
            if(show){
                return <MyOrderPayItem data={data} callBack={()=>{
                    callBack();
                }}/>
            }
            return <View></View>
        }else if (type == 22) {
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
        } else if (type == 5) {
            return <MyOrderInfoBottomMariginItem/>
        } else if (type == 21) {
            return <MyOrderInfoBottomItem/>
        }else if (type == 22) {
            return <MyOrderInfoBottomItem/>
        }

    }

}
