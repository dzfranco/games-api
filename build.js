const s = require('shelljs');

s.rm('-rf', 'build');
s.mkdir('build');
s.cp(`.${s.env.NODE_ENV}.env`, `build/.${s.env.NODE_ENV}.env`);
s.cp('-R', 'public', 'build/public');
