sourcefiles := $(wildcard *.jscad)

default: $(sourcefiles) README.md

### Generators

%.jscad: docker-build
	docker run --rm -i -v "$(CURDIR):$(CURDIR)" -w "$(CURDIR)" registry.local/openjscad:cli "$@"

README.md:
	bash ci/gen_readme.sh

.PHONY: README.md

### Helpers

auto-hook-pre-commit: README.md
	git diff --exit-code README.md || git add README.md

docker-build:
	docker build -q -f ci/Dockerfile.compile -t registry.local/openjscad:cli ci
