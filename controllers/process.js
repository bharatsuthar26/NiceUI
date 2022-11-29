const fs = require('fs');
function Create(req,res){
    res.render('create',{title:'File created',errmsg:"",succmsg:""})
}
function postdata(req,res){
    let filename= req.body.filename;
    let message= req.body.message;
    if(fs.existsSync(`./users/${filename}.txt`)){
        res.render('create',{errmsg:'File is Already registred',succmsg:''})
    }
    else{
        fs.writeFile(`./users/${filename}.txt`,`${message}`,(err)=>{
            if(err){
                res.render('create',{errmsg:'Something went wrong',succmsg:''})
            }
             else{
            res.render('create',{succmsg:'Registred sucessfully!!!!',errmsg:''})   
        // res.render('regis',{succmsg:'Registred sucessfully!!!!'});
        }
        })
       
    }
}
function read(req,res){
    res.render('read',{title:"read file", content:""})
}
function readdata(req,res){
    let filename= req.body.filename;
    let data= fs.readFileSync(`./users/${filename}.txt`);
    res.render('read',{title:"read page",content:data});
}
function update(req,res){
    res.render('update',{title:'update file',Fname:"",content:""})
}
function updatedata(req,res){
    let filename=req.body.filename;
    let data= fs.readFileSync(`./users/${filename}.txt`);
    fs.appendFileSync(`./users/${filename}.txt`,data);
    res.render('update',{title:"update page",content:data,Fname:filename});

}
function Delete(req,res){
    res.render('delete',{title:"",Fname:""})
}
function deletedata(req,res){
    let filename=req.body.filename;
    fs.unlinkSync(`./users/${filename}.txt`);
    res.render('delete',{title:`${filename}.txt file is deleted successfully`,Fname:filename})
}



module.exports={Create,read,update,Delete,postdata,readdata,updatedata,deletedata};