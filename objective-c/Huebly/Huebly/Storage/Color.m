//
//  Color.m
//  Huebly
//
//  Created by TJ Maynes on 4/8/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "Color.h"
#import "TMDependencyInjection.h"

@implementation Color

@dynamic red;
@dynamic green;
@dynamic blue;
@dynamic alpha;
@dynamic rgbaHexColor;
@dynamic rgbHexColor;
@dynamic cmykColor;
@dynamic hsvColor;
@dynamic uiColor;
@dynamic createdAt;
@dynamic updatedAt;

+ (instancetype)mockColor {
    NSDictionary *data = @{@"red": @"45", @"green": @"45", @"blue": @"45", @"alpha": @"1"};
    return [self convertDictionaryToColor:data];
}

+ (instancetype)convertDictionaryToColor:(NSDictionary *)data {
    Color *color = [Color insertNewObjectIntoContext];

    color.red = [data[@"red"] floatValue];
    color.green = [data[@"green"] floatValue];
    color.blue = [data[@"blue"] floatValue];
    color.alpha = [data[@"alpha"] floatValue];

    NSDate *createdAt = data[@"createdAt"];
    NSDate *updatedAt = data[@"updatedAt"];

    if (createdAt)
        color.createdAt = createdAt;
    else
        color.createdAt = [NSDate date];

    if (updatedAt)
        color.updatedAt = updatedAt;
    else
        color.updatedAt = [NSDate date];

    float red = color.red;
    float green = color.green;
    float blue = color.blue;
    float alpha = color.alpha;

    if (red <= 0.0) red = 1.0;
    if (green <= 0.0) green = 1.0;
    if (blue <= 0.0) blue = 1.0;
    if (alpha <= 0.0) alpha = 1.0;

    color.rgbaHexColor = [Color RGBAtoHex:red/255.0 green:green/255.0 blue:blue/255.0 alpha:alpha];
    color.rgbHexColor = [Color RGBtoHex:red/255.0 green:green/255.0 blue:blue/255.0];
    color.hsvColor = [Color RGBtoHSV:red green:green blue:blue];
    color.cmykColor = [Color RGBtoCMYK:red green:green blue:blue];
    color.uiColor = [Color RGBtoColor:red/255.0 green:green/255.0 blue:blue/255.0 alpha:alpha/1.0];
    
    return color;
}

+ (NSString *)entityName {
    return @"Color";
}

+ (instancetype)insertNewObjectIntoContext {
    NSManagedObjectContext *managedObjectContext = [[[TMDependencyInjection sharedInstance] persistenceStack] managedObjectContext];
    return [NSEntityDescription insertNewObjectForEntityForName:self.entityName inManagedObjectContext:managedObjectContext];
}

+ (NSString *)RGBAtoHex:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha {
    UIColor*myColor = [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
    const CGFloat* components;
    components = CGColorGetComponents(myColor.CGColor);
    return [NSString stringWithFormat:@"#%02X%02X%02X%02X", (int)(alpha * 255), (int)(red * 255), (int)(green * 255), (int)(blue * 255)];
}

+ (NSString *)RGBtoHex:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue {
    UIColor *myColor = [UIColor colorWithRed:red green:green blue:blue alpha:1];
    const CGFloat* components;
    components = CGColorGetComponents(myColor.CGColor);
    return [NSString stringWithFormat:@"#%02X%02X%02X", (int)(red * 255), (int)(green * 255), (int)(blue * 255)];
}

+ (NSString *)RGBtoCMYK:(int)red green:(int)green blue:(int)blue {
    CGFloat c, m, y, k = 0;

    c = 1 - red;
    m = 1 - green;
    y = 1 - blue;

    if(red == 0 || green == 0 || blue == 0) return [NSString stringWithFormat:@"CMYK( c: 0.0, y: 0.0, m: 0.0, k: 1)"];

    CGFloat minCMY = fmin(c, fmin(m, y));
    c = (1- red - minCMY)/(1 - minCMY);
    m = (1 - green - minCMY)/(1 - minCMY);
    y = (1 - blue - minCMY)/(1 - minCMY);
    k = fmin((1 - red/255.0), fmin((1 - green/255.0), (1 - blue/255.0)));

    return [NSString stringWithFormat:@"CMYK( c: %.4f, m: %.4f, y: %.4f, k: %.4f )", c, m, y, k];
}

+ (NSString *)RGBtoHSV:(int)red green:(int)green blue:(int)blue {
    CGFloat h, s, v;

    CGFloat minRGB = fmin(red, fmin(green, blue));
    CGFloat maxRGB = fmax(red, fmax(green, blue));

    if ( minRGB  == maxRGB ) return [NSString stringWithFormat:@"hsv( 0, 0, %f )", v];

    CGFloat d = (red == minRGB) ? green - blue : ((blue == minRGB) ? red - green : blue - red);
    CGFloat t = (red == minRGB) ? 3 : ((blue == minRGB) ? 1 : 5);
    h = 60 * (t - d / (maxRGB - minRGB));
    s = (maxRGB - minRGB)/maxRGB;
    v = maxRGB/255.0;

    return [NSString stringWithFormat:@"HSV( h: %.1f, s: %.4f, v: %.4f )", h, s, v];
}

+ (NSString *)RGBtoColor:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha {
    return [NSString stringWithFormat:@"UIColor( r: %.4f, g: %.4f, b: %.4f, a:%.2f )", red, green, blue, alpha];
}

@end
