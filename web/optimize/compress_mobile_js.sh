#!/bin/bash

rm $JS_MOBILE_PRODUCTION_DIR/shinobi_mobile_$JS_VERSION.js

FILES1=$JS_MOBILE_COMPONENT_DIR/*
for a in $FILES1
do
  cat $a >> $JS_MOBILE_PRODUCTION_DIR/shinobi_component.js
done 

cat $JS_MOBILE_PRODUCTION_DIR/shinobi_component.js >> $JS_MOBILE_PRODUCTION_DIR/shinobi_all_$JS_VERSION.js

FILES2=$JS_MOBILE_RENDER_DIR/*
for f in $FILES2
do
  cat $f >> $JS_MOBILE_PRODUCTION_DIR/shinobi_render.js
done

FILES3=$JS_MOBILE_LIBRARY_DIR/*
for g in $FILES3
do
  cat $g >> $JS_MOBILE_PRODUCTION_DIR/shinobi_lib.js
done


cat $JS_MOBILE_PRODUCTION_DIR/shinobi_render.js  >> $JS_MOBILE_PRODUCTION_DIR/shinobi_all_$JS_VERSION.js

java -jar closure-compiler-v20190215.jar --js  $JS_MOBILE_PRODUCTION_DIR/shinobi_all_$JS_VERSION.js --js_output_file  $JS_MOBILE_PRODUCTION_DIR/shinobi_all_min_$JS_VERSION.js

cat  $JS_MOBILE_PRODUCTION_DIR/shinobi_all_min_$JS_VERSION.js $JS_MOBILE_PRODUCTION_DIR/shinobi_lib.js >> $JS_MOBILE_PRODUCTION_DIR/shinobi_$JS_VERSION.js
echo "build shinobi_mobile_$JS_VERSION.js complete"

#clean up
rm $JS_MOBILE_PRODUCTION_DIR/shinobi_all_min_$JS_VERSION.js
rm $JS_MOBILE_PRODUCTION_DIR/shinobi_all_$JS_VERSION.js
rm $JS_MOBILE_PRODUCTION_DIR/shinobi_component.js
rm $JS_MOBILE_PRODUCTION_DIR/shinobi_render.js
rm $JS_MOBILE_PRODUCTION_DIR/shinobi_lib.js
#rm $JS_MOBILE_PRODUCTION_DIR/shinobi_comp_min.js
# $JS_MOBILE_PRODUCTION_DIR/shinobi_template.js
#rm $JS_MOBILE_PRODUCTION_DIR/shinobi_template_min.js
#rm $JS_MOBILE_PRODUCTION_DIR/shinobi_render_min.js
