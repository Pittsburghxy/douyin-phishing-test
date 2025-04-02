const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/save', (req, res) => {
    const { douyinID, phone } = req.body;
    if (!douyinID) {
        return res.json({ status: 'error', message: '抖音ID不能为空' });
    }

    const currentTime = new Date().toLocaleString();
    const entry = `时间: ${currentTime}, 抖音ID: ${douyinID}, 手机号: ${phone || '未提供'}\n`;

    fs.appendFile('data.txt', entry, (err) => {
        if (err) {
            return res.json({ status: 'error', message: '保存失败' });
        }
        res.json({ status: 'success', message: '提交成功，跳转至抖音官网查看结果！' });
    });
});

app.get('/view-data', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            return res.send('暂无数据');
        }
        res.send(`<pre>${data}</pre>`);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});