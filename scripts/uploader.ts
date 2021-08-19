#!/usr/bin/env ts-node
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import pkg_json = require('../package.json');
let out_pkg_json = JSON.parse(JSON.stringify(pkg_json)) as typeof pkg_json;


let project_root = __dirname.substr(0,__dirname.lastIndexOf('/'));
let version:number[] = [];
for (let vn of pkg_json.version.split('.')) { version.push(parseInt(vn)); }

const ops = {
    bump: () => {
        console.log("current version: " + version.join('.'));
        version[2]++;
        console.log("new version:     " + version.join('.'));
        out_pkg_json.version = version.join('.');
    
        console.log(version);
    },

    save: () => { writeFileSync(project_root + '/package.json', JSON.stringify(out_pkg_json)); },

    gh(msg?:string) {
        let commitm = msg ? msg : 'Version ' + out_pkg_json.version; 
        console.log(execSync(
            'cd ' + project_root + 
            ' && git add --all && git commit -m "' + commitm + 
            '" && git push').toString());
    },

    npm() {
        console.log(execSync(
            'cd ' + project_root + 
            '&& npm publish'
        ));
    }
}

function main() {

    let args: [(keyof typeof ops), string | undefined][] = []; 
    let valid_args = Object.keys(ops);
    for (let a of process.argv.slice(2)) {
        let out = a.split('=');
        if (!valid_args.includes(out[0])) {
            console.log(a + 'is not a valid argument. valid arguments:');
            console.log(valid_args.join(' | '));
            throw new Error();
        }
        args.push(out as any);
    }
    
    for (let a of args) {
        (ops as any)[a[0]](...[a[1]]);
    }
}

main();
