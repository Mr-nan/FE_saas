//
//  ZNMapManger.m
//  FE_Sass
//
//  Created by zhengnan on 2018/1/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZNMapManger.h"
#import "ZNMapViewController.h"
#import "AppDelegate.h"
#import <UIKit/UIKit.h>

@implementation ZNMapManger

RCT_EXPORT_MODULE();

/*
    cityName -城市名称
    addressName -地址名称
    locationData -地理坐标（latitude,longitude）
 */
RCT_EXPORT_METHOD(cityName:(NSString *)cityName AddressName:(NSString *)addressName LocationData:(NSDictionary *)locationData FindEvents:(RCTResponseSenderBlock)callback){
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    ZNMapViewController *mapVC = [[ZNMapViewController alloc]init];
    mapVC.mapPoiInfoBlock = ^(NSDictionary *poiInfo) {
      callback(@[[NSNull null],poiInfo]);
    };
    mapVC.cityName = cityName;
    mapVC.addressName = addressName;
    if(locationData){
      mapVC.pt = CLLocationCoordinate2DMake([[locationData objectForKey:@"latitude"] doubleValue], [[locationData objectForKey:@"longitude"] doubleValue]);
    }
    UINavigationController *nc = [[UINavigationController alloc]initWithRootViewController:mapVC];
    [[[UIApplication sharedApplication] delegate].window.rootViewController presentViewController:nc animated:YES completion:nil];
    
  });
}

@end
