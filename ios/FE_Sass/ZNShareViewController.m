//
//  ZNShareViewController.m
//  FE_Sass
//
//  Created by zhengnan on 2017/8/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ZNShareViewController.h"
#import "AppDelegate.h"
#import "MBProgressHUD.h"
@interface ZNShareViewController ()
{
  
    NSInteger _currentShareIndex;
    NSMutableArray *_shareArray;
  
}

@property (strong,nonatomic) MBProgressHUD *hud;
@end



@implementation ZNShareViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}

-(void)setShareData:(NSArray *)shareData
        ShareResult:(shareResultBlock)result{

  UIView *rootView = [UIApplication sharedApplication].delegate.window.rootViewController.view;
  self.hud = [MBProgressHUD showHUDAddedTo:rootView animated:YES];
  self.hud.labelText = @"获取分享信息";
  self.hud.removeFromSuperViewOnHide = YES;
  self.hud.dimBackground = NO;
  
  
  _shareResult = result;
  _shareArray = [NSMutableArray array];
  _currentShareIndex = 0;
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    for (int i=0; i<shareData.count; i++)
    {
      NSArray *itemArray = shareData[i];
      NSMutableArray *array = [NSMutableArray array];
      for(int j=0;j<itemArray.count;j++)
      {
        NSDictionary *item = itemArray[j];
        if(item[@"image"])
        {
          NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:item[@"image"]]];
          UIImage *image = [UIImage imageWithData:data];
          if (image.size.width > image.size.height) {
            image = [self scaleToSize:image size:CGSizeMake(715 * 1.2, 511 * 1.2)];
            
          } else {
            image = [self scaleToSize:image size:CGSizeMake(715 * 1.2, 1000 * 1.2)];
          }
          
//          dispatch_async(dispatch_get_main_queue(), ^{
//            self.hud.progress = (float)(j/itemArray.count);
//          });
          [array addObject:image];
        }
        
        if(item[@"title"]){
          [array addObject:item[@"title"]];
        }
        
        if(item[@"url"]){
          NSURL *URL = [NSURL URLWithString:item[@"url"]];
          [array addObject:URL];
        }
      }
      
      [_shareArray addObject:array];
      
    }
    
    
    [self openShare:[_shareArray objectAtIndex:_currentShareIndex]];
    
  });

 
  
}

-(void)openShare:(NSArray *)shareItem{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [self.hud hide:YES];
    UIActivityViewController *activityVC = [[UIActivityViewController alloc]initWithActivityItems:shareItem applicationActivities:nil];
    
    activityVC.excludedActivityTypes=@[UIActivityTypePostToFacebook,UIActivityTypePostToTwitter, UIActivityTypePostToWeibo, UIActivityTypeMessage,UIActivityTypeMail,UIActivityTypePrint,UIActivityTypeCopyToPasteboard,UIActivityTypeAssignToContact,UIActivityTypeSaveToCameraRoll,UIActivityTypeAddToReadingList,UIActivityTypePostToFlickr,UIActivityTypePostToVimeo,UIActivityTypePostToTencentWeibo,UIActivityTypeAirDrop,UIActivityTypeOpenInIBooks];
    
    
    [[UIApplication sharedApplication].delegate.window.rootViewController presentViewController:activityVC animated:YES completion:nil];
    
    [activityVC setCompletionWithItemsHandler:^(NSString * __nullable activityType, BOOL completed, NSArray * __nullable returnedItems, NSError * __nullable activityError){
      
      if (completed && activityError == nil) {
        
        _currentShareIndex++;
        if(_currentShareIndex<_shareArray.count)
        {
          [self openShare:[_shareArray objectAtIndex:_currentShareIndex]];
          
        }else{
          self.shareResult(@"分享成功", nil);

        }
        
        
      }else {
        NSLog(@"分享失败");
        self.shareResult(nil, [NSError errorWithDomain:@"取消分享" code:0 userInfo:nil]);
      }
    }
     ];

  });

  
  
}

-(UIImage *)scaleToSize:(UIImage *)img size:(CGSize)size{
  UIGraphicsBeginImageContext(size);
  [img drawInRect:CGRectMake(0, 0, size.width, size.height)];
  UIImage *scaleImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return scaleImage;
}



@end
