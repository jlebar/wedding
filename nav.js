function addListener(evnt, elem, func) {
  if (elem.addEventListener) {
    elem.addEventListener(evnt, func, false);
  }
  else if (elem.attachEvent) {
    var r = elem.attachEvent("on"+evnt, func);
  }
  return r;
}

function $(id) {
  return document.getElementById(id);
}

function updateDisplay() {
  section = window.location.search.replace('?', '');

  // Sanitize our input.  It might make sense to use the sections variable to
  // do this, but I hear IE doesn't support Array.indexOf().
  if (section != 'faq' && section != 'registry' && section != 'guestbook') {
    section = 'save-the-date';
  }

  var sections = ['save-the-date', 'faq', 'registry', 'guestbook'];
  for (var i = 0; i < sections.length; i++) {
    var name = sections[i];

    if (section == name) {
      $(name).style.display = 'block';
      $(name + '-link').style.display = 'none';
      $(name + '-span').style.display = 'inline';
    }
    else {
      $(name).style.display = 'none';
      $(name + '-link').style.display = 'inline';
      $(name + '-span').style.display = 'none';
    }
  }
}

addListener('load', window, function() {
  if (history.pushState) {
    function setLink(name) {
      $(name + '-link').onclick = function() {
        return navigate(name);
      }
    }

    setLink('save-the-date');
    setLink('faq');
    setLink('registry');
    setLink('guestbook');
  }

  updateDisplay();
});

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
