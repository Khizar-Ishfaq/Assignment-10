import app from './apicalls.js';
import { openDbConn } from './dbPool.js'
app.listen(3000, () => {
    console.log('Listening on port 3000 ..')
});


await openDbConn()

