function updateScholarList() {
  const scholarList = document.getElementById('scholarList');
  chrome.storage.local.get('scholars', function(result) {
    let scholars = result.scholars || [];
    
    // Sort scholars by citation count (descending order)
    scholars.sort((a, b) => {
      const countA = parseInt(a.citationCount) || 0;
      const countB = parseInt(b.citationCount) || 0;
      return countB - countA;
    });
    
    scholarList.innerHTML = scholars.map((scholar, index) => `
      <div class="scholar">
        <span class="scholarRank">#${index + 1}</span>
        <span class="scholarName ${scholar.name === 'Nishat Raihan' ? 'highlight' : ''}">${scholar.name || 'Loading...'}</span>
        <span class="citationCount">${scholar.citationCount || 'Loading...'}</span>
      </div>
    `).join('');
  });
}

function parseScholarInfo(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const nameElement = doc.querySelector('#gsc_prf_in');
  const citationElement = doc.querySelector('#gsc_rsb_st td.gsc_rsb_std');
  return {
    name: nameElement ? nameElement.textContent.trim() : 'N/A',
    citationCount: citationElement ? citationElement.textContent.trim() : 'N/A'
  };
}

function updateScholar(scholarId, updateData) {
  return new Promise((resolve) => {
    chrome.storage.local.get('scholars', function(data) {
      const updatedScholars = data.scholars.map(s => 
        s.id === scholarId ? { ...s, ...updateData } : s
      );
      chrome.storage.local.set({ scholars: updatedScholars }, () => {
        resolve();
        updateScholarList();
      });
    });
  });
}

document.getElementById('updateButton').addEventListener('click', function() {
  this.textContent = 'Updating...';
  this.disabled = true;
  
  chrome.runtime.sendMessage({ action: "updateCitations" }, async function(response) {
    if (response.status === 'success') {
      for (const result of response.results) {
        if (result.html) {
          const scholarInfo = parseScholarInfo(result.html);
          await updateScholar(result.id, { 
            name: scholarInfo.name, 
            citationCount: scholarInfo.citationCount 
          });
        } else if (result.error) {
          await updateScholar(result.id, { 
            name: 'Error', 
            citationCount: `Error: ${result.error}` 
          });
        }
      }
    } else {
      console.error('Error updating citations:', response.message);
    }
    
    document.getElementById('updateButton').textContent = 'Update Citations';
    document.getElementById('updateButton').disabled = false;
  });
});

document.addEventListener('DOMContentLoaded', updateScholarList);