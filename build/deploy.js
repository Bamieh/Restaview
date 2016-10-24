import _debug from 'debug'
const { TRAVIS_BRANCH, FIREBASE_TOKEN } = process.env
const debug = _debug('app:build:deploy')

(function () {
  const exec = require('child_process').exec
  // Upload to version url then to latest url
  deployToFirebase(() => {
    debug()
  })

  function deployToFirebase (cb) {
    if (!!TRAVIS_BRANCH && TRAVIS_BRANCH !== 'master') {
      debug('Skipping Firebase Deploy - Branch is not master.')
      if (cb) cb(null)
    } else {
      debug('Deploying to Firebase...')
      exec(`firebase deploy --token ${FIREBASE_TOKEN}`, (error) => {
        if (error !== null) {
          debug('error uploading to Firebase url: ', error.toString() || error)
          if (cb) cb(error)
          process.exit(1)
        } else {
          debug('Successfully deployed to Firebase')
          if (cb) cb(null)
        }
      })
    }
  }
})()
