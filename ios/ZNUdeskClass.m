//
//  ZNUdeskClass.m
//  FE_Sass
//
//  Created by zhengnan on 2018/11/6.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "ZNUdeskClass.h"
#import "Udesk.h"
#import <UIKit/UIKit.h>
@implementation ZNUdeskClass

RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(openUdsk:(NSDictionary *)userData){
  
  UdeskOrganization *organization = [[UdeskOrganization alloc] initWithDomain:@"dycd.udesk.cn" appKey:@"8a47dfb721e3d97782866278d46f91a4" appId:@"6b4112b63158cfce"];
  UdeskCustomer *customer = [UdeskCustomer new];
  //必填（请不要使用特殊字符）
  customer.sdkToken = [NSString stringWithFormat:@"ios-%@",userData[@"id"]] ;
  customer.nickName = [NSString stringWithFormat:@"%@",userData[@"name"]];
  customer.cellphone = [NSString stringWithFormat:@"%@",userData[@"phone"]] ;
  
  //初始化sdk
  [UdeskManager initWithOrganization:organization customer:customer];
  
  //此处只是示例，更多UI参数请参看 UdeskSDKStyle.h
  UdeskSDKStyle *sdkStyle = [UdeskSDKStyle customStyle];
  sdkStyle.navigationColor = [UIColor whiteColor];
  sdkStyle.titleColor = [UIColor blackColor];
  sdkStyle.navBackButtonImage = [UIImage imageNamed:@"fan"];
  
  UdeskSDKManager *sdkManager = [[UdeskSDKManager alloc] initWithSDKStyle:sdkStyle sdkConfig:[UdeskSDKConfig customConfig]];
  [sdkManager presentUdeskInViewController:[UIApplication sharedApplication].delegate.window.rootViewController completion:nil];
}

@end
