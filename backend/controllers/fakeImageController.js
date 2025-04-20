const { spawn } = require('child_process');
const path = require('path');

exports.detectFakeImage = (req, res) => {
  const filePath = req.file.path;

  const python = spawn('python3', ['ml-models/fake_image.py', filePath]);

  python.stdout.on('data', (data) => {
    const result = JSON.parse(data.toString());
    res.json(result);
  });

  python.stderr.on('data', (data) => {
    console.error(`❌ Python error: ${data}`);
    res.status(500).json({ error: 'Model processing failed' });
  });
};
