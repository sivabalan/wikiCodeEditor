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

var pageType = wgPageName.split('.').pop();
var codeEditMode = false;

if(pageType in codeExtensionsDict)
{
	var editCodeLink = $('a[accesskey="e"]');
	var editUrl = document.URL;
			
	editCodeLink.attr('href','javascript:void(0)');
	editCodeLink.attr('title','Click to edit your '+pageType+' code');
	editCodeLink.css('pointer-events','none');
	editCodeLink.css('color','grey');

	editCodeLink.click(function(){
		codeEditMode = true;
		$('#p-views li[id^="ca-"]').removeClass("selected");
		$('#p-views li[id="ca-edit"]').addClass("selected");
		
		var codeArea = $('pre.'+codeExtensionsDict[pageType]['fullName']+'.source-'+codeExtensionsDict[pageType]['fullName']);
		var codeContent = codeArea.text();
		codeArea.replaceWith('<div id="editor">'+codeContent+'</div>');	 		
		$('#editor').css('position','relative');
		$('#editor').css('width','100%');
		$('#editor').css('height','500px');

		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode(codeExtensionsDict[pageType]['aceMode']);
	});
	
	$.getScript("http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js", function(data, textStatus, jqxhr) {
			editCodeLink.css('pointer-events','auto');
			editCodeLink.css('color','');	
		});
	
}

	

