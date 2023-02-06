/*global chrome*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "word-meaning") {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const node = document.createTextNode(request.meaning);
      const span = document.createElement("span");
      span.appendChild(node);
      span.setAttribute("style", "color: red;");
      range.insertNode(span);
    }
  });
  