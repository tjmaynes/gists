install:
	gem install bundler
	bundle install
	touch $@

test: install
	bundle exec fastlane scan --scheme "HueblyTests"
