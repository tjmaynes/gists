//
//  ColorModelTestCase.swift
//  Huebly
//
//  Created by TJ Maynes on 9/26/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

import XCTest

class ColorModelTests : XCTestCase {
    let color = Color.mock()

    func testShouldSetRedFloatValue() {
        color.red = 30.0
        XCTAssertEqual(color.red, 30.0)
    }

    func testShouldSetGreenFloatValue() {
        color.green = 10.0
        XCTAssertEqual(color.green, 10.0)
    }

    func testShouldSetBlueFloatValue() {
        color.blue = 0.0
        XCTAssertEqual(color.blue, 0.0)
    }

    func testShouldSetAlpahFloatValue() {
        color.alpha = 1.0
        XCTAssertEqual(color.alpha, 1.0)
    }

    func testShouldSetRGBAtoHEXColor() {
        color.red = 10.0;
        color.green = 10.0;
        color.blue = 0.0;
        color.alpha = 1.0;

        let red = CGFloat(color.red)/CGFloat(255.0)
        let blue = CGFloat(color.blue)/CGFloat(255.0)
        let green = CGFloat(color.green)/CGFloat(255.0)

        color.rgbaHexColor = Color.rgbAtoHex(red, green:green, blue:blue, alpha:CGFloat(color.alpha))
        XCTAssertNotNil(color.rgbaHexColor)
        //XCTAssertEqual(color?.rgbaHexColor, "#FF0A0A00")
    }

    func testShouldSetRGBtoHEXColor() {
        color.red = 10.0
        color.green = 10.0
        color.blue = 0.0

        let red = CGFloat(color.red)/CGFloat(255.0)
        let blue = CGFloat(color.blue)/CGFloat(255.0)
        let green = CGFloat(color.green)/CGFloat(255.0)

        color.rgbHexColor = Color.rgBtoHex(red, green:green, blue:blue)
        XCTAssertNotNil(color.rgbHexColor);
        //XCTAssertEqualObjects(color.rgbHexColor,"#0A0A00");
    }

    func testShouldSetCMKYColor() {
        color.red = 10.0
        color.green = 10.0
        color.blue = 0.0

        let red = CGFloat(color.red)/CGFloat(255.0)
        let blue = CGFloat(color.blue)/CGFloat(255.0)
        let green = CGFloat(color.green)/CGFloat(255.0)

        color.cmykColor = Color.rgBtoCMYK(Int32(red), green: Int32(green), blue: Int32(blue))

        XCTAssertNotNil(color.cmykColor)
        XCTAssertEqual(color.cmykColor, "CMYK( c: 0.0, y: 0.0, m: 0.0, k: 1)")
    }

    func testShouldSetHSVColor() {
        color.red = 10.0
        color.green = 10.0
        color.blue = 0.0

        let red = CGFloat(color.red)/CGFloat(255.0)
        let blue = CGFloat(color.blue)/CGFloat(255.0)
        let green = CGFloat(color.green)/CGFloat(255.0)

        color.hsvColor = Color.rgBtoHSV(Int32(red), green: Int32(green), blue: Int32(blue))

        XCTAssertNotNil(color.hsvColor)
    }

    func testShouldSetUIColor() {
        color.red = 10.0
        color.green = 10.0
        color.blue = 0.0
        color.alpha = 1.0

        let red = CGFloat(color.red)/CGFloat(255.0)
        let blue = CGFloat(color.blue)/CGFloat(255.0)
        let green = CGFloat(color.green)/CGFloat(255.0)
        let alpha = CGFloat(color.alpha)

        color.uiColor = Color.rgBtoColor(red, green: green, blue: blue, alpha: alpha)
        
        XCTAssertNotNil(color.uiColor)
        XCTAssertEqual(color.uiColor, "UIColor( r: 0.0392, g: 0.0392, b: 0.0000, a:1.00 )")
    }
}
