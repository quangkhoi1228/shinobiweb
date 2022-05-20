#!/bin/bash

#declare showcase 

#declare -a copySystemHtmlFolderFromShowCase=("system" "systemfragment" "systemtemplate" )
#declare -a copySystemJsRenderFolderFromShowCase=("static/js/systemrender" )
#declare -a copySassFromShowCase=("tablesortfilter" "fragmentpaymentinfo" "popupnotification" "contact" "fragmentforgotpassword")



export SHOWCASE_DIR=$SHOWCASE_DIR
export SHOWCASE_STATIC_DIR=$SHOWCASE_DIR/static
#declare variable
export JS_VERSION="2"
export CSS_VERSION="2"
export WEB_DIR=../tradingsystemweb
export JS_DIR=$WEB_DIR/static/js
export JS_COMPONENT_DIR=$JS_DIR/component
export JS_CONFIG_DIR=$JS_DIR/config
export JS_LIBRARY_DIR=$JS_DIR/library
export JS_RENDER_DIR=$JS_DIR/render
export JS_TEMPLATE_DIR=$JS_DIR/template

export SASS_DIR=$WEB_DIR/static/sass
export SASS_BULMA_DIR=$WEB_DIR/static/sassbulma
export SASS_COMPONENT_DIR=$SASS_DIR/component
export CSS_DIR=$WEB_DIR/static/css
export CSS_COMPONENT_DIR=$CSS_DIR/component
export CSS_LIBRARY_DIR=$CSS_DIR/library
#export CSS_RENDER_DIR=$CSS_DIR/render
export JS_SHOWCASE_DIR=$SHOWCASE_STATIC_DIR/js
export CSS_SHOWCASE_DIR=$SHOWCASE_STATIC_DIR/css/component
export PRODUCTION_DIR=$WEB_DIR/static/production

#cp -R $SHOWCASE_STATIC_DIR/sassbulma $WEB_DIR/static/

###remove all production file 
# rm $PRODUCTION_DIR/*

rm $PRODUCTION_DIR/*.js
chmod +x compress_js.sh
./compress_js.sh

chmod +x compress_sass.sh
./compress_sass.sh

rm $PRODUCTION_DIR/*.css
chmod +x compress_css.sh
./compress_css.sh


