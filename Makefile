all: stage publish

stage:
	rsync -a . /home/jlebar/afs-home/WWW/wedding

publish:
	rsync -a .htaccess index.html style*.css nav.js images fonts jlebar_jlebar-blog@ssh.phx.nearlyfreespeech.net:wedding
