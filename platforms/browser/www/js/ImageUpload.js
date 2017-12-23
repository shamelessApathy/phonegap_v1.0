// Tool in OOP ES5 to upload images via phonegap android app
var ImageUpload = function(){
    this.init = function()
    {
        function getCookie(cname) 
        {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        console.log('inside init() funciton of ImageUpload');   
        var user_id = getCookie("user_id");
        console.log(user_id);
        
    }
    this.listen = function()
    {
        $('#ie-upload-submit').on('click', function(e) 
        {
            e.preventDefault();
            var file = $('#image_file');
            console.log(file[0].files[0]);
            var true_file = file[0].files[0];
              var fd = new FormData();
              fd.append("afile", true_file);
              // These extra params aren't necessary but show that you can include other data.
              fd.append("username", "Groucho");
              fd.append("accountnum", 123456);
              var xhr = new XMLHttpRequest();
              xhr.open('POST', 'https://sharefuly.com/api/test', true);
              
              xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                  var percentComplete = (e.loaded / e.total) * 100;
                  console.log(percentComplete + '% uploaded');
                }
              };
              xhr.onload = function() {
                if (this.status == 200) {
                  var resp = this.response; 
                  console.log('Server got:', resp);
                  var image = document.createElement('img');
                  image.src = resp.dataUrl;
                  document.body.appendChild(image);
                };
              };
              xhr.send(fd);  
        })
    }
    this.init();
    this.listen();
}

var iu = new ImageUpload();