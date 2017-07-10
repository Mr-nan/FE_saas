/**
 * Created by zhengnan on 2017/7/6.
 */

import  {request}           from '../../utils/RequestUtil';
import *as appUrls from '../../constant/appUrls';

let DeployData = {};

export const getCarDeployData =(showLoadAction,showToastAction,fetchDeployDataAction)=>{

console.log('****************1');
    if(Object.keys(DeployData).length ){
        console.log('****************2');

        fetchDeployDataAction(DeployData);

    }else {
        console.log('****************3');

        showLoadAction(true);
        request(appUrls.CAR_CONFIG,'post',{}).then((response) => {
            DeployData = response.mjson.data;
            fetchDeployDataAction(response.mjson.data);
            showLoadAction(false);
        }, (error) => {
            showLoadAction(false);
            showToastAction(error.msg);
        });
    }
}
