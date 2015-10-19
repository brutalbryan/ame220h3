function imageUploaded(osType)
{
   var file = $('#uploadImage').get(0);
   if(file.files[0].type.split("/")[0].toLowerCase() != "image"){
        alert("Incorrect file type -- Please ensure you are uploading an image file.");
   }
   if ( file.files && file.files[0] && file.files[0].type.split("/")[0].toLowerCase() === "image") {
        var FR = new FileReader();
        FR.onload = function(e) {
            var data = e.target.result;
            var canvas = document.createElement("canvas");
            var img = document.createElement("img");
            img.onload= function(){
                 var MAX_WIDTH = 512;
                 var MAX_HEIGHT = 512;
                 var width = img.width;
                 var height = img.height;
                 var w2 = width;
                 var h2 = height;
                 if (width > height) {
                     if (width > MAX_WIDTH) {
                        h2 = height * MAX_WIDTH / width;
                        w2 = MAX_WIDTH;
                    }
                 } else {
                     if (height > MAX_HEIGHT) {
                        w2 = width * MAX_HEIGHT / height;
                        h2 = MAX_HEIGHT;
                    }
                }
                canvas.width = w2;
                canvas.height = h2;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, w2, h2);
                var base64St = canvas.toDataURL("image/png");
                document.getElementById("imagePreview").src = base64St;
                document.getElementById("imagePreview").style.height = MAX_HEIGHT + "px";
                document.getElementById("imagePreview").style.width= MAX_WIDTH + "px";
                
                if (osType == "ios")
                {
                var iosImageSizes = [29,50,57,58,72,100,114,144];
                    iosImageSizes.forEach(function(size) 
                    {
                        canvas.width = size;
                        canvas.height = size;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, size, size);
                        document.getElementById("ios" + size).src = base64St;
                        document.getElementById("ios" + size).src = base64St;
                        document.getElementById("ios" + size).style.height = size + "px";
                        document.getElementById("ios" + size).style.width= size + "px";
                    });
                }
                if (osType == "andriod")
                {
                var andriodImageSizes = [48,96,144,192,512];
                    andriodImageSizes.forEach(function(size) 
                    {
                        canvas.width = size;
                        canvas.height = size;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, size, size);
                        document.getElementById("andriod" + size).src = base64St;
                        document.getElementById("andriod" + size).src = base64St;
                        document.getElementById("andriod" + size).style.height = size + "px";
                        document.getElementById("andriod" + size).style.width= size + "px";
                    });
                }

            }
            img.src = data;
        };  
        FR.readAsDataURL( file.files[0] );
   }
}
