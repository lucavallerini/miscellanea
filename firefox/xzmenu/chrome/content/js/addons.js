/*
* Shared javascript functions
*
* @ author:         Luca90
* @ homepage:       http://www.luca90.netsons.org/ext.php (sooner)
* @ email:          lucavall90@gmail.com
* @ subversion:     0.2.2
* @ last modified:  29th August 2007 19:40 pm 
*
* Notes:
*   Check comments language
*   Check 'connection' with shared.js script
*/

/*Bundle services */
function getBS(bSTRING) {
  getBundleService('addons', bSTRING);
}
/*
var gBundle 		= Components.classes['@mozilla.org/intl/stringbundle;1']
				          .getService(Components.interfaces.nsIStringBundleService);
var extreleasestrings 	= gBundle.createBundle('chrome://xzmenu/locale/addons.properties');
*/

/* BBCode Translation */
function getBBCode() {	
	/* Variables list */
	/* Bundle list */
	

	var warningBBCode 		   = extreleasestrings.GetStringFromName('warningBBCode');
	var brutalBBCode	   		 = extreleasestrings.GetStringFromName('brutalBBCode');
	var itITBBCode	   		   = extreleasestrings.GetStringFromName('itITBBCode');
	var bugBBCode	   	       = extreleasestrings.GetStringFromName('bugBBCode');
	var buglistBBCode   		 = extreleasestrings.GetStringFromName('buglistBBCode');
	/*var nameBBCode           = extreleasestrings.GetStringFromName('nameBBCode');
	var authorBBCode         = extreleasestrings.GetStringFromName('authorBBCode');*/
	var localizatorBBCode    = extreleasestrings.GetStringFromName('localizatorBBCode');
	var lastupdateBBCode     = extreleasestrings.GetStringFromName('lastupdateBBCode');
	var sizeBBCode           = extreleasestrings.GetStringFromName('sizeBBCode');
	var compBBCode           = extreleasestrings.GetStringFromName('compBBCode');
	var websiteBBCode        = extreleasestrings.GetStringFromName('websiteBBCode');
	var versionBBCode        = extreleasestrings.GetStringFromName('versionBBCode');
	var clickHereBBCode      = extreleasestrings.GetStringFromName('clickHereBBCode');
	var downloadITBBCode     = extreleasestrings.GetStringFromName('downloadITBBCode');
	var screensBBCode        = extreleasestrings.GetStringFromName('screensBBCode');
	
	var requiredsWarning		 = extreleasestrings.GetStringFromName('requiredsWarning');
	var nameWarning    		   = extreleasestrings.GetStringFromName('nameWarning');
	var authorWarning   		 = extreleasestrings.GetStringFromName('authorWarning');
	var localizatorWarning   = extreleasestrings.GetStringFromName('localizatorWarning');
	var versionWarning		   = extreleasestrings.GetStringFromName('versionWarning');
	var lastupdateWarning  	 = extreleasestrings.GetStringFromName('lastupdateWarning');
	var sizeWarning	   		   = extreleasestrings.GetStringFromName('sizeWarning');
	var websiteWarning		   = extreleasestrings.GetStringFromName('websiteWarning');
	var descriptionWarning	 = extreleasestrings.GetStringFromName('descriptionWarning');
	var stringCompWarning 	 = extreleasestrings.GetStringFromName('stringCompWarning');
	var uplinkWarning    		 = extreleasestrings.GetStringFromName('uplinkWarning');
	
	/* General */
	var name        	= document.getElementById('name').value;
	var author      	= document.getElementById('author').value;
	var localizator 	= document.getElementById('localizator').value;
	var version     	= document.getElementById('version').value;
	var lastupdate 	  = document.getElementById('lastupdate').value;
	var size        	= document.getElementById('size').value;
	var website     	= document.getElementById('website').value;
	
	/* Compatibility */
	var compArray = [
					[document.getElementById('ffc'),document.getElementById('fft'),'http://images.extenzilla.org/logos/ff.png'],
					[document.getElementById('tbc'),document.getElementById('tbt'),'http://images.extenzilla.org/logos/tb.png'],
				  [document.getElementById('msc'),document.getElementById('mst'),'http://images.extenzilla.org/logos/mas.png'],
					[document.getElementById('smc'),document.getElementById('smt'),'http://www.extenzilla.org/img/sm_s.gif'],
					[document.getElementById('sbc'),document.getElementById('sbt'),'http://images.extenzilla.org/logos/sun.png'],
					[document.getElementById('nvuc'),document.getElementById('nvut'),'http://images.extenzilla.org/logos/nvu.png'],
					[document.getElementById('nsc'),document.getElementById('nst'),'http://images.extenzilla.org/logos/nts.png'],
					[document.getElementById('flc'),document.getElementById('flt'),'http://images.extenzilla.org/logos/flock.png'],
					];
	
	var comp = new Array();	
	
	/* Description */
	var description = document.getElementById('description').value; 

	/* Links */
	var uplink 	     = document.getElementById('uplink').value;
	var screenArray  = new Array(document.getElementById('screen0').value,document.getElementById('screen1').value,document.getElementById('screen2').value);
	var screen       = new Array();

	/* Others */
	var brutal     = '[quote][b][color=#FF0000]' + warningBBCode + '[/color][/b]:' + brutalBBCode + '[/quote]\n\n';
	var itIT       = '[quote][color=#FF0000][size=8pt][b]' + itITBBCode + '[/b][/size][/color][/quote]\n\n';
	var buglistTmp = document.getElementById('buglist').value;	
	var buglist    = '[quote][b][color=#FF0000]' + warningBBCode + '[/color][/b]:' + bugBBCode +
			             '\n[b]' + buglistBBCode + '[/b]:' + '[list]' + 
			             '\n' + buglistTmp +
			             '\n[/list][/quote]\n\n';
	
	var otherArray = [
					[document.getElementById('brutal'),brutal],
					[document.getElementById('itIT'),itIT],
					[document.getElementById('bug'),buglist]
					];
				
	var other = new Array();
	
	/* Controls required elements*/
	var requiredElementsArray = [
						[name,nameWarning],
						[author,authorWarning],
						[localizator,localizatorWarning],
						[version,versionWarning],
						[size,sizeWarning],
						[lastupdate,lastupdateWarning],
						[website,websiteWarning],
						[description,descriptionWarning],
						[uplink,uplinkWarning],
						[string,stringCompWarning]
						];
	
	var requireds = new Array();
	
	/* Get compability properties */
	for (var i = 0; i < compArray.length; i++) {
		if (compArray[i][0].checked == true) {
		var compTmp = new Array(compArray[i][1].value);
		var imgTmp = new Array(compArray[i][2]);
		var comp = comp.concat(['([img]' + imgTmp + '[/img])',[compTmp]]);
		} else {
			var string = '';
		   }
	}
	
	var string = comp.join(' ');
	
	/* Get screenshots */
	for (var j = 0; j < screenArray.length; j++) {
		if (screenArray[j] != '') {
			var screenTmp = new Array (screenArray[j]);
			var screen = screen.concat('[img]' + screenTmp + '[/img]');
		} else {
			screens = '';
		}
	}
	
	var screens = '\n\n' + screen.join('\n');
	
	/* Get additives properties */
	for (var k = 0; k < otherArray.length; k++) {
		if (otherArray[k][0].checked == true) {
			var otherTmp = new Array(otherArray[k][1]);
			var other = other.concat(otherTmp);
		} else {
			var others = '\n';
		}
	}
	
	var others = '\n' + other.join(' ');
	
	
	/* Controls required elements */
	for (var l = 0; l <requiredElementsArray.length; l++) {
		if(requiredElementsArray[l][0] == '') {
		var requireds = requireds.concat(['\n'],[requiredElementsArray[l][1]]);
		} 
	} 
	
	var elements = requireds.join('');
	
	if (requireds.length != 0) {
		alert(requiredsWarning + elements);
	} else {
	
	/* BBCode Translation */
	document.getElementById('output').value =  
	'[b]' + getBS('nameBBCode') + ' [/b]' + name +
	'\n[b]' + getBS('authorBBCode') + ' [/b]' + author +
	'\n[b]' + localizatorBBCode + ' [/b]' + localizator +
	'\n[b]' + versionBBCode + ' [/b]' + version +
	'\n[b]' + sizeBBCode + ' [/b]' + size + ' KB' +
	'\n[b]' + lastupdateBBCode + ' [/b]' + lastupdate +
	'\n[b]' + compBBCode + ' [/b]' + string +
	'\n[b]' + websiteBBCode + ' [/b]' + '[url=' + website + ']' + clickHereBBCode + '[/url]' +
	'\n' + '\n' + description + '\n' + others +
	'[b]' + downloadITBBCode + ' [/b]' + '[url=' + uplink + ']' +
	'[b]' + clickHereBBCode + '[/b][/url]' + '[b]' + screensBBCode + '[/b]' + screens;
	
	}
}

/* Copy all the test into the output textbox */
function copy() {
  var text = document.getElementById('output').value;
  
  var string = Components.classes["@mozilla.org/supports-string;1"]
               .createInstance(Components.interfaces.nsISupportsString);
  
  if (!string) {
    return false;
    }
  
  string.data = text;
  
  var transfers = Components.classes["@mozilla.org/widget/transferable;1"]
                  .createInstance(Components.interfaces.nsITransferable);
  
  if (!transfers) {
    return false;
  }
  
  transfers.addDataFlavor('text/unicode');
  transfers.setTransferData('text/unicode', string, text.length * 2);
  
  var clipboardTmp = Components.interfaces.nsIClipboard;
  var clipboard    = Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipboardTmp);
  
  if (!clipboard) {
    return false;
  }
  
  clipboard.setData(transfers, null, clipboardTmp.kGlobalClipboard);
}

/* Get today date */
function getDate() {
	var date = new Date;
	var dayTmp = date.getDate();
	var monthTmp = date.getMonth() + 1;
	var year = date.getFullYear();
	
	if (dayTmp < 10 && monthTmp < 10) {
		var day = '0' + dayTmp;
		var month = '0' + monthTmp;
	} else if (dayTmp < 10) {
		  var day = '0' + dayTmp;
		  var month = monthTmp;
	    } else if (monthTmp < 10){
        var day = dayTmp;
        var month = '0' + monthTmp;
        } else {
          var day = dayTmp;
          var month = monthTmp;
        }
      
	document.getElementById('lastupdate').value = day + '.' + month + '.' + year;
}

/* Export or import extension's schedule */
function exportAll(){
  var exportFilePicker = extreleasestrings.GetStringFromName('exportFilePicker');
	var filedata = document.getElementById('output').value;
	
	var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes['@mozilla.org/filepicker;1']
	         .createInstance(nsIFilePicker);
	fp.init(window, exportFilePicker, nsIFilePicker.modeSave);
	fp.appendFilters(nsIFilePicker.filterText);
	fp.defaultString = document.getElementById('name').value;
	fp.defaultExtension = '.txt';
	
	var od = fp.show();
	if (od == nsIFilePicker.returnOK) {
	var exportFile = Components.classes['@mozilla.org/network/file-output-stream;1']
                     .createInstance(Components.interfaces.nsIFileOutputStream);
	exportFile.init(fp.file, 0x02 | 0x08, 0664, 0);
	exportFile.write(filedata, filedata.length);
	exportFile.close();
	} 
}

function importAll() {
	var importFilePicker = extreleasestrings.GetStringFromName('importFilePicker');
  var data ='';
	
	var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes['@mozilla.org/filepicker;1']
	         .createInstance(nsIFilePicker);
	fp.init(window, importFilePicker, nsIFilePicker.modeOpen);
	fp.appendFilters(nsIFilePicker.filterText);
	
	var od = fp.show();
	if (od == nsIFilePicker.returnOK) {
	var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                        .createInstance(Components.interfaces.nsIFileInputStream);
	var sstream = Components.classes["@mozilla.org/scriptableinputstream;1"]
                        .createInstance(Components.interfaces.nsIScriptableInputStream);
	fstream.init(fp.file, -1, 0, 0);
	sstream.init(fstream); 

	var str = sstream.read(4096);
	while (str.length > 0) {
 	 data += str;
 	 str = sstream.read(4096);
	}
	sstream.close();
	fstream.close();
	
	document.getElementById('output').value = data;
	}
}
