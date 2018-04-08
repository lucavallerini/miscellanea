/*
* Log in/out javascript functions
*
* @ author:         Luca90
* @ homepage:       http://www.luca90.netsons.org/ext.php (sooner)
* @ email:          lucavall90@gmail.com
* @ subversion:     0.5
* @ last modified:  27th July 2007 15:26 pm 
*
* Notes:
*   Check comments language
*/

function getBS(bSTRING) {
  getBundleService('login', bSTRING);
}

function getLogin() {
  var xrequest = new XMLHttpRequest();
  
  if (document.getElementById('cookielengthexpire').checked) {
    var cookie = '-1';
  } else {
    var cookie = document.getElementById('cookielength').value;
  }
  
  var form = 'user=' + encodeURIComponent(document.getElementById('user').value) + '&passwrd=' +
             encodeURIComponent(document.getElementById('passwrd').value) + '&cookielength=' + cookie;
  
  xrequest.onreadystatechange = getResponse;
  xrequest.open('POST', 'http://forum.extenzilla.org/index.php?action=login2', true);
  xrequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xrequest.setRequestHeader('Content-length', form.length);
  xrequest.setRequestHeader('Connection', 'close');
  xrequest.send(form);
  
  function getResponse() {
    if (xrequest.readyState == 4) {
      if (xrequest.status == 200) {
          if (xrequest.responseText == '') {
            window.opener.getBrowser().selectedTab = window.opener.getBrowser().addTab('http://forum.extenzilla.org/index.php');
            window.close();
          } else {
            alert(getBS('errorUserPswdNotCorrect'));
          }
      } else {
          alert(xrequest.status + ': ' + xrequest.statusText);
      } 
    }
  }
  
}
