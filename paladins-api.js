const request = require('request');
const moment = require('moment');
const md5 = require('md5');
const URL    = 'http://api.paladins.com/paladinsapi.svc',
      FORMAT = 'Json';

'use strict';

module.exports = class API {

  constructor(devId, authKey) {
    this.devId = devId;
    this.authKey = authKey;
    this.sessionId = null;
  }

  getPlayer(session, player, response) {
    var method = 'getplayer'
    var reqUrl = this.urlBuilder(session, method, player);
    request(reqUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getMatchHistory(session, player, response) {
    var method = 'getmatchhistory'
    var reqUrl = this.urlBuilder(session, method, player);
    request(reqUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getMatchDetails(session, matchId, response) {
    var method = 'getmatchdetails'
    var builtUrl = this.urlBuilder(session, method, null, null, matchId);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getChampions(session, response) {
    var method = 'getchampions'
    var builtUrl = this.urlBuilder(session, method, null, '1');
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getChampionRanks(session, player, response) {
    var method = 'getchampionranks'
    var builtUrl = this.urlBuilder(session, method, player);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getItems(session, response) {
    var method = 'getitems'
    var builtUrl = this.urlBuilder(session, method, null, '1');
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getDataUsed(session, response) {
    var method = 'getdataused'
    var builtUrl = this.urlBuilder(session, method);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  connect(response) {
    var builtUrl = URL + '/' + 'createsession' + FORMAT + '/' + this.devId + '/' + this.getSignature('createsession') + '/' + this.timeStamp();
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed.session_id);
      }
    });
  }

  urlBuilder(session, method, player, lang, matchId) {
    var baseURL = URL + '/' + method + FORMAT + '/' + this.devId + '/' +
                  this.getSignature(method) + '/' + session + '/' + this.timeStamp();

    if (player != null) {
      baseURL += ('/' + player);
    }
    if (lang != null) {
      baseURL += ('/' + lang);
    }
    if (matchId != null) {
      baseURL += ('/' + matchId);
    }
    return baseURL;
  }

  timeStamp() {
    return moment().utc().format('YYYYMMDDHHmmss');
  }

  getSignature(method) {
    return md5(this.devId + method + this.authKey + this.timeStamp());
  }

};
