PROGRAM  = TodoApp
FASTLANE = bundle exec fastlane

install_dependencies:
	gem install bundler
	bundle install --path "vendor/bundle"

test:
	$(FASTLANE) scan \
	--project "$(PROGRAM).xcodeproj" \
	--scheme "$(PROGRAM)" \
	--clean

clean:
	$(FASTLANE) clean
