/*
* Javascript functions about search function
*
* @ author:         Luca90
* @ homepage:       http://www.luca90.netsons.org/ext.php (sooner)
* @ email:          lucavall90@gmail.com
* @ subversion:     0.3.1
* @ last modified:  30th July 2007 19:00 pm 
*
* Notes:
*   Check comments language
*/

function getSearch() {
  var text = document.getElementById('searchbox').value;
  if (text == '') {
    alert(getBundleService('search', 'errorNoTextToSearch'));
  } else {
      if (document.getElementById('ext').selected) {
        var searchUrl = 'http://www.extenzilla.org/search.php?cerca=' + text;
      } else if (document.getElementById('site').selected) {
        var searchUrl = 'http://www.google.it/search?hl=it&q=' + text + '+site%3Awww.extenzilla.org&btnG=Cerca+con+Google&meta=lr%3Dlang_it';
      } else if (document.getElementById('forum').selected) {
        var searchUrl = 'http://forum.extenzilla.org/index.php?action=search2&advanced=0&search=' +text;
      } else {
          alert(getBundleService('search', 'errorGeneral'));
          close();
      } 
      window.opener.getBrowser().selectedTab = window.opener.getBrowser().addTab(searchUrl);
      close();
    }
}
