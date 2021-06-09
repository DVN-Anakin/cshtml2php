const uploadFile = require("../middleware/upload");
const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
var fs = require('fs');

let phazorInit = async (req, res) => {
    const { stdout, stderr } = await exec('phazor uploads php');
    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);

    let fileNewName = req.file.originalname.replace('.ph', '.php');

    await fs.readFile(path.join(__dirname, '../../php/' + fileNewName), function(err, data) {
        if(err) {
            console.log(err)
            throw error;
        }

        let phpCompiled = data.toString();

        exec('rm -r uploads/*');
        exec('rm -r php/*');

        console.log('phpCompiled', phpCompiled);
        res.status(200).send({
            "message": "Uploaded the file successfully: " + req.file.originalname,
            "filename": fileNewName,
            "php": phpCompiled
        });
    });;
}

const upload = async (req, res) => {
    console.log(req.file.originalname, req);
    // try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        await phazorInit(req, res);
    // } catch (err) {
    //     res.status(500).send({
    //         message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    //     });
    // }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
  });
};

module.exports = {
    upload,
    getListFiles,
    download,
};