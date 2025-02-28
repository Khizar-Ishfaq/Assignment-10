import { Router } from 'express';
import {getAllData, getDataById, addData} from '../mongodb.js'
import { addRandomUsers } from './mongodb.js'; 
let router = Router()

router.get('/', async (req, res) => {
    res.json( await getAllData() )
})

router.get('/:id', async (req, res) => {
    res.json( await getDataById(req.params.id) )
})

router.post('/', async (req, res) => {
    let exist = await getDataById(req.body.id)
    if( exist[0] ) {
        res.status(409).json( {"error": "record already exists"});
    } else {
        let result = await addData(req.body);
        if(result.affectedRows)
            res.json(req.body);
        else
            res.status(500).json({"error": "unknown database error"})
    }
})

router.post('/addRandomUsers', async (req, res) => {
    const  maxUsers  = req.body;
    try {
        const result = await addRandomUsers(maxUsers);
        res.json({"message": "Rows generated successfully!" });
    } catch (err) {
        res.status(500).json({ "Error": "Error generating rows" });
    }
});


export default router;
