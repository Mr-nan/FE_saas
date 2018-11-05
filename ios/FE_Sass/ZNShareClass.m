//
//  ZNShareClass.m
//  FE_Sass
//
//  Created by zhengnan on 2017/8/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ZNShareClass.h"
#import "ZNShareViewController.h"
#import "Udesk.h"

@implementation ZNShareClass
{
  
}
RCT_EXPORT_MODULE()
RCT_REMAP_METHOD(shareAction,
                 setShareArray:(NSArray *)sharArray
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)

{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    ZNShareViewController *shareVC = [[ZNShareViewController alloc]init];
    [shareVC setShareData:sharArray  ShareResult:^(NSString *resultStr, NSError *error) {
      
      if(!error){
        resolve(resultStr);
        
      }else{
        reject(@"分享失败",@"0",error);
      }
    }];
  });

}

RCT_REMAP_METHOD(openUdsk,userData:(NSDictionary *)userData){
  dispatch_async(dispatch_get_main_queue(), ^{
    UdeskOrganization *organization = [[UdeskOrganization alloc] initWithDomain:"dycd.udesk.cn" appKey:"8a47dfb721e3d97782866278d46f91a4" appId:"6b4112b63158cfce"];
    
    //注意sdktoken 是客户的唯一标识，用来识别身份,是你们生成传入给我们的。
    //sdk_token: 传入的字符请使用 字母 / 数字 等常见字符集 。就如同身份证一样，不允许出现一个身份证号对应多个人，或者一个人有多个身份证号;其次如果给顾客设置了邮箱和手机号码，也要保证不同顾客对应的手机号和邮箱不一样，如出现相同的，则不会创建新顾客。
    UdeskCustomer *customer = [UdeskCustomer new];
    //必填（请不要使用特殊字符）
    customer.sdkToken = userData[@"base_user_id"];
    //非必填
    customer.nickName = userData[@"base_user_name"];
    //需要严格按照号码规则（没有则不填，不可以为空）
    customer.cellphone = userData[@"base_user_tel"];
    
    //初始化sdk
    [UdeskManager initWithOrganization:organization customer:customer];
    
    //此处只是示例，更多UI参数请参看 UdeskSDKStyle.h
    UdeskSDKStyle *sdkStyle = [UdeskSDKStyle customStyle];
    sdkStyle.navigationColor = [UIColor whiteColor];
    sdkStyle.titleColor = [UIColor blackColor];
    sdkStyle.navBackButtonImage = [UIImage imageNamed:@"fan"];

    
    //使用push
    UdeskSDKManager *sdkManager = [[UdeskSDKManager alloc] initWithSDKStyle:sdkStyle sdkConfig:[UdeskSDKConfig customConfig]];
    //使用present
    [sdkManager presentUdeskInViewController:[UIApplication sharedApplication].delegate.window.rootViewController completion:nil];
  });
}

@end
