onmessage = (taskMessage) => {
    console.log('Inside Receive Worker');
    console.log(taskMessage.data);

    // var http = require('http');
    // http.createServer(function (req, res) {
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     res.write('Hello World!');
    //     res.end();
    // }).listen(8080);




    // const express = require('express');

    // const app = express();
    // app.use(express.json({ extended: true }));
    // app.use(express.urlencoded({ extended: true }));
    // const router = express.Router();

    // // @route   POST /listener/
    // // @desc    Add a message
    // router.get('/listener', async (req, res) => {

    //     try {
            
    //     } catch (err) {
    //         console.log('Inactive Node');
    //         res.status(500).json({ success: false, message: 'Inactive Node' });
    //     }
    // });

    // router.post('/listener', async (req, res) => {
    //     const { functions, params } = req.body;
    //     const message = params.message;

        

    //     try {
            
    //     } catch (err) {
    //         console.log('Inactive Node');
    //         res.status(500).json({ success: false, message: 'Inactive Node' });
    //     }
    // });

    // app.use('/listener', router);
    // app.listen(port, () => console.log(`Listener started on port ${port}`));
};
