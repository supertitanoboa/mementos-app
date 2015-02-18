(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);
  
  /* @ngInject */ /*FIXME: makesure ngInject is working during minification*/
  /*TODO: $http, $q and other dependencies will be needed when connecting to server*/
  function dataservice($q) {

    var service = {
      getMementos: getMementos
    };

    return service;

    function getMementos() {
      // FIXME: dummy data
      var mementos = [{
        'ID' : 1,
        'title' : 'For mom',
        'owner' : 'Wes',
        'authors' : ['Wes'],
        'recipients'  : ['Mom'],
        'options' : {
        'public'  : false,
        'releaseType' : 'default',
        },
        'latestReleasedIndex' : 1, // associated with moments array.  latest moment released
        'moments' : [{
          'ID' : 1,
          'title' : 'Hi mom!',
          'author' : ['Wes'],
          'releaseDate' : '01/01/2016',
          'meta' : {
            'creationDate' : '01/01/2015',
            'location' : {
              'latitude' : 0,
              'longitude' : 0,
              'place' : 'Someplace awesome'
            }
          },
          content : [{
            'type' : 'text',
            'url' : 'This is my awesome note to my mom who is awesome.  Awesome bro!!' // using media instead of url pointing to it for time being
          }]
        }, {
          'ID' : 2,
          'title' : 'love youuuuuu mom!',
          'author' : ['Wes'],
          'releaseDate' : '01/01/2016',
          'meta' : {
            'creationDate' : '01/01/2015',
            'location' : {
              'latitude' : 0,
              'longitude' : 0,
              'place' : 'Someplace awesome'
            }
          },
          content : [{
            'type' : 'text',
            'url' : 'This is my looooooooooove noooote tooo mmyyy mom!!' // using media instead of url pointing to it for time being
          }]
        }]
      }, {
        'ID' : 2,
        'title' : 'For my girlfriend',
        'owner' : 'Wes',
        'authors' : ['Wes'],
        'recipients'  : ['Girlfriend'],
        'options' : {
        'public'  : false,
        'releaseType' : 'default',
        },
        'latestReleasedIndex' : 1, // associated with moments array.  latest moment released
        'moments' : [{
          'ID' : 3,
          'title' : 'Hey girl!',
          'author' : ['Wes'],
          'releaseDate' : '01/01/2016',
          'meta' : {
            'creationDate' : '01/01/2015',
            'location' : {
              'latitude' : 0,
              'longitude' : 0,
              'place' : 'Someplace awesome'
            }
          },
          content : [{
            'type' : 'text',
            'url' : 'This is my awesome note to my girlfriend who is awesome.  Awesome bro!!' // using media instead of url pointing to it for time being
          }]
        }, {
          'ID' : 4,
          'title' : 'love youuuuuu girl!',
          'author' : ['Wes'],
          'releaseDate' : '01/01/2016',
          'meta' : {
            'creationDate' : '01/01/2015',
            'location' : {
              'latitude' : 0,
              'longitude' : 0,
              'place' : 'Someplace awesome'
            }
          },
          content : [{
            'type' : 'text',
            'url' : 'This is my looooooooooove noooote tooo mmyyy girl!!' // using media instead of url pointing to it for time being
          }]
        }]
      }, {
        'ID' : 3,
        'title' : 'For Wes',
        'owner' : 'Mom',
        'authors' : ['Mom'],
        'recipients'  : ['Wes'],
        'options' : {
        'public'  : false,
        'releaseType' : 'default',
        },
        'latestReleasedIndex' : 1, // associated with moments array.  latest moment released
        'moments' : [{
          'ID' : 5,
          'title' : 'Hey son!',
          'author' : ['Mom'],
          'releaseDate' : '01/01/2016',
          'meta' : {
            'creationDate' : '01/01/2015',
            'location' : {
              'latitude' : 0,
              'longitude' : 0,
              'place' : 'Someplace awesome'
            }
          },
          content : [{
            'type' : 'text',
            'url' : 'This is my awesome note to my Wes who is awesome.  Awesome!!' // using media instead of url pointing to it for time being
          }]
        }, {
          'ID' : 6,
          'title' : 'love youuuuuu son!',
          'author' : ['Mom'],
          'releaseDate' : '01/01/2016',
          'meta' : {
            'creationDate' : '01/01/2015',
            'location' : {
              'latitude' : 0,
              'longitude' : 0,
              'place' : 'Someplace awesome'
            }
          },
          content : [{
            'type' : 'text',
            'url' : 'This is my looooooooooove noooote tooo mmyyy son!!' // using media instead of url pointing to it for time being
          }]
        }]
      }];
      
      // $q works as a promise
      return $q.when(mementos);
    }

  }

})();