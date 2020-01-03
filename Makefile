sourcefiles := $(wildcard *.jscad)

default: $(sourcefiles)

%.jscad: docker-build
	docker run --rm -i -v "$(CURDIR):$(CURDIR)" -w "$(CURDIR)" registry.local/openjscad:cli "$@"

docker-build:
	docker build -q -f ci/Dockerfile.compile -t registry.local/openjscad:cli ci
