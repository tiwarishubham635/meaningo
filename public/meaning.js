/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "meaningo",
        title: "Get Meaning", 
        contexts: ['selection'] 
    });
  });

chrome.contextMenus.onClicked.addListener( (clickData, tab) => {
    if(clickData.menuItemId === "meaningo"){
        const word = clickData.selectionText;
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
        let meaning = "! Meaning not found !!";
        
        fetch(url)
        .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error(`Response status was not 200, it was ${response.status}`);
            }
          })
          .then(data => {
            meaning = ((data[0].meanings)[0].definitions)[0].definition;
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "word-meaning", meaning: meaning.slice(0,-1) });
              });
          })
          .catch(error => {
            console.log("Error: ", error);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "word-meaning", meaning: meaning.slice(0,-1) });
              });
          });
    }
})