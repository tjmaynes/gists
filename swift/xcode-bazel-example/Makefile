export XCODE_VERSION=12.5.1

.PHONY: build

install_tulsi_app:
	./scripts/install-tulsi-app.sh

open_tulsi: install_tulsi_app
	open ./bin/tulsi/Tulsi.app

build:
	bazel build //src/ios:rizeppi-ios
	bazel build //src/macos:rizeppi-macos

test:
	bazel test //src/ios:rizeppi-ios
	bazel test //src/macos:rizeppi-macos
