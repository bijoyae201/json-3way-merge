
"use strict";
var exports = module.exports = {};
// let core = require('core-js');
/**
 * Including lodash to perform the deep object comparison and
 * other object related operations
 */
let _ = require('lodash');
let _acceptCurrentOnConflict; // This has to be changed based on the requirement
/**
 * The core function to merge objects
 * @param {*} master- This is the master from which current and incoming derived
 * @param {*} current- The current JSON object into which the changes have to be brought in
 * @param {*} incoming- The incoming changes
 */

exports.merge = function (master, current, incoming, acceptCurrentOnconflict) {

    _acceptCurrentOnConflict = acceptCurrentOnconflict ? true : false;

    let _isMatchedtypes = typeof master && typeof current && typeof incoming;
    if (!_isMatchedtypes) {
        throw 'Unmatched input types found.  Please provide valid objects to merge'
    }
    _performRecursiveMerge(master, current, incoming);
    let _merged = current;
    return _merged;
}
/**
 * The parent function for each object
 * @param {*} baseObject  The object value in the master version 
 * @param {*} currentObject The object value in the current version
 * @param {*} incomingObject The object value in the incming version
 */
function _performRecursiveMerge(baseObject, currentObject, incomingObject) {
    _includeAdditions(baseObject, currentObject, incomingObject);
    _handleDeletedNodes(baseObject, currentObject, incomingObject);
    _iterateAndMergeObjects(baseObject, currentObject, incomingObject);
}
/**
 * Bring any newly added attributes in the incoming to current object
 * @param {*} masterObject 
 * @param {*} currentObject 
 * @param {*} incomingObject 
 */
function _includeAdditions(masterObject, currentObject, incomingObject) {
    for (let _objectKey in incomingObject) {
        if (!masterObject[_objectKey] && !currentObject[_objectKey]) {
            currentObject[_objectKey] = incomingObject[_objectKey];
        }
    }
}
/**
 * Removes the deleted nodes
 * If any conflict is there, then based on the input from the client, the node can be delete or retained
 * @param {*} masterObject 
 * @param {*} currentObject 
 * @param {*} incomingObject 
 */
function _handleDeletedNodes(masterObject, currentObject, incomingObject) {

    for (let _objectKey in currentObject) {
        if (!incomingObject[_objectKey] && masterObject[_objectKey]) {
            let _canDelete = _.isEqual(masterObject[_objectKey], currentObject[_objectKey]) || (!_.isEqual(masterObject[_objectKey], currentObject[_objectKey]) && !_acceptCurrentOnConflict);
            if (_canDelete) {
                delete currentObject[_objectKey];
            }

        }
        for (let _key in incomingObject) {
            if (!currentObject[_key] && masterObject[_key]) {
                let _canReIntroduce = !_.isEqual(incomingObject[_key], masterObject[_key]) && !_acceptCurrentOnConflict;
                if (_canReIntroduce) {
                    currentObject[_key] = incomingObject[_key];
                }
            }
        }
    }
}
/**
 * Iterates the object and handles the various use cases such as
 * primitive, arrays and array of object values
 * @param {*} masterObject 
 * @param {*} currentObject 
 * @param {*} incomingObject 
 */
function _iterateAndMergeObjects(masterObject, currentObject, incomingObject) {
    for (let key in incomingObject) {
        if (incomingObject[key] && currentObject[key] && !_.isEqual(incomingObject[key], currentObject[key])) {
            if (typeof incomingObject[key] !== 'object') { //Primitive types
                let _isconflicting = !_.isEqual(masterObject[key], currentObject[key]) && !_.isEqual(masterObject[key], incomingObject[key]);
                currentObject[key] = _isconflicting ? _acceptCurrentOnConflict ? currentObject[key] : incomingObject[key] : _.isEqual(incomingObject[key], masterObject) ? currentObject[key] : incomingObject[key];
            } else {
                _handleObjectType(masterObject[key], currentObject[key], incomingObject[key]);
            }

        }
    }
}
/**
 * Handles objects and arrays
 * @param {*} masterObject 
 * @param {*} currentObject 
 * @param {*} incomingObject 
 */
function _handleObjectType(masterObject, currentObject, incomingObject) {

    let _isArray = Array.isArray(incomingObject) ? true : false; //Assumes types will be same for both
    if (!_isArray) {
        _performRecursiveMerge(masterObject, currentObject, incomingObject);
    } else {
        _handleArrays(masterObject, currentObject, incomingObject);
    }
}
/**
 * Primitive as well as object arrays have to be handled
 * @param {*} masterObject 
 * @param {*} currentObject 
 * @param {*} incomingObject 
 */
function _handleArrays(masterObject, currentObject, incomingObject) {
    if (incomingObject.length > 0 || currentObject.length > 0) {
        if (typeof incomingObject[0] === 'object' || typeof currentObject[0] === 'object') {
            _handleObjectArrays(masterObject, currentObject, incomingObject);
        } else {
            _handlePrimitiveArrays(masterObject, currentObject, incomingObject);
        }

    }

}
/**
 * Handles the addition and removal of primitive types from the array
 * @param {*} masterObject 
 * @param {*} currentObject 
 * @param {*} incomingObject 
 */
function _handlePrimitiveArrays(masterObject, currentObject, incomingObject) {
    incomingObject.map(arrayItem => {
        if (!masterObject.includes(arrayItem) && !currentObject.includes(arrayItem)) {
            currentObject.push(arrayItem);
        }
    });
    let _currentObject = currentObject;
    _currentObject.map(item => {
        if (masterObject.includes(item) && !incomingObject.includes(item)) {
            currentObject.splice(currentObject.indexOf(item), 1);
        }
    });
}
/**
 * Compares and merges object arrays.
 * Assuming that the _objectId attribute is used to identify the object equality
 * @param {*} masterObject 
 * @param {*} currentObject 
 * @param {*} incomingObject 
 */
function _handleObjectArrays(masterObject, currentObject, incomingObject) {
    let currentItems = _.map(currentObject, '_objectId'), masterItems = _.map(masterObject, '_objectId');//Assumes _objectId as the unique key to distinguish objects
    incomingObject.map((incomingObjectItem) => {
        //if the same object has differences between current and incoming, the result should be a merged version
        if (incomingObjectItem._objectId.includes(currentItems) && !_.isEqual(incomingObjectItem, _getObjectItemFromArray(currentObject, incomingObjectItem._objectId))) {
            _performRecursiveMerge(_getObjectItemFromArray(masterObject, incomingObjectItem._objectId), _getObjectItemFromArray(currentObject, incomingObjectItem._objectId), incomingObjectItem);
        }
        //If the current and master versions do not contain an incoming element, it is a newly added one in the incoming
        //The same has to be brought to the result.
        else if (!currentItems.includes(incomingObjectItem._objectId)) {
            if (!masterItems.includes(incomingObjectItem._objectId)) {
                currentObject.push(incomingObjectItem); //New addition in incoming
            } else {
                let _isEqual = _.isEqual(_getObjectItemFromArray(masterObject, incomingObjectItem._objectId), incomingObjectItem);
                if (!_isEqual && !_acceptCurrentOnConflict) {
                    currentObject.push(incomingObjectItem);
                }
            }
        }

        //If an item has already been removed from the current version and the same has changes in incoming, then based on the
        //configuration the descision should be taken.
        else if (masterItems.includes(incomingObjectItem._objectId) && !currentItems.includes(incomingObjectItem._objectId)) {

            if (!_.isEqual(incomingObjectItem, _getObjectItemFromArray(masterObject, incomingObjectItem._objectId)) && !_acceptCurrentOnConflict) {
                currentObject.push(incomingObjectItem);
                console.log('added ***', incomingObjectItem);
            } else {
                //Delete if not required
            }
        }
        //If an item is removed from incoming

        else {
            //ToDo:
        }
    });
    let _incomingItems = _.map(incomingObject, '_objectId');
    let _currentAloneItems = currentItems.filter(item => {
        return !_incomingItems.includes(item);
    });
    _currentAloneItems.map(currentItem => {

        if (_getObjectItemFromArray(masterObject, currentItem)) {
            let _isCurrentUnchanged = _.isEqual(_getObjectItemFromArray(masterObject, currentItem), _getObjectItemFromArray(currentObject, currentItem));
            if (_isCurrentUnchanged || !_acceptCurrentOnConflict) {
                currentObject.splice(currentObject.indexOf(_getObjectItemFromArray(currentObject, currentItem)), 1);
            }
        }
    });
}
/**
 * Filter out an object from an array based on the _objectId field
 * @param {*} objectArray 
 * @param {*} objectKey 
 */
function _getObjectItemFromArray(objectArray, objectKey) {
    let filteredItem = objectArray.find(item => { return item._objectId === objectKey });
    return filteredItem;
}
