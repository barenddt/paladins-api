var request = require('request');
var moment = require('moment');
var md5 = require('md5');
var c = require('./constants');

module.exports = class API {

  constructor(devId, authKey) {
    this.devId = devId;
    this.authKey = authKey;
    this.sessionId = null;
  }

  getPlayer(session, player, response) {
    var method = 'getplayer';
    var builtUrl = this.urlBuilder(session, method, player);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getPlayerStatus(session, player, response) {
    var method = 'getplayerstatus';
    var builtUrl = this.urlBuilder(session, method, player);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getMatchHistory(session, player, response) {
    var method = 'getmatchhistory';
    var reqUrl = this.urlBuilder(session, method, player);
    request(reqUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getMatchDetails(session, match_id, response) {
    var method = 'getmatchdetails';
    var builtUrl = this.urlBuilder(session, method, null, null, match_id);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getChampions(session, response) {
    var method = 'getchampions';
    var builtUrl = this.urlBuilder(session, method, null, '1');
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getChampionRanks(session, player, response) {
    var method = 'getchampionranks';
    var builtUrl = this.urlBuilder(session, method, player);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getChampionSkins(session, champ_id, response) {
    var method = 'getchampionskins';
    var builtUrl = this.urlBuilder(session, method, null, '1', null, champ_id);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  //Currently returns an empty object. Don't know why.

  // getChampionRecommendedItems(session, champ_id, response) {
  //   var method = 'getchampionrecommendeditems';
  //   var builtUrl = this.urlBuilder(session, method, null, '1', null, champ_id);
  //   request(builtUrl, function(err, res, body) {
  //     if(!err) {
  //       var bodyParsed = JSON.parse(body);
  //       response(err, bodyParsed);
  //     }
  //   });
  // }

  getItems(session, response) {
    var method = 'getitems';
    var builtUrl = this.urlBuilder(session, method, null, '1');
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  getDataUsed(session, response) {
    var method = 'getdataused';
    var builtUrl = this.urlBuilder(session, method);
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed);
      }
    });
  }

  connect(response) {
    var builtUrl = c.PC + '/' + 'createsession' + c.JSON + '/' + this.devId + '/' + this.getSignature('createsession') + '/' + this.timeStamp();
    request(builtUrl, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        response(err, bodyParsed.session_id);
      }
    });
  }

  urlBuilder(session, method, player, lang, match_id, champ_id) {
    var baseURL = c.PC + '/' + method + c.JSON + '/' + this.devId + '/' +
                  this.getSignature(method) + '/' + session + '/' + this.timeStamp();

    if (player != null) {
      baseURL += ('/' + player);
    }
    if (champ_id != null) {
      baseURL += ('/' + champ_id);
    }
    if (lang != null) {
      baseURL += ('/' + lang);
    }
    if (match_id != null) {
      baseURL += ('/' + match_id);
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
