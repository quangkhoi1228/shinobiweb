###compress css 
#FILES1=$CSS_COMPONENT_DIR/*
#for a in $FILES1
#do
#  cat $a >> $PRODUCTION_DIR/shinobi_component.css
#done


FILES3=$CSS_LIBRARY_DIR/*
for g in $FILES3
do
  cat $g >> $PRODUCTION_DIR/shinobi_lib.css
done

#cat $PRODUCTION_DIR/shinobi_lib.css $PRODUCTION_DIR/shinobi_component.css  >> $PRODUCTION_DIR/shinobi_$CSS_VERSION.css
cat $PRODUCTION_DIR/shinobi_lib.css >> $PRODUCTION_DIR/shinobi_$CSS_VERSION.css
# cat $PRODUCTION_DIR/shinobi_lib.css $PRODUCTION_DIR/shinobi_component.css  >> $PRODUCTION_DIR/shinobi_min.css

# java -jar yuicompressor-2.4.8.jar $PRODUCTION_DIR/shinobi_min.css -o $PRODUCTION_DIR/shinobi_$CSS_VERSION.css --charset utf-8
echo "build shinobi_$CSS_VERSION.css complete"

#clean up temp file
#rm $PRODUCTION_DIR/shinobi_component.css
rm $PRODUCTION_DIR/shinobi_lib.css
# rm $PRODUCTION_DIR/shinobi_min.css

