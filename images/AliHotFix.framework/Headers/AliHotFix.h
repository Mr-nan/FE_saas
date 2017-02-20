//
//  AliHotFix.h
//  AliHotFix
//
//  Copyright © 2016年 alibaba. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * HotFix。
 */
@interface AliHotFix : NSObject

/**
 * 初始化启动HotFix
 *
 * @param appID              百川HotFix平台申请的appID
 * @param secret             百川HotFix平台申请的secret
 * @param privateKey         百川HotFix平台申请的RSA密钥
 * @param publicKeyData      本地打包patch生成的rsa的der格式公钥data流（本地打包工具生成）
 * @param encryptAESKeyData  被加密后的用来加解密patch文件的密钥(本地打包工具生成)
 *
 */
+ (void)startWithAppID:(NSString *)appID
                secret:(NSString *)secret
            privateKey:(NSString *)privateKey
             publicKey:(NSData *)publicKeyData
         encryptAESKey:(NSData *)encryptAESKeyData;

/**
 * HotFix 更新时使用的额外信息。
 */
+ (void)setExternalInfo:(NSDictionary<NSString *, NSString *> *)info;

/**
 * 检查 HotFix 更新。
 */
+ (void)sync;

@end
