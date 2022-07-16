run_passing_ui_tests:
	$(call run_ui_tests,14.4)

run_failing_ui_tests:
	$(call run_ui_tests,14.5)

define run_ui_tests
	xcodebuild \
		-project NavigationLinksBug.xcodeproj \
		-scheme "NavigationLinksBugUITests" \
		-sdk iphonesimulator \
		-destination 'platform=iOS Simulator,name=iPhone 11,OS=${1}' \
		-quiet \
		test
endef