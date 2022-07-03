import * as shell from 'shelljs';

shell.cp(['src/*.png', 'src/index.html'], 'build/');
shell.cp('src/public/map.js', 'build/public/');
