REMOTEHOST=jlebar_jlebar-blog@ssh.phx.nearlyfreespeech.net
RSYNC_FLAGS=-a
FILES=.htaccess index.html style*.css nav.js images fonts 

stage:
	rsync $(RSYNC_FLAGS) $(FILES) $(REMOTEHOST):wedding/staging

publish:
	rsync $(RSYNC_FLAGS) $(FILES) $(REMOTEHOST):wedding
