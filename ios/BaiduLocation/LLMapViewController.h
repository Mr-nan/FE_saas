//
//  LLMapViewController.h
//  BaiduMap
//
//  Created by WangZhaomeng on 2017/6/13.
//  Copyright © 2017年 MaoChao Network Co. Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Singleton.h"
#import <CoreLocation/CoreLocation.h>

#import <BaiduMapAPI_Base/BMKBaseComponent.h>//引入base相关所有的头文件

#import <BaiduMapAPI_Map/BMKMapComponent.h>//引入地图功能所有的头文件

#import <BaiduMapAPI_Search/BMKSearchComponent.h>//引入检索功能所有的头文件

#import <BaiduMapAPI_Cloud/BMKCloudSearchComponent.h>//引入云检索功能所有的头文件

#import <BaiduMapAPI_Location/BMKLocationComponent.h>//引入定位功能所有的头文件

#import <BaiduMapAPI_Utils/BMKUtilsComponent.h>//引入计算工具所有的头文件

#import <BaiduMapAPI_Radar/BMKRadarComponent.h>//引入周边雷达功能所有的头文件

#import <BaiduMapAPI_Map/BMKMapView.h>//只引入所需的单个头文件

typedef void (^LocateResultInfoBlock)(NSDictionary* result,NSString* error);

@interface LLMapViewController : NSObject
//单例对象
single_interface(LLMapViewController)

@property (nonatomic,strong)LocateResultInfoBlock JsBolock;





/**
 *  直接通过代码块获取用户位置信息
 *
 *  @param block 定位block代码块
 */
-(void)getCurrentLocation:(LocateResultInfoBlock )block onViewController:(UIViewController *)viewController;
@end
