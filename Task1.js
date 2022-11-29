const http= require('http');
const fs= require('fs');
const PORT = 5000;
const server= http.createServer((req,res)=>{
    if(req.url=="/"){ //loading home page
        fs.readFile('Home.html',(err,data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    }
    //creating file
    else if(req.url=="/create"){
        if(fs.existsSync('crud.txt')){    //checking file is there or not
            res.writeHead(200,{'Content-Type':'text/html'});   
            res.write(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><File style="color:red;"><h2>File is Already Exist.</h2></body></html>`);      //returning file is already there
            res.end();

        }
        else{
            fs.writeFile('crud.txt',"Hello Bharat how are you?",(err)=>{       // otherwise it will create
              
            if(err) {throw err}
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><h2 style="color:green;">File has been created.</h2></body></html>`)
                                     //return file is created
                res.end();

            }
                
        });
        
    }}

    else if(req.url=="/read"){            //reading file
        if(fs.existsSync('crud.txt')){                 //checking file is there or not
            const data= fs.readFileSync('crud.txt')
            res.end(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><h4>${data.toString()}</h4></body></html>`);         //displaying data in string
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><h2 style="color:red;">First create file after read it.</h2></body></html>`);        //if it is not there then it will first create 
            res.end();
        }
    }

    else if(req.url=="/update"){       //updating the file
        if(fs.existsSync('crud.txt')){                 //checking file is there or not
            fs.appendFile('crud.txt',"Hello Naresh",(err)=>{             //update data by hello naresh
                if (err) throw err
                else{
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.write(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><h2 style="color:green;">File has been upadated successfully.</h2></body></html>`); 
                res.end()           //file is update
                    }
            })
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><h2 style="color:red;">File is not there.</h2></body></html>`); 
            res.end()           
           //file is not there
        }

    }
    else if(req.url=="/delete"){            // deleting the file
        if(fs.existsSync('crud.txt')){                         //checking file is there or not
            fs.unlink('crud.txt',(err)=>{                //unlink that file
                if(err) throw err
                else {res.writeHead(200,{'Content-Type':'text/html'});
                res.write(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><h2 style="color:green;">File is deleted successfully.</h2></body></html>`); 
                res.end()   
               //file is deleted
                }

            })
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
                res.write(`<html><body><a style="padding:10px 20px; text-decoration:none; color:white; background-color:green;" href="/">Home</a><br><h2 style="color:red;">File is not there.</h2></body></html>`);
            res.end()       //if file is not there then we can not delete
        }
    }

    else{
        res.end(`<html><body><h2>Invalid URL </h2></body></html>`)        //invalid url
    }
    
})

server.listen(PORT, (err)=>{
    if(err){ throw err}
    else{
        console.log(`The Server is Running on ${PORT}`);
    }
})