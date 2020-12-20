const fs = require('fs')

const path = require('path')

const dPath = path.join(__dirname,'./')

let patho = fs.readdirSync(dPath)


const res = patho.map(item=>{
    return `pages/${item}/main`
})

console.log(res);