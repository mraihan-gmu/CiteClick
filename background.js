importScripts('config.js');

chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed');
  const initialScholars = config.scholarIds.map(id => ({ id: id, name: undefined, citationCount: undefined }));
  chrome.storage.local.set({ scholars: initialScholars }, function() {
    console.log('Initial scholars set in storage');
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Received message:', request);
  if (request.action === "updateCitations") {
    console.log('Updating citations');
    updateAllCitations(sendResponse);
    return true;  // Indicates we will send a response asynchronously
  }
});

async function updateAllCitations(sendResponse) {
  try {
    const result = await chrome.storage.local.get('scholars');
    console.log('Retrieved scholars from storage:', result.scholars);
    const scholars = result.scholars || [];
    const updatePromises = scholars.map(scholar => fetchScholarPageWithRetry(scholar.id));
    const results = await Promise.all(updatePromises);
    console.log('All scholar pages fetched');
    sendResponse({ status: 'success', results: results });
  } catch (error) {
    console.error('Error fetching scholar pages:', error);
    sendResponse({ status: 'error', message: error.toString() });
  }
}

async function fetchScholarPageWithRetry(scholarId, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Fetching page for scholar ${scholarId}, attempt ${i + 1}`);
      const response = await fetch(`https://scholar.google.com/citations?user=${scholarId}&hl=en`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      console.log(`Received HTML for ${scholarId}, length:`, html.length);
      return { id: scholarId, html: html };
    } catch (error) {
      console.error(`Error fetching page for scholar ${scholarId}:`, error);
      if (i === retries - 1) {
        return { id: scholarId, error: error.message };
      }
      // Wait for a short time before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}