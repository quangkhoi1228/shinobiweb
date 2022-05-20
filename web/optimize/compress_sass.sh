export operatingSystem

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    operatingSystem="linux"

    ##compress bulma sass

elif [[ "$OSTYPE" == "darwin"* ]]; then
    operatingSystem="mac"
else
    operatingSystem="window"
fi

sass --no-source-map $SASS_BULMA_DIR/custom.sass:$CSS_LIBRARY_DIR/bulma.min.css

echo "build sass bulma complete"
