
/**
 * Importing Jasmine as the test framwork
 */
let jasmine = require('jasmine');
/**
 * The test json files to validate the scenarios
 */
let masterjson = require('./data/master.json');
let currentJson = require('./data/current.json');
let incomingJson = require('./data/incoming.json');

let jsonMerge = require('./../index');
/**
 * This is the test cases for the 3-way-json-merge algorithm
 * The test cases will validte all the possible scenarios
 */
describe('Test specs for json 3-way-json merge', () => {
    /**
     * To validate the addition scenarios
     */
    it('should add a new node when it is added in the incoming object', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 33,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 33,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "age": 33,
                "rank": 2,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "age": 33,
                "rank": 2,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject)).toEqual(expectedOutput);
    });
    it('Should add a new attribute when it is aded in the current object', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 33,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 33,
                "rank": 2,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "age": 33,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "age": 33,
                "rank": 2,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject)).toEqual(expectedOutput);
    });
    /**
     * A node which is deleted in the incomimg should be deleted from the output
     * when there is no conflict
     */
    it('Should delete a node when it is deleted from incoming and there is no conflict', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 33,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 33,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject)).toEqual(expectedOutput);
    });
    it('should delete a node when it is deleted from incoming', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 33,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject, true)).toEqual(expectedOutput);
        let expectedOutputFalse = {
            "id": 1,
            "name": "Robinson",
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX"
            }
        };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject, false)).toEqual(expectedOutputFalse);
    });
    /**
     * To validate the conflict scenario
     */
    it('should retain the current node primitive value when conflicting changes are there and acceptcurrent flag is true ', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 33,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "age": 35,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            };

        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject, true)).toEqual(expectedOutput);
    });
    it('should accept the incoming node primitive value when conflicting changes are there and acceptcurrent flag is flag ', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 33,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX"
                }
            };

        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject, false)).toEqual(expectedOutput);
    });

});