REMOTEHOST=jlebar_jlebar-blog@ssh.phx.nearlyfreespeech.net
RSYNC_FLAGS=-a --copy-links --copy-dirlinks
FILES=.htaccess index.html style*.css nav.js images fonts mediaelement

stage:
	rsync $(RSYNC_FLAGS) $(FILES) $(REMOTEHOST):wedding/staging

publish:
	rsync $(RSYNC_FLAGS) $(FILES) $(REMOTEHOST):wedding
