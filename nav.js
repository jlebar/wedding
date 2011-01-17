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

  // Set up the guestbook here.  We could put this code inside index.html, but
  // putting it here makes the page load faster initially.
  if (name == 'guestbook' && !guestbookInitialized) {
    guestbookInitialized = true;

    var disqus_shortname = 'jcwedding';
    var disqus_identifier = 'DD8BE082-E3A0-09BA-DE24618AE45FE30B';
    var disqus_url = 'http://jlebar.com/wedding';

    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  }
}

addListener('load', window, function() {
  if (history.pushState) {
    function setLink(name) {
      $(name + '-link').onclick = function() {
        return navigate(name);
      }
    }

    for (var i = 0; i < sections.length; i++) {
      setLink(sections[i]);
    }
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
