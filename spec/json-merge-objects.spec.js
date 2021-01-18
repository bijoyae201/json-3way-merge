/**
 * Include the necessary files and libraries
 */
let jasmine = require('jasmine');
let jsonMerge = require('./../index');
/**
 * This test sute is the continuation of the test cases 
 * in json-merge.spec.js
 */
describe('Should execute the test cases for objects and arrays', () => {

    it('should merge children objects of the parent json', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 34,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX",
                "district": "xxxyyy"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "phone": "xxxxxxxx87",
                    "district": "xxxyyy",
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
                    "postcode": "OL78YT",
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
                    "country": "YX",
                    "postcode": "OL78YT",
                    "phone": "xxxxxxxx87"
                }
            };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject, false)).toEqual(expectedOutput);
    });

    it('should merge children objects of the parent json-conflicting scenario', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 34,
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX",
                "district": "xxxyyy"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YXX",
                    "district": "xxxyyy"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YXZ",
                    "district": "xxxyyy"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YXX",
                    "district": "xxxyyy"
                }
            };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject, true)).toEqual(expectedOutput);
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject, false)).toEqual(_incomingObject);
    });
    it('should merge array of primitives', () => {
        let _baseObject = {
            "id": 1,
            "name": "Robinson",
            "age": 34,
            "memmebrships": ["a", "b"],
            "address": {
                "street": "ER76TY",
                "state": "XY",
                "country": "YX",
                "district": "xxxyyy"
            }
        },
            _currentObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "memmebrships": ["a", "b", "c"],
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX",
                    "district": "xxxyyy"
                }
            },
            _incomingObject = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "memmebrships": ["a", "d"],
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX",
                    "district": "xxxyyy"
                }
            },
            expectedOutput = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "memmebrships": ["a", "c", "d"],
                "address": {
                    "street": "ER76TY",
                    "state": "XY",
                    "country": "YX",
                    "district": "xxxyyy"
                }
            };
        expect(jsonMerge.merge(_baseObject, _currentObject, _incomingObject)).toEqual(expectedOutput);
    });
});