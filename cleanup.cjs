const fs = require('fs')
const path = require('path')

const DOWNLOADS_DIRECTORY = "./downloads"
const ZIPS_DIRECTORY = "./zips";

const NOW = new Date();

dirItemsRemove(DOWNLOADS_DIRECTORY, 1);
dirItemsRemove(ZIPS_DIRECTORY, 7)

function dirItemsRemove(DIRECTORY_PATH, days) {
    const DIRECTORY = fs.readdirSync(DIRECTORY_PATH);
    DIRECTORY.map(file => {
        const filePath = path.join(DIRECTORY_PATH, file)

        const stats = fs.statSync(filePath)
        const createdAt = stats.ctime;

        if (NOW.getTime() - createdAt.getTime() > days * 24 * 60 * 60 * 1000) {
	    console.log(`Deleting ${filePath}`)
            fs.rmSync(filePath, { recursive: true, force: true });
        }
    })
}