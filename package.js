Package.describe({
  name: 'astrocoders:talker',
  version: '0.0.1',
  summary: 'Reactively re-runs a client code whenever a server condition changes',
  git: 'https://github.com/Astrocoders/meteor-talker',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use([
    'ecmascript',
    'mongo',
    'underscore',
    'check',
  ]);

  api.addFiles('talker.js');
  api.addFiles('talker_server.js', 'server');
  api.addFiles('talker_client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('astrocoders:talker');
  api.addFiles('talker-tests.js');
});
