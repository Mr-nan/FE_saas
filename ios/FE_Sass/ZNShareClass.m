//
//  ZNShareClass.m
//  FE_Sass
//
//  Created by zhengnan on 2017/8/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ZNShareClass.h"
#import "ZNShareViewController.h"

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

@end
