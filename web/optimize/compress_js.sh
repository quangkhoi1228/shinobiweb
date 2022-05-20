#!/bin/bash

declare -a copyComponentJSFromShowCase=("multivalueinput" "datalist" "language" "mapping" "table" "initbulma" "cacheapi" "gui" "scroll" "exportfile" "menu" "menumodule" "menurender" "ckeditorcustomconfig" "fileupload" "api" "util" "notification" "render"  "autocomplete" "socket" "userstatus")
declare -a copyLibraryJSFromShowCase=("autocomplete.min" "bulma_iconpicker.min" "bulma_tagsinput.min" "bulma-calendar.min" "bulma-quickview.min"
"intlTelInput.min" "intlTelInputUtil" "cleave.min" "jquery.min" "ckeditor" )

for u in "${copySassFromShowCase[@]}"
do
   cp $SHOWCASE_STATIC_DIR/sass/component/$u.sass $SASS_COMPONENT_DIR/$u.sass
   #cat $JS_COMPONENT_DIR/$i.js >> $JS_PRODUCTION_DIR/shinobi_comp_min.js
done
###copy js css from showcase 
for i in "${copyComponentJSFromShowCase[@]}"
do
   cp $JS_SHOWCASE_DIR/component/$i.js $JS_COMPONENT_DIR/$i.js
   #cat $JS_COMPONENT_DIR/$i.js >> $JS_PRODUCTION_DIR/shinobi_comp_min.js
done
for j in "${copyLibraryJSFromShowCase[@]}"
do
   cp $JS_SHOWCASE_DIR/library/$j.js $JS_LIBRARY_DIR/$j.js
   #cat $JS_COMPONENT_DIR/$i.js >> $JS_PRODUCTION_DIR/shinobi_comp_min.js
done
for k in "${copySystemHtmlFolderFromShowCase[@]}"
do
   cp -r $SHOWCASE_DIR/coresystem/$k/* $WEB_DIR/$k
done
for l in "${copySystemJsRenderFolderFromShowCase[@]}"
do
   cp -r $SHOWCASE_DIR/$l/* $WEB_DIR/static/js/render
done
###compress js 

#debug


FILES1=$JS_COMPONENT_DIR/*
for a in $FILES1
do
  cat $a >> $PRODUCTION_DIR/shinobi_component.js
done 

cat $PRODUCTION_DIR/shinobi_component.js >> $PRODUCTION_DIR/shinobi_all.js

FILES_CONFIG=$JS_CONFIG_DIR/*
for config_file in $FILES_CONFIG
do
  cat $config_file >> $PRODUCTION_DIR/shinobi_component.js
done 

cat $PRODUCTION_DIR/shinobi_component.js >> $PRODUCTION_DIR/shinobi_all.js

FILES2=$JS_RENDER_DIR/*
for f in $FILES2
do
  cat $f >> $PRODUCTION_DIR/shinobi_render.js
done

TEMPLATE_JS_FILES=$JS_TEMPLATE_DIR/*
for template_js in $TEMPLATE_JS_FILES
do
  cat $template_js >> $PRODUCTION_DIR/shinobi_render.js
done

FILES3=$JS_LIBRARY_DIR/*
for g in $FILES3
do
  cat $g >> $PRODUCTION_DIR/shinobi_lib.js
done
cat $PRODUCTION_DIR/shinobi_render.js  >> $PRODUCTION_DIR/shinobi_all.js
#debug
#cat $PRODUCTION_DIR/shinobi_render.js  >> $PRODUCTION_DIR/shinobi_all_min.js

#debug
if [[ $MODE == "develop" ]]
then
  cp $PRODUCTION_DIR/shinobi_all.js $PRODUCTION_DIR/shinobi_all_min.js
else
  java -jar closure-compiler-v20190215.jar --js  $PRODUCTION_DIR/shinobi_all.js --js_output_file  $PRODUCTION_DIR/shinobi_all_min.js
fi
# java -jar closure-compiler-v20190215.jar --js  $PRODUCTION_DIR/shinobi_all.js --js_output_file  $PRODUCTION_DIR/shinobi_all_min.js

cat  $PRODUCTION_DIR/shinobi_all_min.js $PRODUCTION_DIR/shinobi_lib.js >> $PRODUCTION_DIR/shinobi_$JS_VERSION.js
echo "build shinobi_$JS_VERSION.js complete"

#clean up js temp file
# rm $PRODUCTION_DIR/shinobi_all_min.js
# rm $PRODUCTION_DIR/shinobi_all.js
rm $PRODUCTION_DIR/shinobi_component.js
rm $PRODUCTION_DIR/shinobi_render.js
rm $PRODUCTION_DIR/shinobi_lib.js