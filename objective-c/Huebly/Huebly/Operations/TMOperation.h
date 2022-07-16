//
//  TMOperation.h
//  Huebly
//
//  Created by TJ Maynes on 9/21/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import Foundation;

#import "NSOperationQueue+DataOperationQueue.h"

@interface TMOperation : NSOperation

- (void)start;
- (void)finish;

@end
