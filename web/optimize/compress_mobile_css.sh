#!/bin/bash

rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_$CSS_VERSION.css
  
FILES1=$CSS_MOBILE_COMPONENT_DIR/*
for a in $FILES1
do
  cat $a >> $CSS_MOBILE_PRODUCTION_DIR/shinobi_component.css
done


FILES3=$CSS_MOBILE_LIBRARY_DIR/*
for g in $FILES3

do

  cat $g >> $CSS_MOBILE_PRODUCTION_DIR/shinobi_lib.css
done

cat $CSS_MOBILE_PRODUCTION_DIR/shinobi_lib.css $CSS_MOBILE_PRODUCTION_DIR/shinobi_component.css  >> $CSS_MOBILE_PRODUCTION_DIR/shinobi_$CSS_VERSION.css


echo "build mobile shinobi_$CSS_VERSION.css complete"

#clean up
#rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_all_min_$CSS_VERSION.css
#rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_all_$CSS_VERSION.css
rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_component.css
#rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_render.css
rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_lib.css
#rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_comp_min.css
# $CSS_MOBILE_PRODUCTION_DIR/shinobi_template.css
#rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_template_min.css
#rm $CSS_MOBILE_PRODUCTION_DIR/shinobi_render_min.css
