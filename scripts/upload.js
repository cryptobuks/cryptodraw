document.addEventListener("DOMContentLoaded", function () {
  // The URL of the image to load is passed on the URL fragment.
  var imageUrl = window.location.hash.substring(1);
  console.log("url", imageUrl);

  if (imageUrl) {
    var xhr;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var data = "id=" + imageUrl;

    xhr.open("POST", "insert.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

    xhr.onreadystatechange = display_data;

    function display_data() {

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                document.getElementById("display").innerHTML = xhr.responseText;
                document.getElementById("loading").innerHTML = "";
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}
}
});

