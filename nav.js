function addListener(evnt, elem, func) {
  if (elem.addEventListener) {
    elem.addEventListener(evnt, func, false);
  }
  else if (elem.attachEvent) {
    var r = elem.attachEvent("on"+evnt, func);
  }
  return r;
}

function $(id, suffix) {
  if (!suffix)
    return document.getElementById(id);
  else
    return document.getElementById(id + '-' + suffix);
}

String.prototype.rot13 = function(){
    return this.replace(/[a-zA-Z]/g, function(c){
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};

var sections = ['save-the-date', 'faq', 'guestbook'];

var guestbookInitialized = false;
function updateDisplay() {
  section = window.location.search.replace('?', '');

  // Sanitize our input.
  var found = false;
  for (var i = 0; i < sections.length; i++) {
    if (sections[i] == section) {
      found = true;
      break;
    }
  }

  if (!found) {
    section = 'save-the-date';
  }

  for (var i = 0; i < sections.length; i++) {
    var name = sections[i];

    function setDisplay(suffix, disp) {
      if (!$(name, suffix))
        return;

      // We can't make the guestbook display:none, because then when we unhide
      // it, the comment box grows a line for every character typed in WebKit.
      // So we move it offscreen.  (Our CSS sets the guestbook's top and left
      // to -4000px.)
      //
      // This is nuts, by the way.
      if (name == 'guestbook' && suffix == 'below') {
        if (disp == 'block') {
          $('guestbook-below').style.position = 'static';
        }
        else {
          $('guestbook-below').style.position = 'absolute';
        }

        return;
      }

      $(name, suffix).style.display = disp;
    }

    if (section == name) {
      setDisplay('above', 'block');
      setDisplay('below', 'block');
      setDisplay('link', 'none');
      setDisplay('span', 'inline');
    }
    else {
      setDisplay('above', 'none');
      setDisplay('below', 'none');
      setDisplay('link', 'inline');
      setDisplay('span', 'none');
    }
  }
}

// We'll call init() from within a <script> at the bottom of the page.
// The right thing to do would be to call this on DOMContentLoaded.  But the
// hacks I've found [1] for doing this on IE apparently don't run the script
// early enough.

function init() {
  if (history.pushState) {

    function setLink(name) {
      $(name, 'link').onclick = function() {
        return navigate(name);
      }
    }

    for (var i = 0; i < sections.length; i++) {
      setLink(sections[i]);
    }

    // ugh.
    $('guestbook-link-2').onclick = function() {
      return navigate('guestbook');
    }

  }

  function setMailto(name, addr) {
    email = addr.rot13() + '@tznvy.pbz'.rot13();
    $(name, 'mailto').innerHTML = email;
    $(name, 'mailto').href = 'mailto:' + email;
  }

  setMailto('justin', 'whfgva.yrone');
  setMailto('caroline', 'pnebyvar.fpurezre');
  setMailto('kathy', 'obo.xngul.fpurezre');
  setMailto('josie', 'wyrone');

  updateDisplay();
}

addListener('popstate', window, function(e) {
  updateDisplay();
});

function navigate(to) {
  if (history.pushState) {
    history.pushState(to, to, '?' + to);
    window.scrollTo(0, 0);
    updateDisplay();
    return false;
  }
  else {
    return true;
  }
}
