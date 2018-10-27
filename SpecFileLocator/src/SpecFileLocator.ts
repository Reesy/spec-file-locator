import { ISpecFileLocator } from "../interfaces/ISpecFileLocator";
import { StrippedFileInfo } from "../interfaces/StrippedFileInfo";

export class SpecFileLocator implements ISpecFileLocator
{

   constructor()
   {
   };

   /**
    * @description Provided a file path this function will deduce it's spec file. (If one exists)
    * @param {string} filePath The location of the target file. 
    */
   public deduceSpecFileName(filePath: string): string
   {
        let result = "";
        let fileInfo: StrippedFileInfo = this.generateFileInfo(filePath);

        if(filePath === ""){
            return filePath
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
        let result = {
            fileName: "",
            fileType: "",
            filePath: filePath,
            directory: ""
        }
        //Early return, nothing to process
        if(filePath === "" ){
            return result;
        }

        //If a match is found the filetype will be returned as '.FileType', otherwise null
        let currentFileType = filePath.match(/(\.\w+$)/igm);

        if(currentFileType !== null){
            let rawType = currentFileType.toString();
            result.fileType = rawType.substr(1);
        }
        //If a match is found an array wil be returned, otherwise null
        let currentFileNameMatch = filePath.match(/([^\/]+)(?=\.\w+$)/igm); 

        if(currentFileNameMatch !== null){
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
   public locateSpecFile(originPath: string): string{
        let specFileToFind = this.deduceSpecFileName(originPath);
        
        console.log("The spec file is" + specFileToFind);
        //If the specFileName cannot be deduced there is little value in search the file system.
        if(specFileToFind === ""){
            return "";
        }
        
        //This is the folder that the originFile exists at
        let startingFolder = originPath
        
        return "2";
   }

   /**
    * 
    * @param filePath 
    */
   public locationModuleSpecFiles(filePath: string): Array<string>
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