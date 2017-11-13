//
//  LocationViewController.m
//  FE_Sass
//
//  Created by 余金忠 on 2017/10/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//



#import "Location.h"
#import "AppDelegate.h"
#import "LLMapViewController.h"




@implementation Location
{
  LLMapViewController *location;
}

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(Location,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^{
    
//   location=[[LLMapViewController alloc]init];
//
////    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//    location.JsBolock=^(NSString*successInfo,NSString* error){
//
//      if (successInfo) {
//        resolve(@{
//                  @"scan_result":successInfo,
//                  @"scan_hand":error
//                  });
//
//      }else{
//        reject(@"back",@"I am back" ,[NSError errorWithDomain:error code:191 userInfo:@{}]);
//      }
//
//
//
//    };
//
////    [app.window.rootViewController presentViewController:[[UINavigationController alloc]initWithRootViewController:location] animated:YES completion:nil];
//
    
    
    
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    
    [[LLMapViewController sharedLLMapViewController] getCurrentLocation:^( NSDictionary *result,NSString* error) {
      if (error) {
        NSLog(@"定位出错,错误信息:%@",error);
        reject(@"back",@"I am back" ,[NSError errorWithDomain:error code:191 userInfo:@{}]);
      }else{
        
        resolve(@{
                  @"address":result[@"address"],
                  @"city_id":result[@"city_id"],
                  @"city_name":result[@"city_name"],
                  @"street_name":result[@"street_name"],
                  @"province_name":result[@"province_name"],
                  @"area_name":result[@"area_name"],
                  });
    
        
      }
    } onViewController:app.window.rootViewController];
  });
  
}
@end
