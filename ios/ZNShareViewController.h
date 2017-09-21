//
//  ZNShareViewController.h
//  FE_Sass
//
//  Created by zhengnan on 2017/8/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>


typedef void(^shareResultBlock)(NSString *resultStr,NSError *error);

@interface ZNShareViewController : UIViewController

@property (strong,nonatomic) shareResultBlock shareResult;

-(void)setShareData:(NSArray *)shareData
        ShareResult:(shareResultBlock)result;

@end
