                                                                                                                                                                                                                                                                                                                                                                                                               /**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <React/RCTRootView.h>
#import "RCTLinkingManager.h"
#import <React/RCTBundleURLProvider.h>
#import <AdSupport/AdSupport.h>
#import "sys/utsname.h"
#import "Growing.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
 NSURL *jsCodeLocation;
 [Growing startWithAccountId:@"8c70ed29c1985918"];
 [Growing setRnNavigatorPageEnabled:YES];

   
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString  *idfaStr = [[ASIdentifierManager sharedManager]advertisingIdentifier].UUIDString;
  NSString* phoneVersion = [[UIDevice currentDevice] systemVersion];
  NSString *appVersion = [infoDictionary objectForKey:@"CFBundleShortVersionString"];

  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"FE_Sass"
                                               initialProperties:@{@"IDFA":idfaStr,
                                                                   @"phoneVersion":phoneVersion,
                                                                   @"phoneModel":[self getPhoneModel],
                                                                   @"appVersion":appVersion,
                                                                   }
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
  
}

-(NSString *)getPhoneModel{
  
  struct utsname systemInfo;
  uname(&systemInfo);
  NSString  *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
  if ([deviceString isEqualToString:@"iPhone10,1"])    return @"iPhone 8 Plus";
  if ([deviceString isEqualToString:@"iPhone10,2"])    return @"iPhone 8";
  if ([deviceString isEqualToString:@"iPhone9,1"])    return @"iPhone 7 Plus";
  if ([deviceString isEqualToString:@"iPhone9,2"])    return @"iPhone 7";
  if ([deviceString isEqualToString:@"iPhone3,1"])    return @"iPhone 4";
  if ([deviceString isEqualToString:@"iPhone3,2"])    return @"iPhone 4";
  if ([deviceString isEqualToString:@"iPhone3,3"])    return @"iPhone 4";
  if ([deviceString isEqualToString:@"iPhone4,1"])    return @"iPhone 4S";
  if ([deviceString isEqualToString:@"iPhone5,1"])    return @"iPhone 5";
  if ([deviceString isEqualToString:@"iPhone5,2"])    return @"iPhone 5 (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPhone5,3"])    return @"iPhone 5c (GSM)";
  if ([deviceString isEqualToString:@"iPhone5,4"])    return @"iPhone 5c (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPhone6,1"])    return @"iPhone 5s (GSM)";
  if ([deviceString isEqualToString:@"iPhone6,2"])    return @"iPhone 5s (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPhone7,1"])    return @"iPhone 6 Plus";
  if ([deviceString isEqualToString:@"iPhone7,2"])    return @"iPhone 6";
  if ([deviceString isEqualToString:@"iPhone8,1"])    return @"iPhone 6s";
  if ([deviceString isEqualToString:@"iPhone8,2"])    return @"iPhone 6s Plus";
  if ([deviceString isEqualToString:@"iPhone8,4"])    return @"iPhone SE";
  return deviceString;
}

-(NSString *)checkNetworkPermission{
  CTCellularData *cellularData = [[CTCellularData alloc]init];
  CTCellularDataRestrictedState state = cellularData.restrictedState;
  return [NSString stringWithFormat:@"%lu",(unsigned long)state];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
  
}
-(BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  if ([Growing handleUrl:url]) // 请务必确保该函数被调用
  {
    return YES;
  }
  return NO;
}

@end
