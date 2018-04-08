/* Installation Script for Mozilla Suite, Firefox (Firebird, Phoenix) < 0.9.x, Seamonkey */

/* General */
var contentFlag         = CONTENT | PROFILE_CHROME;
var localeFlag          = LOCALE | PROFILE_CHROME;
var skinFlag            = SKIN | PROFILE_CHROME;
var profileFolder       = getFolder("Current User", "chrome");
var error               = null;
var name                = "asm";
var jarName             = name + ".jar";
var existsInApplication = File.exists(getFolder(getFolder("chrome"), jarName));
var existsInProfile     = File.exists(getFolder(profileFolder, jarName));
var displayName         = "\"Add-on Structure Maker\"";
var version             = "0.1";
var locales             = new Array("en-US", "it-IT");
var skins               = new Array("classic");


/*  
If the extension exists in the application folder or
if the extension doesn"t exist in the profile folder and
if the user doesn't wont to install it.
*/
if (existsInApplication || (!existsInProfile && !confirm("Do you want to install the " + displayName + " extension into your profile folder?"))) {
   contentFlag   = CONTENT | DELAYED_CHROME;
   profileFolder = getFolder("chrome");
   localeFlag    = LOCALE | DELAYED_CHROME;
   skinFlag      = SKIN | DELAYED_CHROME;
   }

initInstall(displayName, name, version);
setPackageFolder(profileFolder);
error = addFile(name, version, "chrome/" + jarName, profileFolder, null);    

/* If adding the *.jar file succeeded */
if(error == SUCCESS) {
    profileFolder = getFolder(profileFolder, jarName);
    
    registerChrome(contentFlag, profileFolder, "content/");
    for (var i = 0; i < locales.length; i++) {
        registerChrome(localeFlag, profileFolder, "locale/" + locales[i] + "/");
    }

    for (var i = 0; i < skins.length; i++) {
        registerChrome(skinFlag, profileFolder, "skin/" + skins[i] + "/");
    }

    error = performInstall();

    /* If the install failed */
    if(error != SUCCESS && error != 999 && error != -239) {
      displayError(error);
    	cancelInstall(error);
    } else {
        alert("The installation of the " + displayName + " extension succeeded.");
    }
} else {
    displayError(error);
	  cancelInstall(error);
}

/* Displays the error message to the user */
function displayError(error) {
    if(error == -215) {
        alert("The installation of the " + displayName + " extension failed.\nOne of the files being overwritten is read-only.");
    } else if(error == -235) {
        alert("The installation of the " + displayName + " extension failed.\nThere is insufficient disk space.");
    } else {
        alert("The installation of the " + displayName + " extension failed.\nThe error code is: " + error + ".\nCheck error code: http://developer.mozilla.org/en/docs/XPInstall_API_Reference:Return_Codes");
    }
}

