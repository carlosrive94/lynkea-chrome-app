function lynkPage(info, tab) {
  let id = info.menuItemId;
  let lyst = id.substring(8,id.length);
  console.log('Lynk page ' + info.pageUrl + ' into Lyst ' + lyst);
}

function lynkSelection(info, tab) {
	let id = info.menuItemId;
	let lyst = id.substring(9,id.length);
	console.log('Lynk selection ' + info.selectionText + ' into Lyst ' + lyst);
}

function lynkLink(info, tab) {
	let id = info.menuItemId;
	let lyst = id.substring(9,id.length);
	console.log('Lynk link ' + info.linkUrl + ' into Lyst ' + lyst);
}

function lynkImage(info, tab){
	let id = info.menuItemId;
	let lyst = id.substring(9,id.length);
	console.log('Lynk image ' + info.srcUrl + ' into Lyst ' + lyst);
}

for (var i = 0; i < 5; ++i){
	chrome.contextMenus.create({
		"title": "Lynkea page en Lista " + i,
		"id": "LynkPage" + i,
		"contexts": ["page"],
		"onclick": lynkPage,
	});
	
	chrome.contextMenus.create({
		"title": "Lynkea selection en Lista " + i,
		"id": "LynkSelection" + i,
		"contexts": ["selection"],
		"onclick": lynkSelection,
	});
	
	chrome.contextMenus.create({
		"title": "Lynkea link en Lista " + i,
		"id": "LynkLink" + i,
		"contexts": ["link"],
		"onclick": lynkLink,
	});
	
	chrome.contextMenus.create({
		"title": 'Lynkea image ' + i,
		"id": "LynkImage" + i,
		"contexts": ["image"],
		"onclick": lynkImage
	});
}