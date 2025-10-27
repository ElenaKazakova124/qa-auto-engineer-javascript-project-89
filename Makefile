install:
	npm ci
lint:
	npx eslint .
publish:
	npm publish --dry-run
test:
	npx vitest run
test-coverage:
	npx vitest run --coverage