#!/usr/bin/env python3

import json, os, sys

package = {}

argv = ' '.join(sys.argv[1:])

with open('package.json', 'r+', encoding='utf-8') as f:
    package = json.loads(f.read());
    f.seek(0);
    package['source'] = 'src/resume.js';
    f.truncate(0);
    f.write(json.dumps(package, indent=2) + '\n');

os.system('parcel build ' + argv);

with open('package.json', 'w+', encoding='utf-8') as f:
    package['source'] = 'src/resume.html';
    f.write(json.dumps(package, indent=2) + '\n');