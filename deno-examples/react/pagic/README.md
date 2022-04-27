# Install pagic

deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic/mod.ts

# Create pagic.config.ts and README.md

mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md

# Run pagic

pagic build --watch --serve
