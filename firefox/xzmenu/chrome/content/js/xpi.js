/*
* (Creazione scheda) javascript functions
*
* @ author:         Luca90
* @ homepage:       http://www.luca90.netsons.org/ext.php (sooner)
* @ email:          lucavall90@gmail.com
* @ subversion:     0.1
* @ last modified:  30th July 2007 16:36 pm 
*
* Notes:
*   Check functionality
*   Check comments language
*/

function getBS(bSTRING) {
  getBundleService("xpi", bSTRING);
}

function analizeXpi() {
  var xpiFile = null;
  var xpiSize = null;
  
  /* open and read xpi file */
  var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes["@mozilla.org/filepicker;1"]
	         .createInstance(nsIFilePicker);
	fp.init(window, "getBS(\"openFilterPicker\")", nsIFilePicker.modeOpen);
	fp.appendFilter("getBS(\"xpiFilterTitle\")", "*.xpi");
	if (fp.show() == nsIFilePicker.returnOK) {
    xpiFile = fp.file;
    xpiSize = fp.fileSize;
    var zp = Components.classes["@mozilla.org/libjar/zip-reader;1"]
              .createInstance(Components.interfaces.nsIZipReader);
    zp.init(xpiFile);
    zp.open();
    
    /* read items init zip file and generate schedule */
    var installrdf = zp.findEntries("install.rdf");
    
    return installrdf;
    return xpiSize;
    
    /* close zip reader */    
    zp.close();
  }
  
}

function returnSchedule() {
  analizeXpi();
  
  alert(xpiSize);
  alert(installrdf);
}
