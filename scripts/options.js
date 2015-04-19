// Saves options to chrome.storage.sync.
function save_options() {
  var lic = document.getElementById('license').value;
  var automatic = document.getElementById('auto').checked;
  var anon  = document.getElementById('anon').checked;
  chrome.storage.sync.set({
    license: lic,
    auto: automatic,
    anonymous, anon
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    license: 'by',
    auto: false,
    anonymous: false
  }, function(items) {
    document.getElementById('license').value = items.license;
    document.getElementById('auto').checked = items.auto;
    document.getElementById('anon').checked = items.anonymous;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
