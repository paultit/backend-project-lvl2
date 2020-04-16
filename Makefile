install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build	

test:
	npm test

test-coverage:
	npm test -- --coverage	