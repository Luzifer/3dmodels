stlfiles := $(patsubst %.jscad,%.stl,$(wildcard *.jscad))

default: $(stlfiles) README.md

### Generators

%.stl:
	./node_modules/.bin/jscad "$*.jscad"

README.md:
	bash ci/gen_readme.sh

.PHONY: README.md

### Helpers

auto-hook-pre-commit: README.md
	git diff --exit-code README.md || git add README.md

node_modules:
	npm ci
