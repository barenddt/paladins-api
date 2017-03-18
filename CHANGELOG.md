Changelog
===================

List of recent updates and changes to the paladins-api NodeJS wrapper.

 v1.2.5
-------------

* Responses can now be retrieved in a chosen language using ```setLanguage()``` method.
* Responses can now also be returned in either 'XML' or 'JSON' format using ```setFormat()``` method.
* 'Format' and 'Language' can also be passed to the constructor following the devId and authKey respectively.
* Code refactoring and cleanup.
* Swapped out [request]() for [fetch]() to handle http requests.
