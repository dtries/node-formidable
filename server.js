const http = require('http'); /* const created to use node built-in http module to create a server */

const formidable = require('formidable'); /* formidable is an add-on node package module that is parsing data from forms/inputs, good for uploads, it is a very popular, maintained, and long-lived module; here we create a constant to use when calling the formidable module  */

const fs = require('fs'); /* const created to use node built-in file system module */

http.createServer(function(req, res) { /* create a server using the node http module */
    if (req.url === '/fileupload') {/* check to see if url path includes fileupload, which comes from the action portion of the form tag. If the designated url path is present the incoming form information to be handled. See code immediately below */
        var form = new formidable.IncomingForm(); /* creates an new object based on the informaition submitted in the form from the browser. Using the formidable npm to indicated that form information is arriving   */
        form.parse(req, function(err, fields, files) { /* use formiddable to parse uploaded information in json object format */
            var oldpath = files.filetoupload.path /* uses files json object to navigate through the main level call filetoupload (this name was added to the input in the upload form using name="filetoupload" on the input tag) and then withing the filetoupload object find the path. This path is the temporary folder that holds the uploaded file. We will switch this to the location we want using a temporary holding var we will call newpath and then fs.rename */

            var newpath = `C:/Users/Denni/Documents/D_Coding/node-formidable/${files.filetoupload.name}`; /* direct to place you want the code saved and added the file of the file with extension (e.g., image.jpg) to the path; the part of the path before ${files.filetoupload.name} would need to be set for your individual computer.  */

            fs.rename (oldpath, newpath, function(err ){ /* used node file system rename method to rename file at oldPath to the pathname provided as newPath and then call a function to check for err before completing task  */
                if (err) throw err;           
                res.write(`files is ${JSON.stringify(files)}`); /* used in this demo to show how the files JSON object is laid out */

                res.write(`\nFile uploaded and saved`); /* used to inform client that file reached the location when upload */
                res.end();
            });
        });

    } else { /* displays file upload form */
        res.writeHead(200, {'Content-Type': 'text/html'}); /* if req from brower produces a 200-ok response use text/html content type which will provide for html rendereing from the server supplied code to occur in the browser when in response*/
        
        // Code below sets up a form in the browser
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">'); {/* settin up the form for info submission. Breakdown: action is set to fileupload, you could call it anything you want in this case, we will look for the action value in the request, if present it will trigger use of the form data; method is set to post as the data sent may be considered sensitive and the POST method does not display form data in the page address field, POST can handle large amounts of data as it has no inherent size limitations; enctype multipart/form data send chunks of information from form in a series of parts */}

        res.write('<input type="file" name="filetoupload"><br>'); /* type file brings up a file select field and a browse button to find files for upload, it tags the input with the designated name */

        res.write('<input type="submit">'); /* creates submit button that on clink attempts to send form to server  */
        
        res.write('</form>');
        return res.end();
    }
}).listen(8080); /* take/send information from/to browser on port 8080 */

