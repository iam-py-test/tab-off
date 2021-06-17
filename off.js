var us = new URLSearchParams(location.search)
	 document.title = "Disabled tab - " + us.get("title") 
	 var italics = document.createElement("i");
	 italics.textContent = us.get("title") 
	 document.getElementById("dis").appendChild(italics)
	 document.getElementById("dis").appendChild(document.createTextNode(" is disabled"))
	 var uLink = document.getElementById("url")
	 uLink.href = us.get("url")
	 uLink.textContent = "Click to reenable"
	 uLink.style.color = "blue"
	 uLink.onclick = function(e){
		 e.preventDefault();
		 try{
		 if(typeof history === "object"){
			 if(history.length > 1 & typeof history.back === "function"){
					 history.back();
					 return false;
			 }
		 }
		 }
		 catch(err){
		 }
		 //if history is not an option
		 chrome.tabs.query({currentWindow:true,active:true},function(t){
			 chrome.tabs.update(t.id,{url:uLink.href})
			})
	 }
		 chrome.tabs.query({active:true,currentWindow:true},function(tab){
			 if(tab === undefined){
				 return false;
			 }
			 if(tab !== [] & tab.length !== 0){
				 console.log(tab)
			 window.id = tab[0].id
		 chrome.tabs.onActiveChanged.addListener(() => {chrome.tabs.discard(window.id)})
			 }
		 })