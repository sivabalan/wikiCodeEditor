if(wgAction == 'edit'){
 
$.getScript("http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js", function(data, textStatus, jqxhr) {
 
 $(".wikiEditor-ui").empty();
 $(".wikiEditor-ui").html('<div id="editor"></div>');
 
 $('#editor').css('position','relative');
 $('#editor').css('width','100%');
 $('#editor').css('height','500px');
 
 var editor = ace.edit("editor");
 editor.setTheme("ace/theme/monokai");
 if(wgPageName.indexOf('.js') !== -1)
 {
  editor.getSession().setMode("ace/mode/javascript");
 }
 else if(wgPageName.indexOf('.css') !== -1){
  editor.getSession().setMode("ace/mode/css");
 }
});
 
 
}