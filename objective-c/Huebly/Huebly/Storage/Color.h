//
//  Color.h
//  Huebly
//
//  Created by TJ Maynes on 4/8/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import UIKit;

@import CoreData;

@interface Color : NSManagedObject

@property (nonatomic) float red;
@property (nonatomic) float green;
@property (nonatomic) float blue;
@property (nonatomic) float alpha;
@property (nonatomic, copy, nonnull) NSString *rgbaHexColor;
@property (nonatomic, copy, nonnull) NSString *rgbHexColor;
@property (nonatomic, copy, nonnull) NSString *cmykColor;
@property (nonatomic, copy, nonnull) NSString *hsvColor;
@property (nonatomic, copy, nonnull) NSString *uiColor;
@property (nonatomic, copy, nonnull) NSDate *createdAt;
@property (nonatomic, copy, nonnull) NSDate *updatedAt;

+ (instancetype _Nonnull)convertDictionaryToColor:(NSDictionary * _Nonnull)data;
+ (instancetype _Nonnull)mockColor;

+ (NSString * _Nonnull)RGBAtoHex:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha;
+ (NSString * _Nonnull)RGBtoHex:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue;
+ (NSString * _Nonnull)RGBtoCMYK:(int)red green:(int)green blue:(int)blue;
+ (NSString * _Nonnull)RGBtoHSV:(int)red green:(int)green blue:(int)blue;
+ (NSString * _Nonnull)RGBtoColor:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha;

@end
