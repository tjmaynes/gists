install:
	yarn $@

test:
	yarn $@

lint:
	yarn $@

fix:
	yarn lint:$@

deploy: install test

ship_it: test
	git push
