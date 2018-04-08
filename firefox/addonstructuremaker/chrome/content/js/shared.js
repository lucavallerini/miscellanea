/*
* Shared javascript functions
*/

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
  bundleNAME = gBundleService.createBundle('chrome://asm/locale/' + bundleNAME + '.properties');
  var bstring = bundleNAME.GetStringFromName(bundleSTRING);
  return bstring;
}
