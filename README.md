# json-3way-merge

This is a JavaScript utility which takes 3 JSON inputs and gives a merged version.  

A typical usecase for such a utility is the merge of JSON files in two different branches in GIT.  In this case, the JSON content of the incoming branch and the current branch can be given as the inputs of this utility along with a master version that can be considered as the origin of both incoming and current.

How the logic is being handled?

For scenarios which do not involve any conflicts in the JSON node values in incoming nd current, the objects will be merged without any issues.
However, if a conflict(concurrent modifications in incoming and current) occurs, the decision will be taken based on the input property 'acceptCurrentOnconflict'.  If the value of 'acceptCurrentOnconflict' is true, priority will be given to current changes.  Else, priority will be given to incoming changes.

How to build?

npm run build

How to run test cases?

npm run test
