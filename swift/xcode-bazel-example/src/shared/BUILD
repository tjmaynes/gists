load("@build_bazel_rules_swift//swift:swift.bzl", "swift_library")

swift_library(
    name = "rizeppi-shared",
    srcs = glob([ "Shared/*.swift" ]),
    data = [ "Shared/Assets.xcassets" ],
    visibility = ["//visibility:public"],
)
