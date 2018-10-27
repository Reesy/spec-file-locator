This mock folder structure should represent the target projects file structure.

Given code exists in a 'src' folder, existing spec files should exist under a 'test' folder. Both 'src' and 'test' folders should share the same parent folder. 

Assumptions:
    -All test files are prefixed with *Spec.js, *Spec.ts, *spec.js or *spec.ts
    -src, bin and test folders all have a common parent

Do not change the layout of the mockFolderStructure folder, that structure is what the SpecFileLocator is being tested against. 

Example1:

/ExampleFolder/
|-- src
|   |--ExampleCode.ts
|-- bin
|   |--ExampleCode.js
|-- test
|   |--ExampleCodeSpec.ts
|   |--ExampleCodeSpec.js

