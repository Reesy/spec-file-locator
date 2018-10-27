import { ISpecFileLocator } from "../interfaces/ISpecFileLocator";
import { StrippedFileInfo } from "../interfaces/StrippedFileInfo";
import * as fs from 'fs';

export class SpecFileLocator implements ISpecFileLocator
{

   constructor()
   {
   };

   /**
    * @description Provided a file path this function will deduce it's spec file. (If one exists)
    * @param {string} filePath The location of the target file. 
    */
   public deduceSpecFileName(fileInfo: StrippedFileInfo): string
   {
        let result = "";
       // let fileInfo: StrippedFileInfo = this.generateFileInfo(filePath);

        if(fileInfo.filePath === "")
        {
            return fileInfo.filePath
        }

        if((this.endsWith(fileInfo.fileName, "spec") === true) || 
           (this.endsWith(fileInfo.fileName, "Spec") === true))
        {
            return fileInfo.fileName + '.js';
        }

        result = fileInfo.fileName + "Spec.js";
    
        return result;
   };
   
   /**
    * @description This function will read a given filePath string and return an object describing it.
    * @param {string} filePath The filePath needed.
    */
   public generateFileInfo(filePath: string): StrippedFileInfo
   {
        let result = 
        {
            fileName: "",
            fileType: "",
            filePath: filePath,
            directory: ""
        }
        //Early return, nothing to process
        if(filePath === "" )
        {
            return result;
        }

        //If a match is found the filetype will be returned as '.FileType', otherwise null
        let currentFileType = filePath.match(/(\.\w+$)/igm);

        if(currentFileType !== null)
        {
            let rawType = currentFileType.toString();
            result.fileType = rawType.substr(1);
        }
        //If a match is found an array wil be returned, otherwise null
        let currentFileNameMatch = filePath.match(/([^\/]+)(?=\.\w+$)/igm); 

        if(currentFileNameMatch !== null)
        {
            result.fileName = currentFileNameMatch[0];
        }

        let file = result.fileName + "." + result.fileType;

        result.directory = filePath.replace(file, "");
        return result;
   };

   /**
    * @description The purpose of this folder is to read system and locate the spec file if it exists.
    * @param filePathToSearchFrom 
    * @param expectedTestFileName 
    */
   public readFileSystemForSpecFile(originPath: string): string
   {
        let fileInfo: StrippedFileInfo = this.generateFileInfo(originPath);
        let specFileToFind = this.deduceSpecFileName(fileInfo);

        //If the specFileName cannot be deduced there is little value in search the file system.
        if(specFileToFind === "")
        {
            return "";
        }

        let traversingDir = fileInfo.directory;
        let currentDirectoryContents;
        for(var i = 0; i < 4; i++)
        {
            currentDirectoryContents = fs.readdirSync(traversingDir);
            
            //specfilefound break
            if(currentDirectoryContents.indexOf(specFileToFind) !== -1)
            {
                return traversingDir + specFileToFind;
            }

            if(currentDirectoryContents.indexOf('test') !== -1)
            {
                let testDirectory = traversingDir + "test";
                let testDirectoryContents = fs.readdirSync(testDirectory);
                if(testDirectoryContents.lastIndexOf(specFileToFind) !== -1)
                {
                    let specFilePath = testDirectory + '/' + specFileToFind;
                    return specFilePath;
                }
                break;
            }

            traversingDir = traversingDir + "../"
        }
        return "";
   }

   /**
    * @description Purpose of this is locate all target spec files under a project.
    * In configuration we set the characteristics of the top level file structure and it will search under that directory
    * Such characteristics can be expected top level files such as the inclusion of a package.json or .git file.
    * @param filePath 
    */
   public readFileSystemForModuleSpecFiles(filePath: string): Array<string>
   {
        return [];
   };

   /**
    * @private
    * @param stringToCheck 
    * @param endsWith 
    */
   private endsWith(stringToCheck: string, endsWith: string): boolean
   {
		return stringToCheck.substring(stringToCheck.length - endsWith.length) === endsWith;
   }
}