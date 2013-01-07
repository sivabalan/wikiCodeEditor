page:User:Sivabalan.t/wikiCodeEditor/code-editor.js

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
var editor;

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

		editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode(codeExtensionsDict[pageType]['aceMode']);

		mw.loader.using('mediawiki.api.edit', function() {
			$('#bodyContent').append('<div class="codeEditOptions"><span class="mw-summary" id="wpSummaryLabel"><label for="wpSummary"><span style="text-align: left;"><a href="/wiki/Help:Edit_summary" title="Help:Edit summary">Edit summary</a> <small>(Briefly describe the changes you have made)</small></span></label></span><input class="mw-summary" id="wpSummary" maxlength="255" tabindex="1" size="60" spellcheck="true" title="Enter a short summary [alt-b]" accesskey="b" name="wpSummary"><div class="editButtons"><input id="wpCodeSave" type="submit" tabindex="5" value="Save" accesskey="s" title="Save your changes [alt-s]"><input id="wpCodeSaveDone" type="submit" tabindex="6" value="Save and close" accesskey="p" title="Save you changes and refresh the page [alt-p]"><span class="cancelLink"><a href="/wiki/User:Sivabalan.t/test/test.js" title="User:Sivabalan.t/test/test.js" id="mw-editform-cancel">Cancel</a></span></div><!-- editButtons --></div>');

			function saveCode(action) {
				var edit = new mw.Api();
				var params = {
					action: 'edit',
					title: mw.config.get('wgPageName'),
					text: editor.getSession().getValue(),
					summary: $('#wpSummmary').val()
				}
				edit.postWithEditToken(params).done(function(data){
					if(('edit' in data) && (data.edit.result == 'Success')){
						mw.util.jsMessage('Your code is saved');
					}
					else if('warnings' in data){
						mw.util.jsMessage('Code save error');
					}
					if(action == 'reload')
					{
						location.reload(true);
					}
				});
			}

			$('#wpCodeSave').click(function(){
				saveCode('save');	
			});

			$('#wpCodeSaveDone').click(function(){
				saveCode('reload');
			});

			$('span.cancelLink').click(function(){
				location.reload(true);
			});
		});

	});
	
	$.getScript("http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js", function(data, textStatus, jqxhr) {
			editCodeLink.css('pointer-events','auto');
			editCodeLink.css('color','');	
		});
	
}

	

