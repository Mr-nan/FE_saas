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
    
    // 判读定位是否开启
    if([CLLocationManager locationServicesEnabled]){
      
      // 判读是否允许程序获取位置权限
      if([CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedWhenInUse || [CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedAlways){
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
      }else{
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"打开 定位服务权限 来允许 第1车贷 确定您的位置" message:@"请在系统设置中开启定位服务(设置>隐私>定位服务>第1车贷>始终)" preferredStyle:UIAlertControllerStyleAlert];
        [alert addAction:[UIAlertAction actionWithTitle:@"去设置" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
          NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
          if([[UIApplication sharedApplication] canOpenURL:url]){
            [[UIApplication sharedApplication] openURL:url];
          }
        }]];
        [[UIApplication sharedApplication].delegate.window.rootViewController presentViewController:alert animated:YES completion:nil];
      }
      
    }else{
      
      UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"打开 定位服务 来允许 第1车贷 确定您的位置" message:@"请在系统设置中开启定位服务(设置>隐私>定位服务>第1车贷>始终)" preferredStyle:UIAlertControllerStyleAlert];
      [alert addAction:[UIAlertAction actionWithTitle:@"去设置" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        if([[UIApplication sharedApplication] canOpenURL:url]){
            [[UIApplication sharedApplication] openURL:url];
        }
      }]];
      [[[UIApplication sharedApplication] delegate].window.rootViewController presentViewController:alert animated:YES completion:nil];
    }
    
    
    
  });
}

@end
