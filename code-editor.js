page:user:Sivabalan.t/wikiCodeEditor/code-editor.js

var codeExtensionsDict = {
	'js' : {
		'urlStub' : "#editJs",
		'aceMode' : "ace/mode/javascript",
		'fullName' : 'javascript'
	},
	'css' : {
		'urlStub' : "#editCss",
		'aceMode' : "ace/mode/css",
		'fullName' : 'css'
	}
}

function setupCodeEditor(codeType) {
	var codeArea = $('pre.'+codeType+'.source-'+codeType);
	var codeContent = codeArea.text();
	codeArea.replaceWith('<div id="editor">'+codeContent+'</div>');	 		
	$('#editor').css('position','relative');
	$('#editor').css('width','100%');
	$('#editor').css('height','500px');

	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode(codeExtensionsDict[pageType]['aceMode']);
}

var pageType = wgPageName.split('.').pop();

if(pageType in codeExtensionsDict)
{
	var editCodeLink = $('a[accesskey="e"]');
	var origEditUrl = editCodeLink.attr('href');
	var newUrl = document.URL+codeExtensionsDict[pageType]['urlStub'];

	editCodeLink.attr('href',newUrl);
	editCodeLink.attr('title','Click to edit your '+pageType+' code');
	editCodeLink.css('pointer-events','none');
	editCodeLink.css('color','grey');

	editCodeLink.click(function(){
			setupCodeEditor(codeExtensionsDict[pageType]['fullName']);
	});
	
	$.getScript("http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js", function(data, textStatus, jqxhr) {
			editCodeLink.css('pointer-events','auto');
			editCodeLink.css('color','');	
		});
			
}

	

