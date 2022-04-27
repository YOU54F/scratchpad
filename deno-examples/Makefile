start-provider:
	deno run --allow-net --allow-read ./provider/server.ts

test-provider:
	deno test --allow-net --allow-read ./provider

curl-provider-get-products:
	curl http://localhost:3000/products

curl-provider-get-product:
	curl http://localhost:3000/product/10

install-aleph:
	deno install --unstable -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.25/cli.ts

init-aleph:
	aleph init consumer

build-consumer:
	cd consumer && aleph build

start-consumer:
	cd consumer && aleph start

start-consumer-dev:
	cd consumer && aleph dev
