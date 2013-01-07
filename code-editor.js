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

var themeDict = {
	'Chrome': 'chrome', 
	'Clouds': 'clouds', 
	'Clouds Midnight' : 'clouds_midnight', 
	'Cobalt': 'cobalt', 
	'Crimson Editor': 'crimson_editor',
	'Dawn' : 'dawn',
	'Dreamweaver': 'dreamweaver',
	'Eclipse': 'eclipse',
	'Github': 'github',
	'Idle Fingers' : 'idle_fingers',
	'Monokai' : 'monokai',
	'Merbivore' : 'merbivore',
	'Merbivore Soft' : 'merbivore_soft',
	'Mono Industrial' : 'mono_industrial',
	'Pastel Dark' : 'pastel_on_dark',
	'Solarized Dark' : 'solarized_dark',
	'Solarized Light' : 'solarized_light',
	'TextMate' : 'textmate',
	'Tomorrow' : 'tomorrow',
	'Tomorrow Night' : 'tomorrow_night',
	'Tomorrow Night Blue' : 'tomorrow_night_blue',
	'Tomorrow Night Bright' : 'tomorrow_night_bright',
	'Tomorrow Night 80\'s' : 'tomorrow_night_eighties',
	'Twilight' : 'twilight',
	'Vibrant Ink' : 'vibrant_ink'
};

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
		codeArea.replaceWith('<div id="toolBar"></div><div id="editor">'+codeContent+'</div>');	 		
		$('#editor').css('position','relative');
		$('#editor').css('width','100%');
		$('#editor').css('height','500px');

		editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode(codeExtensionsDict[pageType]['aceMode']);

		mw.loader.using('mediawiki.api.edit', function() {
			$('#toolBar').html('<div class="codeEditOptions" style="position: relative;background-color: #F0F0F0;height: 30px;padding: 10px 10px 5px 10px;"><label style="float:left; line-height:24px">Editor theme : </label><select id="themeSelect" style="float: left; margin-left: 5px;margin-top: 3px;"></select><div class="editButtons" style="float: right;"><input id="wpCodeSave" type="submit" tabindex="5" value="Save" accesskey="s" title="Save your changes [alt-s]"><input id="wpCodeSaveDone" type="submit" tabindex="6" value="Save and close" accesskey="p" title="Save you changes and refresh the page [alt-p]"><span class="cancelLink"><a href="javascript:void(0)" title="Cancel edit" id="mw-editform-cancel">Cancel</a></span></div><input class="mw-summary" id="wpSummary" maxlength="255" tabindex="1" size="60" spellcheck="true" title="Enter a short summary [alt-b]" accesskey="b" name="wpSummary" placeholder="Enter a brief summary of your changes" style="margin-top: 3px;margin-right: 5px;width: 50%;float: right;height: 17px;"><!-- editButtons --></div>');

			for(key in themeDict)
			{
				$('#themeSelect').append('<option value="ace/theme/'+themeDict[key]+'">'+key+'</option>');
			}

			$('#themeSelect').change(function(){
				var themeString = $('#themeSelect').val();
				editor.setTheme(themeString.toString());
			});

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

	

