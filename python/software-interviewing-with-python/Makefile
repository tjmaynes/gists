install:
	chmod +x ./scripts/install.sh
	./scripts/install.sh

.PHONY: test
test:
	. .venv/bin/activate; python3 -m pytest interviewing/**/*_test.py

lint:
	. .venv/bin/activate; python3 -m ruff check interviewing/

format:
	. .venv/bin/activate; python3 -m ruff format interviewing/

test_ci:
	. .venv/bin/activate; python3 -m pytest interviewing/**/*_test.py \
		--doctest-modules \
		--junitxml=reports/test-results-$(shell cat .python-version).xml

lint_ci:
	. .venv/bin/activate; python3 -m ruff check --target-version=py311 interviewing/

deploy: install test_ci lint_ci