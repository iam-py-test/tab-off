chrome.contextMenus.removeAll()
var hasPerm = async function(perm){
	return new Promise(res => {
		chrome.permissions.contains({permissions:[perm]},res)
		return false;
	})
}
chrome.contextMenus.create({title:"Unload tab",id:"1234",contexts:["page","browser_action"]},function(){
	console.log("Error:",chrome.runtime.lastError)
	chrome.contextMenus.onClicked.addListener(async function(d,t){
		if(d.menuItemId === "1234"){
			chrome.tabs.update(t.id,{url:chrome.runtime.getURL("disable.html") + "?url=" + encodeURIComponent(t.url) + "&title=" + encodeURIComponent(t.title)})
			return;
		}
		if(d.menuItemId === "x"){
			if(await hasPerm("tabs") === true){
				chrome.tabs.query({},function(tabs){
						tabs.forEach((tab) => chrome.tabs.update(tab.id,{url:chrome.runtime.getURL("disable.html") + "?url=" + encodeURIComponent(tab.url) + "&title=" + encodeURIComponent(tab.title) + "&all=true"}))
				})
			}
			else{
				chrome.permissions.request({permissions:["tabs"]},function(got){
					if(got === true){
						chrome.tabs.query({},function(tabs){
					tabs.forEach((tab) => chrome.tabs.update(tab.id,{url:chrome.runtime.getURL("disable.html") + "?url=" + encodeURIComponent(tab.url) + "&title=" + encodeURIComponent(tab.title) + "&all=true"}))
				})
					}
				})
			}
		}
		if(d.menuItemId === "d"){
			chrome.tabs.query({active:false},async (tabs) => {
				tabs.forEach((t) => chrome.tabs.discard(t.id))
			})
		}
	})
	})
chrome.contextMenus.create({contexts:["browser_action"],title:"Unload all tabs",id:"x"})
chrome.contextMenus.create({contexts:["browser_action"],title:"Discard all (Non-active) tabs",id:"d"})
chrome.commands.onCommand.addListener(async function() {
	if(await hasPerm("tabs") === true){
				chrome.tabs.query({},function(tabs){
						tabs.forEach((tab) => {
							chrome.tabs.update(tab.id,{discarded:!tab.active,url:chrome.runtime.getURL("disable.html") + "?url=" + encodeURIComponent(tab.url) + "&title=" + encodeURIComponent(tab.title) + "&all=true"})
							})
				})
				return;
			}
			else{
				chrome.permissions.request({permissions:["tabs"]},function(got){
					if(got === true){
						chrome.tabs.query({},function(tabs){
						tabs.forEach((tab) => chrome.tabs.update(tab.id,{url:chrome.runtime.getURL("disable.html") + "?url=" + encodeURIComponent(tab.url) + "&title=" + encodeURIComponent(tab.title) + "&all=true"}))
				})
					}
				})
				return;
			}
});
