---
layout: post
author: TJ Maynes
title: Setup C++ OpenCV in Visual Studio
date: 2015-03-14 00:00:00
published: true
---
*This post is for readers/friends who want to get started on C++ OpenCV development in Visual Studio, but don't know where to start.*

## Installation
* Download Visual Studio Community 2013 from [here](https://www.visualstudio.com/downloads/download-visual-studio-vs).
* Download OpenCV v2.4.10 from [here](https://sourceforge.net/projects/opencvlibrary/files/opencv-win/2.4.10/opencv-2.4.10.exe/download).
* Unzip and put opencv folder in location C:\{opencv}
* Rename opencv folder to "opencv"

Add System Environment Variable to PATH:

* C:\opencv\build\x86\vc12\bin
* C:\opencv\build\x64\vc12\bin


Next, open up Visual Studio Community 2013 and create a new project.

## C++
Additional Include Directories:
<ul>
<li>C:\opencv\build\include</li>
<li>C:\opencv\build\include\opencv</li>
<li>C:\opencv\build\include\opencv2</li>
</ul>

## Linker
Additional Library Directories:
<ul>
<li>C:\opencv\build\x86\vc12\lib</li>
</ul>

Additional Dependencies:

<ul>
<li>opencv_stitching2410d.lib</li>
<li>opencv_contrib2410d.lib</li>
<li>opencv_videostab2410d.lib
<li>opencv_superres2410d.lib</li>
<li>opencv_nonfree2410d.lib</li>
<li>opencv_gpu2410d.lib</li>
<li>opencv_ocl2410d.lib</li>
<li>opencv_legacy2410d.lib</li>
<li>opencv_ts2410d.lib</li>
<li>opencv_calib3d2410d.lib</li>
<li>opencv_features2d2410d.lib</li>
<li>opencv_objdetect2410d.lib</li>
<li>opencv_highgui2410d.lib</li>
<li>opencv_video2410d.lib</li>
<li>opencv_photo2410d.lib</li>
<li>opencv_imgproc2410d.lib</li>
<li>opencv_flann2410d.lib</li>
<li>opencv_ml2410d.lib</li>
<li>opencv_core2410d.lib</li>
</ul>
