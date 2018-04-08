/*
* Shared javascript functions
*
* @ author:         Luca90
* @ homepage:       http://www.luca90.netsons.org/ext.php (sooner)
* @ email:          lucavall90@gmail.com
* @ subversion:     0.5
* @ last modified:  27th July 2007 15:28 pm 
*
* Notes:
*   Check comments language
*/

// Load pages into selected tab or new tab with left-click or central-click
function load(event, url) {
  if (event && event.button == 1) {
	  getBrowser().selectedTab = getBrowser().addTab(url);
  } else {
      loadURI(url);
    }
}

// Get element focus
function getFocus(elementID) {
  var element = document.getElementById(elementID);
  element.focus();
}

/*
* (Attivare/Disattivare campi di testo tramite checkbox)
* 
* Parameters description:
*   @checkboxID => the ID value of the checkbox
*   @textboxID  => the ID value of the textbox 
*
*/
function getEnabledDisabled(checkboxID, textboxID) {
  var checkbox = document.getElementById(checkboxID);
  var textbox  = document.getElementById(textboxID);
  if (textbox.disabled) {
    if (checkbox.checked == true) {
      textbox.disabled == false;
      getFocus(textboxID);
    } else {
      textbox.disabled == true;
    }
  } else {
      if (checkbox.checked == true) {
        textbox.disabled == true;
      } else {
        textbox.disabled == false;
        getFocus(textboxID);
    }
  }
}

/*
* Creates and returns bundle service
* 
* Parameters description:
*   @bundleNAME   => the NAME of the bundle
*   @bundleSTRING => the STRING to be returned
*   
*/
function getBundleService(bundleNAME, bundleSTRING) {
  var gBundleService = Components.classes['@mozilla.org/intl/stringbundle;1']
                        .getService(Components.interfaces.nsIStringBundleService);
  bundleNAME = gBundleService.createBundle('chrome://xzmenu/locale/' + bundleNAME + '.properties');
  var bstring = bundleNAME.GetStringFromName(bundleSTRING);
  return bstring;
}
