#!/usr/bin/env python3

import json, os

package = {}

with open('package.json', 'tr', encoding='utf-8') as f:
    package = json.loads(f.read());

package['source'] = 'src/resume.js';

with open('package.json', 'tw', encoding='utf-8') as f:
    f.write(json.dumps(package));

os.system('parcel build');

with open('package.json', 'w+', encoding='utf-8') as f:
    package['source'] = 'src/resume.html';
    f.write(json.dumps(package));