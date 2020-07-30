const http = require('http');
const fs = require('fs');
const PATH = require('path');

const server = http.createServer( (req,res)=>{
	console.log("req.url : ",req.url);
	console.log("req.method : ",req.method);
	console.log("req IP : ",req.headers['x-forwarded-for'] || req.connection.remoteAddress);
	// res.setHeader('Containt-Type','text/plain');
	// res.write('<h1><b>Hello Ambuj</b></h1>');
	// res.end();
	
	 
	// fs.readFile('./test.html', (err,data) => {
	// 	if(err) console.log("err : ",err);
	// 	else {
	// 		res.write(data);
	// 		res.end();
	// 	}
	// })
	let path = './html';
	let url = req.url;

	if (url == '/') path += '/test.html';
	else {
		if (url.includes('.html')) path += url;
		else path += url + '.html';
	}	
	console.log('path : ',path);
	if(url.includes('getAllFilesName')) {
		//joining path of directory 
		const directoryPath = PATH.join(__dirname, 'html');
		//passsing directoryPath and callback function
		fs.readdir(directoryPath, function (err, files) {
		    //handling error
		    if (err) {
		        return console.log('Unable to scan directory: ' + err);
		    	res.write(`<h1> Filess list not found</h1>`);
		        res.end()
		    } 
		    //listing all files using forEach
		    res.write(`<h1> See below file list and click any of these</h1>`);
		    files.forEach(function (file) {
		        console.log(file);
		        res.write(`<b><a href="/${file}">${file}</a></b><br>`);
		    });
			res.end();    
		});

	} else {

		if (fs.existsSync(path)) {
			res.statusCode = 200;
		} else {
			path = './html/404.html';
			res.statusCode = 404;
		}
		console.log('final : ',path);
		 
		let data = fs.readFileSync(path, {encoding:'utf8', flag:'r'}) || '<b><h1>Data Not Found</h1></b>';
		res.write(data);
		res.end();	
	}

	// res.send("__dirname = " + 'test.html')
})

server.listen(3000,'localhost',()=>{
	console.log('Listening all request on port 3000');
})

console.log("__dirname = "+ __dirname);

console.log("__filename = "+ __filename);

