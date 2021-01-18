/**
 * Importing Jasmine as the test framwork
 */
let jasmine = require('jasmine');
let jsonMerge = require('./../index');
describe('Should run the test cases for array of objects', () => {
    it('Should add a new object when it is newly added in incoming', () => {
        let _master = {
            "id": 1,
            "name": "Robinson",
            "age": 34,
            "addresses": [
                {
                    "post Code": "E13S9",
                    "street": "High street",
                    "state": "PV",
                    "_objectId": "1"
                },
                {
                    "post Code": "E13T9",
                    "street": "High street south",
                    "state": "PV",
                    "_objectId": "2"
                }
            ]
        },
            _current = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    }
                ]
            },
            _incoming = {
                "id": 1,
                "name": "Robinson",
                "age": 35,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
            };
        let _expected = {
            "id": 1,
            "name": "Robinson",
            "age": 35,
            "addresses": [
                {
                    "post Code": "E13S9",
                    "street": "High street",
                    "state": "PV",
                    "_objectId": "1"
                },
                {
                    "post Code": "E13T9",
                    "street": "High street south",
                    "state": "PV",
                    "_objectId": "2"
                },
                {
                    "post Code": "E13V9",
                    "street": "North street",
                    "state": "PV",
                    "_objectId": "3"
                }
            ]
        };
        expect(jsonMerge.merge(_master, _current, _incoming, false)).toEqual(_expected);
    });
    it('Should delete an object deleted from the current and is not changed in incoming', () => {
        let _master = {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
            _current = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    }
                ]
            },
            _incoming = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
            };
        let _expected = {
            "id": 1,
            "name": "Robinson",
            "age": 34,
            "addresses": [
                {
                    "post Code": "E13S9",
                    "street": "High street",
                    "state": "PV",
                    "_objectId": "1"
                },
                {
                    "post Code": "E13T9",
                    "street": "High street south",
                    "state": "PV",
                    "_objectId": "2"
                }
            ]
        };
      expect(jsonMerge.merge(_master, _current, _incoming, false)).toEqual(_expected);
    });
    it('Should delete an object when deleted from incoming and is not changed in current', () => {
        let _master = {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
            _current = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses":[
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
            },
            _incoming = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    }
                ]
            };
        let _expected = {
            "id": 1,
            "name": "Robinson",
            "age": 34,
            "addresses": [
                {
                    "post Code": "E13S9",
                    "street": "High street",
                    "state": "PV",
                    "_objectId": "1"
                },
                {
                    "post Code": "E13T9",
                    "street": "High street south",
                    "state": "PV",
                    "_objectId": "2"
                }
            ]
        };
        //console.log('O/P', jsonMerge.merge(_master, _current, _incoming, false));
        expect(jsonMerge.merge(_master, _current, _incoming, false)).toEqual(_expected);
    });
    it('Should delete an object when deleted from incoming and has changes in current based on the configuration', () => {
        let _master = {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
            _current = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses":[
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "South street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
            },
            _incoming = {
                "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    }
                ]
            };
        let _expected_accept_current = {
            "id": 1,
            "name": "Robinson",
            "age": 34,
            "addresses":[
                {
                    "post Code": "E13S9",
                    "street": "High street",
                    "state": "PV",
                    "_objectId": "1"
                },
                {
                    "post Code": "E13T9",
                    "street": "High street south",
                    "state": "PV",
                    "_objectId": "2"
                },
                {
                    "post Code": "E13V9",
                    "street": "South street",
                    "state": "PV",
                    "_objectId": "3"
                }
            ]
        };
        expect(jsonMerge.merge(_master, _current, _incoming, true)).toEqual(_expected_accept_current);
        expect(jsonMerge.merge(_master, _current, _incoming, false)).toEqual(_incoming);

    });
    it('should  delete an object when deleted from current and has changes in incoming based, on the configuration', () => {

        let _master = {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
        _current = {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
        _incoming= {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S8",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
        
        _expected_output= {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        };
       
      
        expect(jsonMerge.merge(_master, _current, _incoming, true)).toEqual(_expected_output);      
    });
    it('Should not delete an object when deleted from current and has change incoming based on the configuration', () => {
        let _master = {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S9",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
        _current = {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
        _incoming= {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [
                    {
                        "post Code": "E13S8",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    },
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    }
                ]
        },
        
        _expected_output= {
            "id": 1,
                "name": "Robinson",
                "age": 34,
                "addresses": [                    
                    {
                        "post Code": "E13T9",
                        "street": "High street south",
                        "state": "PV",
                        "_objectId": "2"
                    },
                    {
                        "post Code": "E13V9",
                        "street": "North street",
                        "state": "PV",
                        "_objectId": "3"
                    },
                    {
                        "post Code": "E13S8",
                        "street": "High street",
                        "state": "PV",
                        "_objectId": "1"
                    }
                ]
        };
       
        expect(jsonMerge.merge(_master, _current, _incoming, false)).toEqual(_expected_output);
    })

});
