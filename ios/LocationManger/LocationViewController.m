//
//  LocationViewController.m
//  FE_Sass
//
//  Created by 余金忠 on 2017/10/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//



#import "LocationViewController.h"
#import "XWLocationManager.h"
#import "AppDelegate.h"
@implementation LocationViewController
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(Location,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];

    [[XWLocationManager sharedXWLocationManager] getCurrentLocation:^(CLLocation *location, CLPlacemark *placeMark, NSString *error) {
      if (error) {
        NSLog(@"定位出错,错误信息:%@",error);
        reject(@"back",@"I am back" ,[NSError errorWithDomain:error code:191 userInfo:@{}]);
      }else{
        
        resolve(@{
                                    @"locate_result":placeMark.name,
                                    @"locate_result2":placeMark.thoroughfare,
                                    @"locate_result3":placeMark.subThoroughfare,
                                    @"locate_result4":placeMark.locality,
                                    @"locate_result5":placeMark.subLocality,

//                                    placeMark.name,//亮马桥路35号
//                                    placeMark.thoroughfare,//亮马桥路
//                                    placeMark.subThoroughfare,//35号
//                                    placeMark.locality,//北京市
//                                    placeMark.subLocality,//朝阳区
//                                    placeMark.administrativeArea,
//                                    placeMark.subAdministrativeArea,
//                                    placeMark.postalCode,
//                                    placeMark.ISOcountryCode,//CN
//                                    placeMark.country,//中国
//                                    placeMark.inlandWater,
//                                    placeMark.ocean

                                    });
       
        
        NSLog(@"定位成功:经度:%@ 纬度:%@ 当前地址:%@  \n location详细信息:%@ \n ",placeMark.subLocality, placeMark.locality, placeMark.name, placeMark);
       
      }
    } onViewController:app.window.rootViewController];

    
   
  });
  
}
@end
